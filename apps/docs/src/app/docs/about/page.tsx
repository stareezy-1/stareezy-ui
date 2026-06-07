import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, Callout } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Quasify UI is built by Muhammad Bintang Al Akbar — a developer focused on typed design systems and cross-platform UI.",
  alternates: { canonical: "https://ui.quasify.app/docs/about" },
  openGraph: {
    title: "About — Quasify UI",
    description:
      "Quasify UI is built by Muhammad Bintang Al Akbar. Learn about the project and reach out.",
    url: "https://ui.quasify.app/docs/about",
  },
};

const STACK = [
  { label: "Language", value: "TypeScript 5.9, strict mode" },
  { label: "Platforms", value: "React Native + Web" },
  { label: "Build tool", value: "tsup (per package)" },
  { label: "Testing", value: "Vitest + fast-check (property-based)" },
  { label: "Packages", value: "7 focused, tree-shakeable" },
  { label: "Components", value: "17+ cross-platform" },
  { label: "Tokens", value: "300+ typed design tokens" },
  { label: "Runtime", value: "O(1) style registry" },
];

export default function AboutPage() {
  return (
    <DocPage
      title="About"
      description="The person behind the library."
      badge="About"
      badgeColor="#ff6a1a"
      icon="◎"
    >
      {/* Builder card */}
      <div
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          marginBottom: "2.5rem",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--color-surface)",
          }}
        />
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background:
              "linear-gradient(90deg, #ff6a1a, #dc143c)",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -40,
            width: 260,
            height: 260,
            background:
              "radial-gradient(circle, rgba(255,106,26,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            padding: "clamp(1.5rem, 4vw, 2.5rem)",
            display: "flex",
            gap: "1.5rem",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #ff6a1a, #dc143c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.75rem",
              flexShrink: 0,
              boxShadow: "0 0 28px rgba(255,106,26,0.35)",
            }}
          >
            ◈
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#ff6a1a",
                marginBottom: "0.4rem",
              }}
            >
              Builder & Maintainer
            </div>

            <h2
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                margin: "0 0 0.35rem",
                color: "var(--color-text)",
              }}
            >
              Muhammad Bintang Al Akbar
            </h2>

            <div
              style={{
                fontSize: "0.85rem",
                color: "var(--color-muted)",
                marginBottom: "1.25rem",
                fontFamily: "var(--font-mono)",
              }}
            >
              Quasify
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--color-text-2)",
                lineHeight: 1.75,
                margin: "0 0 1.5rem",
                maxWidth: 520,
              }}
            >
              I built Quasify UI to solve a real problem: design tokens that
              are fully typed, work the same on React Native and web, and don't
              require a runtime that slows things down. Every package in this
              library is something I needed and couldn't find elsewhere.
            </p>

            <a
              href="https://quasify.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "linear-gradient(135deg, #ff6a1a, #e05010)",
                color: "#ffffff",
                padding: "0.6rem 1.4rem",
                borderRadius: "var(--radius-md)",
                fontWeight: 700,
                fontSize: "0.875rem",
                textDecoration: "none",
                boxShadow:
                  "0 0 24px rgba(255,106,26,0.3)",
              }}
            >
              quasify.app ↗
            </a>
          </div>
        </div>
      </div>

      <h2 className="gradient-text">Why this library exists</h2>
      <p>
        Most design token libraries are either too opinionated, not typed deeply
        enough, or only work on one platform. I wanted something where every
        token is a <code>Token&lt;T&gt;</code> — not just a string or number —
        so the type system catches misuse at compile time, not at runtime.
      </p>
      <p>
        The O(1) runtime came from profiling real apps where style resolution
        was a measurable bottleneck. <code>resolve(token)</code> is a single{" "}
        <code>Map.get()</code>. The compiler plugin takes it further by
        extracting token props at build time so there&apos;s zero runtime cost
        at all.
      </p>

      <Callout type="tip">
        The aurora theme is the default and the one I use personally. It&apos;s
        designed to feel like a dark IDE — deep space blacks, neon greens, and
        cosmic purples.
      </Callout>

      <h2 className="gradient-text">What&apos;s in the box</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "0.65rem",
          margin: "1rem 0 2rem",
        }}
      >
        {STACK.map((item) => (
          <div
            key={item.label}
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "var(--radius-md)",
              padding: "0.85rem 1rem",
            }}
          >
            <div
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-muted)",
                marginBottom: "0.3rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#ff6a1a",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {item.label}
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-text)",
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <h2 className="gradient-text">Get in touch</h2>
      <p>
        If you&apos;re using Quasify UI, found a bug, or want to contribute —
        reach out. The best place is the GitHub repo or my personal site.
      </p>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginTop: "1rem",
        }}
      >
        <a
          href="https://quasify.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "#ff6a1a",
            color: "#ffffff",
            padding: "0.6rem 1.25rem",
            borderRadius: "var(--radius-md)",
            fontWeight: 700,
            fontSize: "0.875rem",
            textDecoration: "none",
          }}
        >
          ◎ quasify.app
        </a>
        <a
          href="https://github.com/quasify-ui/quasify-ui"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "transparent",
            color: "var(--color-text)",
            padding: "0.6rem 1.25rem",
            borderRadius: "var(--radius-md)",
            fontWeight: 600,
            fontSize: "0.875rem",
            textDecoration: "none",
            border: "1px solid var(--color-border)",
          }}
        >
          ↗ GitHub
        </a>
        <Link
          href="/docs/thanks"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "transparent",
            color: "var(--color-text-2)",
            padding: "0.6rem 1.25rem",
            borderRadius: "var(--radius-md)",
            fontWeight: 600,
            fontSize: "0.875rem",
            textDecoration: "none",
            border: "1px solid var(--color-border)",
          }}
        >
          ✦ Special Thanks
        </Link>
      </div>
    </DocPage>
  );
}
