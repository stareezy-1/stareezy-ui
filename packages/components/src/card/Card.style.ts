import { aurora, glow } from "@stareezy-ui/tokens";

export const cardVariantStyles = {
  border: {
    backgroundColor: aurora.surfaceDark.value,
    border: `1px solid ${aurora.borderSubtle.value}`,
    boxShadow: "none",
  },
  shadow: {
    backgroundColor: aurora.surfaceDark.value,
    border: `1px solid ${aurora.borderSubtle.value}`,
    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
  },
  glow: {
    backgroundColor: aurora.surfaceDark.value,
    border: `1px solid ${aurora.borderSubtle.value}`,
    boxShadow: glow.green.value,
  },
} as const;

export const cardGlowColorStyles = {
  green: { boxShadow: glow.green.value },
  purple: { boxShadow: glow.purple.value },
} as const;

export const cardBaseStyle = {
  borderRadius: 16,
  padding: 24,
  display: "flex",
  flexDirection: "column" as const,
  gap: 12,
} as const;
