/**
 * ProgressPanel.style.ts — geometry-only style constants for ProgressPanel.
 * All colors are resolved at render time via useThemedColors() in ProgressPanel.tsx.
 */

import { RADIUS, GAP, BORDER } from "../shared/visualSpec";
import { registerClasses } from "../shared/componentSheet";
import type { useThemedColors } from "../shared/useThemedColors";

export const progressPanelGeometry = {
  display: "flex",
  flexDirection: "column" as const,
  gap: GAP.sm,
  padding: GAP.lg + 4,
  borderRadius: RADIUS.xl,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const progressPanelClasses = registerClasses("progresspanel", {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: GAP.sm,
    padding: progressPanelGeometry.padding,
    borderRadius: RADIUS.xl,
    borderWidth: BORDER.default,
    borderStyle: "solid",
    boxSizing: "border-box",
  },
  progressBar: {
    display: "flex",
    alignItems: "center",
    gap: GAP.md,
    marginBottom: GAP.sm,
  },
  track: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 2,
    transition: "width 0.3s ease",
  },
  step: {
    display: "flex",
    alignItems: "center",
    gap: GAP.md,
    paddingTop: 6,
    paddingBottom: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    flexShrink: 0,
  },
});

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
