import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quasar Tokens",
  description:
    "Quasar design token group — blazing plasma jet aesthetic with deep space backgrounds, plasma orange brand, and accretion disk crimson.",
};

const QUASAR_TOKENS = [
  {
    id: "quasar-voidBlack",
    value: "#020205",
    usage: "Deepest background — void of deep space",
  },
  {
    id: "quasar-nebulaDark",
    value: "#0d0508",
    usage: "Primary surface — nebula dark",
  },
  {
    id: "quasar-accretionSurface",
    value: "#160a0e",
    usage: "Elevated surface — accretion glow lifted",
  },
  {
    id: "quasar-plasmaOrange",
    value: "#ff6a1a",
    usage: "Plasma jet orange — primary brand color",
  },
  {
    id: "quasar-plasmaDim",
    value: "#c94a00",
    usage: "Dim plasma — secondary accent / hover states",
  },
  {
    id: "quasar-accretionCrimson",
    value: "#dc143c",
    usage: "Accretion disk crimson — danger / accent",
  },
  {
    id: "quasar-flareRed",
    value: "#ff3355",
    usage: "Bright crimson — error / critical alerts",
  },
  {
    id: "quasar-stellarTeal",
    value: "#22c55e",
    usage: "Stellar teal — success states",
  },
  {
    id: "quasar-starWhite",
    value: "#f8f0e8",
    usage: "Star warm-white — primary text",
  },
  {
    id: "quasar-starDim",
    value: "#b09080",
    usage: "Dim star — secondary body text",
  },
  {
    id: "quasar-nebulaBorder",
    value: "#2a100a",
    usage: "Nebula border — subtle plasma edge",
  },
  {
    id: "quasar-voidMuted",
    value: "#6a5048",
    usage: "Void muted — placeholder / disabled text",
  },
  {
    id: "quasar-warningAmber",
    value: "#f5a623",
    usage: "Warning amber — caution states",
  },
];

const QUASAR_PALETTE = [
  { label: "Void Black", hex: "#020205", desc: "Deepest bg" },
  { label: "Nebula Dark", hex: "#0d0508", desc: "Surface" },
  { label: "Accretion", hex: "#160a0e", desc: "Surface 2" },
  { label: "Plasma Orange", hex: "#ff6a1a", desc: "Primary brand" },
  { label: "Crimson", hex: "#dc143c", desc: "Accent / Danger" },
  { label: "Stellar Teal", hex: "#22c55e", desc: "Success" },
  { label: "Star White", hex: "#f8f0e8", desc: "Primary text" },
];

function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export default function QuasarTokensPage() {
  return (
    <div className="prose" style={{ paddingBottom: "4rem" }}>
      {/* Hero */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #020205 0%, #0d0508 60%, #160a0e 100%)",
          borderRadius: 16,
          padding: "2rem 2.25rem",
          marginBottom: "2.5rem",
          border: "1px solid #2a100a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Plasma glow blobs */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 240,
            height: 240,
            background:
              "radial-gradient(circle, rgba(255,106,26,0.14) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: 60,
            width: 160,
            height: 160,
            background:
              "radial-gradient(circle, rgba(220,20,60,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#ff6a1a",
            marginBottom: "0.5rem",
          }}
        >
          Token Group
        </div>
        <h1
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            margin: "0 0 0.75rem",
            background: "linear-gradient(135deg, #f8f0e8 0%, #ff6a1a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Quasar
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "#b09080",
            margin: "0 0 1.5rem",
            lineHeight: 1.7,
            maxWidth: 520,
          }}
        >
          Deep void-black space backgrounds, blazing plasma-jet orange as the
          primary brand, accretion disk crimson as the accent — inspired by the
          astronomical quasar phenomenon. Used as the default theme in the
          Quasar developer tools app.
        </p>
        {/* Palette strip */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {QUASAR_PALETTE.map((s) => (
            <div
              key={s.hex}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: s.hex,
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    s.hex === "#ff6a1a"
                      ? "0 0 12px rgba(255,106,26,0.4)"
                      : "none",
                }}
              />
              <div
                style={{
                  fontSize: "0.6rem",
                  color: "#6a5048",
                  textAlign: "center",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2>Usage</h2>
      <pre>
        <code>{`import { quasar } from '@quasify-ui/tokens'

// Access token values
quasar.plasmaOrange.value      // "#ff6a1a"
quasar.voidBlack.value         // "#020205"
quasar.accretionCrimson.value  // "#dc143c"
quasar.starWhite.value         // "#f8f0e8"
quasar.stellarTeal.value       // "#22c55e"

// Use in createUi themes
const ui = createUi({
  themes: { quasar: themes['quasar'] }
})`}</code>
      </pre>

      <h2>Token Reference</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        {QUASAR_TOKENS.map((tok) => {
          const light = isLight(tok.value);
          return (
            <div
              key={tok.id}
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                background: "var(--color-surface)",
              }}
            >
              <div
                style={{
                  height: 64,
                  background: tok.value,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "0.4rem 0.6rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontFamily: "var(--font-mono)",
                    color: light ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)",
                    background: light ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.4)",
                    borderRadius: 3,
                    padding: "1px 5px",
                  }}
                >
                  {tok.value}
                </span>
              </div>
              <div style={{ padding: "0.75rem" }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    fontFamily: "var(--font-mono)",
                    marginBottom: 4,
                  }}
                >
                  {tok.id}
                </div>
                <div
                  style={{ fontSize: "0.75rem", color: "var(--color-text-2)" }}
                >
                  {tok.usage}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h2>Dark / Light Variants</h2>
      <p>
        The <code>quasarVariants</code> export provides both dark (deep space)
        and light (ember glow on ivory) variants via <code>getVariant</code>.
      </p>
      <pre>
        <code>{`import { quasarVariants, getVariant } from '@quasify-ui/tokens'

const darkTokens  = getVariant(quasarVariants, 'dark')
const lightTokens = getVariant(quasarVariants, 'light')

darkTokens.voidBlack.value    // "#020205"
lightTokens.voidBlack.value   // "#fdf6f0"

darkTokens.plasmaOrange.value  // "#ff6a1a"
lightTokens.plasmaOrange.value // "#c94a00"`}</code>
      </pre>

      <h2>Semantic mapping</h2>
      <p>
        When you use <code>themes[&apos;quasar&apos;]</code> in{" "}
        <code>createUi</code>, the semantic slots map as follows:
      </p>
      <table>
        <thead>
          <tr>
            <th>Semantic slot</th>
            <th>Token</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["text.primary", "starWhite", "#f8f0e8"],
            ["text.importantBrand", "plasmaOrange", "#ff6a1a"],
            ["text.danger", "flareRed", "#ff3355"],
            ["text.success", "stellarTeal", "#22c55e"],
            ["backgrounds.primary", "plasmaOrange", "#ff6a1a"],
            ["backgrounds.primaryBlack", "voidBlack", "#020205"],
            ["border.primaryBrand", "plasmaOrange", "#ff6a1a"],
            ["border.danger", "accretionCrimson", "#dc143c"],
          ].map(([slot, tok, val]) => (
            <tr key={slot}>
              <td>
                <code>{slot}</code>
              </td>
              <td>
                <code>quasar.{tok}</code>
              </td>
              <td>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 3,
                      background: val,
                      display: "inline-block",
                      border: "1px solid rgba(0,0,0,0.15)",
                      flexShrink: 0,
                    }}
                  />
                  <code>{val}</code>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
