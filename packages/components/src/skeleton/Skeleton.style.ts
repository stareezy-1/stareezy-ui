/**
 * Skeleton.style.ts — geometry-only style constants for the Skeleton component.
 * All colors are resolved at render time via useThemedColors() in Skeleton.tsx.
 */

import { RADIUS } from "../shared/visualSpec";
import { registerClasses, registerKeyframes } from "../shared/componentSheet";

export const SKELETON_KF = `
@keyframes szr-skeleton-wave {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

export const skeletonGeometry = {
  textBorderRadius: RADIUS.sm,
  rectBorderRadius: RADIUS.md,
  circleBorderRadius: RADIUS.full,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const skeletonClasses = registerClasses("skeleton", {
  base: {
    display: "block",
    flexShrink: 0,
  },
  animated: {
    backgroundSize: "200% 100%",
    animation: "szr-skeleton-wave 1.6s ease-in-out infinite",
  },
  multiLine: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
});

registerKeyframes("szr-skeleton-kf", SKELETON_KF);
