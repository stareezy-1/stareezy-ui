/**
 * Box.style.ts — style constants and enums for the Box / View primitives.
 *
 * Box itself is a fully prop-driven component (no preset variants), so this
 * file provides:
 *  - Enums for common prop values (flexDirection, alignItems, etc.)
 *  - Shared web base resets used by higher-level components
 *
 * No inline styles in Box.tsx — consumers import enums from here.
 */

// ---------------------------------------------------------------------------
// Enums — map to valid CSS / RN values
// ---------------------------------------------------------------------------

export enum EFlexDirection {
  Row = "row",
  Column = "column",
  RowReverse = "row-reverse",
  ColumnReverse = "column-reverse",
}

export enum EAlignItems {
  FlexStart = "flex-start",
  FlexEnd = "flex-end",
  Center = "center",
  Stretch = "stretch",
  Baseline = "baseline",
}

export enum EJustifyContent {
  FlexStart = "flex-start",
  FlexEnd = "flex-end",
  Center = "center",
  SpaceBetween = "space-between",
  SpaceAround = "space-around",
  SpaceEvenly = "space-evenly",
}

export enum EAlignSelf {
  Auto = "auto",
  FlexStart = "flex-start",
  FlexEnd = "flex-end",
  Center = "center",
  Stretch = "stretch",
  Baseline = "baseline",
}

export enum EFlexWrap {
  NoWrap = "nowrap",
  Wrap = "wrap",
  WrapReverse = "wrap-reverse",
}

export enum EOverflow {
  Visible = "visible",
  Hidden = "hidden",
  Scroll = "scroll",
  Auto = "auto",
}

export enum EPosition {
  Static = "static",
  Relative = "relative",
  Absolute = "absolute",
  Fixed = "fixed",
  Sticky = "sticky",
}

export enum ECursor {
  Default = "default",
  Pointer = "pointer",
  NotAllowed = "not-allowed",
  Text = "text",
  Grab = "grab",
  Grabbing = "grabbing",
  None = "none",
}

// ---------------------------------------------------------------------------
// Web base reset — applied to all Box renders on web
// Ensures box-sizing is consistent and no browser default margins bleed in.
// ---------------------------------------------------------------------------

export const webBoxReset: React.CSSProperties = {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
};
