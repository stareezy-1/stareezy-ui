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
