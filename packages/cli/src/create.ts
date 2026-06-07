/**
 * create-quasify bin entry point.
 *
 * Delegates directly to the create command.
 * Usage: create-quasify [project-name] [--template next|vite|expo]
 */

import { runCreate } from "./commands/create.js";
import type { TemplateKind } from "./commands/create.js";

function parseArgs(argv: string[]): {
  projectName?: string;
  template?: TemplateKind;
} {
  const args = argv.slice(2);
  let projectName: string | undefined;
  let template: TemplateKind | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--template" || arg === "-t") {
      const val = args[++i];
      if (val === "next" || val === "vite" || val === "expo") {
        template = val;
      }
    } else if (!arg.startsWith("-")) {
      projectName = arg;
    }
  }

  return { projectName, template };
}

async function main(): Promise<void> {
  const { projectName, template } = parseArgs(process.argv);
  await runCreate({ projectName, template, cwd: process.cwd() });
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
