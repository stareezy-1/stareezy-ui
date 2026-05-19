/**
 * Progress.style.ts — style constants for the Progress component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";
import type { ProgressSize } from "./Progress.types";

export const PROGRESS_KF = `
@keyframes szr-progress-stripe {
  from { background-position: 40px 0; }
  to { background-position: 0 0; }
}
`;

export const HEIGHT: Record<ProgressSize, number> = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
};

export const progressStyles = {
  defaultColor: colors.celurenBlue[400].value,
  defaultTrackColor: colors.beauBlue[200].value,
  gradientFrom: colors.celurenBlue[300].value,
  gradientTo: colors.celurenBlue[500].value,
  stripeSecondary: colors.celurenBlue[300].value,
  labelColor: colors.raisinBlack[800].value,
} as const;
