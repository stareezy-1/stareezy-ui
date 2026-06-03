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

export { createUi, getUiConfig, applyRuntimeBreakpoints } from "./createUi";
export type {
  CreateUiConfig,
  UiConfig,
  UiBreakpointConfig,
  CustomTokenGroups,
  MediaConfig,
  ShorthandConfig,
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
// to make custom shorthands and media breakpoints flow into the type system.
//
// Usage in your ui.config.ts:
//
//   import { createUi } from '@stareezy-ui/tokens'
//   export const ui = createUi({
//     media: { sm: 640, md: 768, lg: 1024 } as const,
//     shorthands: { bg: 'backgroundColor' } as const,
//   })
//   declare module '@stareezy-ui/tokens' {
//     interface SzrCustomConfig extends typeof ui {}
//   }
// ---------------------------------------------------------------------------

/**
 * Extend this interface in your app's ui.config.ts to register your
 * createUi() config with the type system.
 *
 * When augmented with a `media` shape, `ConfigBreakpointKey` derives
 * `"base"` plus the exact declared media keys. When augmented with a
 * `shorthands` shape, those keys surface as custom props on Box.
 *
 * @example
 * ```ts
 * // ui.config.ts
 * import { createUi } from '@stareezy-ui/tokens'
 *
 * export const ui = createUi({
 *   media: {
 *     sm: 640,
 *     md: 768,
 *     lg: 1024,
 *     xl: 1280,
 *     '2xl': 1536,
 *   } as const,
 *   shorthands: {
 *     bg:  'backgroundColor',
 *     p:   'padding',
 *     m:   'margin',
 *     f:   'flex',
 *     br:  'borderRadius',
 *   } as const,
 * })
 *
 * declare module '@stareezy-ui/tokens' {
 *   interface SzrCustomConfig extends typeof ui {}
 * }
 * ```
 *
 * Once declared, `ConfigBreakpointKey` reflects the exact media keys you
 * configured, and `<Box bg={...} />` will be a valid typed prop.
 */
export interface SzrCustomConfig {
  /** The media query breakpoints declared in the consuming app's createUi config. */
  media?: Record<string, number>;
  /** The prop shorthands declared in the consuming app's createUi config. */
  shorthands?: Record<string, string>;
}

/**
 * The default breakpoint union used when no media augmentation is present.
 * Matches the built-in DEFAULT_BREAKPOINTS in createUi.
 */
export type DefaultBreakpointKey = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Derives the BreakpointKey union from the augmented SzrCustomConfig's `media` shape.
 *
 * - No augmentation (media key is a wide `string` index) → `DefaultBreakpointKey`
 * - Augmented with specific keys → `"base"` plus the exact declared media keys
 *
 * @example
 * // With `media: { sm: 640, md: 768 }` declared in SzrCustomConfig:
 * // ConfigBreakpointKey = "base" | "sm" | "md"
 *
 * // With no augmentation:
 * // ConfigBreakpointKey = "base" | "sm" | "md" | "lg" | "xl" | "2xl"
 */
export type ConfigBreakpointKey = string extends keyof NonNullable<
  SzrCustomConfig["media"]
>
  ? DefaultBreakpointKey
  : "base" | Extract<keyof NonNullable<SzrCustomConfig["media"]>, string>;

/**
 * Extracts the shorthands record from SzrCustomConfig if the user has
 * augmented it, otherwise falls back to the built-in shorthand map.
 */
export type SzrShorthands = SzrCustomConfig extends { shorthands: infer S }
  ? S
  : Record<string, string>;
