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

export { steinsGate, steinsGateVariants } from "./steins-gate";
export type { SteinsGateTokens } from "./steins-gate";

export { quasar, quasarVariants } from "./quasar";
export type { QuasarTokens } from "./quasar";

export { motion } from "./motion";

export { glow } from "./glow";

export { getVariant, TokenVariantError } from "./variants";
export type { TokenVariant } from "./variants";

export { UiConfigProvider, useUiConfig } from "./UiConfigProvider";

export {
  t,
  isThemeToken,
  useResolveThemeToken,
  resolveThemeTokenFromTheme,
  THEME_TOKEN_BRAND,
} from "./themeTokens";
export type { ThemeToken } from "./themeTokens";

// ---------------------------------------------------------------------------
// Module augmentation — users extend SzrCustomConfig in their ui.config.ts
// to make custom shorthands flow into BoxProps automatically.
//
// Usage in your ui.config.ts:
//
//   import { createUi } from '@stareezy-ui/tokens'
//   export const ui = createUi({ shorthands: { bg: 'backgroundColor' } as const })
//   type AppConfig = typeof ui
//   declare module '@stareezy-ui/tokens' {
//     interface SzrCustomConfig extends AppConfig {}
//   }
// ---------------------------------------------------------------------------

/**
 * Extend this interface in your app's ui.config.ts to register your
 * createUi() config with the type system.
 *
 * @example
 * ```ts
 * // ui.config.ts
 * import { createUi } from '@stareezy-ui/tokens'
 *
 * export const ui = createUi({
 *   shorthands: {
 *     bg:  'backgroundColor',
 *     p:   'padding',
 *     m:   'margin',
 *     f:   'flex',
 *     br:  'borderRadius',
 *   } as const,
 * })
 *
 * type AppConfig = typeof ui
 * declare module '@stareezy-ui/tokens' {
 *   interface SzrCustomConfig extends AppConfig {}
 * }
 * ```
 *
 * Once declared, `<Box bg={...} />` will be a valid typed prop even if `bg`
 * is not in the built-in BoxProps — TypeScript reads it from your config.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SzrCustomConfig {}

/**
 * Extracts the shorthands record from SzrCustomConfig if the user has
 * augmented it, otherwise falls back to the built-in shorthand map.
 */
export type SzrShorthands = SzrCustomConfig extends { shorthands: infer S }
  ? S
  : Record<string, string>;
