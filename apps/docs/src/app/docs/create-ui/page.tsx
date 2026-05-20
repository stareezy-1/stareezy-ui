import type { Metadata } from "next";
import { DocPage, Callout, Step, PropRow } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "createUi",
  description:
    "Configure Stareezy UI tokens, themes, shorthands, and breakpoints at app startup. Includes module augmentation for typed custom shorthands.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/create-ui" },
};

export default function CreateUiPage() {
  return (
    <DocPage
      title="createUi"
      description="The Stareezy UI configuration factory — themes, tokens, shorthands, breakpoints, and module augmentation."
      badge="API Reference"
      icon="◎"
      badgeColor="#024CCE"
    >
      <h2>Overview</h2>
      <p>
        <code>createUi()</code> is the single entry point for configuring
        Stareezy UI. Call it once at app startup in a{" "}
        <code>stareezy.config.ts</code> file, export the result, and import it
        wherever you need typed token access.
      </p>

      <Callout type="tip">
        The recommended pattern is a dedicated <code>stareezy.config.ts</code>{" "}
        at your project root. The compiler reads this file automatically to pick
        up your custom shorthands at build time.
      </Callout>

      {/* ── Full config example ───────────────────────────────────────────── */}
      <h2>Full config example</h2>
      <pre>
        <code>{`// stareezy.config.ts
import { createUi, token, themes, motion } from '@stareezy-ui/tokens'

export const ui = createUi({
  // Register all four built-in themes (+ any custom ones)
  themes: {
    aurora:        themes.aurora,
    dark:          themes.dark,
    light:         themes.light,
    'steins-gate': themes['steins-gate'],
  },

  // Custom token groups — fully typed on ui.tokens
  tokens: {
    brand: {
      primary:   token('#FF6B35', 'brand-primary'),
      secondary: token('#004E89', 'brand-secondary'),
    },
  },

  // Responsive breakpoints (mobile-first, min-width in px)
  media: { sm: 480, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },

  // Named font configs
  fonts: {
    inter: {
      family: 'Inter, system-ui, sans-serif',
      size: { sm: token(14, 'inter-sm'), md: token(16, 'inter-md') },
    },
  },

  // Named animation presets
  animations: {
    fadeIn: { duration: motion.duration.enter, easing: motion.easing.easeOut },
  },

  // Global settings
  settings: {
    allowedStyleValues: 'somewhat-strict',
    defaultFont: 'inter',
  },

  // Prop shorthands — registered as valid BoxProps via module augmentation
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
  } as const,  // ← as const is required for module augmentation to work
})

// ── Module augmentation ──────────────────────────────────────────────────
// Makes your shorthands flow into BoxProps as typed props.
// Without this, TypeScript won't know about your custom shorthands.
type AppConfig = typeof ui
declare module '@stareezy-ui/tokens' {
  interface SzrCustomConfig extends AppConfig {}
}

export default ui`}</code>
      </pre>

      <Callout type="info">
        The <code>as const</code> on <code>shorthands</code> is required — it
        tells TypeScript to infer the literal key types so the module
        augmentation works. Without it, shorthands are typed as{" "}
        <code>Record&lt;string, string&gt;</code> and no props are added.
      </Callout>

      {/* ── Module augmentation ───────────────────────────────────────────── */}
      <h2>Module augmentation — typed shorthands</h2>
      <p>
        The <code>declare module</code> block is what makes custom shorthands
        appear as valid <code>BoxProps</code>. Once declared, TypeScript
        autocompletes them everywhere:
      </p>
      <pre>
        <code>{`// After module augmentation:
<Box bg={t.backgrounds.primary} br={12} f={1} />
//   ↑ typed    ↑ typed          ↑ typed  ↑ typed

// Without augmentation — TypeScript error:
<Box br={12} />  // ❌ Property 'br' does not exist on type 'BoxProps'

// With augmentation — valid:
<Box br={12} />  // ✅ br → borderRadius, fully typed`}</code>
      </pre>

      {/* ── ui.t accessor ─────────────────────────────────────────────────── */}
      <h2>ui.t — theme-reactive accessor</h2>
      <p>
        The returned config exposes <code>ui.t</code> — the same <code>t</code>{" "}
        accessor available from the standalone import. Pass these as component
        props for theme-reactive colors:
      </p>
      <pre>
        <code>{`import { ui } from './stareezy.config'

// ui.t is identical to importing t from '@stareezy-ui/tokens'
<Box bg={ui.t.backgrounds.primary} color={ui.t.text.primary} />

// Custom tokens are on ui.tokens
<Box bg={ui.tokens.brand.primary} />

// Both work together
<Box
  bg={ui.t.backgrounds.secondary}
  borderColor={ui.tokens.brand.primary}
  br={12}
/>`}</code>
      </pre>

      {/* ── Framework integration ─────────────────────────────────────────── */}
      <h2>Framework integration</h2>

      <Step n={1} title="Next.js (App Router)">
        <pre>
          <code>{`// stareezy.config.ts — at project root
import { createUi, themes } from '@stareezy-ui/tokens'
export const ui = createUi({ themes: { aurora: themes.aurora } })
type AppConfig = typeof ui
declare module '@stareezy-ui/tokens' {
  interface SzrCustomConfig extends AppConfig {}
}

// app/layout.tsx
import { ThemeProvider } from '@stareezy-ui/tokens'
import './stareezy.config'  // side-effect: registers singleton

export default function RootLayout({ children }) {
  return (
    <html lang="en"><body>
      <ThemeProvider theme="aurora">{children}</ThemeProvider>
    </body></html>
  )
}`}</code>
        </pre>
      </Step>

      <Step n={2} title="Vite / React SPA">
        <pre>
          <code>{`// main.tsx
import './stareezy.config'  // must be first import
import { ThemeProvider } from '@stareezy-ui/tokens'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme="aurora"><App /></ThemeProvider>
)`}</code>
        </pre>
      </Step>

      <Step n={3} title="React Native / Expo">
        <pre>
          <code>{`// App.tsx
import './stareezy.config'  // must be first import
import { ThemeProvider } from '@stareezy-ui/tokens'

export default function App() {
  return (
    <ThemeProvider theme="aurora">
      {/* your app */}
    </ThemeProvider>
  )
}`}</code>
        </pre>
      </Step>

      <Callout type="warning">
        Import <code>stareezy.config.ts</code> exactly once, as the first import
        in your entry file. Calling <code>createUi()</code> again replaces the
        global singleton.
      </Callout>

      {/* ── API reference ─────────────────────────────────────────────────── */}
      <h2>createUi() options</h2>
      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <PropRow
            name="themes"
            type="Record<string, ThemeTokenMap>"
            desc="Named themes — aurora, dark, light, steins-gate, or custom."
          />
          <PropRow
            name="tokens"
            type="CustomTokenGroups"
            desc="Custom token namespaces merged with built-in tokens."
          />
          <PropRow
            name="media"
            type="Partial<UiBreakpointConfig>"
            desc="Responsive breakpoints (min-width px, mobile-first). Supersedes breakpoints."
          />
          <PropRow
            name="shorthands"
            type="Record<string, string> as const"
            desc="Prop shorthand mappings. as const required for module augmentation."
          />
          <PropRow
            name="fonts"
            type="Record<string, FontConfig>"
            desc="Named font families with size, weight, lineHeight token scales."
          />
          <PropRow
            name="animations"
            type="Record<string, AnimationPreset>"
            desc="Named animation presets referencing motion token values."
          />
          <PropRow
            name="settings"
            type="UiSettings"
            desc="allowedStyleValues, defaultFont, disableSSR."
          />
          <PropRow
            name="defaultTheme"
            type='"light" | "dark" | ThemeOverride'
            desc='Default theme when no ThemeProvider is present. Defaults to "light".'
          />
        </tbody>
      </table>

      <h2>UiConfig return value</h2>
      <table>
        <thead>
          <tr>
            <th>Property / Method</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <PropRow
            name="t"
            type="ThemeTokenAccessor"
            desc="Theme-reactive token accessor — same as standalone t import."
          />
          <PropRow
            name="tokens"
            type="BuiltinTokens & TTokens"
            desc="All built-in + custom token groups."
          />
          <PropRow
            name="shorthands"
            type="Record<string, string>"
            desc="Registered prop shorthand mappings."
          />
          <PropRow
            name="breakpoints"
            type="UiBreakpointConfig"
            desc="Resolved breakpoint config."
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
            name="getTokens()"
            type="BuiltinTokens & TTokens"
            desc="Returns the merged token registry."
          />
          <PropRow
            name="registerTokens(t)"
            type="UiConfig<T & TNew>"
            desc="Add more token groups after initial setup. Returns a new typed config."
          />
          <PropRow
            name="updateBreakpoints(o)"
            type="void"
            desc="Mutate breakpoints at runtime and sync to globalThis."
          />
        </tbody>
      </table>
    </DocPage>
  );
}
