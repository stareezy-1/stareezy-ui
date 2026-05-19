/**
 * Clipboard.style.ts — style constants for the Clipboard component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";

export const clipboardStyles = {
  containerBg: colors.beauBlue[50].value,
  containerBorder: `1px solid ${colors.beauBlue[200].value}`,
  valueTextColor: colors.raisinBlack[800].value,
  buttonBgCopied: colors.lawnGreen[50].value,
  buttonColorCopied: colors.lawnGreen[600].value,
  buttonColorDefault: colors.beauBlue[700].value,
  buttonHoverBg: colors.beauBlue[100].value,
  rnBorderColor: colors.beauBlue[200].value,
  rnCopiedColor: colors.lawnGreen[600].value,
  rnDefaultColor: colors.beauBlue[700].value,
} as const;
