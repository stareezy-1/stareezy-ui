import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@quasify-ui/tokens": path.resolve(root, "packages/tokens/src/index.ts"),
      "@quasify-ui/components": path.resolve(
        root,
        "packages/components/src/index.ts",
      ),
      "@quasify-ui/runtime": path.resolve(
        root,
        "packages/runtime/src/index.ts",
      ),
      "@quasify-ui/core": path.resolve(root, "packages/core/src/index.ts"),
    };
    return config;
  },
};

export default nextConfig;
