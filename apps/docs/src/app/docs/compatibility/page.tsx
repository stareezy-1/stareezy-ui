import type { Metadata } from "next";
import { DocPage, Callout } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Compatibility & Installation",
  description:
    "Stareezy UI compatibility matrix — React 18/19, React Native 0.81–0.86, Expo SDK 54–56, Next.js 14–16, Vite 4–7. Installation guide for all frameworks.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/compatibility" },
};

const MATRIX = [
  {
    framework: "React",
    versions: ["18", "19"],
    peerDep: '"react": "^18 || ^19"',
    notes: "Both major versions fully supported",
  },
  {
    framework: "React DOM",
    versions: ["18", "19"],
    peerDep: '"react-dom": "^18 || ^19"',
    notes: "Required for web targets",
  },
  {
    framework: "React Native",
    versions: ["0.81", "0.82", "0.83", "0.84", "0.85", "0.86"],
    peerDep: '"react-native": ">=0.81 <0.87"',
    notes: "Full range supported",
  },
  {
    framework: "Expo SDK",
    versions: ["54", "55", "56"],
    peerDep: "via react-native peerDep",
    notes: "SDK 55 is the primary target; 54 and 56 are tested",
  },
  {
    framework: "Next.js",
    versions: ["14", "15", "16"],
    peerDep: "optional peer (web only)",
    notes: "App Router supported on all three versions",
  },
  {
    framework: "Vite",
    versions: ["4", "5", "6", "7"],
    peerDep: "optional peer (web only)",
    notes: "Vite plugin uses stable Plugin hook contract only",
  },
];

