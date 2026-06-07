/**
 * Shadow tokens and boxShadow utility for Quasify UI.
 *
 * `ShadowStyle` mirrors the cross-platform shadow shape used by both
 * React Native (`shadowColor`, `shadowOffset`, `shadowRadius`, `shadowOpacity`)
 * and web (mapped to `box-shadow` by the compiler/runtime).
 *
 * Objects are declared `as const` so TypeScript infers literal types.
 */

import { token, type Token } from "./token";

// ---------------------------------------------------------------------------
// ShadowStyle — the value shape carried by every shadow token
// ---------------------------------------------------------------------------

export type ShadowStyle = {
  color: string;
  offset: { width: number; height: number };
  radius: number;
  opacity: number;
};

// ---------------------------------------------------------------------------
// boxShadow — utility that constructs a ShadowStyle from its parts
// ---------------------------------------------------------------------------

/**
 * Creates a `ShadowStyle` object from individual shadow parameters.
 *
 * @param color   - Shadow color (e.g. `'#000'`)
 * @param offset  - `{ width, height }` offset in pixels
 * @param radius  - Blur radius in pixels
 * @param opacity - Opacity in the range 0–1
 */
export function boxShadow(
  color: string,
  offset: { width: number; height: number },
  radius: number,
  opacity: number,
): ShadowStyle {
  return { color, offset, radius, opacity };
}

// ---------------------------------------------------------------------------
// shadow — 5 semantic shadow tokens
// ---------------------------------------------------------------------------

export const shadow = {
  shallow: token<ShadowStyle>(
    boxShadow("#000", { width: 0, height: 1 }, 2, 0.1),
    "shadow-shallow",
  ),
  medium: token<ShadowStyle>(
    boxShadow("#000", { width: 0, height: 2 }, 4, 0.15),
    "shadow-medium",
  ),
  deep: token<ShadowStyle>(
    boxShadow("#000", { width: 0, height: 4 }, 8, 0.2),
    "shadow-deep",
  ),
  weak: token<ShadowStyle>(
    boxShadow("#000", { width: 0, height: 1 }, 3, 0.08),
    "shadow-weak",
  ),
  regular: token<ShadowStyle>(
    boxShadow("#000", { width: 0, height: 2 }, 6, 0.12),
    "shadow-regular",
  ),
} as const satisfies Record<string, Token<ShadowStyle>>;
