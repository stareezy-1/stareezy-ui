import { aurora, glow } from "@stareezy-ui/tokens";

export const fileDropZoneBaseStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  padding: 40,
  borderRadius: 16,
  border: `2px dashed ${aurora.borderSubtle.value}`,
  backgroundColor: aurora.surfaceDark.value,
  cursor: "pointer",
  transition: "all 0.2s ease",
  textAlign: "center" as const,
  minHeight: 160,
} as const;

export const fileDropZoneStateStyles = {
  idle: {
    borderColor: aurora.borderSubtle.value,
    backgroundColor: aurora.surfaceDark.value,
    boxShadow: "none",
  },
  "drag-over": {
    borderColor: aurora.auroraGreen.value,
    backgroundColor: `${aurora.cosmicGray.value}80`,
    boxShadow: glow.green.value,
  },
  accepted: {
    borderColor: aurora.auroraGreen.value,
    backgroundColor: aurora.surfaceDark.value,
    boxShadow: "none",
  },
  error: {
    borderColor: aurora.errorRed.value,
    backgroundColor: aurora.surfaceDark.value,
    boxShadow: "none",
  },
} as const;
