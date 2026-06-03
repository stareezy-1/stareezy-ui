import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Quick Start",
  description:
    "Complete guide to Stareezy UI — CLI scaffolding, manual setup, theme-reactive components, responsive props, and build-time optimization.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/quick-start" },
};

export default function QuickStartPage() {
  return (
    <DocPage
      title="Quick Start"
      description="From zero to a fully themed, type-safe, responsive component tree — in one page."
      badge="Guide"
      icon="▶"
      badgeColor="#00cc6a"
    >
      <Callout type="tip">
        Fastest path: <code>npx stareezy create my-app --template next</code>.
        This scaffolds a pre-wired Next.js 15 project with everything set up.
        Skip to step 4 if you use the CLI.
      </Callout>

      {/* ── 1. Scaffold with the CLI ──────────────────────────────────────── */}
      <h2>1. Scaffold with the CLI</h2>
      <p>
        The <code>@stareezy-ui/cli</code> creates a fully pre-wired project with
        one command. Choose your template:
      </p>

      <Step n={1} title="Create a new project">
        <pre>
          <code>{`# Next.js 15 App Router (React 19)
npx stareezy create my-app --template next

# Vite + React 19
npx stareezy create my-app --template vite

# Expo SDK 56 (React Native 0.85)
npx stareezy create my-app --template expo`}</code>
        </pre>
        <p style={{ marginTop: "0.75rem" }}>
          Omit <code>--template</code> to get an interactive prompt. Each
          template ships with <code>stareezy.config.ts</code>, the compiler
          plugin, <code>ThemeProvider</code>, and a demo screen.
        </p>
      </Step>

      <Callout type="info">
        If you already have a project, use <code>npx stareezy init</code> to add
        the config and wiring, or{" "}
        <code>npx stareezy add button input card</code> to install specific
        components.
      </Callout>

      {/* ── 2. Manual install ─────────────────────────────────────────────── */}
      <h2>2. Manual install (skip if you used the CLI)</h2>

      <Step n={2} title="Install packages">
        <pre>
          <code>{`# pnpm (recommended)
pnpm add @stareezy-ui/tokens @stareezy-ui/components
pnpm add -D @stareezy-ui/compiler

# yarn
yarn add @stareezy-ui/tokens @stareezy-ui/components
yarn add -D @stareezy-ui/compiler

# npm
npm install @stareezy-ui/tokens @stareezy-ui/components
npm install -D @stareezy-ui/compiler`}</code>
        </pre>
      </Step>

      {/* ── 3. Create config ──────────────────────────────────────────────── */}
      <h2>3. Create your config</h2>
      <p>
        Create <code>stareezy.config.ts</code> at the root of your project. The
        module augmentation makes your config flow into the type system — so
        autocomplete and type errors reflect your exact setup.
      </p>

      <Step n={3} title="stareezy.config.ts">
        <pre>
          <code>{`// stareezy.config.ts
import { createUi, themes } from '@stareezy-ui/tokens'

export const ui = createUi({
  // Five built-in themes
  themes: {
    aurora:        themes.aurora,
    dark:          themes.dark,
    light:         themes.light,
    'steins-gate': themes['steins-gate'],
    quasar:        themes.quasar,
  },

  // Responsive breakpoints (mobile-first, min-width in px)
  // These become the valid keys for responsive objects and $-prefixed props
  media: {
    sm: 480, md: 768, lg: 1024, xl: 1280, '2xl': 1536,
  },

  // Prop shorthands — become valid props on Box and every component
  shorthands: {
    p:  'padding',   px: 'paddingHorizontal', py: 'paddingVertical',
    m:  'margin',    mx: 'marginHorizontal',  my: 'marginVertical',
    br: 'borderRadius', w: 'width', h: 'height', f: 'flex',
  } as const,  // ← as const is required
})

// Module augmentation — makes BreakpointKey + shorthands flow into BoxProps
declare module '@stareezy-ui/tokens' {
  interface SzrCustomConfig extends typeof ui {}
}

export default ui`}</code>
        </pre>
      </Step>

      {/* ── 4. Wrap your app ──────────────────────────────────────────────── */}
      <h2>4. Wrap your app with ThemeProvider</h2>

      <Step n={4} title="App root / layout">
        <pre>
          <code>{`// Next.js: app/providers.tsx  (note: "use client" required)
'use client'
import { ThemeProvider } from '@stareezy-ui/tokens'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="aurora">{children}</ThemeProvider>
}

// Next.js: app/layout.tsx
import { Providers } from './providers'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  )
}

// Vite / Expo: wrap App directly
import { ThemeProvider } from '@stareezy-ui/tokens'
function App() {
  return <ThemeProvider defaultTheme="aurora"><AppContent /></ThemeProvider>
}`}</code>
        </pre>
      </Step>

      {/* ── 5. Theme-reactive props ───────────────────────────────────────── */}
      <h2>5. Use theme-reactive props</h2>
      <p>
        The <code>t</code> accessor returns <strong>ThemeToken</strong>{" "}
        references. They resolve to the current theme&apos;s value at render
        time and update automatically when the theme switches.
      </p>

      <Step n={5} title="Theme-reactive component">
        <pre>
          <code>{`import { t } from '@stareezy-ui/tokens'
import { Box, Text, Button } from '@stareezy-ui/components'

function Card() {
  return (
    <Box
      bg={t.backgrounds.secondary}
      borderColor={t.border.primaryBrand}
      p={16}
      rounded={12}
    >
      <Text
        type="M-heading-bold"
        style={{ color: t.text.primary }}
        text="Theme-reactive"
      />
      <Text
        type="M-paragraph-regular"
        style={{ color: t.text.secondary }}
        text="This switches with the theme automatically."
      />
      <Button type="Primary" text="Click me" mt={12} />
    </Box>
  )
}
// aurora → bg: dark surface, border: #00ff88
// quasar → bg: deep violet, border: #a855f7
// light  → bg: white,       border: #024cce`}</code>
        </pre>
      </Step>

      {/* ── 6. Responsive props ───────────────────────────────────────────── */}
      <h2>6. Use responsive props</h2>
      <p>
        All components accept responsive objects and <code>$</code>-prefixed
        breakpoint groups — derived from your{" "}
        <code>createUi({"{ media }"})</code> config.
      </p>

      <Step n={6} title="Responsive layout props on any component">
        <pre>
          <code>{`// Responsive object syntax — mobile-first cascade
<Box p={{ base: 8, md: 16, lg: 24 }} flexDirection={{ base: 'column', lg: 'row' }} />

// $-prefixed group syntax — equivalent, but groups multiple props per breakpoint
<Box $md={{ p: 16, br: 8 }} $lg={{ p: 24, br: 12, flexDirection: 'row' }} />

// Works on EVERY component — not just Box
<Button  p={{ base: 8, md: 12 }} w={{ base: '100%', md: 'auto' }} />
<Input   w={{ base: '100%', md: 360 }} mb={8} />
<Card    p={{ base: 12, md: 20 }} $lg={{ flexDirection: 'row' }} />
<Drawer  open={open} onClose={close} $md={{ p: 24 }} />

// Custom shorthands are also responsive:
<Box br={{ base: 4, md: 8, lg: 12 }} />    // borderRadius
<Box w={{ base: '100%', md: 320 }} />      // width`}</code>
        </pre>
      </Step>

      {/* ── 7. Static tokens ──────────────────────────────────────────────── */}
      <h2>7. Use static tokens</h2>

      <Step n={7} title="Static token props">
        <pre>
          <code>{`import { colors, spacing, radius } from '@stareezy-ui/tokens'

// Static tokens — same value regardless of theme
<Box bg={colors.celurenBlue[500]} p={spacing[4]} rounded={radius.md} />

// Raw .value for non-Box contexts (canvas, SVG, StyleSheet, etc.)
const style = {
  backgroundColor: colors.celurenBlue[500].value,  // "#024CCE"
  padding: spacing[4].value,                        // 16
  borderRadius: radius.md.value,                    // 8
}`}</code>
        </pre>
      </Step>

      {/* ── 8. RSC server entry ───────────────────────────────────────────── */}
      <h2>8. React Server Components</h2>
      <p>
        Import layout primitives from the <code>&quot;./server&quot;</code>{" "}
        entry — hook-free, safe in Next.js App Router Server Components.
      </p>

      <Step n={8} title="Server Component">
        <pre>
          <code>{`// app/page.tsx — Server Component (default in Next.js App Router)
import { Box, Stack, Text } from '@stareezy-ui/components/server'
import { HeroActions } from './HeroActions'  // 'use client'

export default async function Page() {
  const data = await fetchData()  // server-side, no useEffect needed
  return (
    <Box p={{ base: 16, md: 32 }}>
      <Stack gap={16}>
        <Text style={{ fontSize: 32, fontWeight: 800 }}>{data.title}</Text>
        <HeroActions />  {/* Only this needs "use client" */}
      </Stack>
    </Box>
  )
}`}</code>
        </pre>
      </Step>

      {/* ── 9. Theme switching ────────────────────────────────────────────── */}
      <h2>9. Switch themes</h2>

      <Step n={9} title="useThemeSwitch">
        <pre>
          <code>{`import { useThemeSwitch } from '@stareezy-ui/tokens'

function ThemeSwitcher() {
  const { theme, setTheme, toggleTheme } = useThemeSwitch()

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {['aurora', 'dark', 'light', 'steins-gate', 'quasar'].map((name) => (
        <button
          key={name}
          onClick={() => setTheme(name)}
          style={{ fontWeight: theme === name ? 700 : 400 }}
        >
          {name}
        </button>
      ))}
    </div>
  )
}`}</code>
        </pre>
      </Step>

      {/* ── 10. Build-time compiler ───────────────────────────────────────── */}
      <h2>10. Add the compiler (optional but recommended)</h2>

      <Step n={10} title="Vite / Next.js">
        <pre>
          <code>{`// vite.config.ts
import { stareezyVitePlugin } from '@stareezy-ui/compiler'
export default { plugins: [stareezyVitePlugin()] }

// next.config.ts
import { stareezyVitePlugin } from '@stareezy-ui/compiler'
export default {
  webpack(config) {
    config.plugins.push(stareezyVitePlugin())
    return config
  }
}`}</code>
        </pre>
      </Step>

      <Step n={11} title="Expo / Metro">
        <pre>
          <code>{`// metro.config.js
const { getDefaultConfig } = require('expo/metro-config')
const config = getDefaultConfig(__dirname)
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('@stareezy-ui/compiler/metro'),
}
module.exports = config`}</code>
        </pre>
      </Step>

      <Callout type="tip">
        The compiler reads <code>stareezy.config.ts</code> from your project
        root automatically — no path argument needed.
      </Callout>

      {/* ── 11. Add components ────────────────────────────────────────────── */}
      <h2>11. Add components to an existing project</h2>
      <p>
        Use <code>stareezy add</code> to install specific components with
        automatic transitive dependency resolution:
      </p>
      <pre>
        <code>{`npx stareezy add button input card
npx stareezy add drawer tooltip table pagination breadcrumb`}</code>
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
            title: "CLI",
            desc: "npx stareezy create my-app --template next|vite|expo",
          },
          {
            step: "2",
            title: "Install",
            desc: "pnpm add @stareezy-ui/tokens @stareezy-ui/components",
          },
          {
            step: "3",
            title: "Config",
            desc: "stareezy.config.ts — createUi({ themes, media, shorthands })",
          },
          {
            step: "4",
            title: "ThemeProvider",
            desc: 'Wrap app root with <ThemeProvider defaultTheme="aurora">',
          },
          {
            step: "5",
            title: "t.* props",
            desc: "t.backgrounds.primary, t.text.primary — theme-reactive",
          },
          {
            step: "6",
            title: "Responsive props",
            desc: "<Box p={{ base: 8, md: 16 }} $lg={{ flexDirection: 'row' }} />",
          },
          {
            step: "7",
            title: "Static tokens",
            desc: "colors.celurenBlue[500], spacing[4], radius.md",
          },
          {
            step: "8",
            title: "Server Components",
            desc: "import { Box } from '@stareezy-ui/components/server'",
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
                  fontFamily:
                    item.step === "6" || item.step === "8"
                      ? "var(--font-mono)"
                      : undefined,
                }}
              >
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="info">
        Full API reference: <a href="/docs/api">API Reference</a> ·{" "}
        <a href="/docs/responsive">Responsive System</a> ·{" "}
        <a href="/docs/theming">Theming</a> ·{" "}
        <a href="/docs/server">Server Components</a> ·{" "}
        <a href="/docs/cli">CLI guide</a>
      </Callout>
    </DocPage>
  );
}
