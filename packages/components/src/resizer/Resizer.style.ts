/**
 * Resizer.style.ts — geometry-only style constants for the Resizer component.
 * All colors are resolved at render time via useThemedColors() in Resizer.tsx.
 */

import { INTERACTION } from "../shared/visualSpec";

export const resizerGeometry = {
  handleWidth: 6,
  handleHeight: 6,
  handleIndicatorWidth: 2,
  handleIndicatorHeight: 32,
  handleIndicatorBorderRadius: 1,
  handleIndicatorOpacity: INTERACTION.pressedOpacity, // 0.7
  cornerHandleSize: 14,
} as const;
