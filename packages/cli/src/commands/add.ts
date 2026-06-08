/**
 * add command — install named Stareezy-ui components into an existing project.
 *
 * Steps:
 *  1. Detect framework + package manager
 *  2. Resolve transitive component dependency closure via registry
 *  3. Install ALL packages from the framework template's package.json.tpl
 *  4. Ensure @stareezy-ui/* packages from the registry are present
 *  5. Offer init when config / wiring / ThemeProvider is missing
 *  6. Write component stubs
 *
 * Uses only Node.js built-ins. No external deps.
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { detectProject } from "../detect.js";
import {
  collectPackageDeps,
  getAllComponents,
  resolveComponentClosure,
} from "../registry.js";
import { runInit } from "./init.js";

export interface AddOptions {
  cwd?: string;
  components: string[];
  skipInit?: boolean;
  yes?: boolean;
}

// ---------------------------------------------------------------------------
// Install helpers
// ---------------------------------------------------------------------------

function buildInstallCommand(
  packages: string[],
  pm: string,
  dev = false,
): string {
  const flag = dev
    ? pm === "yarn"
      ? "--dev"
      : pm === "npm"
      ? "--save-dev"
      : "-D"
    : "";
  const pkgList = packages.join(" ");
  switch (pm) {
    case "pnpm":
      return `pnpm add ${flag} ${pkgList}`.trim();
    case "yarn":
      return `yarn add ${flag} ${pkgList}`.trim();
    case "bun":
      return `bun add ${flag} ${pkgList}`.trim();
    default:
      return `npm install ${flag} ${pkgList}`.trim();
  }
}

function installPackages(
  packages: string[],
  pm: string,
  cwd: string,
  dev = false,
): void {
  if (packages.length === 0) return;
  const cmd = buildInstallCommand(packages, pm, dev);
  console.log(`  Running: ${cmd}`);
  try {
    execSync(cmd, { cwd, stdio: "inherit" });
  } catch {
    console.warn(`  ⚠ Install failed. Run manually:\n    ${cmd}`);
  }
}

// ---------------------------------------------------------------------------
// Package.json helpers
// ---------------------------------------------------------------------------

function readProjectPkg(cwd: string): Record<string, unknown> {
  const pkgPath = join(cwd, "package.json");
  if (!existsSync(pkgPath)) return {};
  try {
    return JSON.parse(readFileSync(pkgPath, "utf8")) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function getInstalledPackages(cwd: string): Set<string> {
  const pkg = readProjectPkg(cwd);
  const deps = (pkg["dependencies"] ?? {}) as Record<string, string>;
  const devDeps = (pkg["devDependencies"] ?? {}) as Record<string, string>;
  const peerDeps = (pkg["peerDependencies"] ?? {}) as Record<string, string>;
  return new Set([
    ...Object.keys(deps),
    ...Object.keys(devDeps),
    ...Object.keys(peerDeps),
  ]);
}

function getMissingPackageDeps(required: string[], cwd: string): string[] {
  const installed = getInstalledPackages(cwd);
  return required.filter((p) => !installed.has(p));
}

// ---------------------------------------------------------------------------
// Template package.json reader
// ---------------------------------------------------------------------------

/**
 * Reads the template's package.json.tpl for the given framework and returns
 * its dependencies and devDependencies, excluding the {{PROJECT_NAME}} placeholder.
 */
function getTemplateDeps(framework: string): {
  deps: string[];
  devDeps: string[];
} {
  const selfDir = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(selfDir, "templates", framework, "package.json.tpl"),
    join(selfDir, "..", "src", "templates", framework, "package.json.tpl"),
    join(selfDir, "..", "templates", framework, "package.json.tpl"),
  ];

  let tplPath: string | undefined;
  for (const c of candidates) {
    if (existsSync(c)) {
      tplPath = c;
      break;
    }
  }
  if (!tplPath) return { deps: [], devDeps: [] };

  let content: string;
  try {
    content = readFileSync(tplPath, "utf8");
  } catch {
    return { deps: [], devDeps: [] };
  }

  const json = content.replace(/\{\{PROJECT_NAME\}\}/g, "tmp-project");

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(json) as Record<string, unknown>;
  } catch {
    return { deps: [], devDeps: [] };
  }

  return {
    deps: Object.keys((parsed["dependencies"] ?? {}) as Record<string, string>),
    devDeps: Object.keys(
      (parsed["devDependencies"] ?? {}) as Record<string, string>,
    ),
  };
}

