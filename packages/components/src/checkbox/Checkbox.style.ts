/**
 * Checkbox.style.ts — geometry-only style constants for the Checkbox component.
 * All colors are resolved at render time via useThemedColors() in Checkbox.tsx.
 */

import { INTERACTION, RADIUS } from "../shared/visualSpec";
import { registerClasses } from "../shared/componentSheet";
import type { CheckboxSize } from "./Checkbox.types";

export const SIZE_PX: Record<CheckboxSize, number> = { sm: 16, md: 20, lg: 24 };

export const checkboxGeometry = {
  borderRadius: RADIUS.sm, // 6
} as const;

export const checkboxStateOpacity = {
  disabled: INTERACTION.disabledOpacity,
  hover: INTERACTION.hoverOpacity,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const checkboxClasses = registerClasses("checkbox", {
  wrapper: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
  },
  box: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition:
      "background-color 0.15s ease, border-color 0.15s ease, transform 0.1s ease",
    boxSizing: "border-box",
    borderWidth: 2,
    borderStyle: "solid",
  },
});
