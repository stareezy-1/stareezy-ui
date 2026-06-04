/**
 * FileDropZone.style.ts — geometry-only style constants for FileDropZone.
 * All colors are resolved at render time via useThemedColors() in FileDropZone.tsx.
 */

import { RADIUS, GAP, BORDER, INTERACTION } from "../shared/visualSpec";
import type { useThemedColors } from "../shared/useThemedColors";

export const fileDropZoneGeometry = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  gap: GAP.md, // 12
  padding: GAP.xl + GAP.sm, // 32 (approx 40 rounded to nearest gap combo)
  borderRadius: RADIUS.xl, // 12
  cursor: "pointer",
  transition: "all 0.2s ease",
  textAlign: "center" as const,
  minHeight: 160,
} as const;

// ── Themed style factories ────────────────────────────────────────────────────

export function makeFileDropZoneBaseStyle(
  themed: ReturnType<typeof useThemedColors>,
) {
  return {
    ...fileDropZoneGeometry,
    border: `${BORDER.thick}px dashed ${themed.borderDefault}`,
    backgroundColor: themed.bgSecondary,
  } as const;
}

export function makeFileDropZoneStateStyles(
  themed: ReturnType<typeof useThemedColors>,
) {
  return {
    idle: {
      borderColor: themed.borderDefault,
      backgroundColor: themed.bgSecondary,
      boxShadow: "none",
    },
    "drag-over": {
      borderColor: themed.colorSuccess,
      backgroundColor: themed.bgHover,
      boxShadow: themed.glowGreen,
    },
    accepted: {
      borderColor: themed.colorSuccess,
      backgroundColor: themed.bgSecondary,
      boxShadow: "none",
    },
    error: {
      borderColor: themed.colorDanger,
      backgroundColor: themed.bgSecondary,
      boxShadow: "none",
    },
  } as const;
}

export const fileDropZoneStateOpacity = {
  disabled: INTERACTION.disabledOpacity,
} as const;
