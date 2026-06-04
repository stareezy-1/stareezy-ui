/**
 * Input.style.ts — geometry-only style constants for the Input component.
 * All colors are resolved at render time via useThemedColors() in Input.tsx.
 */

import { RADIUS, TYPE_SCALE, GAP, INTERACTION } from "../shared/visualSpec";
import { registerClasses } from "../shared/componentSheet";
import { EInputSize } from "./Input.types";

export const SIZE_PADDING_V: Record<EInputSize, number> = {
  [EInputSize.Sm]: GAP.sm - 1, // 7
  [EInputSize.Md]: GAP.sm + 2, // 10
  [EInputSize.Lg]: GAP.md + 1, // 13
};

export const SIZE_PADDING_H: Record<EInputSize, number> = {
  [EInputSize.Sm]: GAP.sm + 2, // 10
  [EInputSize.Md]: GAP.md, // 12
  [EInputSize.Lg]: GAP.lg, // 16
};

export const SIZE_FONT: Record<EInputSize, number> = {
  [EInputSize.Sm]: TYPE_SCALE.label_sm + 1, // 13
  [EInputSize.Md]: TYPE_SCALE.label_md, // 14
  [EInputSize.Lg]: TYPE_SCALE.label_lg, // 16
};

export const SIZE_BORDER_RADIUS: Record<EInputSize, number> = {
  [EInputSize.Sm]: RADIUS.md, // 8
  [EInputSize.Md]: RADIUS.lg, // 10
  [EInputSize.Lg]: RADIUS.lg, // 10
};

export const inputStateOpacity = {
  disabled: INTERACTION.disabledOpacity,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const inputClasses = registerClasses("input", {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  field: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
    boxSizing: "border-box",
    gap: GAP.sm,
    borderWidth: 1,
    borderStyle: "solid",
  },
  nativeInput: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: "Inter, system-ui, sans-serif",
    lineHeight: "1.5",
  },
});
