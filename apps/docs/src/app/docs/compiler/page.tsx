import type { Metadata } from "next";
import { DocPage, Callout } from "apps/docs/src/components/DocPage";

export const metadata: Metadata = {
  title: "Compiler",
  description: "How the Stareezy UI build-time compiler works.",
};

const PROP_MAPPINGS = [
  ["bg", "background-color"],
  ["color", "color"],
  ["p", "padding"],
  ["px", "padding-left, padding-right"],
  ["py", "padding-top, padding-bottom"],
  ["m", "margin"],
  ["rounded", "border-radius"],
  ["fontSize", "font-size"],
  ["fontWeight", "font-weight"],
];

export default function CompilerPage() {
  return (
    <DocPage
      title="Compiler"
      description="Build-time Babel/Vite plugin that extracts token props and emits atomic CSS."
      badge="Advanced"
      icon="⚙"
      badgeColor="#C98B25"
    >
      <h2>How It Works</h2>
      <p>
        The compiler traverses your JSX AST at build time, detects token props,
        and replaces them with atomic CSS class names — zero runtime overhead.
      </p>

      {/* Flow diagram */}
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
                background: "var(--brand-50)",
                border: "1px solid var(--brand-100)",
                borderRadius: 8,
                padding: "0.4rem 0.75rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--brand-600)",
                whiteSpace: "nowrap",
              }}
            >
              {step}
            </div>
            {i < arr.length - 1 && (
              <span style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <h2>Before & After</h2>

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
        <div>
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#4D8D01",
              marginBottom: "0.5rem",
            }}
          >
            After
          </div>
          <pre style={{ margin: 0 }}>
            <code>{`<Box
  className="sz-bg-celurenBlue-500
             sz-p-spacing-4"
/>`}</code>
          </pre>
        </div>
      </div>

      <p>Generated CSS:</p>
      <pre>
        <code>{`:root {
  --celurenBlue-500: #024CCE;
  --spacing-4: 4px;
}

.sz-bg-celurenBlue-500 {
  background-color: var(--celurenBlue-500);
}
.sz-p-spacing-4 {
  padding: var(--spacing-4);
}`}</code>
      </pre>

      <h2>Vite Plugin</h2>
      <pre>
        <code>{`// vite.config.ts
import { stareezyVitePlugin } from '@stareezy-ui/compiler'

export default {
  plugins: [
    stareezyVitePlugin({
      cssVariablePrefix: 'sz',
      outputDir: 'dist/styles',
    }),
  ],
}`}</code>
      </pre>

      <h2>Babel Plugin</h2>
      <pre>
        <code>{`// babel.config.js
module.exports = {
  plugins: [
    ['@stareezy-ui/compiler/babel', {
      cssVariablePrefix: 'sz',
    }],
  ],
}`}</code>
      </pre>

      <h2>Prop Mappings</h2>
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

      <h2>Non-Token Props</h2>
      <p>
        Props with plain string or number values are left completely unchanged:
      </p>
      <pre>
        <code>{`// Token prop → replaced with class name ✓
<Box bg={colors.celurenBlue[500]} />

// Plain value → passed through unchanged ✓
<Box bg="#024CCE" />`}</code>
      </pre>

      <Callout type="tip">
        The compiler deduplicates CSS rules — even if the same token is used in
        100 components, only one CSS rule is generated per build.
      </Callout>

      <h2>CSS Deduplication</h2>
      <p>
        The compiler generates each CSS rule at most once per build, regardless
        of how many components reference the same token. This keeps your CSS
        bundle minimal even at scale.
      </p>
    </DocPage>
  );
}
