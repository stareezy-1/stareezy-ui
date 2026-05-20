import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "CDN Usage",
  description:
    "Use Stareezy UI directly from a CDN — no build step required. Drop a script tag and start using tokens and components in any HTML page.",
  keywords: [
    "stareezy ui cdn",
    "script tag",
    "no build step",
    "jsdelivr",
    "unpkg",
    "iife",
    "browser",
  ],
  alternates: { canonical: "https://ui.stareezy.tech/docs/cdn" },
  openGraph: {
    title: "CDN Usage — Stareezy UI",
    description:
      "Use Stareezy UI directly from a CDN with a single script tag — no bundler required.",
    url: "https://ui.stareezy.tech/docs/cdn",
  },
};

const CDN_BUNDLES = [
  {
    pkg: "@stareezy-ui/tokens",
    file: "stareezy-tokens.global.js",
    global: "StareezyTokens",
    size: "~25 KB",
    desc: "All design tokens — colors, spacing, radius, typography, etc.",
    color: "#024CCE",
    bg: "#E6EDFA",
  },
  {
    pkg: "@stareezy-ui/components",
    file: "stareezy-ui.global.js",
    global: "StareezyUI",
    size: "~118 KB",
    desc: "Full component library — includes all tokens, runtime, and stylesheet.",
    color: "#4D8D01",
    bg: "#F3FFE3",
  },
  {
    pkg: "@stareezy-ui/runtime",
    file: "stareezy-runtime.global.js",
    global: "StareezyRuntime",
    size: "~3 KB",
    desc: "O(1) style registry and web adapter — use if you need the runtime without components.",
    color: "#0C9182",
    bg: "#E7FDFA",
  },
  {
    pkg: "@stareezy-ui/stylesheet",
    file: "stareezy-stylesheet.global.js",
    global: "StareezyStylesheet",
    size: "~1.5 KB",
    desc: "Atomic CSS sheet management — low-level, rarely needed standalone.",
    color: "#C98B25",
    bg: "#FEF4E2",
  },
  {
    pkg: "@stareezy-ui/core",
    file: "stareezy-core.global.js",
    global: "StareezyCore",
    size: "~5 KB",
    desc: "Utilities and platform helpers — use if you need core without components.",
    color: "#5D2555",
    bg: "#F9DEDE",
  },
];

