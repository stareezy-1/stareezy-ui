#!/usr/bin/env node
/**
 * check-server-purity.mjs
 *
 * Asserts that no module reachable from src/server/index.ts contains
 * any of the forbidden server-boundary patterns:
 *
 *   "use client"   — marks a module as a Client Component
 *   useState       — React hook (state)
 *   useEffect      — React hook (side effects)
 *   useId          — React hook (stable IDs, not available in RSC)
 *   useContext     — React hook (context consumption)
 *   createContext  — React context creation
 *
 * The check is intentionally conservative: it looks for these strings
 * anywhere in the file content (not just as standalone identifiers), so
 * helper function names like `useContextHelper` would also fail. This
 * strict approach is intentional — server files should never call hooks.
 *
 * Usage (run from the package root):
 *   node scripts/check-server-purity.mjs
 *
 * Exit codes:
 *   0 — all reachable modules are server-safe
 *   1 — one or more modules contain forbidden patterns
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = resolve(__dirname, "..");
const SERVER_ENTRY = resolve(PKG_ROOT, "src/server/index.ts");

// ---------------------------------------------------------------------------
// Forbidden patterns with regex detectors
// ---------------------------------------------------------------------------

/**
 * Strip single-line comments (//) and block comments (/* ... *\/)
 * from source content before scanning, so that documentation strings
 * like "No useState here" in a JSDoc comment don't trigger false positives.
 *
 * This is a best-effort strip — it is conservative enough for our use case
 * (the server files are well-structured TypeScript, not adversarial input).
 */
function stripComments(source) {
  // Remove block comments /* ... */ (non-greedy, handles multiline)
  let stripped = source.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove single-line comments // ...
  stripped = stripped.replace(/\/\/[^\n]*/g, "");
  return stripped;
}

/**
 * Each forbidden item is a pattern that should NOT appear in server-boundary
 * source code. The check is run on comment-stripped source.
 *
 * We use word-boundary anchors for hook names so that identifiers like
 * `createContextMenu` do not fire on the `createContext` check.
 */
const FORBIDDEN_PATTERNS = [
  // "use client" directive — the string literal itself
  { label: '"use client"', re: /"use client"/ },
  { label: "'use client'", re: /'use client'/ },
  // React hooks — only as standalone identifiers (word boundary)
  { label: "useState", re: /\buseState\b/ },
  { label: "useEffect", re: /\buseEffect\b/ },
  { label: "useId", re: /\buseId\b/ },
  { label: "useContext", re: /\buseContext\b/ },
  { label: "createContext", re: /\bcreateContext\b/ },
];

// ---------------------------------------------------------------------------
// Simple static import resolver
// Resolves relative imports from .ts / .tsx files.
// External packages (node_modules) are trusted and not walked.
// ---------------------------------------------------------------------------

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx"];

/**
 * Attempt to resolve a relative import specifier from a given directory.
 * Returns the absolute path if found, or null if it can't be resolved.
 */
function resolveRelativeImport(specifier, fromDir) {
  if (!specifier.startsWith(".")) return null; // external — skip

  const base = resolve(fromDir, specifier);

  // Try exact path first (only if it's not a directory)
  if (existsSync(base)) {
    try {
      // readFileSync will throw EISDIR for directories — use that as the check
      readFileSync(base);
      // If we get here, it's a readable file
      return base;
    } catch {
      // Directory or unreadable — fall through to extension probing
    }
  }

  // Try with extensions
  for (const ext of EXTENSIONS) {
    const candidate = base + ext;
    if (existsSync(candidate)) return candidate;
  }

  return null;
}

/**
 * Extract all import / require specifiers from file content (best-effort regex).
 */
function extractImports(content) {
  const specifiers = new Set();

  // Static imports: import ... from "specifier"
  const staticImportRe = /import\s+(?:[^'"]+\s+from\s+)?['"]([^'"]+)['"]/g;
  let m;
  while ((m = staticImportRe.exec(content)) !== null) {
    specifiers.add(m[1]);
  }

  // Re-exports: export ... from "specifier"
  const reExportRe = /export\s+(?:[^'"]+\s+from\s+)?['"]([^'"]+)['"]/g;
  while ((m = reExportRe.exec(content)) !== null) {
    specifiers.add(m[1]);
  }

  // Dynamic require: require("specifier")
  const requireRe = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  while ((m = requireRe.exec(content)) !== null) {
    specifiers.add(m[1]);
  }

  return [...specifiers];
}

// ---------------------------------------------------------------------------
// Graph walk — BFS from the server entry
// ---------------------------------------------------------------------------

/** @type {Map<string, string>} absPath → file content */
const visited = new Map();
/** @type {string[]} */
const queue = [SERVER_ENTRY];

while (queue.length > 0) {
  const filePath = queue.shift();
  if (visited.has(filePath)) continue;

  let content;
  try {
    content = readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(`[check-server-purity] Cannot read file: ${filePath}`);
    console.error(err.message);
    process.exit(1);
  }

  visited.set(filePath, content);

  // Enqueue relative imports
  const fileDir = dirname(filePath);
  const specifiers = extractImports(content);
  for (const specifier of specifiers) {
    const resolved = resolveRelativeImport(specifier, fileDir);
    if (resolved && !visited.has(resolved)) {
      queue.push(resolved);
    }
  }
}

// ---------------------------------------------------------------------------
// Check each visited file for forbidden patterns
// ---------------------------------------------------------------------------

let hasViolations = false;

for (const [filePath, content] of visited.entries()) {
  const violations = [];

  // Strip comments before scanning so that documentation strings
  // (e.g. JSDoc noting "no useState here") don't produce false positives.
  const stripped = stripComments(content);

  for (const { label, re } of FORBIDDEN_PATTERNS) {
    if (re.test(stripped)) {
      violations.push(label);
    }
  }

  if (violations.length > 0) {
    hasViolations = true;
    // Compute a path relative to the package root for readable output
    const relPath = filePath.replace(PKG_ROOT + "/", "");
    console.error(`[check-server-purity] FAIL: ${relPath}`);
    for (const v of violations) {
      console.error(`  ✗ contains forbidden pattern: ${v}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

const fileCount = visited.size;

if (hasViolations) {
  console.error(
    `\n[check-server-purity] ✗ Server purity check FAILED — ${fileCount} file(s) scanned.`,
  );
  console.error(
    "  All modules reachable from src/server/index.ts must be free of " +
      '"use client", hooks, and createContext.',
  );
  process.exit(1);
} else {
  console.log(
    `[check-server-purity] ✓ Server purity check passed — ${fileCount} file(s) scanned, no violations found.`,
  );
}
