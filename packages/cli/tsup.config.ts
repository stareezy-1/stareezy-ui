import { defineConfig } from "tsup";
import { cpSync, existsSync } from "fs";
import { join } from "path";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    create: "src/create.ts",
  },
  format: ["cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  external: [
    "node:fs",
    "node:path",
    "node:child_process",
    "node:readline",
    "node:os",
  ],
  tsconfig: "tsconfig.json",
  banner: {
    js: "#!/usr/bin/env node",
  },
  async onSuccess() {
    // Copy template files into dist/templates so they are available at runtime
    // when the CLI is installed from npm and __dirname points to dist/.
    const src = join(__dirname, "src", "templates");
    const dest = join(__dirname, "dist", "templates");
    if (existsSync(src)) {
      cpSync(src, dest, { recursive: true });
      console.log("Copied templates → dist/templates");
    }
  },
});
