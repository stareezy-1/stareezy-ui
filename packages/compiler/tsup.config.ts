import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/babel.ts", "src/metro.ts", "src/loadConfig.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    "@quasify-ui/tokens",
    "@babel/parser",
    "@babel/traverse",
    "@babel/generator",
    "@babel/types",
    "vite",
    "path",
    "fs",
    "node:path",
    "node:fs",
  ],
  tsconfig: "tsconfig.json",
});
