/**
 * Token variant system for Quasify UI.
 *
 * Provides a `TokenVariant<T>` type for dark/light token switching,
 * a `TokenVariantError` for invalid theme lookups, and a `getVariant()`
 * helper that returns the correct variant record for a given theme.
 *
 * Requirements: 9.2, 9.7, 9.8
 */

import type { Token } from "./token";

// ---------------------------------------------------------------------------
// TokenVariant type
// ---------------------------------------------------------------------------

/**
 * A record containing both `dark` and `light` variants of a token group.
 * Both variants must have identical key sets (structural symmetry invariant).
 */
export type TokenVariant<T extends Record<string, Token<unknown>>> = {
  dark: T;
  light: T;
};

// ---------------------------------------------------------------------------
// TokenVariantError
// ---------------------------------------------------------------------------

/**
 * Thrown by `getVariant()` when an unknown theme name is requested,
 * or when the group is null/undefined.
 */
export class TokenVariantError extends Error {
  constructor(group: string, theme: string) {
    super(
      `TokenVariantError: no variant "${theme}" found for group "${group}". Valid themes are "dark" and "light".`,
    );
    this.name = "TokenVariantError";
  }
}

// ---------------------------------------------------------------------------
// getVariant helper
// ---------------------------------------------------------------------------

/**
 * Returns the correct variant record for a given token group and theme name.
 *
 * @param group - A `TokenVariant<T>` object with `dark` and `light` keys
 * @param theme - Either `"dark"` or `"light"`
 * @throws {TokenVariantError} if `theme` is not `"dark"` or `"light"`, or if `group` is null/undefined
 *
 * @example
 * ```ts
 * import { getVariant, auroraVariants } from '@quasify-ui/tokens'
 * const darkAurora = getVariant(auroraVariants, 'dark')
 * ```
 */
export function getVariant<T extends Record<string, Token<unknown>>>(
  group: TokenVariant<T>,
  theme: "dark" | "light",
): T {
  if (!group) throw new TokenVariantError("(unknown)", theme);
  if (theme !== "dark" && theme !== "light") {
    throw new TokenVariantError("(unknown)", theme);
  }
  return group[theme];
}
