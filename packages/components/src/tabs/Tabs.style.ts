/**
 * Tabs.style.ts — geometry-only style constants for the Tabs component.
 * All colors are resolved at render time via useThemedColors() in Tabs.tsx.
 */

import { RADIUS, GAP, INTERACTION } from "../shared/visualSpec";
import { registerClasses } from "../shared/componentSheet";

export const tabsGeometry = {
  pillsBorderRadius: RADIUS.lg, // 10
  pillsItemBorderRadius: RADIUS.md - 1, // 7
  pillsPadding: GAP.xs, // 4
  pillsItemPaddingV: GAP.sm - 1, // 7
  pillsItemPaddingH: GAP.lg, // 16
  cardItemBorderRadius: `${RADIUS.md}px ${RADIUS.md}px 0 0` as const,
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

// ── Stylesheet registration ───────────────────────────────────────────────────

export const tabsClasses = registerClasses("tabs", {
  tabBar: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  tabBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    border: "none",
    cursor: "pointer",
    transition: "background 0.15s ease, color 0.15s ease",
    position: "relative",
    whiteSpace: "nowrap",
  },
  indicator: {
    position: "absolute",
    bottom: -2,
    height: tabsGeometry.indicatorHeight,
    borderRadius: tabsGeometry.indicatorBorderRadius,
    transition:
      "left 0.22s cubic-bezier(0.4,0,0.2,1), width 0.22s cubic-bezier(0.4,0,0.2,1)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: tabsGeometry.badgeMinWidth,
    height: tabsGeometry.badgeHeight,
    borderRadius: tabsGeometry.badgeBorderRadius,
    fontSize: tabsGeometry.badgeFontSize,
    fontWeight: "700",
  },
  panel: {
    paddingTop: GAP.lg,
  },
});
