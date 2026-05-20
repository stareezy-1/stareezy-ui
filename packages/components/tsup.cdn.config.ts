import { defineConfig } from "tsup";
import { reactGlobalPlugin } from "./cdn-react-global-plugin";

export default defineConfig({
  entry: { "stareezy-ui": "src/index.ts" },
  format: ["iife"],
  globalName: "StareezyUI",
  minify: true,
  clean: false,
  sourcemap: true,
  outDir: "dist/cdn",
  tsconfig: "tsconfig.json",
  // Bundle all internal @stareezy-ui/* packages into one self-contained file.
  // The plugin handles React (→ window.React) and stubs react-native / slider.
  noExternal: [
    "@stareezy-ui/tokens",
    "@stareezy-ui/core",
    "@stareezy-ui/runtime",
    "@stareezy-ui/stylesheet",
  ],
  esbuildPlugins: [reactGlobalPlugin()],
});
