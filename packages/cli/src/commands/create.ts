/**
 * create command — scaffold a pre-wired stareezy-ui starter project.
 *
 * Supports three templates: next | vite | expo
 * Copies the template directory to the target path and substitutes {{PROJECT_NAME}}.
 *
 * Uses only Node.js built-ins. No external deps.
 */

import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs";
import { basename, join, resolve } from "path";
import { createInterface } from "readline";

export type TemplateKind = "next" | "vite" | "expo";

export interface CreateOptions {
  /** Project name (directory name + package.json name). */
  projectName?: string;
  /** Template to scaffold. */
  template?: TemplateKind;
  /** Where to create the project. Defaults to process.cwd()/<projectName>. */
  cwd?: string;
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
  console.log(
    "  1. next  — Next.js App Router (14–16) with RSC + client boundary",
  );
  console.log("  2. vite  — Vite + React with the Vite plugin");
  console.log(
    "  3. expo  — Expo SDK 55 (also builds on 54/56) with Metro transformer",
  );

  while (true) {
    const answer = await prompt("\nTemplate (next/vite/expo or 1/2/3): ");
    const normalized = answer.toLowerCase();
    if (normalized === "1" || normalized === "next") return "next";
    if (normalized === "2" || normalized === "vite") return "vite";
    if (normalized === "3" || normalized === "expo") return "expo";
    console.log("  Please enter 'next', 'vite', or 'expo'.");
  }
}

// ---------------------------------------------------------------------------
// Template resolution
// ---------------------------------------------------------------------------

/** Resolve the absolute path to the built-in template directory. */
function resolveTemplateDir(kind: TemplateKind): string {
  // __dirname points to dist/ after build; templates are co-located in src/
  // and copied verbatim by tsup. We support both source-tree and dist layouts.
  const candidates = [
    // dist layout (after build): dist/templates/<kind>
    join(__dirname, "templates", kind),
    // source layout (ts-node / development): src/templates/<kind>
    join(__dirname, "..", "src", "templates", kind),
    // one level up from commands/ folder
    join(__dirname, "..", "templates", kind),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  throw new Error(
    `Template directory for "${kind}" not found. ` +
      `Tried: ${candidates.join(", ")}`,
  );
}

// ---------------------------------------------------------------------------
// File tree copy with substitution
// ---------------------------------------------------------------------------

/**
 * Recursively copy `srcDir` to `destDir`, substituting `{{PROJECT_NAME}}`
 * in file contents and renaming `package.json.tpl` → `package.json`.
 */
function copyTemplate(
  srcDir: string,
  destDir: string,
  projectName: string,
): void {
  mkdirSync(destDir, { recursive: true });

  for (const entry of readdirSync(srcDir)) {
    const srcPath = join(srcDir, entry);
    const stat = statSync(srcPath);

    if (stat.isDirectory()) {
      copyTemplate(srcPath, join(destDir, entry), projectName);
      continue;
    }

    // Rename .tpl extension
    const destName = entry.endsWith(".tpl") ? entry.slice(0, -4) : entry;
    const destPath = join(destDir, destName);

    // Substitute project name in text files
    const textExtensions = new Set([
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".mjs",
      ".cjs",
      ".json",
      ".md",
      ".txt",
      ".html",
      ".css",
      ".yaml",
      ".yml",
    ]);
    const ext = destName.slice(destName.lastIndexOf("."));

    if (textExtensions.has(ext)) {
      const content = readFileSync(srcPath, "utf8")
        .split("{{PROJECT_NAME}}")
        .join(projectName);
      writeFileSync(destPath, content, "utf8");
    } else {
      // Binary files — copy as-is
      cpSync(srcPath, destPath);
    }
  }
}

// ---------------------------------------------------------------------------
// Main create command
// ---------------------------------------------------------------------------

export async function runCreate(options: CreateOptions = {}): Promise<void> {
  const cwd = options.cwd ?? process.cwd();

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

  // 3. Resolve target directory
  const targetDir = resolve(cwd, safeName);

  if (existsSync(targetDir)) {
    console.error(
      `Error: directory "${targetDir}" already exists. ` +
        `Choose a different project name or remove the directory.`,
    );
    process.exit(1);
  }

  // 4. Copy template
  console.log(`\nScaffolding "${safeName}" using the ${template} template...`);

  const templateDir = resolveTemplateDir(template);
  copyTemplate(templateDir, targetDir, safeName);

  // 5. Done — print next steps
  const relTarget = basename(targetDir);
  console.log(`\n✓ Created ${relTarget}/\n`);
  console.log("Next steps:");
  console.log(`  cd ${relTarget}`);

  switch (template) {
    case "next":
      console.log("  npm install   # or pnpm install / yarn");
      console.log("  npm run dev");
      break;
    case "vite":
      console.log("  npm install   # or pnpm install / yarn");
      console.log("  npm run dev");
      break;
    case "expo":
      console.log("  npm install   # or yarn");
      console.log("  expo start");
      break;
  }

  console.log(
    "\nThe project already includes stareezy.config.ts, compiler wiring,\n" +
      "and a ThemeProvider. Edit stareezy.config.ts to customise your\n" +
      "media breakpoints and shorthands.\n",
  );
}
