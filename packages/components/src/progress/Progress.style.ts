/**
 * Progress.style.ts — geometry-only style constants for the Progress component.
 * All colors are resolved at render time via useThemedColors() in Progress.tsx.
 */

import { RADIUS } from "../shared/visualSpec";
import { registerClasses, registerKeyframes } from "../shared/componentSheet";
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
  trackBorderRadius: RADIUS.full,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const progressClasses = registerClasses("progress", {
  track: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

registerKeyframes("szr-progress-kf", PROGRESS_KF);
