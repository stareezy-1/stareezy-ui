import { COMPONENT_DEFS, CATEGORY_ICONS } from "../data";

interface PaletteProps {
  openCats: Record<string, boolean>;
  onToggleCat: (cat: string) => void;
  onDragStart: (e: React.DragEvent, type: string) => void;
  onDoubleClick: (type: string) => void;
}

export function Palette({ openCats, onToggleCat, onDragStart, onDoubleClick }: PaletteProps) {
  const categories = [...new Set(COMPONENT_DEFS.map((c) => c.category))];

  return (
    <div style={{ width: 210, display: "flex", flexDirection: "column", background: "var(--color-bg)", borderRight: "1px solid var(--color-border)", overflow: "hidden" }}>
      <div style={{ padding: "10px 14px", fontSize: "0.65rem", fontWeight: 700, color: "var(--color-text-2)", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid var(--color-border)" }}>
        Components
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        {categories.map((cat) => (
          <div key={cat}>
            <div
              style={{ padding: "6px 14px", fontSize: "0.7rem", fontWeight: 600, color: "var(--color-text-2)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.03)", userSelect: "none" }}
              onClick={() => onToggleCat(cat)}
            >
              <span>{CATEGORY_ICONS[cat] || "◇"}</span>
              <span>{cat}</span>
              <span style={{ marginLeft: "auto", opacity: 0.4 }}>{openCats[cat] ? "−" : "+"}</span>
            </div>
            {openCats[cat] && COMPONENT_DEFS.filter((c) => c.category === cat).map((def) => (
              <div
                key={def.type}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 14px", cursor: "grab", fontSize: "0.78rem", borderRadius: 4, margin: "1px 6px" }}
                draggable
                onDragStart={(e) => onDragStart(e, def.type)}
                onDoubleClick={() => onDoubleClick(def.type)}
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
  );
}
