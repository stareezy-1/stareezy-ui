/**
 * Skeleton.style.ts — geometry-only style constants for the Skeleton component.
 * All colors are resolved at render time via useThemedColors() in Skeleton.tsx.
 */

import { RADIUS } from "../shared/visualSpec";

export const SKELETON_KF = `
@keyframes szr-skeleton-wave {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

export const skeletonGeometry = {
  textBorderRadius: RADIUS.sm, // 6 — text lines
  rectBorderRadius: RADIUS.md, // 8 — rectangular blocks
  circleBorderRadius: RADIUS.full, // 9999 — avatar circles
} as const;
