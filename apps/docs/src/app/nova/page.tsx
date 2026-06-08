"use client";

import { useState, useCallback, useRef, useEffect } from "react";

type ThemeMode = "quasar" | "aurora" | "steins-gate";
type TabId = "style" | "content" | "layers";
type CodeTab = "code" | "preview" | "export";

interface ComponentDef {
  type: string;
  label: string;
  icon: string;
  category: string;
  defaultProps: Record<string, string | number | boolean>;
  defaultChildren?: string;
}

interface CanvasNode {
  id: string;
  type: string;
  props: Record<string, string | number | boolean>;
  children: CanvasNode[];
  text?: string;
}

interface HistoryEntry {
  nodes: CanvasNode[];
}

const THEMES: ThemeMode[] = ["quasar", "aurora", "steins-gate"];

const ICONS: Record<string, string> = {
  Box: "▣", Stack: "▤", Grid: "⊞", Button: "▢",
  Input: "⌨", Checkbox: "☑", Switch: "⬡", Slider: "━",
  Table: "⊟", Progress: "▨", CircularProgress: "◎", Badge: "◉", Tag: "◈",
  NavBar: "≡", Tabs: "≣", Breadcrumb: "›", Pagination: "◀▶",
  Modal: "◻", Drawer: "▤", Tooltip: "◊", Dropdown: "▾", CommandPalette: "⌘",
  Avatar: "◒", Skeleton: "▭", Divider: "─", Card: "▢",
  Toast: "◐", Clipboard: "📋", Resizer: "⤡", ProgressPanel: "▦",
  FileDropZone: "📂", IconButton: "◎", HStack: "▤", VStack: "▥",
  Page: "◻",
};

const COMPONENT_DEFS: ComponentDef[] = [
  { type: "Box", label: "Box", icon: "▣", category: "Layout", defaultProps: { p: 16, bg: "var(--color-surface)", borderRadius: 8 } },
  { type: "Stack", label: "Stack", icon: "▤", category: "Layout", defaultProps: { spacing: 8, direction: "vertical" } },
  { type: "HStack", label: "HStack", icon: "▥", category: "Layout", defaultProps: { spacing: 8, direction: "horizontal" } },
  { type: "Grid", label: "Grid", icon: "⊞", category: "Layout", defaultProps: { columns: 2, gap: 12 } },
  { type: "Button", label: "Button", icon: "▢", category: "Buttons", defaultProps: { variant: "primary", color: "#ff6a1a" }, defaultChildren: "Click Me" },
  { type: "IconButton", label: "IconButton", icon: "◎", category: "Buttons", defaultProps: { icon: "★", size: 32 } },
  { type: "Input", label: "Input", icon: "⌨", category: "Inputs", defaultProps: { placeholder: "Type here...", width: 240 }, defaultChildren: "" },
  { type: "Checkbox", label: "Checkbox", icon: "☑", category: "Inputs", defaultProps: { label: "Option", checked: false } },
  { type: "Switch", label: "Switch", icon: "⬡", category: "Inputs", defaultProps: { label: "Toggle", checked: false } },
  { type: "Slider", label: "Slider", icon: "━", category: "Inputs", defaultProps: { min: 0, max: 100, value: 50, width: 200 } },
  { type: "FileDropZone", label: "FileDropZone", icon: "📂", category: "Inputs", defaultProps: { accept: "image/*", maxFiles: 5 } },
  { type: "Table", label: "Table", icon: "⊟", category: "Data", defaultProps: { rows: 3, cols: 3 } },
  { type: "Progress", label: "Progress", icon: "▨", category: "Data", defaultProps: { value: 65, max: 100, width: 240 } },
  { type: "CircularProgress", label: "CircularProgress", icon: "◎", category: "Data", defaultProps: { value: 75, size: 48 } },
  { type: "Badge", label: "Badge", icon: "◉", category: "Data", defaultProps: { text: "New", color: "#ff6a1a" } },
  { type: "Tag", label: "Tag", icon: "◈", category: "Data", defaultProps: { text: "stable", color: "#22c55e" } },
  { type: "NavBar", label: "NavBar", icon: "≡", category: "Navigation", defaultProps: { items: 3, brand: "App" } },
  { type: "Tabs", label: "Tabs", icon: "≣", category: "Navigation", defaultProps: { tabs: 3, active: 0 } },
  { type: "Breadcrumb", label: "Breadcrumb", icon: "›", category: "Navigation", defaultProps: { items: 3 } },
  { type: "Pagination", label: "Pagination", icon: "◀▶", category: "Navigation", defaultProps: { total: 10, current: 1 } },
  { type: "Modal", label: "Modal", icon: "◻", category: "Overlay", defaultProps: { title: "Modal Title", width: 400 }, defaultChildren: "Modal content here" },
  { type: "Drawer", label: "Drawer", icon: "▤", category: "Overlay", defaultProps: { side: "right", width: 320 } },
  { type: "Tooltip", label: "Tooltip", icon: "◊", category: "Overlay", defaultProps: { text: "Tooltip text", position: "top" } },
  { type: "Dropdown", label: "Dropdown", icon: "▾", category: "Overlay", defaultProps: { items: 3, label: "Menu" } },
  { type: "CommandPalette", label: "CommandPalette", icon: "⌘", category: "Overlay", defaultProps: { placeholder: "Search commands..." } },
  { type: "Avatar", label: "Avatar", icon: "◒", category: "Media", defaultProps: { size: 40, initials: "SU" } },
  { type: "Skeleton", label: "Skeleton", icon: "▭", category: "Media", defaultProps: { width: 240, height: 16 } },
  { type: "Divider", label: "Divider", icon: "─", category: "Media", defaultProps: { color: "var(--color-border)" } },
  { type: "Card", label: "Card", icon: "▢", category: "Media", defaultProps: { p: 16, width: 280 } },
  { type: "Toast", label: "Toast", icon: "◐", category: "Feedback", defaultProps: { message: "Operation successful", type: "success" } },
  { type: "Clipboard", label: "Clipboard", icon: "📋", category: "Feedback", defaultProps: { text: "Copy me!" } },
  { type: "Resizer", label: "Resizer", icon: "⤡", category: "Feedback", defaultProps: { defaultWidth: 400, minWidth: 200 } },
  { type: "ProgressPanel", label: "ProgressPanel", icon: "▦", category: "Feedback", defaultProps: { steps: 4, current: 2 } },
];

