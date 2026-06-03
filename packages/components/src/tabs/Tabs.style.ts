/**
 * Tabs.style.ts — geometry-only style constants for the Tabs component.
 * All colors are resolved at render time via useThemedColors() in Tabs.tsx.
 */

import { RADIUS, GAP, INTERACTION } from "../shared/visualSpec";

export const tabsGeometry = {
  pillsBorderRadius: RADIUS.lg, // 10
  pillsItemBorderRadius: RADIUS.md - 1, // 7
  pillsPadding: GAP.xs, // 4
  pillsItemPaddingV: GAP.sm - 1, // 7
  pillsItemPaddingH: GAP.lg, // 16
  cardItemBorderRadius: `${RADIUS.md}px ${RADIUS.md}px 0 0` as const, // "8px 8px 0 0"
  cardItemPaddingV: GAP.sm + 2, // 10
  cardItemPaddingH: GAP.lg + GAP.xs, // 20
  underlineItemPaddingV: GAP.sm + 2, // 10
  underlineItemPaddingH: GAP.lg, // 16
  indicatorHeight: 2,
  indicatorBorderRadius: 2,
  badgeMinWidth: 18,
  badgeHeight: 18,
  badgeBorderRadius: 9,
  badgeFontSize: 10,
  badgePaddingH: 5,
  disabledOpacity: INTERACTION.disabledOpacity,
  hoverOpacity: INTERACTION.hoverOpacity,
} as const;
