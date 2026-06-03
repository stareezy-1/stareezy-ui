/**
 * Input.style.ts — geometry-only style constants for the Input component.
 * All colors are resolved at render time via useThemedColors() in Input.tsx.
 */

import { RADIUS, TYPE_SCALE, GAP, INTERACTION } from "../shared/visualSpec";
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
