import { type CanvasNode, type StyleKeys } from "../types";

interface ContentTabProps {
  sel: CanvasNode;
  onTextChange: (id: string, text: string) => void;
  onPropChange: (id: string, key: string, value: string | number | boolean) => void;
  s: StyleKeys;
}

export function ContentTab({ sel, onTextChange, onPropChange, s }: ContentTabProps) {
  return (
    <div style={s.pGroup}>
      <div style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Text</div>
      <textarea
        style={{ ...s.pInput, minHeight: 60, resize: "vertical", fontFamily: "var(--font-sans)" }}
        value={sel.text || ""}
        onChange={(e) => onTextChange(sel.id, e.target.value)}
        placeholder="Component text..."
      />
      <div style={{ fontSize: "0.65rem", color: "var(--color-text-2)", fontWeight: 600, marginTop: 8, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>All Props</div>
      {Object.entries(sel.props).map(([k, v]) => (
        <div key={k} style={s.pRow}>
          <span style={s.pLabel}>{k}</span>
          <input style={s.pInput} value={String(v)} onChange={(e) => onPropChange(sel.id, k, isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value))} />
        </div>
      ))}
      {Object.keys(sel.props).length === 0 && (
        <div style={{ fontSize: "0.7rem", opacity: 0.4, padding: "8px 0" }}>No custom props</div>
      )}
    </div>
  );
}
