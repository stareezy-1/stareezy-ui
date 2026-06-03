/**
 * Tag.style.ts — layout and geometry styles for the Tag component.
 *
 * IMPORTANT: No hardcoded color literals here.
 * All colors are injected at render time via useThemedColors() in Tag.tsx.
 */

import {
  RADIUS,
  GAP,
  TYPE_SCALE,
  BORDER,
  INTERACTION,
} from "../shared/visualSpec";
import { ETagVariant } from "./Tag.types";

// Web base tag (no color — injected at render)
export const webTagBase: React.CSSProperties = {
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  gap: GAP.xs, // 4
  paddingTop: GAP.xs - 2, // 2
  paddingBottom: GAP.xs - 2, // 2
  paddingLeft: GAP.sm - 2, // 6
  paddingRight: GAP.sm - 2, // 6
  borderRadius: RADIUS.full, // 9999
  fontSize: TYPE_SCALE.label_sm, // 12
  fontWeight: "500",
  lineHeight: 1.4,
  maxWidth: "100%",
  boxSizing: "border-box",
  userSelect: "none",
  whiteSpace: "nowrap",
};

// Web border styles per variant
export const webVariantBorder: Record<ETagVariant, React.CSSProperties> = {
  [ETagVariant.Solid]: { border: "none" },
  [ETagVariant.Outline]: { borderStyle: "solid", borderWidth: BORDER.default },
  [ETagVariant.Subtle]: { border: "none" },
};

// Web dismiss button base (no color — injected at render)
export const webDismissBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 14,
  height: 14,
  flexShrink: 0,
  border: "none",
  outline: "none",
  cursor: "pointer",
  background: "transparent",
  padding: 0,
  fontSize: 10,
  lineHeight: 1,
  borderRadius: "50%",
  transition: "opacity 0.15s ease",
};

export const webDismissHoverOpacity = INTERACTION.hoverOpacity;

// Native tag base (no color — injected at render)
export const nativeTagBase: Record<string, unknown> = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "flex-start",
  borderRadius: RADIUS.full, // 9999
  paddingVertical: GAP.xs - 2, // 2
  paddingHorizontal: GAP.sm - 2, // 6
};

// Native dismiss button (no color — injected at render)
export const nativeDismissBase: Record<string, unknown> = {
  marginLeft: GAP.xs, // 4
  width: 14,
  height: 14,
  alignItems: "center",
  justifyContent: "center",
};
