/**
 * create command — scaffold a stareezy-ui starter using the official CLI of
 * each framework (create-next-app / create-vite / create-expo-app), then
 * layer on the stareezy config, compiler wiring and ThemeProvider.
 *
 * Strategy:
 *   1. Run the upstream scaffolder (honours their defaults / prompts)
 *   2. Immediately run `stareezy init` in the created directory to inject
 *      stareezy.config.ts, compiler wiring, and ThemeProvider
 *
 * Uses only Node.js built-ins. No external deps.
 */

import { existsSync } from "fs";
import { resolve, basename } from "path";
import { execSync, spawnSync } from "child_process";
import { createInterface } from "readline";
import { detectPackageManager } from "../detect.js";
import { runInit } from "./init.js";

export type TemplateKind = "next" | "vite" | "expo";

export interface CreateOptions {
  /** Project name (directory name). */
  projectName?: string;
  /** Template to scaffold. */
  template?: TemplateKind;
  /** Where to create the project. Defaults to process.cwd()/<projectName>. */
  cwd?: string;
  /** Skip all prompts, accept defaults. */
  yes?: boolean;
}

// ---------------------------------------------------------------------------
// Prompt helpers
// ---------------------------------------------------------------------------

function prompt(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function promptTemplate(): Promise<TemplateKind> {
  console.log("\nSelect a template:");
  console.log("  1. next  — Next.js App Router via create-next-app");
  console.log("  2. vite  — Vite + React via create-vite");
  console.log("  3. expo  — Expo SDK via create-expo-app");

  while (true) {
    const answer = await prompt("\nTemplate (next/vite/expo or 1/2/3): ");
    const n = answer.toLowerCase();
    if (n === "1" || n === "next") return "next";
    if (n === "2" || n === "vite") return "vite";
    if (n === "3" || n === "expo") return "expo";
    console.log("  Please enter 'next', 'vite', or 'expo'.");
  }
}

// ---------------------------------------------------------------------------
// Package-manager executor
// ---------------------------------------------------------------------------

function resolveRunner(pm: string): string {
  // pnpm and bun have their own create commands; yarn/npm use npx
  switch (pm) {
    case "pnpm":
      return "pnpm";
    case "bun":
      return "bunx";
    default:
      return "npx";
  }
}

/**
 * Build the `create-*` command for each template.
 * We pass `--yes` / `--default` flags when the user chose --yes so the
 * upstream scaffolder also skips its own prompts.
 */
function buildScaffoldCmd(
  template: TemplateKind,
  projectName: string,
  pm: string,
  yes: boolean,
): string {
  const runner = resolveRunner(pm);

  switch (template) {
    case "next": {
      // create-next-app flags:
      //   --typescript  always use TS
      //   --app         App Router
      //   --no-tailwind skip Tailwind (we ship our own style system)
      //   --no-eslint   user can add later
      //   --yes         accept all defaults silently
      const yesFlag = yes ? " --yes" : "";
      return `${runner} create-next-app@latest ${projectName} --typescript --app --no-tailwind --no-eslint${yesFlag}`;
    }

    case "vite": {
      // create-vite flags:
      //   --template react-ts  always React + TypeScript
      //   create-vite doesn't support --yes; name + template are enough for non-interactive
      return `${runner} create-vite@latest ${projectName} --template react-ts`;
    }

    case "expo": {
      // create-expo-app flags:
      //   --template blank-typescript  TypeScript blank template
      //   --no-install                 we install after patching package.json
      const yesFlag = yes ? " --yes" : "";
      return `${runner} create-expo-app@latest ${projectName} --template blank-typescript${yesFlag}`;
    }
  }
}

// ---------------------------------------------------------------------------
// stareezy packages installer
// ---------------------------------------------------------------------------

const STAREEZY_DEPS = [
  "@stareezy-ui/tokens",
  "@stareezy-ui/components",
  "@stareezy-ui/runtime",
];
const STAREEZY_DEV_DEPS = ["@stareezy-ui/compiler"];

function buildInstallCmd(pkgs: string[], pm: string, dev: boolean): string {
  const flag = dev ? (pm === "npm" ? "--save-dev" : "-D") : "";
  const list = pkgs.join(" ");
  switch (pm) {
    case "pnpm":
      return `pnpm add ${flag} ${list}`.trim();
    case "yarn":
      return `yarn add ${flag} ${list}`.trim();
    case "bun":
      return `bun add ${flag} ${list}`.trim();
    default:
      return `npm install ${flag} ${list}`.trim();
  }
}

function installStareezyPackages(targetDir: string, pm: string): void {
  console.log("\n  Installing @stareezy-ui/* packages...");

  const depCmd = buildInstallCmd(STAREEZY_DEPS, pm, false);
  console.log(`  Running: ${depCmd}`);
  try {
    execSync(depCmd, { cwd: targetDir, stdio: "inherit" });
  } catch {
    console.warn(
      `  ⚠ Failed to install runtime packages. Run manually:\n    ${depCmd}`,
    );
  }

  const devCmd = buildInstallCmd(STAREEZY_DEV_DEPS, pm, true);
  console.log(`  Running: ${devCmd}`);
  try {
    execSync(devCmd, { cwd: targetDir, stdio: "inherit" });
  } catch {
    console.warn(
      `  ⚠ Failed to install dev packages. Run manually:\n    ${devCmd}`,
    );
  }
}

// ---------------------------------------------------------------------------
// Main create command
// ---------------------------------------------------------------------------

export async function runCreate(options: CreateOptions = {}): Promise<void> {
  const cwd = options.cwd ?? process.cwd();
  const yes = options.yes ?? false;

  // 1. Resolve project name
  let projectName = options.projectName;
  if (!projectName) {
    projectName = await prompt("\nProject name: ");
    if (!projectName) {
      console.error("Error: project name is required.");
      process.exit(1);
    }
  }

  // Sanitise: lowercase, replace spaces/underscores with hyphens
  const safeName = projectName
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  if (!safeName) {
    console.error("Error: project name contains no valid characters.");
    process.exit(1);
  }

  // 2. Resolve template
  let template = options.template;
  if (!template) {
    template = await promptTemplate();
  }

  // 3. Compute target directory
  const targetDir = resolve(cwd, safeName);

  if (existsSync(targetDir)) {
    console.error(
      `Error: directory "${targetDir}" already exists. ` +
        `Choose a different project name or remove the directory.`,
    );
    process.exit(1);
  }

  // 4. Detect package manager from the workspace/caller context
  const pm = detectPackageManager(cwd);

  // 5. Run the upstream scaffolder
  const scaffoldCmd = buildScaffoldCmd(template, safeName, pm, yes);
  console.log(`\nScaffolding "${safeName}" with ${template}...`);
  console.log(`  Running: ${scaffoldCmd}\n`);

  const scaffoldResult = spawnSync(scaffoldCmd, {
    cwd,
    stdio: "inherit",
    shell: true,
  });

  if (scaffoldResult.status !== 0) {
    console.error(
      `\nError: scaffolder exited with status ${
        scaffoldResult.status ?? "unknown"
      }.`,
    );
    console.error(
      "Make sure you have an internet connection and the scaffolder is available.",
    );
    process.exit(scaffoldResult.status ?? 1);
  }

  if (!existsSync(targetDir)) {
    console.error(
      `\nError: scaffolder did not create "${targetDir}". ` +
        "The project name may have been changed by the scaffolder's own prompts.",
    );
    process.exit(1);
  }

  // 6. Install stareezy packages into the new project
  installStareezyPackages(targetDir, pm);

  // 7. Layer on stareezy: config, compiler wiring, ThemeProvider
  console.log("\n  Wiring stareezy-ui...");
  await runInit({ cwd: targetDir, yes: true });

  // 8. Done — print next steps
  const relTarget = basename(targetDir);
  console.log(`\n✓ Created ${relTarget}/\n`);
  console.log("Next steps:");
  console.log(`  cd ${relTarget}`);

  switch (template) {
    case "next":
      console.log(
        `  ${pm === "pnpm" ? "pnpm" : pm === "yarn" ? "yarn" : "npm run"} dev`,
      );
      console.log(
        `\n  Wrap your root app/layout.tsx with <Providers> from app/providers.tsx`,
      );
      break;
    case "vite":
      console.log(
        `  ${pm === "pnpm" ? "pnpm" : pm === "yarn" ? "yarn" : "npm run"} dev`,
      );
      console.log(
        `\n  Wrap your main App with <Providers> from src/providers.tsx`,
      );
      break;
    case "expo":
      console.log("  expo start");
      console.log(
        `\n  Wrap your root _layout.tsx with <Providers> from src/providers.tsx`,
      );
      break;
  }

  console.log(
    "\nstareezy.config.ts is ready — edit it to customise your\n" +
      "media breakpoints and prop shorthands.\n",
  );
}
