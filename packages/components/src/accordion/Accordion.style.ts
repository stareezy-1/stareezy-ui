/**
 * Accordion.style.ts — geometry-only style constants for the Accordion component.
 * All colors are resolved at render time via useThemedColors() in Accordion.tsx.
 */

import { RADIUS, GAP, INTERACTION } from "../shared/visualSpec";

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
