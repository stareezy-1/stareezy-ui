/**
 * Clipboard.style.ts — geometry-only style constants for the Clipboard component.
 * All colors are resolved at render time via useThemedColors() in Clipboard.tsx.
 */

import { RADIUS, GAP, INTERACTION } from "../shared/visualSpec";
import { registerClasses } from "../shared/componentSheet";

export const clipboardGeometry = {
  containerBorderRadius: RADIUS.md, // 8
  containerPaddingV: GAP.sm - 2, // 6
  containerPaddingH: GAP.sm + 2, // 10
  buttonSize: 28,
  buttonBorderRadius: RADIUS.sm, // 6
  hoverOpacity: INTERACTION.hoverOpacity,
  disabledOpacity: INTERACTION.disabledOpacity,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const clipboardClasses = registerClasses("clipboard", {
  container: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    gap: GAP.sm,
    borderRadius: RADIUS.md,
    paddingTop: clipboardGeometry.containerPaddingV,
    paddingBottom: clipboardGeometry.containerPaddingV,
    paddingLeft: clipboardGeometry.containerPaddingH,
    paddingRight: clipboardGeometry.containerPaddingH,
    maxWidth: "100%",
    borderWidth: 1,
    borderStyle: "solid",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: clipboardGeometry.buttonSize,
    height: clipboardGeometry.buttonSize,
    borderRadius: clipboardGeometry.buttonBorderRadius,
    border: "none",
    cursor: "pointer",
    transition: "background 0.15s ease, color 0.15s ease",
    flexShrink: 0,
  },
});
