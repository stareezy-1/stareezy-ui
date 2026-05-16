import type { Metadata } from "next";
import { DocPage, Callout, Step } from "apps/docs/src/components/DocPage";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install Stareezy UI in your React Native or web project. Get started with the typed design token system and component library in minutes.",
  keywords: [
    "install stareezy ui",
    "npm install",
    "pnpm install",
    "react native design system",
    "design tokens setup",
  ],
  alternates: { canonical: "https://ui.stareezy.tech/docs/installation" },
  openGraph: {
    title: "Installation — Stareezy UI",
    description:
      "Install Stareezy UI in your React Native or web project in minutes.",
    url: "https://ui.stareezy.tech/docs/installation",
  },
};

export default function InstallationPage() {
  return (
    <DocPage
      title="Installation"
      description="Get Stareezy UI running in your project in under 5 minutes."
      badge="Getting Started"
      icon="↓"
    >
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

      <h2>Install Packages</h2>
      <p>
        Install only what you need — each package is independently
        tree-shakeable.
      </p>

      <pre>
        <code>{`# Tokens only (zero dependencies)
pnpm add @stareezy-ui/tokens

# Full component library
pnpm add @stareezy-ui/tokens @stareezy-ui/components @stareezy-ui/runtime

# Build-time compiler (Vite or Babel)
pnpm add -D @stareezy-ui/compiler`}</code>
      </pre>

      <h2>Setup Guide</h2>

      <Step n={1} title="Vite Setup">
        Add the Vite plugin to your <code>vite.config.ts</code>:
        <pre>
          <code>{`import { stareezyVitePlugin } from '@stareezy-ui/compiler'

export default {
  plugins: [stareezyVitePlugin()],
}`}</code>
        </pre>
      </Step>

      <Step n={2} title="Metro Setup (React Native)">
        Add the Babel plugin to your <code>babel.config.js</code>:
        <pre>
          <code>{`module.exports = {
  plugins: ['@stareezy-ui/compiler/babel'],
}`}</code>
        </pre>
      </Step>

      <Step n={3} title="Wrap Your App">
        Wrap your root component with <code>ThemeProvider</code>:
        <pre>
          <code>{`import { ThemeProvider } from '@stareezy-ui/tokens'

export default function App() {
  return (
    <ThemeProvider theme="light">
      {/* your app */}
    </ThemeProvider>
  )
}`}</code>
        </pre>
      </Step>

      <Callout type="tip">
        You can use <code>createUi()</code> to register custom tokens and
        breakpoints at startup — see the <a href="/docs/usage">Usage guide</a>{" "}
        for details.
      </Callout>

      <h2>Verify Installation</h2>
      <pre>
        <code>{`import { colors, spacing } from '@stareezy-ui/tokens'
import { Box, Text } from '@stareezy-ui/components'

// If this renders without errors, you're good to go!
function Test() {
  return (
    <Box bg={colors.celurenBlue[500]} p={spacing[4]}>
      <Text text="Stareezy UI is working!" />
    </Box>
  )
}`}</code>
      </pre>

      <Callout type="info">
        The compiler is optional — components work without it using the runtime
        adapter. The compiler just gives you better performance by extracting
        atomic CSS at build time.
      </Callout>
    </DocPage>
  );
}
