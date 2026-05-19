/**
 * Tabs.style.ts — style constants for the Tabs component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";

export const tabsStyles = {
  underlineBorderColor: `2px solid ${colors.beauBlue[200].value}`,
  pillsBg: colors.beauBlue[100].value,
  cardBg: colors.beauBlue[50].value,
  indicatorColor: colors.celurenBlue[400].value,
  tabColorActive: colors.celurenBlue[500].value,
  tabColorInactive: colors.beauBlue[700].value,
  badgeBgActive: colors.celurenBlue[100].value,
  badgeBgInactive: colors.beauBlue[200].value,
  badgeColorActive: colors.celurenBlue[600].value,
  badgeColorInactive: colors.beauBlue[700].value,
  rnBorderColor: colors.beauBlue[200].value,
  rnIndicatorColor: colors.celurenBlue[400].value,
  rnTabColorActive: colors.celurenBlue[500].value,
  rnTabColorInactive: colors.beauBlue[700].value,
} as const;
