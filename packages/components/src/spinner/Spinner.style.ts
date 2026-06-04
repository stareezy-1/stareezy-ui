/**
 * Spinner.style.ts — geometry-only style constants for the Spinner component.
 * All colors are resolved at render time via useThemedColors() in Spinner.tsx.
 */

import { registerClasses, registerKeyframes } from "../shared/componentSheet";
import { INTERACTION } from "../shared/visualSpec";
import type { SpinnerSize } from "./Spinner.types";

export const SPINNER_KF = `
@keyframes szr-spin { to { transform: rotate(360deg); } }
@keyframes szr-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
`;

export const SIZE_MAP: Record<SpinnerSize, number> = {
  xs: 16,
  sm: 20,
  md: 28,
  lg: 40,
  xl: 56,
};

export const THICKNESS_MAP: Record<SpinnerSize, number> = {
  xs: 2,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 4,
};

export const spinnerStateOpacity = {
  disabled: INTERACTION.disabledOpacity,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const spinnerClasses = registerClasses("spinner", {
  ring: {
    display: "inline-block",
    borderStyle: "solid",
    borderRadius: "50%",
    animation: "szr-spin 0.65s linear infinite",
    flexShrink: 0,
    boxSizing: "border-box",
  },
  pulse: {
    display: "inline-block",
    borderRadius: "50%",
    animation: "szr-pulse 1.4s ease-in-out infinite",
  },
  dots: {
    display: "inline-flex",
    alignItems: "center",
  },
  dot: {
    display: "inline-block",
    borderRadius: "50%",
    animation: "szr-spin 1.2s ease-in-out infinite",
  },
});

/** Register the keyframes on first import (web only). */
registerKeyframes("szr-spinner-kf", SPINNER_KF);
