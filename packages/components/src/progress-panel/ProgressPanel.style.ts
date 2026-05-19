import { aurora } from "@stareezy-ui/tokens";

export const progressPanelContainerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 8,
  padding: 20,
  backgroundColor: aurora.surfaceDark.value,
  border: `1px solid ${aurora.borderSubtle.value}`,
  borderRadius: 12,
} as const;

export const progressStepStatusStyles = {
  pending: {
    dotColor: aurora.borderSubtle.value,
    labelColor: aurora.textMuted.value,
    lineColor: aurora.borderSubtle.value,
  },
  active: {
    dotColor: aurora.auroraGreen.value,
    labelColor: aurora.starWhite.value,
    lineColor: aurora.auroraGreen.value,
  },
  complete: {
    dotColor: aurora.auroraGreen.value,
    labelColor: aurora.textSecondary.value,
    lineColor: aurora.auroraGreen.value,
  },
  error: {
    dotColor: aurora.errorRed.value,
    labelColor: aurora.errorRed.value,
    lineColor: aurora.errorRed.value,
  },
} as const;
