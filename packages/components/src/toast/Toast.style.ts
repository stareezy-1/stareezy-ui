import { RADIUS, GAP, ELEVATION, INTERACTION } from "../shared/visualSpec";
import type { useThemedColors } from "../shared/useThemedColors";

// ── Base geometry (theme-independent) ────────────────────────────────────────

export const toastBaseGeometry = {
  display: "flex",
  alignItems: "center",
  gap: GAP.md, // 12
  paddingTop: GAP.md, // 12
  paddingBottom: GAP.md, // 12
  paddingLeft: GAP.lg, // 16
  paddingRight: GAP.lg, // 16
  borderRadius: RADIUS.lg, // 10
  minWidth: 280,
  maxWidth: 480,
  position: "relative" as const,
} as const;

// ── Themed style factories ────────────────────────────────────────────────────

export function makeToastBaseStyle(themed: ReturnType<typeof useThemedColors>) {
  return {
    ...toastBaseGeometry,
    border: `1px solid ${themed.borderDefault}`,
    backgroundColor: themed.bgSecondary,
    boxShadow: ELEVATION.lg,
  } as const;
}

export function makeToastVariantStyles(
  themed: ReturnType<typeof useThemedColors>,
) {
  return {
    success: {
      borderColor: themed.borderSuccess,
      iconColor: themed.colorSuccess,
      icon: "✓",
    },
    error: {
      borderColor: themed.borderDanger,
      iconColor: themed.colorDanger,
      icon: "✕",
    },
    warning: {
      borderColor: themed.colorWarning,
      iconColor: themed.colorWarning,
      icon: "⚠",
    },
    info: {
      borderColor: themed.borderPrimaryBrand,
      iconColor: themed.colorInfo,
      icon: "ℹ",
    },
  } as const;
}

export const toastStateOpacity = {
  dismissHover: INTERACTION.hoverOpacity,
} as const;
