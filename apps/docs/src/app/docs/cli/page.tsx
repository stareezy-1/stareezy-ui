import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "@quasify-ui/cli",
  description:
    "First-party CLI for scaffolding new Quasify UI projects and adding components to existing Next.js, Vite, and Expo apps.",
  alternates: { canonical: "https://ui.quasify.app/docs/cli" },
};

const cmdCard: React.CSSProperties = {
  background: "var(--color-surface)",
  borderLeft: "3px solid var(--brand-primary)",
  borderRadius: 12,
  padding: "1.25rem 1.5rem",
  margin: "1.25rem 0",
  boxShadow: "0 0 0 1px rgba(255,106,26,0.06), var(--shadow-md)",
};

const cmdCode: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.95rem",
  color: "#ff6a1a",
  fontWeight: 600,
  marginBottom: "0.35rem",
};

const cmdDesc: React.CSSProperties = {
  fontSize: "0.875rem",
  color: "var(--color-text-2)",
  lineHeight: 1.6,
  margin: 0,
};

const sectionHeader: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: "2.5rem 0 0.75rem",
  color: "var(--color-text)",
};

const codeBlock: React.CSSProperties = {
  background: "#010103",
  borderRadius: 12,
  padding: "1.5rem",
  overflowX: "auto" as const,
  margin: "1.5rem 0",
  border: "1px solid rgba(255,106,26,0.1)",
  boxShadow: "0 0 40px rgba(255,106,26,0.05)",
};

const codeBlockInner: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.875rem",
  color: "#e2e8f0",
  lineHeight: 1.7,
  whiteSpace: "pre" as const,
};

