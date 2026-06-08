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
  editableProps?: string[];
}

interface CanvasNode {
  id: string;
  type: string;
  props: Record<string, string | number | boolean>;
  children: CanvasNode[];
  text?: string;
  x: number;
  y: number;
}

interface HistoryEntry {
  nodes: CanvasNode[];
}

const THEMES: ThemeMode[] = ["quasar", "aurora", "steins-gate"];

const ICONS: Record<string, string> = {
  Box: "▣",
  Stack: "▤",
  Grid: "⊞",
  Button: "▢",
  Input: "⌨",
  Checkbox: "☑",
  Switch: "⬡",
  Slider: "━",
  Table: "⊟",
  Progress: "▨",
  CircularProgress: "◎",
  Badge: "◉",
  Tag: "◈",
  NavBar: "≡",
  Tabs: "≣",
  Breadcrumb: "›",
  Pagination: "◀▶",
  Modal: "◻",
  Drawer: "▤",
  Tooltip: "◊",
  Dropdown: "▾",
  CommandPalette: "⌘",
  Avatar: "◒",
  Skeleton: "▭",
  Divider: "─",
  Card: "▢",
  Toast: "◐",
  Clipboard: "📋",
  Resizer: "⤡",
  ProgressPanel: "▦",
  FileDropZone: "📂",
  IconButton: "◎",
  HStack: "▤",
  VStack: "▥",
  Page: "◻",
};

const ALL_EDITABLE_PROPS = [
  "placeholder", "label", "text", "title", "message", "initials", "brand",
  "icon", "items", "tabs", "active", "total", "current", "steps", "value",
  "max", "min", "variant", "type", "accept", "maxFiles", "rows", "cols",
  "position", "side", "defaultWidth", "minWidth", "size", "columns", "gap",
  "direction", "checked",
];

const COMPONENT_DEFS: ComponentDef[] = [
  { type: "Box", label: "Box", icon: "▣", category: "Layout", defaultProps: { p: 16, bg: "var(--color-surface)", borderRadius: 8 }, editableProps: ["bg"] },
  { type: "Stack", label: "Stack", icon: "▤", category: "Layout", defaultProps: { spacing: 8, direction: "vertical" }, editableProps: ["spacing", "direction"] },
  { type: "HStack", label: "HStack", icon: "▥", category: "Layout", defaultProps: { spacing: 8, direction: "horizontal" }, editableProps: ["spacing"] },
  { type: "Grid", label: "Grid", icon: "⊞", category: "Layout", defaultProps: { columns: 2, gap: 12 }, editableProps: ["columns", "gap"] },
  { type: "Button", label: "Button", icon: "▢", category: "Buttons", defaultProps: { variant: "primary", color: "#ff6a1a" }, defaultChildren: "Click Me", editableProps: ["variant", "color"] },
  { type: "IconButton", label: "IconButton", icon: "◎", category: "Buttons", defaultProps: { icon: "★", size: 32 }, editableProps: ["icon", "size"] },
  { type: "Input", label: "Input", icon: "⌨", category: "Inputs", defaultProps: { placeholder: "Type here...", width: 240 }, editableProps: ["placeholder", "width"] },
  { type: "Checkbox", label: "Checkbox", icon: "☑", category: "Inputs", defaultProps: { label: "Option", checked: false }, editableProps: ["label", "checked"] },
  { type: "Switch", label: "Switch", icon: "⬡", category: "Inputs", defaultProps: { label: "Toggle", checked: false }, editableProps: ["label", "checked"] },
  { type: "Slider", label: "Slider", icon: "━", category: "Inputs", defaultProps: { min: 0, max: 100, value: 50, width: 200 }, editableProps: ["min", "max", "value", "width"] },
  { type: "FileDropZone", label: "FileDropZone", icon: "📂", category: "Inputs", defaultProps: { accept: "image/*", maxFiles: 5 }, editableProps: ["accept", "maxFiles"] },
  { type: "Table", label: "Table", icon: "⊟", category: "Data", defaultProps: { rows: 3, cols: 3 }, editableProps: ["rows", "cols"] },
  { type: "Progress", label: "Progress", icon: "▨", category: "Data", defaultProps: { value: 65, max: 100, width: 240 }, editableProps: ["value", "max", "width"] },
  { type: "CircularProgress", label: "CircularProgress", icon: "◎", category: "Data", defaultProps: { value: 75, size: 48 }, editableProps: ["value", "size"] },
  { type: "Badge", label: "Badge", icon: "◉", category: "Data", defaultProps: { text: "New", color: "#ff6a1a" }, editableProps: ["text", "color"] },
  { type: "Tag", label: "Tag", icon: "◈", category: "Data", defaultProps: { text: "stable", color: "#22c55e" }, editableProps: ["text", "color"] },
  { type: "NavBar", label: "NavBar", icon: "≡", category: "Navigation", defaultProps: { items: 3, brand: "App" }, editableProps: ["items", "brand"] },
  { type: "Tabs", label: "Tabs", icon: "≣", category: "Navigation", defaultProps: { tabs: 3, active: 0 }, editableProps: ["tabs", "active"] },
  { type: "Breadcrumb", label: "Breadcrumb", icon: "›", category: "Navigation", defaultProps: { items: 3 }, editableProps: ["items"] },
  { type: "Pagination", label: "Pagination", icon: "◀▶", category: "Navigation", defaultProps: { total: 10, current: 1 }, editableProps: ["total", "current"] },
  { type: "Modal", label: "Modal", icon: "◻", category: "Overlay", defaultProps: { title: "Modal Title", width: 400 }, defaultChildren: "Modal content here", editableProps: ["title", "width"] },
  { type: "Drawer", label: "Drawer", icon: "▤", category: "Overlay", defaultProps: { side: "right", width: 320 }, editableProps: ["side", "width"] },
  { type: "Tooltip", label: "Tooltip", icon: "◊", category: "Overlay", defaultProps: { text: "Tooltip text", position: "top" }, editableProps: ["text", "position"] },
  { type: "Dropdown", label: "Dropdown", icon: "▾", category: "Overlay", defaultProps: { items: 3, label: "Menu" }, editableProps: ["items", "label"] },
  { type: "CommandPalette", label: "CommandPalette", icon: "⌘", category: "Overlay", defaultProps: { placeholder: "Search commands..." }, editableProps: ["placeholder"] },
  { type: "Avatar", label: "Avatar", icon: "◒", category: "Media", defaultProps: { size: 40, initials: "SU" }, editableProps: ["size", "initials"] },
  { type: "Skeleton", label: "Skeleton", icon: "▭", category: "Media", defaultProps: { width: 240, height: 16 }, editableProps: ["width", "height"] },
  { type: "Divider", label: "Divider", icon: "─", category: "Media", defaultProps: { color: "var(--color-border)" }, editableProps: ["color"] },
  { type: "Card", label: "Card", icon: "▢", category: "Media", defaultProps: { p: 16, width: 280 }, editableProps: ["p", "width"] },
  { type: "Toast", label: "Toast", icon: "◐", category: "Feedback", defaultProps: { message: "Operation successful", type: "success" }, editableProps: ["message", "type"] },
  { type: "Clipboard", label: "Clipboard", icon: "📋", category: "Feedback", defaultProps: { text: "Copy me!" }, editableProps: ["text"] },
  { type: "Resizer", label: "Resizer", icon: "⤡", category: "Feedback", defaultProps: { defaultWidth: 400, minWidth: 200 }, editableProps: ["defaultWidth", "minWidth"] },
  { type: "ProgressPanel", label: "ProgressPanel", icon: "▦", category: "Feedback", defaultProps: { steps: 4, current: 2 }, editableProps: ["steps", "current"] },
];

