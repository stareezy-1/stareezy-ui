/**
 * Switch.style.ts — geometry-only style constants for the Switch component.
 * All colors are resolved at render time via useThemedColors() in Switch.tsx.
 */

import { INTERACTION } from "../shared/visualSpec";
import { registerClasses } from "../shared/componentSheet";
import type { SwitchSize } from "./Switch.types";

export const TRACK: Record<SwitchSize, { w: number; h: number }> = {
  sm: { w: 32, h: 18 },
  md: { w: 44, h: 24 },
  lg: { w: 56, h: 30 },
};

export const THUMB: Record<SwitchSize, number> = { sm: 12, md: 18, lg: 24 };

export const switchStateOpacity = {
  disabled: INTERACTION.disabledOpacity,
  hover: INTERACTION.hoverOpacity,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const switchClasses = registerClasses("switch", {
  wrapper: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    userSelect: "none",
  },
  track: {
    position: "relative",
    display: "inline-block",
    flexShrink: 0,
    transition: "background-color 0.2s ease",
    boxSizing: "border-box",
  },
  thumb: {
    position: "absolute",
    borderRadius: "50%",
    boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
    transition: "left 0.2s cubic-bezier(0.4,0,0.2,1)",
  },
});
