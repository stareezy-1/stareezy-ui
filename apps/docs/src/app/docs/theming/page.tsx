import type { Metadata } from "next";
import { DocPage, Callout } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Theming",
  description:
    "Five built-in themes (light, dark, aurora, steins-gate, quasar), ThemeProvider, useThemeSwitch, the t accessor, and theme-reactive components.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/theming" },
};

const THEMES = [
  {
    name: "aurora",
    bg: "#050505",
    surface: "#0f0f1a",
    brand: "#00ff88",
    accent: "#7c3aed",
    text: "#f0f0f8",
    desc: "Deep space dark — aurora green primary, nebula purple accent.",
  },
  {
    name: "dark",
    bg: "#0d1117",
    surface: "#161b22",
    brand: "#024cce",
    accent: "#6d28d9",
    text: "#f0f6fc",
    desc: "GitHub-style dark — celuren blue primary.",
  },
  {
    name: "light",
    bg: "#fafbff",
    surface: "#ffffff",
    brand: "#024cce",
    accent: "#6d28d9",
    text: "#0f1010",
    desc: "Clean light — celuren blue primary, warm white surfaces.",
  },
  {
    name: "steins-gate",
    bg: "#080c18",
    surface: "#0d1224",
    brand: "#4a9eff",
    accent: "#e63030",
    text: "#e8dcc8",
    desc: "Midnight navy — electric blue primary, divergence red danger.",
  },
  {
    name: "quasar",
    bg: "#06030f",
    surface: "#100a1f",
    brand: "#a855f7",
    accent: "#f97316",
    text: "#f3e8ff",
    desc: "Deep violet — quasar purple primary, pulsar orange accent.",
  },
];

const SEMANTIC_SLOTS = [
  {
    slot: "text.primary",
    light: "#0f1010",
    dark: "#f0f6fc",
    aurora: "#f0f0f8",
    sg: "#e8dcc8",
    quasar: "#f3e8ff",
  },
  {
    slot: "text.importantBrand",
    light: "#024cce",
    dark: "#024cce",
    aurora: "#00ff88",
    sg: "#4a9eff",
    quasar: "#a855f7",
  },
  {
    slot: "text.danger",
    light: "#f2021f",
    dark: "#ff4444",
    aurora: "#ff4444",
    sg: "#e63030",
    quasar: "#ff4444",
  },
  {
    slot: "text.success",
    light: "#4d8d01",
    dark: "#00ff88",
    aurora: "#00ff88",
    sg: "#2a9d8f",
    quasar: "#22c55e",
  },
  {
    slot: "backgrounds.primary",
    light: "#024cce",
    dark: "#024cce",
    aurora: "#00ff88",
    sg: "#4a9eff",
    quasar: "#a855f7",
  },
  {
    slot: "backgrounds.primaryBlack",
    light: "#070707",
    dark: "#0d1117",
    aurora: "#050505",
    sg: "#080c18",
    quasar: "#06030f",
  },
  {
    slot: "border.primaryBrand",
    light: "#024cce",
    dark: "#024cce",
    aurora: "#00ff88",
    sg: "#4a9eff",
    quasar: "#a855f7",
  },
  {
    slot: "border.danger",
    light: "#f2021f",
    dark: "#ff4444",
    aurora: "#ff4444",
    sg: "#e63030",
    quasar: "#ff4444",
  },
];

