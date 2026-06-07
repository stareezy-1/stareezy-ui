"use client";

/**
 * createUi — the Quasify UI configuration factory.
 *
 * Inspired by Tamagui's `createTamagui`, this function lets you:
 *   - Register custom token groups (merged with built-in tokens)
 *   - Override or extend breakpoints / media queries
 *   - Register fonts, animations, themes, settings, and prop shorthands
 *   - Get back a fully typed config object with your custom tokens
 *
 * Call once at app startup before rendering any components.
 *
 * @example
 * ```ts
 * import { createUi, token } from '@quasify-ui/tokens'
 *
 * const ui = createUi({
 *   tokens: {
 *     brand: {
 *       primary:   token('#FF6B35', 'brand-primary'),
 *       secondary: token('#004E89', 'brand-secondary'),
 *     },
 *   },
 *   media: {
 *     sm: 640,
 *     md: 768,
 *     lg: 1024,
 *     xl: 1280,
 *     '2xl': 1536,
 *   },
 *   shorthands: { bg: 'backgroundColor', p: 'padding', m: 'margin' },
 * })
 *
 * // Access custom tokens with full type safety
 * ui.tokens.brand.primary.value // "#FF6B35"
 * ui.getTheme('aurora')         // aurora theme token map
 * ```
 */

import type { Token } from "./token";
import { colors } from "./colors";
import { spacing, sp, ss, w } from "./spacing";
import { radius, roundness } from "./radius";
import { typography } from "./typography";
import { timing } from "./timing";
import { shadow } from "./shadow";
import { semanticColors } from "./semantic";
import { themes } from "./themes";
import type { ThemeOverride } from "./themes";
import { t } from "./themeTokens";

// ---------------------------------------------------------------------------
// Breakpoint config (mirrors packages/components/src/primitives/breakpoints.ts)
// ---------------------------------------------------------------------------

export interface UiBreakpointConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

const DEFAULT_BREAKPOINTS: UiBreakpointConfig = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// ---------------------------------------------------------------------------
// Built-in token registry
// ---------------------------------------------------------------------------

const BUILTIN_TOKENS = {
  colors,
  spacing,
  sp,
  ss,
  w,
  radius,
  roundness,
  typography,
  timing,
  shadow,
  semanticColors,
} as const;

// ---------------------------------------------------------------------------
// New config interfaces (Requirements 10.1–10.6)
// ---------------------------------------------------------------------------

/**
 * Font configuration for a named font family.
 * Registered via `createUi({ fonts: { myFont: { family: '...', size: {...} } } })`.
 */
export interface FontConfig {
  family: string;
  size?: Record<string, Token<number>>;
  weight?: Record<string, Token<number | string>>;
  lineHeight?: Record<string, Token<number>>;
}

/**
 * An animation preset referencing motion token values.
 * Registered via `createUi({ animations: { fadeIn: { duration, easing } } })`.
 */
export interface AnimationPreset {
  duration: Token<number>;
  easing: Token<string>;
  delay?: Token<number>;
}

/**
 * Global UI settings for the design system.
 */
export interface UiSettings {
  /** Controls how strictly style values are validated. */
  allowedStyleValues?: "strict" | "somewhat-strict" | "any";
  /** Default font key from the registered fonts map. */
  defaultFont?: string;
  /** Disable server-side rendering optimizations. */
  disableSSR?: boolean;
}

// ---------------------------------------------------------------------------
// Error classes (Requirements 10.8, 10.9)
// ---------------------------------------------------------------------------

/**
 * Thrown by `uiConfig.getTheme(name)` when the theme name is not registered.
 */
export class ThemeNotFoundError extends Error {
  constructor(name: string) {
    super(
      `ThemeNotFoundError: theme "${name}" is not registered in this UiConfig.`,
    );
    this.name = "ThemeNotFoundError";
  }
}

/**
 * Thrown by `uiConfig.getFont(name)` when the font name is not registered.
 */
export class FontNotFoundError extends Error {
  constructor(name: string) {
    super(
      `FontNotFoundError: font "${name}" is not registered in this UiConfig.`,
    );
    this.name = "FontNotFoundError";
  }
}

