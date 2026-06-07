import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install Quasify UI in your React Native or web project. Scaffold with the CLI or wire manually — get running in minutes.",
  alternates: { canonical: "https://ui.quasify.app/docs/installation" },
};

export default function InstallationPage() {
  return (
    <DocPage
      title="Installation"
      description="Scaffold a pre-wired project in one command, or wire an existing project manually — your choice."
      badge="Getting Started"
      badgeColor="#ff6a1a"
      icon="↓"
    >
      <style>{`
        .pm-wrap > input[type="radio"] { display: none; }
        .pm-wrap > .pm-body { display: none; margin-top: 0; border-radius: 0 0 8px 8px; border: 1px solid var(--color-border); border-top: none; overflow: hidden; }
        .pm-wrap > .pm-body pre { margin: 0; border-radius: 0; border: none; }
        #pm-npm:checked ~ .pm-body.pm-npm,
        #pm-yarn:checked ~ .pm-body.pm-yarn,
        #pm-pnpm:checked ~ .pm-body.pm-pnpm { display: block; }
        #pm-npm:checked ~ .pm-header label[for="pm-npm"],
        #pm-yarn:checked ~ .pm-header label[for="pm-yarn"],
        #pm-pnpm:checked ~ .pm-header label[for="pm-pnpm"] { color: var(--brand-500) !important; background: var(--brand-50) !important; border-bottom-color: var(--brand-500) !important; }
      `}</style>

      <Callout type="tip">
        The fastest path is the CLI:{" "}
        <code>npx quasify create my-app --template next</code>. It scaffolds a
        fully wired project with <code>quasify.config.ts</code>, the compiler
        plugin, and <code>ThemeProvider</code> already set up.
      </Callout>

      {/* ── CLI (recommended) ─────────────────────────────────────────────── */}
      <h2 className="gradient-text-orange" style={{ marginTop: "2rem" }}>Option A — CLI (recommended)</h2>
      <p>
        The <code>@quasify-ui/cli</code> scaffolds a pre-wired starter project
        for Next.js, Vite, or Expo. No manual wiring — everything is ready to
        run.
      </p>

      <div className="pm-wrap" style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem",
        margin: "1.5rem 0",
      }}>
        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-text)", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--brand-500)", boxShadow: "0 0 8px var(--brand-500)", display: "inline-block" }} />
          Create a new project
        </div>

        <input type="radio" name="pm" id="pm-npm" defaultChecked />
        <input type="radio" name="pm" id="pm-yarn" />
        <input type="radio" name="pm" id="pm-pnpm" />

        <div className="pm-header" style={{
          display: "flex",
          gap: 0,
          borderRadius: "8px 8px 0 0",
          overflow: "hidden",
          border: "1px solid var(--color-border)",
          borderBottom: "none",
        }}>
          <label htmlFor="pm-npm" style={{
            flex: 1, textAlign: "center", padding: "0.6rem 0", fontSize: "0.8rem",
            fontWeight: 600, cursor: "pointer", background: "var(--color-surface)",
            color: "var(--color-text-2)", borderBottom: "2px solid transparent",
            fontFamily: "var(--font-mono)", transition: "all 0.2s",
          }}>npm</label>
          <label htmlFor="pm-yarn" style={{
            flex: 1, textAlign: "center", padding: "0.6rem 0", fontSize: "0.8rem",
            fontWeight: 600, cursor: "pointer", background: "var(--color-surface)",
            color: "var(--color-text-2)", borderBottom: "2px solid transparent",
            fontFamily: "var(--font-mono)", transition: "all 0.2s",
          }}>yarn</label>
          <label htmlFor="pm-pnpm" style={{
            flex: 1, textAlign: "center", padding: "0.6rem 0", fontSize: "0.8rem",
            fontWeight: 600, cursor: "pointer", background: "var(--color-surface)",
            color: "var(--color-text-2)", borderBottom: "2px solid transparent",
            fontFamily: "var(--font-mono)", transition: "all 0.2s",
          }}>pnpm</label>
        </div>

        <div className="pm-body pm-npm" style={{
          marginTop: 0,
          borderRadius: "0 0 8px 8px",
          border: "1px solid var(--color-border)",
          borderTop: "none",
          overflow: "hidden",
        }}>
          <pre style={{ margin: 0, borderRadius: 0, border: "none" }}>
            <code>{`npx @quasify-ui/cli create my-app --template next
cd my-app
npm install
npm run dev`}</code>
          </pre>
        </div>

        <div className="pm-body pm-yarn" style={{
          marginTop: 0,
          borderRadius: "0 0 8px 8px",
          border: "1px solid var(--color-border)",
          borderTop: "none",
          overflow: "hidden",
        }}>
          <pre style={{ margin: 0, borderRadius: 0, border: "none" }}>
            <code>{`yarn create quasify my-app --template next
cd my-app
yarn install
yarn dev`}</code>
          </pre>
        </div>

        <div className="pm-body pm-pnpm" style={{
          marginTop: 0,
          borderRadius: "0 0 8px 8px",
          border: "1px solid var(--color-border)",
          borderTop: "none",
          overflow: "hidden",
        }}>
          <pre style={{ margin: 0, borderRadius: 0, border: "none" }}>
            <code>{`pnpm create quasify my-app --template next
cd my-app
pnpm install
pnpm dev`}</code>
          </pre>
        </div>
      </div>

      <h3>Next.js 15 (App Router)</h3>
      <pre style={{ boxShadow: "var(--shadow-md)", border: "1px solid var(--color-border)" }}>
        <code>{`npx quasify create my-app --template next
cd my-app
pnpm install
pnpm dev`}</code>
      </pre>

      <h3>Vite + React 19</h3>
      <pre style={{ boxShadow: "var(--shadow-md)", border: "1px solid var(--color-border)" }}>
        <code>{`npx quasify create my-app --template vite
cd my-app
npm install
npm run dev`}</code>
      </pre>

      <h3>Expo SDK 56</h3>
      <pre style={{ boxShadow: "var(--shadow-md)", border: "1px solid var(--color-border)" }}>
        <code>{`npx quasify create my-app --template expo
cd my-app
yarn install
expo start`}</code>
      </pre>

      <div style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "1rem 1.25rem",
        margin: "1.25rem 0",
      }}>
        <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--color-text)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--brand-500)", boxShadow: "0 0 8px var(--brand-500)", display: "inline-block" }} />
          Each template ships with
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {[
            "<code>quasify.config.ts</code> with <code>media</code> breakpoints and <code>shorthands</code> pre-configured",
            "Compiler wiring (Vite plugin for Next.js/Vite, Metro transformer for Expo)",
            "<code>ThemeProvider</code> wrapping the app root",
            "A curated set of components ready to use",
          ].map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "0.3rem 0", fontSize: "0.875rem", color: "var(--color-text-2)" }}>
              <span style={{ color: "var(--brand-500)", flexShrink: 0, marginTop: 2 }}>◈</span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>

      <Callout type="info">
        If you already have a project, run <code>npx quasify init</code> to add
        just the wiring. It is idempotent — safe to run multiple times.
      </Callout>

      {/* ── Option B: Manual ──────────────────────────────────────────────── */}
      <h2 className="gradient-text-orange" style={{ marginTop: "2rem" }}>Option B — Manual</h2>
      <p>Install the packages individually and wire them yourself.</p>

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
          { icon: "◈", label: "pnpm 9+ / npm / yarn" },
          { icon: "⚛", label: "React 18 or 19" },
          { icon: "TS", label: "TypeScript 5+" },
        ].map((r) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "0.75rem 1rem",
              boxShadow: "0 0 0 1px rgba(255,106,26,0.04)",
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

      <h2>Install packages</h2>

      <div style={{
        marginBottom: "1.5rem",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
      }}>
        <div style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-surface)",
        }}>
          {["npm", "yarn", "pnpm"].map((pm) => (
            <div key={pm} style={{
              flex: 1,
              textAlign: "center",
              padding: "0.6rem 0",
              fontSize: "0.8rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              color: pm === "pnpm" ? "var(--brand-500)" : "var(--color-text-2)",
              background: pm === "pnpm" ? "var(--brand-50)" : "transparent",
              boxShadow: pm === "pnpm" ? "inset 0 -2px 0 var(--brand-500)" : "none",
              transition: "all 0.2s",
            }}>
              {pm}
            </div>
          ))}
        </div>
        <pre style={{ margin: 0, borderRadius: 0, border: "none" }}>
          <code>{`# Tokens only (zero dependencies)
pnpm add @quasify-ui/tokens

# Full component library
pnpm add @quasify-ui/tokens @quasify-ui/components @quasify-ui/runtime

# Build-time compiler (Vite, Babel, or Metro)
pnpm add -D @quasify-ui/compiler`}</code>
        </pre>
      </div>

      <h2>Setup</h2>

      <Step n={1} title="Create quasify.config.ts">
        <p style={{ marginBottom: "0.75rem" }}>
          Create a config file at your project root. This is read by the compiler
          automatically and registers your themes, tokens, breakpoints, and
          shorthands.
        </p>
        <pre style={{ boxShadow: "var(--shadow-md)", border: "1px solid var(--color-border)" }}>
          <code>{`// quasify.config.ts
import { createUi, themes } from '@quasify-ui/tokens'

export const ui = createUi({
  themes: {
    aurora:        themes.aurora,
    dark:          themes.dark,
    light:         themes.light,
    'steins-gate': themes['steins-gate'],
    quasar:        themes.quasar,
  },
  media: { sm: 480, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },
  shorthands: {
    p: 'padding', m: 'margin', br: 'borderRadius', w: 'width',
  } as const,
})

declare module '@quasify-ui/tokens' {
  interface QuasifyCustomConfig extends typeof ui {}
}

export default ui`}</code>
        </pre>
      </Step>

      <Step n={2} title="Add the compiler plugin">
        <p style={{ marginBottom: "0.5rem" }}>
          <strong>Next.js</strong> — in <code>next.config.ts</code>:
        </p>
        <pre style={{ boxShadow: "var(--shadow-md)", border: "1px solid var(--color-border)" }}>
          <code>{`import { quasifyVitePlugin } from '@quasify-ui/compiler'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(quasifyVitePlugin())
    return config
  },
}
export default nextConfig`}</code>
        </pre>
        <p style={{ marginTop: "0.75rem", marginBottom: "0.5rem" }}>
          <strong>Vite</strong> — in <code>vite.config.ts</code>:
        </p>
        <pre style={{ boxShadow: "var(--shadow-md)", border: "1px solid var(--color-border)" }}>
          <code>{`import { quasifyVitePlugin } from '@quasify-ui/compiler'
export default { plugins: [quasifyVitePlugin()] }`}</code>
        </pre>
        <p style={{ marginTop: "0.75rem", marginBottom: "0.5rem" }}>
          <strong>Expo / Metro</strong> — in <code>metro.config.js</code>:
        </p>
        <pre style={{ boxShadow: "var(--shadow-md)", border: "1px solid var(--color-border)" }}>
          <code>{`const { getDefaultConfig } = require('expo/metro-config')
const config = getDefaultConfig(__dirname)
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('@quasify-ui/compiler/metro'),
}
module.exports = config`}</code>
        </pre>
      </Step>

      <Step n={3} title="Wrap your app with ThemeProvider">
        <div style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          padding: "1.25rem",
          marginBottom: "0.75rem",
          boxShadow: "0 0 0 1px rgba(255,106,26,0.03)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--brand-500)", boxShadow: "0 0 8px var(--brand-500)", display: "inline-block" }} />
            <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--color-text)" }}>
              ThemeProvider setup
            </span>
          </div>
          <pre style={{ boxShadow: "var(--shadow-md)", border: "1px solid var(--color-border)" }}>
            <code>{`import './quasify.config'  // must be first import
import { ThemeProvider } from '@quasify-ui/tokens'

export default function App({ children }) {
  return (
    <ThemeProvider defaultTheme="aurora">
      {children}
    </ThemeProvider>
  )
}`}</code>
          </pre>
        </div>
        <Callout type="info">
          For Next.js App Router, wrap <code>ThemeProvider</code> in a{" "}
          <code>&quot;use client&quot;</code> component. See the{" "}
          <a href="/docs/server">Server Components guide</a> for the full
          pattern.
        </Callout>
      </Step>

      <Step n={4} title="Verify">
        <div style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          padding: "1rem",
          marginBottom: "0.75rem",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <span style={{ color: "var(--brand-500)", fontSize: "1rem" }}>✦</span>
          <span style={{ fontSize: "0.85rem", color: "var(--color-text-2)" }}>
            Components resolve to the current theme's values at render time via{" "}
            <code style={{ fontSize: "0.82rem" }}>t.*</code> props.
          </span>
        </div>
        <pre style={{ boxShadow: "var(--shadow-md)", border: "1px solid var(--color-border)" }}>
          <code>{`import { t } from '@quasify-ui/tokens'
import { Box, Text, Button } from '@quasify-ui/components'

function Test() {
  return (
    <Box bg={t.backgrounds.secondary} p={16} rounded={8}>
      <Text type="M-heading-bold" text="Quasify UI is working!" />
      <Button type="Primary" text="Click me" />
    </Box>
  )
}`}</code>
        </pre>
      </Step>

      <Callout type="tip">
        The compiler is optional — components work without it using the runtime
        adapter. The compiler gives you better performance by extracting atomic
        CSS at build time.
      </Callout>

      {/* ── Compatibility ─────────────────────────────────────────────────── */}
      <h2 className="gradient-text-orange" style={{ marginTop: "2rem" }}>Compatibility</h2>
      <div style={{
        overflowX: "auto",
        background: "var(--color-surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-sm)",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{
                padding: "0.85rem 1rem",
                textAlign: "left",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-500)",
                borderBottom: "2px solid var(--brand-500)",
                background: "var(--brand-50)",
              }}>
                Framework
              </th>
              <th style={{
                padding: "0.85rem 1rem",
                textAlign: "left",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-500)",
                borderBottom: "2px solid var(--brand-500)",
                background: "var(--brand-50)",
              }}>
                Supported versions
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["React", "18, 19"],
              ["React Native", "0.81 – 0.86"],
              ["Expo SDK", "54, 55, 56"],
              ["Next.js", "14, 15, 16"],
              ["Vite", "4, 5, 6, 7"],
            ].map(([fw, ver], i) => (
              <tr key={fw}>
                <td style={{
                  padding: "0.75rem 1rem",
                  borderBottom: "1px solid var(--color-border-2)",
                  background: i % 2 === 0 ? "transparent" : "var(--brand-50)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--brand-500)",
                      boxShadow: "0 0 6px var(--brand-500)",
                      flexShrink: 0,
                    }} />
                    <strong style={{ fontSize: "0.9rem" }}>{fw}</strong>
                  </div>
                </td>
                <td style={{
                  padding: "0.75rem 1rem",
                  borderBottom: "1px solid var(--color-border-2)",
                  color: "var(--color-text-2)",
                  fontSize: "0.875rem",
                  background: i % 2 === 0 ? "transparent" : "var(--brand-50)",
                  fontFamily: "var(--font-mono)",
                }}>
                  {ver}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: "0.75rem" }}>
        See the <a href="/docs/compatibility">Compatibility guide</a> for full
        details and installation instructions per framework.
      </p>
    </DocPage>
  );
}