const CATEGORY_ICONS: Record<string, string> = {
  Layout: "◇",
  Buttons: "▤",
  Inputs: "⌨",
  Data: "⊟",
  Navigation: "≡",
  Overlay: "◻",
  Media: "◒",
  Feedback: "◐",
};

const TOKENS_CATEGORIES: Record<string, Record<string, string>> = {
  Colors: {
    "Primary": "#ff6a1a", "Background": "#020205",
    "Surface": "rgba(255,255,255,0.04)", "Surface-2": "rgba(255,255,255,0.08)",
    "Text": "#f8f0e8", "Text-2": "rgba(248,240,232,0.6)",
    "Border": "rgba(255,106,26,0.15)", "Success": "#22c55e",
    "Error": "#dc143c", "Warning": "#f59e0b",
  },
  Spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
    "4xl": "96px",
  },
  Typography: {
    H1: "2.5rem",
    H2: "2rem",
    H3: "1.5rem",
    H4: "1.25rem",
    Body: "1rem",
    Small: "0.875rem",
    XS: "0.75rem",
    "Weight-Bold": "700",
    "Weight-Medium": "500",
    "Weight-Regular": "400",
  },
  Radius: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    full: "9999px",
  },
  Shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.3)",
    md: "0 4px 12px rgba(0,0,0,0.3)",
    lg: "0 8px 24px rgba(0,0,0,0.4)",
    xl: "0 12px 48px rgba(0,0,0,0.5)",
  },
};

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function createNode(type: string, def?: ComponentDef, dropX = 40, dropY = 40): CanvasNode {
  const found = def || COMPONENT_DEFS.find((c) => c.type === type);
  const d: ComponentDef = (found || COMPONENT_DEFS[0])!;
  return {
    id: generateId(),
    type: d.type,
    props: { ...d.defaultProps },
    children: [],
    text: d.defaultChildren || d.label,
    x: dropX,
    y: dropY,
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
        return `${pad}<${tag} ${props}>\n${generateCode(
          node.children,
          indent + 1,
        )}${pad}</${tag}>`;
      }
      if (node.text) {
        return `${pad}<${tag} ${props}>${node.text}</${tag}>`;
      }
      return `${pad}<${tag} ${props} />`;
    })
    .join("\n");
}

