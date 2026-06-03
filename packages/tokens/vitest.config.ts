import { defineConfig } from "vitest/config";
import { createRequire } from "module";

// Resolve React from wherever pnpm has placed it (hoisted .pnpm store or
// local node_modules) rather than hard-coding a path that may not exist
// when React is an optional peer dep in this package.
const require = createRequire(import.meta.url);
const reactPath = require.resolve("react");
// strip the trailing /index.js to get the package root
const reactRoot = reactPath.replace(/[\\/]index\.js$/, "");

export default defineConfig({
  test: {
    environment: "node",
    globals: false,
  },
  resolve: {
    alias: {
      react: reactRoot,
    },
  },
});
