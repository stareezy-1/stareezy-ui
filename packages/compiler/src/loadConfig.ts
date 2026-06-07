/**
 * loadQuasifyConfig — reads the user's quasify.config.ts / quasify.config.js
 * at build time and extracts shorthands + boxPropsComponents for the compiler.
 *
 * The config file is resolved relative to the project root (process.cwd()).
 * It must export a `ui` object produced by `createUi()`.
 *
 * Supported filenames (in resolution order):
 *   quasify.config.ts
 *   quasify.config.js
 *   quasify.config.mjs
 *   quasify.config.cjs
 */

import path from "path";
import fs from "fs";

export interface QuasifyBuildConfig {
  /** Shorthand → CSS property mappings extracted from createUi({ shorthands }) */
  shorthands: Record<string, string | string[]>;
  /** Component names that accept BoxProps (for compiler scoping) */
  boxPropsComponents?: Set<string>;
}

const CONFIG_FILENAMES = [
  "quasify.config.ts",
  "quasify.config.js",
  "quasify.config.mjs",
  "quasify.config.cjs",
];

/**
 * Attempts to load and parse the user's quasify.config.* file.
 * Returns null if no config file is found.
 *
 * Uses a best-effort require/import — if the file uses TypeScript syntax
 * and ts-node / tsx is not available, falls back to parsing the shorthands
 * statically from the source text.
 */
export function loadQuasifyConfig(cwd = process.cwd()): QuasifyBuildConfig | null {
  for (const filename of CONFIG_FILENAMES) {
    const fullPath = path.join(cwd, filename);
    if (!fs.existsSync(fullPath)) continue;

    try {
      // Try dynamic require first (works for .js/.cjs and when ts-node is available)
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require(fullPath) as Record<string, unknown>;
      const ui = (mod["ui"] ?? mod["default"]) as
        | {
            shorthands?: Record<string, string>;
            boxPropsComponents?: Set<string>;
          }
        | undefined;

      if (ui?.shorthands) {
        return {
          shorthands: ui.shorthands as Record<string, string | string[]>,
          boxPropsComponents: ui.boxPropsComponents,
        };
      }
    } catch {
      // Fallback: parse shorthands statically from source text
      const source = fs.readFileSync(fullPath, "utf-8");
      const shorthands = parseShorthandsFromSource(source);
      if (Object.keys(shorthands).length > 0) {
        return { shorthands };
      }
    }
  }

  return null;
}

/**
 * Static fallback: extracts the shorthands object literal from source text
 * using a simple regex. Handles the common pattern:
 *
 *   shorthands: {
 *     bg: 'backgroundColor',
 *     p: 'padding',
 *   } as const
 */
function parseShorthandsFromSource(source: string): Record<string, string> {
  const result: Record<string, string> = {};

  // Find the shorthands: { ... } block
  const blockMatch = source.match(/shorthands\s*:\s*\{([^}]+)\}/);
  if (!blockMatch?.[1]) return result;

  const block = blockMatch[1];
  // Match key: 'value' or key: "value" pairs
  const pairRegex = /(\w+)\s*:\s*['"]([^'"]+)['"]/g;
  let m: RegExpExecArray | null;
  while ((m = pairRegex.exec(block)) !== null) {
    if (m[1] && m[2]) result[m[1]] = m[2];
  }

  return result;
}
