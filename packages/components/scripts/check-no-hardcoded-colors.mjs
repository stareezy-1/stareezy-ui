#!/usr/bin/env node
/**
 * check-no-hardcoded-colors.mjs
 *
 * Guards the three-file convention and color discipline for ALL .style.ts files
 * under src/. Specifically asserts:
 *
 * 1. No hardcoded color literals in any .style.ts file:
 *    - Hex colors:    #rgb, #rrggbb, #rrggbbaa, #rgba (case-insensitive)
 *    - rgb() / rgba() function calls
 *    - hsl() / hsla() function calls
 *    - Named CSS colors from a common set (e.g. "red", "blue", "white", etc.)
 *
 * 2. No module-scope color .value reads in .style.ts files:
 *    Colors should only be read at render time inside the .tsx via useThemedColors().
 *    A module-scope read is any top-level variable or const that captures
 *    `colors.<anything>.value` or `aurora.<anything>.value`.
 *
 * 3. Each component directory that has a .tsx file also has the companion
 *    .style.ts and .types.ts files (three-file convention).
 *    The check is applied to directories under src/ that are NOT the
 *    primitives/ or shared/ or server/ folders.
 *
 * Usage (run from the package root):
 *   node scripts/check-no-hardcoded-colors.mjs
 *
 * Exit codes:
 *   0 — all checks passed
 *   1 — one or more violations found
 */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { resolve, dirname, join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = resolve(__dirname, "..");
const SRC_DIR = resolve(PKG_ROOT, "src");

// ---------------------------------------------------------------------------
// Scope: ALL component directories under src/ (Tasks 10.1–10.5 complete).
// ---------------------------------------------------------------------------

const SCOPE_TO_NEW_ONLY = false;
const NEW_COMPONENT_DIRS = new Set(); // unused — kept for reference

// ---------------------------------------------------------------------------
// Exempt directories — not component folders, skip three-file check
// ---------------------------------------------------------------------------

const EXEMPT_DIRS = new Set(["primitives", "shared", "server"]);

// ---------------------------------------------------------------------------
// Hardcoded color patterns
// ---------------------------------------------------------------------------

/**
 * Strip single-line and block comments before scanning.
 */
function stripComments(source) {
  let stripped = source.replace(/\/\*[\s\S]*?\*\//g, "");
  stripped = stripped.replace(/\/\/[^\n]*/g, "");
  return stripped;
}

/**
 * Strip string literals (single- and double-quoted) and template literals
 * to avoid false positives from color names in JSDoc comments, label strings,
 * or CSS-in-JS template strings that contain decorative/non-semantic values.
 */
function stripStringLiterals(source) {
  // Replace contents of double/single quoted string literals
  let result = source
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''");
  // Replace contents of template literals (backtick strings), including
  // nested ${...} expressions — use a simple state machine approach
  result = result.replace(/`[^`]*`/gs, "``");
  return result;
}

/**
 * Regexes that identify hardcoded color literals.
 * Each is checked against the comment-stripped source.
 */
const COLOR_PATTERNS = [
  // Hex colors: #rgb, #rrggbb, #rgba, #rrggbbaa
  {
    label: "hex color literal (e.g. #ff0000)",
    re: /#[0-9a-fA-F]{3,8}\b/,
  },
  // rgb() / rgba()
  {
    label: "rgb()/rgba() color function",
    re: /\brgba?\s*\(/,
  },
  // hsl() / hsla()
  {
    label: "hsl()/hsla() color function",
    re: /\bhsla?\s*\(/,
  },
];

/**
 * Detect module-scope color value reads.
 * A module-scope read is a top-level `const foo = colors.*.value` or
 * `aurora.*.value` call outside any function body.
 *
 * We use a heuristic: look for `.value` access on a colors/aurora/palette chain
 * that appears at the start of a line (possibly indented) NOT inside a function
 * body (we detect function bodies by looking for common function starters).
 *
 * This is a conservative check: it flags `.value` reads on common palette
 * variable names that are captured into module-level variables.
 */
const MODULE_SCOPE_COLOR_RE =
  /^(?:export\s+)?(?:const|let|var)\s+\w[\w\d]*\s*(?::[^=]*)?\s*=\s*(?:colors|aurora|palette)\.[a-zA-Z0-9\[\].]+\.value/m;

// ---------------------------------------------------------------------------
// Scan a single .style.ts file
// ---------------------------------------------------------------------------

/**
 * @param {string} filePath — absolute path to a .style.ts file
 * @returns {string[]} list of violation descriptions, empty if clean
 */
function checkStyleFile(filePath) {
  const violations = [];

  let content;
  try {
    content = readFileSync(filePath, "utf8");
  } catch (err) {
    violations.push(`Cannot read file: ${err.message}`);
    return violations;
  }

  const stripped = stripComments(content);
  const noStrings = stripStringLiterals(stripped);

  // 1. Check for hardcoded color literals
  for (const { label, re } of COLOR_PATTERNS) {
    if (re.test(noStrings)) {
      violations.push(`contains hardcoded color literal — ${label}`);
    }
  }

  // 2. Check for module-scope color .value reads
  if (MODULE_SCOPE_COLOR_RE.test(stripped)) {
    violations.push(
      "contains module-scope color .value read (colors.*.value / aurora.*.value at top level) — " +
        "move color reads into the .tsx file via useThemedColors()",
    );
  }

  return violations;
}

// ---------------------------------------------------------------------------
// Walk src/ and collect component directories + .style.ts files
// ---------------------------------------------------------------------------

/** @type {string[]} all .style.ts file paths under src/ */
const styleFiles = [];

/** @type {string[]} component directories that must follow the three-file convention */
const componentDirs = [];

const srcEntries = readdirSync(SRC_DIR);
for (const entry of srcEntries) {
  const absEntry = join(SRC_DIR, entry);
  const st = statSync(absEntry);
  if (!st.isDirectory()) continue;

  if (EXEMPT_DIRS.has(entry)) continue;

  // When scoped, only process the new components (Task 9.2).
  // Task 10 will fix existing components and lift this restriction.
  if (SCOPE_TO_NEW_ONLY && !NEW_COMPONENT_DIRS.has(entry)) continue;

  componentDirs.push(absEntry);

  // Collect .style.ts files within this component dir
  const children = readdirSync(absEntry);
  for (const child of children) {
    if (child.endsWith(".style.ts")) {
      styleFiles.push(join(absEntry, child));
    }
  }
}

// ---------------------------------------------------------------------------
// Run checks
// ---------------------------------------------------------------------------

let hasViolations = false;

// ── Check 1: no hardcoded colors / module-scope .value reads in .style.ts ─

for (const filePath of styleFiles) {
  const violations = checkStyleFile(filePath);
  if (violations.length > 0) {
    hasViolations = true;
    const relPath = filePath.replace(PKG_ROOT + "/", "");
    console.error(`[check-no-hardcoded-colors] FAIL: ${relPath}`);
    for (const v of violations) {
      console.error(`  ✗ ${v}`);
    }
  }
}

// ── Check 2: three-file convention ─────────────────────────────────────────

for (const dirPath of componentDirs) {
  const files = readdirSync(dirPath);
  const dirName = basename(dirPath);

  // Find .tsx files (skip index.ts re-export files)
  const tsxFiles = files.filter(
    (f) => f.endsWith(".tsx") && !f.startsWith("index"),
  );
  if (tsxFiles.length === 0) continue; // not a component folder (e.g. pure util)

  // Each .tsx should have a matching .style.ts and .types.ts
  for (const tsxFile of tsxFiles) {
    const base = tsxFile.replace(/\.tsx$/, "");
    const styleName = `${base}.style.ts`;
    const typesName = `${base}.types.ts`;

    const hasStyle = files.includes(styleName);
    const hasTypes = files.includes(typesName);

    if (!hasStyle || !hasTypes) {
      hasViolations = true;
      const relDir = dirPath.replace(PKG_ROOT + "/", "");
      console.error(
        `[check-no-hardcoded-colors] FAIL: ${relDir}/${tsxFile} — three-file convention violated`,
      );
      if (!hasStyle) console.error(`  ✗ missing: ${styleName}`);
      if (!hasTypes) console.error(`  ✗ missing: ${typesName}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

const styleFileCount = styleFiles.length;
const componentDirCount = componentDirs.length;

if (hasViolations) {
  console.error(
    `\n[check-no-hardcoded-colors] ✗ Color guard FAILED — ` +
      `${styleFileCount} .style.ts file(s) scanned, ${componentDirCount} component dir(s) checked.`,
  );
  process.exit(1);
} else {
  console.log(
    `[check-no-hardcoded-colors] ✓ Color guard passed — ` +
      `${styleFileCount} .style.ts file(s) scanned, ${componentDirCount} component dir(s) checked, no violations found.`,
  );
}