export default function ThemingPage() {
  return (
    <DocPage
      title="Theming"
      description="Five built-in themes, theme-reactive components, ThemeProvider, and full control over theme switching."
      badge="Guide"
      icon="◑"
      badgeColor="#5D2555"
    >
      {/* ── Theme-reactive components ─────────────────────────────────────── */}
      <h2>Every component is Theme_Reactive</h2>
      <p>
        Every component in <code>@stareezy-ui/components</code> resolves its
        colors through <code>useThemedColors()</code> at render time. There are
        no hardcoded color literals in any component — all colors come from the
        Active_Theme via the Theme_Accessor.
      </p>
      <p>
        This means switching themes causes every component to re-render with the
        correct colors for the new theme — automatically, with no extra code.
      </p>
      <pre>
        <code>{`// Same component code — correct colors in all five themes
<Button variant="primary">Save</Button>
<Card p={16}>Content</Card>
<Badge variant="success">Done</Badge>

// Switch theme — all components update simultaneously
const { setTheme } = useThemeSwitch()
setTheme('aurora')       // → aurora green brand
setTheme('quasar')       // → quasar purple brand
setTheme('steins-gate')  // → electric blue brand`}</code>
      </pre>

      {/* ── Five built-in themes ─────────────────────────────────────────── */}
      <h2>Five built-in themes</h2>
      <p>
        Stareezy UI ships five themes. Each maps the same semantic color slots
        to different primitive values.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "0.85rem",
          margin: "1.25rem 0 2rem",
        }}
      >
        {THEMES.map((theme) => (
          <div
            key={theme.name}
            style={{
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--color-border)",
            }}
          >
            <div style={{ background: theme.bg, padding: "1.25rem" }}>
              <div style={{ display: "flex", gap: 6, marginBottom: "0.75rem" }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: theme.brand,
                  }}
                />
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: theme.accent,
                  }}
                />
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: theme.text,
                    opacity: 0.4,
                  }}
                />
              </div>
              <div
                style={{
                  background: theme.surface,
                  borderRadius: 8,
                  padding: "0.6rem 0.75rem",
                  border: `1px solid ${theme.brand}20`,
                }}
              >
                <div
                  style={{
                    width: "60%",
                    height: 6,
                    borderRadius: 3,
                    background: theme.brand,
                    marginBottom: 5,
                  }}
                />
                <div
                  style={{
                    width: "80%",
                    height: 4,
                    borderRadius: 2,
                    background: theme.text,
                    opacity: 0.3,
                  }}
                />
                <div
                  style={{
                    width: "50%",
                    height: 4,
                    borderRadius: 2,
                    background: theme.text,
                    opacity: 0.2,
                    marginTop: 4,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                padding: "0.85rem 1rem",
                background: "var(--color-surface)",
              }}
            >
              <code
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  display: "block",
                  marginBottom: 3,
                }}
              >
                &quot;{theme.name}&quot;
              </code>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-2)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {theme.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── ThemeProvider ────────────────────────────────────────────────── */}
      <h2>ThemeProvider</h2>
      <p>
        Wrap your app with <code>ThemeProvider</code> and pass a{" "}
        <code>theme</code> prop. On web it injects CSS variables under{" "}
        <code>[data-theme]</code>. On React Native it provides resolved token
        values via context.
      </p>
      <pre>
        <code>{`import { ThemeProvider } from '@stareezy-ui/tokens'

<ThemeProvider theme="aurora">...</ThemeProvider>
<ThemeProvider theme="dark">...</ThemeProvider>
<ThemeProvider theme="light">...</ThemeProvider>
<ThemeProvider theme="steins-gate">...</ThemeProvider>
<ThemeProvider theme="quasar">...</ThemeProvider>

// Partial override — inherits unspecified slots from parent
<ThemeProvider theme={{ text: { primary: colors.celurenBlue[700] } }}>
  ...
</ThemeProvider>`}</code>
      </pre>

      <Callout type="tip">
        On web, switching themes is a single <code>data-theme</code> attribute
        change — CSS variables do the rest. No full re-render of the tree.
      </Callout>

      {/* ── t accessor ──────────────────────────────────────────────────── */}
      <h2>
        Theme-reactive props with <code>t</code>
      </h2>
      <p>
        The <code>t</code> accessor returns <strong>ThemeToken</strong>{" "}
        references. Pass them as <code>bg</code>, <code>color</code>,{" "}
        <code>borderColor</code> props — they resolve to the current
        theme&apos;s value at render time.
      </p>
      <pre>
        <code>{`import { t } from '@stareezy-ui/tokens'

// Same component, correct colors in every theme:
<Box bg={t.backgrounds.primary} borderColor={t.border.primaryBrand}>
  <Text style={{ color: t.text.primary }} />
</Box>

// aurora       → bg: #00ff88, border: #00ff88, text: #f0f0f8
// dark         → bg: #024cce, border: #024cce, text: #f0f6fc
// light        → bg: #024cce, border: #024cce, text: #0f1010
// steins-gate  → bg: #4a9eff, border: #4a9eff, text: #e8dcc8
// quasar       → bg: #a855f7, border: #a855f7, text: #f3e8ff`}</code>
      </pre>

      {/* ── Semantic slot reference ──────────────────────────────────────── */}
      <h2>Semantic slot reference</h2>
      <div style={{ overflowX: "auto", margin: "1rem 0 1.5rem" }}>
        <table>
          <thead>
            <tr>
              <th>Slot</th>
              <th>light</th>
              <th>dark</th>
              <th>aurora</th>
              <th>steins-gate</th>
              <th>quasar</th>
            </tr>
          </thead>
          <tbody>
            {SEMANTIC_SLOTS.map((row) => (
              <tr key={row.slot}>
                <td>
                  <code>{`t.${row.slot}`}</code>
                </td>
                {[row.light, row.dark, row.aurora, row.sg, row.quasar].map(
                  (hex, i) => (
                    <td key={i}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 3,
                            background: hex,
                            display: "inline-block",
                            border: "1px solid rgba(0,0,0,0.1)",
                            flexShrink: 0,
                          }}
                        />
                        <code style={{ fontSize: "0.72rem" }}>{hex}</code>
                      </span>
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── useThemeSwitch ───────────────────────────────────────────────── */}
      <h2>useThemeSwitch</h2>
      <p>Switch themes from anywhere in the tree without prop drilling:</p>
      <pre>
        <code>{`import { useThemeSwitch } from '@stareezy-ui/tokens'

function ThemeSwitcher() {
  const { theme, setTheme, toggleTheme, isDark } = useThemeSwitch()

  return (
    <>
      <button onClick={() => setTheme('aurora')}>Aurora</button>
      <button onClick={() => setTheme('steins-gate')}>Steins;Gate</button>
      <button onClick={() => setTheme('quasar')}>Quasar</button>
      <button onClick={toggleTheme}>{isDark ? '☀ Light' : '☾ Dark'}</button>
      <span>Current: {theme}</span>
    </>
  )
}`}</code>
      </pre>

      {/* ── useTheme ────────────────────────────────────────────────────── */}
      <h2>useTheme</h2>
      <p>
        Access the full resolved theme object — every leaf is a{" "}
        <code>Token&lt;string&gt;</code>:
      </p>
      <pre>
        <code>{`import { useTheme } from '@stareezy-ui/tokens'

function MyComponent() {
  const theme = useTheme()

  return (
    <div style={{ color: theme.text.primary.value }}>
      {/* theme.text.primary.value → current theme's primary text color */}
    </div>
  )
}`}</code>
      </pre>

      {/* ── Nested themes ────────────────────────────────────────────────── */}
      <h2>Nested themes</h2>
      <p>
        Child <code>ThemeProvider</code> instances override only the tokens they
        specify and inherit the rest from the nearest ancestor:
      </p>
      <pre>
        <code>{`<ThemeProvider theme="light">
  <Box>Normal light content</Box>

  <ThemeProvider theme="quasar">
    <Box>This section uses Quasar colors</Box>
  </ThemeProvider>
</ThemeProvider>`}</code>
      </pre>

      <Callout type="info">
        On React Native, resolved token values are provided via React context.
        Use <code>useTheme()</code> to access them — no CSS variables involved.
      </Callout>

      {/* ── Custom themes via createUi ───────────────────────────────────── */}
      <h2>Custom themes via createUi</h2>
      <pre>
        <code>{`import { createUi, themes, token } from '@stareezy-ui/tokens'

const ui = createUi({
  themes: {
    aurora:        themes.aurora,
    dark:          themes.dark,
    light:         themes.light,
    'steins-gate': themes['steins-gate'],
    quasar:        themes.quasar,

    // Your own theme — partial override of semanticColors
    brand: {
      text: {
        primary:        token('#1a1a1a', 'brand-text-primary'),
        importantBrand: token('#FF6B35', 'brand-text-brand'),
      },
      backgrounds: {
        primary: token('#FF6B35', 'brand-bg-primary'),
      },
    },
  },
})

<ThemeProvider theme="brand">...</ThemeProvider>`}</code>
      </pre>

      <Callout type="tip">
        The <code>quasar</code> theme is new in v0.4. If you are upgrading from
        an earlier version, add <code>quasar: themes.quasar</code> to your{" "}
        <code>createUi</code> config to enable it.
      </Callout>
    </DocPage>
  );
}
