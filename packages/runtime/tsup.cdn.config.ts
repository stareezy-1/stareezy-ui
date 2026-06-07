import { defineConfig } from "tsup";
import { reactGlobalPlugin } from "./cdn-react-global-plugin";

export default defineConfig({
  entry: { "Quasify-runtime": "src/index.ts" },
  format: ["iife"],
  globalName: "QuasifyRuntime",
  minify: true,
  clean: false,
  sourcemap: true,
  outDir: "dist/cdn",
  tsconfig: "tsconfig.json",
  // Bundle internal deps so the IIFE is self-contained.
  // Plugin stubs react-native and maps React to window.React.
  noExternal: ["@quasify-ui/tokens", "@quasify-ui/stylesheet"],
  esbuildPlugins: [reactGlobalPlugin()],
});
