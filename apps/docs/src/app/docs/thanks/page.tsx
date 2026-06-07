import type { Metadata } from "next";
import { DocPage, Callout } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Special Thanks",
  description:
    "Kukuh Satria Putra — the UI/UX designer behind every color, spacing, radius, and typography token in Quasify UI.",
  alternates: { canonical: "https://ui.quasify.app/docs/thanks" },
  openGraph: {
    title: "Special Thanks — Quasify UI",
    description:
      "Kukuh Satria Putra — the UI/UX designer behind every color, spacing, radius, and typography token in Quasify UI.",
    url: "https://ui.quasify.app/docs/thanks",
  },
};

const TOKEN_CONTRIBUTIONS = [
  {
    category: "Colors",
    icon: "◉",
    color: "#024CCE",
    bg: "#E6EDFA",
    tokens: [
      "celurenBlue",
      "auroraGreen",
      "nebulaPurple",
      "cosmicGray",
      "starWhite",
    ],
    desc: "The full aurora palette — every hue, shade, and semantic alias.",
  },
  {
    category: "Typography",
    icon: "T",
    color: "#4D8D01",
    bg: "#F3FFE3",
    tokens: ["M-heading-bold", "M-body-regular", "M-caption-medium"],
    desc: "Type scale, weight pairings, and line-height rhythm.",
  },
  {
    category: "Spacing",
    icon: "⬡",
    color: "#0C9182",
    bg: "#E7FDFA",
    tokens: [
      "spacing[1]",
      "spacing[2]",
      "spacing[4]",
      "spacing[6]",
      "spacing[8]",
    ],
    desc: "The 4-point grid that keeps every layout consistent.",
  },
  {
    category: "Radius",
    icon: "◎",
    color: "#C98B25",
    bg: "#FEF4E2",
    tokens: ["radius.sm", "radius.md", "radius.lg", "radius.full"],
    desc: "Corner rounding values from sharp to pill.",
  },
];

export default function ThanksPage() {
  return (
    <DocPage
      title="Special Thanks"
      description="The design foundation of Quasify UI was shaped by one person."
      badge="Credits"
      badgeColor="#dc143c"
      icon="✦"
    >
      {/* Hero card */}
      <div
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          marginBottom: "2.5rem",
          border: "1px solid rgba(255,106,26,0.2)",
        }}
      >
        {/* Quasar deep-space gradient background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #080400 0%, #0a0a1a 35%, #1a0505 70%, #050005 100%)",
          }}
        />
        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -40,
            width: 280,
            height: 280,
            background:
              "radial-gradient(circle, rgba(255,106,26,0.15) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -20,
            width: 220,
            height: 220,
            background:
              "radial-gradient(circle, rgba(220,20,60,0.18) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            padding: "clamp(1.75rem, 5vw, 3rem) clamp(1.5rem, 5vw, 2.75rem)",
          }}
        >
          {/* Avatar ring */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ff6a1a, #dc143c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.75rem",
              marginBottom: "1.5rem",
              boxShadow: "0 0 32px rgba(255,106,26,0.3)",
            }}
          >
            ◈
          </div>

          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#ff6a1a",
              marginBottom: "0.6rem",
            }}
          >
            UI / UX Designer
          </div>

          <h2
            style={{
              fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: "0 0 1rem",
              background:
                "linear-gradient(135deg, #f8f0e8 0%, #ff6a1a 50%, #dc143c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Kukuh Satria Putra
          </h2>

          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.75,
              maxWidth: 520,
              margin: 0,
            }}
          >
            Every color you see, every spacing value you use, every radius and
            type scale in this library — Kukuh designed them. He translated
            vision into a coherent token system that makes Quasify UI feel like
            a real design language, not just a collection of components.
          </p>
        </div>
      </div>

      <Callout type="tip">
        Good design tokens are invisible — they just feel right. That&apos;s
        exactly what Kukuh delivered.
      </Callout>

      <h2 className="gradient-text">What he designed</h2>
      <p>
        Kukuh&apos;s work covers every foundational token category. Here&apos;s
        a breakdown of what he contributed:
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "0.85rem",
          margin: "1.5rem 0 2rem",
        }}
      >
        {TOKEN_CONTRIBUTIONS.map((item) => (
          <div
            key={item.category}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 14,
              padding: "1.1rem 1.25rem",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 0 20px rgba(255,106,26,0.06)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "0.65rem",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: item.bg,
                  border: `1px solid ${item.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: item.color,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "var(--color-text)",
                }}
              >
                {item.category}
              </span>
            </div>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--color-text-2)",
                lineHeight: 1.55,
                margin: "0 0 0.75rem",
              }}
            >
              {item.desc}
            </p>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {item.tokens.map((t) => (
                <code
                  key={t}
                  style={{
                    fontSize: "0.68rem",
                    background: `${item.color}12`,
                    color: item.color,
                    border: `1px solid ${item.color}25`,
                    borderRadius: 5,
                    padding: "0.1rem 0.4rem",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {t}
                </code>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="gradient-text">A note from the dev</h2>
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid rgba(255,106,26,0.12)",
          borderRadius: 16,
          padding: "1.5rem 1.75rem",
          position: "relative",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            lineHeight: 1,
            color: "#ff6a1a",
            opacity: 0.35,
            position: "absolute",
            top: "0.75rem",
            left: "1.25rem",
            fontFamily: "Georgia, serif",
            userSelect: "none",
          }}
        >
          "
        </div>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text)",
            lineHeight: 1.8,
            margin: "0.5rem 0 1rem",
            paddingLeft: "1.25rem",
            fontStyle: "italic",
          }}
        >
          Building a design system without a designer is like writing a song
          without melody. Kukuh brought the melody. He handed me a token system
          that was already coherent, already beautiful — I just had to wire it
          up. Every time someone says the UI feels polished, that&apos;s his
          work showing through.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            paddingLeft: "1.25rem",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ff6a1a, #dc143c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
            }}
          >
            ◈
          </div>
          <div>
            <div
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "var(--color-text)",
              }}
            >
              The developer
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--color-muted)" }}>
              Quasify UI
            </div>
          </div>
        </div>
      </div>

      <Callout type="info">
        Kukuh&apos;s token decisions are baked into every component in this
        library. If you&apos;re using <code>colors.celurenBlue[500].value</code>
        , <code>spacing[4].value</code>, or <code>radius.md.value</code> — you
        are using his design work directly.
      </Callout>
    </DocPage>
  );
}
