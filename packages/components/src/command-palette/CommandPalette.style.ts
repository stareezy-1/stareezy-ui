/**
 * CommandPalette.style.ts — geometry-only style constants.
 * All colors are resolved at render time via useThemedColors() in CommandPalette.tsx.
 */

import { registerClasses } from "../shared/componentSheet";
import type { useThemedColors } from "../shared/useThemedColors";

export const commandPaletteOverlayGeometry = {
  position: "fixed" as const,
  inset: 0,
  zIndex: 1000,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: 80,
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
} as const;

export const commandPaletteContainerGeometry = {
  width: "100%",
  maxWidth: 560,
  borderRadius: 16,
  overflow: "hidden",
} as const;

export const commandPaletteInputGeometry = {
  width: "100%",
  padding: "16px 20px",
  background: "transparent",
  border: "none",
  outline: "none",
  fontSize: 16,
  fontFamily: "Inter, system-ui, sans-serif",
  boxSizing: "border-box" as const,
} as const;

export const commandPaletteListGeometry = {
  maxHeight: 360,
  overflowY: "auto" as const,
  padding: 8,
} as const;

export const commandPaletteItemGeometry = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "10px 12px",
  borderRadius: 8,
  cursor: "pointer",
  transition: "background 0.15s",
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const commandPaletteClasses = registerClasses("cmdpalette", {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 80,
    backdropFilter: "blur(8px)",
  },
  container: {
    width: "100%",
    maxWidth: 560,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
  },
  input: {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: 16,
    fontFamily: "Inter, system-ui, sans-serif",
    boxSizing: "border-box",
    padding: "16px 20px",
  },
  list: {
    maxHeight: 360,
    overflowY: "auto",
    padding: 8,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background 0.15s",
  },
});

// ── Themed style factories ────────────────────────────────────────────────────

export function makeCommandPaletteOverlayStyle(
  themed: ReturnType<typeof useThemedColors>,
) {
  return {
    ...commandPaletteOverlayGeometry,
    backgroundColor: "rgba(5,5,5,0.8)",
  } as const;
}

export function makeCommandPaletteContainerStyle(
  themed: ReturnType<typeof useThemedColors>,
) {
  return {
    ...commandPaletteContainerGeometry,
    backgroundColor: themed.bgSecondary,
    border: `1px solid ${themed.borderDefault}`,
    boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
  } as const;
}

export function makeCommandPaletteInputStyle(
  themed: ReturnType<typeof useThemedColors>,
) {
  return {
    ...commandPaletteInputGeometry,
    borderBottom: `1px solid ${themed.borderDefault}`,
    color: themed.textPrimary,
  } as const;
}
