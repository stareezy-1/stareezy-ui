// @stareezy-ui/tokens
// Zero-dependency design token definitions for Stareezy UI.
// Each export lives in its own file to enable tree-shaking.

export type { Token } from "./token";
export { token } from "./token";

export {
  serializeToken,
  deserializeToken,
  TokenDeserializationError,
} from "./serialization";

export { palette, colors, extendedColors } from "./colors";

export { semanticColors } from "./semantic";

export { spacing, sp, ss, w } from "./spacing";

export { radius, roundness } from "./radius";

export { typography } from "./typography";

export { timing } from "./timing";

export { shadow, boxShadow } from "./shadow";

export { themes } from "./themes";
export type { ThemeOverride } from "./themes";

export { ThemeProvider, useTheme, useThemeSwitch } from "./ThemeProvider";
export type { ThemeProviderProps, ResolvedTheme } from "./ThemeProvider";

export { createUi, getUiConfig } from "./createUi";
export type {
  CreateUiConfig,
  UiConfig,
  UiBreakpointConfig,
  CustomTokenGroups,
  FontConfig,
  AnimationPreset,
  UiSettings,
} from "./createUi";
export { ThemeNotFoundError, FontNotFoundError } from "./createUi";

export { aurora, auroraVariants } from "./aurora";
export type { AuroraTokens } from "./aurora";

export { motion } from "./motion";

export { glow } from "./glow";

export { getVariant, TokenVariantError } from "./variants";
export type { TokenVariant } from "./variants";

export { UiConfigProvider, useUiConfig } from "./UiConfigProvider";
