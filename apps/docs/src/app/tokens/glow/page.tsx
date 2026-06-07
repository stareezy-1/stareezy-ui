import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glow Tokens",
  description: "Glow shadow token group — aurora-inspired box-shadow values.",
};

const GLOW_TOKENS = [
  {
    id: "glow-green",
    value: "0 0 20px rgba(0,255,136,0.25)",
    color: "#00ff88",
    label: "Green (subtle)",
    usage: "Default aurora-themed elements",
  },
  {
    id: "glow-purple",
    value: "0 0 20px rgba(124,58,237,0.3)",
    color: "#7c3aed",
    label: "Purple (subtle)",
    usage: "Accent elements",
  },
  {
    id: "glow-greenStrong",
    value: "0 0 40px rgba(0,255,136,0.5)",
    color: "#00ff88",
    label: "Green (strong)",
    usage: "Focused/active aurora elements",
  },
  {
    id: "glow-purpleStrong",
    value: "0 0 40px rgba(124,58,237,0.5)",
    color: "#7c3aed",
    label: "Purple (strong)",
    usage: "Focused/active accent elements",
  },
];

export default function GlowTokensPage() {
  return (
    <div className="prose" style={{ paddingBottom: "4rem" }}>
      <h1>Glow Tokens</h1>
      <p>
        The <code>glow</code> token group provides aurora-inspired{" "}
        <code>box-shadow</code> values for creating the signature glow effect on
        interactive elements.
      </p>

      <h2>Usage</h2>
      <pre>
        <code>{`import { glow } from '@stareezy-ui/tokens'

// Use as box-shadow
const style = {
  boxShadow: glow.green.value,
  // "0 0 20px rgba(0,255,136,0.25)"
}

// Use with Card component
<Card variant="glow" glowColor="green" title="Aurora Card" />`}</code>
      </pre>

      <h2>Token Reference</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginTop: "1.5rem",
        }}
      >
        {GLOW_TOKENS.map((tok) => (
          <div
            key={tok.id}
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "1.5rem",
              background: "var(--color-surface)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Visual preview */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  background: "#0a0a1a",
                  border: `1px solid ${tok.color}40`,
                  boxShadow: tok.value,
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginBottom: 4,
                }}
              >
                {tok.label}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-2)",
                  marginBottom: 6,
                }}
              >
                {tok.id}
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-muted)",
                  wordBreak: "break-all",
                }}
              >
                {tok.value}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-2)",
                  marginTop: 6,
                }}
              >
                {tok.usage}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
