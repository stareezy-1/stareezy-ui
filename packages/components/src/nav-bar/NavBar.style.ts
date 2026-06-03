/**
 * NavBar.style.ts — geometry-only style constants for the NavBar component.
 * All colors are resolved at render time via useThemedColors() in NavBar.tsx.
 */

import { GAP, ELEVATION } from "../shared/visualSpec";

export const navBarGeometry = {
  height: 60,
  paddingH: GAP.xl, // 24
  zIndex: 200,
} as const;

export const navBarLogoStyle = {
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
} as const;

export const navBarLinksStyle = {
  display: "flex",
  alignItems: "center",
  gap: GAP.xs, // 4
  flex: 1,
  paddingLeft: GAP.xl, // 24
} as const;

export const navBarActionsStyle = {
  display: "flex",
  alignItems: "center",
  gap: GAP.sm, // 8
  marginLeft: "auto",
} as const;

export const navBarElevation = ELEVATION.sm;
