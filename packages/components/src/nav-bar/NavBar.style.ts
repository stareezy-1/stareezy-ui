/**
 * NavBar.style.ts — geometry-only style constants for the NavBar component.
 * All colors are resolved at render time via useThemedColors() in NavBar.tsx.
 */

import { GAP, ELEVATION } from "../shared/visualSpec";
import { registerClasses } from "../shared/componentSheet";

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

// ── Stylesheet registration ───────────────────────────────────────────────────

export const navBarClasses = registerClasses("navbar", {
  header: {
    position: "sticky",
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: navBarGeometry.height,
    paddingLeft: navBarGeometry.paddingH,
    paddingRight: navBarGeometry.paddingH,
    zIndex: navBarGeometry.zIndex,
    transition: "backdrop-filter 0.3s ease, border-color 0.3s ease",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    boxSizing: "border-box",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: GAP.xs,
    paddingLeft: GAP.xl,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: GAP.sm,
    marginLeft: "auto",
  },
});
