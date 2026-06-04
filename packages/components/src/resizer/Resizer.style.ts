/**
 * Resizer.style.ts — geometry-only style constants for the Resizer component.
 * All colors are resolved at render time via useThemedColors() in Resizer.tsx.
 */

import { INTERACTION } from "../shared/visualSpec";
import { registerClasses } from "../shared/componentSheet";

export const resizerGeometry = {
  handleWidth: 6,
  handleHeight: 6,
  handleIndicatorWidth: 2,
  handleIndicatorHeight: 32,
  handleIndicatorBorderRadius: 1,
  handleIndicatorOpacity: INTERACTION.pressedOpacity,
  cornerHandleSize: 14,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const resizerClasses = registerClasses("resizer", {
  container: {
    position: "relative",
    overflow: "hidden",
  },
  handleH: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: resizerGeometry.handleWidth,
    cursor: "col-resize",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    transition: "background 0.15s ease",
    background: "transparent",
  },
  handleV: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: resizerGeometry.handleHeight,
    cursor: "row-resize",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    transition: "background 0.15s ease",
    background: "transparent",
  },
  handleCorner: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: resizerGeometry.cornerHandleSize,
    height: resizerGeometry.cornerHandleSize,
    cursor: "nwse-resize",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 2,
    zIndex: 10,
  },
  indicator: {
    borderRadius: resizerGeometry.handleIndicatorBorderRadius,
    opacity: resizerGeometry.handleIndicatorOpacity,
  },
});
