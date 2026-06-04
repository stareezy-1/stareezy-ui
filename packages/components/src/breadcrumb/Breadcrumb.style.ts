/**
 * Breadcrumb.style.ts — layout and geometry styles for the Breadcrumb component.
 *
 * IMPORTANT: No hardcoded color literals here.
 * All colors are injected at render time via useThemedColors() in Breadcrumb.tsx.
 */

import { RADIUS, GAP, TYPE_SCALE, INTERACTION } from "../shared/visualSpec";

// Web nav container
export const webNav: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  flexWrap: "wrap",
};

// Web ordered list
export const webOl: React.CSSProperties = {
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  listStyle: "none",
  margin: 0,
  padding: 0,
  gap: GAP.xs, // 4
};

// Web list item
export const webLi: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: GAP.xs, // 4
};

// Web crumb link / span (no color — injected at render)
export const webCrumbBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  fontSize: TYPE_SCALE.label_md, // 14
  fontWeight: "400",
  lineHeight: 1.4,
  textDecoration: "none",
  borderRadius: RADIUS.sm, // 6
  paddingTop: 2,
  paddingBottom: 2,
  paddingLeft: GAP.xs, // 4
  paddingRight: GAP.xs, // 4
  outline: "none",
  cursor: "pointer",
  transition: "opacity 0.15s ease",
};

// Web crumb hover state
export const webCrumbHoverOpacity = INTERACTION.hoverOpacity;

// Web separator wrapper
export const webSeparatorWrap: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  userSelect: "none",
  pointerEvents: "none",
  fontSize: TYPE_SCALE.label_sm, // 12
};

// Native container
export const nativeContainer: Record<string, unknown> = {
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
};

// Native crumb base (no color — injected at render)
export const nativeCrumbBase: Record<string, unknown> = {
  flexDirection: "row",
  alignItems: "center",
};

// Native separator wrapper
export const nativeSeparator: Record<string, unknown> = {
  marginHorizontal: GAP.xs, // 4
};
