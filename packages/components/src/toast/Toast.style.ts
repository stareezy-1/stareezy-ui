import { RADIUS, GAP, ELEVATION, INTERACTION } from "../shared/visualSpec";
import { registerClasses } from "../shared/componentSheet";
import type { useThemedColors } from "../shared/useThemedColors";

// ── Base geometry (theme-independent) ────────────────────────────────────────

export const toastBaseGeometry = {
  display: "flex",
  alignItems: "center",
  gap: GAP.md,
  paddingTop: GAP.md,
  paddingBottom: GAP.md,
  paddingLeft: GAP.lg,
  paddingRight: GAP.lg,
  borderRadius: RADIUS.lg,
  minWidth: 280,
  maxWidth: 480,
  position: "relative" as const,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const toastClasses = registerClasses("toast", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: GAP.md,
    paddingTop: GAP.md,
    paddingBottom: GAP.md,
    paddingLeft: GAP.lg,
    paddingRight: GAP.lg,
    borderRadius: RADIUS.lg,
    minWidth: 280,
    maxWidth: 480,
    position: "relative",
    borderWidth: 1,
    borderStyle: "solid",
    boxShadow: ELEVATION.lg,
    boxSizing: "border-box",
  },
  dismissBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    padding: 4,
    flexShrink: 0,
    lineHeight: 1,
    transition: "opacity 0.15s ease",
  },
});

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
