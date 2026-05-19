/**
 * Switch.style.ts — style constants for the Switch component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";
import type { SwitchSize } from "./Switch.types";

export const TRACK: Record<SwitchSize, { w: number; h: number }> = {
  sm: { w: 32, h: 18 },
  md: { w: 44, h: 24 },
  lg: { w: 56, h: 30 },
};

export const THUMB: Record<SwitchSize, number> = { sm: 12, md: 18, lg: 24 };

export const switchStyles = {
  defaultActiveColor: colors.celurenBlue[400].value,
  defaultInactiveColor: colors.beauBlue[300].value,
  labelColorDisabled: colors.beauBlue[600].value,
  labelColorEnabled: colors.raisinBlack[800].value,
} as const;
