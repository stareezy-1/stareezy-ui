/**
 * CircularProgress.style.ts — geometry-only style constants.
 * All colors are resolved at render time via useThemedColors() in CircularProgress.tsx.
 */

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
