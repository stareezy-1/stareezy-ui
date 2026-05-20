import { defineConfig } from "tsup";

export default defineConfig({
  entry: { "stareezy-stylesheet": "src/index.ts" },
  format: ["iife"],
  globalName: "StareezyStylesheet",
  minify: true,
  clean: false,
  sourcemap: true,
  outDir: "dist/cdn",
  tsconfig: "tsconfig.json",
  // stylesheet has zero runtime deps — fully self-contained
});
