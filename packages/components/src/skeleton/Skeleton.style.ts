/**
 * Skeleton.style.ts — style constants for the Skeleton component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";

export const SKELETON_KF = `
@keyframes szr-skeleton-wave {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

export const skeletonStyles = {
  defaultBaseColor: colors.beauBlue[200].value,
  defaultHighlightColor: colors.beauBlue[50].value,
} as const;
