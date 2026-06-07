/**
 * Semantic color tokens for Quasify UI.
 *
 * Semantic tokens REFERENCE primitive token objects directly — they do not
 * create new Token instances.  This means `semanticColors.text.primary` is
 * the exact same object as `colors.raisinBlack[800]`, satisfying the
 * structural-equality property (Property 4).
 *
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

import { colors } from "./colors";

// ---------------------------------------------------------------------------
// semanticColors
// ---------------------------------------------------------------------------

export const semanticColors = {
  // ── border ────────────────────────────────────────────────────────────────
  border: {
    /** #ECF3F7 — maps to beauBlue[100] in source; task spec maps to beauBlue[300] */
    tertiary: colors.beauBlue[300],
    /** #024CCE */
    primaryBrand: colors.celurenBlue[500],
    /** #D9E6F0 */
    secondary: colors.beauBlue[300],
    /** #F2021F */
    dangerPrimary: colors.crimsonRed[500],
    /** #4D8D01 */
    successPrimary: colors.lawnGreen[700],
    /** #070707 */
    primaryBlack: colors.raisinBlack[900],
    /** #D9E6F0 — alias kept for convenience */
    default: colors.beauBlue[300],
    /** #F2021F */
    danger: colors.crimsonRed[500],
    /** #4D8D01 */
    success: colors.lawnGreen[700],
  },

  // ── backgrounds ───────────────────────────────────────────────────────────
  backgrounds: {
    /** #FAFBFF */
    disabled: colors.beauBlue[50],
    /** #070707 */
    primaryBlack: colors.raisinBlack[900],
    /** #024CCE */
    primary: colors.celurenBlue[500],
    /** #FAFBFF */
    secondary: colors.beauBlue[50],
  },

  // ── text ──────────────────────────────────────────────────────────────────
  text: {
    /** #A6B3BD */
    placeholder: colors.beauBlue[600],
    /** #0F1010 */
    primary: colors.raisinBlack[800],
    /** #D9E6F0 */
    disable: colors.beauBlue[300],
    /** #F2021F */
    dangerPrimary: colors.crimsonRed[500],
    /** #4D8D01 */
    successPrimary: colors.lawnGreen[700],
    /** #FBAE2E */
    warningPrimary: colors.brightYellowCrayola[500],
    /** #024CCE */
    importantBrand: colors.celurenBlue[500],
    /** #7D868E */
    secondary: colors.beauBlue[700],
    /** #A6B3BD */
    tertiary: colors.beauBlue[600],
    /** #FFFFFF — neutral[10] */
    inverse: colors.neutral[10],
    /** #F2021F */
    danger: colors.crimsonRed[500],
    /** #4D8D01 */
    success: colors.lawnGreen[700],
  },
} as const;

// ---------------------------------------------------------------------------
// Semantic status groups — reference the primitive success/caution/danger
// groups directly so they stay in sync with any future palette changes.
// ---------------------------------------------------------------------------

/** Success semantic group — main, surface, border, hover, pressed, focus */
export const success = colors.success;

/** Caution semantic group — main, surface, border, hover, pressed, focus */
export const caution = colors.caution;

/** Danger semantic group — main, surface, border, hover, pressed, focus */
export const danger = colors.danger;
