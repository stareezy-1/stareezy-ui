import { aurora, glow } from "@stareezy-ui/tokens";

export const badgeVariantStyles = {
  green: {
    backgroundColor: aurora.auroraGreen.value,
    color: aurora.deepSpace.value,
    boxShadow: glow.green.value,
  },
  amber: {
    backgroundColor: aurora.warningAmber.value,
    color: aurora.deepSpace.value,
    boxShadow: "none",
  },
  red: {
    backgroundColor: aurora.errorRed.value,
    color: aurora.starWhite.value,
    boxShadow: "none",
  },
  purple: {
    backgroundColor: aurora.nebulaPurple.value,
    color: aurora.starWhite.value,
    boxShadow: glow.purple.value,
  },
  default: {
    backgroundColor: aurora.borderSubtle.value,
    color: aurora.textSecondary.value,
    boxShadow: "none",
  },
} as const;

export const badgeBaseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 3,
  paddingBottom: 3,
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: 100,
  flexShrink: 0,
} as const;
