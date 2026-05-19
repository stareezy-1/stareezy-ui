/**
 * Accordion.style.ts — style constants for the Accordion component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";

export const ACCORDION_KF = `
@keyframes szr-accordion-open {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

export const accordionStyles = {
  borderedBorder: `1px solid ${colors.beauBlue[300].value}`,
  borderedBorderRadius: 12,
  separatedBorder: `1px solid ${colors.beauBlue[300].value}`,
  separatedBorderRadius: 10,
  itemBorderBottom: `1px solid ${colors.beauBlue[200].value}`,
  triggerBgOpen: colors.beauBlue[50].value,
  iconColorOpen: colors.celurenBlue[400].value,
  iconColorClosed: colors.beauBlue[600].value,
  titleColorOpen: colors.celurenBlue[500].value,
  titleColorClosed: colors.raisinBlack[800].value,
  contentColor: colors.raisinBlack[600].value,
  rnBorderBottomColor: colors.beauBlue[200].value,
  rnChevronColor: colors.beauBlue[600].value,
} as const;
