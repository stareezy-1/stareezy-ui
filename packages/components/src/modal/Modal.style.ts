/**
 * Modal.style.ts — style constants for the Modal component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";
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

export const modalStyles = {
  headerBorderColor: `1px solid ${colors.beauBlue[200].value}`,
  footerBorderColor: `1px solid ${colors.beauBlue[200].value}`,
  titleColor: colors.raisinBlack[800].value,
  closeButtonColor: colors.beauBlue[700].value,
  closeButtonHoverBg: colors.beauBlue[100].value,
  closeButtonHoverColor: colors.raisinBlack[800].value,
  rnBorderColor: colors.beauBlue[200].value,
  rnTitleColor: colors.raisinBlack[800].value,
  rnCloseColor: colors.beauBlue[700].value,
} as const;
