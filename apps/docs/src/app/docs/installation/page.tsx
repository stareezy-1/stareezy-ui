import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install Stareezy UI in your React Native or web project. Scaffold with the CLI or wire manually — get running in minutes.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/installation" },
};

export default function InstallationPage() {
  return (
    <DocPage
      title="Installation"
      description="Scaffold a pre-wired project in one command, or wire an existing project manually — your choice."
      badge="Getting Started"
      icon="↓"
    >
      <Callout type="tip">
        The fastest path is the CLI:{" "}
        <code>npx stareezy create my-app --template next</code>. It scaffolds a
        fully wired project with <code>stareezy.config.ts</code>, the compiler
        plugin, and <code>ThemeProvider</code> already set up.
      </Callout>

      {/* ── CLI (recommended) ─────────────────────────────────────────────── */}
      <h2>Option A — CLI (recommended)</h2>
      <p>
        The <code>@stareezy-ui/cli</code> scaffolds a pre-wired starter project
        for Next.js, Vite, or Expo. No manual wiring — everything is ready to
        run.
      </p>

      <h3>Next.js 15 (App Router)</h3>
      <pre>
        <code>{`npx stareezy create my-app --template next
cd my-app
pnpm install
pnpm dev`}</code>
      </pre>

      <h3>Vite + React 19</h3>
      <pre>
        <code>{`npx stareezy create my-app --template vite
cd my-app
npm install
npm run dev`}</code>
      </pre>

      <h3>Expo SDK 56</h3>
      <pre>
        <code>{`npx stareezy create my-app --template expo
cd my-app
yarn install
expo start`}</code>
      </pre>

      <p>Each template ships with:</p>
      <ul>
        <li>
          <code>stareezy.config.ts</code> with <code>media</code> breakpoints
          and <code>shorthands</code> pre-configured
        </li>
        <li>
          Compiler wiring (Vite plugin for Next.js/Vite, Metro transformer for
          Expo)
        </li>
        <li>
          <code>ThemeProvider</code> wrapping the app root
        </li>
        <li>A curated set of components ready to use</li>
      </ul>

      <Callout type="info">
        If you already have a project, run <code>npx stareezy init</code> to add
        just the wiring. It is idempotent — safe to run multiple times.
      </Callout>

      {/* ── Option B: Manual ──────────────────────────────────────────────── */}
      <h2>Option B — Manual</h2>
      <p>Install the packages individually and wire them yourself.</p>

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
          { icon: "◈", label: "pnpm 9+ / npm / yarn" },
          { icon: "⚛", label: "React 18 or 19" },
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
      <pre>
        <code>{`# Tokens only (zero dependencies)
pnpm add @stareezy-ui/tokens

# Full component library
pnpm add @stareezy-ui/tokens @stareezy-ui/components @stareezy-ui/runtime

# Build-time compiler (Vite, Babel, or Metro)
pnpm add -D @stareezy-ui/compiler`}</code>
      </pre>

      <h2>Setup</h2>

      <Step n={1} title="Create stareezy.config.ts">
        Create a config file at your project root. This is read by the compiler
        automatically and registers your themes, tokens, breakpoints, and
        shorthands.
        <pre>
          <code>{`// stareezy.config.ts
import { createUi, themes } from '@stareezy-ui/tokens'

export const ui = createUi({
  themes: {
    aurora:        themes.aurora,
    dark:          themes.dark,
    light:         themes.light,
    'steins-gate': themes['steins-gate'],
    quasar:        themes.quasar,
  },
  // Responsive breakpoints (mobile-first, min-width in px)
  media: {
    sm: 480, md: 768, lg: 1024, xl: 1280, '2xl': 1536,
  },
  // Custom shorthand props — these become valid BoxProps everywhere
  shorthands: {
    p: 'padding', m: 'margin', br: 'borderRadius', w: 'width',
  } as const,  // ← as const is required
})

// Module augmentation — makes your config flow into the type system
declare module '@stareezy-ui/tokens' {
  interface SzrCustomConfig extends typeof ui {}
}

export default ui`}</code>
        </pre>
      </Step>

      <Step n={2} title="Add the compiler plugin">
        <p>
          <strong>Next.js</strong> — in <code>next.config.ts</code>:
        </p>
        <pre>
          <code>{`import { stareezyVitePlugin } from '@stareezy-ui/compiler'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(stareezyVitePlugin())
    return config
  },
}
export default nextConfig`}</code>
        </pre>
        <p>
          <strong>Vite</strong> — in <code>vite.config.ts</code>:
        </p>
        <pre>
          <code>{`import { stareezyVitePlugin } from '@stareezy-ui/compiler'
export default { plugins: [stareezyVitePlugin()] }`}</code>
        </pre>
        <p>
          <strong>Expo / Metro</strong> — in <code>metro.config.js</code>:
        </p>
        <pre>
          <code>{`const { getDefaultConfig } = require('expo/metro-config')
const config = getDefaultConfig(__dirname)
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('@stareezy-ui/compiler/metro'),
}
module.exports = config`}</code>
        </pre>
      </Step>

      <Step n={3} title="Wrap your app with ThemeProvider">
        <pre>
          <code>{`import './stareezy.config'  // must be first import
import { ThemeProvider } from '@stareezy-ui/tokens'

export default function App({ children }) {
  return (
    <ThemeProvider defaultTheme="aurora">
      {children}
    </ThemeProvider>
  )
}`}</code>
        </pre>
        <Callout type="info">
          For Next.js App Router, wrap <code>ThemeProvider</code> in a{" "}
          <code>&quot;use client&quot;</code> component. See the{" "}
          <a href="/docs/server">Server Components guide</a> for the full
          pattern.
        </Callout>
      </Step>

      <Step n={4} title="Verify">
        <pre>
          <code>{`import { t } from '@stareezy-ui/tokens'
import { Box, Text, Button } from '@stareezy-ui/components'

function Test() {
  return (
    // t.* props resolve to the current theme's value at render time
    <Box bg={t.backgrounds.secondary} p={16} rounded={8}>
      <Text type="M-heading-bold" text="Stareezy UI is working!" />
      <Button type="Primary" text="Click me" />
    </Box>
  )
}`}</code>
        </pre>
      </Step>

      <Callout type="tip">
        The compiler is optional — components work without it using the runtime
        adapter. The compiler gives you better performance by extracting atomic
        CSS at build time.
      </Callout>

      {/* ── Compatibility ─────────────────────────────────────────────────── */}
      <h2>Compatibility</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Framework</th>
              <th>Supported</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["React", "18, 19"],
              ["React Native", "0.81 – 0.86"],
              ["Expo SDK", "54, 55, 56"],
              ["Next.js", "14, 15, 16"],
              ["Vite", "4, 5, 6, 7"],
            ].map(([fw, ver]) => (
              <tr key={fw}>
                <td>
                  <strong>{fw}</strong>
                </td>
                <td
                  style={{ color: "var(--color-text-2)", fontSize: "0.875rem" }}
                >
                  {ver}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        See the <a href="/docs/compatibility">Compatibility guide</a> for full
        details and installation instructions per framework.
      </p>
    </DocPage>
  );
}
