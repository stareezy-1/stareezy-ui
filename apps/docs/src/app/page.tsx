import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stareezy UI — Typed Design Token System",
  description:
    "A fully typed, cross-platform design token system and component library for React Native and web.",
};

const FEATURES = [
  {
    icon: "⬡",
    title: "Typed Tokens",
    desc: "Every color, spacing, and radius value is a typed Token<T> object with full autocomplete.",
    color: "#024CCE",
    bg: "#E6EDFA",
  },
  {
    icon: "⚡",
    title: "O(1) Runtime",
    desc: "Style registry built once at init. resolve(token) is a single Map.get() — zero parsing.",
    color: "#4D8D01",
    bg: "#F3FFE3",
  },
  {
    icon: "⚙",
    title: "Build Compiler",
    desc: "Babel/Vite plugin extracts token props at build time, emitting atomic CSS classes.",
    color: "#C98B25",
    bg: "#FEF4E2",
  },
  {
    icon: "◑",
    title: "Theme System",
    desc: "Light/dark themes via CSS variables. Switch themes with zero JS re-renders.",
    color: "#C20219",
    bg: "#FFE9EC",
  },
  {
    icon: "◈",
    title: "Cross-Platform",
    desc: "Same token API on web and React Native. One source of truth for all platforms.",
    color: "#0C9182",
    bg: "#E7FDFA",
  },
  {
    icon: "⬢",
    title: "Tree-Shakeable",
    desc: "Import only colors without pulling in spacing or typography. Zero dead code.",
    color: "#5D2555",
    bg: "#F9DEDE",
  },
];

const QUICK_LINKS = [
  {
    href: "/docs/installation",
    label: "Installation",
    desc: "Get up and running in minutes",
  },
  { href: "/docs/usage", label: "Usage Guide", desc: "Learn the token API" },
  {
    href: "/docs/theming",
    label: "Theming",
    desc: "Light, dark, and custom themes",
  },
  {
    href: "/docs/components",
    label: "Component API",
    desc: "70+ cross-platform components",
  },
  {
    href: "/tokens",
    label: "Token Explorer",
    desc: "Browse all design tokens visually",
  },
];

export default function HomePage() {
  return (
    <div style={{ paddingBottom: "4rem" }}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div
        className="animate-fade-up"
        style={{
          padding: "3.5rem 0 3rem",
          borderBottom: "1px solid var(--color-border-2)",
          marginBottom: "3rem",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "var(--brand-50)",
            border: "1px solid var(--brand-100)",
            borderRadius: "100px",
            padding: "0.3rem 0.85rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--brand-500)",
            marginBottom: "1.5rem",
            letterSpacing: "0.02em",
          }}
        >
          <span style={{ animation: "pulse-ring 2s infinite" }}>◉</span>
          v0.0.1 — Now in Beta
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
            background:
              "linear-gradient(135deg, #0F1010 0%, #024CCE 60%, #14F1D8 100%)",
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
            fontSize: "1.15rem",
            color: "var(--color-text-2)",
            maxWidth: 560,
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          A cross-platform design token system and component library for React
          Native and web. Replace string-based styles with statically
          analyzable, compiler-friendly token objects.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link
            href="/docs/installation"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "var(--brand-500)",
              color: "white",
              padding: "0.7rem 1.5rem",
              borderRadius: "var(--radius-md)",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(2,76,206,0.35)",
              transition: "all 0.2s",
            }}
          >
            Get Started →
          </Link>
          <Link
            href="/tokens"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              padding: "0.7rem 1.5rem",
              borderRadius: "var(--radius-md)",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              border: "1px solid var(--color-border)",
              transition: "all 0.2s",
            }}
          >
            ◉ Token Explorer
          </Link>
        </div>
      </div>

      {/* ── Code preview ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#0d1117",
          borderRadius: "var(--radius-lg)",
          padding: "1.5rem",
          marginBottom: "3rem",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "var(--shadow-lg)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Window chrome */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "1.25rem" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div
              key={c}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </div>
        <pre
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            lineHeight: 1.7,
            color: "#e2e8f0",
            overflow: "auto",
            margin: 0,
          }}
        >
          <code>{`import { colors, spacing, radius } from '@stareezy-ui/tokens'
import { Box, Text, Button } from '@stareezy-ui/components'

function Card() {
  return (
    <Box
      bg={colors.celurenBlue[500]}
      p={spacing[4]}
      rounded={radius.md}
    >
      <Text
        type="M-heading-bold"
        color={colors.neutral[10].value}
        text="Hello, Stareezy UI"
      />
      <Button variant="primary" text="Get Started" />
    </Box>
  )
}`}</code>
        </pre>
      </div>

      {/* ── Features grid ────────────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: "1.35rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          marginBottom: "1.25rem",
          color: "var(--color-text)",
        }}
      >
        Why Stareezy UI?
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border-2)",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem",
              transition: "all 0.2s",
              animation: `fadeUp 0.5s ease ${i * 0.06}s both`,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: f.bg,
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                color: f.color,
                marginBottom: "0.85rem",
              }}
            >
              {f.icon}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.95rem",
                marginBottom: "0.4rem",
                color: "var(--color-text)",
              }}
            >
              {f.title}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "var(--color-text-2)",
                lineHeight: 1.6,
              }}
            >
              {f.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ── Quick links ──────────────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: "1.35rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          marginBottom: "1.25rem",
          color: "var(--color-text)",
        }}
      >
        Explore the docs
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: "block",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border-2)",
              borderRadius: "var(--radius-md)",
              padding: "1rem 1.25rem",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "var(--brand-500)",
                marginBottom: "0.25rem",
              }}
            >
              {link.label} →
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
              {link.desc}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
