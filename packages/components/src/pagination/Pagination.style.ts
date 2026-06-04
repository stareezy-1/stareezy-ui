/**
 * Pagination.style.ts — layout and geometry styles for the Pagination component.
 * All colors are injected at render time via useThemedColors() in Pagination.tsx.
 */

import { RADIUS, GAP, TYPE_SCALE, INTERACTION } from "../shared/visualSpec";
import { registerClasses } from "../shared/componentSheet";

// Web nav container
export const webNav: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: GAP.xs,
};

// Web page button base (no color — injected at render)
export const webPageButtonBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 36,
  height: 36,
  paddingLeft: GAP.xs,
  paddingRight: GAP.xs,
  borderRadius: RADIUS.md,
  border: "none",
  outline: "none",
  cursor: "pointer",
  fontSize: TYPE_SCALE.label_md,
  fontWeight: "500",
  lineHeight: 1,
  transition: "background-color 0.15s ease, opacity 0.15s ease",
  userSelect: "none",
  flexShrink: 0,
};

// Web disabled state
export const webDisabled: React.CSSProperties = {
  opacity: INTERACTION.disabledOpacity,
  cursor: "not-allowed",
  pointerEvents: "none",
};

export const webHoverOpacity = INTERACTION.hoverOpacity;

// Native container
export const nativeContainer: Record<string, unknown> = {
  flexDirection: "row",
  alignItems: "center",
  gap: GAP.xs,
};

// Native page button base (no color — injected at render)
export const nativePageButtonBase: Record<string, unknown> = {
  minWidth: 36,
  height: 36,
  paddingHorizontal: GAP.xs,
  borderRadius: RADIUS.md,
  alignItems: "center",
  justifyContent: "center",
};

// ── Stylesheet registration ───────────────────────────────────────────────────

export const paginationClasses = registerClasses("pagination", {
  nav: {
    display: "inline-flex",
    alignItems: "center",
    gap: GAP.xs,
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 36,
    height: 36,
    paddingLeft: GAP.xs,
    paddingRight: GAP.xs,
    borderRadius: RADIUS.md,
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontSize: TYPE_SCALE.label_md,
    fontWeight: "500",
    lineHeight: 1,
    transition: "background-color 0.15s ease, opacity 0.15s ease",
    userSelect: "none",
    flexShrink: 0,
  },
});
