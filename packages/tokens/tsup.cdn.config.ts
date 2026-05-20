import { defineConfig } from "tsup";
import { reactGlobalPlugin } from "./cdn-react-global-plugin";

export default defineConfig({
  entry: { "stareezy-tokens": "src/index.ts" },
  format: ["iife"],
  globalName: "StareezyTokens",
  minify: true,
  clean: false,
  sourcemap: true,
  outDir: "dist/cdn",
  tsconfig: "tsconfig.json",
  // ThemeProvider / UiConfigProvider use React — map to window.React via plugin.
  // Users must load React from CDN before this script.
  esbuildPlugins: [reactGlobalPlugin()],
});
