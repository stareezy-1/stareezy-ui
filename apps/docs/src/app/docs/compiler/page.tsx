import type { Metadata } from "next";
import { DocPage, Callout } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Compiler",
  description:
    "Build-time Babel/Vite/Metro plugin that extracts token props and emits atomic CSS. Reads stareezy.config.ts automatically.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/compiler" },
};

const PROP_MAPPINGS = [
  ["bg", "background-color"],
  ["color", "color"],
  ["p", "padding"],
  ["px", "padding-left, padding-right"],
  ["py", "padding-top, padding-bottom"],
  ["m", "margin"],
  ["rounded", "border-radius"],
  ["borderColor", "border-color"],
  ["fontSize", "font-size"],
  ["fontWeight", "font-weight"],
];

export default function CompilerPage() {
  return (
    <DocPage
      title="Compiler"
      description="Build-time Babel/Vite/Metro plugin — extracts token props, emits atomic CSS, reads stareezy.config.ts automatically."
      badge="Advanced"
      icon="⚙"
      badgeColor="#f5a623"
    >
      <h2 className="gradient-text">How it works</h2>
      <p>
        The compiler traverses your JSX AST at build time, detects props whose
        values are <code>Token</code> objects (<code>__token: true</code>), and
        replaces them with atomic CSS class names. Zero runtime overhead — the
        style is already in the CSS bundle before the browser loads the page.
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
          margin: "1.25rem 0",
          padding: "1.25rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-2)",
          borderRadius: 12,
        }}
      >
        {[
          "JSX Source",
          "AST Traverse",
          "Detect Tokens",
          "Emit CSS Classes",
          "Replace Props",
        ].map((step, i, arr) => (
          <div
            key={step}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <div
              style={{
                background: "var(--brand-primary)",
                border: "1px solid var(--brand-primary)",
                borderRadius: 8,
                padding: "0.4rem 0.75rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              {step}
            </div>
            {i < arr.length - 1 && (
              <span style={{ color: "var(--color-muted)" }}>→</span>
            )}
          </div>
        ))}
      </div>

      <h2 className="gradient-text">Before & after</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          margin: "1rem 0 1.5rem",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-muted)",
              marginBottom: "0.5rem",
            }}
          >
            Before
          </div>
          <pre style={{ margin: 0 }}>
            <code>{`<Box
  bg={colors.celurenBlue[500]}
  p={spacing[4]}
/>`}</code>
          </pre>
        </div>
        <div
          style={{
            border: "1px solid var(--brand-500)",
            borderRadius: "var(--radius-md)",
            padding: "0 0.75rem",
          }}
        >
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--brand-500)",
              marginBottom: "0.5rem",
              marginTop: "0.75rem",
            }}
          >
            After
          </div>
          <pre style={{ margin: 0 }}>
            <code>{`<Box
  className="sz-celurenBlue-500
             sz-spacing-4"
/>`}</code>
          </pre>
        </div>
      </div>

      <p>Generated CSS:</p>
      <pre>
        <code>{`:root {
  --celurenBlue-500: #024CCE;
  --spacing-4: 16px;
}

.sz-celurenBlue-500 { background-color: var(--celurenBlue-500); }
.sz-spacing-4       { padding: var(--spacing-4); }`}</code>
      </pre>

      <Callout type="info">
        <code>ThemeToken</code> props (from the <code>t</code> accessor) are
        resolved at render time via <code>useTheme()</code> — they are{" "}
        <em>not</em> extracted by the compiler. The compiler only handles static{" "}
        <code>Token&lt;T&gt;</code> objects.
      </Callout>

      {/* ── stareezy.config.ts auto-read ──────────────────────────────────── */}
      <h2 className="gradient-text">stareezy.config.ts — automatic shorthand pickup</h2>
      <p>
        The compiler reads your <code>stareezy.config.ts</code> at build time
        and merges your custom shorthands into its prop mappings. You{" "}
        <strong>do not</strong> need to pass the config path to the plugin — it
        finds the file automatically by searching <code>process.cwd()</code>{" "}
        (your project root).
      </p>
      <p>
        What you <em>do</em> need to do: add the plugin to your build tool
        config. That&apos;s it.
      </p>
      <pre>
        <code>{`// stareezy.config.ts — define shorthands here
export const ui = createUi({
  shorthands: {
    bg:  'backgroundColor',
    br:  'borderRadius',
    f:   'flex',
  } as const,
})

// babel.config.js — just add the plugin, no config path needed
const { stareezyBabelPlugin } = require('@stareezy-ui/compiler')
module.exports = {
  plugins: [stareezyBabelPlugin()],  // ← reads stareezy.config.ts automatically
}

// Now the compiler expands your shorthands at build time:
<Box bg={colors.celurenBlue[500]} br={8} />
// → <Box className="sz-celurenBlue-500 sz-8" />`}</code>
      </pre>

      {/* ── Vite ──────────────────────────────────────────────────────────── */}
      <h2
        className="gradient-text"
        style={{
          display: "inline-block",
          background: "var(--brand-50)",
          border: "1px solid var(--brand-500)",
          borderRadius: "var(--radius-md)",
          padding: "0.4rem 1rem",
          marginTop: "1.5rem",
          color: "var(--brand-500)",
        }}
      >
        Vite plugin
      </h2>
      <p>
        Add the plugin to <code>vite.config.ts</code>. It reads{" "}
        <code>stareezy.config.ts</code> from your project root automatically —
        no path needed.
      </p>
      <pre>
        <code>{`// vite.config.ts
import { stareezyVitePlugin } from '@stareezy-ui/compiler'

export default {
  plugins: [
    stareezyVitePlugin(),  // reads stareezy.config.ts automatically
  ],
}

// Add this import once in your entry file to include the generated CSS:
import 'virtual:stareezy-ui/styles'`}</code>
      </pre>

      {/* ── Babel ─────────────────────────────────────────────────────────── */}
      <h2
        className="gradient-text"
        style={{
          display: "inline-block",
          background: "var(--brand-50)",
          border: "1px solid var(--brand-500)",
          borderRadius: "var(--radius-md)",
          padding: "0.4rem 1rem",
          marginTop: "1.5rem",
          color: "var(--brand-500)",
        }}
      >
        Babel plugin
      </h2>
      <p>
        Add the plugin to <code>babel.config.js</code>. Same deal — reads{" "}
        <code>stareezy.config.ts</code> automatically.
      </p>
      <pre>
        <code>{`// babel.config.js
const { stareezyBabelPlugin } = require('@stareezy-ui/compiler')

module.exports = {
  presets: ['babel-preset-expo'],  // or your preset
  plugins: [
    stareezyBabelPlugin(),  // reads stareezy.config.ts automatically
  ],
}`}</code>
      </pre>

      {/* ── Metro ─────────────────────────────────────────────────────────── */}
      <h2
        className="gradient-text"
        style={{
          display: "inline-block",
          background: "var(--brand-50)",
          border: "1px solid var(--brand-500)",
          borderRadius: "var(--radius-md)",
          padding: "0.4rem 1rem",
          marginTop: "1.5rem",
          color: "var(--brand-500)",
        }}
      >
        Metro transformer (React Native)
      </h2>
      <p>
        For React Native projects using Metro, point{" "}
        <code>babelTransformerPath</code> at the Metro transformer. It reads{" "}
        <code>stareezy.config.ts</code> automatically — same as the other
        plugins.
      </p>
      <pre>
        <code>{`// metro.config.js
const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.transformer = {
  ...config.transformer,
  // reads stareezy.config.ts automatically
  babelTransformerPath: require.resolve('@stareezy-ui/compiler/metro'),
}

module.exports = config`}</code>
      </pre>

      <Callout type="tip">
        The Metro transformer reads <code>stareezy.config.ts</code>{" "}
        automatically — same as the Vite and Babel plugins. Your custom
        shorthands are expanded at build time on all three platforms.
      </Callout>

      {/* ── Built-in prop mappings ────────────────────────────────────────── */}
      <h2 className="gradient-text">Built-in prop mappings</h2>
      <p>
        These are the default mappings. Custom shorthands from{" "}
        <code>stareezy.config.ts</code> are merged on top.
      </p>
      <table>
        <thead>
          <tr>
            <th>JSX Prop</th>
            <th>CSS Property</th>
          </tr>
        </thead>
        <tbody>
          {PROP_MAPPINGS.map(([prop, css]) => (
            <tr key={prop}>
              <td>
                <code>{prop}</code>
              </td>
              <td>
                <code>{css}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="gradient-text">Non-token props pass through</h2>
      <pre>
        <code>{`// Token prop → replaced with class name ✓
<Box bg={colors.celurenBlue[500]} />

// ThemeToken → resolved at render time, not by compiler ✓
<Box bg={t.backgrounds.primary} />

// Plain value → passed through unchanged ✓
<Box bg="#024CCE" />`}</code>
      </pre>

      <Callout type="tip">
        The compiler deduplicates CSS rules — even if the same token is used in
        100 components, only one CSS rule is generated per build.
      </Callout>
    </DocPage>
  );
}