// ---------------------------------------------------------------------------
// createUi input types
// ---------------------------------------------------------------------------

/** A record of custom token groups — each value is a record of Token<T>. */
export type CustomTokenGroups = Record<string, Record<string, Token<unknown>>>;

/** A generic media breakpoint config preserving literal key types. */
export type MediaConfig = Record<string, number>;

/** Shorthand map: shorthand prop name → full CSS/RN style property name. */
export type ShorthandConfig = Record<string, string>;

export interface CreateUiConfig<
  TTokens extends CustomTokenGroups = CustomTokenGroups,
  TMedia extends MediaConfig = MediaConfig,
  TShorthands extends ShorthandConfig = ShorthandConfig,
> {
  /**
   * Custom token groups to register alongside the built-in tokens.
   * Each key becomes a top-level namespace on the returned `ui.tokens` object.
   *
   * @example
   * tokens: {
   *   brand: {
   *     primary: token('#FF6B35', 'brand-primary'),
   *   },
   * }
   */
  tokens?: TTokens;

  /**
   * Override the default responsive breakpoints (min-width in px, mobile-first).
   * Partial — only the keys you provide are overridden.
   *
   * @deprecated Use `media` instead. Kept for backward compatibility.
   * When both `breakpoints` and `media` are provided, `media` takes precedence.
   *
   * @example
   * breakpoints: { sm: 640, md: 768 }
   */
  breakpoints?: Partial<UiBreakpointConfig>;

  /**
   * Named media query breakpoints (min-width in px, mobile-first).
   * Supersedes `breakpoints` when both are provided.
   * Keys are preserved as literal types when declared with `as const`.
   *
   * @example
   * media: { sm: 640, md: 768, lg: 1024 } as const
   */
  media?: TMedia;

  /**
   * Default theme to apply when no ThemeProvider is present.
   * Defaults to "light".
   */
  defaultTheme?: keyof typeof themes | ThemeOverride;

  /**
   * Named font configurations. Each key is a font name accessible via `getFont(name)`.
   *
   * @example
   * fonts: {
   *   inter: { family: 'Inter, system-ui, sans-serif', size: { sm: token(14, 'inter-sm') } }
   * }
   */
  fonts?: Record<string, FontConfig>;

  /**
   * Named animation presets referencing motion token values.
   *
   * @example
   * animations: {
   *   fadeIn: { duration: motion.duration.enter, easing: motion.easing.easeOut }
   * }
   */
  animations?: Record<string, AnimationPreset>;

  /**
   * Named theme objects. Each key is a theme name accessible via `getTheme(name)`.
   * The `aurora` theme can be registered here alongside `light` and `dark`.
   */
  themes?: Record<string, (typeof themes)[keyof typeof themes]>;

  /**
   * Global UI settings (style validation, default font, SSR).
   */
  settings?: UiSettings;

  /**
   * Prop shorthand mappings. Keys are shorthand prop names; values are full
   * CSS/RN style property names. Config shorthands take precedence over
   * the built-in shorthand map in `Box`.
   *
   * @example
   * shorthands: { bg: 'backgroundColor', p: 'padding', m: 'margin' }
   */
  shorthands?: TShorthands;
}

// ---------------------------------------------------------------------------
// createUi return type
// ---------------------------------------------------------------------------

export type UiConfig<
  TTokens extends CustomTokenGroups,
  TMedia extends MediaConfig = MediaConfig,
  TShorthands extends ShorthandConfig = ShorthandConfig,
