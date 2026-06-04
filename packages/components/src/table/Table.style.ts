/**
 * Table.style.ts — layout and geometry styles for the Table component.
 *
 * IMPORTANT: No hardcoded color literals here.
 * All colors are injected at render time via useThemedColors() in Table.tsx.
 */

import { RADIUS, GAP, TYPE_SCALE, BORDER } from "../shared/visualSpec";

// Web table container
export const webTableWrapper: React.CSSProperties = {
  overflowX: "auto",
  width: "100%",
  borderRadius: RADIUS.md, // 8
};

// Web <table> base (no color — injected at render)
export const webTable: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "auto",
  fontSize: TYPE_SCALE.label_md, // 14
};

// Web caption
export const webCaption: React.CSSProperties = {
  captionSide: "top",
  textAlign: "left",
  fontSize: TYPE_SCALE.label_sm, // 12 — was 13, closest spec value
  fontWeight: "600",
  padding: `0 0 ${GAP.sm}px`, // 8
};

// Web table header cell (no color — injected at render)
export const webTh: React.CSSProperties = {
  textAlign: "left",
  fontWeight: "600",
  fontSize: TYPE_SCALE.label_sm, // 12 — was 13
  padding: `${GAP.sm}px ${GAP.md}px`, // 8px 12px
  borderBottomWidth: BORDER.default,
  borderBottomStyle: "solid",
  whiteSpace: "nowrap",
};

// Web table data cell (no color — injected at render)
export const webTd: React.CSSProperties = {
  padding: `${GAP.sm + 2}px ${GAP.md}px`, // 10px 12px
  borderBottomWidth: BORDER.default,
  borderBottomStyle: "solid",
  verticalAlign: "middle",
};

// Native scroll view wrapper
export const nativeScrollWrapper: Record<string, unknown> = {
  width: "100%",
};

// Native row (no color — injected at render)
export const nativeRow: Record<string, unknown> = {
  flexDirection: "row",
  alignItems: "stretch",
  borderBottomWidth: BORDER.default,
};

// Native header row (no color — injected at render)
export const nativeHeaderRow: Record<string, unknown> = {
  flexDirection: "row",
  alignItems: "stretch",
  borderBottomWidth: BORDER.default,
};

// Native header cell (no color — injected at render)
export const nativeTh: Record<string, unknown> = {
  flex: 1,
  padding: GAP.sm, // 8
  fontSize: TYPE_SCALE.label_sm, // 12
  fontWeight: "600",
};

// Native data cell (no color — injected at render)
export const nativeTd: Record<string, unknown> = {
  flex: 1,
  padding: GAP.sm, // 8
  fontSize: TYPE_SCALE.label_md, // 14
};
