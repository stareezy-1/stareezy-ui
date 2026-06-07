import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink } from "../components/TrackedLink";

export const metadata: Metadata = {
  title:
    "Quasify UI — Build Cross-Platform UIs with Quasar Design Tokens",
  description:
    "A fully typed, cross-platform design token system and component library for React Native and web. 31+ components, 300+ typed tokens, 5 themes, O(1) runtime.",
};

const PACKAGES = [
  {
    name: "@quasify-ui/tokens",
    icon: "◉",
    color: "#ff6a1a",
    desc: "Zero-dependency token definitions. Colors, spacing, radius, typography, motion — all typed. Includes ThemeProvider and the t accessor.",
    badge: "Core",
  },
  {
    name: "@quasify-ui/components",
    icon: "⬡",
    color: "#22c55e",
    desc: "31+ cross-platform components. All theme-reactive. ./server RSC-safe entry. Every component accepts BoxLayoutProps + $-prefixed breakpoint props.",
    badge: "31+ components",
  },
  {
    name: "@quasify-ui/runtime",
    icon: "⚡",
    color: "#f5a623",
    desc: "O(1) style registry. resolve(token) is a single Map.get() — no parsing, no re-computation.",
    badge: "Core",
  },
  {
    name: "@quasify-ui/compiler",
    icon: "⚙",
    color: "#dc143c",
    desc: "Babel/Vite/Metro plugin. Extracts token props at build time and emits atomic CSS — zero runtime cost. Works on Vite 4–7, Next.js 14–16, Expo 54–56.",
    badge: "Optional",
  },
  {
    name: "@quasify-ui/core",
    icon: "⬢",
    color: "#a78bfa",
    desc: "Utilities, hooks, and platform helpers. useDeviceLayout, platform detection, string/date/currency utils.",
    badge: "Utilities",
  },
  {
    name: "@quasify-ui/cli",
    icon: "▶",
    color: "#f59e0b",
    desc: "First-party CLI. `quasify create` scaffolds pre-wired Next.js, Vite, or Expo projects. `quasify add` installs components with dep resolution.",
    badge: "New",
  },
];

const THEMES = [
  {
    name: "quasar",
    bg: "#020205",
    accent: "#ff6a1a",
    text: "#f8f0e8",
    desc: "Deep space plasma",
  },
  {
    name: "aurora",
    bg: "#050505",
    accent: "#00ff88",
    text: "#f0f0f8",
    desc: "Deep space aurora",
  },
  {
    name: "steins-gate",
    bg: "#080c18",
    accent: "#4a9eff",
    text: "#e8dcc8",
    desc: "Midnight navy",
  },
  {
    name: "dark",
    bg: "#0d1117",
    accent: "#024cce",
    text: "#f0f6fc",
    desc: "GitHub-style dark",
  },
  {
    name: "light",
    bg: "#fafbff",
    accent: "#024cce",
    text: "#0f1010",
    desc: "Clean light",
  },
];

const QUICK_LINKS = [
  { href: "/docs/installation", label: "Installation", icon: "↓", desc: "Get running in 5 minutes" },
  { href: "/docs/quick-start", label: "Quick Start", icon: "▶", desc: "Build your first UI in 10 steps" },
  { href: "/docs/theming", label: "Theming", icon: "◑", desc: "5 themes, auto-switching" },
  { href: "/docs/components", label: "Components", icon: "⬡", desc: "31+ cross-platform" },
  { href: "/docs/cli", label: "CLI", icon: "▶", desc: "Scaffold with one command" },
  { href: "/docs/responsive", label: "Responsive", icon: "⊞", desc: "Config-driven breakpoints" },
  { href: "/tokens", label: "Token Explorer", icon: "◉", desc: "Browse all 300+ tokens" },
  { href: "/docs/compiler", label: "Compiler", icon: "⚙", desc: "Build-time optimization" },
];

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "Frontend Lead @ TechCorp", text: "Quasify's token system is the most intuitive I've ever used. The theme switching is seamless." },
  { name: "Marcus Rivera", role: "Indie Developer", text: "Built my entire SaaS landing page in one afternoon. The CLI + component library is incredible." },
  { name: "Aiko Tanaka", role: "Mobile Engineer", text: "Finally, a design system that works identically on web and React Native. No more platform hacks." },
  { name: "James Wilson", role: "Design Engineer", text: "The t accessor is genius. Theme-reactive props eliminate so much boilerplate." },
  { name: "Priya Patel", role: "Startup CTO", text: "We migrated our entire design system to Quasify in two days. The type safety is unmatched." },
  { name: "Alex Foster", role: "UI Developer", text: "O(1) runtime and build-time compiler? This is how a UI library should be built." },
];

