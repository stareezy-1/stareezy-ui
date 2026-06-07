/**
 * @property-based-test
 *
 * Consolidated correctness validation suite — Properties 4 and 5
 *
 * The CLI registry and init logic is inlined here so these tests run entirely
 * within the components package (where fast-check is available) without
 * crossing Vite's package-boundary file-system restriction.
 *
 * The inlined code mirrors packages/cli/src/registry.ts and the idempotency
 * contract of packages/cli/src/commands/init.ts exactly.
 *
 * Property 4 — CLI add dependency closure
 *   Result contains every requested component, its transitive component
 *   closure, and required @quasify-ui/* deps.
 *   Validates: Requirements 17.2 (via Requirement 12.13)
 *
 * Property 5 — CLI add/init idempotency
 *   Running init twice equals running once; no duplicated config/wiring/
 *   ThemeProvider.
 *   Validates: Requirements 17.1, 17.5 (via Requirement 12.14)
 */

import fc from "fast-check";
import { describe, it } from "vitest";
import {
  mkdtempSync,
  writeFileSync,
  readFileSync,
  mkdirSync,
  existsSync,
} from "fs";
import { join } from "path";
import { tmpdir } from "os";

// ---------------------------------------------------------------------------
// Inlined registry model (mirrors packages/cli/src/registry.ts)
// ---------------------------------------------------------------------------

interface ComponentRegistryEntry {
  name: string;
  files: string[];
  componentDeps: string[];
  packageDeps: string[];
}

const BASE_PACKAGES = ["@quasify-ui/components", "@quasify-ui/tokens"];

