/**
 * stareezy CLI — main entry point.
 *
 * Usage:
 *   stareezy create [project-name] [--template next|vite|expo]
 *   stareezy init   [--yes]
 *   stareezy add    <component> [component...] [--yes] [--skip-init]
 */

import { runCreate } from "./commands/create.js";
import { runInit } from "./commands/init.js";
import { runAdd } from "./commands/add.js";
import { getAllComponents } from "./registry.js";

// ---------------------------------------------------------------------------
// Arg parsing helpers (zero external deps)
// ---------------------------------------------------------------------------

function parseArgs(argv: string[]): {
  command: string;
  positionals: string[];
  flags: Record<string, string | boolean>;
} {
  const args = argv.slice(2); // strip "node" + script path
  const positionals: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i++; // consume value
      } else {
        flags[key] = true;
      }
    } else {
      positionals.push(arg);
    }
  }

  const command = positionals[0] ?? "";
  return { command, positionals: positionals.slice(1), flags };
}

function printHelp(): void {
  console.log(`
stareezy — Stareezy UI CLI

Usage:
  stareezy create [project-name] [--template next|vite|expo]
  stareezy init   [--yes]
  stareezy add    <component> [component...] [--yes] [--skip-init]

Commands:
  create   Scaffold a new project from a pre-wired template
  init     Add stareezy.config.ts, compiler wiring, and ThemeProvider to the current project
  add      Install one or more components into the current project

Options:
  --template   Template to use with create (next | vite | expo)
  --yes        Answer yes to all prompts
  --skip-init  Skip the init offer when running add

Available components:
  ${getAllComponents()
    .map((c) => c.name)
    .join(", ")}

Examples:
  stareezy create my-app --template next
  stareezy init
  stareezy add button input card
`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const { command, positionals, flags } = parseArgs(process.argv);
  const cwd = process.cwd();
  const yes = flags["yes"] === true;

  switch (command) {
    case "create": {
      const projectName = positionals[0];
      const rawTemplate = flags["template"] as string | undefined;
      const template =
        rawTemplate === "next" ||
        rawTemplate === "vite" ||
        rawTemplate === "expo"
          ? rawTemplate
          : undefined;
      await runCreate({ projectName, template, cwd });
      break;
    }

    case "init": {
      console.log("Initialising stareezy in the current project...\n");
      const result = await runInit({ cwd, yes });
      if (
        result.skippedConfig &&
        result.skippedWiring &&
        result.skippedThemeProvider
      ) {
        console.log("\n✓ Everything is already set up — nothing to do.");
      } else {
        console.log("\n✓ Init complete.");
      }
      break;
    }

    case "add": {
      if (positionals.length === 0) {
        console.error("Error: provide at least one component name.\n");
        console.log(
          "Available components: " +
            getAllComponents()
              .map((c) => c.name)
              .join(", "),
        );
        process.exit(1);
      }
      await runAdd({
        cwd,
        components: positionals,
        yes,
        skipInit: flags["skip-init"] === true,
      });
      break;
    }

    case "":
    case "help":
    case "--help":
    case "-h": {
      printHelp();
      break;
    }

    default: {
      console.error(`Unknown command: "${command}"\n`);
      printHelp();
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
