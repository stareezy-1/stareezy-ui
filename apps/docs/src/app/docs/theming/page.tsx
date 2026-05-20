import type { Metadata } from "next";
import { DocPage, Callout } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Theming",
  description:
    "Four built-in themes (aurora, dark, light, steins-gate), ThemeProvider, useThemeSwitch, and the t accessor for theme-reactive props.",
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
];

const SEMANTIC_SLOTS = [
  {
    slot: "text.primary",
    light: "#0f1010",
    dark: "#f0f6fc",
    aurora: "#f0f0f8",
    sg: "#e8dcc8",
  },
  {
    slot: "text.importantBrand",
    light: "#024cce",
    dark: "#024cce",
    aurora: "#00ff88",
    sg: "#4a9eff",
  },
  {
    slot: "text.danger",
    light: "#f2021f",
    dark: "#ff4444",
    aurora: "#ff4444",
    sg: "#e63030",
  },
  {
    slot: "text.success",
    light: "#4d8d01",
    dark: "#00ff88",
    aurora: "#00ff88",
    sg: "#2a9d8f",
  },
  {
    slot: "backgrounds.primary",
    light: "#024cce",
    dark: "#024cce",
    aurora: "#00ff88",
    sg: "#4a9eff",
  },
  {
    slot: "backgrounds.primaryBlack",
    light: "#070707",
    dark: "#0d1117",
    aurora: "#050505",
    sg: "#080c18",
  },
  {
    slot: "border.primaryBrand",
    light: "#024cce",
    dark: "#024cce",
    aurora: "#00ff88",
    sg: "#4a9eff",
  },
  {
    slot: "border.danger",
    light: "#f2021f",
    dark: "#ff4444",
    aurora: "#ff4444",
    sg: "#e63030",
  },
];

export default function ThemingPage() {
  return (
    <DocPage
      title="Theming"
      description="Four built-in themes, theme-reactive props, and full control over theme switching."
      badge="Guide"
      icon="◑"
      badgeColor="#5D2555"
    >
      <h2>Four built-in themes</h2>
      <p>
        Stareezy UI ships four themes. Each maps the same semantic color slots
        to different primitive values — components look correct in every theme
        without any extra code.
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

// Partial override — inherits unspecified slots from parent
<ThemeProvider theme={{ text: { primary: colors.celurenBlue[700] } }}>
  ...
</ThemeProvider>`}</code>
      </pre>

      <Callout type="tip">
        On web, switching themes is a single <code>data-theme</code> attribute
        change — CSS variables do the rest. No full re-render of the tree.
      </Callout>

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

// aurora      → bg: #00ff88, border: #00ff88, text: #f0f0f8
// dark        → bg: #024cce, border: #024cce, text: #f0f6fc
// light       → bg: #024cce, border: #024cce, text: #0f1010
// steins-gate → bg: #4a9eff, border: #4a9eff, text: #e8dcc8`}</code>
      </pre>

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
            </tr>
          </thead>
          <tbody>
            {SEMANTIC_SLOTS.map((row) => (
              <tr key={row.slot}>
                <td>
                  <code>{`t.${row.slot}`}</code>
                </td>
                {[row.light, row.dark, row.aurora, row.sg].map((hex, i) => (
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
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
      <button onClick={toggleTheme}>{isDark ? '☀ Light' : '☾ Dark'}</button>
      <span>Current: {theme}</span>
    </>
  )
}`}</code>
      </pre>

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

      <h2>Nested themes</h2>
      <p>
        Child <code>ThemeProvider</code> instances override only the tokens they
        specify and inherit the rest from the nearest ancestor:
      </p>
      <pre>
        <code>{`<ThemeProvider theme="light">
  <Box>Normal light content</Box>

  <ThemeProvider theme="steins-gate">
    <Box>This section uses Steins;Gate colors</Box>
  </ThemeProvider>
</ThemeProvider>`}</code>
      </pre>

      <Callout type="info">
        On React Native, resolved token values are provided via React context.
        Use <code>useTheme()</code> to access them — no CSS variables involved.
      </Callout>

      <h2>Custom themes via createUi</h2>
      <pre>
        <code>{`import { createUi, themes, token } from '@stareezy-ui/tokens'

const ui = createUi({
  themes: {
    aurora:        themes.aurora,
    dark:          themes.dark,
    light:         themes.light,
    'steins-gate': themes['steins-gate'],

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
    </DocPage>
  );
}