function renderPreview(node: CanvasNode): JSX.Element {
  const s: React.CSSProperties = {
    background: typeof node.props.bg === "string" ? node.props.bg : undefined,
    padding: typeof node.props.p === "number" ? node.props.p : undefined,
    borderRadius:
      typeof node.props.borderRadius === "number"
        ? node.props.borderRadius
        : undefined,
    display: "flex",
    flexDirection: node.props.direction === "horizontal" ? "row" : "column",
    gap:
      typeof node.props.spacing === "number" ? node.props.spacing : undefined,
    color: "var(--color-text)",
    fontSize: "0.85rem",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    border: `1px solid var(--color-border)`,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap" as const,
    boxSizing: "border-box" as const,
  };

  const label = (
    <span
      style={{
        fontSize: "0.65rem",
        opacity: 0.5,
        pointerEvents: "none" as const,
      }}
    >
      {node.type}
    </span>
  );

  switch (node.type) {
    case "Page":
      return <div style={{ ...s, minHeight: "100%", background: "var(--color-bg)", border: "none" }}>{node.children.length > 0 ? node.children.map((c) => renderPreview(c)) : label}</div>;
    case "Box":
      return <div style={{ ...s, minHeight: 40, background: (node.props.bg as string) || "var(--color-surface)" }}>{node.children.length > 0 ? node.children.map((c) => renderPreview(c)) : label}</div>;
    case "Stack":
    case "HStack":
    case "VStack":
      return <div style={{ ...s, minHeight: 40, gap: typeof node.props.spacing === "number" ? node.props.spacing : 8, flexDirection: node.props.direction === "horizontal" ? "row" : "column" }}>{node.children.length > 0 ? node.children.map((c) => renderPreview(c)) : label}</div>;
    case "Grid":
      return <div style={{ ...s, display: "grid", gridTemplateColumns: `repeat(${node.props.columns || 2}, 1fr)`, gap: typeof node.props.gap === "number" ? node.props.gap : 12, minHeight: 60 }}>{node.children.length > 0 ? node.children.map((c) => renderPreview(c)) : label}</div>;
    case "Button":
      return <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "8px 20px", borderRadius: (node.props.borderRadius as number) || 8, background: node.props.variant === "outline" ? "transparent" : node.props.variant === "ghost" ? "transparent" : (node.props.color as string) || "#ff6a1a", color: node.props.variant === "outline" ? (node.props.color as string) || "#ff6a1a" : "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem", border: node.props.variant === "outline" ? `2px solid ${(node.props.color as string) || "#ff6a1a"}` : undefined, width: "100%", height: "100%", boxSizing: "border-box" as const }}>{node.text || "Button"}</div>;
    case "IconButton":
      return <div style={{ width: typeof node.props.size === "number" ? node.props.size : 32, height: typeof node.props.size === "number" ? node.props.size : 32, borderRadius: "50%", background: "var(--color-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: typeof node.props.size === "number" ? node.props.size * 0.5 : 16, margin: "auto" }}>{(node.props.icon as string) || "★"}</div>;
    case "Input":
      return <div style={{ padding: "8px 12px", borderRadius: 6, background: "var(--color-surface-2)", border: "1px solid var(--color-border)", color: "var(--color-text-2)", fontSize: "0.85rem", width: "100%", height: "100%", boxSizing: "border-box" as const, display: "flex", alignItems: "center" }}>{(node.props.placeholder as string) || "Type here..."}</div>;
    case "Checkbox":
      return <div style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", padding: 4, width: "100%", height: "100%", boxSizing: "border-box" as const }}><span style={{ width: 16, height: 16, borderRadius: 3, border: "2px solid var(--brand-primary)", display: "inline-block", flexShrink: 0 }} />{node.props.label as string || "Option"}</div>;
    case "Switch":
      return <div style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", padding: 4, width: "100%", height: "100%", boxSizing: "border-box" as const }}><span style={{ width: 36, height: 18, borderRadius: 9, background: "var(--brand-primary)", display: "inline-block", position: "relative", flexShrink: 0 }}><span style={{ position: "absolute", right: 2, top: 2, width: 14, height: 14, borderRadius: "50%", background: "#fff" }} /></span>{node.props.label as string || "Toggle"}</div>;
    case "Slider":
      return <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: 4, width: "100%", height: "100%", boxSizing: "border-box" as const, justifyContent: "center" }}><div style={{ width: "100%", height: 4, borderRadius: 2, background: "var(--color-surface-2)", position: "relative" }}><div style={{ width: `${node.props.value || 50}%`, height: "100%", borderRadius: 2, background: "var(--brand-primary)" }} /></div></div>;
    case "Progress":
      return <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: 4, width: "100%", height: "100%", boxSizing: "border-box" as const, justifyContent: "center" }}><div style={{ width: "100%", height: 8, borderRadius: 4, background: "var(--color-surface-2)" }}><div style={{ width: `${((node.props.value as number || 0) / (node.props.max as number || 100)) * 100}%`, height: "100%", borderRadius: 4, background: "var(--brand-primary)" }} /></div></div>;
    case "CircularProgress":
      return <div style={{ width: typeof node.props.size === "number" ? node.props.size : 48, height: typeof node.props.size === "number" ? node.props.size : 48, borderRadius: "50%", border: `3px solid var(--color-surface-2)`, borderTopColor: "var(--brand-primary)", animation: "spin 1s linear infinite", margin: "auto" }} />;
    case "Badge":
      return <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "2px 8px", borderRadius: 9999, background: (node.props.color as string) || "#ff6a1a", color: "#fff", fontSize: "0.75rem", fontWeight: 600, width: "fit-content", height: "fit-content", margin: "auto" }}>{node.props.text as string || "Badge"}</div>;
    case "Tag":
      return <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "2px 10px", borderRadius: 4, border: `1px solid ${(node.props.color as string) || "#22c55e"}`, color: (node.props.color as string) || "#22c55e", fontSize: "0.75rem", width: "fit-content", height: "fit-content", margin: "auto" }}>{node.props.text as string || "Tag"}</div>;
    case "Card":
      return <div style={{ display: "flex", flexDirection: "column", padding: typeof node.props.p === "number" ? node.props.p : 16, borderRadius: 12, background: "var(--color-surface)", border: "1px solid var(--color-border)", width: "100%", height: "100%", boxSizing: "border-box" as const, overflow: "hidden" }}>{node.children.length > 0 ? node.children.map((c) => renderPreview(c)) : label}</div>;
    case "NavBar":
      return <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)", width: "100%", height: "100%", boxSizing: "border-box" as const }}><span style={{ fontWeight: 700, fontSize: "0.8rem" }}>{node.props.brand as string || "App"}</span><div style={{ display: "flex", gap: 12 }}>{Array.from({ length: node.props.items as number || 3 }).map((_, i) => <span key={i} style={{ fontSize: "0.7rem", opacity: 0.7 }}>Item {i + 1}</span>)}</div></div>;
    case "Tabs":
      return <div style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottom: "1px solid var(--color-border)", width: "100%", height: "100%", boxSizing: "border-box" as const }}>{Array.from({ length: node.props.tabs as number || 3 }).map((_, i) => <span key={i} style={{ padding: "8px 16px", borderBottom: i === (node.props.active as number || 0) ? "2px solid var(--brand-primary)" : "2px solid transparent", fontSize: "0.75rem", cursor: "pointer", whiteSpace: "nowrap" }}>Tab {i + 1}</span>)}</div>;
    case "Breadcrumb":
      return <div style={{ display: "flex", flexDirection: "row", gap: 4, alignItems: "center", padding: 4, fontSize: "0.75rem", width: "100%", height: "100%", boxSizing: "border-box" as const }}>{Array.from({ length: node.props.items as number || 3 }).map((_, i) => <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>{i > 0 && <span style={{ opacity: 0.4 }}>/</span>}<span style={{ color: i === (node.props.items as number || 3) - 1 ? "var(--color-text)" : "var(--color-text-2)" }}>Item {i + 1}</span></span>)}</div>;
    case "Pagination":
      return <div style={{ display: "flex", flexDirection: "row", gap: 4, padding: 4, alignItems: "center", width: "100%", height: "100%", boxSizing: "border-box" as const }}>{Array.from({ length: Math.min(node.props.total as number || 10, 5) }).map((_, i) => <span key={i} style={{ width: 26, height: 26, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", background: i + 1 === (node.props.current as number || 1) ? "var(--brand-primary)" : "var(--color-surface)", fontSize: "0.7rem", cursor: "pointer" }}>{i + 1}</span>)}</div>;
    case "Divider":
      return <div style={{ height: 1, background: node.props.color as string || "var(--color-border)", width: "100%" }} />;
    case "Skeleton":
      return <div style={{ width: "100%", height: "100%", borderRadius: 4, background: "var(--color-surface-2)", animation: "pulse 1.5s ease-in-out infinite" }} />;
    case "Avatar":
      return <div style={{ width: typeof node.props.size === "number" ? node.props.size : 40, height: typeof node.props.size === "number" ? node.props.size : 40, borderRadius: "50%", background: "var(--brand-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: typeof node.props.size === "number" ? node.props.size * 0.35 : 14, margin: "auto" }}>{node.props.initials as string || "SU"}</div>;
    case "Modal":
      return <div style={{ display: "flex", flexDirection: "column", padding: 24, borderRadius: 12, background: "var(--color-surface)", border: "1px solid var(--color-border)", width: "100%", height: "100%", boxSizing: "border-box" as const, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}><span style={{ fontWeight: 700, marginBottom: 8, fontSize: "0.85rem" }}>{node.props.title as string || "Modal"}</span><span style={{ fontSize: "0.75rem", opacity: 0.7 }}>{node.text || "Content"}</span></div>;
    case "Drawer":
      return <div style={{ display: "flex", flexDirection: "column", padding: 16, background: "var(--color-surface)", borderLeft: "1px solid var(--color-border)", width: "100%", height: "100%", boxSizing: "border-box" as const }}><span style={{ fontWeight: 700, marginBottom: 16, fontSize: "0.85rem" }}>Drawer</span><span style={{ fontSize: "0.75rem", opacity: 0.7 }}>Side panel</span></div>;
    case "Tooltip":
      return <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "6px 12px", borderRadius: 6, background: "var(--color-surface-2)", border: "1px solid var(--color-border)", fontSize: "0.75rem", width: "100%", height: "100%", boxSizing: "border-box" as const }}>{node.props.text as string || "Tooltip"}</div>;
    case "Dropdown":
      return <div style={{ display: "flex", flexDirection: "column", borderRadius: 6, background: "var(--color-surface)", border: "1px solid var(--color-border)", overflow: "hidden", width: "100%", height: "100%", boxSizing: "border-box" as const }}><span style={{ padding: "8px 12px", fontWeight: 600, fontSize: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>{node.props.label as string || "Menu"}</span>{Array.from({ length: node.props.items as number || 3 }).map((_, i) => <span key={i} style={{ padding: "6px 12px", fontSize: "0.7rem" }}>Item {i + 1}</span>)}</div>;
    case "Toast":
      return <div style={{ display: "flex", flexDirection: "row", gap: 8, padding: "8px 16px", borderRadius: 8, background: node.props.type === "error" ? "rgba(220,20,60,0.15)" : node.props.type === "warning" ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.15)", border: `1px solid ${node.props.type === "error" ? "#dc143c" : node.props.type === "warning" ? "#f59e0b" : "#22c55e"}`, alignItems: "center", width: "100%", height: "100%", boxSizing: "border-box" as const }}><span style={{ fontSize: "0.75rem" }}>{node.props.message as string || "Toast"}</span></div>;
    case "Clipboard":
      return <div style={{ display: "flex", flexDirection: "row", gap: 8, padding: "6px 12px", borderRadius: 6, background: "var(--color-surface)", border: "1px solid var(--color-border)", alignItems: "center", cursor: "pointer", width: "100%", height: "100%", boxSizing: "border-box" as const }}><span style={{ fontSize: "0.75rem", flex: 1 }}>{node.props.text as string || "Copy me!"}</span><span style={{ fontSize: "0.65rem", opacity: 0.5 }}>📋</span></div>;
    case "FileDropZone":
      return <div style={{ display: "flex", flexDirection: "column", padding: 24, borderRadius: 8, border: `2px dashed var(--color-border)`, background: "var(--color-surface)", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", height: "100%", boxSizing: "border-box" as const }}><span style={{ fontSize: "1.5rem" }}>📂</span><span style={{ fontSize: "0.75rem", opacity: 0.6 }}>Drop files</span></div>;
    case "Resizer":
      return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 12, borderRadius: 6, background: "var(--color-surface)", border: "1px solid var(--color-border)", width: "100%", height: "100%", boxSizing: "border-box" as const }}><span style={{ fontSize: "0.75rem", opacity: 0.5 }}>Resizable</span></div>;
    case "ProgressPanel":
      return <div style={{ display: "flex", flexDirection: "row", gap: 4, padding: 8, alignItems: "center", width: "100%", height: "100%", boxSizing: "border-box" as const }}>{Array.from({ length: node.props.steps as number || 4 }).map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < (node.props.current as number || 2) ? "var(--brand-primary)" : "var(--color-surface-2)" }} />)}</div>;
    case "CommandPalette":
      return <div style={{ display: "flex", flexDirection: "column", padding: 8, borderRadius: 8, background: "var(--color-surface)", border: "1px solid var(--color-border)", width: "100%", height: "100%", boxSizing: "border-box" as const }}><span style={{ padding: "6px 8px", borderRadius: 4, background: "var(--color-surface-2)", fontSize: "0.75rem", opacity: 0.6 }}>{(node.props.placeholder as string) || "Search..."}</span></div>;
    default:
      return <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", opacity: 0.5 }}>{node.type}</div>;
  }
}

export default function NovaPage() {
  const [nodes, setNodes] = useState<CanvasNode[]>([{ id: generateId(), type: "Page", props: {}, children: [], text: "Page", x: 0, y: 0 }]);
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
  const [dragging, setDragging] = useState<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const [resizing, setResizing] = useState<{ id: string; startX: number; startY: number; origW: number; origH: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragNodeType = useRef<string | null>(null);
  const nextDropPos = useRef(0);

  useEffect(() => {
    const saved = localStorage.getItem("nova-nodes");
    if (saved) {
      try {
        setNodes(JSON.parse(saved) as CanvasNode[]);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nova-nodes", JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (
          selectedId &&
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA"
        ) {
          removeNode(selectedId);
          e.preventDefault();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - dragging.startX;
      const dy = e.clientY - dragging.startY;
      updateNodePos(dragging.id, dragging.origX + dx, dragging.origY + dy);
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  useEffect(() => {
    if (!resizing) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - resizing.startX;
      const dy = e.clientY - resizing.startY;
      const w = Math.max(60, resizing.origW + dx);
      const h = Math.max(32, resizing.origH + dy);
      updateNodeProps(resizing.id, "width", Math.round(w));
      updateNodeProps(resizing.id, "height", Math.round(h));
    };
    const onUp = () => setResizing(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resizing]);

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

  function updateNodePos(id: string, x: number, y: number) {
    const updater = (ns: CanvasNode[]): CanvasNode[] =>
      ns.map((n) => {
        if (n.id === id) return { ...n, x, y };
        if (n.children.length > 0) return { ...n, children: updater(n.children) };
        return n;
      });
    setNodes((prev) => updater(prev));
  }

  function updateNodeProps(id: string, key: string, value: string | number | boolean) {
    const updater = (ns: CanvasNode[]): CanvasNode[] =>
      ns.map((n) => {
        if (n.id === id) return { ...n, props: { ...n.props, [key]: value } };
        if (n.children.length > 0)
          return { ...n, children: updater(n.children) };
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
        if (n.children.length > 0)
          return { ...n, children: updater(n.children) };
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

  function addNodeToCanvas(type: string, dropX: number, dropY: number) {
    const def = COMPONENT_DEFS.find((c) => c.type === type);
    const node = createNode(type, def, dropX, dropY);
    setNodes((prev) => {
      const updated = prev.map((n) => {
        if (n.id === "Page" || n.type === "Page") {
          return { ...n, children: [...n.children, node] };
        }
        return n;
      });
      pushHistory(updated);
      return updated;
    });
    setSelectedId(node.id);
  }

  function handleDragStart(e: React.DragEvent, type: string) {
    dragNodeType.current = type;
    e.dataTransfer.effectAllowed = "copy";
  }

  function handleCanvasDrop(e: React.DragEvent) {
    e.preventDefault();
    if (!dragNodeType.current) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left - 80) / (zoom / 100);
    const y = (e.clientY - rect.top - 20) / (zoom / 100);
    addNodeToCanvas(dragNodeType.current, Math.max(0, x), Math.max(0, y));
    dragNodeType.current = null;
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  function handleCanvasClick(e: React.MouseEvent) {
    if (
      e.target === canvasRef.current ||
      (e.target as HTMLElement).closest("[data-nova-canvas]")
    ) {
      setSelectedId(null);
    }
  }

  function handleStartDrag(nodeId: string, e: React.MouseEvent) {
    e.stopPropagation();
    const n = findNode(nodes, nodeId);
    if (!n) return;
    setDragging({ id: nodeId, startX: e.clientX, startY: e.clientY, origX: n.x, origY: n.y });
  }

  function handleStartResize(nodeId: string, e: React.MouseEvent) {
    e.stopPropagation();
    const n = findNode(nodes, nodeId);
    if (!n) return;
    const w = typeof n.props.width === "number" ? n.props.width : 160;
    const h = typeof n.props.height === "number" ? n.props.height : 48;
    setResizing({ id: nodeId, startX: e.clientX, startY: e.clientY, origW: w, origH: h });
  }

  function handleExport() {
    const pageChildren = nodes[0]?.children ?? [];
    const allTypes = pageChildren.map((c) => c.type).filter((t, i, a) => a.indexOf(t) === i).join(", ");
    const code = `import { ${allTypes} } from "@stareezy-ui/components";\nimport { t } from "@stareezy-ui/tokens";\n\nexport default function NovaDesign() {\n  return (\n${generateCode(pageChildren, 2)}\n  );\n}`;
    const blob = new Blob([code], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "NovaDesign.tsx";
    a.click();
  }

  async function handleCopyCode() {
    const code = generateCode(nodes[0]?.children || []);
    try { await navigator.clipboard.writeText(code); } catch { /* fallback */ }
  }

  const selected = getSelectedNode();
  const sel = selected;

  const s: Record<string, React.CSSProperties> = {
    container: { display: "flex", height: "calc(100vh - 64px)", background: "var(--color-bg)", color: "var(--color-text)", fontFamily: "var(--font-sans)", overflow: "hidden" },
    panel: { display: "flex", flexDirection: "column", background: "var(--color-bg)", borderRight: "1px solid var(--color-border)", overflow: "hidden" },
    panelH: { padding: "10px 14px", fontSize: "0.65rem", fontWeight: 700, color: "var(--color-text-2)", textTransform: "uppercase" as const, letterSpacing: "0.08em", borderBottom: "1px solid var(--color-border)" },
    catH: { padding: "6px 14px", fontSize: "0.7rem", fontWeight: 600, color: "var(--color-text-2)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.03)", userSelect: "none" as const },
    pItem: { display: "flex", alignItems: "center", gap: 8, padding: "5px 14px", cursor: "grab", fontSize: "0.78rem", transition: "background 0.15s", borderRadius: 4, margin: "1px 6px" },
    topBar: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg)", gap: 12 },
    canvasArea: { flex: 1, display: "flex", flexDirection: "column" as const, overflow: "hidden", position: "relative" as const },
    canvas: { flex: 1, margin: 16, borderRadius: 8, overflow: "hidden", backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 0)", backgroundSize: "24px 24px", position: "relative" as const },
    pGroup: { padding: "8px 14px", display: "flex", flexDirection: "column" as const, gap: 6, borderBottom: "1px solid rgba(255,255,255,0.04)" },
    pRow: { display: "flex", alignItems: "center", gap: 8, fontSize: "0.75rem" },
    pLabel: { width: 60, color: "var(--color-text-2)", fontSize: "0.7rem", flexShrink: 0 },
    pInput: { flex: 1, background: "var(--color-surface-2)", border: "1px solid var(--color-border)", borderRadius: 4, padding: "4px 8px", color: "var(--color-text)", fontSize: "0.75rem", outline: "none", fontFamily: "var(--font-mono)" },
    tabBtn: { flex: 1, padding: "8px", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer", textAlign: "center" as const, transition: "all 0.15s", borderBottom: "2px solid transparent", color: "var(--color-text-2)", background: "transparent" },
    tabBtnA: { color: "var(--brand-primary)", borderBottomColor: "var(--brand-primary)" },
    codePanel: { borderTop: "1px solid var(--color-border)", background: "#010103", display: "flex", flexDirection: "column" as const, flexShrink: 0 },
    codeContent: { padding: 16, fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.6, color: "#e2e8f0", overflow: "auto", whiteSpace: "pre-wrap" as const, flex: 1 },
    statusBar: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 16px", fontSize: "0.65rem", color: "var(--color-text-2)", borderTop: "1px solid var(--color-border)", background: "var(--color-surface)" },
    layerItem: { display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", fontSize: "0.75rem", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.03)", transition: "background 0.1s" },
    layerSel: { background: "rgba(255,106,26,0.1)", borderLeft: "2px solid var(--brand-primary)" },
    tokenBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 8px", fontSize: "0.65rem", borderRadius: 4, background: "var(--color-surface-2)", border: "1px solid var(--color-border)", cursor: "pointer", color: "var(--color-text)", fontFamily: "var(--font-mono)" },
    themeBtn: { padding: "4px 12px", fontSize: "0.7rem", borderRadius: 4, cursor: "pointer", border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text)" },
    themeBtnA: { borderColor: "var(--brand-primary)", color: "var(--brand-primary)", background: "rgba(255,106,26,0.1)" },
    empty: { display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: 16, position: "absolute" as const, inset: 0, color: "var(--color-text-2)", opacity: 0.6, pointerEvents: "none" as const },
  };

  const categories = [...new Set(COMPONENT_DEFS.map((c) => c.category))];
  const [openCats, setOpenCats] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((c) => [c, true])),
  );

  const pageNode = nodes[0];

  function applyToken(catName: string, value: string) {
    if (!sel) return;
    const def = COMPONENT_DEFS.find((c) => c.type === sel.type);
    const propKey =
      catName === "Colors" ? "color" :
      catName === "Spacing" ? "p" :
      catName === "Radius" ? "borderRadius" :
      catName === "Shadow" ? "boxShadow" :
      "color";
    updateNodeProps(sel.id, propKey, def?.editableProps?.includes(propKey) ? value : value);
    setCopiedToken(value);
    setTimeout(() => setCopiedToken(""), 1500);
  }

  return (
    <div style={s.container}>
      {/* Palette */}
      <div style={{ ...s.panel, width: 210 }}>
        <div style={s.panelH}>Components</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          {categories.map((cat) => (
            <div key={cat}>
              <div style={s.catH} onClick={() => setOpenCats((p) => ({ ...p, [cat]: !p[cat] }))}>
                <span>{CATEGORY_ICONS[cat] || "◇"}</span>
                <span>{cat}</span>
                <span style={{ marginLeft: "auto", opacity: 0.4 }}>
                  {openCats[cat] ? "−" : "+"}
                </span>
              </div>
              {openCats[cat] && COMPONENT_DEFS.filter((c) => c.category === cat).map((def) => (
                <div key={def.type} style={s.pItem} draggable onDragStart={(e) => handleDragStart(e, def.type)} onDoubleClick={() => addNodeToCanvas(def.type, 20 + nextDropPos.current * 10, 20 + nextDropPos.current * 10)} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,106,26,0.08)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                  <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>{def.icon}</span>
                  <span>{def.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Center */}
      <div style={s.canvasArea}>
        <div style={s.topBar}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontWeight: 800,
                fontSize: "0.85rem",
                background: "linear-gradient(135deg, #ff6a1a, #dc143c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ✦ Nova
            </span>
            <span style={{ fontSize: "0.65rem", opacity: 0.4 }}>
              Design Builder
            </span>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {THEMES.map((t) => (
              <button key={t} style={t === theme ? { ...s.themeBtn, ...s.themeBtnA } : s.themeBtn} onClick={() => setTheme(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
            <button style={s.themeBtn} onClick={() => setShowCode(!showCode)}>{showCode ? "▲ Code" : "▼ Code"}</button>
          </div>
        </div>

        {/* Canvas with theme */}
        <div data-theme={theme} style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <div
            ref={canvasRef}
            style={{ ...s.canvas, transform: `scale(${zoom / 100})`, transformOrigin: "top left", cursor: dragging ? "grabbing" : "default" }}
            onDrop={handleCanvasDrop}
            onDragOver={handleDragOver}
            onClick={handleCanvasClick}
            data-nova-canvas
          >
            {pageNode && (
              (pageNode.children.length > 0 ? pageNode.children : []).map((child) => {
                const w = typeof child.props.width === "number" ? child.props.width : 160;
                const h = typeof child.props.height === "number" ? child.props.height : 48;
                const isSel = child.id === selectedId;
                return (
                  <div
                    key={child.id}
                    style={{
                      position: "absolute", left: child.x, top: child.y, width: w, height: h,
                      border: isSel ? "2px solid #ff6a1a" : "2px solid transparent",
                      borderRadius: 4, cursor: isSel ? "move" : "pointer", zIndex: isSel ? 10 : 1,
                      transition: dragging?.id === child.id ? "none" : "border-color 0.15s",
                      background: "var(--color-surface)",
                      overflow: "hidden",
                    }}
                    onClick={(e) => { e.stopPropagation(); setSelectedId(child.id); }}
                    onMouseDown={(e) => {
                      if (!isSel) { e.stopPropagation(); setSelectedId(child.id); return; }
                      handleStartDrag(child.id, e);
                    }}
                    onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.borderColor = "rgba(255,106,26,0.3)"; }}
                    onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.borderColor = "transparent"; }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 18, background: "rgba(255,106,26,0.1)", display: "flex", alignItems: "center", padding: "0 6px", gap: 4, zIndex: 5, cursor: "move", fontSize: "0.55rem", color: "var(--color-text-2)" }} onMouseDown={(e) => { e.stopPropagation(); handleStartDrag(child.id, e); }}>
                      <span style={{ opacity: 0.5 }}>{ICONS[child.type] || "◻"}</span>
                      <span>{child.type}</span>
                    </div>
                    {isSel && (
                      <button
                        style={{ position: "absolute", top: 0, right: 0, width: 18, height: 18, background: "#dc143c", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.55rem", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}
                        onClick={(e) => { e.stopPropagation(); removeNode(child.id); }}
                      >
                        ✕
                      </button>
                    )}
                    <div style={{ width: "100%", height: "100%", paddingTop: 18, boxSizing: "border-box" as const }}>
                      {renderPreview(child)}
                    </div>
                    {/* Resize handles */}
                    {isSel && (
                      <>
                        <div style={{ position: "absolute", right: -3, top: "50%", transform: "translateY(-50%)", width: 6, height: 20, background: "#ff6a1a", borderRadius: 3, cursor: "ew-resize", zIndex: 15 }} onMouseDown={(e) => handleStartResize(child.id, e)} />
                        <div style={{ position: "absolute", right: -4, bottom: -4, width: 10, height: 10, background: "#ff6a1a", borderRadius: "50%", cursor: "nwse-resize", zIndex: 15 }} onMouseDown={(e) => handleStartResize(child.id, e)} />
                      </>
                    )}
                  </div>
                );
              })
            )}
            {pageNode && pageNode.children.length === 0 && (
              <div style={s.empty}>
                <span style={{ fontSize: "2rem", opacity: 0.3 }}>✦</span>
                <span>Drag components here</span>
              </div>
            )}
          </div>
        </div>

        {/* Code Panel */}
        {showCode && (
          <div style={{ ...s.codePanel, height: 220 }}>
            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {(["code", "preview", "export"] as CodeTab[]).map((t) => (
                <button key={t} style={codeTab === t ? { ...s.tabBtn, ...s.tabBtnA, background: "transparent" } : s.tabBtn} onClick={() => setCodeTab(t)}>
                  {t === "code" ? "Code" : t === "preview" ? "Preview" : "Export"}
                </button>
              ))}
              <div style={{ marginLeft: "auto", display: "flex", gap: 4, padding: 4 }}>
                <button onClick={handleCopyCode} style={s.tokenBtn}>Copy</button>
                <button onClick={handleExport} style={s.tokenBtn}>Download</button>
              </div>
            </div>
            <div style={{ flex: 1, overflow: "auto" }}>
              {codeTab === "code" && (() => {
                const pageChildren = nodes[0]?.children ?? [];
                const allTypes = pageChildren.map((c) => c.type).filter((t, i, a) => a.indexOf(t) === i).join(", ");
                return (
                  <div style={s.codeContent}>
                    {`import { ${allTypes} } from "@stareezy-ui/components";\nimport { t } from "@stareezy-ui/tokens";\n\nexport default function NovaDesign() {\n  return (\n`}
                    {generateCode(pageChildren, 2)}
                    {"\n  );\n}"}
                  </div>
                );
              })()}
              {codeTab === "preview" && (
                <div data-theme={theme} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8, minHeight: 160, alignItems: "center", justifyContent: "center" }}>
                  {(nodes[0]?.children ?? []).map((c) => renderPreview(c))}
                </div>
              )}
              {codeTab === "export" && (
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, alignItems: "center", justifyContent: "center", minHeight: 160 }}>
                  <button onClick={handleCopyCode} style={{ ...s.tokenBtn, padding: "8px 24px", fontSize: "0.85rem" }}>📋 Copy Code</button>
                  <button onClick={handleExport} style={{ ...s.tokenBtn, padding: "8px 24px", fontSize: "0.85rem" }}>⬇ Download .tsx</button>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={s.statusBar}>
          <span>{(nodes[0]?.children ?? []).length} items</span>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onClick={undo}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-2)",
                cursor: "pointer",
                fontSize: "0.65rem",
                opacity: historyIdx >= 0 ? 1 : 0.3,
              }}
            >
              ↩
            </button>
            <button
              onClick={redo}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-2)",
                cursor: "pointer",
                fontSize: "0.65rem",
                opacity: historyIdx < history.length - 1 ? 1 : 0.3,
              }}
            >
              ↪
            </button>
            <button
              onClick={() => setZoom(Math.max(25, zoom - 25))}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-2)",
                cursor: "pointer",
                fontSize: "0.65rem",
              }}
            >
              −
            </button>
            <span>{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-2)",
                cursor: "pointer",
                fontSize: "0.65rem",
              }}
            >
              +
            </button>
            <span>Theme: {theme}</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ ...s.panel, width: 260, borderRight: "none", borderLeft: "1px solid var(--color-border)" }}>
        <div style={{ display: "flex" }}>
          {(["style", "content", "layers"] as TabId[]).map((t) => (
            <button key={t} style={tab === t ? { ...s.tabBtn, ...s.tabBtnA } : s.tabBtn} onClick={() => setTab(t)}>
              {t === "style" ? "Style" : t === "content" ? "Content" : "Layers"}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflow: "auto" }}>
          {tab === "style" && (
            <div>
              {sel ? (
                <>
                  <div style={s.pGroup}>
                    <div style={s.pRow}>
                      <span style={s.pLabel}>Type</span>
                      <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", opacity: 0.6 }}>{sel.type}</span>
                    </div>
                    <div style={s.pRow}>
                      <span style={s.pLabel}>X</span>
                      <input style={s.pInput} type="number" value={sel.x} onChange={(e) => updateNodePos(sel.id, parseInt(e.target.value) || 0, sel.y)} />
                      <span style={s.pLabel}>Y</span>
                      <input style={s.pInput} type="number" value={sel.y} onChange={(e) => updateNodePos(sel.id, sel.x, parseInt(e.target.value) || 0)} />
                    </div>
                  </div>
                  <div style={s.pGroup}>
                    <div style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Layout</div>
                    <div style={s.pRow}>
                      <span style={s.pLabel}>Padding</span>
                      <input style={s.pInput} type="number" value={(sel.props.p as number) ?? ""} placeholder="0" onChange={(e) => updateNodeProps(sel.id, "p", e.target.value ? parseInt(e.target.value) : 0)} />
                    </div>
                    <div style={s.pRow}>
                      <span style={s.pLabel}>Radius</span>
                      <input style={s.pInput} type="number" value={(sel.props.borderRadius as number) ?? ""} placeholder="0" onChange={(e) => updateNodeProps(sel.id, "borderRadius", e.target.value ? parseInt(e.target.value) : 0)} />
                    </div>
                    <div style={s.pRow}>
                      <span style={s.pLabel}>Width</span>
                      <input style={s.pInput} type="number" value={(sel.props.width as number) ?? ""} placeholder="160" onChange={(e) => updateNodeProps(sel.id, "width", e.target.value ? parseInt(e.target.value) : 0)} />
                    </div>
                    <div style={s.pRow}>
                      <span style={s.pLabel}>Height</span>
                      <input style={s.pInput} type="number" value={(sel.props.height as number) ?? ""} placeholder="48" onChange={(e) => updateNodeProps(sel.id, "height", e.target.value ? parseInt(e.target.value) : 0)} />
                    </div>
                    {(sel.type === "Stack" || sel.type === "HStack" || sel.type === "VStack") && (
                      <div style={s.pRow}>
                        <span style={s.pLabel}>Spacing</span>
                        <input style={s.pInput} type="number" value={(sel.props.spacing as number) ?? 8} onChange={(e) => updateNodeProps(sel.id, "spacing", parseInt(e.target.value) || 8)} />
                      </div>
                    )}
                    {sel.type === "Grid" && (
                      <div style={s.pRow}>
                        <span style={s.pLabel}>Columns</span>
                        <input style={s.pInput} type="number" value={(sel.props.columns as number) ?? 2} onChange={(e) => updateNodeProps(sel.id, "columns", parseInt(e.target.value) || 2)} />
                      </div>
                    )}
                  </div>
                  <div style={s.pGroup}>
                    <div style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Appearance</div>
                    <div style={s.pRow}>
                      <span style={s.pLabel}>Background</span>
                      <input style={s.pInput} value={(sel.props.bg as string) || ""} placeholder="default" onChange={(e) => updateNodeProps(sel.id, "bg", e.target.value)} />
                    </div>
                    <div style={s.pRow}>
                      <span style={s.pLabel}>Color</span>
                      <input style={s.pInput} value={(sel.props.color as string) || ""} placeholder="default" onChange={(e) => updateNodeProps(sel.id, "color", e.target.value)} />
                    </div>
                  </div>
                  {/* Tokens */}
                  <div style={s.pGroup}>
                    <div style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer", display: "flex", justifyContent: "space-between" }} onClick={() => setShowTokens(!showTokens)}>
                      <span>Tokens</span>
                      <span style={{ opacity: 0.4 }}>
                        {showTokens ? "−" : "+"}
                      </span>
                    </div>
                    {showTokens && Object.entries(TOKENS_CATEGORIES).map(([cat, tokens]) => (
                      <div key={cat} style={{ marginBottom: 6 }}>
                        <div style={{ fontSize: "0.6rem", color: "var(--color-text-2)", marginBottom: 3, opacity: 0.6 }}>{cat}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                          {Object.entries(tokens).map(([name, value]) => (
                            <button key={name} style={{ ...s.tokenBtn, fontSize: "0.6rem", padding: "2px 6px" }} onClick={() => applyToken(cat, value)}>
                              {copiedToken === value && <span style={{ color: "#22c55e" }}>✓</span>}
                              {name}
                            </button>
                          ))}
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                <div style={{ padding: 40, textAlign: "center", opacity: 0.4, fontSize: "0.75rem" }}>
                  Select a component to edit
                </div>
              )}
            </div>
          )}

          {tab === "content" && (
            <div>
              {sel ? (
                <div style={s.pGroup}>
                  <div style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Text</div>
                  <textarea style={{ ...s.pInput, minHeight: 60, resize: "vertical", fontFamily: "var(--font-sans)" }} value={sel.text || ""} onChange={(e) => updateNodeText(sel.id, e.target.value)} placeholder="Component text..." />
                  <div style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginTop: 8, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>All Props</div>
                  {Object.entries(sel.props).map(([k, v]) => (
                    <div key={k} style={s.pRow}>
                      <span style={s.pLabel}>{k}</span>
                      <input style={s.pInput} value={String(v)} onChange={(e) => updateNodeProps(sel.id, k, isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value))} />
                    </div>
                  ))}
                  {Object.keys(sel.props).length === 0 && (
                    <div style={{ fontSize: "0.7rem", opacity: 0.4, padding: "8px 0" }}>No custom props</div>
                  )}
                </div>
              ) : (
                <div style={{ padding: 40, textAlign: "center", opacity: 0.4, fontSize: "0.75rem" }}>
                  Select a component to edit
                </div>
              )}
            </div>
          )}

          {tab === "layers" && (
            <div>
              {pageNode && (
                <div>
                  <div style={selectedId === pageNode.id ? { ...s.layerItem, ...s.layerSel } : s.layerItem} onClick={() => setSelectedId(pageNode.id)}>
                    <span style={{ fontSize: "0.65rem", opacity: 0.5 }}>◻</span>
                    <span style={{ flex: 1 }}>Page</span>
                  </div>
                  {pageNode.children.map((child) => (
                    <div key={child.id} style={selectedId === child.id ? { ...s.layerItem, ...s.layerSel, paddingLeft: 28 } : { ...s.layerItem, paddingLeft: 28 }} onClick={() => setSelectedId(child.id)}>
                      <span style={{ fontSize: "0.65rem", opacity: 0.5 }}>{ICONS[child.type] || "◻"}</span>
                      <span style={{ flex: 1, fontSize: "0.7rem" }}>{child.type}</span>
                      <button style={{ background: "none", border: "none", color: "var(--color-text-2)", cursor: "pointer", fontSize: "0.6rem", opacity: 0.4 }} onClick={(e) => { e.stopPropagation(); removeNode(child.id); }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
              {(!pageNode || pageNode.children.length === 0) && (
                <div style={{ padding: 40, textAlign: "center", opacity: 0.4, fontSize: "0.75rem" }}>No components yet</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