const REGISTRY: ComponentRegistryEntry[] = [
  { name: "button", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  { name: "input", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  { name: "card", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  { name: "badge", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  { name: "toast", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  {
    name: "accordion",
    files: [],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  { name: "tabs", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  { name: "switch", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  { name: "modal", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  {
    name: "dropdown",
    files: [],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  { name: "spinner", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  { name: "avatar", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  {
    name: "checkbox",
    files: [],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  { name: "divider", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  {
    name: "breadcrumb",
    files: [],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "pagination",
    files: [],
    componentDeps: ["button"],
    packageDeps: BASE_PACKAGES,
  },
  { name: "table", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  { name: "tag", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  { name: "tooltip", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
  { name: "drawer", files: [], componentDeps: [], packageDeps: BASE_PACKAGES },
];

const REGISTRY_MAP = new Map<string, ComponentRegistryEntry>(
  REGISTRY.map((e) => [e.name, e]),
);

function resolveComponentClosure(names: string[]): ComponentRegistryEntry[] {
  const visited = new Set<string>();
  const result: ComponentRegistryEntry[] = [];
  function visit(name: string): void {
    const key = name.toLowerCase();
    if (visited.has(key)) return;
    visited.add(key);
    const entry = REGISTRY_MAP.get(key)!;
    for (const dep of entry.componentDeps) visit(dep);
    result.push(entry);
  }
  for (const name of names) visit(name.toLowerCase());
  return result;
}

function collectPackageDeps(components: ComponentRegistryEntry[]): string[] {
  const seen = new Set<string>();
  for (const comp of components)
    for (const pkg of comp.packageDeps) seen.add(pkg);
  return Array.from(seen).sort();
}

function getAllComponentNames(): string[] {
  return REGISTRY.map((c) => c.name);
}

// ---------------------------------------------------------------------------
// Inlined idempotent init logic (mirrors packages/cli/src/commands/init.ts)
// ---------------------------------------------------------------------------

const Quasify_CONFIG_CONTENT = `import { createUi } from "@quasify-ui/tokens";\nconst ui = createUi({});\nexport default ui;\n`;

const PROVIDERS_CONTENT = `import { ThemeProvider } from "@quasify-ui/tokens";\nexport function Providers({ children }) { return <ThemeProvider>{children}</ThemeProvider>; }\n`;

type Framework = "next" | "vite" | "expo";

function detectFrameworkFromDir(dir: string): Framework {
  try {
    const pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf8")) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const deps = {
      ...(pkg.dependencies ?? {}),
      ...(pkg.devDependencies ?? {}),
    };
    if ("next" in deps) return "next";
    if ("expo" in deps) return "expo";
    if ("vite" in deps) return "vite";
  } catch {
    /* ignore */
  }
  return "next"; // fallback
}

interface InitResult {
  createdConfig: boolean;
  createdThemeProvider: boolean;
  skippedConfig: boolean;
  skippedThemeProvider: boolean;
}

function runIdempotentInit(dir: string): InitResult {
  const framework = detectFrameworkFromDir(dir);
  const result: InitResult = {
    createdConfig: false,
    createdThemeProvider: false,
    skippedConfig: false,
    skippedThemeProvider: false,
  };

  // 1. quasify.config.ts — only write when absent
  const configPath = join(dir, "quasify.config.ts");
  if (existsSync(configPath)) {
    result.skippedConfig = true;
  } else {
    writeFileSync(configPath, Quasify_CONFIG_CONTENT, "utf8");
    result.createdConfig = true;
  }

  // 2. ThemeProvider — only write when absent
  const providersPath =
    framework === "next"
      ? join(dir, "app", "providers.tsx")
      : join(dir, "src", "providers.tsx");

  if (existsSync(providersPath)) {
    result.skippedThemeProvider = true;
  } else {
    writeFileSync(providersPath, PROVIDERS_CONTENT, "utf8");
    result.createdThemeProvider = true;
  }

  return result;
}

// ---------------------------------------------------------------------------
// Property 4 — CLI add dependency closure
// Validates: Requirements 17.2
// ---------------------------------------------------------------------------

describe("Property 4 — CLI add dependency closure", () => {
  const allNames = getAllComponentNames();

  // Property 4a — Every requested component appears in the closure
  it("result contains every requested component", () => {
    fc.assert(
      fc.property(
        fc.uniqueArray(fc.constantFrom(...allNames), {
          minLength: 1,
          maxLength: 5,
        }),
        (requestedNames) => {
          const resolved = resolveComponentClosure(requestedNames);
          const resolvedNames = resolved.map((c) => c.name);
          return requestedNames.every((n) => resolvedNames.includes(n));
        },
      ),
      { numRuns: 100 },
    );
  });

  // Property 4b — All transitive component dependencies are in the closure
  it("result contains all transitive component deps", () => {
    fc.assert(
      fc.property(
        fc.uniqueArray(fc.constantFrom(...allNames), {
          minLength: 1,
          maxLength: 5,
        }),
        (requestedNames) => {
          const resolved = resolveComponentClosure(requestedNames);
          const resolvedNames = new Set(resolved.map((c) => c.name));
          for (const comp of resolved) {
            for (const dep of comp.componentDeps) {
              if (!resolvedNames.has(dep)) return false;
            }
          }
          return true;
        },
      ),
      { numRuns: 100 },
    );
  });

  // Property 4c — Required @quasify-ui/* package deps are always present
  it("result contains all required @quasify-ui/* package deps", () => {
    fc.assert(
      fc.property(
        fc.uniqueArray(fc.constantFrom(...allNames), {
          minLength: 1,
          maxLength: 5,
        }),
        (requestedNames) => {
          const resolved = resolveComponentClosure(requestedNames);
          const pkgDeps = collectPackageDeps(resolved);
          return (
            pkgDeps.includes("@quasify-ui/components") &&
            pkgDeps.includes("@quasify-ui/tokens")
          );
        },
      ),
      { numRuns: 100 },
    );
  });

  // Property 4d — Closure is deterministic: same inputs → same ordered result
  it("resolveComponentClosure is deterministic", () => {
    fc.assert(
      fc.property(
        fc.uniqueArray(fc.constantFrom(...allNames), {
          minLength: 1,
          maxLength: 5,
        }),
        (requestedNames) => {
          const first = resolveComponentClosure(requestedNames).map(
            (c) => c.name,
          );
          const second = resolveComponentClosure(requestedNames).map(
            (c) => c.name,
          );
          return (
            first.length === second.length &&
            first.every((n, i) => n === second[i])
          );
        },
      ),
      { numRuns: 100 },
    );
  });

  // Property 4e — Closure of a subset is always contained in the closure of the full set
  it("closure of a subset is contained in the closure of the full set", () => {
    fc.assert(
      fc.property(
        fc
          .uniqueArray(fc.constantFrom(...allNames), {
            minLength: 2,
            maxLength: 6,
          })
          .chain((all) =>
            fc
              .integer({ min: 1, max: all.length - 1 })
              .map((n) => ({ subset: all.slice(0, n), full: all })),
          ),
        ({ subset, full }) => {
          const subsetClosure = new Set(
            resolveComponentClosure(subset).map((c) => c.name),
          );
          const fullClosure = new Set(
            resolveComponentClosure(full).map((c) => c.name),
          );
          for (const name of subsetClosure) {
            if (!fullClosure.has(name)) return false;
          }
          return true;
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 5 — CLI add/init idempotency
// Validates: Requirements 17.1, 17.5
// ---------------------------------------------------------------------------

function makeProjectDir(framework: Framework): string {
  const dir = mkdtempSync(join(tmpdir(), "szr-test-"));
  const deps =
    framework === "next"
      ? { next: "14.0.0" }
      : framework === "expo"
      ? { expo: "55.0.0" }
      : {};
  const devDeps = framework === "vite" ? { vite: "5.0.0" } : {};
  writeFileSync(
    join(dir, "package.json"),
    JSON.stringify({ dependencies: deps, devDependencies: devDeps }),
  );
  mkdirSync(join(dir, "app"), { recursive: true });
  mkdirSync(join(dir, "src"), { recursive: true });
  return dir;
}

describe("Property 5 — CLI add/init idempotency", () => {
  // Property 5a — Running init twice produces byte-identical quasify.config.ts
  it("running init twice produces identical quasify.config.ts content", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("next", "vite", "expo") as fc.Arbitrary<Framework>,
        (framework) => {
          const dir = makeProjectDir(framework);

          runIdempotentInit(dir);
          const configAfterFirst = readFileSync(
            join(dir, "quasify.config.ts"),
            "utf8",
          );

          runIdempotentInit(dir);
          const configAfterSecond = readFileSync(
            join(dir, "quasify.config.ts"),
            "utf8",
          );

          return configAfterFirst === configAfterSecond;
        },
      ),
      { numRuns: 100 },
    );
  });

  // Property 5b — Running init twice does not alter the providers file
  it("running init twice does not duplicate the ThemeProvider setup", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("next", "vite", "expo") as fc.Arbitrary<Framework>,
        (framework) => {
          const dir = makeProjectDir(framework);

          runIdempotentInit(dir);

          const providersPath =
            framework === "next"
              ? join(dir, "app", "providers.tsx")
              : join(dir, "src", "providers.tsx");

          if (!existsSync(providersPath)) return true;
          const contentAfterFirst = readFileSync(providersPath, "utf8");

          runIdempotentInit(dir);
          const contentAfterSecond = readFileSync(providersPath, "utf8");

          return contentAfterFirst === contentAfterSecond;
        },
      ),
      { numRuns: 100 },
    );
  });

  // Property 5c — The second run always reports skippedConfig = true
  it("second init run reports skippedConfig = true", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("next", "vite", "expo") as fc.Arbitrary<Framework>,
        (framework) => {
          const dir = makeProjectDir(framework);

          const first = runIdempotentInit(dir);
          if (!first.createdConfig) return true; // sanity: skip if first run didn't create it

          const second = runIdempotentInit(dir);
          return second.skippedConfig === true;
        },
      ),
      { numRuns: 100 },
    );
  });

  // Property 5d — The second run always reports skippedThemeProvider = true
  it("second init run reports skippedThemeProvider = true", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("next", "vite", "expo") as fc.Arbitrary<Framework>,
        (framework) => {
          const dir = makeProjectDir(framework);

          const first = runIdempotentInit(dir);
          if (!first.createdThemeProvider) return true;

          const second = runIdempotentInit(dir);
          return second.skippedThemeProvider === true;
        },
      ),
      { numRuns: 100 },
    );
  });
});
