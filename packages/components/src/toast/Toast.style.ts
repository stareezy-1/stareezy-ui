import { aurora } from "@stareezy-ui/tokens";

export const toastBaseStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 16px",
  borderRadius: 10,
  border: `1px solid ${aurora.borderSubtle.value}`,
  backgroundColor: aurora.surfaceDark.value,
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  minWidth: 280,
  maxWidth: 480,
  position: "relative" as const,
} as const;

export const toastVariantStyles = {
  success: {
    borderColor: aurora.auroraGreen.value,
    iconColor: aurora.auroraGreen.value,
    icon: "✓",
  },
  error: {
    borderColor: aurora.errorRed.value,
    iconColor: aurora.errorRed.value,
    icon: "✕",
  },
  warning: {
    borderColor: aurora.warningAmber.value,
    iconColor: aurora.warningAmber.value,
    icon: "⚠",
  },
  info: {
    borderColor: aurora.nebulaPurple.value,
    iconColor: aurora.nebulaPurple.value,
    icon: "ℹ",
  },
} as const;
