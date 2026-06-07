import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Tokens",
  description:
    "Aurora design token group — deep-space dark aesthetic with aurora green and nebula purple.",
};

const AURORA_TOKENS = [
  {
    id: "aurora-deepSpace",
    value: "#050505",
    usage: "Primary background — deepest dark",
  },
  {
    id: "aurora-auroraGreen",
    value: "#00ff88",
    usage: "Primary brand color — aurora green accent",
  },
  {
    id: "aurora-starWhite",
    value: "#ffffff",
    usage: "Primary text on dark backgrounds",
  },
  {
    id: "aurora-nebulaPurple",
    value: "#7c3aed",
    usage: "Secondary accent — nebula purple",
  },
  {
    id: "aurora-cosmicGray",
    value: "#1a1a2e",
    usage: "Surface-2 / elevated containers",
  },
  {
    id: "aurora-surfaceDark",
    value: "#0a0a1a",
    usage: "Card and panel backgrounds",
  },
  {
    id: "aurora-borderSubtle",
    value: "#2a2a3e",
    usage: "Subtle borders and dividers",
  },
  {
    id: "aurora-textMuted",
    value: "#888888",
    usage: "Muted / placeholder text",
  },
  {
    id: "aurora-textSecondary",
    value: "#aaaaaa",
    usage: "Secondary body text",
  },
  {
    id: "aurora-errorRed",
    value: "#ff4444",
    usage: "Error states and danger indicators",
  },
  {
    id: "aurora-warningAmber",
    value: "#f59e0b",
    usage: "Warning states and caution indicators",
  },
];

function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export default function AuroraTokensPage() {
  return (
    <div className="prose" style={{ paddingBottom: "4rem" }}>
      <h1>Aurora Tokens</h1>
      <p>
        The <code>aurora</code> token group defines the deep-space dark
        aesthetic inspired by the aurora-pdf design language. Aurora green (
        <code>#00ff88</code>) is the primary brand color; nebula purple (
        <code>#7c3aed</code>) is the accent.
      </p>

      <h2>Usage</h2>
      <pre>
        <code>{`import { aurora } from '@quasify-ui/tokens'

// Access token values
aurora.auroraGreen.value  // "#00ff88"
aurora.deepSpace.value    // "#050505"
aurora.nebulaPurple.value // "#7c3aed"

// Use in createUi themes
const ui = createUi({
  themes: { aurora: themes.aurora }
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
        {AURORA_TOKENS.map((tok) => {
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
        The aurora token group ships with first-class <code>dark</code> and{" "}
        <code>light</code> variants via <code>auroraVariants</code>. The{" "}
        <code>dark</code> variant is the base aurora palette. The{" "}
        <code>light</code> variant provides accessible light-mode equivalents.
      </p>
      <pre>
        <code>{`import { auroraVariants, getVariant } from '@quasify-ui/tokens'

const darkTokens = getVariant(auroraVariants, 'dark')
const lightTokens = getVariant(auroraVariants, 'light')

darkTokens.deepSpace.value  // "#050505"
lightTokens.deepSpace.value // "#f4f4f8"`}</code>
      </pre>
    </div>
  );
}
