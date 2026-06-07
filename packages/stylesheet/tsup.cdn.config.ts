import { defineConfig } from "tsup";

export default defineConfig({
  entry: { "Quasify-stylesheet": "src/index.ts" },
  format: ["iife"],
  globalName: "QuasifyStylesheet",
  minify: true,
  clean: false,
  sourcemap: true,
  outDir: "dist/cdn",
  tsconfig: "tsconfig.json",
  // stylesheet has zero runtime deps — fully self-contained
});
