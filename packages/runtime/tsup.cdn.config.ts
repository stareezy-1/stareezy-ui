import { defineConfig } from "tsup";
import { reactGlobalPlugin } from "./cdn-react-global-plugin";

export default defineConfig({
  entry: { "stareezy-runtime": "src/index.ts" },
  format: ["iife"],
  globalName: "StareezyRuntime",
  minify: true,
  clean: false,
  sourcemap: true,
  outDir: "dist/cdn",
  tsconfig: "tsconfig.json",
  // Bundle internal deps so the IIFE is self-contained.
  // Plugin stubs react-native and maps React to window.React.
  noExternal: ["@stareezy-ui/tokens", "@stareezy-ui/stylesheet"],
  esbuildPlugins: [reactGlobalPlugin()],
});
