import { type CanvasNode, type DragState, type ResizeState } from "../types";
import { ICONS } from "../data";
import { renderPreview } from "../utils";

interface CanvasNodeCardProps {
  node: CanvasNode;
  isSelected: boolean;
  dragging: DragState | null;
  onSelect: (id: string) => void;
  onStartDrag: (id: string, e: React.MouseEvent) => void;
  onStartResize: (id: string, e: React.MouseEvent) => void;
  onRemove: (id: string) => void;
}

export function CanvasNodeCard({ node, isSelected, dragging, onSelect, onStartDrag, onStartResize, onRemove }: CanvasNodeCardProps) {
  const w = typeof node.props.width === "number" ? node.props.width : 160;
  const h = typeof node.props.height === "number" ? node.props.height : 48;

  return (
    <div
      style={{
        position: "absolute", left: node.x, top: node.y, width: w, height: h,
        border: isSelected ? "2px solid #ff6a1a" : "2px solid transparent",
        borderRadius: 4, cursor: isSelected ? "move" : "pointer", zIndex: isSelected ? 10 : 1,
        transition: dragging?.id === node.id ? "none" : "border-color 0.15s",
        background: "var(--color-surface)",
        overflow: "hidden",
      }}
      onClick={(e) => { e.stopPropagation(); onSelect(node.id); }}
      onMouseDown={(e) => {
        if (!isSelected) { e.stopPropagation(); onSelect(node.id); return; }
        onStartDrag(node.id, e);
      }}
      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.borderColor = "rgba(255,106,26,0.3)"; }}
      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.borderColor = "transparent"; }}
    >
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 18, background: "rgba(255,106,26,0.1)", display: "flex", alignItems: "center", padding: "0 6px", gap: 4, zIndex: 5, cursor: "move", fontSize: "0.55rem", color: "var(--color-text-2)" }}
        onMouseDown={(e) => { e.stopPropagation(); onStartDrag(node.id, e); }}
      >
        <span style={{ opacity: 0.5 }}>{ICONS[node.type] || "◻"}</span>
        <span>{node.type}</span>
      </div>
      {isSelected && (
        <button
          style={{ position: "absolute", top: 0, right: 0, width: 18, height: 18, background: "#dc143c", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.55rem", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}
          onClick={(e) => { e.stopPropagation(); onRemove(node.id); }}
        >
          ✕
        </button>
      )}
      <div style={{ width: "100%", height: "100%", paddingTop: 18, boxSizing: "border-box" }}>
        {renderPreview(node)}
      </div>
      {isSelected && (
        <>
          <div style={{ position: "absolute", right: -3, top: "50%", transform: "translateY(-50%)", width: 6, height: 20, background: "#ff6a1a", borderRadius: 3, cursor: "ew-resize", zIndex: 15 }} onMouseDown={(e) => onStartResize(node.id, e)} />
          <div style={{ position: "absolute", right: -4, bottom: -4, width: 10, height: 10, background: "#ff6a1a", borderRadius: "50%", cursor: "nwse-resize", zIndex: 15 }} onMouseDown={(e) => onStartResize(node.id, e)} />
        </>
      )}
    </div>
  );
}
