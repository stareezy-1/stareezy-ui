/**
 * add command — install named stareezy-ui components into an existing project.
 *
 * Steps:
 *  1. Parse component names from args
 *  2. Detect framework + package manager
 *  3. Resolve transitive component dependency closure via registry
 *  4. Ensure @stareezy-ui/* deps are in the project's package.json
 *  5. Offer init when config / wiring / ThemeProvider is missing
 *  6. Report what was added
 *
 * Uses only Node.js built-ins. No external deps.
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { detectProject } from "../detect.js";
import {
  collectPackageDeps,
  getAllComponents,
  resolveComponentClosure,
} from "../registry.js";
import { runInit } from "./init.js";

export interface AddOptions {
  /** Target project root directory. Defaults to process.cwd(). */
  cwd?: string;
  /** Component names to install. */
  components: string[];
  /** Skip the init offer even when wiring is missing. */
  skipInit?: boolean;
  /** Answer yes to all prompts. */
  yes?: boolean;
}

// ---------------------------------------------------------------------------
// Install helper
// ---------------------------------------------------------------------------

function installPackages(
  packages: string[],
  packageManager: string,
  cwd: string,
): void {
  if (packages.length === 0) return;

  const cmd = buildInstallCommand(packages, packageManager);
  console.log(`  Running: ${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

function buildInstallCommand(packages: string[], pm: string): string {
  const pkgList = packages.join(" ");
  switch (pm) {
    case "pnpm":
      return `pnpm add ${pkgList}`;
    case "yarn":
      return `yarn add ${pkgList}`;
    case "bun":
      return `bun add ${pkgList}`;
    default:
      return `npm install ${pkgList}`;
  }
}

// ---------------------------------------------------------------------------
// Package.json dep check
// ---------------------------------------------------------------------------

function getMissingPackageDeps(required: string[], cwd: string): string[] {
  const pkgPath = join(cwd, "package.json");
  if (!existsSync(pkgPath)) return required;

  let pkg: Record<string, unknown>;
  try {
    pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as Record<string, unknown>;
  } catch {
    return required;
  }

  const deps = (pkg["dependencies"] ?? {}) as Record<string, string>;
  const devDeps = (pkg["devDependencies"] ?? {}) as Record<string, string>;
  const peerDeps = (pkg["peerDependencies"] ?? {}) as Record<string, string>;

  return required.filter(
    (p) => !(p in deps) && !(p in devDeps) && !(p in peerDeps),
  );
}

// ---------------------------------------------------------------------------
// Prompt helper (readline-based, no external deps)
// ---------------------------------------------------------------------------

async function confirm(question: string, defaultYes = true): Promise<boolean> {
  const { createInterface } = await import("readline");
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  return new Promise((resolve) => {
    const hint = defaultYes ? "[Y/n]" : "[y/N]";
    rl.question(`${question} ${hint} `, (answer) => {
      rl.close();
      const trimmed = answer.trim().toLowerCase();
      if (trimmed === "") resolve(defaultYes);
      else resolve(trimmed === "y" || trimmed === "yes");
    });
  });
}

// ---------------------------------------------------------------------------
// Component file stubs
// ---------------------------------------------------------------------------

/** Write a stub component file to cwd/components/<Name>/<Name>.tsx etc. */
function writeComponentStubs(componentName: string, cwd: string): void {
  const capitalized =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);
  const dir = join(cwd, "components", capitalized);

  if (existsSync(join(dir, `${capitalized}.tsx`))) {
    console.log(`  ✓ ${capitalized} already exists — skipping`);
    return;
  }

  mkdirSync(dir, { recursive: true });

  // .tsx
  writeFileSync(
    join(dir, `${capitalized}.tsx`),
    `export { ${capitalized} } from "@stareezy-ui/components";\n`,
    "utf8",
  );
  // .style.ts
  writeFileSync(
    join(dir, `${capitalized}.style.ts`),
    `// Extend or override ${capitalized} styles here\nexport {};\n`,
    "utf8",
  );
  // index.ts
  writeFileSync(
    join(dir, "index.ts"),
    `export { ${capitalized} } from "./${capitalized}";\n`,
    "utf8",
  );

  console.log(`  + added ${capitalized} → components/${capitalized}/`);
}

// ---------------------------------------------------------------------------
// Main add command
// ---------------------------------------------------------------------------

export async function runAdd(options: AddOptions): Promise<void> {
  const cwd = options.cwd ?? process.cwd();

  if (options.components.length === 0) {
    console.error("Error: no component names provided.");
    console.log(
      "Available components: " +
        getAllComponents()
          .map((c) => c.name)
          .join(", "),
    );
    process.exit(1);
  }

  // 1. Detect project
  const project = detectProject(cwd);

  if (project.framework === "unknown") {
    console.warn(
      "⚠ Could not detect framework (next / vite / expo). Continuing anyway.",
    );
  }

  console.log(
    `Detected: framework=${project.framework}, pm=${project.packageManager}`,
  );

  // 2. Resolve component closure (throws on unknown component names)
  let resolved;
  try {
    resolved = resolveComponentClosure(options.components);
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }

  const extraDeps = resolved
    .map((c) => c.name)
    .filter((n) => !options.components.includes(n));

  if (extraDeps.length > 0) {
    console.log(`Resolved transitive deps: ${extraDeps.join(", ")}`);
  }

  // 3. Ensure @stareezy-ui/* packages
  const requiredPkgs = collectPackageDeps(resolved);
  const missingPkgs = getMissingPackageDeps(requiredPkgs, cwd);

  if (missingPkgs.length > 0) {
    console.log(`Installing missing packages: ${missingPkgs.join(", ")}`);
    installPackages(missingPkgs, project.packageManager, cwd);
  } else {
    console.log("  ✓ All @stareezy-ui/* packages already present");
  }

  // 4. Offer init when config / wiring / ThemeProvider is missing
  if (
    !options.skipInit &&
    (!project.hasConfig || !project.hasWiring || !project.hasThemeProvider)
  ) {
    const missing: string[] = [];
    if (!project.hasConfig) missing.push("stareezy.config.ts");
    if (!project.hasWiring) missing.push("compiler wiring");
    if (!project.hasThemeProvider) missing.push("ThemeProvider");

    console.log(`\n⚠ Missing stareezy-ui setup: ${missing.join(", ")}`);

    const shouldInit =
      options.yes ||
      (await confirm("Run `stareezy init` to create the missing setup?", true));

    if (shouldInit) {
      console.log("\nRunning init...");
      await runInit({ cwd, yes: options.yes });
    } else {
      console.log("Skipping init. You can run `stareezy init` later.");
    }
  }

  // 5. Write component stubs
  console.log("\nAdding components:");
  for (const entry of resolved) {
    writeComponentStubs(entry.name, cwd);
  }

  console.log(`\n✓ Done! Added: ${resolved.map((c) => c.name).join(", ")}`);
}
