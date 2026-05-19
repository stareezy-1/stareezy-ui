import type { Metadata } from "next";
import { DocPage, Callout, PropRow } from "apps/docs/src/components/DocPage";

export const metadata: Metadata = {
  title: "useUiConfig",
  description:
    "Access the active Stareezy UI configuration reactively from any component using the useUiConfig hook.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/use-ui-config" },
  openGraph: {
    title: "useUiConfig — Stareezy UI",
    description: "Access the active UiConfig reactively from any component.",
    url: "https://ui.stareezy.tech/docs/use-ui-config",
  },
};

export default function UseUiConfigPage() {
  return (
    <DocPage
      title="useUiConfig"
      description="Access the active UiConfig reactively from any component — fonts, themes, media queries, animations, and shorthands all in one place."
      badge="API Reference"
      icon="◎"
      badgeColor="#7c3aed"
    >
      <h2>Overview</h2>
      <p>
        <code>useUiConfig()</code> is a React hook that returns the active{" "}
        <code>UiConfig</code> created by <code>createUi()</code>. It reads from
        the nearest <code>UiConfigProvider</code> in the tree, falling back to
        the global singleton if no provider is present.
      </p>

      <Callout type="tip">
        Use <code>useUiConfig()</code> when you need to read config values
        reactively inside a component — for example, to access registered fonts,
        themes, or media breakpoints. For non-component code, use{" "}
        <code>getUiConfig()</code> instead.
      </Callout>

      <h2>Basic Usage</h2>
      <pre>
        <code>{`import { useUiConfig } from '@stareezy-ui/tokens'

function MyComponent() {
  const ui = useUiConfig()

  // Access registered themes
  const auroraTheme = ui.getTheme('aurora')

  // Access media breakpoints
  const breakpoints = ui.getMedia()

  // Access registered fonts
  const interFont = ui.getFont('inter')

  // Access all tokens
  const tokens = ui.getTokens()

  return (
    <div style={{ maxWidth: breakpoints.md }}>
      <span style={{ color: auroraTheme.text.primary.value }}>
        Hello from aurora theme
      </span>
    </div>
  )
}`}</code>
      </pre>

      <h2>Setup: UiConfigProvider</h2>
      <p>
        Wrap your app with <code>UiConfigProvider</code> to make the config
        available to all descendants. This is the recommended approach for
        Next.js and React apps.
      </p>
      <pre>
        <code>{`// lib/ui.ts
import { createUi, token, motion, themes } from '@stareezy-ui/tokens'

export const ui = createUi({
  fonts: {
    inter: {
      family: 'Inter, system-ui, sans-serif',
      size: { sm: token(14, 'inter-sm'), md: token(16, 'inter-md') },
    },
  },
  themes: {
    aurora: themes.aurora,
  },
  animations: {
    fadeIn: { duration: motion.duration.enter, easing: motion.easing.easeOut },
    spring: { duration: motion.duration.normal, easing: motion.easing.spring },
  },
  media: { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },
  shorthands: { bg: 'backgroundColor', p: 'padding', m: 'margin' },
})

// app/layout.tsx (Next.js App Router)
import { UiConfigProvider, ThemeProvider } from '@stareezy-ui/tokens'
import { ui } from '@/lib/ui'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UiConfigProvider config={ui}>
          <ThemeProvider theme="aurora">
            {children}
          </ThemeProvider>
        </UiConfigProvider>
      </body>
    </html>
  )
}`}</code>
      </pre>

      <h2>Accessing Themes</h2>
      <p>
        Use <code>getTheme(name)</code> to retrieve a registered theme's full
        token map. Throws <code>ThemeNotFoundError</code> if the theme isn't
        registered.
      </p>
      <pre>
        <code>{`import { useUiConfig, ThemeNotFoundError } from '@stareezy-ui/tokens'

function ThemedCard() {
  const ui = useUiConfig()

  let theme
  try {
    theme = ui.getTheme('aurora')
  } catch (e) {
    if (e instanceof ThemeNotFoundError) {
      theme = ui.getTheme('light') // fallback
    }
  }

  return (
    <div style={{
      background: theme.backgrounds.secondary.value,
      color: theme.text.primary.value,
      border: \`1px solid \${theme.border.default.value}\`,
    }}>
      Aurora-themed card
    </div>
  )
}`}</code>
      </pre>

      <h2>Accessing Fonts</h2>
      <p>
        Use <code>getFont(name)</code> to retrieve a registered font config.
        Throws <code>FontNotFoundError</code> if the font isn't registered.
      </p>
      <pre>
        <code>{`import { useUiConfig } from '@stareezy-ui/tokens'

function StyledText({ children }: { children: React.ReactNode }) {
  const ui = useUiConfig()
  const inter = ui.getFont('inter')

  return (
    <span style={{
      fontFamily: inter.family,
      fontSize: inter.size?.md?.value,
    }}>
      {children}
    </span>
  )
}`}</code>
      </pre>

      <h2>Accessing Media Breakpoints</h2>
      <p>
        Use <code>getMedia()</code> to get the resolved breakpoint map. Useful
        for building responsive logic in components.
      </p>
      <pre>
        <code>{`import { useUiConfig } from '@stareezy-ui/tokens'
import { useDeviceLayout } from '@stareezy-ui/core'

function ResponsiveGrid({ children }: { children: React.ReactNode }) {
  const ui = useUiConfig()
  const { width } = useDeviceLayout()
  const bp = ui.getMedia()

  const columns = width >= bp.lg ? 3 : width >= bp.md ? 2 : 1

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,
      gap: 16,
    }}>
      {children}
    </div>
  )
}`}</code>
      </pre>

      <h2>Accessing Animations</h2>
      <p>
        Use <code>ui.getTokens().animations</code> — or access the registered
        animation presets directly from the config object.
      </p>
      <pre>
        <code>{`import { useUiConfig } from '@stareezy-ui/tokens'

function AnimatedBox({ children }: { children: React.ReactNode }) {
  const ui = useUiConfig()

  // Animations are stored on the config object directly
  // (not via a getAnimations() method — access via the raw config)
  const fadeIn = (ui as any).animations?.fadeIn

  const style = fadeIn ? {
    animation: \`fadeIn \${fadeIn.duration.value}ms \${fadeIn.easing.value} both\`,
  } : {}

  return <div style={style}>{children}</div>
}`}</code>
      </pre>

      <h2>Accessing Shorthands</h2>
      <p>
        Shorthands registered via <code>createUi</code> are available on the
        config and automatically applied by the <code>Box</code> primitive.
      </p>
      <pre>
        <code>{`import { useUiConfig } from '@stareezy-ui/tokens'

function ShorthandDemo() {
  const ui = useUiConfig()

  // See what shorthands are registered
  console.log(ui.shorthands)
  // { bg: 'backgroundColor', p: 'padding', m: 'margin', ... }

  // Box automatically uses these — no extra wiring needed
  return (
    <Box bg={colors.aurora.surfaceDark} p={spacing[4]}>
      Shorthand props work automatically
    </Box>
  )
}`}</code>
      </pre>

      <h2>Fallback Behavior</h2>
      <p>
        When <code>useUiConfig()</code> is called outside a{" "}
        <code>UiConfigProvider</code>, it falls back to the global singleton
        created by <code>createUi()</code> and logs a development warning.
      </p>
      <pre>
        <code>{`// This works even without UiConfigProvider — uses the singleton
import { useUiConfig } from '@stareezy-ui/tokens'

function AnyComponent() {
  // Falls back to getUiConfig() singleton + dev warning in console
  const ui = useUiConfig()
  return <div>{ui.breakpoints.md}</div>
}

// To silence the warning, wrap with UiConfigProvider:
<UiConfigProvider config={ui}>
  <AnyComponent />
</UiConfigProvider>`}</code>
      </pre>

      <Callout type="warning">
        If <code>createUi()</code> has never been called and there's no{" "}
        <code>UiConfigProvider</code>, <code>useUiConfig()</code> will throw.
        Always call <code>createUi()</code> at app startup.
      </Callout>

      <h2>API Reference</h2>

      <h3>useUiConfig()</h3>
      <p>
        Returns the active <code>UiConfig</code> from the nearest{" "}
        <code>UiConfigProvider</code>, or falls back to the{" "}
        <code>getUiConfig()</code> singleton.
      </p>

      <h3>UiConfig methods</h3>
      <div
        style={{
          overflowX: "auto",
          border: "1px solid var(--color-border-2)",
          borderRadius: 12,
          margin: "1rem 0 1.5rem",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border-2)",
              }}
            >
              <th
                style={{
                  padding: "0.65rem 1rem",
                  textAlign: "left",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                Method
              </th>
              <th
                style={{
                  padding: "0.65rem 1rem",
                  textAlign: "left",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                Returns
              </th>
              <th
                style={{
                  padding: "0.65rem 1rem",
                  textAlign: "left",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <PropRow
              name="getTokens()"
              type="BuiltinTokens & TTokens"
              desc="All built-in + custom token groups."
            />
            <PropRow
              name="getTheme(name)"
              type="ThemeTokenMap"
              desc="Full token map for a named theme. Throws ThemeNotFoundError if not registered."
            />
            <PropRow
              name="getFont(name)"
              type="FontConfig"
              desc="Font config for a named font. Throws FontNotFoundError if not registered."
            />
            <PropRow
              name="getMedia()"
              type="UiBreakpointConfig"
              desc="Resolved media query breakpoint map."
            />
            <PropRow
              name="registerTokens(t)"
              type="UiConfig<T & TNew>"
              desc="Add more token groups. Returns a new typed config."
            />
            <PropRow
              name="updateBreakpoints(o)"
              type="void"
              desc="Mutate breakpoints at runtime."
            />
            <PropRow
              name="tokens"
              type="BuiltinTokens & TTokens"
              desc="Direct token access (same as getTokens())."
            />
            <PropRow
              name="breakpoints"
              type="UiBreakpointConfig"
              desc="Resolved breakpoints (same as getMedia())."
            />
            <PropRow
              name="shorthands"
              type="Record<string, string>"
              desc="Registered prop shorthand mappings."
            />
          </tbody>
        </table>
      </div>

      <h3>Related</h3>
      <ul>
        <li>
          <a href="/docs/create-ui">
            <code>createUi()</code>
          </a>{" "}
          — configure the design system at startup
        </li>
        <li>
          <a href="/docs/theming">Theming guide</a> — <code>useTheme()</code>{" "}
          and <code>useThemeSwitch()</code>
        </li>
        <li>
          <a href="/tokens">Token Explorer</a> — browse all built-in tokens
          visually
        </li>
      </ul>
    </DocPage>
  );
}
