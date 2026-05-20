/**
 * Theme definitions for Stareezy UI.
 *
 * Exports:
 *  - `ThemeOverride` — a partial override of `semanticColors`
 *  - `themes` — built-in `light` and `dark` theme definitions
 *
 * Requirements: 7.1
 */

import { colors } from "./colors";
import { semanticColors } from "./semantic";
import { aurora } from "./aurora";
import { steinsGate } from "./steins-gate";

// ---------------------------------------------------------------------------
// ThemeOverride type
// ---------------------------------------------------------------------------

/**
 * A partial override of the semantic color map.
 * Pass this (or a `keyof typeof themes` string) to `ThemeProvider`.
 */
export type ThemeOverride = Partial<typeof semanticColors>;

// ---------------------------------------------------------------------------
// Theme definitions
// ---------------------------------------------------------------------------

export const themes = {
  /**
   * Light theme — uses the default semantic color values.
   * Explicitly mirrors `semanticColors` so consumers can spread or compare.
   */
  light: {
    border: {
      tertiary: semanticColors.border.tertiary,
      primaryBrand: semanticColors.border.primaryBrand,
      secondary: semanticColors.border.secondary,
      dangerPrimary: semanticColors.border.dangerPrimary,
      successPrimary: semanticColors.border.successPrimary,
      primaryBlack: semanticColors.border.primaryBlack,
      default: semanticColors.border.default,
      danger: semanticColors.border.danger,
      success: semanticColors.border.success,
    },
    backgrounds: {
      disabled: semanticColors.backgrounds.disabled,
      primaryBlack: semanticColors.backgrounds.primaryBlack,
      primary: semanticColors.backgrounds.primary,
      secondary: semanticColors.backgrounds.secondary,
    },
    text: {
      placeholder: semanticColors.text.placeholder,
      primary: semanticColors.text.primary,
      disable: semanticColors.text.disable,
      dangerPrimary: semanticColors.text.dangerPrimary,
      successPrimary: semanticColors.text.successPrimary,
      warningPrimary: semanticColors.text.warningPrimary,
      importantBrand: semanticColors.text.importantBrand,
      secondary: semanticColors.text.secondary,
      tertiary: semanticColors.text.tertiary,
      inverse: semanticColors.text.inverse,
      danger: semanticColors.text.danger,
      success: semanticColors.text.success,
    },
  },

  /**
   * Dark theme — overrides semantic color tokens with dark-appropriate values.
   *
   * Strategy:
   *  - Backgrounds: use deep dark tones (raisinBlack shades)
   *  - Text: use light tones (neutral/beauBlue light shades) for readability
   *  - Borders: use mid-dark tones
   *  - Brand/status colors: keep hue but shift to lighter shades for contrast
   */
  dark: {
    border: {
      /** Darker border on dark backgrounds */
      tertiary: colors.raisinBlack[400],
      /** Keep brand blue but slightly lighter for dark bg contrast */
      primaryBrand: colors.celurenBlue[300],
      /** Subtle border on dark surface */
      secondary: colors.raisinBlack[300],
      /** Danger border — lighter shade for dark bg */
      dangerPrimary: colors.crimsonRed[300],
      /** Success border — lighter shade for dark bg */
      successPrimary: colors.lawnGreen[400],
      /** Near-white border on dark bg */
      primaryBlack: colors.neutral[10],
      /** Default border on dark surface */
      default: colors.raisinBlack[400],
      /** Danger alias */
      danger: colors.crimsonRed[300],
      /** Success alias */
      success: colors.lawnGreen[400],
    },
    backgrounds: {
      /** Disabled bg on dark surface — slightly lighter than base dark */
      disabled: colors.raisinBlack[500],
      /** Primary black bg — stays very dark */
      primaryBlack: colors.raisinBlack[900],
      /** Primary action bg — lighter blue for dark mode */
      primary: colors.celurenBlue[400],
      /** Secondary bg — dark surface */
      secondary: colors.raisinBlack[600],
    },
    text: {
      /** Placeholder text on dark bg — muted light tone */
      placeholder: colors.beauBlue[500],
      /** Primary text on dark bg — near white */
      primary: colors.neutral[10],
      /** Disabled text on dark bg */
      disable: colors.raisinBlack[300],
      /** Danger text — lighter red for dark bg */
      dangerPrimary: colors.crimsonRed[300],
      /** Success text — lighter green for dark bg */
      successPrimary: colors.lawnGreen[400],
      /** Warning text — keep yellow, slightly lighter */
      warningPrimary: colors.brightYellowCrayola[400],
      /** Brand text — lighter blue for dark bg */
      importantBrand: colors.celurenBlue[300],
      /** Secondary text — lighter muted tone */
      secondary: colors.beauBlue[500],
      /** Tertiary text — muted light tone */
      tertiary: colors.beauBlue[500],
      /** Inverse text — dark on light elements */
      inverse: colors.raisinBlack[800],
      /** Danger alias */
      danger: colors.crimsonRed[300],
      /** Success alias */
      success: colors.lawnGreen[400],
    },
  },
  /**
   * Aurora theme — deep-space dark aesthetic inspired by aurora-pdf.
   * Uses aurora green (#00ff88) as the primary brand color and
   * nebula purple (#7c3aed) as the accent.
   */
  aurora: {
    border: {
      tertiary: aurora.borderSubtle,
      primaryBrand: aurora.auroraGreen,
      secondary: aurora.borderSubtle,
      dangerPrimary: aurora.errorRed,
      successPrimary: aurora.auroraGreen,
      primaryBlack: aurora.starWhite,
      default: aurora.borderSubtle,
      danger: aurora.errorRed,
      success: aurora.auroraGreen,
    },
    backgrounds: {
      disabled: aurora.cosmicGray,
      primaryBlack: aurora.deepSpace,
      primary: aurora.auroraGreen,
      secondary: aurora.surfaceDark,
    },
    text: {
      placeholder: aurora.textMuted,
      primary: aurora.starWhite,
      disable: aurora.textMuted,
      dangerPrimary: aurora.errorRed,
      successPrimary: aurora.auroraGreen,
      warningPrimary: aurora.warningAmber,
      importantBrand: aurora.auroraGreen,
      secondary: aurora.textSecondary,
      tertiary: aurora.textMuted,
      inverse: aurora.deepSpace,
      danger: aurora.errorRed,
      success: aurora.auroraGreen,
    },
  },
  /**
   * Steins;Gate theme — midnight navy / electric blue aesthetic.
   * Electric blue (#4a9eff) as primary, divergence red (#e63030) as danger,
   * deep midnight navy backgrounds, warm ivory text.
   * "El Psy Kongroo."
   */
  "steins-gate": {
    border: {
      tertiary: steinsGate.borderNavy,
      primaryBrand: steinsGate.ibmBlue,
      secondary: steinsGate.borderNavy,
      dangerPrimary: steinsGate.divergenceRed,
      successPrimary: steinsGate.labTeal,
      primaryBlack: steinsGate.ivoryText,
      default: steinsGate.borderNavy,
      danger: steinsGate.divergenceRed,
      success: steinsGate.labTeal,
    },
    backgrounds: {
      disabled: steinsGate.surfaceNavy,
      primaryBlack: steinsGate.labNight,
      primary: steinsGate.ibmBlue,
      secondary: steinsGate.midnightNavy,
    },
    text: {
      placeholder: steinsGate.textMuted,
      primary: steinsGate.ivoryText,
      disable: steinsGate.textMuted,
      dangerPrimary: steinsGate.divergenceRed,
      successPrimary: steinsGate.labTeal,
      warningPrimary: steinsGate.ibmBlueDim,
      importantBrand: steinsGate.ibmBlue,
      secondary: steinsGate.ivoryDim,
      tertiary: steinsGate.textMuted,
      inverse: steinsGate.labNight,
      danger: steinsGate.divergenceRed,
      success: steinsGate.labTeal,
    },
  },
} as const;
