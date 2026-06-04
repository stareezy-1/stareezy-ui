/**
 * Accordion.style.ts — geometry-only style constants for the Accordion component.
 * All colors are resolved at render time via useThemedColors() in Accordion.tsx.
 */

import { RADIUS, GAP, INTERACTION } from "../shared/visualSpec";
import { registerClasses, registerKeyframes } from "../shared/componentSheet";

export const ACCORDION_KF = `
@keyframes szr-accordion-open {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

export const accordionGeometry = {
  borderedBorderRadius: RADIUS.xl, // 12
  separatedBorderRadius: RADIUS.lg, // 10
  triggerPaddingV: GAP.sm + GAP.xs, // 12
  triggerPaddingH: GAP.lg + GAP.xs, // 20
  contentPaddingH: GAP.lg + GAP.xs, // 20
  contentPaddingTop: GAP.xs, // 4
  contentPaddingBottom: GAP.lg, // 16
  itemGap: GAP.sm, // 8
  disabledOpacity: INTERACTION.disabledOpacity,
  hoverOpacity: INTERACTION.hoverOpacity,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const accordionClasses = registerClasses("accordion", {
  trigger: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.15s ease",
    gap: GAP.md,
    paddingTop: accordionGeometry.triggerPaddingV,
    paddingBottom: accordionGeometry.triggerPaddingV,
    paddingLeft: accordionGeometry.triggerPaddingH,
    paddingRight: accordionGeometry.triggerPaddingH,
    background: "transparent",
  },
  content: {
    paddingTop: accordionGeometry.contentPaddingTop,
    paddingBottom: accordionGeometry.contentPaddingBottom,
    paddingLeft: accordionGeometry.contentPaddingH,
    paddingRight: accordionGeometry.contentPaddingH,
  },
  panelOverflow: {
    overflow: "hidden",
    transition: "max-height 0.28s cubic-bezier(0.4,0,0.2,1)",
  },
  chevron: {
    flexShrink: 0,
    transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
  },
});

registerKeyframes("szr-accordion-kf", ACCORDION_KF);
