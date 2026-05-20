import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stareezy UI — Typed Design Token System",
  description:
    "A fully typed, cross-platform design token system and component library for React Native and web. 17+ components, 300+ typed tokens, aurora aesthetic.",
};

const PACKAGES = [
  {
    name: "@stareezy-ui/tokens",
    icon: "◉",
    color: "#00ff88",
    desc: "Zero-dependency token definitions. Colors, spacing, radius, typography, motion, glow — all typed.",
    badge: "Build first",
  },
  {
    name: "@stareezy-ui/runtime",
    icon: "⚡",
    color: "#7c3aed",
    desc: "O(1) style registry. resolve(token) is a single Map.get() — no parsing, no re-computation.",
    badge: "Core",
  },
  {
    name: "@stareezy-ui/components",
    icon: "⬡",
    color: "#00cc6a",
    desc: "17+ cross-platform components. Box, Text, Button, Input, Modal, Badge, Card, Toast and more.",
    badge: "17+ components",
  },
  {
    name: "@stareezy-ui/compiler",
    icon: "⚙",
    color: "#f59e0b",
    desc: "Babel/Vite plugin. Extracts token props at build time and emits atomic CSS — zero runtime cost.",
    badge: "Optional",
  },
  {
    name: "@stareezy-ui/stylesheet",
    icon: "◈",
    color: "#0ea5e9",
    desc: "Atomic CSS sheet management. Deduplicates rules, injects :root variables, handles theme switching.",
    badge: "Web",
  },
  {
    name: "@stareezy-ui/core",
    icon: "⬢",
    color: "#a78bfa",
    desc: "Utilities, hooks, and platform helpers. useDeviceLayout, useDocsTheme, string/date/currency utils.",
    badge: "Utilities",
  },
];

const QUICK_LINKS = [
  {
    href: "/docs/installation",
    label: "Installation",
    icon: "↓",
    desc: "Get running in 5 minutes",
  },
  {
    href: "/docs/usage",
    label: "Token API",
    icon: "◈",
    desc: "Learn the token system",
  },
  {
    href: "/docs/theming",
    label: "Theming",
    icon: "◑",
    desc: "Aurora, dark, and light",
  },
  {
    href: "/docs/create-ui",
    label: "createUi",
    icon: "◎",
    desc: "Configure at startup",
  },
  {
    href: "/docs/use-ui-config",
    label: "useUiConfig",
    icon: "⚛",
    desc: "Reactive config access",
  },
  {
    href: "/docs/components",
    label: "Components",
    icon: "⬡",
    desc: "17+ cross-platform",
  },
  {
    href: "/docs/compiler",
    label: "Compiler",
    icon: "⚙",
    desc: "Build-time optimization",
  },
  {
    href: "/tokens",
    label: "Token Explorer",
    icon: "◉",
    desc: "Browse 300+ tokens",
  },
];

const AURORA_PALETTE = [
  { name: "deepSpace", value: "#050505" },
  { name: "auroraGreen", value: "#00ff88" },
  { name: "nebulaPurple", value: "#7c3aed" },
  { name: "cosmicGray", value: "#1a1a2e" },
  { name: "surfaceDark", value: "#0a0a1a" },
  { name: "starWhite", value: "#ffffff" },
];

const CODE_PREVIEW = `import { createUi, motion, themes } from '@stareezy-ui/tokens'
import { Card, Badge, Toast } from '@stareezy-ui/components'

const ui = createUi({
  themes: { aurora: themes.aurora },
  animations: {
    enter: {
      duration: motion.duration.enter,
      easing: motion.easing.spring,
    },
  },
  shorthands: { bg: 'backgroundColor', p: 'padding' },
})

function AuroraCard() {
  return (
    <Card variant="glow" glowColor="green" title="Aurora UI">
      <Badge variant="green" label="v0.2.0" />
      <Toast variant="success" message="Tokens loaded!" />
    </Card>
  )
}`;

