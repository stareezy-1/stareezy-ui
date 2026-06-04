/**
 * ProgressPanel.style.ts — geometry-only style constants for ProgressPanel.
 * All colors are resolved at render time via useThemedColors() in ProgressPanel.tsx.
 */

import { RADIUS, GAP, BORDER } from "../shared/visualSpec";
import type { useThemedColors } from "../shared/useThemedColors";

export const progressPanelGeometry = {
  display: "flex",
  flexDirection: "column" as const,
  gap: GAP.sm, // 8
  padding: GAP.lg + 4, // 20
  borderRadius: RADIUS.xl, // 12
} as const;

// ── Themed style factories ────────────────────────────────────────────────────

export function makeProgressPanelContainerStyle(
  themed: ReturnType<typeof useThemedColors>,
) {
  return {
    ...progressPanelGeometry,
    backgroundColor: themed.bgSecondary,
    border: `${BORDER.default}px solid ${themed.borderDefault}`,
  } as const;
}

export function makeProgressStepStatusStyles(
  themed: ReturnType<typeof useThemedColors>,
) {
  return {
    pending: {
      dotColor: themed.borderDefault,
      labelColor: themed.textMuted,
      lineColor: themed.borderDefault,
    },
    active: {
      dotColor: themed.colorSuccess,
      labelColor: themed.textPrimary,
      lineColor: themed.colorSuccess,
    },
    complete: {
      dotColor: themed.colorSuccess,
      labelColor: themed.textSecondary,
      lineColor: themed.colorSuccess,
    },
    error: {
      dotColor: themed.colorDanger,
      labelColor: themed.colorDanger,
      lineColor: themed.colorDanger,
    },
  } as const;
}
