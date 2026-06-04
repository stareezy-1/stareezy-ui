/**
 * Drawer.style.ts — layout and geometry styles for the Drawer component.
 *
 * IMPORTANT: No hardcoded color literals here.
 * All colors are injected at render time via useThemedColors() in Drawer.tsx.
 */

import {
  RADIUS,
  GAP,
  TYPE_SCALE,
  BORDER,
  INTERACTION,
  ELEVATION,
} from "../shared/visualSpec";
import type { DrawerAnchor } from "./Drawer.types";

// Web overlay backdrop (no color — injected at render)
export const webOverlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  display: "flex",
  alignItems: "stretch",
};

// Web panel base (no color — injected at render)
export const webPanelBase: React.CSSProperties = {
  position: "fixed",
  zIndex: 1001,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  boxSizing: "border-box",
  transition: "transform 0.28s ease",
  boxShadow: ELEVATION.xl,
};

// Per-anchor geometry
export const webPanelGeometry: Record<DrawerAnchor, React.CSSProperties> = {
  left: {
    top: 0,
    left: 0,
    bottom: 0,
    width: 320,
    maxWidth: "90vw",
    borderTopRightRadius: RADIUS.lg, // 10
    borderBottomRightRadius: RADIUS.lg,
    borderRightWidth: BORDER.default,
    borderRightStyle: "solid",
  },
  right: {
    top: 0,
    right: 0,
    bottom: 0,
    width: 320,
    maxWidth: "90vw",
    borderTopLeftRadius: RADIUS.lg, // 10
    borderBottomLeftRadius: RADIUS.lg,
    borderLeftWidth: BORDER.default,
    borderLeftStyle: "solid",
  },
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: "85vh",
    borderTopLeftRadius: RADIUS.lg, // 10
    borderTopRightRadius: RADIUS.lg,
    borderTopWidth: BORDER.default,
    borderTopStyle: "solid",
  },
};

// Entry transforms (closed state)
export const webPanelClosedTransform: Record<
  DrawerAnchor,
  React.CSSProperties
> = {
  left: { transform: "translateX(-100%)" },
  right: { transform: "translateX(100%)" },
  bottom: { transform: "translateY(100%)" },
};

// Open transform
export const webPanelOpenTransform: React.CSSProperties = {
  transform: "translateX(0) translateY(0)",
};

// Header bar
export const webHeader: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: GAP.md, // 12
  paddingBottom: GAP.md, // 12
  paddingLeft: GAP.lg, // 16
  paddingRight: GAP.lg, // 16
  flexShrink: 0,
  borderBottomWidth: BORDER.default,
  borderBottomStyle: "solid",
};

// Header title
export const webHeaderTitle: React.CSSProperties = {
  fontSize: TYPE_SCALE.label_lg, // 16
  fontWeight: "600",
  lineHeight: 1.4,
  margin: 0,
};

// Close button (no color — injected at render)
export const webCloseButton: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: RADIUS.md, // 8
  border: "none",
  // Note: outline is intentionally NOT set to "none" here.
  // The [data-szr-close]:focus-visible CSS rule in shared/focusStyles
  // provides the keyboard focus indicator.
  cursor: "pointer",
  background: "transparent",
  fontSize: 18,
  lineHeight: 1,
  flexShrink: 0,
  transition: "opacity 0.15s ease",
};

export const webCloseButtonHoverOpacity = INTERACTION.hoverOpacity;

// Body content area
export const webBody: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  padding: GAP.lg, // 16
};

// Native backdrop (no color — injected at render)
export const nativeOverlay: Record<string, unknown> = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

// Native panel (no color — injected at render)
export const nativePanelBase: Record<string, unknown> = {
  position: "absolute",
  flexDirection: "column",
};

export const nativePanelGeometry: Record<
  DrawerAnchor,
  Record<string, unknown>
> = {
  left: { top: 0, left: 0, bottom: 0, width: 300 },
  right: { top: 0, right: 0, bottom: 0, width: 300 },
  bottom: { bottom: 0, left: 0, right: 0, maxHeight: "80%" },
};

export const nativeHeader: Record<string, unknown> = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: GAP.md, // 12
  borderBottomWidth: BORDER.default,
};

export const nativeBody: Record<string, unknown> = {
  padding: GAP.lg, // 16
};
