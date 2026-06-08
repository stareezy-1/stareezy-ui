import type { Metadata } from "next";
import { DocPage, Callout } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "Stareezy UI monorepo architecture — packages, token flow, and design decisions.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/architecture" },
};

const PACKAGES = [
  {
    name: "tokens",
    color: "#024CCE",
    deps: "none",
    desc: "Token factory, all token definitions, theme system (ThemeProvider, useTheme, useThemeSwitch), t accessor, ThemeToken, createUi, module augmentation. Zero dependencies.",
  },
  {
    name: "core",
    color: "#4D8D01",
    deps: "tokens",
    desc: "Shared utilities, platform detection, hooks (useDeviceLayout, useDocsTheme), string/date/currency utils.",
  },
  {
    name: "stylesheet",
    color: "#0C9182",
    deps: "none",
    desc: "Atomic CSS sheet management — injects :root variables, deduplicates rules, handles theme switching via data-theme.",
  },
  {
    name: "runtime",
    color: "#C98B25",
    deps: "tokens, stylesheet",
    desc: "O(1) style registry. resolve(token) is a single Map.get(). Web adapter returns CSS class names; RN adapter returns StyleSheet IDs.",
  },
  {
    name: "compiler",
    color: "#5D2555",
    deps: "tokens (build-time only)",
    desc: "Babel/Vite/Metro plugin. Reads stareezy.config.ts, extracts Token props at build time, emits atomic CSS. ThemeToken props are not extracted — they resolve at runtime.",
  },
  {
    name: "components",
    color: "#535A5E",
    deps: "tokens, core, runtime",
    desc: "17+ cross-platform components. Box accepts Token<T>, ThemeToken, and plain values. Custom shorthands from SzrCustomConfig are typed via module augmentation.",
  },
];

export default function ArchitecturePage() {
  return (
    <DocPage
      title="Architecture"
      description="How Stareezy UI is organized as a monorepo with strict dependency boundaries."
      badge="Reference"
      icon="⬢"
      badgeColor="#6a5048"
    >
      <h2 className="gradient-text">Package structure</h2>
      <pre>
        <code>{`stareezy-ui/
├── packages/
│   ├── tokens/       # Token definitions, theme system, t accessor, createUi
│   ├── core/         # Utilities, hooks, platform helpers
│   ├── runtime/      # O(1) style registry and platform adapters
│   ├── stylesheet/   # Atomic CSS sheet management (web)
│   ├── compiler/     # Babel/Vite/Metro build-time transform
│   └── components/   # 17+ cross-platform components
└── apps/
    ├── docs/         # This documentation site (Next.js)
    ├── storybook/    # Component stories (Storybook 8)
    └── playground/   # Live code editor`}</code>
      </pre>

      <h2 className="gradient-text">Build order</h2>
      <p>
        Packages must be built in dependency order. The{" "}
        <code>pnpm run build</code> script handles this automatically:
      </p>
      <pre>
        <code>{`tokens → core / stylesheet → runtime → compiler → components`}</code>
      </pre>

      <h2 className="gradient-text">Package responsibilities</h2>
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
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--color-border-2)",
              borderLeft:
                "2px solid color-mix(in srgb, var(--brand-primary) 30%, transparent)",
              borderRadius: 12,
              padding: "1rem 1.25rem",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flexShrink: 0, paddingTop: 2 }}>
              <code
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--brand-500)",
                }}
              >
                @stareezy-ui/{pkg.name}
              </code>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "color-mix(in srgb, var(--brand-500) 60%, transparent)",
                  fontFamily: "var(--font-mono)",
                  marginTop: 2,
                }}
              >
                deps: {pkg.deps}
              </div>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.85rem",
                color: "var(--color-text-2)",
                lineHeight: 1.6,
              }}
            >
              {pkg.desc}
            </p>
          </div>
        ))}
      </div>

      <h2 className="gradient-text">Token flow</h2>
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
            desc: "Tokens are frozen objects: { __token: true, id: string, value: T }. Created with token(value, id).",
          },
          {
            n: 2,
            title: "ThemeTokens",
            desc: "t.text.primary is a ThemeToken: { __themeToken: true, path: 'text.primary' }. Resolved at render time via useTheme().",
          },
          {
            n: 3,
            title: "Compilation",
            desc: "The compiler detects Token props (not ThemeTokens) at build time and replaces them with atomic CSS class names.",
          },
          {
            n: 4,
            title: "Runtime",
            desc: "The StyleRegistry (Map) is populated once at init. resolve(token) is O(1) — a single Map.get().",
          },
          {
            n: 5,
            title: "Rendering",
            desc: "Box receives class names (web) or StyleSheet IDs (RN) for static tokens. ThemeTokens are resolved inline via useTheme().",
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
                color: "var(--color-bg)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.8rem",
                flexShrink: 0,
                boxShadow:
                  "0 0 8px 2px color-mix(in srgb, var(--brand-500) 40%, transparent)",
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

      <h2 className="gradient-text">Two token types</h2>
      <p>
        There are two distinct token types in Stareezy UI — understanding the
        difference is key:
      </p>
      <pre>
        <code>{`// Token<T> — static, always the same value
import { colors } from '@stareezy-ui/tokens'
colors.celurenBlue[500]
// { __token: true, id: "celurenBlue-500", value: "#024CCE" }
// → Extracted by compiler, resolved to CSS class at build time

// ThemeToken — dynamic, resolves to current theme's value at render time
import { t } from '@stareezy-ui/tokens'
t.text.primary
// { __themeToken: true, path: "text.primary" }
// → NOT extracted by compiler, resolved via useTheme() at render time
// → aurora: "#f0f0f8", dark: "#f0f6fc", steins-gate: "#e8dcc8"`}</code>
      </pre>

      <h2 className="gradient-text">Module augmentation</h2>
      <p>
        Custom shorthands from <code>createUi()</code> flow into{" "}
        <code>BoxProps</code> via TypeScript module augmentation:
      </p>
      <pre>
        <code>{`// stareezy.config.ts
declare module '@stareezy-ui/tokens' {
  interface SzrCustomConfig extends typeof ui {}
}

// Now BoxProps includes your shorthands:
<Box br={12} f={1} />  // ✅ typed — br → borderRadius, f → flex`}</code>
      </pre>

      <h2 className="gradient-text">Atomic CSS strategy</h2>
      <p>
        Each token maps to exactly one CSS class. Theme switching requires zero
        JavaScript re-renders on web:
      </p>
      <pre>
        <code>{`.sz-celurenBlue-500 { background-color: var(--celurenBlue-500); }

/* Theme override — only a data-theme attribute change needed */
[data-theme="aurora"]      { --celurenBlue-500: #00ff88; }
[data-theme="steins-gate"] { --celurenBlue-500: #4a9eff; }
[data-theme="light"]       { --celurenBlue-500: #024cce; }`}</code>
      </pre>

      <Callout type="tip">
        The <code>packages/tokens</code> package has zero runtime dependencies —
        no React, no React Native, no UI framework. It can be used in any
        JavaScript environment including Node.js scripts and CDN bundles.
      </Callout>

      <h2 className="gradient-text">Tree shaking</h2>
      <p>
        Every token category lives in its own file. Importing{" "}
        <code>colors</code> does not pull in <code>spacing</code>,{" "}
        <code>radius</code>, or <code>typography</code>. The compiler&apos;s
        dead-code elimination removes any tokens not referenced in your
        component tree.
      </p>
    </DocPage>
  );
}
