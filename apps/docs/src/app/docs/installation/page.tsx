import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install Stareezy UI in your React Native or web project. Get started with the typed design token system and component library in minutes.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/installation" },
};

export default function InstallationPage() {
  return (
    <DocPage
      title="Installation"
      description="Get Stareezy UI running in your project in under 5 minutes."
      badge="Getting Started"
      icon="↓"
    >
      <Callout type="tip">
        Looking for a complete walkthrough? The{" "}
        <a href="/docs/quick-start">Quick Start guide</a> covers everything from
        install to theme-reactive components in one page.
      </Callout>

      <h2>Requirements</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "0.75rem",
          margin: "1rem 0 1.5rem",
        }}
      >
        {[
          { icon: "⬡", label: "Node.js 18+" },
          { icon: "◈", label: "pnpm 9+ (recommended)" },
          { icon: "⚛", label: "React 18+" },
          { icon: "TS", label: "TypeScript 5+" },
        ].map((r) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "var(--color-surface)",
              border: "1px solid var(--color-border-2)",
              borderRadius: 10,
              padding: "0.75rem 1rem",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                color: "var(--brand-500)",
                width: 20,
                textAlign: "center",
              }}
            >
              {r.icon}
            </span>
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-text)",
              }}
            >
              {r.label}
            </span>
          </div>
        ))}
      </div>

      <h2>Install packages</h2>
      <p>
        Install only what you need — each package is independently
        tree-shakeable.
      </p>
      <pre>
        <code>{`# Tokens only (zero dependencies)
pnpm add @stareezy-ui/tokens

# Full component library
pnpm add @stareezy-ui/tokens @stareezy-ui/components @stareezy-ui/runtime

# Build-time compiler (Vite, Babel, or Metro)
pnpm add -D @stareezy-ui/compiler

# Utilities and platform helpers
pnpm add @stareezy-ui/core`}</code>
      </pre>

      <h2>Setup</h2>

      <Step n={1} title="Create stareezy.config.ts">
        Create a config file at your project root. This is read by the compiler
        automatically and registers your themes, tokens, and shorthands.
        <pre>
          <code>{`// stareezy.config.ts
import { createUi, themes } from '@stareezy-ui/tokens'

export const ui = createUi({
  themes: {
    aurora:        themes.aurora,
    dark:          themes.dark,
    light:         themes.light,
    'steins-gate': themes['steins-gate'],
  },
  shorthands: {
    bg: 'backgroundColor',
    p:  'padding',
    m:  'margin',
    br: 'borderRadius',
  } as const,
})

type AppConfig = typeof ui
declare module '@stareezy-ui/tokens' {
  interface SzrCustomConfig extends AppConfig {}
}

export default ui`}</code>
        </pre>
      </Step>

      <Step n={2} title="Add the compiler plugin">
        <p>Vite / Next.js:</p>
        <pre>
          <code>{`// vite.config.ts
import { stareezyVitePlugin } from '@stareezy-ui/compiler'
export default { plugins: [stareezyVitePlugin()] }`}</code>
        </pre>
        <p>Babel (React Native / Expo):</p>
        <pre>
          <code>{`// babel.config.js
const { stareezyBabelPlugin } = require('@stareezy-ui/compiler')
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [stareezyBabelPlugin()],
}`}</code>
        </pre>
        <p>Metro (React Native):</p>
        <pre>
          <code>{`// metro.config.js
module.exports = {
  transformer: {
    babelTransformerPath: require.resolve('@stareezy-ui/compiler/metro'),
  },
}`}</code>
        </pre>
      </Step>

      <Step n={3} title="Wrap your app">
        <pre>
          <code>{`import './stareezy.config'  // must be first import
import { ThemeProvider } from '@stareezy-ui/tokens'

export default function App({ children }) {
  return (
    <ThemeProvider theme="aurora">
      {children}
    </ThemeProvider>
  )
}`}</code>
        </pre>
      </Step>

      <Step n={4} title="Verify">
        <pre>
          <code>{`import { t, colors, spacing } from '@stareezy-ui/tokens'
import { Box, Text } from '@stareezy-ui/components'

function Test() {
  return (
    // t.* props switch with theme automatically
    <Box bg={t.backgrounds.secondary} p={spacing[4]} br={8}>
      <Text type="M-heading-bold" text="Stareezy UI is working!" />
    </Box>
  )
}`}</code>
        </pre>
      </Step>

      <Callout type="info">
        The compiler is optional — components work without it using the runtime
        adapter. The compiler gives you better performance by extracting atomic
        CSS at build time instead of resolving tokens at render time.
      </Callout>
    </DocPage>
  );
}
