import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-controls",
    "@storybook/addon-viewport",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => !prop.parent?.fileName.includes("node_modules"),
    },
  },
  viteFinal: async (config) => {
    const path = await import("path");
    const root = path.resolve(__dirname, "../../..");
    config.resolve = config.resolve ?? {};
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

export default config;
