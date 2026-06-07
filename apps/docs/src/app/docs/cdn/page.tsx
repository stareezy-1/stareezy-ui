import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "CDN Usage",
  description:
    "Use Stareezy UI directly from a CDN — no build step required. Drop a script tag and start using tokens and components in any HTML page.",
  keywords: [
    "Stareezy ui cdn",
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
    file: "Stareezy-tokens.global.js",
    global: "StareezyTokens",
    size: "~25 KB",
    desc: "All design tokens — colors, spacing, radius, typography, etc.",
    color: "#024CCE",
    bg: "#E6EDFA",
  },
  {
    pkg: "@stareezy-ui/components",
    file: "Stareezy-ui.global.js",
    global: "StareezyUI",
    size: "~118 KB",
    desc: "Full component library — includes all tokens, runtime, and stylesheet.",
    color: "#4D8D01",
    bg: "#F3FFE3",
  },
  {
    pkg: "@stareezy-ui/runtime",
    file: "Stareezy-runtime.global.js",
    global: "StareezyRuntime",
    size: "~3 KB",
    desc: "O(1) style registry and web adapter — use if you need the runtime without components.",
    color: "#0C9182",
    bg: "#E7FDFA",
  },
  {
    pkg: "@stareezy-ui/stylesheet",
    file: "Stareezy-stylesheet.global.js",
    global: "StareezyStylesheet",
    size: "~1.5 KB",
    desc: "Atomic CSS sheet management — low-level, rarely needed standalone.",
    color: "#C98B25",
    bg: "#FEF4E2",
  },
  {
    pkg: "@stareezy-ui/core",
    file: "Stareezy-core.global.js",
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
      badgeColor="#f5a623"
    >
      <h2 className="gradient-text">Overview</h2>
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

      <h2 className="gradient-text">Available Bundles</h2>
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
              borderTop: "3px solid var(--brand-primary)",
              borderRadius: 10,
              padding: "0.9rem 1rem",
              backdropFilter: "blur(8px)",
              boxShadow: "0 0 40px rgba(245,166,35,0.03)",
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

      <h2 className="gradient-text">Quick Start</h2>
      <p>
        The most common use case: load tokens only (25 KB) or the full component
        library (118 KB). Both require React to be loaded first.
      </p>

      <h3>Tokens only</h3>
      <pre
        style={{
          border: "1px solid var(--color-border)",
          boxShadow: "0 0 40px rgba(245,166,35,0.03)",
        }}
      >
        <code>{`<!DOCTYPE html>
<html>
<head>
  <!-- 1. React (required peer dep) -->
  <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>

  <!-- 2. Stareezy tokens -->
  <script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/tokens/dist/cdn/Stareezy-tokens.global.js"></script>
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
      <pre
        style={{
          border: "1px solid var(--color-border)",
          boxShadow: "0 0 40px rgba(245,166,35,0.03)",
        }}
      >
        <code>{`<!DOCTYPE html>
<html>
<head>
  <!-- 1. React -->
  <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>

  <!-- 2. Stareezy UI (includes tokens, runtime, stylesheet) -->
  <script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/components/dist/cdn/Stareezy-ui.global.js"></script>
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

      <h2 className="gradient-text">Step-by-Step Setup</h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.75rem" }}>
        <div
          style={{
            width: 32,
            height: 32,
            flexShrink: 0,
            background: "var(--brand-primary)",
            color: "var(--color-bg)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "0.85rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            marginTop: 2,
          }}
        >
          1
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--color-text)",
              marginBottom: "0.5rem",
            }}
          >
            Load React from CDN
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-2)",
              lineHeight: 1.7,
            }}
          >
            React must be on the page before any Stareezy script. Use the UMD builds
            from jsDelivr or unpkg:
            <pre
              style={{
                border: "1px solid var(--color-border)",
                boxShadow: "0 0 40px rgba(245,166,35,0.03)",
              }}
            >
              <code>{`<!-- Development (with warnings) -->
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.development.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.development.js"></script>

<!-- Production (minified) -->
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.75rem" }}>
        <div
          style={{
            width: 32,
            height: 32,
            flexShrink: 0,
            background: "var(--brand-primary)",
            color: "var(--color-bg)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "0.85rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            marginTop: 2,
          }}
        >
          2
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--color-text)",
              marginBottom: "0.5rem",
            }}
          >
            Load the Stareezy bundle
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-2)",
              lineHeight: 1.7,
            }}
          >
            Pick the bundle you need. For most use cases, one of these two:
            <pre
              style={{
                border: "1px solid var(--color-border)",
                boxShadow: "0 0 40px rgba(245,166,35,0.03)",
              }}
            >
              <code>{`<!-- Tokens only — 25 KB, zero component overhead -->
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/tokens/dist/cdn/Stareezy-tokens.global.js"></script>

<!-- Full library — 118 KB, includes all components -->
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/components/dist/cdn/Stareezy-ui.global.js"></script>`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.75rem" }}>
        <div
          style={{
            width: 32,
            height: 32,
            flexShrink: 0,
            background: "var(--brand-primary)",
            color: "var(--color-bg)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "0.85rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            marginTop: 2,
          }}
        >
          3
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--color-text)",
              marginBottom: "0.5rem",
            }}
          >
            Pin a version (recommended for production)
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-2)",
              lineHeight: 1.7,
            }}
          >
            Always pin to a specific version in production to avoid unexpected
            breaking changes:
            <pre
              style={{
                border: "1px solid var(--color-border)",
                boxShadow: "0 0 40px rgba(245,166,35,0.03)",
              }}
            >
              <code>{`<!-- Pinned to 0.2.3 -->
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/tokens@0.2.3/dist/cdn/Stareezy-tokens.global.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/components@0.2.3/dist/cdn/Stareezy-ui.global.js"></script>`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.75rem" }}>
        <div
          style={{
            width: 32,
            height: 32,
            flexShrink: 0,
            background: "var(--brand-primary)",
            color: "var(--color-bg)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "0.85rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            marginTop: 2,
          }}
        >
          4
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--color-text)",
              marginBottom: "0.5rem",
            }}
          >
            Use the globals
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-2)",
              lineHeight: 1.7,
            }}
          >
            All exports are available on the global variable. Destructure what you
            need:
            <pre
              style={{
                border: "1px solid var(--color-border)",
                boxShadow: "0 0 40px rgba(245,166,35,0.03)",
              }}
            >
              <code>{`// Tokens
const { colors, spacing, radius, typography, shadow, timing } = StareezyTokens;

// Components + tokens (from the full bundle)
const { Box, Text, Button, Input, Badge, Card, ThemeProvider } = StareezyUI;
const { colors, spacing } = StareezyUI;`}</code>
            </pre>
          </div>
        </div>
      </div>

      <h2 className="gradient-text">Global Variable Reference</h2>
      <table>
        <thead>
          <tr style={{ borderTop: "2px solid var(--brand-primary)" }}>
            <th>Script</th>
            <th>Global</th>
            <th>Contains</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>Stareezy-tokens.global.js</code>
            </td>
            <td>
              <code style={{ color: "#f5a623" }}>StareezyTokens</code>
            </td>
            <td>
              colors, spacing, radius, typography, shadow, timing, motion,
              ThemeProvider, createUi, token
            </td>
          </tr>
          <tr>
            <td>
              <code>Stareezy-ui.global.js</code>
            </td>
            <td>
              <code style={{ color: "#f5a623" }}>StareezyUI</code>
            </td>
            <td>
              Everything in StareezyTokens + all components (Box, Text, Button,
              Input, …)
            </td>
          </tr>
          <tr>
            <td>
              <code>Stareezy-runtime.global.js</code>
            </td>
            <td>
              <code style={{ color: "#f5a623" }}>StareezyRuntime</code>
            </td>
            <td>styleRegistry, resolve, webAdapter</td>
          </tr>
          <tr>
            <td>
              <code>Stareezy-stylesheet.global.js</code>
            </td>
            <td>
              <code style={{ color: "#f5a623" }}>StareezyStylesheet</code>
            </td>
            <td>injectSheet, flushSheet</td>
          </tr>
          <tr>
            <td>
              <code>Stareezy-core.global.js</code>
            </td>
            <td>
              <code style={{ color: "#f5a623" }}>StareezyCore</code>
            </td>
            <td>platform helpers, useDeviceLayout, spacing utilities</td>
          </tr>
        </tbody>
      </table>

      <h2 className="gradient-text">Using with JSX (Babel standalone)</h2>
      <p>
        If you want JSX syntax in the browser, add Babel standalone before your
        script and mark it <code>type="text/babel"</code>:
      </p>
      <pre
        style={{
          border: "1px solid var(--color-border)",
          boxShadow: "0 0 40px rgba(245,166,35,0.03)",
        }}
      >
        <code>{`<script src="https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/components/dist/cdn/Stareezy-ui.global.js"></script>

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

      <h2 className="gradient-text">Tokens-only (no React)</h2>
      <p>
        If you only need design values (colors, spacing, etc.) and don&apos;t
        use React at all, the tokens bundle still works — just ignore the
        ThemeProvider export:
      </p>
      <pre
        style={{
          border: "1px solid var(--color-border)",
          boxShadow: "0 0 40px rgba(245,166,35,0.03)",
        }}
      >
        <code>{`<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/tokens/dist/cdn/Stareezy-tokens.global.js"></script>

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

      <h2 className="gradient-text">CDN Providers</h2>
      <p>
        The bundles are served from any CDN that mirrors npm. Both jsDelivr and
        unpkg work out of the box:
      </p>
      <pre
        style={{
          border: "1px solid var(--color-border)",
          boxShadow: "0 0 40px rgba(245,166,35,0.03)",
          background: "var(--color-surface)",
        }}
      >
        <code>{`<!-- jsDelivr (recommended — global CDN, SRI support) -->
https://cdn.jsdelivr.net/npm/@stareezy-ui/tokens@{version}/dist/cdn/Stareezy-tokens.global.js

<!-- unpkg -->
https://unpkg.com/@stareezy-ui/tokens@{version}/dist/cdn/Stareezy-tokens.global.js`}</code>
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
  src="https://cdn.jsdelivr.net/npm/@stareezy-ui/tokens@0.2.3/dist/cdn/Stareezy-tokens.global.js"
  integrity="sha256-..."
  crossorigin="anonymous"
></script>`}</code>
        </pre>
      </Callout>
    </DocPage>
  );
}
