import { aurora } from "@stareezy-ui/tokens";

export const navBarBaseStyle = {
  position: "sticky" as const,
  top: 0,
  zIndex: 200,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 24px",
  height: 60,
  backgroundColor: `${aurora.deepSpace.value}cc`,
  borderBottom: `1px solid ${aurora.borderSubtle.value}`,
  transition: "backdrop-filter 0.3s ease, border-color 0.3s ease",
} as const;

export const navBarScrolledStyle = {
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderBottomColor: `${aurora.borderSubtle.value}`,
} as const;

export const navBarDefaultStyle = {
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
} as const;

export const navBarLogoStyle = {
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
} as const;

export const navBarLinksStyle = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  flex: 1,
  paddingLeft: 24,
} as const;

export const navBarActionsStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginLeft: "auto",
} as const;
