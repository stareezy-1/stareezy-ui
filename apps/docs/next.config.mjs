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
  experimental: {
    instrumentationHook: true,
    mdxRs: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack(config, { webpack, isServer }) {
    config.resolve.alias = {
      ...config.resolve.alias,

      // ── stareezy-ui packages → TypeScript source ────────────────────────
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

    // ── react-native: two-tier stub strategy ────────────────────────────────
    //
    // The stareezy-ui platform detection does:
    //   const hasReactNative = (() => { try { require("react-native"); return true; } catch { return false; } })();
    //   isWeb = !hasReactNative
    //
    // We need require("react-native") to THROW at runtime so hasReactNative=false
    // and isWeb=true, enabling the correct web render path for all components.
    //
    // Strategy:
    //   1. Top-level "react-native" → a module that throws when evaluated.
    //      webpack can bundle a module that throws (it only fails if the throw
    //      is not inside a try/catch at the call site — but here every call IS
    //      inside try/catch in the library source).
    //   2. react-native/Libraries/* sub-paths → the safe stub (no throw), so
    //      @react-native-community/slider sub-imports bundle without error.
    //
    // We achieve (1) by making "react-native" an external that resolves to
    // a tiny inline module expression that throws.

    // Make require("react-native") throw MODULE_NOT_FOUND at runtime.
    // "commonjs2" externals wrap the expression so webpack treats it as a
    // module that the runtime must load — but we use a function external
    // that returns a special error-throwing value.
    config.plugins.push(
      // Sub-paths (Libraries/*, @react-native-community/*, @react-native/*):
      // redirect to safe stub so webpack can parse them (they have Flow syntax).
      new webpack.NormalModuleReplacementPlugin(
        /^react-native\/(?!$)/, // react-native/anything (but not bare "react-native")
        path.resolve(__dirname, "src/lib/react-native-stub.js"),
      ),
      new webpack.NormalModuleReplacementPlugin(
        /^@react-native-community\//,
        path.resolve(__dirname, "src/lib/react-native-stub.js"),
      ),
      new webpack.NormalModuleReplacementPlugin(
        /^@react-native\//,
        path.resolve(__dirname, "src/lib/react-native-stub.js"),
      ),
    );

    // Top-level "react-native" → throws at runtime via a throwing module.
    // We alias it to a separate file that does `throw new Error(...)`.
    // This is safe because all call-sites in the library are inside try/catch.
    config.resolve.alias["react-native"] = path.resolve(
      __dirname,
      "src/lib/react-native-throws.js",
    );

    // Transpile stareezy-ui TypeScript source through Next.js SWC
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [
        path.resolve(root, "packages/tokens/src"),
        path.resolve(root, "packages/core/src"),
        path.resolve(root, "packages/runtime/src"),
        path.resolve(root, "packages/compiler/src"),
        path.resolve(root, "packages/stylesheet/src"),
        path.resolve(root, "packages/components/src"),
      ],
      use: [
        {
          loader: "next/dist/build/webpack/loaders/next-swc-loader.js",
          options: {
            isServer: false,
            rootDir: root,
            hasReactRefresh: false,
            fileExt: "tsx",
          },
        },
      ],
    });

    return config;
  },
};

export default withMDX(nextConfig);