const FEATURES = [
  {
    icon: "◉",
    title: "Design Tokens",
    desc: "300+ fully typed tokens spanning colors, spacing, typography, radius, shadows, motion — all tree-shakeable and theme-reactive.",
    color: "#ff6a1a",
  },
  {
    icon: "⬡",
    title: "Cross-Platform",
    desc: "One codebase for React Native and web. Every component works identically on iOS, Android, and the browser with zero platform-specific code.",
    color: "#22c55e",
  },
  {
    icon: "⚡",
    title: "O(1) Runtime",
    desc: "Zero parsing overhead. Token resolution is a single Map.get() call. No runtime style computation means faster renders and smaller bundles.",
    color: "#f5a623",
  },
  {
    icon: "⚙",
    title: "Build-Time Compiler",
    desc: "Optional Babel/Vite/Metro plugin that extracts token props at build time and emits atomic CSS. Zero runtime cost for production builds.",
    color: "#dc143c",
  },
  {
    icon: "◑",
    title: "5 Themes",
    desc: "Quasar, Aurora, Steins;Gate, Dark, and Light — all with semantic color mappings. Switch themes at runtime and every component updates automatically.",
    color: "#a78bfa",
  },
  {
    icon: "▶",
    title: "CLI + Templates",
    desc: "One command to scaffold a pre-wired Next.js, Vite, or Expo project with Quasify configured. Add individual components with dependency resolution.",
    color: "#f59e0b",
  },
];

const STARS = Array.from({ length: 50 }, (_, i) => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  size: Math.random() > 0.8 ? 3 : 2,
  opacity: 0.3 + Math.random() * 0.7,
}));

const AI_PILLS = [
  { label: "Landing Page", color: "orange" },
  { label: "Dashboard", color: "teal" },
  { label: "Mobile App", color: "crimson" },
  { label: "Form Builder", color: "amber" },
  { label: "E-Commerce", color: "teal" },
  { label: "Admin Panel", color: "orange" },
];

