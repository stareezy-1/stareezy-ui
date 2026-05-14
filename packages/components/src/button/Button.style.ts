/**
 * Button.style.ts — all visual styles for the Button component.
 *
 * Uses token values from @stareezy-ui/tokens directly.
 * Enums are imported from Button.types.ts to avoid circular dependencies.
 *
 * Web styles use display:'flex' — never flex:1.
 * No inline styles in Button.tsx — import everything from here.
 */

import { colors, spacing, radius, ss } from "@stareezy-ui/tokens";
import { EButtonType, EButtonSize } from "./Button.types";

// ---------------------------------------------------------------------------
// Shared geometry constants
// ---------------------------------------------------------------------------

export const BUTTON_BORDER_RADIUS = radius.full.value;
export const BUTTON_BORDER_WIDTH = spacing[1].value;
export const SPINNER_COLOR_FALLBACK = colors.raisinBlack[300].value;

// ---------------------------------------------------------------------------
// Web base — layout skeleton shared by all button types
// ---------------------------------------------------------------------------

export const webBase: React.CSSProperties = {
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "flex-start",
  boxSizing: "border-box",
  outline: "none",
  border: "none",
  cursor: "pointer",
  transition:
    "opacity 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease",
  userSelect: "none",
  gap: spacing[8].value,
  whiteSpace: "nowrap",
  flexShrink: 0,
  maxHeight: "none",
  minHeight: 0,
  fontFamily: "Inter, system-ui, sans-serif",
  letterSpacing: "0.01em",
  WebkitFontSmoothing: "antialiased",
};

// ---------------------------------------------------------------------------
// Web type geometry — shape/border per EButtonType (no colors here)
// Colors are injected at render time via useButtonColors() in Button.tsx
// ---------------------------------------------------------------------------

export interface WebTypeGeometry {
  borderRadius: number;
  borderWidth?: number;
  borderStyle?: React.CSSProperties["borderStyle"];
}

export const webTypeGeometry: Record<EButtonType, WebTypeGeometry> = {
  [EButtonType.Primary]: {
    borderRadius: BUTTON_BORDER_RADIUS,
  },
  [EButtonType.Secondary]: {
    borderRadius: BUTTON_BORDER_RADIUS,
    borderWidth: BUTTON_BORDER_WIDTH,
    borderStyle: "solid",
  },
  [EButtonType.Tertiary]: {
    borderRadius: BUTTON_BORDER_RADIUS,
  },
  [EButtonType.Link]: {
    borderRadius: 0,
  },
  [EButtonType.WithBorder]: {
    borderRadius: BUTTON_BORDER_RADIUS,
    borderWidth: BUTTON_BORDER_WIDTH,
    borderStyle: "solid",
  },
  [EButtonType.AbsoluteBottom]: {
    borderRadius: BUTTON_BORDER_RADIUS,
  },
  [EButtonType.AbsoluteBottomWithBorder]: {
    borderRadius: BUTTON_BORDER_RADIUS,
  },
  [EButtonType.Transparent]: {
    borderRadius: 0,
  },
  [EButtonType.Ghost]: {
    borderRadius: radius.xl.value,
    borderWidth: BUTTON_BORDER_WIDTH,
    borderStyle: "solid",
  },
  [EButtonType.Outline]: {
    borderRadius: radius.xl.value,
    borderWidth: BUTTON_BORDER_WIDTH,
    borderStyle: "solid",
  },
  [EButtonType.Danger]: {
    borderRadius: radius.xl.value,
    borderWidth: 0,
  },
};

// ---------------------------------------------------------------------------
// Web size presets — padding scale per EButtonSize
// ---------------------------------------------------------------------------

export const webSizePresets: Record<EButtonSize, React.CSSProperties> = {
  [EButtonSize.SM]: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: 13,
    fontWeight: "600",
    minHeight: 32,
  },
  [EButtonSize.MD]: {
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 18,
    paddingRight: 18,
    fontSize: 14,
    fontWeight: "600",
    minHeight: 38,
  },
  [EButtonSize.LG]: {
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 22,
    paddingRight: 22,
    fontSize: 15,
    fontWeight: "600",
    minHeight: 44,
  },
  [EButtonSize.XL]: {
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 28,
    paddingRight: 28,
    fontSize: 16,
    fontWeight: "600",
    minHeight: 50,
  },
  [EButtonSize.XXL]: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 36,
    paddingRight: 36,
    fontSize: 17,
    fontWeight: "600",
    minHeight: 58,
  },
};

