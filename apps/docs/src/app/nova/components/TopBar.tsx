import { type ThemeMode } from "../types";
import { THEMES } from "../data";

interface TopBarProps {
  theme: ThemeMode;
  showCode: boolean;
  onThemeChange: (t: ThemeMode) => void;
  onToggleCode: () => void;
}

const THEME_LABELS: Record<ThemeMode, string> = {
  quasar: "Quasar",
  aurora: "Aurora",
  "steins-gate": "Steins;Gate",
  light: "Light",
};

/** Per-theme active accent so buttons are always readable */
const THEME_ACCENT: Record<
  ThemeMode,
  { border: string; color: string; bg: string }
> = {
  quasar: { border: "#ff6a1a", color: "#ff6a1a", bg: "rgba(255,106,26,0.12)" },
  aurora: { border: "#7c3aed", color: "#a78bfa", bg: "rgba(124,58,237,0.12)" },
  "steins-gate": {
    border: "#00bfff",
    color: "#00bfff",
    bg: "rgba(0,191,255,0.10)",
  },
  light: { border: "#2563eb", color: "#2563eb", bg: "rgba(37,99,235,0.10)" },
};

export function TopBar({
  theme,
  showCode,
  onThemeChange,
  onToggleCode,
}: TopBarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "7px 14px",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-bg)",
        gap: 12,
        flexShrink: 0,
      }}
    >
      {/* Brand */}
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
        <span style={{ fontSize: "0.62rem", opacity: 0.35 }}>
          Design Builder
        </span>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        {/* Theme buttons */}
        {THEMES.map((t) => {
          const isActive = t === theme;
          const accent = THEME_ACCENT[t];
          return (
            <button
              key={t}
              style={{
                padding: "3px 11px",
                fontSize: "0.68rem",
                borderRadius: 5,
                cursor: "pointer",
                border: `1px solid ${
                  isActive ? accent.border : "var(--color-border)"
                }`,
                background: isActive ? accent.bg : "var(--color-surface)",
                color: isActive ? accent.color : "var(--color-text-2)",
                fontWeight: isActive ? 600 : 400,
                transition: "all 0.12s",
                outline: "none",
              }}
              onClick={() => onThemeChange(t)}
            >
              {THEME_LABELS[t]}
            </button>
          );
        })}

        {/* Divider */}
        <span
          style={{
            width: 1,
            height: 16,
            background: "var(--color-border)",
            margin: "0 2px",
            flexShrink: 0,
          }}
        />

        {/* Code toggle */}
        <button
          style={{
            padding: "3px 11px",
            fontSize: "0.68rem",
            borderRadius: 5,
            cursor: "pointer",
            border: `1px solid ${
              showCode ? "var(--brand-primary, #ff6a1a)" : "var(--color-border)"
            }`,
            background: showCode
              ? "rgba(255,106,26,0.1)"
              : "var(--color-surface)",
            color: showCode
              ? "var(--brand-primary, #ff6a1a)"
              : "var(--color-text-2)",
            transition: "all 0.12s",
            outline: "none",
          }}
          onClick={onToggleCode}
        >
          {showCode ? "▲ Code" : "▼ Code"}
        </button>
      </div>
    </div>
  );
}
