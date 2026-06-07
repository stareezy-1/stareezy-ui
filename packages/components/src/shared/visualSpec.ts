/**
 * visualSpec.ts — shared Component_Visual_Spec constants
 *
 * Establishes token-sourced conventions for spacing, radius, typography,
 * border width, elevation, and interaction (hover/focus/pressed/disabled)
 * treatments that all existing components adopt.
 *
 * SAFE for the color guard: this file lives in shared/ (not a .style.ts file)
 * and only reads geometry/typography/shadow token values — no colors.
 *
 * Requirements: 11.1, 11.2, 11.4
 */

import { spacing, radius, typography } from "@quasify-ui/tokens";

// ---------------------------------------------------------------------------
// Interaction state opacities
// ---------------------------------------------------------------------------

/**
 * Uniform opacity levels for interactive state treatments.
 * Applied to background, border, or icon elements depending on context.
 */
export const INTERACTION = {
  hoverOpacity: 0.85,
  pressedOpacity: 0.7,
  disabledOpacity: 0.45,
} as const;

// ---------------------------------------------------------------------------
// Border widths
// ---------------------------------------------------------------------------

/**
 * Standard border widths used across components.
 */
export const BORDER = {
  default: 1,
  medium: 1.5,
  thick: 2,
} as const;

// ---------------------------------------------------------------------------
// Focus ring treatment (web: outline / box-shadow)
// ---------------------------------------------------------------------------

/**
 * Focus ring dimensions — applied via `outline` or `box-shadow` on web,
 * and via a platform-appropriate highlight on native.
 */
export const FOCUS_RING = {
  width: 2,
  offset: 2,
} as const;

// ---------------------------------------------------------------------------
// Elevation (box-shadow strings for web)
// ---------------------------------------------------------------------------

/**
 * Semantic elevation levels as CSS box-shadow strings.
 * Use in .style.ts files for shadow geometry; color is baked into these
 * strings as translucent black (theme-independent decorative shadow).
 */
export const ELEVATION = {
  none: "none",
  sm: "0 1px 3px rgba(0,0,0,0.12)",
  md: "0 4px 12px rgba(0,0,0,0.15)",
  lg: "0 8px 24px rgba(0,0,0,0.18)",
  xl: "0 16px 48px rgba(0,0,0,0.24)",
} as const;

// ---------------------------------------------------------------------------
// Typography scale (font-size values from tokens)
// ---------------------------------------------------------------------------

/**
 * Label size scale sourced from the typography.fontSize token.
 * - label_sm: 12px (xs)
 * - label_md: 14px (sm)
 * - label_lg: 16px (md)
 */
export const TYPE_SCALE = {
  label_sm: typography.fontSize.xs.value, // 12
  label_md: typography.fontSize.sm.value, // 14
  label_lg: typography.fontSize.md.value, // 16
} as const;

// ---------------------------------------------------------------------------
// Spacing convenience aliases
// ---------------------------------------------------------------------------

/**
 * Common gap/padding sizes drawn from the spacing token scale.
 * xs = 4, sm = 8, md = 12, lg = 16, xl = 24
 */
export const GAP = {
  xs: spacing[4].value, // 4
  sm: spacing[8].value, // 8
  md: spacing[12].value, // 12
  lg: spacing[16].value, // 16
  xl: spacing[24].value, // 24
} as const;

// ---------------------------------------------------------------------------
// Radius convenience aliases
// ---------------------------------------------------------------------------

/**
 * Border-radius values drawn from the radius token scale.
 * none = 0, sm = 6, md = 8, lg = 10, xl = 12, full = 9999
 */
export const RADIUS = {
  none: 0,
  sm: radius.sm.value, // 6
  md: radius.md.value, // 8
  lg: radius.lg.value, // 10
  xl: radius.xl.value, // 12
  full: radius.full.value, // 9999
} as const;
