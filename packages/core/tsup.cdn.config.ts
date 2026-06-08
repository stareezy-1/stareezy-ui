import { defineConfig } from "tsup";
import { reactGlobalPlugin } from "./cdn-react-global-plugin";

export default defineConfig({
  entry: { "Stareezy-core": "src/index.ts" },
  format: ["iife"],
  globalName: "StareezyCore",
  minify: true,
  clean: false,
  sourcemap: true,
  outDir: "dist/cdn",
  tsconfig: "tsconfig.json",
  // Bundle @stareezy-ui/tokens into the IIFE so it's self-contained.
  // React is mapped to window.React via plugin.
  noExternal: ["@stareezy-ui/tokens"],
  esbuildPlugins: [reactGlobalPlugin()],
});
