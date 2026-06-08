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
  webpack(config, { webpack }) {
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

      // ── react-native → web stub ─────────────────────────────────────────
      // The components package and its deps (e.g. @react-native-community/slider)
      // conditionally require react-native. Alias the package AND all known
      // sub-paths so webpack never tries to parse real RN files (Flow syntax).
      "react-native": path.resolve(__dirname, "src/lib/react-native-stub.js"),
      "react-native/Libraries/Image/resolveAssetSource": path.resolve(
        __dirname,
        "src/lib/react-native-stub.js",
      ),
      "react-native/Libraries/NativeComponent/ViewConfigIgnore": path.resolve(
        __dirname,
        "src/lib/react-native-stub.js",
      ),
      "react-native/Libraries/StyleSheet/processColor": path.resolve(
        __dirname,
        "src/lib/react-native-stub.js",
      ),
      "react-native/Libraries/Utilities/codegenNativeCommands": path.resolve(
        __dirname,
        "src/lib/react-native-stub.js",
      ),
      "react-native/Libraries/Utilities/Platform": path.resolve(
        __dirname,
        "src/lib/react-native-stub.js",
      ),
      "react-native/Libraries/Components/View/ViewNativeComponent":
        path.resolve(__dirname, "src/lib/react-native-stub.js"),
      "react-native/Libraries/Components/View/ViewAccessibility": path.resolve(
        __dirname,
        "src/lib/react-native-stub.js",
      ),
      "react-native/Libraries/Renderer/shims/ReactNative": path.resolve(
        __dirname,
        "src/lib/react-native-stub.js",
      ),
      "@react-native-community/slider": path.resolve(
        __dirname,
        "src/lib/react-native-stub.js",
      ),
    };

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

    // ── NormalModuleReplacementPlugin: catch ALL react-native/* sub-paths ──
    // @react-native-community/slider imports react-native/Libraries/... paths
    // that aren't caught by resolve.alias exact-match. This plugin intercepts
    // any require/import whose request starts with "react-native/" or is
    // "@react-native-community/slider" and redirects it to the stub.
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^react-native(\/|$)/,
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

    return config;
  },
};

export default withMDX(nextConfig);
