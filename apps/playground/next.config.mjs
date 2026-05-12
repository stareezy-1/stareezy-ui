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
      "@stareezy-ui/tokens": path.resolve(root, "packages/tokens/src/index.ts"),
      "@stareezy-ui/components": path.resolve(
        root,
        "packages/components/src/index.ts",
      ),
      "@stareezy-ui/runtime": path.resolve(
        root,
        "packages/runtime/src/index.ts",
      ),
      "@stareezy-ui/core": path.resolve(root, "packages/core/src/index.ts"),
    };
    return config;
  },
};

export default nextConfig;
