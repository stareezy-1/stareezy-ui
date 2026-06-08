"use client";

import { useState } from "react";

type ThemeSlot = {
  key: string;
  label: string;
  defaultColor: string;
  category: "background" | "text" | "border";
};

const THEME_SLOTS: ThemeSlot[] = [
  { key: "bg.primary", label: "Background Primary", defaultColor: "#020205", category: "background" },
  { key: "bg.surface", label: "Surface", defaultColor: "#0d0508", category: "background" },
  { key: "bg.surface2", label: "Surface 2", defaultColor: "#160a0e", category: "background" },
  { key: "text.primary", label: "Text Primary", defaultColor: "#f8f0e8", category: "text" },
  { key: "text.secondary", label: "Text Secondary", defaultColor: "#b09080", category: "text" },
  { key: "text.muted", label: "Text Muted", defaultColor: "#6a5048", category: "text" },
  { key: "border.default", label: "Border Default", defaultColor: "#2a100a", category: "border" },
  { key: "border.brand", label: "Border Brand", defaultColor: "#ff6a1a", category: "border" },
  { key: "brand.primary", label: "Brand Primary", defaultColor: "#ff6a1a", category: "background" },
  { key: "brand.accent", label: "Brand Accent", defaultColor: "#dc143c", category: "background" },
  { key: "brand.success", label: "Brand Success", defaultColor: "#22c55e", category: "background" },
  { key: "brand.warning", label: "Brand Warning", defaultColor: "#f5a623", category: "background" },
];

const PRESETS = {
  quasar: {
    name: "Quasar",
    desc: "Deep space plasma",
    colors: {
      "bg.primary": "#020205", "bg.surface": "#0d0508", "bg.surface2": "#160a0e",
      "text.primary": "#f8f0e8", "text.secondary": "#b09080", "text.muted": "#6a5048",
      "border.default": "#2a100a", "border.brand": "#ff6a1a",
      "brand.primary": "#ff6a1a", "brand.accent": "#dc143c",
      "brand.success": "#22c55e", "brand.warning": "#f5a623",
    },
  },
  aurora: {
    name: "Aurora",
    desc: "Deep space aurora",
    colors: {
      "bg.primary": "#050505", "bg.surface": "#0f0f1a", "bg.surface2": "#1a1a2e",
      "text.primary": "#f0f0f8", "text.secondary": "#a0a0b8", "text.muted": "#888888",
      "border.default": "#2a2a3e", "border.brand": "#00ff88",
      "brand.primary": "#00ff88", "brand.accent": "#7c3aed",
      "brand.success": "#00cc6a", "brand.warning": "#f59e0b",
    },
  },
  "steins-gate": {
    name: "Steins;Gate",
    desc: "Midnight navy",
    colors: {
      "bg.primary": "#080c18", "bg.surface": "#0d1224", "bg.surface2": "#131929",
      "text.primary": "#e8dcc8", "text.secondary": "#a89880", "text.muted": "#5a6a85",
      "border.default": "#1e2a42", "border.brand": "#4a9eff",
      "brand.primary": "#4a9eff", "brand.accent": "#e63030",
      "brand.success": "#22c55e", "brand.warning": "#f5a623",
    },
  },
};

type Colors = Record<string, string>;

function toHex(color: string): string {
  if (color.startsWith("#")) return color;
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return "#000000";
  ctx.fillStyle = color;
  return ctx.fillStyle;
}

function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length < 6) return false;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140;
}

function generateCSS(colors: Colors): string {
  return `/* Stareezy UI — Custom Theme */
[data-theme="custom"] {
  --color-bg: ${colors["bg.primary"]};
  --color-surface: ${colors["bg.surface"]};
  --color-surface-2: ${colors["bg.surface2"]};
  --color-text: ${colors["text.primary"]};
  --color-text-2: ${colors["text.secondary"]};
  --color-muted: ${colors["text.muted"]};
  --color-border: ${colors["border.default"]};
  --border-brand: ${colors["border.brand"]};
  --brand-primary: ${colors["brand.primary"]};
  --brand-accent: ${colors["brand.accent"]};
  --brand-success: ${colors["brand.success"]};
  --brand-warning: ${colors["brand.warning"]};
  --brand-50: ${colors["brand.primary"]}15;
  --brand-100: ${colors["brand.primary"]}25;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}`;
}

