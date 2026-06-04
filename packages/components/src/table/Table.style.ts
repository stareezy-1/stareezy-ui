/**
 * Table.style.ts — layout and geometry styles for the Table component.
 * All colors are injected at render time via useThemedColors() in Table.tsx.
 */

import { RADIUS, GAP, TYPE_SCALE, BORDER } from "../shared/visualSpec";
import { registerClasses } from "../shared/componentSheet";

// Web table container
export const webTableWrapper: React.CSSProperties = {
  overflowX: "auto",
  width: "100%",
  borderRadius: RADIUS.md,
};

// Web <table> base (no color — injected at render)
export const webTable: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "auto",
  fontSize: TYPE_SCALE.label_md,
};

// Web caption
export const webCaption: React.CSSProperties = {
  captionSide: "top",
  textAlign: "left",
  fontSize: TYPE_SCALE.label_sm,
  fontWeight: "600",
  padding: `0 0 ${GAP.sm}px`,
};

// Web table header cell (no color — injected at render)
export const webTh: React.CSSProperties = {
  textAlign: "left",
  fontWeight: "600",
  fontSize: TYPE_SCALE.label_sm,
  padding: `${GAP.sm}px ${GAP.md}px`,
  borderBottomWidth: BORDER.default,
  borderBottomStyle: "solid",
  whiteSpace: "nowrap",
};

// Web table data cell (no color — injected at render)
export const webTd: React.CSSProperties = {
  padding: `${GAP.sm + 2}px ${GAP.md}px`,
  borderBottomWidth: BORDER.default,
  borderBottomStyle: "solid",
  verticalAlign: "middle",
};

// Native
export const nativeScrollWrapper: Record<string, unknown> = { width: "100%" };
export const nativeRow: Record<string, unknown> = {
  flexDirection: "row",
  alignItems: "stretch",
  borderBottomWidth: BORDER.default,
};
export const nativeHeaderRow: Record<string, unknown> = {
  flexDirection: "row",
  alignItems: "stretch",
  borderBottomWidth: BORDER.default,
};
export const nativeTh: Record<string, unknown> = {
  flex: 1,
  padding: GAP.sm,
  fontSize: TYPE_SCALE.label_sm,
  fontWeight: "600",
};
export const nativeTd: Record<string, unknown> = {
  flex: 1,
  padding: GAP.sm,
  fontSize: TYPE_SCALE.label_md,
};

// ── Stylesheet registration ───────────────────────────────────────────────────

export const tableClasses = registerClasses("table", {
  wrapper: {
    overflowX: "auto",
    width: "100%",
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderStyle: "solid",
    boxSizing: "border-box",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "auto",
    fontSize: TYPE_SCALE.label_md,
  },
  th: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: TYPE_SCALE.label_sm,
    padding: `${GAP.sm}px ${GAP.md}px`,
    borderBottomWidth: BORDER.default,
    borderBottomStyle: "solid",
    whiteSpace: "nowrap",
  },
  td: {
    padding: `${GAP.sm + 2}px ${GAP.md}px`,
    borderBottomWidth: BORDER.default,
    borderBottomStyle: "solid",
    verticalAlign: "middle",
  },
});
