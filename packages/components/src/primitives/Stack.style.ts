/**
 * Stack.style.ts — visual styles for HStack and VStack.
 *
 * Enums drive all variant lookups — no inline styles in Stack.tsx.
 * Web uses display:'flex' (not flex:1).
 */

import { spacing } from "@stareezy-ui/tokens";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

/** Alignment shorthand for HStack / VStack cross-axis */
export enum EStackAlign {
  Start = "flex-start",
  Center = "center",
  End = "flex-end",
  Stretch = "stretch",
  Baseline = "baseline",
}

/** Justify shorthand for HStack / VStack main-axis */
export enum EStackJustify {
  Start = "flex-start",
  Center = "center",
  End = "flex-end",
  SpaceBetween = "space-between",
  SpaceAround = "space-around",
  SpaceEvenly = "space-evenly",
}

/** Semantic gap scale */
export enum EStackGap {
  None = "none",
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
  XXL = "xxl",
}

// ---------------------------------------------------------------------------
// Gap values mapped from EStackGap
// ---------------------------------------------------------------------------

export const stackGapValues: Record<EStackGap, number> = {
  [EStackGap.None]: 0,
  [EStackGap.XS]: spacing[4].value,
  [EStackGap.SM]: spacing[8].value,
  [EStackGap.MD]: spacing[12].value,
  [EStackGap.LG]: spacing[16].value,
  [EStackGap.XL]: spacing[24].value,
  [EStackGap.XXL]: spacing[32].value,
};

// ---------------------------------------------------------------------------
// Web base styles
// ---------------------------------------------------------------------------

export const webHStackBase: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
};

export const webVStackBase: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

// ---------------------------------------------------------------------------
// Native base styles
// ---------------------------------------------------------------------------

export const nativeHStackBase: Record<string, unknown> = {
  flexDirection: "row",
};

export const nativeVStackBase: Record<string, unknown> = {
  flexDirection: "column",
};
