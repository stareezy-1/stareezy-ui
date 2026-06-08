import { type CanvasNode, type ComponentDef } from "./types";
import { COMPONENT_DEFS } from "./data";

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function createNode(type: string, def?: ComponentDef, dropX = 40, dropY = 40): CanvasNode {
  const found = def || COMPONENT_DEFS.find((c) => c.type === type);
  const d = found || COMPONENT_DEFS[0]!;
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

export function generateCode(nodes: CanvasNode[], indent = 0): string {
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

export function findNode(nodes: CanvasNode[], id: string): CanvasNode | null {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children.length > 0) {
      const found = findNode(n.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function renderPreview(node: CanvasNode): JSX.Element {
  const s: React.CSSProperties = {
    background: typeof node.props.bg === "string" ? node.props.bg : undefined,
    padding: typeof node.props.p === "number" ? node.props.p : undefined,
    borderRadius: typeof node.props.borderRadius === "number" ? node.props.borderRadius : undefined,
    display: "flex",
    flexDirection: node.props.direction === "horizontal" ? "row" : "column",
    gap: typeof node.props.spacing === "number" ? node.props.spacing : undefined,
    color: "var(--color-text)",
    fontSize: "0.85rem",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    border: "1px solid var(--color-border)",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap" as const,
    boxSizing: "border-box" as const,
  };

  const label = (
    <span style={{ fontSize: "0.65rem", opacity: 0.5, pointerEvents: "none" as const }}>
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
      return <div style={{ width: typeof node.props.size === "number" ? node.props.size : 48, height: typeof node.props.size === "number" ? node.props.size : 48, borderRadius: "50%", border: "3px solid var(--color-surface-2)", borderTopColor: "var(--brand-primary)", animation: "spin 1s linear infinite", margin: "auto" }} />;
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
      return <div style={{ display: "flex", flexDirection: "column", padding: 24, borderRadius: 8, border: "2px dashed var(--color-border)", background: "var(--color-surface)", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", height: "100%", boxSizing: "border-box" as const }}><span style={{ fontSize: "1.5rem" }}>📂</span><span style={{ fontSize: "0.75rem", opacity: 0.6 }}>Drop files</span></div>;
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
