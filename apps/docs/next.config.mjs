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
  // Required for instrumentation.ts (Sentry server/edge init)
  experimental: {
    instrumentationHook: true,
    mdxRs: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@quasify-ui/tokens": path.resolve(root, "packages/tokens/src/index.ts"),
      "@quasify-ui/core": path.resolve(root, "packages/core/src/index.ts"),
      "@quasify-ui/runtime": path.resolve(
        root,
        "packages/runtime/src/index.ts",
      ),
      "@quasify-ui/compiler": path.resolve(
        root,
        "packages/compiler/src/index.ts",
      ),
      "@quasify-ui/stylesheet": path.resolve(
        root,
        "packages/stylesheet/src/index.ts",
      ),
      "@quasify-ui/components": path.resolve(
        root,
        "packages/components/src/index.ts",
      ),
    };
    return config;
  },
};

export default withMDX(nextConfig);
