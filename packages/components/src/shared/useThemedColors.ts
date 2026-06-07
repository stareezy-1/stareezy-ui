/**
 * useThemedColors — returns the current theme's resolved semantic color values.
 *
 * Components call this at render time so they automatically re-render with the
 * correct colors whenever the theme switches (light ↔ dark ↔ aurora ↔ steins-gate).
 *
 * On web the ThemeProvider also injects CSS variables, but components that
 * apply colors via inline styles or RN StyleSheet must read from this hook.
 */

import { useTheme } from "@stareezy-ui/tokens";
import { colors, glow } from "@stareezy-ui/tokens";

/**
 * Returns a flat object of the most-used color values, resolved from the
 * active theme's semantic tokens. All values are plain strings (hex / rgba).
 *
 * Automatically re-renders when the theme switches.
 */
export function useThemedColors() {
  const theme = useTheme();

  return {
    // ── text ────────────────────────────────────────────────────────────────
    textPrimary: theme.text.primary.value,
    textSecondary: theme.text.secondary.value,
    textTertiary: theme.text.tertiary.value,
    textDisabled: theme.text.disable.value,
    textInverse: theme.text.inverse.value,
    textDanger: theme.text.danger.value,
    textSuccess: theme.text.success.value,
    textPlaceholder: theme.text.placeholder.value,
    textImportantBrand: theme.text.importantBrand.value,
    textDangerPrimary: theme.text.dangerPrimary.value,
    textSuccessPrimary: theme.text.successPrimary.value,
    textWarningPrimary: theme.text.warningPrimary.value,

    // ── backgrounds ─────────────────────────────────────────────────────────
    bgDisabled: theme.backgrounds.disabled.value,
    bgPrimary: theme.backgrounds.primary.value,
    bgSecondary: theme.backgrounds.secondary.value,
    bgPrimaryBlack: theme.backgrounds.primaryBlack.value,

    // ── borders ─────────────────────────────────────────────────────────────
    borderDefault: theme.border.default.value,
    borderSecondary: theme.border.secondary.value,
    borderTertiary: theme.border.tertiary.value,
    borderPrimaryBrand: theme.border.primaryBrand.value,
    borderDanger: theme.border.danger.value,
    borderSuccess: theme.border.success.value,
    borderDangerPrimary: theme.border.dangerPrimary.value,
    borderSuccessPrimary: theme.border.successPrimary.value,
    borderPrimaryBlack: theme.border.primaryBlack.value,

    // ── surface / neutral (not in semantic but commonly needed) ──────────────
    // These don't change with theme — they're absolute palette values.
    surface: colors.neutral[10].value, // white
    surfaceDark: colors.raisinBlack[900].value, // near-black
    transparent: colors.transparent.value,

    // ── interactive / focus states ───────────────────────────────────────────
    /** Active/interactive bg — primary brand bg (adapts per theme) */
    bgInteractive: theme.backgrounds.primary.value,
    /** Hover state bg — secondary bg (adapts per theme) */
    bgHover: theme.backgrounds.secondary.value,
    /** Selected option bg — subtle brand tint */
    bgSelected: colors.celurenBlue[25].value,
    /** Text color on selected state */
    bgSelectedText: colors.celurenBlue[600].value,
    /** Focus ring box-shadow — brand blue ring */
    focusRing: `0 0 0 3px ${colors.celurenBlue[25].value}`,
    /** Focus ring box-shadow for error state */
    focusRingError: `0 0 0 3px ${colors.crimsonRed[50].value}`,

    // ── status color families (for badge/toast/alert variants) ──────────────
    /** Success color — resolves from theme success text slot */
    colorSuccess: theme.text.successPrimary.value,
    /** Danger/error color — resolves from theme danger text slot */
    colorDanger: theme.text.dangerPrimary.value,
    /** Warning color — resolves from theme warning text slot */
    colorWarning: theme.text.warningPrimary.value,
    /** Info/brand color — resolves from theme importantBrand slot */
    colorInfo: theme.text.importantBrand.value,

    // ── glow effects (theme-independent decorative — aurora token values) ─────
    // These are CSS box-shadow strings from the glow token group.
    // They are theme-independent: glow effects look the same across themes.
    glowGreen: glow.green.value,
    glowPurple: glow.purple.value,

    // ── semantic-specific convenience slots ──────────────────────────────────
    /** Card/modal/panel surface bg — maps to theme secondary bg */
    bgSurface: theme.backgrounds.secondary.value,
    /** Overlay/backdrop text — maps to theme primary text */
    textOnSurface: theme.text.primary.value,
    /** Muted/hint text — maps to theme tertiary text */
    textMuted: theme.text.tertiary.value,
    /** Close/chevron button text — secondary text */
    textControl: theme.text.secondary.value,
    /** Control hover bg — light secondary */
    bgControlHover: theme.backgrounds.secondary.value,

    // ── raw theme object — for components that need direct token access ──────
    /** The full resolved theme — use `.value` on any slot for the raw string */
    theme,
  } as const;
}

/**
 * Returns the raw resolved theme object.
 * Prefer `useThemedColors()` for flat access; use this when you need the
 * full semantic structure.
 *
 * @example
 * ```tsx
 * const theme = useThemeTokens()
 * const color = theme.text.importantBrand.value // "#4a9eff" in steins-gate
 * ```
 */
export { useTheme as useThemeTokens } from "@stareezy-ui/tokens";
