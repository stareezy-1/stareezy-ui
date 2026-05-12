"use client";

/**
 * createUi — the Stareezy UI configuration factory.
 *
 * Inspired by Tamagui's `createTamagui`, this function lets you:
 *   - Register custom token groups (merged with built-in tokens)
 *   - Override or extend breakpoints
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
 *   breakpoints: {
 *     sm: 640,
 *     md: 768,
 *     lg: 1024,
 *     xl: 1280,
 *     '2xl': 1536,
 *   },
 * })
 *
 * // Access custom tokens with full type safety
 * ui.tokens.brand.primary.value // "#FF6B35"
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
   * @example
   * breakpoints: { sm: 640, md: 768 }
   */
  breakpoints?: Partial<UiBreakpointConfig>;

  /**
   * Default theme to apply when no ThemeProvider is present.
   * Defaults to "light".
   */
  defaultTheme?: keyof typeof themes | ThemeOverride;
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
  /**
   * Register additional token groups after initial setup.
   * Useful for lazy-loading token sets or plugin-style extensions.
   */
  registerTokens<TNew extends CustomTokenGroups>(
    newTokens: TNew,
  ): UiConfig<TTokens & TNew>;
  /**
   * Update breakpoints after initial setup.
   * Useful when breakpoints need to be adjusted at runtime (e.g. based on device).
   */
  updateBreakpoints(overrides: Partial<UiBreakpointConfig>): void;
};

// ---------------------------------------------------------------------------
// Module-level singleton — stores the active config
// ---------------------------------------------------------------------------

let _activeConfig: UiConfig<CustomTokenGroups> | null = null;

/**
 * Returns the active `createUi` config, or `null` if `createUi` has not been
 * called yet.  Components can use this to read the resolved breakpoints without
 * importing the full config.
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
 * The returned config object provides typed access to all tokens and breakpoints.
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
    defaultTheme = "light",
  } = config;

  // Merge breakpoints
  const resolvedBreakpoints: UiBreakpointConfig = {
    ...DEFAULT_BREAKPOINTS,
    ...(bpOverrides ?? {}),
  };

  // Merge tokens: built-in + custom
  const mergedTokens = {
    ...BUILTIN_TOKENS,
    ...(customTokens ?? {}),
  } as typeof BUILTIN_TOKENS & TTokens;

  // Apply breakpoints globally if running in a browser/RN environment
  // (mirrors configureBreakpoints from packages/components/src/primitives/breakpoints.ts)
  if (typeof globalThis !== "undefined") {
    const g = globalThis as Record<string, unknown>;
    // Store on globalThis so the components package can read it without a circular dep
    g["__stareezy_breakpoints__"] = resolvedBreakpoints;
  }

  function registerTokens<TNew extends CustomTokenGroups>(
    newTokens: TNew,
  ): UiConfig<TTokens & TNew> {
    return createUi<TTokens & TNew>({
      tokens: { ...(customTokens ?? {}), ...newTokens } as TTokens & TNew,
      breakpoints: resolvedBreakpoints,
      defaultTheme,
    });
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
    registerTokens,
    updateBreakpoints,
  };

  // Store as active config singleton
  _activeConfig = uiConfig as UiConfig<CustomTokenGroups>;

  return uiConfig;
}
