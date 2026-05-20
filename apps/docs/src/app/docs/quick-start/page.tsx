import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Quick Start",
  description:
    "Complete guide to Stareezy UI — from installation to theme-reactive components, createUi config, and build-time optimization.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/quick-start" },
};

export default function QuickStartPage() {
  return (
    <DocPage
      title="Quick Start"
      description="Everything from zero to a fully themed, type-safe component tree — in one page."
      badge="Guide"
      icon="▶"
      badgeColor="#00cc6a"
    >
      <Callout type="tip">
        This page covers the complete setup path. If you already know the
        basics, jump to the section you need using the headings below.
      </Callout>

      {/* ── 1. Install ────────────────────────────────────────────────────── */}
      <h2>1. Install</h2>
      <p>
        Install the packages you need. Start with <code>tokens</code> and{" "}
        <code>components</code> — everything else is optional.
      </p>

      <Step n={1} title="Install packages">
        <pre>
          <code>{`# pnpm (recommended)
pnpm add @stareezy-ui/tokens @stareezy-ui/components

# yarn
yarn add @stareezy-ui/tokens @stareezy-ui/components

# npm
npm install @stareezy-ui/tokens @stareezy-ui/components`}</code>
        </pre>
        <p style={{ marginTop: "0.75rem" }}>
          Optional packages — install only what you need:
        </p>
        <pre>
          <code>{`# Build-time compiler (Babel/Vite/Metro) — zero runtime cost
pnpm add -D @stareezy-ui/compiler

# Atomic CSS sheet management
pnpm add @stareezy-ui/stylesheet

# Utilities and platform helpers
pnpm add @stareezy-ui/core`}</code>
        </pre>
      </Step>

      {/* ── 2. Create config ──────────────────────────────────────────────── */}
      <h2>2. Create your config</h2>
      <p>
        Create a <code>stareezy.config.ts</code> (or <code>ui.config.ts</code>)
        at the root of your project. This is the single source of truth for your
        design system — themes, custom tokens, breakpoints, and shorthands.
      </p>

      <Step n={2} title="stareezy.config.ts">
        <pre>
          <code>{`// stareezy.config.ts
import { createUi, token, themes } from '@stareezy-ui/tokens'

export const ui = createUi({
  // Register all four built-in themes
  themes: {
    aurora:        themes.aurora,
    dark:          themes.dark,
    light:         themes.light,
    'steins-gate': themes['steins-gate'],
  },

  // Your custom token groups — fully typed on ui.tokens
  tokens: {
    brand: {
      primary:   token('#FF6B35', 'brand-primary'),
      secondary: token('#004E89', 'brand-secondary'),
    },
  },

  // Responsive breakpoints (mobile-first, min-width in px)
  media: {
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  // Prop shorthands — these become valid BoxProps automatically
  shorthands: {
    bg:  'backgroundColor',
    p:   'padding',
    px:  'paddingHorizontal',
    py:  'paddingVertical',
    m:   'margin',
    mx:  'marginHorizontal',
    my:  'marginVertical',
    br:  'borderRadius',
    f:   'flex',
    w:   'width',
    h:   'height',
  } as const,
})

// ── Module augmentation ──────────────────────────────────────────────────
// This makes your shorthands flow into BoxProps as typed props.
// Without this, TypeScript won't know about your custom shorthands.
type AppConfig = typeof ui
declare module '@stareezy-ui/tokens' {
  interface SzrCustomConfig extends AppConfig {}
}

export default ui`}</code>
        </pre>
      </Step>

      <Callout type="info">
        The <code>as const</code> on <code>shorthands</code> is required — it
        tells TypeScript to infer the literal types of the keys so the module
        augmentation works correctly.
      </Callout>

      {/* ── 3. Wrap your app ──────────────────────────────────────────────── */}
      <h2>3. Wrap your app</h2>
      <p>
        Add <code>ThemeProvider</code> at the root of your app. Pass your
        default theme name.
      </p>

      <Step n={3} title="Root layout / App.tsx">
        <pre>
          <code>{`// app/_layout.tsx (Expo Router) or App.tsx (React Native)
import { ThemeProvider } from '@stareezy-ui/tokens'

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme="aurora">
      {children}
    </ThemeProvider>
  )
}

// Next.js — app/layout.tsx
import { ThemeProvider } from '@stareezy-ui/tokens'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme="aurora">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`}</code>
        </pre>
      </Step>

      {/* ── 4. Use theme-reactive props ───────────────────────────────────── */}
      <h2>4. Use theme-reactive props</h2>
      <p>
        The <code>t</code> accessor returns <strong>ThemeToken</strong>{" "}
        references. Pass them as props — they resolve to the current
        theme&apos;s value at render time and update automatically when the
        theme switches.
      </p>

      <Step n={4} title="Theme-reactive component">
        <pre>
          <code>{`import { t } from '@stareezy-ui/tokens'
import { Box, Text } from '@stareezy-ui/components'

function Card() {
  return (
    // t.* props resolve to the CURRENT theme's value at render time
    <Box
      bg={t.backgrounds.secondary}
      borderColor={t.border.primaryBrand}
      borderWidth={1}
      rounded={12}
      p={16}
    >
      <Text
        type="M-heading-bold"
        style={{ color: t.text.primary }}
        text="Hello, Stareezy UI"
      />
      <Text
        type="M-paragraph-regular"
        style={{ color: t.text.secondary }}
        text="This text color switches with the theme."
      />
    </Box>
  )
}

// aurora      → bg: beauBlue[50], border: #00ff88, text: #f0f0f8
// dark        → bg: raisinBlack[600], border: #024cce, text: #f0f6fc
// steins-gate → bg: midnightNavy, border: #4a9eff, text: #e8dcc8`}</code>
        </pre>
      </Step>

      {/* ── 5. Use static tokens ──────────────────────────────────────────── */}
      <h2>5. Use static tokens</h2>
      <p>
        For values that should be the same across all themes, use static tokens
        directly. These always resolve to their fixed <code>.value</code>.
      </p>

      <Step n={5} title="Static token props">
        <pre>
          <code>{`import { colors, spacing, radius } from '@stareezy-ui/tokens'
import { Box } from '@stareezy-ui/components'

// Static tokens — always the same value regardless of theme
<Box
  bg={colors.celurenBlue[500]}   // always #024CCE
  p={spacing[4]}                 // always 16px
  rounded={radius.md}            // always 10px
/>

// Access raw values for non-Box contexts
const style = {
  backgroundColor: colors.celurenBlue[500].value,  // "#024CCE"
  padding: spacing[4].value,                        // 16
  borderRadius: radius.md.value,                    // 10
}`}</code>
        </pre>
      </Step>

      {/* ── 6. Use your custom tokens ─────────────────────────────────────── */}
      <h2>6. Use your custom tokens</h2>
      <p>
        Custom tokens registered in <code>createUi()</code> are available on{" "}
        <code>ui.tokens</code> with full type safety.
      </p>

      <Step n={6} title="Custom token access">
        <pre>
          <code>{`import { ui } from './stareezy.config'

// Fully typed — TypeScript knows about your custom tokens
ui.tokens.brand.primary.value   // "#FF6B35"
ui.tokens.brand.secondary.value // "#004E89"

// Use in components
<Box bg={ui.tokens.brand.primary} />

// ui.t is the same as the standalone t accessor
<Box bg={ui.t.backgrounds.primary} />`}</code>
        </pre>
      </Step>

      {/* ── 7. Switch themes ──────────────────────────────────────────────── */}
      <h2>7. Switch themes</h2>
      <p>
        Use <code>useThemeSwitch</code> to switch themes from anywhere in the
        tree. All components using <code>t.*</code> props update automatically.
      </p>

      <Step n={7} title="Theme switcher component">
        <pre>
          <code>{`import { useThemeSwitch } from '@stareezy-ui/tokens'

function ThemeSwitcher() {
  const { theme, setTheme } = useThemeSwitch()

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {['aurora', 'dark', 'light', 'steins-gate'].map((name) => (
        <button
          key={name}
          onClick={() => setTheme(name)}
          style={{
            fontWeight: theme === name ? 700 : 400,
            opacity: theme === name ? 1 : 0.6,
          }}
        >
          {name}
        </button>
      ))}
    </div>
  )
}`}</code>
        </pre>
      </Step>

      {/* ── 8. Build-time compiler ────────────────────────────────────────── */}
      <h2>8. Add the build-time compiler (optional)</h2>
      <p>
        Add the plugin to your build tool config. It reads{" "}
        <code>stareezy.config.ts</code> from your project root automatically —
        you don&apos;t pass the config path, just like Tamagui&apos;s{" "}
        <code>@tamagui/babel-plugin</code>.
      </p>

      <Step n={8} title="Vite (Next.js, Vite apps)">
        <pre>
          <code>{`// vite.config.ts
import { stareezyVitePlugin } from '@stareezy-ui/compiler'

export default {
  plugins: [stareezyVitePlugin()],
  // ↑ reads stareezy.config.ts automatically — no path needed
}`}</code>
        </pre>
      </Step>

      <Step n={9} title="Babel + Metro (React Native / Expo)">
        <pre>
          <code>{`// babel.config.js
const { stareezyBabelPlugin } = require('@stareezy-ui/compiler')

module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [stareezyBabelPlugin()],
  // ↑ reads stareezy.config.ts automatically — no path needed
}

// metro.config.js
const { getDefaultConfig } = require('expo/metro-config')
const config = getDefaultConfig(__dirname)
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('@stareezy-ui/compiler/metro'),
  // ↑ reads stareezy.config.ts automatically — no path needed
}
module.exports = config`}</code>
        </pre>
      </Step>

      <Callout type="tip">
        The compiler finds <code>stareezy.config.ts</code> by searching{" "}
        <code>process.cwd()</code> (your project root). As long as the file is
        there, the plugin picks up your shorthands automatically.
      </Callout>

      {/* ── 9. Custom shorthands ──────────────────────────────────────────── */}
      <h2>9. Custom shorthands in action</h2>
      <p>
        Once you&apos;ve declared your shorthands in{" "}
        <code>stareezy.config.ts</code> and added the module augmentation,
        TypeScript knows about them everywhere:
      </p>

      <pre>
        <code>{`// With the shorthands from step 2:
// bg → backgroundColor, br → borderRadius, f → flex

// ✅ These are now valid typed props — TypeScript autocompletes them
<Box bg={t.backgrounds.primary} br={12} f={1} />
<Box bg={colors.celurenBlue[500]} p={16} m={8} />

// ✅ Works with tokens, ThemeTokens, and plain values
<Box bg={t.backgrounds.primary} />   // ThemeToken — switches with theme
<Box bg={colors.celurenBlue[500]} /> // Token<string> — always #024CCE
<Box bg="#FF6B35" />                 // plain string — always this color`}</code>
      </pre>

      {/* ── 10. Resolve manually ──────────────────────────────────────────── */}
      <h2>10. Resolve ThemeTokens manually</h2>
      <p>
        When you need the raw string value inside a component (e.g. for a
        canvas, SVG, or non-Box element), use <code>useResolveThemeToken</code>:
      </p>

      <pre>
        <code>{`import { t, useResolveThemeToken } from '@stareezy-ui/tokens'

function MyCanvas() {
  const brandColor = useResolveThemeToken(t.text.importantBrand)
  // aurora      → "#00ff88"
  // steins-gate → "#4a9eff"
  // dark/light  → "#024cce"

  return <canvas style={{ borderColor: brandColor }} />
}`}</code>
      </pre>

      {/* ── Summary ───────────────────────────────────────────────────────── */}
      <h2>Summary</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "0.75rem",
          margin: "1rem 0",
        }}
      >
        {[
          {
            step: "1",
            title: "Install",
            desc: "pnpm add @stareezy-ui/tokens @stareezy-ui/components",
          },
          {
            step: "2",
            title: "Config",
            desc: "Create stareezy.config.ts with createUi() + module augmentation",
          },
          {
            step: "3",
            title: "ThemeProvider",
            desc: 'Wrap your app root with <ThemeProvider theme="aurora">',
          },
          {
            step: "4",
            title: "t.* props",
            desc: "Use t.backgrounds.primary, t.text.primary for theme-reactive colors",
          },
          {
            step: "5",
            title: "Static tokens",
            desc: "Use colors.celurenBlue[500], spacing[4] for fixed values",
          },
          {
            step: "6",
            title: "Custom tokens",
            desc: "Access ui.tokens.brand.primary with full type safety",
          },
          {
            step: "7",
            title: "Theme switching",
            desc: "useThemeSwitch().setTheme('steins-gate') — all components update",
          },
          {
            step: "8",
            title: "Compiler",
            desc: "stareezyVitePlugin() or stareezyBabelPlugin() for zero runtime cost",
          },
        ].map((item) => (
          <div
            key={item.step}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "0.85rem 1rem",
              display: "flex",
              gap: "0.75rem",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "var(--brand-500)",
                color: "var(--color-bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.72rem",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {item.step}
            </div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "var(--color-text)",
                  marginBottom: 2,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-2)",
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="info">
        The full API reference is in the <a href="/docs/usage">Token API</a> and{" "}
        <a href="/docs/theming">Theming</a> guides. The{" "}
        <a href="/tokens">Token Explorer</a> lets you browse all 300+ tokens
        visually.
      </Callout>
    </DocPage>
  );
}