/** Default padding when no size is specified — matches LG size */
export const webDefaultPadding: React.CSSProperties = {
  paddingTop: 11,
  paddingBottom: 11,
  paddingLeft: 22,
  paddingRight: 22,
  fontSize: 15,
  fontWeight: "600",
  minHeight: 44,
};

// ---------------------------------------------------------------------------
// Web icon-only size presets
// ---------------------------------------------------------------------------

export const webIconSizePresets: Record<EButtonSize, React.CSSProperties> = {
  [EButtonSize.SM]: { padding: ss.sM.value },
  [EButtonSize.MD]: { padding: ss.mD.value },
  [EButtonSize.LG]: { padding: spacing[10].value },
  [EButtonSize.XL]: { padding: ss.lG.value },
  [EButtonSize.XXL]: { padding: ss.xL.value },
};

export const webIconDefaultPadding: React.CSSProperties = {
  padding: ss.lG.value,
};

// ---------------------------------------------------------------------------
// Web state overrides
// ---------------------------------------------------------------------------

export const webDisabledOverride: React.CSSProperties = {
  opacity: 0.6,
  cursor: "not-allowed",
  pointerEvents: "none",
};

// ---------------------------------------------------------------------------
// Web AbsoluteBottomWithBorder outer wrapper (static geometry only)
// ---------------------------------------------------------------------------

export const webAbsoluteBottomOuter: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  right: 0,
  left: 0,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: spacing.extraMedium.value,
  paddingBottom: spacing.extraMedium.value,
  paddingLeft: spacing.extraMedium.value,
  paddingRight: spacing.extraMedium.value,
  boxSizing: "border-box",
};

// ---------------------------------------------------------------------------
// Web spinner (ActivityIndicator shim)
// ---------------------------------------------------------------------------

export const webSpinner: React.CSSProperties = {
  display: "inline-block",
  width: spacing.large.value,
  height: spacing.large.value,
  borderWidth: 2,
  borderStyle: "solid",
  borderTopColor: "transparent",
  borderRadius: "50%",
  animation: "sz-spin 0.7s linear infinite",
  marginLeft: spacing[8].value,
  flexShrink: 0,
};

// ---------------------------------------------------------------------------
// Native base
// ---------------------------------------------------------------------------

export const nativeBase: Record<string, unknown> = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
};

// ---------------------------------------------------------------------------
// Native size presets
// ---------------------------------------------------------------------------

export const nativeSizePresets: Record<EButtonSize, Record<string, unknown>> = {
  [EButtonSize.SM]: {
    paddingVertical: ss.sM.value,
    paddingHorizontal: ss.lG.value,
  },
  [EButtonSize.MD]: {
    paddingVertical: spacing[8].value,
    paddingHorizontal: ss.xL.value,
  },
  [EButtonSize.LG]: {
    paddingVertical: spacing[10].value,
    paddingHorizontal: ss["2xL"].value,
  },
  [EButtonSize.XL]: {
    paddingVertical: ss.lG.value,
    paddingHorizontal: ss["3xL"].value,
  },
  [EButtonSize.XXL]: {
    paddingVertical: ss.xL.value,
    paddingHorizontal: ss["4xL"].value,
  },
};

export const nativeDefaultPadding: Record<string, unknown> = {
  paddingVertical: spacing[8].value,
  paddingHorizontal: ss.xL.value,
};

// ---------------------------------------------------------------------------
// Native icon-only size presets
// ---------------------------------------------------------------------------

export const nativeIconSizePresets: Record<
  EButtonSize,
  Record<string, unknown>
> = {
  [EButtonSize.SM]: { padding: ss.sM.value },
  [EButtonSize.MD]: { padding: ss.mD.value },
  [EButtonSize.LG]: { padding: spacing[10].value },
  [EButtonSize.XL]: { padding: ss.lG.value },
  [EButtonSize.XXL]: { padding: ss.xL.value },
};

export const nativeIconDefaultPadding: Record<string, unknown> = {
  padding: ss.lG.value,
};

// ---------------------------------------------------------------------------
// Native AbsoluteBottomWithBorder outer wrapper (geometry only)
// ---------------------------------------------------------------------------

export const nativeAbsoluteBottomOuterGeometry: Record<string, unknown> = {
  position: "absolute",
  bottom: 0,
  right: 0,
  left: 0,
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  paddingVertical: spacing.extraMedium.value,
  paddingHorizontal: spacing.extraMedium.value,
};
