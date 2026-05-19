/**
 * Spinner.style.ts — style constants for the Spinner component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";
import type { SpinnerSize } from "./Spinner.types";

export const SPINNER_KF = `
@keyframes szr-spin { to { transform: rotate(360deg); } }
@keyframes szr-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
`;

export const SIZE_MAP: Record<SpinnerSize, number> = {
  xs: 16,
  sm: 20,
  md: 28,
  lg: 40,
  xl: 56,
};

export const THICKNESS_MAP: Record<SpinnerSize, number> = {
  xs: 2,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 4,
};

export const spinnerStyles = {
  defaultColor: colors.celurenBlue[400].value,
  defaultTrackColor: colors.beauBlue[200].value,
} as const;
