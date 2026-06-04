/**
 * Modal.style.ts — geometry-only style constants for the Modal component.
 * All colors are resolved at render time via useThemedColors() in Modal.tsx.
 */

import { RADIUS, GAP, ELEVATION, INTERACTION } from "../shared/visualSpec";
import type { ModalSize } from "./Modal.types";

export const MODAL_KF = `
@keyframes szr-modal-in {
  from { opacity: 0; transform: scale(0.95) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes szr-backdrop-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;

export const SIZE_W: Record<ModalSize, string> = {
  xs: "320px",
  sm: "440px",
  md: "560px",
  lg: "720px",
  xl: "900px",
  full: "100vw",
};

export const modalGeometry = {
  borderRadius: RADIUS.xl, // 12
  headerPaddingV: GAP.md, // 12
  headerPaddingH: GAP.lg, // 16
  bodyPaddingH: GAP.lg, // 16
  bodyPaddingV: GAP.md, // 12
  footerPaddingV: GAP.md, // 12
  footerPaddingH: GAP.lg, // 16
  elevation: ELEVATION.xl,
  closeButtonSize: 32,
  closeButtonRadius: RADIUS.md, // 8
  disabledOpacity: INTERACTION.disabledOpacity,
} as const;
