export type ThemeMode = "quasar" | "aurora" | "steins-gate" | "light";
export type TabId = "style" | "content" | "layers";
export type CodeTab = "code" | "preview" | "export";

export type PropMetaType =
  | "text"
  | "number"
  | "boolean"
  | "color"
  | "select"
  | "range";

export interface PropMeta {
  key: string;
  label: string;
  type: PropMetaType;
  options?: string[]; // for "select"
  min?: number; // for "number" | "range"
  max?: number;
  step?: number;
  placeholder?: string;
  group?: string; // section heading in the prop panel
}

export interface ComponentDef {
  type: string;
  label: string;
  icon: string;
  category: string;
  defaultProps: Record<string, string | number | boolean>;
  defaultChildren?: string;
  editableProps?: string[];
  propsMeta?: PropMeta[]; // rich metadata — drives the smart prop panel
}

export interface CanvasNode {
  id: string;
  type: string;
  props: Record<string, string | number | boolean>;
  children: CanvasNode[];
  text?: string;
  x: number;
  y: number;
}

export interface HistoryEntry {
  nodes: CanvasNode[];
}

export interface DragState {
  id: string;
  startX: number;
  startY: number;
  origX: number;
  origY: number;
}

export interface ResizeState {
  id: string;
  startX: number;
  startY: number;
  origW: number;
  origH: number;
}

export type StyleKeys = Record<string, React.CSSProperties>;

// ── Session management ────────────────────────────────────────────────────────
export interface NovaSession {
  id: string;
  name: string;
  nodes: CanvasNode[];
  updatedAt: number; // unix ms
}

/** Fixed ID for the root Page node — never changes, never random */
export const PAGE_ROOT_ID = "page-root";

export const SESSIONS_STORAGE_KEY = "nova-sessions";
export const ACTIVE_SESSION_KEY = "nova-active-session";