export default function CdnPage() {
  return (
    <DocPage
      title="CDN Usage"
      description="Use Stareezy UI directly from a CDN — no bundler, no build step, just a script tag."
      badge="Installation"
      icon="↗"
    >
      <h2>Overview</h2>
      <p>
        Every Stareezy UI package ships a minified IIFE bundle in{" "}
        <code>dist/cdn/</code>. These are served automatically by jsDelivr and
        unpkg once the package is published to npm. Each bundle exposes a global
        variable on <code>window</code> — no module system required.
      </p>

      <Callout type="info">
        The CDN bundles target web only. React Native code is stubbed out, so
        the files are safe to load in any browser environment. React itself is
        not bundled — you must load it separately.
      </Callout>

      <h2>Available Bundles</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "0.75rem",
          margin: "1rem 0 1.5rem",
        }}
      >
        {CDN_BUNDLES.map((b) => (
          <div
            key={b.pkg}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border-2)",
              borderRadius: 10,
              padding: "0.9rem 1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <code
                style={{ fontSize: "0.78rem", fontWeight: 700, color: b.color }}
              >
                {b.pkg}
              </code>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  background: b.bg,
                  color: b.color,
                  borderRadius: 6,
                  padding: "0.15rem 0.5rem",
                }}
              >
                {b.size}
              </span>
            </div>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--color-text-2)",
                margin: "0 0 6px",
                lineHeight: 1.5,
              }}
            >
              {b.desc}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--color-text-2)",
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border-2)",
                  borderRadius: 5,
                  padding: "0.1rem 0.4rem",
                  fontFamily: "var(--font-mono)",
                }}
              >
                window.{b.global}
              </span>
            </div>
          </div>
        ))}
      </div>

      <h2>Quick Start</h2>
      <p>
        The most common use case: load tokens only (25 KB) or the full component
        library (118 KB). Both require React to be loaded first.
      </p>

      <h3>Tokens only</h3>
      <pre>
        <code>{`<!DOCTYPE html>
<html>
<head>
  <!-- 1. React (required peer dep) -->
  <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>

  <!-- 2. Stareezy tokens -->
  <script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/tokens/dist/cdn/stareezy-tokens.global.js"></script>
</head>
<body>
  <script>
    const { colors, spacing, radius } = StareezyTokens;

    console.log(colors.celurenBlue[500].value); // "#024CCE"
    console.log(spacing[4].value);              // 16
    console.log(radius.md.value);               // 8
  </script>
</body>
</html>`}</code>
      </pre>

      <h3>Full component library</h3>
      <pre>
        <code>{`<!DOCTYPE html>
<html>
<head>
  <!-- 1. React -->
  <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>

  <!-- 2. Stareezy UI (includes tokens, runtime, stylesheet) -->
  <script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/components/dist/cdn/stareezy-ui.global.js"></script>
</head>
<body>
  <div id="root"></div>
  <script>
    const { Box, Text, Button, ThemeProvider } = StareezyUI;
    const { colors, spacing } = StareezyUI; // tokens are re-exported

    const e = React.createElement;

    ReactDOM.createRoot(document.getElementById("root")).render(
      e(ThemeProvider, { theme: "light" },
        e(Box, { bg: colors.celurenBlue[500], p: spacing[4] },
          e(Text, { type: "M-heading-bold", text: "Hello from CDN!" })
        )
      )
    );
  </script>
</body>
</html>`}</code>
      </pre>

      <Callout type="tip">
        The <code>StareezyUI</code> global re-exports everything from tokens,
        runtime, and components — so you only need the one script tag for the
        full library.
      </Callout>

      <h2>Step-by-Step Setup</h2>

      <Step n={1} title="Load React from CDN">
        React must be on the page before any Stareezy script. Use the UMD builds
        from jsDelivr or unpkg:
        <pre>
          <code>{`<!-- Development (with warnings) -->
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.development.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.development.js"></script>

<!-- Production (minified) -->
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>`}</code>
        </pre>
      </Step>

      <Step n={2} title="Load the Stareezy bundle">
        Pick the bundle you need. For most use cases, one of these two:
        <pre>
          <code>{`<!-- Tokens only — 25 KB, zero component overhead -->
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/tokens/dist/cdn/stareezy-tokens.global.js"></script>

<!-- Full library — 118 KB, includes all components -->
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/components/dist/cdn/stareezy-ui.global.js"></script>`}</code>
        </pre>
      </Step>

      <Step n={3} title="Pin a version (recommended for production)">
        Always pin to a specific version in production to avoid unexpected
        breaking changes:
        <pre>
          <code>{`<!-- Pinned to 0.2.1 -->
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/tokens@0.2.1/dist/cdn/stareezy-tokens.global.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/components@0.2.1/dist/cdn/stareezy-ui.global.js"></script>`}</code>
        </pre>
      </Step>

      <Step n={4} title="Use the globals">
        All exports are available on the global variable. Destructure what you
        need:
        <pre>
          <code>{`// Tokens
const { colors, spacing, radius, typography, shadow, timing } = StareezyTokens;

// Components + tokens (from the full bundle)
const { Box, Text, Button, Input, Badge, Card, ThemeProvider } = StareezyUI;
const { colors, spacing } = StareezyUI;`}</code>
        </pre>
      </Step>

      <h2>Global Variable Reference</h2>
      <table>
        <thead>
          <tr>
            <th>Script</th>
            <th>Global</th>
            <th>Contains</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>stareezy-tokens.global.js</code>
            </td>
            <td>
              <code>StareezyTokens</code>
            </td>
            <td>
              colors, spacing, radius, typography, shadow, timing, motion,
              ThemeProvider, createUi, token
            </td>
          </tr>
          <tr>
            <td>
              <code>stareezy-ui.global.js</code>
            </td>
            <td>
              <code>StareezyUI</code>
            </td>
            <td>
              Everything in StareezyTokens + all components (Box, Text, Button,
              Input, …)
            </td>
          </tr>
          <tr>
            <td>
              <code>stareezy-runtime.global.js</code>
            </td>
            <td>
              <code>StareezyRuntime</code>
            </td>
            <td>styleRegistry, resolve, webAdapter</td>
          </tr>
          <tr>
            <td>
              <code>stareezy-stylesheet.global.js</code>
            </td>
            <td>
              <code>StareezyStylesheet</code>
            </td>
            <td>injectSheet, flushSheet</td>
          </tr>
          <tr>
            <td>
              <code>stareezy-core.global.js</code>
            </td>
            <td>
              <code>StareezyCore</code>
            </td>
            <td>platform helpers, useDeviceLayout, spacing utilities</td>
          </tr>
        </tbody>
      </table>

      <h2>Using with JSX (Babel standalone)</h2>
      <p>
        If you want JSX syntax in the browser, add Babel standalone before your
        script and mark it <code>type="text/babel"</code>:
      </p>
      <pre>
        <code>{`<script src="https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/components/dist/cdn/stareezy-ui.global.js"></script>

<div id="root"></div>

<script type="text/babel">
  const { Box, Text, Button, ThemeProvider } = StareezyUI;
  const { colors, spacing, radius } = StareezyUI;

  function App() {
    return (
      <ThemeProvider theme="light">
        <Box bg={colors.celurenBlue[500]} p={spacing[4]} rounded={radius.md}>
          <Text type="M-heading-bold" text="Hello from CDN + JSX!" />
          <Button variant="primary" text="Click me" onPress={() => alert("hi")} />
        </Box>
      </ThemeProvider>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
</script>`}</code>
      </pre>

      <Callout type="warning">
        Babel standalone is ~900 KB and compiles JSX in the browser at runtime.
        It&apos;s fine for prototyping but not recommended for production — use
        a bundler instead.
      </Callout>

      <h2>Tokens-only (no React)</h2>
      <p>
        If you only need design values (colors, spacing, etc.) and don&apos;t
        use React at all, the tokens bundle still works — just ignore the
        ThemeProvider export:
      </p>
      <pre>
        <code>{`<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/tokens/dist/cdn/stareezy-tokens.global.js"></script>

<script>
  const { colors, spacing, radius } = StareezyTokens;

  // Apply token values to any DOM element
  document.querySelector(".hero").style.backgroundColor = colors.celurenBlue[500].value;
  document.querySelector(".hero").style.padding = spacing[6].value + "px";
</script>`}</code>
      </pre>

      <Callout type="info">
        React is still required as a script tag even for tokens-only usage
        because <code>ThemeProvider</code> is part of the tokens bundle. A
        future tokens-only build without React is planned.
      </Callout>

      <h2>CDN Providers</h2>
      <p>
        The bundles are served from any CDN that mirrors npm. Both jsDelivr and
        unpkg work out of the box:
      </p>
      <pre>
        <code>{`<!-- jsDelivr (recommended — global CDN, SRI support) -->
https://cdn.jsdelivr.net/npm/@stareezy-ui/tokens@{version}/dist/cdn/stareezy-tokens.global.js

<!-- unpkg -->
https://unpkg.com/@stareezy-ui/tokens@{version}/dist/cdn/stareezy-tokens.global.js`}</code>
      </pre>

      <Callout type="tip">
        jsDelivr supports{" "}
        <a
          href="https://www.jsdelivr.com/features#sri"
          target="_blank"
          rel="noopener noreferrer"
        >
          Subresource Integrity (SRI)
        </a>{" "}
        hashes. Use them in production to protect against CDN compromise:
        <pre style={{ marginTop: "0.5rem" }}>
          <code>{`<script
  src="https://cdn.jsdelivr.net/npm/@stareezy-ui/tokens@0.2.0/dist/cdn/stareezy-tokens.global.js"
  integrity="sha256-..."
  crossorigin="anonymous"
></script>`}</code>
        </pre>
      </Callout>
    </DocPage>
  );
}
