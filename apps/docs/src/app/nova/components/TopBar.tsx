import { type ThemeMode } from "../types";
import { THEMES } from "../data";

interface TopBarProps {
  theme: ThemeMode;
  showCode: boolean;
  onThemeChange: (t: ThemeMode) => void;
  onToggleCode: () => void;
}

export function TopBar({ theme, showCode, onThemeChange, onToggleCode }: TopBarProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg)", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontWeight: 800, fontSize: "0.85rem", background: "linear-gradient(135deg, #ff6a1a, #dc143c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          ✦ Nova
        </span>
        <span style={{ fontSize: "0.65rem", opacity: 0.4 }}>Design Builder</span>
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {THEMES.map((t) => (
          <button
            key={t}
            style={{
              padding: "4px 12px", fontSize: "0.7rem", borderRadius: 4, cursor: "pointer",
              border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text)",
              ...(t === theme ? { borderColor: "var(--brand-primary)", color: "var(--brand-primary)", background: "rgba(255,106,26,0.1)" } : {}),
            }}
            onClick={() => onThemeChange(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <button
          style={{ padding: "4px 12px", fontSize: "0.7rem", borderRadius: 4, cursor: "pointer", border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text)" }}
          onClick={onToggleCode}
        >
          {showCode ? "▲ Code" : "▼ Code"}
        </button>
      </div>
    </div>
  );
}
