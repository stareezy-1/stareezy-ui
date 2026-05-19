import type { Metadata } from "next";
import {
  DocPage,
  Callout,
  Step,
  PropRow,
} from "apps/docs/src/components/DocPage";

export const metadata: Metadata = {
  title: "createUi",
  description:
    "Configure Stareezy UI tokens, breakpoints, and themes at app startup.",
};

export default function CreateUiPage() {
  return (
    <DocPage
      title="createUi"
      description="The Stareezy UI configuration factory. Register custom tokens, override breakpoints, and set a default theme — all with full TypeScript inference."
      badge="API Reference"
      icon="⚙"
      badgeColor="#024CCE"
    >
      <h2>Overview</h2>
      <p>
        <code>createUi</code> is the single entry point for configuring Stareezy
        UI. Call it once at app startup — before rendering any components — and
        it returns a typed config object you can import anywhere.
      </p>

      <Callout type="tip">
        Think of it like <code>createTamagui</code> from Tamagui, or{" "}
        <code>extendTheme</code> from Chakra UI. One call, full control.
      </Callout>

      <h2>New in v0.2.0: Extended Configuration</h2>
      <p>
        <code>createUi</code> now accepts six additional fields inspired by
        Tamagui&apos;s <code>createTamagui</code>:
      </p>
      <pre>
        <code>{`import { createUi, token, motion, themes } from '@stareezy-ui/tokens'

const ui = createUi({
  // Custom token groups
  tokens: {
    brand: { primary: token('#FF6B35', 'brand-primary') },
  },

  // Named font configs
  fonts: {
    inter: {
      family: 'Inter, system-ui, sans-serif',
      size: { sm: token(14, 'inter-sm'), md: token(16, 'inter-md') },
    },
  },

  // Media query breakpoints (supersedes breakpoints)
  media: { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },

  // Named animation presets
  animations: {
    fadeIn: { duration: motion.duration.enter, easing: motion.easing.easeOut },
    spring: { duration: motion.duration.normal, easing: motion.easing.spring },
  },

  // Register named themes (aurora, dark, light, or custom)
  themes: {
    aurora: themes.aurora,
  },

  // Global settings
  settings: {
    allowedStyleValues: 'somewhat-strict',
    defaultFont: 'inter',
    disableSSR: false,
  },

  // Prop shorthand mappings (used by Box and all BoxProps components)
  shorthands: {
    bg: 'backgroundColor',
    p: 'padding',
    m: 'margin',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
  },
})

// Access via methods
ui.getTheme('aurora')   // full aurora theme token map
ui.getFont('inter')     // { family, size, weight, lineHeight }
ui.getMedia()           // { sm: 640, md: 768, ... }
ui.getTokens()          // all built-in + custom tokens
ui.shorthands           // { bg: 'backgroundColor', ... }`}</code>
      </pre>

      <Callout type="tip">
        Use <code>useUiConfig()</code> to access the config reactively inside
        components. See the <a href="/docs/use-ui-config">useUiConfig guide</a>{" "}
        for details.
      </Callout>

      <h2>Quick Start</h2>
      <pre>
        <code>{`import { createUi, token } from '@stareezy-ui/tokens'

export const ui = createUi({
  tokens: {
    brand: {
      primary:   token('#FF6B35', 'brand-primary'),
      secondary: token('#004E89', 'brand-secondary'),
    },
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
  },
  defaultTheme: 'light',
})

// Fully typed — autocomplete works on your custom tokens
ui.tokens.brand.primary.value   // "#FF6B35"
ui.tokens.brand.primary.name    // "brand-primary"
ui.breakpoints.sm               // 640`}</code>
      </pre>

      <h2>Integration by Framework</h2>

      <Step n={1} title="Next.js (App Router)">
        Create a <code>lib/ui.ts</code> file and call <code>createUi</code>{" "}
        there. Import it in your root <code>layout.tsx</code> so it runs before
        any component renders.
        <pre>
          <code>{`// lib/ui.ts
import { createUi, token } from '@stareezy-ui/tokens'

export const ui = createUi({
  tokens: {
    brand: {
      primary: token('#FF6B35', 'brand-primary'),
    },
  },
})

// app/layout.tsx
import '@/lib/ui'   // side-effect import — registers config globally
import { ThemeProvider } from '@stareezy-ui/tokens'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`}</code>
        </pre>
      </Step>

      <Step n={2} title="Vite / React SPA">
        Call <code>createUi</code> at the top of your <code>main.tsx</code>{" "}
        before <code>ReactDOM.createRoot</code>.
        <pre>
          <code>{`// main.tsx
import { createUi } from '@stareezy-ui/tokens'
import { ThemeProvider } from '@stareezy-ui/tokens'
import ReactDOM from 'react-dom/client'
import App from './App'

createUi({
  tokens: { /* your tokens */ },
  defaultTheme: 'light',
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme="light">
    <App />
  </ThemeProvider>
)`}</code>
        </pre>
      </Step>

      <Step n={3} title="React Native / Expo">
        Call <code>createUi</code> at the top of your root <code>App.tsx</code>{" "}
        before the component definition.
        <pre>
          <code>{`// App.tsx
import { createUi } from '@stareezy-ui/tokens'
import { ThemeProvider } from '@stareezy-ui/tokens'

createUi({
  defaultTheme: 'light',
  breakpoints: { sm: 480, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },
})

export default function App() {
  return (
    <ThemeProvider theme="light">
      {/* your app */}
    </ThemeProvider>
  )
}`}</code>
        </pre>
      </Step>

      <Callout type="warning">
        Call <code>createUi</code> exactly once. Calling it again replaces the
        global singleton, which will reset any breakpoints or tokens registered
        after the first call.
      </Callout>

      <h2>Custom Tokens</h2>
      <p>
        Pass a <code>tokens</code> object where each key is a namespace and each
        value is a record of <code>Token</code> values created with the{" "}
        <code>token()</code> helper.
      </p>
      <pre>
        <code>{`import { createUi, token } from '@stareezy-ui/tokens'

const ui = createUi({
  tokens: {
    // Each key becomes a top-level namespace
    brand: {
      primary:   token('#FF6B35', 'brand-primary'),
      secondary: token('#004E89', 'brand-secondary'),
      accent:    token('#F7C59F', 'brand-accent'),
    },
    size: {
      icon: token(24, 'size-icon'),
      avatar: token(40, 'size-avatar'),
    },
  },
})

// Access alongside built-in tokens
ui.tokens.brand.primary.value   // "#FF6B35"
ui.tokens.colors.celurenBlue    // built-in still available
ui.tokens.spacing               // built-in still available`}</code>
      </pre>

      <h2>Custom Breakpoints</h2>
      <p>
        Override any or all of the five default breakpoints (min-width in px,
        mobile-first). Unspecified keys keep their defaults.
      </p>
      <pre>
        <code>{`const ui = createUi({
  breakpoints: {
    sm: 640,   // default: 480
    md: 768,   // default: 768
    lg: 1024,  // default: 1024
    xl: 1280,  // default: 1280
    '2xl': 1536, // default: 1536
  },
})

// Breakpoints are stored on globalThis so Box / responsive props pick them up
// automatically — no extra wiring needed.`}</code>
      </pre>

      <Callout type="info">
        Breakpoints are written to{" "}
        <code>globalThis.__stareezy_breakpoints__</code> so the components
        package can read them without a circular dependency. You never need to
        reference this directly.
      </Callout>

      <h2>Lazy Token Registration</h2>
      <p>
        Use <code>registerTokens</code> to add token groups after the initial
        call — useful for plugin-style extensions or code-split token sets.
      </p>
      <pre>
        <code>{`import { ui } from '@/lib/ui'

// Returns a new config with the merged tokens — fully typed
const extendedUi = ui.registerTokens({
  illustration: {
    hero: token('/images/hero.svg', 'illustration-hero'),
  },
})

extendedUi.tokens.illustration.hero.value // '/images/hero.svg'`}</code>
      </pre>

      <h2>Runtime Breakpoint Updates</h2>
      <p>
        Call <code>updateBreakpoints</code> to adjust breakpoints at runtime,
        for example when adapting to a device's screen density.
      </p>
      <pre>
        <code>{`import { ui } from '@/lib/ui'

ui.updateBreakpoints({ sm: 600 })
// globalThis.__stareezy_breakpoints__ is updated immediately`}</code>
      </pre>

      <h2>Reading the Active Config</h2>
      <p>
        Use <code>getUiConfig()</code> to read the current singleton from
        anywhere — useful inside utility functions or hooks that don't have
        direct access to the config object.
      </p>
      <pre>
        <code>{`import { getUiConfig } from '@stareezy-ui/tokens'

function getCurrentBreakpoints() {
  const config = getUiConfig()
  if (!config) throw new Error('createUi() has not been called yet')
  return config.breakpoints
}`}</code>
      </pre>

      <h2>API Reference</h2>

      <h3>createUi(config?)</h3>
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
                Prop
              </th>
              <th
                style={{
                  padding: "0.65rem 1rem",
                  textAlign: "left",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                Type
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
              name="tokens"
              type="CustomTokenGroups"
              desc="Custom token namespaces merged with built-in tokens."
            />
            <PropRow
              name="breakpoints"
              type="Partial<UiBreakpointConfig>"
              desc="Override default responsive breakpoints (min-width px, mobile-first). Deprecated — use media instead."
            />
            <PropRow
              name="media"
              type="Partial<UiBreakpointConfig>"
              desc="Named media query breakpoints. Supersedes breakpoints when both are provided."
            />
            <PropRow
              name="defaultTheme"
              type='"light" | "dark" | ThemeOverride'
              desc='Default theme applied when no ThemeProvider is present. Defaults to "light".'
            />
            <PropRow
              name="fonts"
              type="Record<string, FontConfig>"
              desc="Named font families with size, weight, and lineHeight token scales."
            />
            <PropRow
              name="animations"
              type="Record<string, AnimationPreset>"
              desc="Named animation presets referencing motion token values."
            />
            <PropRow
              name="themes"
              type="Record<string, ThemeTokenMap>"
              desc="Named theme objects. aurora, dark, light, or custom themes."
            />
            <PropRow
              name="settings"
              type="UiSettings"
              desc="Global settings: allowedStyleValues, defaultFont, disableSSR."
            />
            <PropRow
              name="shorthands"
              type="Record<string, string>"
              desc="Prop shorthand mappings used by Box and all BoxProps components."
            />
          </tbody>
        </table>
      </div>

      <h3>UiConfig (return value)</h3>
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
                Property
              </th>
              <th
                style={{
                  padding: "0.65rem 1rem",
                  textAlign: "left",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                Type
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
              name="tokens"
              type="BuiltinTokens & TTokens"
              desc="All built-in tokens merged with your custom groups."
            />
            <PropRow
              name="breakpoints"
              type="UiBreakpointConfig"
              desc="Resolved breakpoint config."
            />
            <PropRow
              name="defaultTheme"
              type='"light" | "dark" | ThemeOverride'
              desc="The resolved default theme."
            />
            <PropRow
              name="shorthands"
              type="Record<string, string>"
              desc="Registered prop shorthand mappings."
            />
            <PropRow
              name="getTokens()"
              type="BuiltinTokens & TTokens"
              desc="Returns the merged token registry."
            />
            <PropRow
              name="getTheme(name)"
              type="ThemeTokenMap"
              desc="Returns the full token map for a named theme. Throws ThemeNotFoundError if not registered."
            />
            <PropRow
              name="getFont(name)"
              type="FontConfig"
              desc="Returns the font config for a named font. Throws FontNotFoundError if not registered."
            />
            <PropRow
              name="getMedia()"
              type="UiBreakpointConfig"
              desc="Returns the resolved media query breakpoint map."
            />
            <PropRow
              name="registerTokens(newTokens)"
              type="UiConfig<T & TNew>"
              desc="Add more token groups after initial setup. Returns a new typed config."
            />
            <PropRow
              name="updateBreakpoints(overrides)"
              type="void"
              desc="Mutate breakpoints at runtime and sync to globalThis."
            />
          </tbody>
        </table>
      </div>

      <h3>getUiConfig()</h3>
      <p>
        Returns the active <code>UiConfig</code> singleton, or <code>null</code>{" "}
        if <code>createUi</code> has not been called yet.
      </p>
    </DocPage>
  );
}
