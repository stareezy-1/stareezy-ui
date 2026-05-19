/**
 * Input.style.ts — style constants for the Input component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors, radius } from "@stareezy-ui/tokens";
import { EInputSize } from "./Input.types";

export const inputStyles = {
  borderColorError: colors.crimsonRed[500].value,
  borderColorFocus: colors.celurenBlue[400].value,
  focusRingDefault: `0 0 0 3px ${colors.celurenBlue[25].value}`,
  focusRingError: `0 0 0 3px ${colors.crimsonRed[50].value}`,
  requiredColor: colors.crimsonRed[500].value,
  errorColor: colors.crimsonRed[500].value,
} as const;

export const SIZE_PADDING_V: Record<EInputSize, number> = {
  [EInputSize.Sm]: 7,
  [EInputSize.Md]: 10,
  [EInputSize.Lg]: 13,
};

export const SIZE_PADDING_H: Record<EInputSize, number> = {
  [EInputSize.Sm]: 10,
  [EInputSize.Md]: 12,
  [EInputSize.Lg]: 16,
};

export const SIZE_FONT: Record<EInputSize, number> = {
  [EInputSize.Sm]: 13,
  [EInputSize.Md]: 14,
  [EInputSize.Lg]: 16,
};

export const SIZE_BORDER_RADIUS: Record<EInputSize, number> = {
  [EInputSize.Sm]: radius.md.value,
  [EInputSize.Md]: radius.lg.value,
  [EInputSize.Lg]: radius.lg.value,
};
