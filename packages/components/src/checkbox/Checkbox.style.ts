/**
 * Checkbox.style.ts — style constants for the Checkbox component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";
import type { CheckboxSize } from "./Checkbox.types";

export const SIZE_PX: Record<CheckboxSize, number> = { sm: 16, md: 20, lg: 24 };

export const checkboxStyles = {
  defaultColor: colors.celurenBlue[400].value,
  borderColorUnchecked: colors.beauBlue[400].value,
  labelColorDisabled: colors.beauBlue[600].value,
  labelColorEnabled: colors.raisinBlack[800].value,
} as const;
