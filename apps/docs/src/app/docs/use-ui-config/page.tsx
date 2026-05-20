import type { Metadata } from "next";
import { DocPage, Callout, PropRow } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "useUiConfig",
  description:
    "Access the active Stareezy UI configuration reactively from any component.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/use-ui-config" },
};

export default function UseUiConfigPage() {
  return (
    <DocPage
      title="useUiConfig"
      description="Access the active UiConfig reactively from any component — tokens, themes, breakpoints, fonts, and shorthands."
      badge="API Reference"
      icon="⚛"
      badgeColor="#7c3aed"
    >
      <h2>Overview</h2>
      <p>
        <code>useUiConfig()</code> returns the active <code>UiConfig</code>{" "}
        created by <code>createUi()</code>. It reads from the nearest{" "}
        <code>UiConfigProvider</code> in the tree, falling back to the global
        singleton if no provider is present.
      </p>

      <Callout type="tip">
        For most use cases you don&apos;t need <code>useUiConfig()</code> — use
        the <code>t</code> accessor for theme-reactive props and{" "}
        <code>useTheme()</code> for raw theme values. Reserve{" "}
        <code>useUiConfig()</code> for when you need breakpoints, fonts, or
        custom token groups inside a component.
      </Callout>

      <h2>Basic usage</h2>
      <pre>
        <code>{`import { useUiConfig } from '@stareezy-ui/tokens'

function MyComponent() {
  const ui = useUiConfig()

  // Access registered themes
  const auroraTheme = ui.getTheme('aurora')

  // Access media breakpoints
  const { md, lg } = ui.getMedia()

  // Access registered fonts
  const inter = ui.getFont('inter')

  // Access custom tokens (typed if you used module augmentation)
  const brandPrimary = ui.tokens.brand?.primary.value

  return (
    <div style={{ maxWidth: md }}>
      <span style={{ color: auroraTheme.text.importantBrand.value }}>
        {brandPrimary}
      </span>
    </div>
  )
}`}</code>
      </pre>

      <h2>Setup: UiConfigProvider</h2>
      <p>
        Wrap your app with <code>UiConfigProvider</code> to make the config
        available to all descendants without relying on the singleton:
      </p>
      <pre>
        <code>{`// app/layout.tsx (Next.js)
import { UiConfigProvider, ThemeProvider } from '@stareezy-ui/tokens'
import { ui } from '../stareezy.config'

export default function RootLayout({ children }) {
  return (
    <html lang="en"><body>
      <UiConfigProvider config={ui}>
        <ThemeProvider theme="aurora">
          {children}
        </ThemeProvider>
      </UiConfigProvider>
    </body></html>
  )
}`}</code>
      </pre>

      <h2>Accessing themes</h2>
      <pre>
        <code>{`import { useUiConfig } from '@stareezy-ui/tokens'

function ThemedCard() {
  const ui = useUiConfig()
  const theme = ui.getTheme('steins-gate')

  return (
    <div style={{
      background: theme.backgrounds.secondary.value,
      color: theme.text.primary.value,
      border: \`1px solid \${theme.border.primaryBrand.value}\`,
    }}>
      Steins;Gate themed card
    </div>
  )
}`}</code>
      </pre>

      <h2>Accessing breakpoints</h2>
      <pre>
        <code>{`import { useUiConfig } from '@stareezy-ui/tokens'

function ResponsiveGrid({ children }) {
  const ui = useUiConfig()
  const bp = ui.getMedia()

  // Use breakpoints for JS-driven responsive logic
  // (prefer CSS media queries when possible)
  const style = {
    display: 'grid',
    gridTemplateColumns: \`repeat(auto-fill, minmax(\${bp.sm}px, 1fr))\`,
  }

  return <div style={style}>{children}</div>
}`}</code>
      </pre>

      <h2>Accessing custom tokens</h2>
      <pre>
        <code>{`import { useUiConfig } from '@stareezy-ui/tokens'

function BrandButton() {
  const ui = useUiConfig()

  // Fully typed if you used module augmentation in stareezy.config.ts
  const primary = ui.tokens.brand.primary.value   // "#FF6B35"
  const secondary = ui.tokens.brand.secondary.value // "#004E89"

  return (
    <button style={{ background: primary, color: '#fff' }}>
      Brand button
    </button>
  )
}`}</code>
      </pre>

      <h2>Fallback behavior</h2>
      <p>
        When called outside a <code>UiConfigProvider</code>,{" "}
        <code>useUiConfig()</code> falls back to the global singleton and logs a
        dev warning. If <code>createUi()</code> was never called, it throws.
      </p>
      <pre>
        <code>{`// Works without UiConfigProvider — uses the singleton
const ui = useUiConfig()  // dev warning in console, but works

// To silence the warning:
<UiConfigProvider config={ui}>
  <AnyComponent />
</UiConfigProvider>`}</code>
      </pre>

      <Callout type="warning">
        If <code>createUi()</code> has never been called and there&apos;s no{" "}
        <code>UiConfigProvider</code>, <code>useUiConfig()</code> will throw.
        Always import your <code>stareezy.config.ts</code> before rendering any
        components.
      </Callout>

      <h2>API reference</h2>
      <table>
        <thead>
          <tr>
            <th>Method / Property</th>
            <th>Returns</th>
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
            desc="Resolved breakpoints (same as getMedia())."
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
            desc="Add more token groups. Returns a new typed config."
          />
          <PropRow
            name="updateBreakpoints(o)"
            type="void"
            desc="Mutate breakpoints at runtime."
          />
        </tbody>
      </table>

      <h2>Related</h2>
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
          <a href="/docs/usage">Token API</a> — the <code>t</code> accessor and
          ThemeTokens
        </li>
      </ul>
    </DocPage>
  );
}
