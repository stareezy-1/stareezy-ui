import { defineConfig } from "tsup";
import { reactGlobalPlugin } from "./cdn-react-global-plugin";

export default defineConfig({
  entry: { "Quasify-ui": "src/index.ts" },
  format: ["iife"],
  globalName: "QuasifyUI",
  minify: true,
  clean: false,
  sourcemap: true,
  outDir: "dist/cdn",
  tsconfig: "tsconfig.json",
  // Bundle all internal @quasify-ui/* packages into one self-contained file.
  // The plugin handles React (→ window.React) and stubs react-native / slider.
  noExternal: [
    "@quasify-ui/tokens",
    "@quasify-ui/core",
    "@quasify-ui/runtime",
    "@quasify-ui/stylesheet",
  ],
  esbuildPlugins: [reactGlobalPlugin()],
});
