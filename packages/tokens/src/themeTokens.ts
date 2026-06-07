/**
 * Theme-reactive token references for Quasify UI.
 *
 * A `ThemeToken` is a lightweight reference to a semantic color slot that
 * resolves to the CURRENT theme's value at render time. When the theme
 * switches (light → dark → aurora → steins-gate), any component using a
 * ThemeToken automatically re-renders with the correct color.
 *
 * ## Usage
 *
 * ```tsx
 * import { t } from '@quasify-ui/tokens'
 *
 * // In any component that accepts Token props (Box, Button, etc.)
 * <Box bg={t.backgrounds.primary} color={t.text.primary} />
 * <Box borderColor={t.border.primaryBrand} />
 *
 * // Or resolve manually in a component
 * import { useResolveThemeToken } from '@quasify-ui/tokens'
 * const color = useResolveThemeToken(t.text.importantBrand) // "#4a9eff" in steins-gate
 * ```
 *
 * ## How it works
 *
 * `t.backgrounds.primary` is a frozen object `{ __themeToken: true, path: "backgrounds.primary" }`.
 * Components detect `__themeToken: true` and call `useTheme()` to resolve the
 * current value at render time — no prop drilling, no context wiring needed.
 */

import { useTheme } from "./ThemeProvider";
import type { ResolvedTheme } from "./ThemeProvider";
import type { Token } from "./token";

// ---------------------------------------------------------------------------
// ThemeToken type
// ---------------------------------------------------------------------------

/** Discriminant for theme-reactive token references */
export const THEME_TOKEN_BRAND = "__themeToken" as const;

/**
 * A reference to a semantic color slot that resolves to the current theme's
 * value at render time.
 *
 * Pass these directly as `bg`, `color`, `borderColor` props on `Box` and
 * other components — they will automatically update when the theme switches.
 */
export type ThemeToken = {
  readonly [THEME_TOKEN_BRAND]: true;
  /** Dot-separated path into ResolvedTheme, e.g. "text.primary" */
  readonly path: string;
};

/** Type guard — returns true if value is a ThemeToken */
export function isThemeToken(value: unknown): value is ThemeToken {
  return (
    value !== null &&
    typeof value === "object" &&
    (value as Record<string, unknown>)[THEME_TOKEN_BRAND] === true
  );
}

// ---------------------------------------------------------------------------
// ThemeToken factory
// ---------------------------------------------------------------------------

function makeThemeToken(path: string): ThemeToken {
  return Object.freeze({ [THEME_TOKEN_BRAND]: true as const, path });
}

// ---------------------------------------------------------------------------
// Typed accessor map — mirrors ResolvedTheme structure
// ---------------------------------------------------------------------------

type ThemeTokenMap<T> = {
  readonly [K in keyof T]: T[K] extends Token<string>
    ? ThemeToken
    : T[K] extends Record<string, Token<string>>
    ? { readonly [P in keyof T[K]]: ThemeToken }
    : never;
};

// Build the full accessor tree from ResolvedTheme
function buildThemeTokenMap<T extends Record<string, Record<string, unknown>>>(
  groups: readonly string[],
): ThemeTokenMap<T> {
  const result: Record<string, Record<string, ThemeToken>> = {};
  for (const group of groups) {
    result[group] = new Proxy({} as Record<string, ThemeToken>, {
      get(_target, prop: string) {
        return makeThemeToken(`${group}.${prop}`);
      },
    });
  }
  return result as ThemeTokenMap<T>;
}

/**
 * Theme-reactive token accessor.
 *
 * `t.text.primary` → ThemeToken that resolves to the current theme's
 * `text.primary` value at render time.
 *
 * Supported groups: `text`, `backgrounds`, `border`
 *
 * @example
 * ```tsx
 * import { t } from '@quasify-ui/tokens'
 *
 * <Box bg={t.backgrounds.primary} color={t.text.primary} />
 * <Box borderColor={t.border.primaryBrand} rounded={8} />
 * ```
 */
export const t = buildThemeTokenMap<ResolvedTheme>([
  "text",
  "backgrounds",
  "border",
] as const) as {
  readonly text: {
    readonly placeholder: ThemeToken;
    readonly primary: ThemeToken;
    readonly disable: ThemeToken;
    readonly dangerPrimary: ThemeToken;
    readonly successPrimary: ThemeToken;
    readonly warningPrimary: ThemeToken;
    readonly importantBrand: ThemeToken;
    readonly secondary: ThemeToken;
    readonly tertiary: ThemeToken;
    readonly inverse: ThemeToken;
    readonly danger: ThemeToken;
    readonly success: ThemeToken;
  };
  readonly backgrounds: {
    readonly disabled: ThemeToken;
    readonly primaryBlack: ThemeToken;
    readonly primary: ThemeToken;
    readonly secondary: ThemeToken;
  };
  readonly border: {
    readonly tertiary: ThemeToken;
    readonly primaryBrand: ThemeToken;
    readonly secondary: ThemeToken;
    readonly dangerPrimary: ThemeToken;
    readonly successPrimary: ThemeToken;
    readonly primaryBlack: ThemeToken;
    readonly default: ThemeToken;
    readonly danger: ThemeToken;
    readonly success: ThemeToken;
  };
};

// ---------------------------------------------------------------------------
// Resolution helpers
// ---------------------------------------------------------------------------

/**
 * Resolves a ThemeToken to its current string value using the active theme.
 * Must be called inside a React component (uses useTheme hook internally).
 *
 * @example
 * ```tsx
 * const color = useResolveThemeToken(t.text.primary) // "#e8dcc8" in steins-gate
 * ```
 */
export function useResolveThemeToken(themeToken: ThemeToken): string {
  const theme = useTheme();
  return resolveThemeTokenFromTheme(themeToken, theme);
}

/**
 * Resolves a ThemeToken against a given ResolvedTheme object.
 * Use this inside components that already have the theme from useTheme().
 */
export function resolveThemeTokenFromTheme(
  themeToken: ThemeToken,
  theme: ResolvedTheme,
): string {
  const [group, key] = themeToken.path.split(".") as [
    keyof ResolvedTheme,
    string,
  ];
  const groupObj = theme[group] as Record<string, Token<string>> | undefined;
  if (!groupObj) return "";
  const tok = groupObj[key];
  return tok?.value ?? "";
}
