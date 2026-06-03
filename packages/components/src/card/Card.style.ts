import { radius, spacing } from "@stareezy-ui/tokens";
import { ELEVATION, RADIUS, GAP } from "../shared/visualSpec";
import type { useThemedColors } from "../shared/useThemedColors";

// ── Base geometry (theme-independent) ────────────────────────────────────────

export const cardBaseStyle = {
  borderRadius: RADIUS.xl, // 12 — spec xl
  padding: GAP.md, // 12
  display: "flex",
  flexDirection: "column" as const,
  gap: GAP.md, // 12
} as const;

// ── Themed style factories ────────────────────────────────────────────────────

export function makeCardVariantStyles(
  themed: ReturnType<typeof useThemedColors>,
) {
  return {
    border: {
      backgroundColor: themed.bgSecondary,
      border: `1px solid ${themed.borderDefault}`,
      boxShadow: ELEVATION.none,
    },
    shadow: {
      backgroundColor: themed.bgSecondary,
      border: `1px solid ${themed.borderDefault}`,
      boxShadow: ELEVATION.lg,
    },
    glow: {
      backgroundColor: themed.bgSecondary,
      border: `1px solid ${themed.borderDefault}`,
      boxShadow: themed.glowGreen,
    },
  } as const;
}

export function makeCardGlowColorStyles(
  themed: ReturnType<typeof useThemedColors>,
) {
  return {
    green: { boxShadow: themed.glowGreen },
    purple: { boxShadow: themed.glowPurple },
  } as const;
}