export default function HomePage() {
  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="animate-fade-up"
        style={{
          padding: "5rem 0 4rem",
          borderBottom: "1px solid var(--color-border)",
          marginBottom: "4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div className="hero-grid-overlay" />

        {/* Glow orbs */}
        <div className="glow-orb orange" style={{ top: "5%", right: "10%", width: 400, height: 400 }} />
        <div className="glow-orb crimson" style={{ bottom: "10%", left: "5%", width: 300, height: 300 }} />
        <div className="glow-orb teal" style={{ top: "40%", left: "40%", width: 250, height: 250 }} />

        {/* Stars */}
        {STARS.map((s, i) => (
          <div
            key={i}
            className="star-particle"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              opacity: s.opacity,
            }}
          />
        ))}

        <div style={{ maxWidth: 680, marginBottom: "3rem", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div
            className="animate-scale-in"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255, 106, 26, 0.08)",
              border: "1px solid rgba(255, 106, 26, 0.2)",
              borderRadius: 100,
              padding: "4px 12px 4px 6px",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "#ff6a1a",
              marginBottom: "1.75rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                background: "linear-gradient(135deg, #ff6a1a, #dc143c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.6rem",
                color: "white",
              }}
            >
              S
            </span>
            v1.1.0 — CLI + Stabilization Release
          </div>

          {/* Heading */}
          <h1
            className="animate-slide-up"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: "1.25rem",
            }}
          >
            <span className="gradient-text">
              Build Cross-Platform
            </span>
            <br />
            <span className="gradient-text-orange">
              UIs with Quasar
            </span>
          </h1>

          <p
            className="animate-slide-up"
            style={{
              fontSize: "1.05rem",
              color: "var(--color-text-2)",
              lineHeight: 1.75,
              marginBottom: "2rem",
              maxWidth: 520,
              animationDelay: "0.1s",
            }}
          >
            A fully typed design token system and component library for{" "}
            <span className="pill-tag orange">React Native</span>{" "}
            <span className="pill-tag teal">Web</span>{" "}
            <span className="pill-tag crimson">Expo</span>
            . Five premium themes, O(1) runtime, build-time compiler — all tree-shakeable.
          </p>

          {/* Stats */}
          <div
            className="animate-slide-up"
            style={{
              display: "flex",
              gap: "2.5rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
              animationDelay: "0.2s",
            }}
          >
            {[
              { value: "300+", label: "Tokens" },
              { value: "31+", label: "Components" },
              { value: "5", label: "Themes" },
              { value: "O(1)", label: "Runtime" },
            ].map((s) => (
              <div key={s.label}>
                <div className="stat-value">{s.value}</div>
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
          <div
            className="animate-slide-up"
            style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", animationDelay: "0.3s" }}
          >
            <TrackedLink
              href="/docs/installation"
              trackLabel="Get Started"
              className="cta-primary"
            >
              Get Started →
            </TrackedLink>
            <TrackedLink
              href="/tokens"
              trackLabel="Token Explorer"
              className="cta-outline"
            >
              ◉ Token Explorer
            </TrackedLink>
            <a
              href="https://github.com/quasify-ui/quasify-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-outline"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              ↗ GitHub
            </a>
          </div>
        </div>

        {/* Code preview */}
        <div
          className="code-window animate-scale-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="code-window-header">
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
              app.tsx
            </span>
          </div>
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
              <code>{`import { createUi, t, themes } from '@quasify-ui/tokens'
import { Box, Text, Button } from '@quasify-ui/components'

const ui = createUi({
  themes: {
    quasar: themes.quasar,
    aurora: themes.aurora,
  },
})

<ThemeProvider theme="quasar">
  <Box bg={t.backgrounds.primary}
       p={16} rounded={12}>
    <Text color={t.text.primary}
          type="M-heading-bold">
      Theme-reactive with t.*
    </Text>
    <Button text="Click me"
            bg={t.backgrounds.primary} />
  </Box>
</ThemeProvider>`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ── Quasify AI Builder ──────────────────────────────────────────── */}
      <section
        style={{
          marginBottom: "4rem",
          padding: "3rem",
          borderRadius: 20,
          background: "linear-gradient(135deg, rgba(255,106,26,0.03) 0%, rgba(220,20,60,0.02) 50%, rgba(13,5,8,0.8) 100%)",
          border: "1px solid rgba(255,106,26,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="glow-orb orange" style={{ top: "-20%", right: "-10%", width: 300, height: 300 }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <div>
              <div
                className="pill-tag orange"
                style={{ marginBottom: "0.75rem" }}
              >
                ✦ New — AI-Powered
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  margin: 0,
                  color: "var(--color-text)",
                }}
              >
                Build with{" "}
                <span className="gradient-text-orange">Quasify AI</span>
              </h2>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-text-2)",
                  margin: "0.5rem 0 0",
                  maxWidth: 480,
                  lineHeight: 1.7,
                }}
              >
                Describe the UI you want in plain English — Quasify AI generates
                production-ready code using your design tokens and components.
              </p>
            </div>
          </div>

          {/* Chat input */}
          <div
            className="ai-input-wrapper"
            style={{ marginBottom: "1rem", maxWidth: 640 }}
          >
            <input
              type="text"
              className="ai-input"
              placeholder='Describe the UI you want to build... e.g. "A landing page hero with gradient text and CTA button"'
              readOnly
            />
            <button className="ai-submit-btn" aria-label="Generate with AI">
              →
            </button>
          </div>

          {/* Quick action chips */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "2rem",
            }}
          >
            {AI_PILLS.map((pill) => (
              <span key={pill.label} className={`chip-button ${pill.color}`}>
                {pill.label === "Landing Page" && "◈ "}
                {pill.label === "Dashboard" && "⊞ "}
                {pill.label === "Mobile App" && "⬡ "}
                {pill.label === "Form Builder" && "◻ "}
                {pill.label === "E-Commerce" && "◉ "}
                {pill.label === "Admin Panel" && "⬢ "}
                {pill.label}
              </span>
            ))}
          </div>

          {/* AI Features grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {[
              { icon: "✦", title: "AI-Powered", desc: "Natural language to components", color: "#ff6a1a" },
              { icon: "▶", title: "Real-time Preview", desc: "See your UI as you describe it", color: "#22c55e" },
              { icon: "⬡", title: "Export Code", desc: "Production-ready Quasify components", color: "#f5a623" },
              { icon: "◑", title: "Custom Themes", desc: "Auto-adapts to your theme tokens", color: "#dc143c" },
            ].map((f) => (
              <div
                key={f.title}
                className="glass-card"
                style={{
                  borderRadius: 12,
                  padding: "1.25rem",
                  transition: "all 0.25s",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `${f.color}15`,
                    border: `1px solid ${f.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    color: f.color,
                    marginBottom: "0.75rem",
                  }}
                >
                  {f.icon}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "var(--color-text)",
                    marginBottom: 4,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{ fontSize: "0.8rem", color: "var(--color-text-2)", lineHeight: 1.5 }}
                >
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features bento ─────────────────────────────────────────────── */}
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: "0 0 0.5rem",
              color: "var(--color-text)",
            }}
          >
            Everything you need to build UIs
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-2)",
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 500,
            }}
          >
            A complete toolkit — from design tokens to production components — built for
            cross-platform development.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "0.85rem",
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="glass-card"
              style={{
                borderRadius: 14,
                padding: "1.5rem",
                animation: `slideUp 0.5s ease ${i * 0.05}s both`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)`,
                }}
              />
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${f.color}12`,
                  border: `1px solid ${f.color}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  color: f.color,
                  marginBottom: "1rem",
                }}
              >
                {f.icon}
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--color-text)",
                  marginBottom: "0.5rem",
                }}
              >
                {f.title}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-text-2)",
                  lineHeight: 1.65,
                }}
              >
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────── */}
      <section
        style={{
          marginBottom: "4rem",
          padding: "3rem",
          borderRadius: 20,
          background: "rgba(13,5,8,0.4)",
          border: "1px solid rgba(255,106,26,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="glow-orb crimson" style={{ bottom: "-30%", right: "-10%", width: 350, height: 350 }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                margin: "0 0 0.5rem",
                color: "var(--color-text)",
              }}
            >
              Get started in{" "}
              <span className="gradient-text-orange">3 steps</span>
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-2)",
                margin: 0,
              }}
            >
              From zero to a fully themed cross-platform UI.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                n: 1,
                title: "Install",
                desc: "Run `npx quasify create my-app --template next` to scaffold a new project with Quasify pre-configured.",
                color: "#ff6a1a",
              },
              {
                n: 2,
                title: "Configure",
                desc: "Call `createUi()` with your themes, breakpoints, and shorthands. Wrap your app in `<ThemeProvider>`.",
                color: "#dc143c",
              },
              {
                n: 3,
                title: "Build",
                desc: "Use components with the `t.*` accessor for theme-reactive props. Switch themes at runtime — every component updates.",
                color: "#22c55e",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="glass-card"
                style={{
                  borderRadius: 14,
                  padding: "1.75rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${step.color}, transparent)`,
                    border: `2px solid ${step.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    color: step.color,
                  }}
                >
                  {step.n}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--color-text)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-2)",
                    lineHeight: 1.65,
                  }}
                >
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Five themes strip ──────────────────────────────────────────── */}
      <section style={{ marginBottom: "4rem" }}>
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
            Five built-in themes
          </p>
          <Link
            href="/docs/theming"
            style={{
              fontSize: "0.78rem",
              color: "#ff6a1a",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Theming guide →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {THEMES.map((theme) => (
            <div
              key={theme.name}
              className="glass-card"
              style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div
                style={{
                  height: 64,
                  background: `linear-gradient(135deg, ${theme.bg}, ${theme.accent}15)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: theme.accent,
                    boxShadow: `0 0 10px ${theme.accent}50`,
                  }}
                />
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: theme.text,
                    opacity: 0.4,
                  }}
                />
              </div>
              <div
                style={{
                  padding: "0.75rem",
                  background: "rgba(0,0,0,0.3)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "var(--color-text)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {theme.name}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--color-muted)",
                    marginTop: 2,
                  }}
                >
                  {theme.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Packages ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: "4rem" }}>
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
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "0.85rem",
          }}
        >
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.name}
              className="glass-card"
              style={{
                borderRadius: 14,
                padding: "1.25rem",
                position: "relative",
                overflow: "hidden",
                animation: `slideUp 0.5s ease ${i * 0.05}s both`,
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
                    borderRadius: 10,
                    background: `${pkg.color}15`,
                    border: `1px solid ${pkg.color}25`,
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
                  className={`pill-tag ${pkg.color === "#ff6a1a" ? "orange" : pkg.color === "#22c55e" ? "teal" : pkg.color === "#dc143c" ? "crimson" : pkg.color === "#f5a623" ? "amber" : "orange"}`}
                  style={{ fontSize: "0.62rem" }}
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
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────── */}
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              margin: "0 0 0.5rem",
            }}
          >
            Loved by{" "}
            <span className="gradient-text-orange">developers</span>
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-2)",
              margin: 0,
            }}
          >
            Trusted by teams building cross-platform UIs.
          </p>
        </div>

        <div
          style={{
            overflow: "hidden",
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}
        >
          <div
            className="animate-marquee-left"
            style={{
              display: "flex",
              gap: "1rem",
              width: "max-content",
            }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="glass-card"
                style={{
                  width: 320,
                  borderRadius: 14,
                  padding: "1.5rem",
                  flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.85rem",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ff6a1a, #dc143c)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      color: "white",
                      flexShrink: 0,
                    }}
                  >
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: "var(--color-text)",
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--color-muted)",
                      }}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-2)",
                    lineHeight: 1.65,
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick links ────────────────────────────────────────────────── */}
      <section style={{ marginBottom: "4rem" }}>
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
          Everything you need to build with Quasify UI.
        </p>
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
              className="glass-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                borderRadius: 12,
                padding: "0.85rem 1rem",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <span
                style={{
                  fontSize: "1rem",
                  color: "#ff6a1a",
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
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────── */}
      <section
        className="glass-card"
        style={{
          borderRadius: 20,
          padding: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="glow-orb orange" style={{ top: "-50%", right: "-10%", width: 400, height: 400 }} />
        <div className="glow-orb teal" style={{ bottom: "-50%", left: "-10%", width: 300, height: 300 }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "var(--color-text)",
              marginBottom: 8,
              letterSpacing: "-0.02em",
            }}
          >
            Ready to{" "}
            <span className="gradient-text-orange">build?</span>
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-2)",
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            Install Quasify UI and be up and running in minutes. Cross-platform from day one.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="code-window"
            style={{
              borderRadius: 10,
              border: "1px solid rgba(255,106,26,0.08)",
            }}
          >
            <pre
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                padding: "0.75rem 1.25rem",
                margin: 0,
                color: "#e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ color: "#ff6a1a" }}>$</span>
              <span>npx quasify create my-app --template next</span>
            </pre>
          </div>
          <TrackedLink
            href="/docs/installation"
            trackLabel="Installation guide"
            className="cta-primary"
          >
            Installation guide →
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
