/**
 * Modal.style.ts — geometry-only style constants for the Modal component.
 * All colors are resolved at render time via useThemedColors() in Modal.tsx.
 */

import { RADIUS, GAP, ELEVATION, INTERACTION } from "../shared/visualSpec";
import { registerClasses, registerKeyframes } from "../shared/componentSheet";
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
  borderRadius: RADIUS.xl,
  headerPaddingV: GAP.md,
  headerPaddingH: GAP.lg,
  bodyPaddingH: GAP.lg,
  bodyPaddingV: GAP.md,
  footerPaddingV: GAP.md,
  footerPaddingH: GAP.lg,
  elevation: ELEVATION.xl,
  closeButtonSize: 32,
  closeButtonRadius: RADIUS.md,
  disabledOpacity: INTERACTION.disabledOpacity,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const modalClasses = registerClasses("modal", {
  backdrop: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: GAP.lg,
    animation: "szr-backdrop-in 0.2s ease",
  },
  backdropOverlay: {
    position: "absolute",
    inset: 0,
    backdropFilter: "blur(4px)",
  },
  panel: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    maxWidth: "100%",
    animation: "szr-modal-in 0.22s cubic-bezier(0.34,1.56,0.64,1)",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    flexShrink: 0,
    paddingTop: modalGeometry.headerPaddingV + 8,
    paddingBottom: modalGeometry.headerPaddingV + 4,
    paddingLeft: modalGeometry.headerPaddingH + GAP.sm,
    paddingRight: modalGeometry.headerPaddingH + GAP.sm,
  },
  body: {
    overflowY: "auto",
    paddingTop: modalGeometry.bodyPaddingV + 8,
    paddingBottom: modalGeometry.bodyPaddingV + 8,
    paddingLeft: modalGeometry.bodyPaddingH + GAP.sm,
    paddingRight: modalGeometry.bodyPaddingH + GAP.sm,
  },
  footer: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    flexShrink: 0,
    paddingTop: modalGeometry.footerPaddingV,
    paddingBottom: modalGeometry.footerPaddingV + 4,
    paddingLeft: modalGeometry.footerPaddingH + GAP.sm,
    paddingRight: modalGeometry.footerPaddingH + GAP.sm,
  },
  closeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: modalGeometry.closeButtonSize,
    height: modalGeometry.closeButtonSize,
    borderRadius: modalGeometry.closeButtonRadius,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 18,
    transition: "background 0.15s ease, color 0.15s ease",
    flexShrink: 0,
    marginLeft: "auto",
  },
});

registerKeyframes("szr-modal-kf", MODAL_KF);
