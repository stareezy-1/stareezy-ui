"use client";

/**
 * createUi — the Stareezy UI configuration factory.
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
 * import { createUi, token } from '@stareezy-ui/tokens'
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

export interface CreateUiConfig<
  TTokens extends CustomTokenGroups = CustomTokenGroups,
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
   *
   * @example
   * media: { sm: 640, md: 768, lg: 1024 }
   */
  media?: Partial<UiBreakpointConfig>;

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
  shorthands?: Record<string, string>;
}

// ---------------------------------------------------------------------------
// createUi return type
// ---------------------------------------------------------------------------

export type UiConfig<TTokens extends CustomTokenGroups> = {
  /** All built-in tokens merged with your custom token groups. */
  tokens: typeof BUILTIN_TOKENS & TTokens;
  /** Resolved breakpoint config (built-in defaults merged with overrides). */
  breakpoints: UiBreakpointConfig;
  /** The default theme name or override object. */
  defaultTheme: keyof typeof themes | ThemeOverride;
  /** Registered prop shorthands (config-level, takes precedence over Box built-ins). */
  shorthands: Record<string, string>;
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
  ): UiConfig<TTokens & TNew>;
  /**
   * Update breakpoints after initial setup.
   * Useful when breakpoints need to be adjusted at runtime (e.g. based on device).
   */
  updateBreakpoints(o: Partial<UiBreakpointConfig>): void;
};

// ---------------------------------------------------------------------------
// Module-level singleton — stores the active config
// ---------------------------------------------------------------------------

let _activeConfig: UiConfig<CustomTokenGroups> | null = null;

/**
 * Returns the active `createUi` config, or `null` if `createUi` has not been
 * called yet. Components can use this to read the resolved breakpoints without
 * importing the full config.
 *
 * Requirements: 10.11
 */
export function getUiConfig(): UiConfig<CustomTokenGroups> | null {
  return _activeConfig;
}

// ---------------------------------------------------------------------------
// createUi
// ---------------------------------------------------------------------------

/**
 * Creates and registers the Stareezy UI configuration.
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
>(config: CreateUiConfig<TTokens> = {}): UiConfig<TTokens> {
  const {
    tokens: customTokens,
    breakpoints: bpOverrides,
    media: mediaOverrides,
    defaultTheme = "light",
    fonts: customFonts = {},
    animations: customAnimations = {},
    themes: customThemes = {},
    settings: customSettings = {},
    shorthands: customShorthands = {},
  } = config;

  // Merge breakpoints: start with defaults, apply legacy breakpoints, then
  // media takes precedence when both are provided (Requirements 10.2)
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

  // Apply breakpoints globally if running in a browser/RN environment
  if (typeof globalThis !== "undefined") {
    const g = globalThis as Record<string, unknown>;
    g["__stareezy_breakpoints__"] = resolvedBreakpoints;
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
  ): UiConfig<TTokens & TNew> {
    const cfg: Parameters<typeof createUi<TTokens & TNew>>[0] = {
      tokens: { ...(customTokens ?? {}), ...newTokens } as TTokens & TNew,
      defaultTheme,
    };
    if (bpOverrides !== undefined) cfg.breakpoints = bpOverrides;
    if (mediaOverrides !== undefined) cfg.media = mediaOverrides;
    if (customFonts !== undefined) cfg.fonts = customFonts;
    if (customAnimations !== undefined) cfg.animations = customAnimations;
    if (customThemes !== undefined) cfg.themes = customThemes;
    if (customSettings !== undefined) cfg.settings = customSettings;
    if (customShorthands !== undefined) cfg.shorthands = customShorthands;
    return createUi<TTokens & TNew>(cfg);
  }

  function updateBreakpoints(overrides: Partial<UiBreakpointConfig>): void {
    Object.assign(resolvedBreakpoints, overrides);
    if (typeof globalThis !== "undefined") {
      (globalThis as Record<string, unknown>)["__stareezy_breakpoints__"] = {
        ...resolvedBreakpoints,
      };
    }
  }

  const uiConfig: UiConfig<TTokens> = {
    tokens: mergedTokens,
    breakpoints: resolvedBreakpoints,
    defaultTheme,
    shorthands: customShorthands,
    getTokens,
    getTheme,
    getFont,
    getMedia,
    registerTokens,
    updateBreakpoints,
  };

  // Store as active config singleton (Requirements 10.11)
  _activeConfig = uiConfig as UiConfig<CustomTokenGroups>;

  return uiConfig;
}
