/**
 * CircularProgress.style.ts — style constants for the CircularProgress component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";
import type { CircularProgressSize } from "./CircularProgress.types";

export const SIZE_PX: Record<CircularProgressSize, number> = {
  xs: 32,
  sm: 48,
  md: 64,
  lg: 96,
  xl: 128,
};

export const THICKNESS_DEFAULT: Record<CircularProgressSize, number> = {
  xs: 3,
  sm: 4,
  md: 5,
  lg: 6,
  xl: 8,
};

export const FONT_SIZE: Record<CircularProgressSize, number> = {
  xs: 9,
  sm: 12,
  md: 16,
  lg: 22,
  xl: 28,
};

export const circularProgressStyles = {
  defaultColor: colors.celurenBlue[400].value,
  defaultTrackColor: colors.beauBlue[200].value,
  valueTextColor: colors.raisinBlack[800].value,
} as const;
