import { type CanvasNode, type StyleKeys } from "../types";
import { ICONS } from "../data";

interface LayersTabProps {
  pageNode: CanvasNode | undefined;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  s: StyleKeys;
}

export function LayersTab({ pageNode, selectedId, onSelect, onRemove, s }: LayersTabProps) {
  if (!pageNode || pageNode.children.length === 0) {
    return <div style={{ padding: 40, textAlign: "center", opacity: 0.4, fontSize: "0.75rem" }}>No components yet</div>;
  }

  return (
    <div>
      <div
        style={selectedId === pageNode.id ? { ...s.layerItem, ...s.layerSel } : s.layerItem}
        onClick={() => onSelect(pageNode.id)}
      >
        <span style={{ fontSize: "0.65rem", opacity: 0.5 }}>◻</span>
        <span style={{ flex: 1 }}>Page</span>
      </div>
      {pageNode.children.map((child) => (
        <div
          key={child.id}
          style={selectedId === child.id ? { ...s.layerItem, ...s.layerSel, paddingLeft: 28 } : { ...s.layerItem, paddingLeft: 28 }}
          onClick={() => onSelect(child.id)}
        >
          <span style={{ fontSize: "0.65rem", opacity: 0.5 }}>{ICONS[child.type] || "◻"}</span>
          <span style={{ flex: 1, fontSize: "0.7rem" }}>{child.type}</span>
          <button
            style={{ background: "none", border: "none", color: "var(--color-text-2)", cursor: "pointer", fontSize: "0.6rem", opacity: 0.4 }}
            onClick={(e) => { e.stopPropagation(); onRemove(child.id); }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
