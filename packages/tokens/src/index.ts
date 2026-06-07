// @quasify-ui/tokens
// Zero-dependency design token definitions for Quasify UI.
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
// Module augmentation — users extend QuasifyCustomConfig in their ui.config.ts
// to make custom shorthands and media breakpoints flow into the type system.
//
// Usage in your ui.config.ts:
//
//   import { createUi } from '@quasify-ui/tokens'
//   export const ui = createUi({
//     media: { sm: 640, md: 768, lg: 1024 } as const,
//     shorthands: { bg: 'backgroundColor' } as const,
//   })
//   declare module '@quasify-ui/tokens' {
//     interface QuasifyCustomConfig extends typeof ui {}
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
 * import { createUi } from '@quasify-ui/tokens'
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
 * declare module '@quasify-ui/tokens' {
 *   interface QuasifyCustomConfig extends typeof ui {}
 * }
 * ```
 *
 * Once declared, `ConfigBreakpointKey` reflects the exact media keys you
 * configured, and `<Box bg={...} />` will be a valid typed prop.
 */
export interface QuasifyCustomConfig {
  // This interface is intentionally empty.
  // Consumers augment it with their exact createUi() config type:
  //
  //   type CustomUi = typeof ui;
  //   declare module "@quasify-ui/tokens" {
  //     interface QuasifyCustomConfig extends CustomUi {}
  //   }
  //
  // Both `media` and `shorthands` are deliberately NOT declared here.
  // Declaring them as wide types (Record<string,number> / Record<string,string>)
  // would cause the keyof discriminants in ConfigBreakpointKey and QuasifyShorthands
  // to always evaluate to their fallback branches, making the augmentation
  // appear to have no effect.
}

/**
 * The default breakpoint union used when no media augmentation is present.
 * Matches the built-in DEFAULT_BREAKPOINTS in createUi.
 */
export type DefaultBreakpointKey = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Derives the BreakpointKey union from the augmented QuasifyCustomConfig's `media` shape.
 *
 * - No augmentation (no `media` key at all) → `DefaultBreakpointKey`
 * - Augmented with literal keys → `"base"` plus the exact declared media keys
 */
export type ConfigBreakpointKey = QuasifyCustomConfig extends {
  media: infer TMedia;
}
  ? string extends keyof TMedia
    ? DefaultBreakpointKey // wide type — use defaults
    : "base" | Extract<keyof TMedia, string> // literal keys — use them
  : DefaultBreakpointKey; // no media declared — use defaults

/**
 * Extracts the shorthands record from QuasifyCustomConfig if the consumer has
 * augmented it with literal shorthand keys.
 *
 * - No augmentation (no `shorthands` key at all) → `Record<never, never>` (no extra props)
 * - Augmented with `shorthands: { bg: "backgroundColor", br: "borderRadius" }` →
 *   those keys become props on Box / BoxLayoutProps
 */
export type QuasifyShorthands = QuasifyCustomConfig extends { shorthands: infer T }
  ? string extends keyof T
    ? Record<never, never> // consumer accidentally used a wide type — no extra props
    : T // literal keys — expose them as props
  : Record<never, never>; // no shorthands declared — no extra props