const CATEGORY_ICONS: Record<string, string> = {
  Layout: "◇", Buttons: "▤", Inputs: "⌨", Data: "⊟",
  Navigation: "≡", Overlay: "◻", Media: "◒", Feedback: "◐",
};

const TOKENS_CATEGORIES: Record<string, Record<string, string>> = {
  Colors: {
    "Primary": "#ff6a1a",
    "Background": "#020205",
    "Surface": "rgba(255,255,255,0.04)",
    "Surface-2": "rgba(255,255,255,0.08)",
    "Text": "#f8f0e8",
    "Text-2": "rgba(248,240,232,0.6)",
    "Border": "rgba(255,106,26,0.15)",
    "Success": "#22c55e",
    "Error": "#dc143c",
    "Warning": "#f59e0b",
  },
  Spacing: {
    "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px",
    "xl": "32px", "2xl": "48px", "3xl": "64px", "4xl": "96px",
  },
  Typography: {
    "H1": "2.5rem", "H2": "2rem", "H3": "1.5rem", "H4": "1.25rem",
    "Body": "1rem", "Small": "0.875rem", "XS": "0.75rem",
    "Weight-Bold": "700", "Weight-Medium": "500", "Weight-Regular": "400",
  },
  Radius: {
    "none": "0", "sm": "4px", "md": "8px", "lg": "12px",
    "xl": "16px", "2xl": "24px", "full": "9999px",
  },
  Shadow: {
    "sm": "0 1px 2px rgba(0,0,0,0.3)",
    "md": "0 4px 12px rgba(0,0,0,0.3)",
    "lg": "0 8px 24px rgba(0,0,0,0.4)",
    "xl": "0 12px 48px rgba(0,0,0,0.5)",
  },
};

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function createNode(type: string, def?: ComponentDef): CanvasNode {
  const found = def || COMPONENT_DEFS.find((c) => c.type === type);
  const d: ComponentDef = (found || COMPONENT_DEFS[0])!;
  return {
    id: generateId(),
    type: d.type,
    props: { ...d.defaultProps },
    children: [],
    text: d.defaultChildren || d.label,
  };
}

function generateCode(nodes: CanvasNode[], indent = 0): string {
  const pad = "  ".repeat(indent);
  return nodes
    .map((node) => {
      const props = Object.entries(node.props)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => `${k}={${typeof v === "string" ? `"${v}"` : v}}`)
        .join(" ");
      const tag = node.type;
      if (node.children.length > 0) {
        return `${pad}<${tag} ${props}>\n${generateCode(node.children, indent + 1)}${pad}</${tag}>`;
      }
      if (node.text) {
        return `${pad}<${tag} ${props}>${node.text}</${tag}>`;
      }
      return `${pad}<${tag} ${props} />`;
    })
    .join("\n");
}