> = {
  /** All built-in tokens merged with your custom token groups. */
  tokens: typeof BUILTIN_TOKENS & TTokens;
  /** Resolved breakpoint config (built-in defaults merged with overrides). */
  breakpoints: UiBreakpointConfig;
  /**
   * The media config as passed to createUi, with literal keys preserved.
   * Used for module augmentation via `quasifyCustomConfig extends typeof ui`.
   */
  media: TMedia;
  /** The default theme name or override object. */
  defaultTheme: keyof typeof themes | ThemeOverride;
  /**
   * Registered prop shorthands (config-level, takes precedence over Box built-ins).
   * Literal keys preserved so module augmentation flows into CustomShorthandProps.
   */
  shorthands: TShorthands;
  /**
   * Theme-reactive token references.
   * Pass these directly as `bg`, `color`, `borderColor` props on Box and
   * other components — they resolve to the current theme's value at render time.
   *
   * @example
   * ```tsx
   * const ui = createUi({ ... })
   * <Box bg={ui.t.backgrounds.primary} color={ui.t.text.primary} />
   * ```
   */
  t: typeof t;
  /**
   * Returns the merged token registry (built-in + custom groups).
   * Requirements: 10.7
   */
  getTokens(): typeof BUILTIN_TOKENS & TTokens;
  /**
   * Returns the full token map for a named theme.
   * @throws {ThemeNotFoundError} if the theme name is not registered.
   * Requirements: 10.8
   */
  getTheme(name: string): (typeof themes)[keyof typeof themes];
  /**
   * Returns the font config for a named font.
   * @throws {FontNotFoundError} if the font name is not registered.
   * Requirements: 10.9
   */
  getFont(name: string): FontConfig;
  /**
   * Returns the resolved media query breakpoint map.
   * Requirements: 10.10
   */
  getMedia(): UiBreakpointConfig;
  /**
   * Register additional token groups after initial setup.
   * Useful for lazy-loading token sets or plugin-style extensions.
   */
  registerTokens<TNew extends CustomTokenGroups>(
    t: TNew,
  ): UiConfig<TTokens & TNew, TMedia, TShorthands>;
  /**
   * Update breakpoints after initial setup.
   * Useful when breakpoints need to be adjusted at runtime (e.g. based on device).
   */
  updateBreakpoints(o: Partial<UiBreakpointConfig>): void;
};

// ---------------------------------------------------------------------------
// Global breakpoint channel (Task 2.1 — Req 3.1)
// ---------------------------------------------------------------------------

/**
 * Writes the resolved breakpoint map to the shared global channel
 * (`globalThis.__Quasify_breakpoints__`) so the runtime/components packages
 * can read them without importing `@quasify-ui/tokens` (which would create a
 * dependency cycle).
 *
 * This function is intentionally side-effect-only and dependency-free.
 * It is the single write path to the breakpoint channel; `configureBreakpoints`
 * in `@quasify-ui/components` reads from this same key on first access.
 */
export function applyRuntimeBreakpoints(
  resolved: Record<string, number>,
): void {
  if (typeof globalThis !== "undefined") {
    (globalThis as Record<string, unknown>)["__Quasify_breakpoints__"] =
      resolved;
  }
}

// ---------------------------------------------------------------------------
// Module-level singleton — stores the active config
// ---------------------------------------------------------------------------

let _activeConfig: UiConfig<CustomTokenGroups, MediaConfig> | null = null;

/**
 * Returns the active `createUi` config, or `null` if `createUi` has not been
 * called yet. Components can use this to read the resolved breakpoints without
 * importing the full config.
 *
 * Requirements: 10.11
 */
export function getUiConfig(): UiConfig<CustomTokenGroups, MediaConfig> | null {
  return _activeConfig;
}

// ---------------------------------------------------------------------------
// createUi
// ---------------------------------------------------------------------------

/**
 * Creates and registers the Quasify UI configuration.
 *
 * Call once at app startup (e.g. in your root `_app.tsx` or `App.tsx`).
 * The returned config object provides typed access to all tokens, breakpoints,
 * themes, fonts, animations, settings, and prop shorthands.
 *
 * @param config - Optional configuration overrides
 * @returns A fully typed `UiConfig` object
 */
export function createUi<
  TTokens extends CustomTokenGroups = Record<never, never>,
  TMedia extends MediaConfig = Record<never, never>,
  TShorthands extends ShorthandConfig = Record<never, never>,
