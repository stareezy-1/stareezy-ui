import type { Metadata } from "next";
import { DocPage, Callout } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Usage — Token API",
  description:
    "Learn the Stareezy UI token API: Token<T>, the t accessor, createUi, and theme-reactive props.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/usage" },
};

export default function UsagePage() {
  return (
    <DocPage
      title="Token API"
      description="Tokens, the t accessor, createUi, and theme-reactive component props."
      badge="Guide"
      icon="◈"
    >
      {/* ── Token<T> ──────────────────────────────────────────────────────── */}
      <h2>Token&lt;T&gt;</h2>
      <p>
        Every design value is a frozen <code>Token&lt;T&gt;</code> object with
        three fields:
      </p>
      <pre>
        <code>{`type Token<T> = {
  readonly __token: true  // discriminant — lets the compiler detect token props
  readonly id: string     // stable unique identifier, e.g. "celurenBlue-500"
  readonly value: T       // resolved design value, e.g. "#024CCE"
}`}</code>
      </pre>
      <p>
        Create your own tokens with the <code>token()</code> factory:
      </p>
      <pre>
        <code>{`import { token } from '@stareezy-ui/tokens'

const brandPrimary = token('#FF6B35', 'brand-primary')
brandPrimary.value // "#FF6B35"
brandPrimary.id    // "brand-primary"`}</code>
      </pre>

      <Callout type="tip">
        The <code>__token: true</code> discriminant is what lets the Babel/Vite
        compiler detect token props at build time and replace them with atomic
        CSS class names — zero runtime cost.
      </Callout>

      {/* ── Static token props ────────────────────────────────────────────── */}
      <h2>Static token props</h2>
      <p>
        Pass token objects directly as props on <code>Box</code> and other
        primitives. TypeScript autocompletes and validates every value:
      </p>
      <pre>
        <code>{`import { colors, spacing, radius } from '@stareezy-ui/tokens'
import { Box, Text } from '@stareezy-ui/components'

function Card() {
  return (
    <Box
      bg={colors.celurenBlue[500]}   // Token<string> — always #024CCE
      p={spacing[4]}                 // Token<number> — always 16px
      rounded={radius.md}            // Token<number> — always 10px
    >
      <Text type="M-heading-bold" text="Hello" />
    </Box>
  )
}`}</code>
      </pre>
      <p>
        Static tokens always resolve to their fixed <code>.value</code> — they
        don&apos;t change when the theme switches. Use them for values that
        should be the same across all themes.
      </p>

      {/* ── t accessor ────────────────────────────────────────────────────── */}
      <h2>
        Theme-reactive props with <code>t</code>
      </h2>
      <p>
        The <code>t</code> accessor returns <strong>ThemeToken</strong>{" "}
        references — lightweight objects that resolve to the{" "}
        <em>current theme&apos;s</em> value at render time. When the theme
        switches, every component using a ThemeToken re-renders with the correct
        color automatically.
      </p>
      <pre>
        <code>{`import { t } from '@stareezy-ui/tokens'
import { Box, Text } from '@stareezy-ui/components'

function Card() {
  return (
    // These resolve to the CURRENT theme's value at render time:
    // aurora  → backgrounds.primary = #00ff88
    // dark    → backgrounds.primary = #024cce
    // steins-gate → backgrounds.primary = #4a9eff
    <Box
      bg={t.backgrounds.primary}
      borderColor={t.border.primaryBrand}
      p={16}
      rounded={8}
    >
      <Text
        style={{ color: t.text.primary }}  // also works in style objects
        type="M-heading-bold"
        text="Auto-switches with theme"
      />
    </Box>
  )
}`}</code>
      </pre>

      <Callout type="info">
        <code>t</code> is a typed proxy tree — TypeScript knows every valid
        path. <code>t.text.primary</code>, <code>t.backgrounds.secondary</code>,{" "}
        <code>t.border.danger</code> — all autocomplete and type-check.
      </Callout>

      <h2>
        Available <code>t</code> slots
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "0.75rem",
          margin: "1rem 0 1.5rem",
        }}
      >
        {[
          {
            group: "t.text",
            color: "#024CCE",
            slots: [
              "primary",
              "secondary",
              "tertiary",
              "placeholder",
              "disable",
              "inverse",
              "importantBrand",
              "danger",
              "success",
              "dangerPrimary",
              "successPrimary",
              "warningPrimary",
            ],
          },
          {
            group: "t.backgrounds",
            color: "#4D8D01",
            slots: ["primary", "secondary", "disabled", "primaryBlack"],
          },
          {
            group: "t.border",
            color: "#C98B25",
            slots: [
              "default",
              "secondary",
              "tertiary",
              "primaryBrand",
              "danger",
              "success",
              "dangerPrimary",
              "successPrimary",
              "primaryBlack",
            ],
          },
        ].map((g) => (
          <div
            key={g.group}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "1rem",
            }}
          >
            <code
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: g.color,
                display: "block",
                marginBottom: "0.6rem",
              }}
            >
              {g.group}
            </code>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {g.slots.map((s) => (
                <code
                  key={s}
                  style={{
                    fontSize: "0.68rem",
                    background: `${g.color}12`,
                    color: g.color,
                    border: `1px solid ${g.color}25`,
                    borderRadius: 4,
                    padding: "1px 6px",
                  }}
                >
                  .{s}
                </code>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── useResolveThemeToken ──────────────────────────────────────────── */}
      <h2>Resolving ThemeTokens manually</h2>
      <p>
        When you need the raw string value inside a component (e.g. for a
        non-Box element), use <code>useResolveThemeToken</code>:
      </p>
      <pre>
        <code>{`import { t, useResolveThemeToken } from '@stareezy-ui/tokens'

function MyComponent() {
  const brandColor = useResolveThemeToken(t.text.importantBrand)
  // aurora      → "#00ff88"
  // steins-gate → "#4a9eff"
  // dark/light  → "#024cce"

  return <canvas style={{ borderColor: brandColor }} />
}`}</code>
      </pre>

      {/* ── createUi ─────────────────────────────────────────────────────── */}
      <h2>createUi</h2>
      <p>
        Call <code>createUi()</code> once at app startup to register themes,
        custom tokens, breakpoints, fonts, and shorthands. The returned{" "}
        <code>ui</code> object exposes <code>ui.t</code> (same as the standalone{" "}
        <code>t</code>), <code>ui.tokens</code>, and helper methods.
      </p>
      <pre>
        <code>{`import { createUi, token, themes } from '@stareezy-ui/tokens'

export const ui = createUi({
  // Register all four themes
  themes: {
    aurora:        themes.aurora,
    dark:          themes.dark,
    light:         themes.light,
    'steins-gate': themes['steins-gate'],
  },

  // Custom token groups — fully typed on ui.tokens
  tokens: {
    brand: {
      primary:   token('#FF6B35', 'brand-primary'),
      secondary: token('#004E89', 'brand-secondary'),
    },
  },

  // Responsive breakpoints
  media: { sm: 480, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },

  // Prop shorthands for Box
  shorthands: { bg: 'backgroundColor', p: 'padding' },
})

// Access custom tokens with full type safety
ui.tokens.brand.primary.value   // "#FF6B35"
ui.tokens.colors.celurenBlue[500].value // "#024CCE"

// ui.t is the same as the standalone t accessor
<Box bg={ui.t.backgrounds.primary} />`}</code>
      </pre>

      <Callout type="tip">
        Export <code>ui</code> from a single <code>ui.config.ts</code> file and
        import it wherever you need typed token access. This is the recommended
        pattern — one config, full type inference everywhere.
      </Callout>

      {/* ── Accessing .value ─────────────────────────────────────────────── */}
      <h2>Accessing raw values</h2>
      <p>
        Every token exposes its raw value via <code>.value</code>. Use this when
        you need a plain string or number (e.g. inline styles, RN StyleSheet,
        canvas):
      </p>
      <pre>
        <code>{`import { colors, spacing, radius } from '@stareezy-ui/tokens'

colors.celurenBlue[500].value  // "#024CCE"
spacing[4].value               // 16
radius.md.value                // 10

// In a non-Box context
const style = {
  backgroundColor: colors.celurenBlue[500].value,
  padding: spacing[4].value,
  borderRadius: radius.md.value,
}`}</code>
      </pre>

      {/* ── Token categories ─────────────────────────────────────────────── */}
      <h2>Token categories</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "0.75rem",
          margin: "1rem 0",
        }}
      >
        {[
          {
            name: "colors",
            desc: "Full palette — celurenBlue, raisinBlack, beauBlue, lawnGreen, crimsonRed, neutral…",
            color: "#024CCE",
          },
          {
            name: "semanticColors",
            desc: "Role-based — text.primary, backgrounds.primary, border.default…",
            color: "#4D8D01",
          },
          {
            name: "spacing",
            desc: "Scale from 0 to 480px, named aliases (tiny, small, medium…)",
            color: "#C98B25",
          },
          {
            name: "radius",
            desc: "Border radius — sm (6), md (10), lg (16), xl (24), full (9999)",
            color: "#0C9182",
          },
          {
            name: "typography",
            desc: "Font families, sizes, weights — Inter + Plus Jakarta Sans",
            color: "#5D2555",
          },
          {
            name: "shadow",
            desc: "Box shadow presets — sm, md, lg, xl",
            color: "#535A5E",
          },
          {
            name: "motion",
            desc: "Duration, easing, spring — for animations",
            color: "#7c3aed",
          },
          {
            name: "glow",
            desc: "Glow effects — aurora green, nebula purple, teal",
            color: "#00cc6a",
          },
        ].map((c) => (
          <div
            key={c.name}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "0.85rem 1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: c.color,
                }}
              />
              <code
                style={{ fontSize: "0.82rem", fontWeight: 700, color: c.color }}
              >
                {c.name}
              </code>
            </div>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--color-text-2)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </DocPage>
  );
}
