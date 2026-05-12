import type { Metadata } from "next";
import { DocPage, Callout } from "apps/docs/src/components/DocPage";

export const metadata: Metadata = {
  title: "Architecture",
  description: "Stareezy UI monorepo architecture overview.",
};

const PACKAGES = [
  {
    name: "tokens",
    desc: "Token factory, all token definitions, theme system, serialization. Zero dependencies.",
    color: "#024CCE",
    bg: "#E6EDFA",
    deps: "none",
  },
  {
    name: "core",
    desc: "Shared utilities, platform detection, hooks from rekosistem-components.",
    color: "#4D8D01",
    bg: "#F3FFE3",
    deps: "tokens",
  },
  {
    name: "runtime",
    desc: "Style registry, O(1) token-to-style lookup, web and RN platform adapters.",
    color: "#C98B25",
    bg: "#FEF4E2",
    deps: "tokens, stylesheet",
  },
  {
    name: "stylesheet",
    desc: "Atomic CSS sheet management, CSS variable injection into document.head.",
    color: "#0C9182",
    bg: "#E7FDFA",
    deps: "runtime",
  },
  {
    name: "compiler",
    desc: "Babel/Vite/Metro plugin: extracts token refs at build time, emits atomic CSS.",
    color: "#5D2555",
    bg: "#F9DEDE",
    deps: "tokens (build-time only)",
  },
  {
    name: "components",
    desc: "All 70+ UI components rebuilt from rekosistem-components.",
    color: "#535A5E",
    bg: "#F4F6FB",
    deps: "tokens, core, runtime",
  },
];

export default function ArchitecturePage() {
  return (
    <DocPage
      title="Architecture"
      description="How Stareezy UI is organized as a monorepo with strict dependency boundaries."
      badge="Reference"
      icon="⬢"
      badgeColor="#535A5E"
    >
      <h2>Package Structure</h2>
      <pre>
        <code>{`stareezy-ui/
├── packages/
│   ├── tokens/       # Token definitions, theme system, serialization
│   ├── core/         # Utilities, hooks, platform helpers
│   ├── runtime/      # Style registry and platform adapters
│   ├── stylesheet/   # Atomic CSS sheet management (web)
│   ├── compiler/     # Babel/Vite build-time transform
│   └── components/   # 70+ cross-platform components
└── apps/
    ├── docs/         # This documentation site
    ├── storybook/    # Component stories
    └── playground/   # Live code editor`}</code>
      </pre>

      <h2>Package Responsibilities</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          margin: "1rem 0 1.5rem",
        }}
      >
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.name}
            style={{
              display: "flex",
              gap: "1rem",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border-2)",
              borderRadius: 12,
              padding: "1rem 1.25rem",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: pkg.bg,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <code
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  color: pkg.color,
                }}
              >
                pkg
              </code>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <code
                  style={{
                    fontWeight: 700,
                    color: pkg.color,
                    fontSize: "0.9rem",
                  }}
                >
                  @stareezy-ui/{pkg.name}
                </code>
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--color-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  deps: {pkg.deps}
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "var(--color-text-2)",
                  lineHeight: 1.55,
                }}
              >
                {pkg.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2>Token Flow</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          margin: "1rem 0 1.5rem",
        }}
      >
        {[
          {
            n: 1,
            title: "Definition",
            desc: "Tokens are defined in packages/tokens as frozen objects with { __token: true, id, value }",
          },
          {
            n: 2,
            title: "Compilation",
            desc: "The compiler detects token props at build time and replaces them with atomic CSS class names",
          },
          {
            n: 3,
            title: "Runtime",
            desc: "The runtime maintains a StyleRegistry (Map) populated once at init; resolve(token) is O(1)",
          },
          {
            n: 4,
            title: "Rendering",
            desc: "Components receive class names (web) or StyleSheet IDs (RN) — no string parsing, no object merging",
          },
        ].map((step) => (
          <div
            key={step.n}
            style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                background: "var(--brand-500)",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.8rem",
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(2,76,206,0.3)",
              }}
            >
              {step.n}
            </div>
            <div style={{ paddingTop: 4 }}>
              <span
                style={{
                  fontWeight: 700,
                  color: "var(--color-text)",
                  fontSize: "0.9rem",
                }}
              >
                {step.title} —{" "}
              </span>
              <span
                style={{ color: "var(--color-text-2)", fontSize: "0.9rem" }}
              >
                {step.desc}
              </span>
            </div>
          </div>
        ))}
      </div>

      <h2>Atomic CSS Strategy</h2>
      <p>
        Each token maps to exactly one CSS class. Theme switching requires zero
        JavaScript re-renders:
      </p>
      <pre>
        <code>{`.sz-bg-celurenBlue-500 {
  background-color: var(--celurenBlue-500);
}

/* Theme override — only a data-theme attribute change needed */
[data-theme="dark"] {
  --celurenBlue-500: #4E82DD;
}`}</code>
      </pre>

      <h2>Tree Shaking</h2>
      <p>
        Every token category lives in its own file. Importing{" "}
        <code>colors</code> does not pull in <code>spacing</code>,{" "}
        <code>radius</code>, or <code>typography</code>. The compiler's
        dead-code elimination removes any tokens not referenced in your
        component tree.
      </p>

      <Callout type="tip">
        The <code>packages/tokens</code> package has zero runtime dependencies —
        no React, no React Native, no UI framework. It can be used in any
        JavaScript environment.
      </Callout>

      <h2>Property-Based Testing</h2>
      <p>
        Correctness properties are validated with <code>fast-check</code>{" "}
        (minimum 100 iterations per property):
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "0.5rem",
          margin: "0.75rem 0",
        }}
      >
        {[
          "Token factory shape",
          "Token structural equality",
          "Spacing token types",
          "Semantic token equality",
          "Theme provider re-renders",
          "Compiler prop replacement",
          "CSS deduplication",
          "Runtime resolve stability",
          "Serialization round-trip",
        ].map((p) => (
          <div
            key={p}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "var(--color-surface)",
              border: "1px solid var(--color-border-2)",
              borderRadius: 8,
              padding: "0.5rem 0.75rem",
            }}
          >
            <span style={{ color: "#4D8D01", fontWeight: 700 }}>✓</span>
            <span style={{ fontSize: "0.82rem", color: "var(--color-text-2)" }}>
              {p}
            </span>
          </div>
        ))}
      </div>
    </DocPage>
  );
}