>(
  config: CreateUiConfig<TTokens, TMedia, TShorthands> = {} as CreateUiConfig<
    TTokens,
    TMedia,
    TShorthands
  >,
): UiConfig<TTokens, TMedia, TShorthands> {
  const {
    tokens: customTokens,
    breakpoints: bpOverrides,
    media: mediaOverrides,
    defaultTheme = "light",
    fonts: customFonts = {},
    animations: customAnimations = {},
    themes: customThemes = {},
    settings: customSettings = {},
    shorthands: customShorthands = {} as TShorthands,
  } = config;

  // Merge breakpoints: start with defaults, apply legacy breakpoints, then
  // media takes precedence when both are provided.
  const resolvedBreakpoints: UiBreakpointConfig = {
    ...DEFAULT_BREAKPOINTS,
    ...(bpOverrides ?? {}),
    ...(mediaOverrides ?? {}),
  };

  // Merge tokens: built-in + custom
  const mergedTokens = {
    ...BUILTIN_TOKENS,
    ...(customTokens ?? {}),
  } as typeof BUILTIN_TOKENS & TTokens;

  // Merge themes: built-in themes + custom themes
  const mergedThemes: Record<string, (typeof themes)[keyof typeof themes]> = {
    ...(themes as Record<string, (typeof themes)[keyof typeof themes]>),
    ...customThemes,
  };

  // Auto-sync the media config into the runtime breakpoint store (Task 2.2 — Reqs 3.1, 3.2).
  // Only push when the caller explicitly provided `media`; leave the runtime store
  // untouched when falling back to built-in defaults so consumers that never call
  // createUi (or call it without a `media` key) still see the defaults the
  // runtime/components package initialises itself with.
  if (mediaOverrides !== undefined) {
    applyRuntimeBreakpoints(
      resolvedBreakpoints as unknown as Record<string, number>,
    );
  }

  function getTokens(): typeof BUILTIN_TOKENS & TTokens {
    return mergedTokens;
  }

  function getTheme(name: string): (typeof themes)[keyof typeof themes] {
    if (!(name in mergedThemes)) {
      throw new ThemeNotFoundError(name);
    }
    return mergedThemes[name]!;
  }

  function getFont(name: string): FontConfig {
    if (!customFonts || !(name in customFonts)) {
      throw new FontNotFoundError(name);
    }
    return customFonts[name]!;
  }

  function getMedia(): UiBreakpointConfig {
    return { ...resolvedBreakpoints };
  }

  function registerTokens<TNew extends CustomTokenGroups>(
    newTokens: TNew,
  ): UiConfig<TTokens & TNew, TMedia, TShorthands> {
    const cfg: CreateUiConfig<TTokens & TNew, TMedia, TShorthands> = {
      tokens: { ...(customTokens ?? {}), ...newTokens } as TTokens & TNew,
      defaultTheme,
    };
    if (bpOverrides !== undefined) cfg.breakpoints = bpOverrides;
    if (mediaOverrides !== undefined) cfg.media = mediaOverrides as TMedia;
    if (customFonts !== undefined) cfg.fonts = customFonts;
    if (customAnimations !== undefined) cfg.animations = customAnimations;
    if (customThemes !== undefined) cfg.themes = customThemes;
    if (customSettings !== undefined) cfg.settings = customSettings;
    if (customShorthands !== undefined) cfg.shorthands = customShorthands;
    return createUi<TTokens & TNew, TMedia, TShorthands>(cfg);
  }

  function updateBreakpoints(overrides: Partial<UiBreakpointConfig>): void {
    Object.assign(resolvedBreakpoints, overrides);
    applyRuntimeBreakpoints({ ...resolvedBreakpoints } as unknown as Record<
      string,
      number
    >);
  }

  const uiConfig: UiConfig<TTokens, TMedia, TShorthands> = {
    tokens: mergedTokens,
    breakpoints: resolvedBreakpoints,
    // Preserve the literal-keyed media map for module augmentation:
    // `declare module '@quasify-ui/tokens' { interface QuasifyCustomConfig extends typeof ui {} }`
    // surfaces TMedia through QuasifyCustomConfig["media"], driving ConfigBreakpointKey.
    media: (mediaOverrides ?? {}) as TMedia,
    defaultTheme,
    shorthands: customShorthands,
    t,
    getTokens,
    getTheme,
    getFont,
    getMedia,
    registerTokens,
    updateBreakpoints,
  };

  // Store as active config singleton
  _activeConfig = uiConfig as UiConfig<CustomTokenGroups, MediaConfig>;

  return uiConfig;
}