export default function ThemeBuilderPage() {
  const [colors, setColors] = useState<Colors>({ ...PRESETS.quasar.colors });
  const [activePreset, setActivePreset] = useState("quasar");
  const [showExport, setShowExport] = useState(false);

  function setColor(key: string, value: string) {
    setColors((prev) => ({ ...prev, [key]: value }));
  }

  function applyPreset(name: string) {
    setColors({ ...PRESETS[name as keyof typeof PRESETS].colors });
    setActivePreset(name);
  }

  const code = generateCSS(colors);

  return (
    <div style={{ paddingBottom: "4rem" }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div
        className="glass-card"
        style={{
          borderRadius: 20,
          padding: "2rem 2.5rem",
          marginBottom: "2rem",
          border: "1px solid rgba(255,106,26,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="glow-orb orange" style={{ top: "-30%", right: "-10%", width: 300, height: 300 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            className="pill-tag orange"
            style={{ marginBottom: "0.75rem" }}
          >
            ✦ Interactive Tool
          </div>
          <h1
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: "0 0 0.5rem",
              color: "var(--color-text)",
            }}
          >
            Theme{" "}
            <span className="gradient-text-orange">Builder</span>
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-2)",
              maxWidth: 520,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Customize every color in your theme and see live previews of how
            components look. Export your theme as CSS variables or a{" "}
            <code>createUi()</code> config.
          </p>
        </div>
      </div>

      {/* ── Presets ──────────────────────────────────────────────────── */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-muted)",
            marginBottom: "0.75rem",
          }}
        >
          Start from a preset
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 16px", borderRadius: 10, cursor: "pointer",
                border: activePreset === key
                  ? "1px solid rgba(255,106,26,0.4)"
                  : "1px solid rgba(255,255,255,0.06)",
                background: activePreset === key
                  ? "rgba(255,106,26,0.1)"
                  : "rgba(13,5,8,0.4)",
                color: "var(--color-text)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                fontWeight: activePreset === key ? 700 : 500,
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  width: 16, height: 16, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${Object.values(preset.colors)[8] || "#ff6a1a"}, ${Object.values(preset.colors)[9] || "#dc143c"})`,
                  flexShrink: 0,
                }}
              />
              <span>{preset.name}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--color-muted)", fontWeight: 400 }}>
                {preset.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main layout ─────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          alignItems: "start",
        }}
      >
        {/* Left: Color pickers */}
        <div
          className="glass-card"
          style={{
            borderRadius: 16,
            padding: "1.5rem",
            border: "1px solid rgba(255,106,26,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              margin: "0 0 1.25rem",
              color: "var(--color-text)",
            }}
          >
            Color Palette
          </h2>

          {(["background", "text", "border"] as const).map((cat) => (
            <div key={cat} style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-muted)",
                  marginBottom: "0.65rem",
                }}
              >
                {cat === "background" ? "Backgrounds" : cat === "text" ? "Text" : "Borders"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {THEME_SLOTS.filter((s) => s.category === cat).map((slot) => (
                  <div
                    key={slot.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        overflow: "hidden",
                        flexShrink: 0,
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <input
                        type="color"
                        value={colors[slot.key] || slot.defaultColor}
                        onChange={(e) => setColor(slot.key, e.target.value)}
                        style={{
                          position: "absolute",
                          top: -4,
                          left: -4,
                          width: 44,
                          height: 44,
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: colors[slot.key] || slot.defaultColor,
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "var(--color-text)",
                          marginBottom: 1,
                        }}
                      >
                        {slot.label}
                      </div>
                      <div
                        style={{
                          fontSize: "0.68rem",
                          fontFamily: "var(--font-mono)",
                          color: "var(--color-muted)",
                        }}
                      >
                        {colors[slot.key] || slot.defaultColor}
                      </div>
                    </div>
                    <input
                      type="text"
                      value={colors[slot.key] || slot.defaultColor}
                      onChange={(e) => setColor(slot.key, e.target.value)}
                      style={{
                        width: 90,
                        padding: "4px 8px",
                        borderRadius: 6,
                        border: "1px solid var(--color-border)",
                        background: "var(--color-surface)",
                        color: "var(--color-text)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        textAlign: "center",
                        outline: "none",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Preview + Export */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Live preview */}
          <div
            className="glass-card"
            style={{
              borderRadius: 16,
              padding: "1.5rem",
              border: "1px solid rgba(255,106,26,0.06)",
              position: "relative",
              overflow: "hidden",
            }}
            data-theme="custom"
          >
            <style>{generateCSS(colors)}</style>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-muted)",
                marginBottom: "1rem",
              }}
            >
              Live Preview
            </div>

            <div
              style={{
                background: "var(--color-bg)",
                borderRadius: 12,
                padding: 24,
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "var(--brand-primary)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "0.8rem", color: "white",
                    boxShadow: "0 0 12px var(--brand-primary)",
                  }}
                >
                  Q
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-text)" }}>
                    Stareezy UI
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--color-text-2)" }}>
                    {colors["text.secondary"] || "#b09080"} · {colors["text.muted"] || "#6a5048"}
                  </div>
                </div>
                <div
                  style={{
                    padding: "4px 12px", borderRadius: 6, fontSize: "0.72rem",
                    fontWeight: 600,
                    background: "var(--brand-primary)",
                    color: isLight(colors["brand.primary"] || "#ff6a1a") ? "#000" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  Primary
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {["Design", "Code", "Preview"].map((t) => (
                  <div
                    key={t}
                    style={{
                      padding: "4px 12px", borderRadius: 6, fontSize: "0.75rem",
                      fontWeight: 600, cursor: "pointer",
                      background: t === "Code" ? "var(--brand-primary)" : "var(--color-surface)",
                      color: t === "Code" ? (isLight(colors["brand.primary"] || "#ff6a1a") ? "#000" : "#fff") : "var(--color-text-2)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: "var(--color-surface)",
                  borderRadius: 8,
                  padding: 16,
                  border: "1px solid var(--color-border)",
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text)", marginBottom: 6 }}>
                  Theme Preview
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-text-2)", lineHeight: 1.6 }}>
                  This is how your custom theme looks. All colors adapt to your
                  palette — backgrounds, text, borders, and brand accents.
                </div>
              </div>

              <div
                style={{
                  width: "100%", height: 6, borderRadius: 3,
                  background: "var(--color-surface)",
                  overflow: "hidden",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: "65%", height: "100%",
                    background: "linear-gradient(90deg, var(--brand-primary), var(--brand-accent))",
                    borderRadius: 3,
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex", gap: 8, flexWrap: "wrap",
                }}
              >
                {["brand.primary", "brand.accent", "brand.success", "brand.warning"].map((k) => (
                  <div
                    key={k}
                    style={{
                      width: 24, height: 24, borderRadius: 6,
                      background: `var(--${k.replace(".", "-")})`,
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    title={k}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Export */}
          <div
            className="glass-card"
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,106,26,0.06)",
            }}
          >
            <div
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,106,26,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-muted)" }}>
                  Export
                </span>
                <span className="pill-tag teal" style={{ fontSize: "0.6rem" }}>
                  CSS Variables
                </span>
              </div>
              <button
                onClick={() => setShowExport(!showExport)}
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "4px 10px", borderRadius: 6,
                  border: "1px solid rgba(255,106,26,0.15)",
                  background: "transparent",
                  color: "var(--color-text-2)",
                  fontSize: "0.75rem", cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                }}
              >
                {showExport ? "Hide" : "Show"} Code
              </button>
            </div>

            {showExport && (
              <div style={{ position: "relative" }}>
                <pre
                  style={{
                    margin: 0, padding: "16px",
                    background: "#010103",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    lineHeight: 1.6,
                    color: "#e2e8f0",
                    overflowX: "auto",
                    maxHeight: 300,
                  }}
                >
                  <code>{code}</code>
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                  }}
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    padding: "4px 10px",
                    borderRadius: 6,
                    border: "1px solid rgba(255,106,26,0.15)",
                    background: "rgba(13,5,8,0.8)",
                    color: "var(--color-text-2)",
                    fontSize: "0.7rem",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                  }}
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
