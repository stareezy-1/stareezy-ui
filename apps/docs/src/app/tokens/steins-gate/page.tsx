import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steins;Gate Tokens",
  description:
    "Steins;Gate design token group — midnight navy aesthetic with electric blue and divergence red. El Psy Kongroo.",
};

const SG_TOKENS = [
  {
    id: "sg-labNight",
    value: "#080c18",
    usage: "Deepest background — midnight Akihabara",
  },
  {
    id: "sg-midnightNavy",
    value: "#0d1224",
    usage: "Primary surface — deep navy",
  },
  {
    id: "sg-surfaceNavy",
    value: "#131929",
    usage: "Secondary surface — slightly lifted navy",
  },
  {
    id: "sg-ibmBlue",
    value: "#4a9eff",
    usage: "Electric blue — IBN 5100 / D-mail glow, primary brand",
  },
  {
    id: "sg-ibmBlueDim",
    value: "#2d6db5",
    usage: "Dim electric blue — secondary accents",
  },
  {
    id: "sg-divergenceRed",
    value: "#e63030",
    usage: "Divergence meter red — danger states",
  },
  {
    id: "sg-steinerRed",
    value: "#ff4444",
    usage: "Reading Steiner flash — critical alerts",
  },
  {
    id: "sg-labTeal",
    value: "#2a9d8f",
    usage: "Muted teal — success / secondary accent",
  },
  {
    id: "sg-ivoryText",
    value: "#e8dcc8",
    usage: "Warm ivory — VN text box, primary text",
  },
  {
    id: "sg-ivoryDim",
    value: "#a89880",
    usage: "Dim ivory — secondary body text",
  },
  {
    id: "sg-borderNavy",
    value: "#1e2a42",
    usage: "Subtle border — barely visible navy line",
  },
  {
    id: "sg-textMuted",
    value: "#5a6a85",
    usage: "Muted text — placeholder / disabled",
  },
];

const SG_PALETTE = [
  { label: "Lab Night", hex: "#080c18", desc: "Deepest bg" },
  { label: "Midnight Navy", hex: "#0d1224", desc: "Surface" },
  { label: "Surface Navy", hex: "#131929", desc: "Surface 2" },
  { label: "IBM Blue", hex: "#4a9eff", desc: "Primary brand" },
  { label: "Divergence Red", hex: "#e63030", desc: "Danger" },
  { label: "Lab Teal", hex: "#2a9d8f", desc: "Success" },
  { label: "Ivory Text", hex: "#e8dcc8", desc: "Primary text" },
];

function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export default function SteinsGateTokensPage() {
  return (
    <div className="prose" style={{ paddingBottom: "4rem" }}>
      {/* Hero */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #080c18 0%, #0d1224 60%, #0f1530 100%)",
          borderRadius: 16,
          padding: "2rem 2.25rem",
          marginBottom: "2.5rem",
          border: "1px solid #1e2a42",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 220,
            height: 220,
            background:
              "radial-gradient(circle, rgba(74,158,255,0.12) 0%, transparent 70%)",
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
              "radial-gradient(circle, rgba(230,48,48,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#4a9eff",
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
            background: "linear-gradient(135deg, #e8dcc8 0%, #4a9eff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Steins;Gate
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "#a89880",
            margin: "0 0 1.5rem",
            lineHeight: 1.7,
            maxWidth: 500,
          }}
        >
          Midnight navy backgrounds, electric blue IBN 5100 glow, divergence
          meter red, and warm ivory text — drawn directly from the visual novel
          palette.
        </p>
        {/* Palette strip */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {SG_PALETTE.map((s) => (
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
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
              <div
                style={{
                  fontSize: "0.6rem",
                  color: "#5a6a85",
                  textAlign: "center",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "1.25rem",
            fontSize: "0.78rem",
            color: "#5a6a85",
            fontStyle: "italic",
          }}
        >
          "El Psy Kongroo."
        </div>
      </div>

      <h2>Usage</h2>
      <pre>
        <code>{`import { steinsGate } from '@stareezy-ui/tokens'

// Access token values
steinsGate.ibmBlue.value       // "#4a9eff"
steinsGate.labNight.value      // "#080c18"
steinsGate.divergenceRed.value // "#e63030"
steinsGate.ivoryText.value     // "#e8dcc8"

// Use in createUi themes
const ui = createUi({
  themes: { 'steins-gate': themes['steins-gate'] }
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
        {SG_TOKENS.map((tok) => {
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
        The <code>steinsGateVariants</code> export provides both dark (midnight
        lab) and light (daytime parchment) variants via <code>getVariant</code>.
      </p>
      <pre>
        <code>{`import { steinsGateVariants, getVariant } from '@stareezy-ui/tokens'

const darkTokens  = getVariant(steinsGateVariants, 'dark')
const lightTokens = getVariant(steinsGateVariants, 'light')

darkTokens.labNight.value   // "#080c18"
lightTokens.labNight.value  // "#f5f0e8"`}</code>
      </pre>

      <h2>Semantic mapping</h2>
      <p>
        When you use <code>themes[&apos;steins-gate&apos;]</code> in{" "}
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
            ["text.primary", "ivoryText", "#e8dcc8"],
            ["text.importantBrand", "ibmBlue", "#4a9eff"],
            ["text.danger", "divergenceRed", "#e63030"],
            ["text.success", "labTeal", "#2a9d8f"],
            ["backgrounds.primary", "ibmBlue", "#4a9eff"],
            ["backgrounds.primaryBlack", "labNight", "#080c18"],
            ["border.primaryBrand", "ibmBlue", "#4a9eff"],
            ["border.danger", "divergenceRed", "#e63030"],
          ].map(([slot, tok, val]) => (
            <tr key={slot}>
              <td>
                <code>{slot}</code>
              </td>
              <td>
                <code>steinsGate.{tok}</code>
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