export default function CliPage() {
  return (
    <DocPage
      title="@quasify-ui/cli"
      description="Scaffold new projects and add components with a single command — no manual wiring of createUi, the compiler, the runtime, or ThemeProvider."
      badge="CLI"
      icon="▶"
      badgeColor="#f5a623"
    >
      <h2 className="gradient-text" style={sectionHeader}>Installation</h2>
      <div style={codeBlock}>
        <code style={codeBlockInner}>{`# Use directly with npx (no install required)
npx quasify create my-app

# Or install globally
npm install -g @quasify-ui/cli
quasify create my-app`}</code>
      </div>

      {/* ── create command ───────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>create — scaffold a new project</h2>
      <p>
        The <code>create</code> command scaffolds a new project from one of the
        three pre-wired templates. Each template ships with{" "}
        <code>quasify.config.ts</code>, compiler wiring, a configured{" "}
        <code>ThemeProvider</code>, and a curated set of components — ready to
        run without any additional setup.
      </p>

      <div style={cmdCard}>
        <div style={cmdCode}>quasify create &lt;name&gt; [--template next|vite|expo]</div>
        <p style={cmdDesc}>
          Scaffold a new pre-wired project from one of the starter templates.
        </p>
      </div>

      <div style={codeBlock}>
        <code style={codeBlockInner}>{`quasify create my-app --template next   # Next.js 14 App Router
quasify create my-app --template vite   # Vite + React
quasify create my-app --template expo   # Expo SDK 55`}</code>
      </div>

      <p>
        If you omit <code>--template</code>, the CLI prompts you to choose:
      </p>

      <div style={codeBlock}>
        <code style={codeBlockInner}>{`$ quasify create my-app

? Select a template:
  ❯ next   — Next.js 14 App Router
    vite   — Vite + React
    expo   — Expo SDK 55`}</code>
      </div>

      <Step n={1} title="next — Next.js App Router template">
        <p>Scaffolds a Next.js 14 App Router project pre-wired with:</p>
        <ul style={{ listStyle: "none", padding: 0, margin: "0.75rem 0 1rem 0" }}>
          {[
            "<code>quasify.config.ts</code> with <code>media</code> breakpoints and <code>shorthands</code>",
            "<code>@quasify-ui/compiler</code> Vite plugin in <code>next.config.ts</code>",
            'Server primitives imported from <code>&quot;./server&quot;</code>',
            'Interactive components wrapped in a <code>&quot;use client&quot;</code> boundary',
            "<code>ThemeProvider</code> in a client <code>Providers</code> component",
          ].map((item, i) => (
            <li key={i} style={{ marginBottom: "0.4rem", color: "var(--color-text-2)" }}>
              <span style={{ color: "var(--brand-primary)", marginRight: 8 }}>●</span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
        <div style={codeBlock}>
          <code style={codeBlockInner}>{`quasify create my-next-app --template next
cd my-next-app
pnpm install
pnpm dev`}</code>
        </div>
      </Step>

      <Step n={2} title="vite — Vite + React template">
        <p>Scaffolds a Vite + React project pre-wired with:</p>
        <ul style={{ listStyle: "none", padding: 0, margin: "0.75rem 0 1rem 0" }}>
          {[
            "<code>quasify.config.ts</code> with <code>media</code> and <code>shorthands</code>",
            "<code>quasifyVitePlugin()</code> in <code>vite.config.ts</code>",
            "<code>import &apos;virtual:quasify-ui/styles&apos;</code> in the entry file",
            "<code>ThemeProvider</code> wrapping the app in <code>main.tsx</code>",
          ].map((item, i) => (
            <li key={i} style={{ marginBottom: "0.4rem", color: "var(--color-text-2)" }}>
              <span style={{ color: "var(--brand-primary)", marginRight: 8 }}>●</span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
        <div style={codeBlock}>
          <code style={codeBlockInner}>{`quasify create my-vite-app --template vite
cd my-vite-app
npm install
npm run dev`}</code>
        </div>
      </Step>

      <Step n={3} title="expo — Expo SDK 55 template">
        <p>Scaffolds an Expo SDK 55 project pre-wired with:</p>
        <ul style={{ listStyle: "none", padding: 0, margin: "0.75rem 0 1rem 0" }}>
          {[
            "<code>quasify.config.ts</code> with <code>media</code> and <code>shorthands</code>",
            "<code>quasifyMetroTransformer</code> in <code>metro.config.js</code>",
            "<code>ThemeProvider</code> in <code>App.tsx</code>",
            "Compatible with Expo SDK 54 and 56 (see Compatibility guide)",
          ].map((item, i) => (
            <li key={i} style={{ marginBottom: "0.4rem", color: "var(--color-text-2)" }}>
              <span style={{ color: "var(--brand-primary)", marginRight: 8 }}>●</span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
        <div style={codeBlock}>
          <code style={codeBlockInner}>{`quasify create my-expo-app --template expo
cd my-expo-app
yarn install
expo start`}</code>
        </div>
      </Step>

      {/* ── init command ─────────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>init — wire an existing project</h2>
      <p>
        The <code>init</code> command adds Quasify UI wiring to an existing
        project. It detects your framework and package manager automatically,
        then creates any of the following that are absent:
      </p>
      <ul>
        <li>
          <code>quasify.config.ts</code> with <code>createUi</code>,{" "}
          <code>media</code>, and <code>shorthands</code>
        </li>
        <li>
          Compiler/runtime wiring (Vite plugin, Metro transformer, or Next.js
          config)
        </li>
        <li>
          <code>ThemeProvider</code> setup in your entry file
        </li>
      </ul>

      <div style={cmdCard}>
        <div style={cmdCode}>quasify init</div>
        <p style={cmdDesc}>
          Add <code>quasify.config.ts</code>, compiler wiring, and <code>ThemeProvider</code>{" "}
          to an existing project — idempotent and safe to re-run.
        </p>
      </div>

      <Callout type="info">
        <code>init</code> is idempotent — it checks for existing configuration
        and skips anything already set up. Running it on an already-wired
        project is safe and makes no changes.
      </Callout>

      {/* ── add command ──────────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>add — install components</h2>
      <p>
        The <code>add</code> command installs one or more Quasify UI components
        into an existing Next.js, Vite, or Expo project. It:
      </p>
      <ul>
        <li>Detects your framework and package manager</li>
        <li>
          Resolves the full dependency closure (component → its component deps →
          required <code>@quasify-ui/*</code> packages)
        </li>
        <li>
          Installs missing <code>@quasify-ui/*</code> packages
        </li>
        <li>
          Offers to run <code>init</code> if wiring is absent
        </li>
      </ul>

      <div style={cmdCard}>
        <div style={cmdCode}>quasify add &lt;component...&gt;</div>
        <p style={cmdDesc}>
          Install one or more components (with transitive dependencies) into an existing project.
        </p>
      </div>

      <div style={codeBlock}>
        <code style={codeBlockInner}>{`# Install a single component
quasify add button

# Install multiple components at once
quasify add button input card

# Install new components (6 added in v0.4)
quasify add breadcrumb pagination table tag tooltip drawer`}</code>
      </div>

      <Callout type="tip">
        <code>add</code> also resolves transitive component dependencies. For
        example, adding <code>pagination</code> will automatically include{" "}
        <code>button</code> if your project doesn&apos;t already have it.
      </Callout>

      {/* ── Framework detection ──────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>Framework and package manager detection</h2>
      <p>
        The CLI detects your framework from config files and your package
        manager from lockfiles:
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Detection</th>
              <th>Signals</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Next.js", "next.config.(js|ts|mjs), next in dependencies"],
              ["Vite", "vite.config.(js|ts), vite in dependencies"],
              [
                "Expo",
                "app.json / app.config.js with expo key, expo in dependencies",
              ],
              ["pnpm", "pnpm-lock.yaml present"],
              ["yarn", "yarn.lock present"],
              ["npm", "package-lock.json present (fallback)"],
            ].map(([signal, desc]) => (
              <tr key={signal}>
                <td>
                  <code style={{ color: "var(--brand-primary)" }}>{signal}</code>
                </td>
                <td
                  style={{ color: "var(--color-text-2)", fontSize: "0.875rem" }}
                >
                  {desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Command reference ───────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>Command reference</h2>
      {[
        {
          cmd: "quasify create <name> [--template next|vite|expo]",
          desc: "Scaffold a new pre-wired project from a template",
        },
        {
          cmd: "quasify init",
          desc: "Add quasify.config.ts, compiler wiring, and ThemeProvider to an existing project (idempotent)",
        },
        {
          cmd: "quasify add <component...>",
          desc: "Install one or more components (with transitive deps) into an existing project",
        },
      ].map(({ cmd, desc }) => (
        <div key={cmd} style={cmdCard}>
          <div style={cmdCode}>{cmd}</div>
          <p style={cmdDesc}>{desc}</p>
        </div>
      ))}
    </DocPage>
  );
}
