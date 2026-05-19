/**
 * Dropdown.style.ts — style constants for the Dropdown component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";
import type { DropdownSize } from "./Dropdown.types";

export const DROPDOWN_KF = `
@keyframes szr-dropdown-in {
  from { opacity: 0; transform: translateY(-6px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
}
@keyframes szr-spin { to { transform: rotate(360deg); } }
`;

export const SIZE_H: Record<DropdownSize, number> = { sm: 34, md: 42, lg: 50 };
export const FONT: Record<DropdownSize, number> = { sm: 13, md: 14, lg: 15 };

export const dropdownStyles = {
  borderColorError: colors.crimsonRed[500].value,
  borderColorOpen: colors.celurenBlue[400].value,
  borderColorDefault: colors.beauBlue[300].value,
  focusRingDefault: `0 0 0 3px ${colors.celurenBlue[25].value}`,
  focusRingError: `0 0 0 3px ${colors.crimsonRed[50].value}`,
  bgDisabled: colors.beauBlue[50].value,
  chevronColor: colors.beauBlue[600].value,
  listBorder: `1.5px solid ${colors.beauBlue[200].value}`,
  searchBorder: `1px solid ${colors.beauBlue[200].value}`,
  searchBorderFocus: colors.celurenBlue[400].value,
  searchBorderBlur: colors.beauBlue[200].value,
  searchTextColor: colors.raisinBlack[800].value,
  searchSeparator: `1px solid ${colors.beauBlue[100].value}`,
  groupHeaderColor: colors.beauBlue[600].value,
  optionBgSelected: colors.celurenBlue[25].value,
  optionBgHover: colors.beauBlue[50].value,
  optionColorSelected: colors.celurenBlue[600].value,
  optionColorDefault: colors.raisinBlack[800].value,
  checkmarkColor: colors.celurenBlue[500].value,
  spinnerTrackColor: colors.beauBlue[200].value,
  spinnerColor: colors.celurenBlue[400].value,
  labelColor: colors.raisinBlack[800].value,
  requiredColor: colors.crimsonRed[500].value,
  errorColor: colors.crimsonRed[500].value,
  rnHandleColor: colors.beauBlue[300].value,
  rnBorderColor: colors.beauBlue[200].value,
  rnBorderColorError: colors.crimsonRed[500].value,
  rnBorderColorDefault: colors.beauBlue[300].value,
  rnTitleColor: colors.raisinBlack[800].value,
  rnSearchBorder: colors.beauBlue[200].value,
  rnSearchText: colors.raisinBlack[800].value,
  rnSearchPlaceholder: colors.beauBlue[600].value,
  rnOptionBgSelected: colors.celurenBlue[25].value,
  rnOptionColorSelected: colors.celurenBlue[600].value,
  rnOptionColorDefault: colors.raisinBlack[800].value,
  rnPlaceholderColor: colors.beauBlue[600].value,
  rnActivityColor: colors.celurenBlue[400].value,
} as const;
