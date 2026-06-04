/**
 * Spinner.style.ts — geometry-only style constants for the Spinner component.
 * All colors are resolved at render time via useThemedColors() in Spinner.tsx.
 */

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
