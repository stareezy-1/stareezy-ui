import { defineConfig } from "tsup";
import { reactGlobalPlugin } from "./cdn-react-global-plugin";

export default defineConfig({
  entry: { "Quasify-core": "src/index.ts" },
  format: ["iife"],
  globalName: "QuasifyCore",
  minify: true,
  clean: false,
  sourcemap: true,
  outDir: "dist/cdn",
  tsconfig: "tsconfig.json",
  // Bundle @quasify-ui/tokens into the IIFE so it's self-contained.
  // React is mapped to window.React via plugin.
  noExternal: ["@quasify-ui/tokens"],
  esbuildPlugins: [reactGlobalPlugin()],
});
