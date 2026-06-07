/**
 * detect.ts — Framework and package-manager detection for an existing project.
 *
 * Uses only Node.js built-ins (fs, path). No external deps.
 */

import { existsSync, readFileSync } from "fs";
import { join } from "path";

export type Framework = "next" | "vite" | "expo" | "unknown";
export type PackageManager = "pnpm" | "yarn" | "npm" | "bun";

export interface DetectedProject {
  framework: Framework;
  packageManager: PackageManager;
  /** true when stareezy.config.ts is present in the project root */
  hasConfig: boolean;
  /** true when compiler/runtime wiring is detected */
  hasWiring: boolean;
  /** true when ThemeProvider is set up */
  hasThemeProvider: boolean;
}

/** Read and parse a package.json, returning an empty object on error. */
function readPackageJson(dir: string): Record<string, unknown> {
  const pkgPath = join(dir, "package.json");
  if (!existsSync(pkgPath)) return {};
  try {
    return JSON.parse(readFileSync(pkgPath, "utf8")) as Record<string, unknown>;
  } catch {
    return {};
  }
}

/**
 * Detect the JS framework used in the project at `dir`.
 *
 * Priority: next > expo > vite (vite is a devDep in many projects so check last).
 */
export function detectFramework(dir: string): Framework {
  const pkg = readPackageJson(dir);

  const deps = (pkg["dependencies"] ?? {}) as Record<string, string>;
  const devDeps = (pkg["devDependencies"] ?? {}) as Record<string, string>;
  const allDeps = { ...deps, ...devDeps };

  if ("next" in deps) return "next";
  if ("expo" in deps) return "expo";
  if ("vite" in allDeps) return "vite";

  return "unknown";
}

/**
 * Detect the package manager used in the project at `dir`.
 *
 * Checks for lockfiles in order of specificity.
 */
export function detectPackageManager(dir: string): PackageManager {
  if (existsSync(join(dir, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(dir, "yarn.lock"))) return "yarn";
  if (existsSync(join(dir, "bun.lockb"))) return "bun";
  if (existsSync(join(dir, "package-lock.json"))) return "npm";
  // Default to npm when nothing is found
  return "npm";
}

/**
 * Read a file as text, returning empty string when absent.
 */
function readText(filePath: string): string {
  if (!existsSync(filePath)) return "";
  try {
    return readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

/**
 * Detect whether a stareezy.config.ts already exists in `dir`.
 */
export function detectConfig(dir: string): boolean {
  return existsSync(join(dir, "stareezy.config.ts"));
}

/**
 * Detect whether compiler/runtime wiring is present.
 *
 * For Next.js: looks for `stareezyVitePlugin` in next.config.*
 * For Vite:   looks for `stareezyVitePlugin` in vite.config.*
 * For Expo:   looks for `stareezyMetroTransformer` in metro.config.*
 */
export function detectWiring(dir: string, framework: Framework): boolean {
  switch (framework) {
    case "next": {
      for (const name of [
        "next.config.js",
        "next.config.mjs",
        "next.config.ts",
      ]) {
        const text = readText(join(dir, name));
        if (text.includes("stareezyVitePlugin")) return true;
      }
      return false;
    }
    case "vite": {
      for (const name of [
        "vite.config.ts",
        "vite.config.js",
        "vite.config.mjs",
      ]) {
        const text = readText(join(dir, name));
        if (text.includes("stareezyVitePlugin")) return true;
      }
      return false;
    }
    case "expo": {
      for (const name of ["metro.config.js", "metro.config.ts"]) {
        const text = readText(join(dir, name));
        if (text.includes("stareezyMetroTransformer")) return true;
      }
      return false;
    }
    default:
      return false;
  }
}

/**
 * Detect whether a ThemeProvider setup exists in the project.
 *
 * Searches the common app entry files for a ThemeProvider import.
 */
export function detectThemeProvider(dir: string): boolean {
  const candidates = [
    // Next.js
    join(dir, "app", "layout.tsx"),
    join(dir, "app", "layout.jsx"),
    join(dir, "app", "_app.tsx"),
    join(dir, "app", "_app.jsx"),
    join(dir, "pages", "_app.tsx"),
    join(dir, "pages", "_app.jsx"),
    // Vite / generic
    join(dir, "src", "main.tsx"),
    join(dir, "src", "main.jsx"),
    join(dir, "src", "App.tsx"),
    join(dir, "src", "App.jsx"),
    // Expo
    join(dir, "App.tsx"),
    join(dir, "App.jsx"),
    join(dir, "app", "_layout.tsx"),
    join(dir, "app", "_layout.jsx"),
  ];

  for (const file of candidates) {
    const text = readText(file);
    if (text.includes("ThemeProvider")) return true;
  }
  return false;
}

/**
 * Run full detection for the project rooted at `dir`.
 */
export function detectProject(dir: string): DetectedProject {
  const framework = detectFramework(dir);
  const packageManager = detectPackageManager(dir);
  const hasConfig = detectConfig(dir);
  const hasWiring = detectWiring(dir, framework);
  const hasThemeProvider = detectThemeProvider(dir);

  return { framework, packageManager, hasConfig, hasWiring, hasThemeProvider };
}
