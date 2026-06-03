#!/usr/bin/env node
/**
 * check-peer-ranges.mjs
 *
 * Static check that asserts all @stareezy-ui/* packages declare the correct
 * ranged peerDependencies for the Compatibility_Matrix (Req 7.6).
 *
 * Rules:
 *   - peerDependencies.react        === "^18 || ^19"       (if present)
 *   - peerDependencies.react-dom    === "^18 || ^19"       (if present)
 *   - peerDependencies.react-native === ">=0.81 <0.87"     (if present)
 *   - peerDependencies.vite         must start with ">=4"  (if present, covers majors 4-7)
 *
 * Exits 0 on success, 1 on any violation.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const packagesDir = resolve(__dirname, "../packages");

const EXPECTED_REACT = "^18 || ^19";
const EXPECTED_REACT_DOM = "^18 || ^19";
const EXPECTED_REACT_NATIVE = ">=0.81 <0.87";
// Vite range must start with ">=4" and have an upper bound that caps at 8 (covers 4-7)
const VITE_VALID_RE = /^>=4\.\d+\.\d+ <8$/;

let violations = 0;

function fail(pkg, dep, actual, expected) {
  console.error(
    `✗  ${pkg}: peerDependencies.${dep}\n` +
      `     expected: ${expected}\n` +
      `     actual:   ${actual}`,
  );
  violations++;
}

function checkPackage(pkgDir) {
  const pkgJsonPath = join(pkgDir, "package.json");
  let pkg;
  try {
    pkg = JSON.parse(readFileSync(pkgJsonPath, "utf8"));
  } catch {
    // Not a package (no package.json) — skip.
    return;
  }

  const peers = pkg.peerDependencies ?? {};
  const name = pkg.name ?? pkgDir;

  if ("react" in peers) {
    if (peers["react"] !== EXPECTED_REACT) {
      fail(name, "react", peers["react"], EXPECTED_REACT);
    }
  }

  if ("react-dom" in peers) {
    if (peers["react-dom"] !== EXPECTED_REACT_DOM) {
      fail(name, "react-dom", peers["react-dom"], EXPECTED_REACT_DOM);
    }
  }

  if ("react-native" in peers) {
    if (peers["react-native"] !== EXPECTED_REACT_NATIVE) {
      fail(name, "react-native", peers["react-native"], EXPECTED_REACT_NATIVE);
    }
  }

  if ("vite" in peers) {
    if (!VITE_VALID_RE.test(peers["vite"])) {
      fail(name, "vite", peers["vite"], ">=4.x.x <8 (covers Vite 4–7)");
    }
  }
}

// Walk packages/*
for (const entry of readdirSync(packagesDir)) {
  const pkgDir = join(packagesDir, entry);
  if (statSync(pkgDir).isDirectory()) {
    checkPackage(pkgDir);
  }
}

if (violations === 0) {
  console.log("✓  All peerDependency ranges are correct.");
  process.exit(0);
} else {
  console.error(`\n${violations} violation(s) found.`);
  process.exit(1);
}
