import { type CanvasNode, type StyleKeys } from "../types";
import { TOKENS_CATEGORIES } from "../data";

interface StyleTabProps {
  sel: CanvasNode;
  showTokens: boolean;
  copiedToken: string;
  onPropChange: (id: string, key: string, value: string | number | boolean) => void;
  onPosChange: (id: string, x: number, y: number) => void;
  onTokenToggle: () => void;
  onApplyToken: (cat: string, value: string) => void;
  s: StyleKeys;
}

export function StyleTab({ sel, showTokens, copiedToken, onPropChange, onPosChange, onTokenToggle, onApplyToken, s }: StyleTabProps) {
  return (
    <div>
      <div style={s.pGroup}>
        <div style={s.pRow}>
          <span style={s.pLabel}>Type</span>
          <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", opacity: 0.6 }}>{sel.type}</span>
        </div>
        <div style={s.pRow}>
          <span style={s.pLabel}>X</span>
          <input style={s.pInput} type="number" value={sel.x} onChange={(e) => onPosChange(sel.id, parseInt(e.target.value) || 0, sel.y)} />
          <span style={s.pLabel}>Y</span>
          <input style={s.pInput} type="number" value={sel.y} onChange={(e) => onPosChange(sel.id, sel.x, parseInt(e.target.value) || 0)} />
        </div>
      </div>
      <div style={s.pGroup}>
        <div style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Layout</div>
        <div style={s.pRow}>
          <span style={s.pLabel}>Padding</span>
          <input style={s.pInput} type="number" value={(sel.props.p as number) ?? ""} placeholder="0" onChange={(e) => onPropChange(sel.id, "p", e.target.value ? parseInt(e.target.value) : 0)} />
        </div>
        <div style={s.pRow}>
          <span style={s.pLabel}>Radius</span>
          <input style={s.pInput} type="number" value={(sel.props.borderRadius as number) ?? ""} placeholder="0" onChange={(e) => onPropChange(sel.id, "borderRadius", e.target.value ? parseInt(e.target.value) : 0)} />
        </div>
        <div style={s.pRow}>
          <span style={s.pLabel}>Width</span>
          <input style={s.pInput} type="number" value={(sel.props.width as number) ?? ""} placeholder="160" onChange={(e) => onPropChange(sel.id, "width", e.target.value ? parseInt(e.target.value) : 0)} />
        </div>
        <div style={s.pRow}>
          <span style={s.pLabel}>Height</span>
          <input style={s.pInput} type="number" value={(sel.props.height as number) ?? ""} placeholder="48" onChange={(e) => onPropChange(sel.id, "height", e.target.value ? parseInt(e.target.value) : 0)} />
        </div>
        {(sel.type === "Stack" || sel.type === "HStack" || sel.type === "VStack") && (
          <div style={s.pRow}>
            <span style={s.pLabel}>Spacing</span>
            <input style={s.pInput} type="number" value={(sel.props.spacing as number) ?? 8} onChange={(e) => onPropChange(sel.id, "spacing", parseInt(e.target.value) || 8)} />
          </div>
        )}
        {sel.type === "Grid" && (
          <div style={s.pRow}>
            <span style={s.pLabel}>Columns</span>
            <input style={s.pInput} type="number" value={(sel.props.columns as number) ?? 2} onChange={(e) => onPropChange(sel.id, "columns", parseInt(e.target.value) || 2)} />
          </div>
        )}
      </div>
      <div style={s.pGroup}>
        <div style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Appearance</div>
        <div style={s.pRow}>
          <span style={s.pLabel}>Background</span>
          <input style={s.pInput} value={(sel.props.bg as string) || ""} placeholder="default" onChange={(e) => onPropChange(sel.id, "bg", e.target.value)} />
        </div>
        <div style={s.pRow}>
          <span style={s.pLabel}>Color</span>
          <input style={s.pInput} value={(sel.props.color as string) || ""} placeholder="default" onChange={(e) => onPropChange(sel.id, "color", e.target.value)} />
        </div>
      </div>
      <div style={s.pGroup}>
        <div
          style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer", display: "flex", justifyContent: "space-between" }}
          onClick={onTokenToggle}
        >
          <span>Tokens</span>
          <span style={{ opacity: 0.4 }}>{showTokens ? "−" : "+"}</span>
        </div>
        {showTokens && Object.entries(TOKENS_CATEGORIES).map(([cat, tokens]) => (
          <div key={cat} style={{ marginBottom: 6 }}>
            <div style={{ fontSize: "0.6rem", color: "var(--color-text-2)", marginBottom: 3, opacity: 0.6 }}>{cat}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {Object.entries(tokens).map(([name, value]) => (
                <button
                  key={name}
                  style={{ ...s.tokenBtn, fontSize: "0.6rem", padding: "2px 6px" }}
                  onClick={() => onApplyToken(cat, value)}
                >
                  {copiedToken === value && <span style={{ color: "#22c55e" }}>✓</span>}
                  {name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
