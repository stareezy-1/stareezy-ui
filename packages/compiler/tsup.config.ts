import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    "@stareezy-ui/tokens",
    "@babel/parser",
    "@babel/traverse",
    "@babel/generator",
    "@babel/types",
    "vite",
  ],
  tsconfig: "tsconfig.json",
});
