/**
 * Radius and roundness tokens for Stareezy UI.
 * Ported from rekosistem-components/src/styles/radius.ts.
 *
 * All values are raw pixel numbers (no convertSpacing).
 * Objects are declared `as const` so TypeScript infers literal numeric types.
 */

import { token } from "./token";

// ---------------------------------------------------------------------------
// radius — border-radius scale (11 entries)
// ---------------------------------------------------------------------------

export const radius = {
  none: token(0, "radius-none"),
  "2xs": token(2, "radius-2xs"),
  xs: token(4, "radius-xs"),
  sm: token(6, "radius-sm"),
  md: token(8, "radius-md"),
  lg: token(10, "radius-lg"),
  xl: token(12, "radius-xl"),
  "2xl": token(16, "radius-2xl"),
  "3xl": token(20, "radius-3xl"),
  "4xl": token(24, "radius-4xl"),
  full: token(9999, "radius-full"),
} as const;

// ---------------------------------------------------------------------------
// roundness — semantic roundness scale (12 entries)
//
// Mirrors the radius scale with a `roundness-` ID prefix, plus a `circle`
// alias (same value as `full`) to give components a semantic "pill/circle"
// option distinct from the raw `full` radius step.
// ---------------------------------------------------------------------------

export const roundness = {
  none: token(0, "roundness-none"),
  "2xs": token(2, "roundness-2xs"),
  xs: token(4, "roundness-xs"),
  sm: token(6, "roundness-sm"),
  md: token(8, "roundness-md"),
  lg: token(10, "roundness-lg"),
  xl: token(12, "roundness-xl"),
  "2xl": token(16, "roundness-2xl"),
  "3xl": token(20, "roundness-3xl"),
  "4xl": token(24, "roundness-4xl"),
  full: token(9999, "roundness-full"),
  circle: token(9999, "roundness-circle"),
} as const;