// ---------------------------------------------------------------------------
// Prompt helper
// ---------------------------------------------------------------------------

async function confirm(question: string, defaultYes = true): Promise<boolean> {
  const { createInterface } = await import("readline");
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((res) => {
    const hint = defaultYes ? "[Y/n]" : "[y/N]";
    rl.question(`${question} ${hint} `, (answer) => {
      rl.close();
      const t = answer.trim().toLowerCase();
      res(t === "" ? defaultYes : t === "y" || t === "yes");
    });
  });
}

// ---------------------------------------------------------------------------
// Component file stubs
// ---------------------------------------------------------------------------

function writeComponentStubs(componentName: string, cwd: string): void {
  const cap = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  const dir = join(cwd, "components", cap);

  if (existsSync(join(dir, `${cap}.tsx`))) {
    console.log(`  ✓ ${cap} already exists — skipping`);
    return;
  }

  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, `${cap}.tsx`),
    `export { ${cap} } from "@stareezy-ui/components";\n`,
    "utf8",
  );
  writeFileSync(
    join(dir, `${cap}.style.ts`),
    `// Extend or override ${cap} styles here\nexport {};\n`,
    "utf8",
  );
  writeFileSync(
    join(dir, "index.ts"),
    `export { ${cap} } from "./${cap}";\n`,
    "utf8",
  );
  console.log(`  + added ${cap} → components/${cap}/`);
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
      "⚠ Could not detect framework (next/vite/expo). Continuing anyway.",
    );
  }
  console.log(
    `Detected: framework=${project.framework}, pm=${project.packageManager}`,
  );

  // 2. Resolve component closure
  let resolved;
  try {
    resolved = resolveComponentClosure(options.components);
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }

  const extra = resolved
    .map((c) => c.name)
    .filter((n) => !options.components.includes(n));
  if (extra.length > 0)
    console.log(`Resolved transitive deps: ${extra.join(", ")}`);

  // 3. Install ALL packages from the framework template's package.json.tpl
  if (project.framework !== "unknown") {
    const { deps: tplDeps, devDeps: tplDevDeps } = getTemplateDeps(
      project.framework,
    );
    const missingDeps = getMissingPackageDeps(tplDeps, cwd);
    const missingDevDeps = getMissingPackageDeps(tplDevDeps, cwd);

    if (missingDeps.length > 0) {
      console.log(`\nInstalling template packages: ${missingDeps.join(", ")}`);
      installPackages(missingDeps, project.packageManager, cwd, false);
    }
    if (missingDevDeps.length > 0) {
      console.log(
        `\nInstalling template dev packages: ${missingDevDeps.join(", ")}`,
      );
      installPackages(missingDevDeps, project.packageManager, cwd, true);
    }
    if (missingDeps.length === 0 && missingDevDeps.length === 0) {
      console.log("  ✓ All template packages already present");
    }
  }

  // 4. Ensure @stareezy-ui/* packages from the component registry
  const requiredPkgs = collectPackageDeps(resolved);
  const missingPkgs = getMissingPackageDeps(requiredPkgs, cwd);
  if (missingPkgs.length > 0) {
    console.log(
      `\nInstalling @stareezy-ui/* packages: ${missingPkgs.join(", ")}`,
    );
    installPackages(missingPkgs, project.packageManager, cwd, false);
  } else {
    console.log("  ✓ All @stareezy-ui/* packages already present");
  }

  // 5. Offer init when config / wiring / ThemeProvider is missing
  if (
    !options.skipInit &&
    (!project.hasConfig || !project.hasWiring || !project.hasThemeProvider)
  ) {
    const missing: string[] = [];
    if (!project.hasConfig) missing.push("stareezy.config.ts");
    if (!project.hasWiring) missing.push("compiler wiring");
    if (!project.hasThemeProvider) missing.push("ThemeProvider");
    console.log(`\n⚠ Missing Stareezy-ui setup: ${missing.join(", ")}`);

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

  // 6. Write component stubs
  console.log("\nAdding components:");
  for (const entry of resolved) {
    writeComponentStubs(entry.name, cwd);
  }

  console.log(`\n✓ Done! Added: ${resolved.map((c) => c.name).join(", ")}`);
}
