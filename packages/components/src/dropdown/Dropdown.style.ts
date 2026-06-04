/**
 * Dropdown.style.ts — geometry-only style constants for the Dropdown component.
 * All colors are resolved at render time via useThemedColors() in Dropdown.tsx.
 */

import {
  RADIUS,
  GAP,
  ELEVATION,
  INTERACTION,
  TYPE_SCALE,
} from "../shared/visualSpec";
import { registerClasses, registerKeyframes } from "../shared/componentSheet";
import type { DropdownSize } from "./Dropdown.types";

export const DROPDOWN_KF = `
@keyframes szr-dropdown-in {
  from { opacity: 0; transform: translateY(-6px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
}
@keyframes szr-spin { to { transform: rotate(360deg); } }
`;

export const SIZE_H: Record<DropdownSize, number> = { sm: 34, md: 42, lg: 50 };
export const FONT: Record<DropdownSize, number> = {
  sm: TYPE_SCALE.label_sm, // 12
  md: TYPE_SCALE.label_md, // 14
  lg: TYPE_SCALE.label_lg, // 16
};

export const dropdownGeometry = {
  triggerBorderRadius: RADIUS.md, // 8
  menuBorderRadius: RADIUS.md, // 8
  menuElevation: ELEVATION.md,
  itemPaddingV: GAP.sm, // 8
  itemPaddingH: GAP.md, // 12
  itemBorderRadius: RADIUS.sm, // 6
  groupLabelFontSize: TYPE_SCALE.label_sm, // 12
  disabledOpacity: INTERACTION.disabledOpacity,
  hoverOpacity: INTERACTION.hoverOpacity,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const dropdownClasses = registerClasses("dropdown", {
  trigger: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: RADIUS.md,
    cursor: "pointer",
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
    boxSizing: "border-box",
    gap: GAP.sm,
    textAlign: "left",
    borderWidth: 1,
    borderStyle: "solid",
  },
  chevron: {
    flexShrink: 0,
    transition: "transform 0.2s ease",
  },
  menu: {
    position: "absolute",
    zIndex: 200,
    borderRadius: RADIUS.md + 2,
    overflow: "hidden",
    animation: "szr-dropdown-in 0.18s ease",
    maxHeight: 300,
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderStyle: "solid",
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: GAP.sm + 2,
    padding: `${dropdownGeometry.itemPaddingV}px ${dropdownGeometry.itemPaddingH}px`,
    cursor: "pointer",
    transition: "background 0.1s ease",
  },
  groupLabel: {
    paddingTop: GAP.sm,
    paddingBottom: GAP.xs,
    paddingLeft: dropdownGeometry.itemPaddingH,
    paddingRight: dropdownGeometry.itemPaddingH,
    fontSize: dropdownGeometry.groupLabelFontSize,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
});

registerKeyframes("szr-dropdown-kf", DROPDOWN_KF);
