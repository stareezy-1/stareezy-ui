/**
 * Divider.style.ts — style constants for the Divider component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";

export const dividerStyles = {
  defaultColor: colors.beauBlue[300].value,
  labelColor: colors.beauBlue[700].value,
} as const;
