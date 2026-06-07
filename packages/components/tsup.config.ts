import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/server/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    "react",
    "react-native",
    "@quasify-ui/tokens",
    "@quasify-ui/core",
    "@quasify-ui/runtime",
  ],
  tsconfig: "tsconfig.json",
});
