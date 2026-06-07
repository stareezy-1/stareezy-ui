/**
 * init command — idempotently create stareezy.config.ts, compiler/runtime
 * wiring, and ThemeProvider wrapper in an existing project.
 *
 * Uses only Node.js built-ins. No external deps.
 */

import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import {
  detectConfig,
  detectFramework,
  detectPackageManager,
  detectThemeProvider,
  detectWiring,
  type Framework,
} from "../detect.js";

// ---------------------------------------------------------------------------
// Template strings
// ---------------------------------------------------------------------------

const Stareezy_CONFIG_TS = `import { createUi } from "@stareezy-ui/tokens";

const ui = createUi({
  media: {
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
  shorthands: {
    p: "padding",
    px: "paddingHorizontal",
    py: "paddingVertical",
    pt: "paddingTop",
    pb: "paddingBottom",
    pl: "paddingLeft",
    pr: "paddingRight",
    m: "margin",
    mx: "marginHorizontal",
    my: "marginVertical",
    mt: "marginTop",
    mb: "marginBottom",
    ml: "marginLeft",
    mr: "marginRight",
    w: "width",
    h: "height",
    br: "borderRadius",
    bg: "backgroundColor",
  } as const,
});

export default ui;

type CustomUi = typeof ui;

declare module "@stareezy-ui/tokens" {
  interface SzrCustomConfig extends CustomUi {}
}
`;

