/**
 * Progress.style.ts — geometry-only style constants for the Progress component.
 * All colors are resolved at render time via useThemedColors() in Progress.tsx.
 */

import { RADIUS } from "../shared/visualSpec";
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

export const progressGeometry = {
  trackBorderRadius: RADIUS.full, // pill-shaped track
} as const;
