import { create } from "@storybook/theming/create";

/**
 * Storybook custom theme derived from Stareezy UI design tokens.
 * Uses the same brand colors, fonts, and radius values as the design system.
 */
export const StareezyTheme = create({
  base: "light",

  // Brand
  brandTitle: "Stareezy UI",
  brandUrl: "https://ui.stareezy.tech",
  brandTarget: "_blank",

  // Colors — mapped from Stareezy UI token values
  colorPrimary: "#024CCE", // celurenBlue-500
  colorSecondary: "#1B5ED3", // celurenBlue-400

  // UI
  appBg: "#FAFBFF", // beauBlue-50
  appContentBg: "#FFFFFF",
  appPreviewBg: "#FFFFFF",
  appBorderColor: "#ECF3F7", // beauBlue-100
  appBorderRadius: 10, // radius-md

  // Text
  textColor: "#0F1010", // raisinBlack-800
  textInverseColor: "#FFFFFF",
  textMutedColor: "#7D868E", // beauBlue-700

  // Toolbar
  barTextColor: "#535A5E", // beauBlue-800
  barHoverColor: "#024CCE", // celurenBlue-500
  barSelectedColor: "#024CCE",
  barBg: "#FFFFFF",

  // Form
  inputBg: "#FFFFFF",
  inputBorder: "#D9E6F0", // beauBlue-300
  inputTextColor: "#0F1010",
  inputBorderRadius: 6, // radius-sm

  // Typography — Inter matches our --font-sans
  fontBase: '"Inter", system-ui, -apple-system, sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", monospace',
});

export const StareezyDarkTheme = create({
  base: "dark",

  brandTitle: "Stareezy UI",
  brandUrl: "https://ui.stareezy.tech",
  brandTarget: "_blank",

  colorPrimary: "#4E82DD", // celurenBlue-300
  colorSecondary: "#89b4fa",

  appBg: "#0F1010", // raisinBlack-800
  appContentBg: "#13161e",
  appPreviewBg: "#13161e",
  appBorderColor: "rgba(255,255,255,0.08)",
  appBorderRadius: 10,

  textColor: "#F0F2F8",
  textInverseColor: "#0F1010",
  textMutedColor: "#8892a4",

  barTextColor: "#8892a4",
  barHoverColor: "#89b4fa",
  barSelectedColor: "#89b4fa",
  barBg: "#13161e",

  inputBg: "#1a1e28",
  inputBorder: "rgba(255,255,255,0.1)",
  inputTextColor: "#F0F2F8",
  inputBorderRadius: 6,

  fontBase: '"Inter", system-ui, -apple-system, sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", monospace',
});
