/**
 * Tooltip.style.ts — layout and geometry styles for the Tooltip component.
 *
 * IMPORTANT: No hardcoded color literals here.
 * All colors are injected at render time via useThemedColors() in Tooltip.tsx.
 */

import { RADIUS, GAP, TYPE_SCALE, ELEVATION } from "../shared/visualSpec";

// The tooltip container (web-only — no color here)
export const webTooltipBase: React.CSSProperties = {
  position: "absolute",
  zIndex: 9999,
  borderRadius: RADIUS.md, // 8
  paddingTop: GAP.xs, // 4
  paddingBottom: GAP.xs, // 4
  paddingLeft: GAP.sm, // 8
  paddingRight: GAP.sm, // 8
  fontSize: TYPE_SCALE.label_sm, // 12
  fontWeight: "500",
  lineHeight: 1.4,
  maxWidth: 240,
  pointerEvents: "none",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  boxSizing: "border-box",
  boxShadow: ELEVATION.sm,
};

// Wrapper for the trigger (inline-flex so it doesn't disturb layout)
export const webTriggerWrapper: React.CSSProperties = {
  display: "inline-flex",
  position: "relative",
};

// Tooltip arrow (small triangle, no color — injected at render)
export const webArrowBase: React.CSSProperties = {
  position: "absolute",
  width: 0,
  height: 0,
  borderStyle: "solid",
};
