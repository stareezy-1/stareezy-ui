/**
 * Tooltip.style.ts — layout and geometry styles for the Tooltip component.
 * All colors are injected at render time via useThemedColors() in Tooltip.tsx.
 */

import { RADIUS, GAP, TYPE_SCALE, ELEVATION } from "../shared/visualSpec";
import { registerClasses } from "../shared/componentSheet";

// The tooltip container (web-only — no color here)
export const webTooltipBase: React.CSSProperties = {
  position: "absolute",
  zIndex: 9999,
  borderRadius: RADIUS.md,
  paddingTop: GAP.xs,
  paddingBottom: GAP.xs,
  paddingLeft: GAP.sm,
  paddingRight: GAP.sm,
  fontSize: TYPE_SCALE.label_sm,
  fontWeight: "500",
  lineHeight: 1.4,
  maxWidth: 240,
  pointerEvents: "none",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  boxSizing: "border-box",
  boxShadow: ELEVATION.sm,
};

// Wrapper for the trigger
export const webTriggerWrapper: React.CSSProperties = {
  display: "inline-flex",
  position: "relative",
};

// Tooltip arrow
export const webArrowBase: React.CSSProperties = {
  position: "absolute",
  width: 0,
  height: 0,
  borderStyle: "solid",
};

// ── Stylesheet registration ───────────────────────────────────────────────────

export const tooltipClasses = registerClasses("tooltip", {
  trigger: {
    display: "inline-flex",
    position: "relative",
  },
  panel: {
    position: "absolute",
    zIndex: 9999,
    borderRadius: RADIUS.md,
    paddingTop: GAP.xs,
    paddingBottom: GAP.xs,
    paddingLeft: GAP.sm,
    paddingRight: GAP.sm,
    fontSize: TYPE_SCALE.label_sm,
    fontWeight: "500",
    lineHeight: "1.4",
    maxWidth: 240,
    pointerEvents: "none",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    boxSizing: "border-box",
    boxShadow: ELEVATION.sm,
  },
});
