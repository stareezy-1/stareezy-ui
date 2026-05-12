import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
  },
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    mdxRs: false,
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@stareezy-ui/tokens": path.resolve(root, "packages/tokens/src/index.ts"),
      "@stareezy-ui/core": path.resolve(root, "packages/core/src/index.ts"),
      "@stareezy-ui/runtime": path.resolve(
        root,
        "packages/runtime/src/index.ts",
      ),
      "@stareezy-ui/compiler": path.resolve(
        root,
        "packages/compiler/src/index.ts",
      ),
      "@stareezy-ui/stylesheet": path.resolve(
        root,
        "packages/stylesheet/src/index.ts",
      ),
      "@stareezy-ui/components": path.resolve(
        root,
        "packages/components/src/index.ts",
      ),
    };
    return config;
  },
};

export default withMDX(nextConfig);
