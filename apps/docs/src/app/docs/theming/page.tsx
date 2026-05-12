import type { Metadata } from "next";
import { DocPage, Callout } from "apps/docs/src/components/DocPage";

export const metadata: Metadata = {
  title: "Theming",
  description: "How to use the Stareezy UI theme system.",
};

export default function ThemingPage() {
  return (
    <DocPage
      title="Theming"
      description="Light, dark, and custom themes powered by CSS variables and React context."
      badge="Guide"
      icon="◑"
      badgeColor="#5D2555"
    >
      <h2>ThemeProvider</h2>
      <p>
        Wrap your app with <code>ThemeProvider</code> and pass a{" "}
        <code>theme</code> prop. Built-in themes are <code>"light"</code> and{" "}
        <code>"dark"</code>:
      </p>

      <pre>
        <code>{`import { ThemeProvider } from '@stareezy-ui/tokens'

// Built-in themes
<ThemeProvider theme="light">...</ThemeProvider>
<ThemeProvider theme="dark">...</ThemeProvider>

// Custom theme override — partial, inherits rest from parent
<ThemeProvider theme={{ text: { primary: colors.celurenBlue[700] } }}>
  ...
</ThemeProvider>`}</code>
      </pre>

      <Callout type="tip">
        On web, theme switching requires zero JavaScript re-renders — only a{" "}
        <code>data-theme</code> attribute change on the root element. CSS
        variables do the rest.
      </Callout>

      <h2>useTheme Hook</h2>
      <p>
        Access the current theme's resolved token values anywhere in the tree:
      </p>

      <pre>
        <code>{`import { useTheme } from '@stareezy-ui/tokens'

function MyComponent() {
  const theme = useTheme()

  return (
    <Box style={{ backgroundColor: theme.backgrounds.primary.value }}>
      <Text style={{ color: theme.text.primary.value }}>
        Themed content
      </Text>
    </Box>
  )
}`}</code>
      </pre>

      <h2>useThemeSwitch Hook</h2>
      <p>
        Toggle between themes from anywhere in the tree without prop drilling:
      </p>

      <pre>
        <code>{`import { useThemeSwitch } from '@stareezy-ui/tokens'

function ThemeToggle() {
  const { toggleTheme, isDark } = useThemeSwitch()

  return (
    <Button
      onPress={toggleTheme}
      text={isDark ? '☀ Light mode' : '☾ Dark mode'}
    />
  )
}`}</code>
      </pre>

      <h2>Semantic Color Tokens</h2>
      <p>
        Semantic tokens map roles to primitive colors and automatically update
        when the theme changes:
      </p>

      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-2)",
          borderRadius: 12,
          overflow: "hidden",
          margin: "1rem 0 1.5rem",
        }}
      >
        {[
          ["semanticColors.text.primary", "→ raisinBlack[800]", "#0F1010"],
          ["semanticColors.text.secondary", "→ beauBlue[700]", "#7D868E"],
          ["semanticColors.text.placeholder", "→ beauBlue[600]", "#A6B3BD"],
          ["semanticColors.backgrounds.disabled", "→ beauBlue[50]", "#FAFBFF"],
          [
            "semanticColors.border.primaryBrand",
            "→ celurenBlue[500]",
            "#024CCE",
          ],
        ].map(([token, ref, hex]) => (
          <div
            key={token}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.65rem 1rem",
              borderBottom: "1px solid var(--color-border-2)",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                background: hex,
                border: "1px solid rgba(0,0,0,0.08)",
                flexShrink: 0,
              }}
            />
            <code
              style={{ fontSize: "0.8rem", color: "var(--brand-500)", flex: 1 }}
            >
              {token}
            </code>
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--color-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {ref}
            </span>
          </div>
        ))}
      </div>

      <h2>Nested Themes</h2>
      <p>
        Child <code>ThemeProvider</code> instances override only the tokens they
        specify and inherit the rest from the nearest ancestor:
      </p>

      <pre>
        <code>{`<ThemeProvider theme="light">
  <Box>Normal light content</Box>

  <ThemeProvider theme="dark">
    <Box>This section is dark</Box>

    <ThemeProvider theme={{ text: { primary: colors.celurenBlue[300] } }}>
      <Box>Custom text color, dark background</Box>
    </ThemeProvider>
  </ThemeProvider>
</ThemeProvider>`}</code>
      </pre>

      <h2>Web: CSS Variables</h2>
      <p>
        On web, <code>ThemeProvider</code> injects CSS variables under{" "}
        <code>[data-theme="name"]</code>:
      </p>

      <pre>
        <code>{`[data-theme="light"] {
  --text-primary: #0F1010;
  --backgrounds-disabled: #FAFBFF;
  --border-primaryBrand: #024CCE;
}

[data-theme="dark"] {
  --text-primary: #ffffff;
  --backgrounds-disabled: #1a1a2e;
  --border-primaryBrand: #4E82DD;
}`}</code>
      </pre>

      <Callout type="info">
        On React Native, resolved token values are provided via React context.
        Use <code>useTheme()</code> to access them — no CSS variables involved.
      </Callout>
    </DocPage>
  );
}