export default function HomePage() {
  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Hero */}
      <div
        className="animate-fade-up"
        style={{
          padding: "4rem 0 3.5rem",
          borderBottom: "1px solid var(--color-border)",
          marginBottom: "3.5rem",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            width: 400,
            height: 300,
            background:
              "radial-gradient(ellipse, rgba(0,255,136,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: "10%",
            width: 300,
            height: 250,
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Text block */}
        <div style={{ maxWidth: 640, marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "var(--brand-50)",
              border: "1px solid var(--brand-100)",
              borderRadius: 100,
              padding: "0.3rem 0.9rem",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "var(--brand-primary)",
              marginBottom: "1.75rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <span>◉</span>
            v0.2.0 — Aurora Release
          </div>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.06,
              marginBottom: "1.25rem",
              background:
                "linear-gradient(135deg, var(--color-text) 0%, var(--brand-primary) 55%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Design tokens,
            <br />
            fully typed.
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--color-text-2)",
              lineHeight: 1.75,
              marginBottom: "2rem",
              maxWidth: 520,
            }}
          >
            A cross-platform design token system and component library for React
            Native and web. Aurora aesthetic, O(1) runtime, build-time compiler
            — all tree-shakeable.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "2rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "300+", label: "Tokens" },
              { value: "17+ ", label: "Components" },
              { value: "7", label: "Packages" },
              { value: "O(1)", label: "Runtime" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--brand-primary)",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--color-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginTop: 3,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link
              href="/docs/installation"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--brand-primary)",
                color: "var(--color-bg)",
                padding: "0.7rem 1.5rem",
                borderRadius: "var(--radius-md)",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(0,255,136,0.2)",
              }}
            >
              Get Started →
            </Link>
            <Link
              href="/tokens"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "transparent",
                color: "var(--color-text)",
                padding: "0.7rem 1.5rem",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                border: "1px solid var(--color-border)",
              }}
            >
              ◉ Token Explorer
            </Link>
          </div>
        </div>

        {/* Code card — full width below the text */}
        <div
          style={{
            background: "var(--color-code-bg)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-lg)",
            overflow: "clip",
          }}
        >
          {/* macOS chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0.7rem 1rem",
              borderBottom: "1px solid var(--color-border)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div
                key={c}
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
            <span
              style={{
                marginLeft: 8,
                fontSize: "0.7rem",
                color: "var(--color-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              aurora-card.tsx
            </span>
          </div>
          {/* Scrollable code — two columns on wide screens */}
          <div style={{ overflowX: "auto" }}>
            <pre
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                lineHeight: 1.7,
                color: "#e2e8f0",
                margin: 0,
                padding: "1.5rem",
                whiteSpace: "pre",
                minWidth: "max-content",
              }}
            >
              <code>{CODE_PREVIEW}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Aurora palette strip */}
      <div style={{ marginBottom: "3.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-muted)",
              margin: 0,
            }}
          >
            Aurora Token Palette
          </p>
          <Link
            href="/tokens/aurora"
            style={{
              fontSize: "0.78rem",
              color: "var(--brand-primary)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            View all →
          </Link>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {AURORA_PALETTE.map((t) => (
            <div
              key={t.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                flex: "1 1 80px",
                minWidth: 80,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 48,
                  borderRadius: "var(--radius-md)",
                  background: t.value,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
              <div
                style={{
                  fontSize: "0.62rem",
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-mono)",
                  textAlign: "center",
                }}
              >
                {t.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Packages bento */}
      <div style={{ marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem",
            color: "var(--color-text)",
          }}
        >
          {"What's inside"}
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--color-text-2)",
            marginBottom: "1.5rem",
            lineHeight: 1.6,
          }}
        >
          Six focused packages — install only what you need.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "0.85rem",
          }}
        >
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.name}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "1.25rem",
                position: "relative",
                overflow: "hidden",
                animation: `fadeUp 0.5s ease ${i * 0.05}s both`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${pkg.color}60, transparent)`,
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-sm)",
                    background: `${pkg.color}18`,
                    border: `1px solid ${pkg.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    color: pkg.color,
                    flexShrink: 0,
                  }}
                >
                  {pkg.icon}
                </div>
                <span
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    color: pkg.color,
                    background: `${pkg.color}15`,
                    border: `1px solid ${pkg.color}25`,
                    borderRadius: 100,
                    padding: "2px 8px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {pkg.badge}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-mono)",
                  color: pkg.color,
                  marginBottom: "0.4rem",
                  fontWeight: 600,
                }}
              >
                {pkg.name}
              </div>
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "var(--color-text-2)",
                  lineHeight: 1.6,
                }}
              >
                {pkg.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div style={{ marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem",
            color: "var(--color-text)",
          }}
        >
          Explore the docs
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--color-text-2)",
            marginBottom: "1.5rem",
            lineHeight: 1.6,
          }}
        >
          Everything you need to build with Stareezy UI.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "0.65rem",
          }}
        >
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "0.85rem 1rem",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontSize: "1rem",
                  color: "var(--brand-primary)",
                  flexShrink: 0,
                  width: 20,
                  textAlign: "center",
                }}
              >
                {link.icon}
              </span>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "var(--color-text)",
                    marginBottom: 2,
                  }}
                >
                  {link.label}
                </div>
                <div
                  style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}
                >
                  {link.desc}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Install strip */}
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "1.75rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.25rem",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--color-text)",
              marginBottom: 4,
            }}
          >
            Ready to start?
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--color-text-2)" }}>
            Install the packages and be up and running in minutes.
          </div>
        </div>
        <div
          style={{
            background: "var(--color-code-bg)",
            borderRadius: "var(--radius-md)",
            padding: "0.65rem 1.25rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "#e2e8f0",
            border: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ color: "var(--brand-primary)" }}>$</span>
          <span>pnpm add @stareezy-ui/tokens @stareezy-ui/components</span>
        </div>
        <Link
          href="/docs/installation"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "var(--brand-primary)",
            color: "var(--color-bg)",
            padding: "0.65rem 1.5rem",
            borderRadius: "var(--radius-md)",
            fontWeight: 700,
            fontSize: "0.875rem",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          Installation guide →
        </Link>
      </div>
    </div>
  );
}
