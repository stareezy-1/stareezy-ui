/**
 * useThemedColors — returns the current theme's resolved semantic color values.
 *
 * Components call this at render time so they automatically re-render with the
 * correct colors whenever the theme switches (light ↔ dark).
 *
 * On web the ThemeProvider also injects CSS variables, but components that
 * apply colors via inline styles or RN StyleSheet must read from this hook.
 */

import { useTheme } from "@stareezy-ui/tokens";
import { colors } from "@stareezy-ui/tokens";

/**
 * Returns a flat object of the most-used color values, resolved from the
 * active theme's semantic tokens.  All values are plain strings (hex / rgba).
 *
 * Extend this as more components need themed colors.
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
    // Kept here for convenience so components don't need two imports.
    surface: colors.neutral[10].value, // white
    surfaceDark: colors.raisinBlack[900].value, // near-black
    transparent: colors.transparent.value,
  } as const;
}
