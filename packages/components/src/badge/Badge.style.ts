import { RADIUS, GAP, INTERACTION } from "../shared/visualSpec";
import { registerClasses, registerClass } from "../shared/componentSheet";
import type { useThemedColors } from "../shared/useThemedColors";

// ── Geometry (theme-independent) ─────────────────────────────────────────────

export const badgeBaseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: GAP.xs - 1, // 3
  paddingBottom: GAP.xs - 1, // 3
  paddingLeft: GAP.sm + 2, // 10
  paddingRight: GAP.sm + 2, // 10
  borderRadius: RADIUS.full, // 9999
  flexShrink: 0,
} as const;

export const badgeStateOpacity = {
  disabled: INTERACTION.disabledOpacity,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

/** Static class names registered in the shared component stylesheet. */
export const badgeClasses = registerClasses("badge", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: GAP.xs - 1,
    paddingBottom: GAP.xs - 1,
    paddingLeft: GAP.sm + 2,
    paddingRight: GAP.sm + 2,
    borderRadius: RADIUS.full,
    flexShrink: 0,
  },
});

// ── Themed style factory ──────────────────────────────────────────────────────

export function makeBadgeVariantStyles(
  themed: ReturnType<typeof useThemedColors>,
) {
  return {
    green: {
      backgroundColor: themed.colorSuccess,
      color: themed.textInverse,
      boxShadow: themed.glowGreen,
    },
    amber: {
      backgroundColor: themed.colorWarning,
      color: themed.textInverse,
      boxShadow: "none",
    },
    red: {
      backgroundColor: themed.colorDanger,
      color: themed.surface,
      boxShadow: "none",
    },
    purple: {
      backgroundColor: themed.colorInfo,
      color: themed.surface,
      boxShadow: themed.glowPurple,
    },
    default: {
      backgroundColor: themed.borderDefault,
      color: themed.textSecondary,
      boxShadow: "none",
    },
  } as const;
}
