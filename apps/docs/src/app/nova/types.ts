export type ThemeMode = "quasar" | "aurora" | "steins-gate";
export type TabId = "style" | "content" | "layers";
export type CodeTab = "code" | "preview" | "export";

export interface ComponentDef {
  type: string;
  label: string;
  icon: string;
  category: string;
  defaultProps: Record<string, string | number | boolean>;
  defaultChildren?: string;
  editableProps?: string[];
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
