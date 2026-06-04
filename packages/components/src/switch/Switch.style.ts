/**
 * Switch.style.ts — geometry-only style constants for the Switch component.
 * All colors are resolved at render time via useThemedColors() in Switch.tsx.
 */

import { INTERACTION } from "../shared/visualSpec";
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