export default function CompatibilityPage() {
  return (
    <DocPage
      title="Compatibility & Installation"
      description="Supported framework versions, peerDependency ranges, and installation instructions for Next.js, Vite, and Expo."
      badge="Guide"
      icon="↓"
      badgeColor="#ff6a1a"
    >
      <h2 className="gradient-text">Compatibility matrix</h2>
      <p>
        Stareezy UI is tested against the following framework versions in CI
        (both the lowest and highest end of each supported range):
      </p>
      <div style={{ overflowX: "auto", margin: "1rem 0 2rem" }}>
        <table>
          <thead>
            <tr style={{ borderTop: "2px solid #ff6a1a" }}>
              <th>Framework</th>
              <th>Supported versions</th>
              <th>peerDependency range</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {MATRIX.map((row) => (
              <tr key={row.framework}>
                <td>
                  <strong style={{ color: "#ff6a1a" }}>{row.framework}</strong>
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.25rem",
                    }}
                  >
                    {row.versions.map((v) => (
                      <code
                        key={v}
                        style={{
                          fontSize: "0.75rem",
                          background: "var(--brand-50)",
                          color: "var(--brand-500)",
                          border: "1px solid var(--brand-100)",
                          borderRadius: 4,
                          padding: "2px 6px",
                        }}
                      >
                        {v}
                      </code>
                    ))}
                  </div>
                </td>
                <td>
                  <code style={{ fontSize: "0.78em" }}>{row.peerDep}</code>
                </td>
                <td
                  style={{ color: "var(--color-text-2)", fontSize: "0.875rem" }}
                >
                  {row.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="info">
        All <code>@stareezy-ui/*</code> packages declare ranged{" "}
        <code>peerDependencies</code> — they do not hard-pin a single major
        version. You can use Stareezy-ui in a React 18 project today and upgrade
        to React 19 without changing the Stareezy-ui version.
      </Callout>

      {/* ── Installation ─────────────────────────────────────────────────── */}
      <h2 className="gradient-text">Installation</h2>

      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-2)",
          borderLeft: "4px solid #ff6a1a",
          borderRadius: "0 10px 10px 0",
          padding: "0.75rem 1rem",
          margin: "1.25rem 0",
          boxShadow: "0 0 40px rgba(255,106,26,0.03)",
        }}
      >
        <h3 style={{ margin: 0, color: "var(--color-text)" }}>Next.js (App Router)</h3>
      </div>
      <pre>
        <code>{`# Next.js 14, 15, or 16
npm install @stareezy-ui/components @stareezy-ui/tokens @stareezy-ui/compiler
# or
pnpm add @stareezy-ui/components @stareezy-ui/tokens @stareezy-ui/compiler
# or
yarn add @stareezy-ui/components @stareezy-ui/tokens @stareezy-ui/compiler`}</code>
      </pre>
      <pre>
        <code>{`// next.config.ts
import { stareezyVitePlugin } from '@stareezy-ui/compiler'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(stareezyVitePlugin())
    return config
  },
}
export default nextConfig`}</code>
      </pre>

      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-2)",
          borderLeft: "4px solid #ff6a1a",
          borderRadius: "0 10px 10px 0",
          padding: "0.75rem 1rem",
          margin: "1.25rem 0",
          boxShadow: "0 0 40px rgba(255,106,26,0.03)",
        }}
      >
        <h3 style={{ margin: 0, color: "var(--color-text)" }}>Vite + React</h3>
      </div>
      <pre>
        <code>{`# Vite 4, 5, 6, or 7
npm install @stareezy-ui/components @stareezy-ui/tokens @stareezy-ui/compiler`}</code>
      </pre>
      <pre>
        <code>{`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { stareezyVitePlugin } from '@stareezy-ui/compiler'

export default defineConfig({
  plugins: [
    react(),
    stareezyVitePlugin(),
  ],
})

// main.tsx — import the generated CSS once
import 'virtual:stareezy-ui/styles'`}</code>
      </pre>

      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-2)",
          borderLeft: "4px solid #ff6a1a",
          borderRadius: "0 10px 10px 0",
          padding: "0.75rem 1rem",
          margin: "1.25rem 0",
          boxShadow: "0 0 40px rgba(255,106,26,0.03)",
        }}
      >
        <h3 style={{ margin: 0, color: "var(--color-text)" }}>Expo (React Native)</h3>
      </div>
      <pre>
        <code>{`# Expo SDK 54, 55, or 56
yarn add @stareezy-ui/components @stareezy-ui/tokens @stareezy-ui/compiler`}</code>
      </pre>
      <pre>
        <code>{`// metro.config.js
const { getDefaultConfig } = require('expo/metro-config')
const config = getDefaultConfig(__dirname)

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('@stareezy-ui/compiler/metro'),
}

module.exports = config`}</code>
      </pre>

      {/* ── peerDependencies ─────────────────────────────────────────────── */}
      <h2 className="gradient-text">peerDependencies</h2>
      <p>
        All <code>@stareezy-ui/*</code> packages declare the following{" "}
        <code>peerDependencies</code> with optional flags where the peer is not
        required on all platforms:
      </p>
      <pre>
        <code>{`// Declared across all packages:
{
  "peerDependencies": {
    "react":        "^18 || ^19",
    "react-dom":    "^18 || ^19",
    "react-native": ">=0.81 <0.87"
  },
  "peerDependenciesMeta": {
    "react-dom":    { "optional": true },
    "react-native": { "optional": true }
  }
}`}</code>
      </pre>
      <p>
        <code>react-dom</code> is optional because React Native projects do not
        need it. <code>react-native</code> is optional because web-only (Vite /
        Next.js) projects do not need it.
      </p>

      {/* ── Quick scaffolding ─────────────────────────────────────────────── */}
      <h2 className="gradient-text">Quick scaffolding with the CLI</h2>
      <p>
        Instead of wiring everything manually, use the CLI to scaffold a
        pre-wired project in one command:
      </p>
      <pre>
        <code>{`npx stareezy create my-app --template next   # Next.js App Router
npx stareezy create my-app --template vite   # Vite + React
npx stareezy create my-app --template expo   # Expo SDK 55`}</code>
      </pre>
      <p>
        See the{" "}
        <a
          href="/docs/cli"
          style={{
            color: "#ff6a1a",
            fontWeight: 700,
            textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}
        >
          CLI guide
        </a>{" "}
        for details on the <code>create</code>, <code>init</code>, and{" "}
        <code>add</code> commands.
      </p>

      {/* ── Version notes ────────────────────────────────────────────────── */}
      <h2 className="gradient-text">Version-specific notes</h2>

      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "1rem" }}>
        <span style={{ color: "#ff6a1a", fontSize: "1.2rem", lineHeight: 1, marginTop: 2 }}>•</span>
        <div>
          <h3 style={{ margin: "0 0 0.25rem" }}>React 19</h3>
          <p style={{ margin: 0 }}>
            Stareezy UI is compatible with React 19. The <code>ref</code> prop
            changes in React 19 are handled internally — no changes to your
            component usage are required.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "1rem" }}>
        <span style={{ color: "#ff6a1a", fontSize: "1.2rem", lineHeight: 1, marginTop: 2 }}>•</span>
        <div>
          <h3 style={{ margin: "0 0 0.25rem" }}>Next.js 15 and 16</h3>
          <p style={{ margin: 0 }}>
            The <code>&quot;./server&quot;</code> entry and the client boundary
            pattern work on Next.js 14, 15, and 16 with the App Router. The Pages
            Router is not officially supported.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "1rem" }}>
        <span style={{ color: "#ff6a1a", fontSize: "1.2rem", lineHeight: 1, marginTop: 2 }}>•</span>
        <div>
          <h3 style={{ margin: "0 0 0.25rem" }}>Vite major versions</h3>
          <p style={{ margin: 0 }}>
            The <code>stareezyVitePlugin()</code> uses only the stable{" "}
            <code>Plugin</code> hook contract (<code>resolveId</code>,{" "}
            <code>load</code>, <code>transform</code>) — no version-specific
            internal APIs. It works on Vite 4, 5, 6, and 7.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "1rem" }}>
        <span style={{ color: "#ff6a1a", fontSize: "1.2rem", lineHeight: 1, marginTop: 2 }}>•</span>
        <div>
          <h3 style={{ margin: "0 0 0.25rem" }}>Expo SDK compatibility</h3>
          <p style={{ margin: 0 }}>
            The Metro transformer is compatible with Expo SDK 54, 55, and 56 on
            React Native 0.81 through 0.86. It does not depend on Expo-version-
            specific Metro internals.
          </p>
        </div>
      </div>

      <Callout type="tip">
        If you run into a compatibility issue on a version within the supported
        range, please open an issue on{" "}
        <a
          href="https://github.com/stareezy-1/stareezy-ui"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--brand-500)" }}
        >
          GitHub
        </a>
        .
      </Callout>
    </DocPage>
  );
}