function renderPreview(node: CanvasNode, theme: ThemeMode): JSX.Element {
  const s: React.CSSProperties = {
    background: typeof node.props.bg === "string" ? node.props.bg : undefined,
    padding: typeof node.props.p === "number" ? node.props.p : undefined,
    borderRadius: typeof node.props.borderRadius === "number" ? node.props.borderRadius : undefined,
    display: "flex",
    flexDirection: node.props.direction === "horizontal" ? "row" : "column",
    gap: typeof node.props.spacing === "number" ? node.props.spacing : undefined,
    color: "var(--color-text)",
    fontSize: "0.85rem",
    width: typeof node.props.width === "number" ? node.props.width : undefined,
    height: typeof node.props.height === "number" ? node.props.height : undefined,
    overflow: "hidden",
    border: `1px solid var(--color-border)`,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  };

  const label = (
    <span style={{ fontSize: "0.65rem", opacity: 0.5, pointerEvents: "none" as const }}>
      {node.type}
    </span>
  );

  switch (node.type) {
    case "Page":
      return <div style={{ ...s, minHeight: 400, background: "var(--color-bg)", border: "none" }}>{node.children.length > 0 ? node.children.map((c) => renderPreview(c, theme)) : label}</div>;
    case "Box":
      return <div style={{ ...s, minHeight: 60, background: node.props.bg as string || "var(--color-surface)" }}>{node.children.length > 0 ? node.children.map((c) => renderPreview(c, theme)) : label}</div>;
    case "Stack":
    case "HStack":
    case "VStack":
      return <div style={{ ...s, minHeight: 60, gap: typeof node.props.spacing === "number" ? node.props.spacing : 8, flexDirection: node.props.direction === "horizontal" ? "row" : "column", alignItems: "stretch" }}>{node.children.length > 0 ? node.children.map((c) => renderPreview(c, theme)) : label}</div>;
    case "Grid":
      return <div style={{ ...s, display: "grid", gridTemplateColumns: `repeat(${node.props.columns || 2}, 1fr)`, gap: typeof node.props.gap === "number" ? node.props.gap : 12, minHeight: 80 }}>{node.children.length > 0 ? node.children.map((c) => renderPreview(c, theme)) : label}</div>;
    case "Button":
      return <div style={{ ...s, display: "inline-flex", padding: "8px 20px", borderRadius: 8, background: node.props.color as string || "#ff6a1a", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem", border: node.props.variant === "outline" ? `2px solid ${node.props.color || "#ff6a1a"}` : undefined, background: node.props.variant === "outline" ? "transparent" : node.props.variant === "ghost" ? "transparent" : node.props.color as string || "#ff6a1a" }}>{node.text || "Button"}</div>;
    case "IconButton":
      return <div style={{ ...s, width: typeof node.props.size === "number" ? node.props.size : 32, height: typeof node.props.size === "number" ? node.props.size : 32, borderRadius: "50%", background: "var(--color-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: typeof node.props.size === "number" ? node.props.size * 0.5 : 16 }}>{node.props.icon as string || "★"}</div>;
    case "Input":
      return <div style={{ ...s, padding: "8px 12px", borderRadius: 6, background: "var(--color-surface-2)", border: "1px solid var(--color-border)", color: "var(--color-text-2)", fontSize: "0.85rem", width: typeof node.props.width === "number" ? node.props.width : 240 }}>{node.props.placeholder as string || "Type here..."}</div>;
    case "Checkbox":
      return <div style={{ ...s, flexDirection: "row", gap: 8, alignItems: "center", padding: 4 }}><span style={{ width: 16, height: 16, borderRadius: 3, border: "2px solid var(--brand-primary)", display: "inline-block" }} />{node.props.label as string || "Option"}</div>;
    case "Switch":
      return <div style={{ ...s, flexDirection: "row", gap: 8, alignItems: "center", padding: 4 }}><span style={{ width: 36, height: 18, borderRadius: 9, background: "var(--brand-primary)", display: "inline-block", position: "relative" }}><span style={{ position: "absolute", right: 2, top: 2, width: 14, height: 14, borderRadius: "50%", background: "#fff" }} /></span>{node.props.label as string || "Toggle"}</div>;
    case "Slider":
      return <div style={{ ...s, flexDirection: "column", gap: 4, padding: 4, width: typeof node.props.width === "number" ? node.props.width : 200 }}><div style={{ width: "100%", height: 4, borderRadius: 2, background: "var(--color-surface-2)", position: "relative" }}><div style={{ width: `${node.props.value || 50}%`, height: "100%", borderRadius: 2, background: "var(--brand-primary)" }} /></div></div>;
    case "Progress":
      return <div style={{ ...s, flexDirection: "column", gap: 4, padding: 4, width: typeof node.props.width === "number" ? node.props.width : 240 }}><div style={{ width: "100%", height: 8, borderRadius: 4, background: "var(--color-surface-2)" }}><div style={{ width: `${((node.props.value as number || 0) / (node.props.max as number || 100)) * 100}%`, height: "100%", borderRadius: 4, background: "var(--brand-primary)" }} /></div></div>;
    case "CircularProgress":
      return <div style={{ ...s, width: typeof node.props.size === "number" ? node.props.size : 48, height: typeof node.props.size === "number" ? node.props.size : 48, borderRadius: "50%", border: `3px solid var(--color-surface-2)`, borderTopColor: "var(--brand-primary)", animation: "spin 1s linear infinite" }} />;
    case "Badge":
      return <div style={{ ...s, display: "inline-flex", padding: "2px 8px", borderRadius: 9999, background: (node.props.color as string) || "#ff6a1a", color: "#fff", fontSize: "0.75rem", fontWeight: 600 }}>{node.props.text as string || "Badge"}</div>;
    case "Tag":
      return <div style={{ ...s, display: "inline-flex", padding: "2px 10px", borderRadius: 4, border: `1px solid ${(node.props.color as string) || "#22c55e"}`, color: (node.props.color as string) || "#22c55e", fontSize: "0.75rem" }}>{node.props.text as string || "Tag"}</div>;
    case "Card":
      return <div style={{ ...s, flexDirection: "column", padding: typeof node.props.p === "number" ? node.props.p : 16, borderRadius: 12, background: "var(--color-surface)", border: "1px solid var(--color-border)", width: typeof node.props.width === "number" ? node.props.width : 280, minHeight: 100 }}>{node.children.length > 0 ? node.children.map((c) => renderPreview(c, theme)) : label}</div>;
    case "NavBar":
      return <div style={{ ...s, flexDirection: "row", justifyContent: "space-between", padding: "8px 16px", background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)", minHeight: 48 }}><span style={{ fontWeight: 700 }}>{node.props.brand as string || "App"}</span>{Array.from({ length: node.props.items as number || 3 }).map((_, i) => <span key={i} style={{ fontSize: "0.75rem" }}>Item {i + 1}</span>)}</div>;
    case "Tabs":
      return <div style={{ ...s, flexDirection: "row", gap: 0, borderBottom: "1px solid var(--color-border)", minHeight: 40 }}>{Array.from({ length: node.props.tabs as number || 3 }).map((_, i) => <span key={i} style={{ padding: "8px 16px", borderBottom: i === (node.props.active as number || 0) ? "2px solid var(--brand-primary)" : "2px solid transparent", fontSize: "0.8rem", cursor: "pointer" }}>Tab {i + 1}</span>)}</div>;
    case "Breadcrumb":
      return <div style={{ ...s, flexDirection: "row", gap: 4, alignItems: "center", padding: 4, fontSize: "0.8rem" }}>{Array.from({ length: node.props.items as number || 3 }).map((_, i) => <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>{i > 0 && <span style={{ opacity: 0.4 }}>/</span>}<span style={{ color: i === (node.props.items as number || 3) - 1 ? "var(--color-text)" : "var(--color-text-2)" }}>Item {i + 1}</span></span>)}</div>;
    case "Pagination":
      return <div style={{ ...s, flexDirection: "row", gap: 4, padding: 4 }}>{Array.from({ length: Math.min(node.props.total as number || 10, 5) }).map((_, i) => <span key={i} style={{ width: 28, height: 28, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", background: i + 1 === (node.props.current as number || 1) ? "var(--brand-primary)" : "var(--color-surface)", fontSize: "0.75rem", cursor: "pointer" }}>{i + 1}</span>)}</div>;
    case "Divider":
      return <div style={{ ...s, height: 1, minHeight: 1, background: node.props.color as string || "var(--color-border)", width: "100%" }} />;
    case "Skeleton":
      return <div style={{ ...s, width: typeof node.props.width === "number" ? node.props.width : 240, height: typeof node.props.height === "number" ? node.props.height : 16, borderRadius: 4, background: "var(--color-surface-2)", animation: "pulse 1.5s ease-in-out infinite" }} />;
    case "Avatar":
      return <div style={{ ...s, width: typeof node.props.size === "number" ? node.props.size : 40, height: typeof node.props.size === "number" ? node.props.size : 40, borderRadius: "50%", background: "var(--brand-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: typeof node.props.size === "number" ? node.props.size * 0.35 : 14 }}>{node.props.initials as string || "SU"}</div>;
    case "Modal":
      return <div style={{ ...s, flexDirection: "column", padding: 24, borderRadius: 12, background: "var(--color-surface)", border: "1px solid var(--color-border)", width: typeof node.props.width === "number" ? node.props.width : 400, boxShadow: "0 20px 60px rgba(0,0,0,0.5)", minHeight: 120 }}><span style={{ fontWeight: 700, marginBottom: 8 }}>{node.props.title as string || "Modal"}</span><span style={{ fontSize: "0.8rem", opacity: 0.7 }}>{node.text || "Content"}</span></div>;
    case "Drawer":
      return <div style={{ ...s, flexDirection: "column", padding: 16, background: "var(--color-surface)", borderLeft: "1px solid var(--color-border)", width: typeof node.props.width === "number" ? node.props.width : 320, minHeight: 200, position: "relative" as const }}><span style={{ fontWeight: 700, marginBottom: 16 }}>Drawer</span><span style={{ fontSize: "0.8rem", opacity: 0.7 }}>Side panel content</span></div>;
    case "Tooltip":
      return <div style={{ ...s, display: "inline-flex", position: "relative" as const, padding: "6px 12px", borderRadius: 6, background: "var(--color-surface-2)", border: "1px solid var(--color-border)", fontSize: "0.8rem" }}>{node.props.text as string || "Tooltip"}</div>;
    case "Dropdown":
      return <div style={{ ...s, display: "inline-flex", flexDirection: "column", padding: 0, borderRadius: 6, background: "var(--color-surface)", border: "1px solid var(--color-border)", overflow: "hidden", minWidth: 140 }}><span style={{ padding: "8px 12px", fontWeight: 600, fontSize: "0.8rem" }}>{node.props.label as string || "Menu"}</span>{Array.from({ length: node.props.items as number || 3 }).map((_, i) => <span key={i} style={{ padding: "6px 12px", fontSize: "0.75rem", borderTop: "1px solid var(--color-border)" }}>Item {i + 1}</span>)}</div>;
    case "Toast":
      return <div style={{ ...s, flexDirection: "row", gap: 8, padding: "8px 16px", borderRadius: 8, background: node.props.type === "error" ? "rgba(220,20,60,0.15)" : node.props.type === "warning" ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.15)", border: `1px solid ${node.props.type === "error" ? "#dc143c" : node.props.type === "warning" ? "#f59e0b" : "#22c55e"}`, alignItems: "center" }}><span style={{ fontSize: "0.8rem" }}>{node.props.message as string || "Toast message"}</span></div>;
    case "Clipboard":
      return <div style={{ ...s, flexDirection: "row", gap: 8, padding: "6px 12px", borderRadius: 6, background: "var(--color-surface)", border: "1px solid var(--color-border)", alignItems: "center", cursor: "pointer" }}><span style={{ fontSize: "0.8rem" }}>{node.props.text as string || "Copy me!"}</span><span style={{ fontSize: "0.65rem", opacity: 0.5 }}>📋</span></div>;
    case "FileDropZone":
      return <div style={{ ...s, flexDirection: "column", padding: 24, borderRadius: 8, border: `2px dashed var(--color-border)`, background: "var(--color-surface)", alignItems: "center", justifyContent: "center", minHeight: 100, gap: 8 }}><span style={{ fontSize: "1.5rem" }}>📂</span><span style={{ fontSize: "0.75rem", opacity: 0.6 }}>Drop files here</span></div>;
    case "Resizer":
      return <div style={{ ...s, padding: 12, borderRadius: 6, background: "var(--color-surface)", border: "1px solid var(--color-border)", width: typeof node.props.defaultWidth === "number" ? node.props.defaultWidth : 400, minHeight: 40, position: "relative" as const }}><span style={{ fontSize: "0.75rem", opacity: 0.5 }}>Resizable panel</span><span style={{ position: "absolute", right: 4, bottom: 4, fontSize: "0.7rem", opacity: 0.3 }}>⤡</span></div>;
    case "ProgressPanel":
      return <div style={{ ...s, flexDirection: "row", gap: 4, padding: 8, alignItems: "center" }}>{Array.from({ length: node.props.steps as number || 4 }).map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < (node.props.current as number || 2) ? "var(--brand-primary)" : "var(--color-surface-2)" }} />)}</div>;
    case "CommandPalette":
      return <div style={{ ...s, flexDirection: "column", padding: 8, borderRadius: 8, background: "var(--color-surface)", border: "1px solid var(--color-border)", width: 280, boxShadow: "0 10px 40px rgba(0,0,0,0.4)" }}><span style={{ padding: "6px 8px", borderRadius: 4, background: "var(--color-surface-2)", fontSize: "0.8rem", opacity: 0.6, marginBottom: 4 }}>{node.props.placeholder as string || "Search..."}</span></div>;
    default:
      return <div style={{ ...s, minHeight: 40 }}>{node.type}</div>;
  }
}

export default function NovaPage() {
  const [nodes, setNodes] = useState<CanvasNode[]>([{ id: generateId(), type: "Page", props: {}, children: [], text: "Page" }]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeMode>("quasar");
  const [tab, setTab] = useState<TabId>("style");
  const [codeTab, setCodeTab] = useState<CodeTab>("code");
  const [showCode, setShowCode] = useState(false);
  const [showTokens, setShowTokens] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [copiedToken, setCopiedToken] = useState("");
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragNode = useRef<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nova-nodes");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CanvasNode[];
        setNodes(parsed);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nova-nodes", JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedId && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
          removeNode(selectedId);
          e.preventDefault();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        if (e.shiftKey) { redo(); } else { undo(); }
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const pushHistory = useCallback((newNodes: CanvasNode[]) => {
    setHistory((prev) => {
      const next = prev.slice(0, historyIdx + 1);
      next.push({ nodes: JSON.parse(JSON.stringify(newNodes)) });
      return next;
    });
    setHistoryIdx((prev) => prev + 1);
  }, [historyIdx]);

  const undo = useCallback(() => {
    if (historyIdx < 0) return;
    const entry = history[historyIdx];
    if (!entry) return;
    setHistoryIdx((prev) => prev - 1);
    setNodes(JSON.parse(JSON.stringify(entry.nodes)));
  }, [history, historyIdx]);

  const redo = useCallback(() => {
    if (historyIdx >= history.length - 1) return;
    const entry = history[historyIdx + 1];
    if (!entry) return;
    setHistoryIdx((prev) => prev + 1);
    setNodes(JSON.parse(JSON.stringify(entry.nodes)));
  }, [history, historyIdx]);

  function findNode(nodes: CanvasNode[], id: string): CanvasNode | null {
    for (const n of nodes) {
      if (n.id === id) return n;
      if (n.children.length > 0) {
        const found = findNode(n.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  function getSelectedNode(): CanvasNode | null {
    if (!selectedId) return null;
    return findNode(nodes, selectedId);
  }

  function updateNodeProps(id: string, key: string, value: string | number | boolean) {
    const updater = (ns: CanvasNode[]): CanvasNode[] =>
      ns.map((n) => {
        if (n.id === id) return { ...n, props: { ...n.props, [key]: value } };
        if (n.children.length > 0) return { ...n, children: updater(n.children) };
        return n;
      });
    setNodes((prev) => {
      const next = updater(prev);
      pushHistory(next);
      return next;
    });
  }

  function updateNodeText(id: string, text: string) {
    const updater = (ns: CanvasNode[]): CanvasNode[] =>
      ns.map((n) => {
        if (n.id === id) return { ...n, text };
        if (n.children.length > 0) return { ...n, children: updater(n.children) };
        return n;
      });
    setNodes((prev) => {
      const next = updater(prev);
      pushHistory(next);
      return next;
    });
  }

  function removeNode(id: string) {
    const filterNode = (ns: CanvasNode[]): CanvasNode[] =>
      ns.filter((n) => {
        if (n.id === id) return false;
        if (n.children.length > 0) n.children = filterNode(n.children);
        return true;
      });
    setNodes((prev) => {
      const next = filterNode(prev);
      pushHistory(next);
      return next;
    });
    if (selectedId === id) setSelectedId(null);
  }

  function addNodeToCanvas(type: string) {
    const def = COMPONENT_DEFS.find((c) => c.type === type);
    const node = createNode(type, def);
    const updater = (ns: CanvasNode[]): CanvasNode[] =>
      ns.map((n) => {
        if (n.id === selectedId && (n.type === "Page" || n.type === "Box" || n.type === "Stack" || n.type === "HStack" || n.type === "VStack" || n.type === "Grid")) {
          return { ...n, children: [...n.children, node] };
        }
        if (n.type === "Page" && !selectedId) {
          return { ...n, children: [...n.children, node] };
        }
        if (n.children.length > 0) {
          return { ...n, children: updater(n.children) };
        }
        return n;
      });
    setNodes((prev) => {
      const next = updater(prev);
      pushHistory(next);
      return next;
    });
    setSelectedId(node.id);
  }

  function handleDragStart(e: React.DragEvent, type: string) {
    dragNode.current = type;
    e.dataTransfer.effectAllowed = "copy";
  }

  function handleCanvasDrop(e: React.DragEvent) {
    e.preventDefault();
    if (dragNode.current) {
      addNodeToCanvas(dragNode.current);
      dragNode.current = null;
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  function handleCanvasClick(e: React.MouseEvent) {
    if (e.target === canvasRef.current || (e.target as HTMLElement).closest("[data-nova-canvas]")) {
      setSelectedId(null);
    }
  }

  function reorderChildren(id: string, fromIdx: number, toIdx: number) {
    const updater = (ns: CanvasNode[]): CanvasNode[] =>
      ns.map((n) => {
        if (n.id === id) {
          const kids = [...n.children];
          const [removed] = kids.splice(fromIdx, 1);
          if (removed) kids.splice(toIdx, 0, removed);
          return { ...n, children: kids };
        }
        if (n.children.length > 0) return { ...n, children: updater(n.children) };
        return n;
      });
    setNodes((prev) => {
      const next = updater(prev);
      pushHistory(next);
      return next;
    });
  }

  function handleExport() {
    const pageChildren = nodes[0]?.children ?? [];
    const code = `import { ${pageChildren.map((c) => c.type).filter((t, i, a) => a.indexOf(t) === i).join(", ")} } from "@stareezy-ui/components";\nimport { t } from "@stareezy-ui/tokens";\n\nexport default function NovaDesign() {\n  return (\n${generateCode(pageChildren, 2)}\n  );\n}`;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "NovaDesign.tsx";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleCopyCode() {
    const code = generateCode(nodes[0]?.children || []);
    try {
      await navigator.clipboard.writeText(code);
    } catch { /* fallback */ }
  }

  const selected = getSelectedNode();
  const sel = selected;

  const style: Record<string, React.CSSProperties> = {
    container: {
      display: "flex", height: "calc(100vh - 64px)", background: "var(--color-bg)",
      color: "var(--color-text)", fontFamily: "var(--font-sans)", overflow: "hidden",
    },
    panel: {
      display: "flex", flexDirection: "column", background: "var(--color-bg)",
      borderRight: "1px solid var(--color-border)", overflow: "hidden",
    },
    panelHeader: {
      padding: "10px 14px", fontSize: "0.65rem", fontWeight: 700,
      color: "var(--color-text-2)", textTransform: "uppercase" as const,
      letterSpacing: "0.08em", borderBottom: "1px solid var(--color-border)",
    },
    catHeader: {
      padding: "6px 14px", fontSize: "0.7rem", fontWeight: 600,
      color: "var(--color-text-2)", cursor: "pointer", display: "flex",
      alignItems: "center", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.03)",
      userSelect: "none" as const,
    },
    paletteItem: {
      display: "flex", alignItems: "center", gap: 8, padding: "5px 14px",
      cursor: "grab", fontSize: "0.78rem", transition: "background 0.15s",
      borderRadius: 4, margin: "1px 6px",
    },
    topBar: {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "8px 16px", borderBottom: "1px solid var(--color-border)",
      background: "var(--color-bg)", gap: 12,
    },
    canvasArea: {
      flex: 1, display: "flex", flexDirection: "column" as const,
      overflow: "hidden", position: "relative" as const,
    },
    canvas: {
      flex: 1, margin: 16, borderRadius: 8, overflow: "auto",
      backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 0)",
      backgroundSize: "24px 24px", display: "flex", alignItems: "flex-start",
      justifyContent: "center", padding: 40, minHeight: 500,
    },
    propGroup: {
      padding: "8px 14px", display: "flex", flexDirection: "column" as const,
      gap: 6, borderBottom: "1px solid rgba(255,255,255,0.04)",
    },
    propRow: {
      display: "flex", alignItems: "center", gap: 8, fontSize: "0.75rem",
    },
    propLabel: {
      width: 60, color: "var(--color-text-2)", fontSize: "0.7rem", flexShrink: 0,
    },
    propInput: {
      flex: 1, background: "var(--color-surface-2)", border: "1px solid var(--color-border)",
      borderRadius: 4, padding: "4px 8px", color: "var(--color-text)",
      fontSize: "0.75rem", outline: "none", fontFamily: "var(--font-mono)",
    },
    tabBtn: {
      flex: 1, padding: "8px", fontSize: "0.7rem", fontWeight: 600,
      cursor: "pointer", textAlign: "center" as const, transition: "all 0.15s",
      borderBottom: "2px solid transparent", color: "var(--color-text-2)",
      background: "transparent",
    },
    tabBtnActive: {
      color: "var(--brand-primary)", borderBottomColor: "var(--brand-primary)",
    },
    codePanel: {
      borderTop: "1px solid var(--color-border)", background: "#010103",
      display: "flex", flexDirection: "column" as const, flexShrink: 0,
    },
    codeContent: {
      padding: 16, fontFamily: "var(--font-mono)", fontSize: "0.78rem",
      lineHeight: 1.6, color: "#e2e8f0", overflow: "auto", whiteSpace: "pre-wrap" as const,
      flex: 1,
    },
    statusBar: {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "4px 16px", fontSize: "0.65rem", color: "var(--color-text-2)",
      borderTop: "1px solid var(--color-border)", background: "var(--color-surface)",
    },
    layerItem: {
      display: "flex", alignItems: "center", gap: 8, padding: "6px 14px",
      fontSize: "0.75rem", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.03)",
      transition: "background 0.1s",
    },
    layerItemSelected: {
      background: "rgba(255,106,26,0.1)", borderLeft: "2px solid var(--brand-primary)",
    },
    tokenBtn: {
      display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 8px",
      fontSize: "0.65rem", borderRadius: 4, background: "var(--color-surface-2)",
      border: "1px solid var(--color-border)", cursor: "pointer",
      color: "var(--color-text)", fontFamily: "var(--font-mono)",
    },
    themeBtn: {
      padding: "4px 12px", fontSize: "0.7rem", borderRadius: 4,
      cursor: "pointer", border: "1px solid var(--color-border)",
      background: "var(--color-surface)", color: "var(--color-text)",
    },
    themeBtnActive: {
      borderColor: "var(--brand-primary)", color: "var(--brand-primary)",
      background: "rgba(255,106,26,0.1)",
    },
    emptyCanvas: {
      display: "flex", flexDirection: "column" as const, alignItems: "center",
      justifyContent: "center", gap: 16, padding: 60, color: "var(--color-text-2)",
      opacity: 0.6,
    },
  };

  const categories = [...new Set(COMPONENT_DEFS.map((c) => c.category))];
  const [openCats, setOpenCats] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((c) => [c, true]))
  );

  return (
    <div style={style.container}>
      {/* Palette Panel */}
      <div style={{ ...style.panel, width: 220 }}>
        <div style={style.panelHeader}>Components</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          {categories.map((cat) => (
            <div key={cat}>
              <div style={style.catHeader} onClick={() => setOpenCats((prev) => ({ ...prev, [cat]: !prev[cat] }))}>
                <span>{CATEGORY_ICONS[cat] || "◇"}</span>
                <span>{cat}</span>
                <span style={{ marginLeft: "auto", opacity: 0.4 }}>{openCats[cat] ? "−" : "+"}</span>
              </div>
              {openCats[cat] && COMPONENT_DEFS.filter((c) => c.category === cat).map((def) => (
                <div
                  key={def.type}
                  style={style.paletteItem}
                  draggable
                  onDragStart={(e) => handleDragStart(e, def.type)}
                  onDoubleClick={() => addNodeToCanvas(def.type)}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,106,26,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>{def.icon}</span>
                  <span>{def.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Center: Canvas */}
      <div style={style.canvasArea}>
        {/* Top Bar */}
        <div style={style.topBar}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 800, fontSize: "0.85rem", background: "linear-gradient(135deg, #ff6a1a, #dc143c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>✦ Nova</span>
            <span style={{ fontSize: "0.65rem", opacity: 0.4 }}>Design Builder</span>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {THEMES.map((t) => (
              <button key={t} style={t === theme ? { ...style.themeBtn, ...style.themeBtnActive } : style.themeBtn} onClick={() => setTheme(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
            <button style={style.themeBtn} onClick={() => setShowCode(!showCode)}>{showCode ? "▲ Code" : "▼ Code"}</button>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          style={{ ...style.canvas, transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          onDrop={handleCanvasDrop}
          onDragOver={handleDragOver}
          onClick={handleCanvasClick}
          data-nova-canvas
        >
          <div style={{ width: "100%", maxWidth: 800, minHeight: 500, position: "relative" }}>
            {nodes.map((node) => (
              <div key={node.id} style={{ position: "relative", minHeight: 400, borderRadius: 8 }}>
                {renderNode(node, selectedId, (id) => setSelectedId(id), removeNode, theme, 0)}
              </div>
            ))}
            {nodes.length === 0 && (
              <div style={style.emptyCanvas}>
                <span style={{ fontSize: "2rem", opacity: 0.3 }}>✦</span>
                <span>Drag components here to build your UI</span>
                <span style={{ fontSize: "0.7rem" }}>or double-click items in the palette</span>
              </div>
            )}
          </div>
        </div>

        {/* Code Panel */}
        {showCode && (
          <div style={{ ...style.codePanel, height: 240 }}>
            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {(["code", "preview", "export"] as CodeTab[]).map((t) => (
                <button key={t} style={codeTab === t ? { ...style.tabBtn, ...style.tabBtnActive, background: "transparent" } : style.tabBtn} onClick={() => setCodeTab(t)}>
                  {t === "code" ? "Code" : t === "preview" ? "Preview" : "Export"}
                </button>
              ))}
              <div style={{ marginLeft: "auto", display: "flex", gap: 4, padding: 4 }}>
                <button onClick={handleCopyCode} style={style.tokenBtn}>Copy</button>
                <button onClick={handleExport} style={style.tokenBtn}>Download</button>
              </div>
            </div>
            <div style={{ flex: 1, overflow: "auto" }}>
              {codeTab === "code" && (() => {
                const pageChildren = nodes[0]?.children ?? [];
                return (
                  <div style={style.codeContent}>
                    {`import { ${pageChildren.map((c) => c.type).filter((t, i, a) => a.indexOf(t) === i).join(", ")} } from "@stareezy-ui/components";\nimport { t } from "@stareezy-ui/tokens";\n\nexport default function NovaDesign() {\n  return (\n`}
                    {generateCode(pageChildren, 2)}
                    {"\n  );\n}"}
                  </div>
                );
              })()}
              {codeTab === "preview" && (
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8, alignItems: "center", justifyContent: "center", minHeight: 200 }}>
                  {(nodes[0]?.children ?? []).map((c) => renderPreview(c, theme))}
                </div>
              )}
              {codeTab === "export" && (
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, alignItems: "center", justifyContent: "center", minHeight: 200 }}>
                  <button onClick={handleCopyCode} style={{ ...style.tokenBtn, padding: "8px 24px", fontSize: "0.85rem" }}>📋 Copy Code</button>
                  <button onClick={handleExport} style={{ ...style.tokenBtn, padding: "8px 24px", fontSize: "0.85rem" }}>⬇ Download .tsx</button>
                  <span style={{ fontSize: "0.65rem", opacity: 0.4 }}>Code uses @stareezy-ui/components and @stareezy-ui/tokens</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div style={style.statusBar}>
          <span>{(nodes[0]?.children ?? []).length} items on canvas</span>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={undo} style={{ background: "none", border: "none", color: "var(--color-text-2)", cursor: "pointer", fontSize: "0.65rem", opacity: historyIdx >= 0 ? 1 : 0.3 }}>↩</button>
            <button onClick={redo} style={{ background: "none", border: "none", color: "var(--color-text-2)", cursor: "pointer", fontSize: "0.65rem", opacity: historyIdx < history.length - 1 ? 1 : 0.3 }}>↪</button>
            <button onClick={() => setZoom(Math.max(25, zoom - 25))} style={{ background: "none", border: "none", color: "var(--color-text-2)", cursor: "pointer", fontSize: "0.65rem" }}>−</button>
            <span>{zoom}%</span>
            <button onClick={() => setZoom(Math.min(200, zoom + 25))} style={{ background: "none", border: "none", color: "var(--color-text-2)", cursor: "pointer", fontSize: "0.65rem" }}>+</button>
            <span>Theme: {theme}</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ ...style.panel, width: 260, borderRight: "none", borderLeft: "1px solid var(--color-border)" }}>
        {/* Tabs */}
        <div style={{ display: "flex" }}>
          {(["style", "content", "layers"] as TabId[]).map((t) => (
            <button key={t} style={tab === t ? { ...style.tabBtn, ...style.tabBtnActive } : style.tabBtn} onClick={() => setTab(t)}>
              {t === "style" ? "Style" : t === "content" ? "Content" : "Layers"}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflow: "auto" }}>
          {tab === "style" && (
            <div>
              {sel ? (
                <>
                  <div style={style.propGroup}>
                    <div style={style.propRow}>
                      <span style={style.propLabel}>Type</span>
                      <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", opacity: 0.6 }}>{sel.type}</span>
                    </div>
                  </div>
                  <div style={style.propGroup}>
                    <div style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Layout</div>
                    <div style={style.propRow}>
                      <span style={style.propLabel}>Padding</span>
                      <input style={style.propInput} type="number" value={(sel.props.p as number) || 0} onChange={(e) => updateNodeProps(sel.id, "p", parseInt(e.target.value) || 0)} />
                    </div>
                    <div style={style.propRow}>
                      <span style={style.propLabel}>Border</span>
                      <input style={style.propInput} type="number" value={(sel.props.borderRadius as number) || 0} onChange={(e) => updateNodeProps(sel.id, "borderRadius", parseInt(e.target.value) || 0)} />
                    </div>
                    <div style={style.propRow}>
                      <span style={style.propLabel}>Width</span>
                      <input style={style.propInput} type="number" value={(sel.props.width as number) || ""} placeholder="auto" onChange={(e) => updateNodeProps(sel.id, "width", e.target.value ? parseInt(e.target.value) : 0)} />
                    </div>
                    <div style={style.propRow}>
                      <span style={style.propLabel}>Height</span>
                      <input style={style.propInput} type="number" value={(sel.props.height as number) || ""} placeholder="auto" onChange={(e) => updateNodeProps(sel.id, "height", e.target.value ? parseInt(e.target.value) : 0)} />
                    </div>
                  </div>
                  <div style={style.propGroup}>
                    <div style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Appearance</div>
                    <div style={style.propRow}>
                      <span style={style.propLabel}>Background</span>
                      <input style={style.propInput} value={(sel.props.bg as string) || ""} placeholder="default" onChange={(e) => updateNodeProps(sel.id, "bg", e.target.value)} />
                    </div>
                    <div style={style.propRow}>
                      <span style={style.propLabel}>Color</span>
                      <input style={style.propInput} value={(sel.props.color as string) || ""} placeholder="default" onChange={(e) => updateNodeProps(sel.id, "color", e.target.value)} />
                    </div>
                    {(sel.type === "Stack" || sel.type === "HStack" || sel.type === "VStack") && (
                      <div style={style.propRow}>
                        <span style={style.propLabel}>Spacing</span>
                        <input style={style.propInput} type="number" value={(sel.props.spacing as number) || 8} onChange={(e) => updateNodeProps(sel.id, "spacing", parseInt(e.target.value) || 8)} />
                      </div>
                    )}
                  </div>
                  {/* Token Browser */}
                  <div style={style.propGroup}>
                    <div
                      style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer", display: "flex", justifyContent: "space-between" }}
                      onClick={() => setShowTokens(!showTokens)}
                    >
                      <span>Tokens</span>
                      <span style={{ opacity: 0.4 }}>{showTokens ? "−" : "+"}</span>
                    </div>
                    {showTokens && Object.entries(TOKENS_CATEGORIES).map(([cat, tokens]) => (
                      <div key={cat} style={{ marginBottom: 8 }}>
                        <div style={{ fontSize: "0.6rem", color: "var(--color-text-2)", marginBottom: 4, opacity: 0.6 }}>{cat}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                          {Object.entries(tokens).map(([name, value]) => (
                            <button
                              key={name}
                              style={style.tokenBtn}
                              onClick={() => {
                                updateNodeProps(sel.id, cat === "Colors" ? "color" : cat === "Spacing" ? "p" : cat === "Radius" ? "borderRadius" : "bg", value);
                                setCopiedToken(name);
                                setTimeout(() => setCopiedToken(""), 1500);
                              }}
                            >
                              {copiedToken === name && <span style={{ color: "#22c55e" }}>✓</span>}
                              {name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ padding: 40, textAlign: "center", opacity: 0.4, fontSize: "0.75rem" }}>
                  Select a component to edit its properties
                </div>
              )}
            </div>
          )}

          {tab === "content" && (
            <div>
              {sel ? (
                <div style={style.propGroup}>
                  <div style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Text Content</div>
                  <textarea
                    style={{ ...style.propInput, minHeight: 80, resize: "vertical", fontFamily: "var(--font-sans)" }}
                    value={sel.text || ""}
                    onChange={(e) => updateNodeText(sel.id, e.target.value)}
                    placeholder="Component text..."
                  />
                  {Object.keys(sel.props).filter((k) => ["placeholder", "label", "text", "title", "message", "initials", "brand"].includes(k)).map((k) => (
                    <div key={k} style={style.propRow}>
                      <span style={style.propLabel}>{k}</span>
                      <input style={style.propInput} value={(sel.props[k] as string) || ""} onChange={(e) => updateNodeProps(sel.id, k, e.target.value)} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: 40, textAlign: "center", opacity: 0.4, fontSize: "0.75rem" }}>
                  Select a component to edit its content
                </div>
              )}
            </div>
          )}

          {tab === "layers" && (
            <div>
              {nodes.map((node) => (
                <div key={node.id}>
                  <div
                    style={selectedId === node.id ? { ...style.layerItem, ...style.layerItemSelected } : style.layerItem}
                    onClick={() => setSelectedId(node.id)}
                  >
                    <span style={{ fontSize: "0.65rem", opacity: 0.5 }}>{ICONS[node.type] || "◻"}</span>
                    <span style={{ flex: 1 }}>{node.type}</span>
                    <button
                      style={{ background: "none", border: "none", color: "var(--color-text-2)", cursor: "pointer", fontSize: "0.65rem", opacity: 0.4 }}
                      onClick={(e) => { e.stopPropagation(); removeNode(node.id); }}
                    >
                      ✕
                    </button>
                  </div>
                  {node.children.map((child, idx) => (
                    <div
                      key={child.id}
                      style={selectedId === child.id ? { ...style.layerItem, ...style.layerItemSelected, paddingLeft: 28 } : { ...style.layerItem, paddingLeft: 28 }}
                      onClick={() => setSelectedId(child.id)}
                    >
                      <span style={{ fontSize: "0.65rem", opacity: 0.5 }}>{ICONS[child.type] || "◻"}</span>
                      <span style={{ flex: 1, fontSize: "0.7rem" }}>{child.type}</span>
                      <button
                        style={{ background: "none", border: "none", color: "var(--color-text-2)", cursor: "pointer", fontSize: "0.6rem", opacity: 0.4 }}
                        onClick={(e) => { e.stopPropagation(); removeNode(child.id); }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ))}
              {nodes.length === 0 && (
                <div style={{ padding: 40, textAlign: "center", opacity: 0.4, fontSize: "0.75rem" }}>
                  No components yet
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function renderNode(
  node: CanvasNode,
  selectedId: string | null,
  onSelect: (id: string) => void,
  onRemove: (id: string) => void,
  theme: ThemeMode,
  depth: number
): JSX.Element {
  const isSelected = node.id === selectedId;

  const baseStyle: React.CSSProperties = {
    position: "relative",
    border: isSelected ? "2px solid #ff6a1a" : "2px solid transparent",
    borderRadius: 4,
    transition: "border-color 0.15s",
    cursor: "pointer",
    background: node.type === "Page" ? "var(--color-bg)" : "var(--color-surface)",
    minHeight: node.type === "Page" ? 400 : 40,
    padding: node.type === "Page" ? 16 : undefined,
  };

  if (node.type === "Page") {
    return (
      <div
        style={{ ...baseStyle, minHeight: 400 }}
        onClick={(e) => { e.stopPropagation(); onSelect(node.id); }}
      >
        <div style={{ position: "absolute", top: 2, left: 4, fontSize: "0.55rem", opacity: 0.3, pointerEvents: "none", zIndex: 10 }}>
          {depth > 0 && node.type}
        </div>
        {node.children.length === 0 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", minHeight: 380, opacity: 0.2, fontSize: "0.75rem" }}>
            Drop components here
          </div>
        )}
        {node.children.map((child) => (
          <div key={child.id} style={{ marginBottom: 8 }}>
            {renderNode(child, selectedId, onSelect, onRemove, theme, depth + 1)}
          </div>
        ))}
      </div>
    );
  }

  const renderChild = renderPreview(node, theme);

  return (
    <div
      style={{ ...baseStyle, display: "inline-block", minWidth: 60, minHeight: 32 }}
      onClick={(e) => { e.stopPropagation(); onSelect(node.id); }}
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.style.borderColor = "rgba(255,106,26,0.3)";
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.borderColor = "transparent";
      }}
    >
      <div style={{ position: "absolute", top: -14, left: 2, fontSize: "0.55rem", opacity: 0.4, pointerEvents: "none", zIndex: 10, background: "var(--color-bg)", padding: "0 4px", borderRadius: 2 }}>
        {node.type}
      </div>
      {isSelected && (
        <button
          style={{
            position: "absolute", top: -12, right: -12, width: 20, height: 20,
            borderRadius: "50%", background: "#dc143c", color: "#fff", border: "none",
            cursor: "pointer", fontSize: "0.6rem", display: "flex", alignItems: "center",
            justifyContent: "center", zIndex: 20, lineHeight: 1,
          }}
          onClick={(e) => { e.stopPropagation(); onRemove(node.id); }}
        >
          ✕
        </button>
      )}
      {renderChild}
    </div>
  );
}
