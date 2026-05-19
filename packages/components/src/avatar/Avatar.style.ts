/**
 * Avatar.style.ts — style constants for the Avatar component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";
import type { AvatarSize, AvatarShape, AvatarStatus } from "./Avatar.types";

export const SIZE_PX: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  "2xl": 80,
};

export const FONT_SIZE: Record<AvatarSize, number> = {
  xs: 9,
  sm: 12,
  md: 15,
  lg: 18,
  xl: 24,
  "2xl": 30,
};

export const STATUS_SIZE: Record<AvatarSize, number> = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  "2xl": 16,
};

export const STATUS_COLORS: Record<AvatarStatus, string> = {
  online: colors.lawnGreen[500].value,
  offline: colors.beauBlue[600].value,
  away: colors.brightYellowCrayola[500].value,
  busy: colors.crimsonRed[500].value,
};

export const SHAPE_RADIUS: Record<AvatarShape, string | number> = {
  circle: "50%",
  rounded: "25%",
  square: 0,
};

export const GRADIENTS = [
  "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
  "linear-gradient(135deg,#f093fb 0%,#f5576c 100%)",
  "linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)",
  "linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)",
  "linear-gradient(135deg,#fa709a 0%,#fee140 100%)",
  "linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)",
  "linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)",
  "linear-gradient(135deg,#a1c4fd 0%,#c2e9fb 100%)",
];

export const rnFallbackBgColor = colors.celurenBlue[400].value;
