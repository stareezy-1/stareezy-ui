import { aurora } from "@stareezy-ui/tokens";

export const commandPaletteOverlayStyle = {
  position: "fixed" as const,
  inset: 0,
  zIndex: 1000,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: 80,
  backgroundColor: "rgba(5,5,5,0.8)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
} as const;

export const commandPaletteContainerStyle = {
  width: "100%",
  maxWidth: 560,
  backgroundColor: aurora.surfaceDark.value,
  border: `1px solid ${aurora.borderSubtle.value}`,
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
} as const;

export const commandPaletteInputStyle = {
  width: "100%",
  padding: "16px 20px",
  background: "transparent",
  border: "none",
  borderBottom: `1px solid ${aurora.borderSubtle.value}`,
  outline: "none",
  color: aurora.starWhite.value,
  fontSize: 16,
  fontFamily: "Inter, system-ui, sans-serif",
  boxSizing: "border-box" as const,
} as const;

export const commandPaletteListStyle = {
  maxHeight: 360,
  overflowY: "auto" as const,
  padding: 8,
} as const;

export const commandPaletteItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "10px 12px",
  borderRadius: 8,
  cursor: "pointer",
  transition: "background 0.15s",
} as const;