function nextConfigWiring(existingContent: string): string {
  if (existingContent.includes("stareezyVitePlugin")) return existingContent;

  const importLine = `import { stareezyVitePlugin } from "@stareezy-ui/compiler";\n`;
  const pluginSnippet = `
  // Stareezy UI — inject virtual styles module
  experimental: {
    turbo: {
      resolveExtensions: [".tsx", ".ts", ".jsx", ".js"],
    },
  },
  webpack(config) {
    config.plugins = config.plugins || [];
    config.plugins.push(stareezyVitePlugin());
    return config;
  },`;

  // Naive insertion: if the file already has module.exports = { ... } or
  // export default { ... }, splice the plugin config in. Otherwise wrap.
  if (existingContent.match(/module\.exports\s*=/)) {
    return (
      importLine +
      existingContent.replace(
        /module\.exports\s*=\s*\{/,
        `module.exports = {${pluginSnippet}`,
      )
    );
  }
  if (existingContent.match(/export default/)) {
    return (
      importLine +
      existingContent.replace(
        /export default\s*\{/,
        `export default {\n${pluginSnippet}`,
      )
    );
  }

  // Fallback: prepend import, wrap a minimal config
  return (
    importLine +
    existingContent +
    `\n// TODO: add stareezyVitePlugin() to your Next.js config webpack plugins.\n`
  );
}

function viteConfigWiring(): string {
  return `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { stareezyVitePlugin } from "@stareezy-ui/compiler";

export default defineConfig(({ command }) => ({
  plugins: [
    // Only run the Stareezy compiler during production builds.
    // @babel/traverse has CJS/ESM interop issues in Vite's dev transform
    // pipeline; Box's inline responsive style injection handles dev-time
    // styling without the compiler.
    ...(command === "build" ? [stareezyVitePlugin()] : []),
    react(),
  ],
}));
`;
}

function expoMetroConfig(): string {
  return `const { getDefaultConfig } = require("expo/metro-config");
const { stareezyMetroTransformer } = require("@stareezy-ui/compiler/metro");

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: stareezyMetroTransformer,
};

module.exports = config;
`;
}

function nextThemeProviderWrapper(): string {
  return `"use client";
import { ThemeProvider } from "@stareezy-ui/tokens";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider theme="light">{children}</ThemeProvider>;
}
`;
}

function viteThemeProviderWrapper(): string {
  return `import { ThemeProvider } from "@stareezy-ui/tokens";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider theme="light">{children}</ThemeProvider>;
}
`;
}

function expoThemeProviderWrapper(): string {
  return `import { ThemeProvider } from "@stareezy-ui/tokens";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider theme="light">{children}</ThemeProvider>;
}
`;
}

// ---------------------------------------------------------------------------
// Init logic
// ---------------------------------------------------------------------------

export interface InitOptions {
  /** Target project root directory. Defaults to process.cwd(). */
  cwd?: string;
  /** Skip interactive prompts and create everything. */
  yes?: boolean;
}

export interface InitResult {
  createdConfig: boolean;
  createdWiring: boolean;
  createdThemeProvider: boolean;
  skippedConfig: boolean;
  skippedWiring: boolean;
  skippedThemeProvider: boolean;
}

/**
 * Idempotent init: install @stareezy-ui/* packages, create stareezy.config.ts,
 * compiler wiring, and ThemeProvider in the project at `cwd`, skipping each
 * step when already present.
 */
export async function runInit(options: InitOptions = {}): Promise<InitResult> {
  const cwd = options.cwd ?? process.cwd();
  const framework = detectFramework(cwd);
  const pm = detectPackageManager(cwd);

  const result: InitResult = {
    createdConfig: false,
    createdWiring: false,
    createdThemeProvider: false,
    skippedConfig: false,
    skippedWiring: false,
    skippedThemeProvider: false,
  };

  // 0. Install required @stareezy-ui/* packages if missing
  installPackagesIfMissing(cwd, pm);

  // 1. stareezy.config.ts
  if (detectConfig(cwd)) {
    console.log("  ✓ stareezy.config.ts already exists — skipping");
    result.skippedConfig = true;
  } else {
    writeFileSync(join(cwd, "stareezy.config.ts"), Stareezy_CONFIG_TS, "utf8");
    console.log("  + created stareezy.config.ts");
    result.createdConfig = true;
  }

  // 2. Compiler / runtime wiring
  if (detectWiring(cwd, framework)) {
    console.log("  ✓ Compiler wiring already present — skipping");
    result.skippedWiring = true;
  } else {
    writeWiring(cwd, framework);
    result.createdWiring = true;
  }

  // 3. ThemeProvider wrapper
  if (detectThemeProvider(cwd)) {
    console.log("  ✓ ThemeProvider already set up — skipping");
    result.skippedThemeProvider = true;
  } else {
    writeThemeProvider(cwd, framework);
    result.createdThemeProvider = true;
  }

  return result;
}

// ---------------------------------------------------------------------------
// Package installation
// ---------------------------------------------------------------------------

const REQUIRED_PACKAGES = [
  "@stareezy-ui/tokens",
  "@stareezy-ui/components",
  "@stareezy-ui/runtime",
];
const REQUIRED_DEV_PACKAGES = ["@stareezy-ui/compiler"];

function getInstalledPackages(cwd: string): Set<string> {
  const pkgPath = join(cwd, "package.json");
  if (!existsSync(pkgPath)) return new Set();
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as Record<
      string,
      unknown
    >;
    const deps = (pkg["dependencies"] ?? {}) as Record<string, string>;
    const devDeps = (pkg["devDependencies"] ?? {}) as Record<string, string>;
    return new Set([...Object.keys(deps), ...Object.keys(devDeps)]);
  } catch {
    return new Set();
  }
}

function buildInstallCmd(packages: string[], pm: string, dev: boolean): string {
  const flag = dev ? (pm === "npm" ? "--save-dev" : "-D") : "";
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

function installPackagesIfMissing(cwd: string, pm: string): void {
  const installed = getInstalledPackages(cwd);

  const missingDeps = REQUIRED_PACKAGES.filter((p) => !installed.has(p));
  const missingDev = REQUIRED_DEV_PACKAGES.filter((p) => !installed.has(p));

  if (missingDeps.length > 0) {
    console.log(`  Installing: ${missingDeps.join(", ")}`);
    try {
      execSync(buildInstallCmd(missingDeps, pm, false), {
        cwd,
        stdio: "inherit",
      });
    } catch {
      console.warn(
        `  ⚠ Failed to install packages automatically. Run manually:\n    ${buildInstallCmd(
          missingDeps,
          pm,
          false,
        )}`,
      );
    }
  }

  if (missingDev.length > 0) {
    console.log(`  Installing dev: ${missingDev.join(", ")}`);
    try {
      execSync(buildInstallCmd(missingDev, pm, true), {
        cwd,
        stdio: "inherit",
      });
    } catch {
      console.warn(
        `  ⚠ Failed to install dev packages automatically. Run manually:\n    ${buildInstallCmd(
          missingDev,
          pm,
          true,
        )}`,
      );
    }
  }

  if (missingDeps.length === 0 && missingDev.length === 0) {
    console.log("  ✓ @stareezy-ui/* packages already present");
  }
}

// ---------------------------------------------------------------------------
// Wiring helpers
// ---------------------------------------------------------------------------

function writeWiring(cwd: string, framework: Framework): void {
  switch (framework) {
    case "next": {
      // Patch the existing next.config if it exists, else create a minimal one
      for (const name of [
        "next.config.js",
        "next.config.mjs",
        "next.config.ts",
      ]) {
        const configPath = join(cwd, name);
        if (existsSync(configPath)) {
          const existing = readFileSync(configPath, "utf8");
          const patched = nextConfigWiring(existing);
          if (patched !== existing) {
            writeFileSync(configPath, patched, "utf8");
            console.log(`  + patched ${name} with stareezyVitePlugin`);
          }
          return;
        }
      }
      // No next.config found — create a minimal one
      const minimal = `/** @type {import('next').NextConfig} */
import { stareezyVitePlugin } from "@stareezy-ui/compiler";

const nextConfig = {
  webpack(config) {
    config.plugins = config.plugins || [];
    config.plugins.push(stareezyVitePlugin());
    return config;
  },
};

export default nextConfig;
`;
      writeFileSync(join(cwd, "next.config.mjs"), minimal, "utf8");
      console.log("  + created next.config.mjs with stareezyVitePlugin");
      break;
    }

    case "vite": {
      // Patch vite.config if exists
      for (const name of [
        "vite.config.ts",
        "vite.config.js",
        "vite.config.mjs",
      ]) {
        const configPath = join(cwd, name);
        if (existsSync(configPath)) {
          const existing = readFileSync(configPath, "utf8");
          if (!existing.includes("stareezyVitePlugin")) {
            // Rewrite the whole config to use the production-only pattern.
            // This is safer than naively patching because create-vite's
            // generated config uses defineConfig({}), not defineConfig(fn).
            writeFileSync(configPath, viteConfigWiring(), "utf8");
            console.log(
              `  + patched ${name} with stareezyVitePlugin (build-only)`,
            );
          }
          return;
        }
      }
      // No vite.config found — create one
      writeFileSync(join(cwd, "vite.config.ts"), viteConfigWiring(), "utf8");
      console.log("  + created vite.config.ts with stareezyVitePlugin");
      break;
    }

    case "expo": {
      const metroPath = join(cwd, "metro.config.js");
      if (!existsSync(metroPath)) {
        writeFileSync(metroPath, expoMetroConfig(), "utf8");
        console.log(
          "  + created metro.config.js with stareezyMetroTransformer",
        );
      }
      break;
    }

    default:
      console.log(
        "  ⚠ Unknown framework — skipping compiler wiring. Set it up manually.",
      );
  }
}

function writeThemeProvider(cwd: string, framework: Framework): void {
  switch (framework) {
    case "next": {
      // Write a Providers component; the user wires it into app/layout.tsx
      const providersPath = join(cwd, "app", "providers.tsx");
      if (!existsSync(providersPath)) {
        writeFileSync(providersPath, nextThemeProviderWrapper(), "utf8");
        console.log(
          "  + created app/providers.tsx — wrap your root layout with <Providers>",
        );
      }
      break;
    }
    case "vite": {
      const providersPath = join(cwd, "src", "providers.tsx");
      if (!existsSync(providersPath)) {
        writeFileSync(providersPath, viteThemeProviderWrapper(), "utf8");
        console.log(
          "  + created src/providers.tsx — wrap your app root with <Providers>",
        );
      }
      break;
    }
    case "expo": {
      const providersPath = join(cwd, "src", "providers.tsx");
      if (!existsSync(providersPath)) {
        writeFileSync(providersPath, expoThemeProviderWrapper(), "utf8");
        console.log(
          "  + created src/providers.tsx — wrap your app root with <Providers>",
        );
      }
      break;
    }
    default:
      console.log(
        "  ⚠ Unknown framework — skipping ThemeProvider setup. Add it manually.",
      );
  }
}
