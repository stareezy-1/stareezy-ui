/**
 * Clipboard.style.ts — geometry-only style constants for the Clipboard component.
 * All colors are resolved at render time via useThemedColors() in Clipboard.tsx.
 */

import { RADIUS, GAP, INTERACTION } from "../shared/visualSpec";

export const clipboardGeometry = {
  containerBorderRadius: RADIUS.md, // 8
  containerPaddingV: GAP.sm - 2, // 6
  containerPaddingH: GAP.sm + 2, // 10
  buttonSize: 28,
  buttonBorderRadius: RADIUS.sm, // 6
  hoverOpacity: INTERACTION.hoverOpacity,
  disabledOpacity: INTERACTION.disabledOpacity,
} as const;
