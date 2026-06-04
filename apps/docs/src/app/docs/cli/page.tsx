import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "@stareezy-ui/cli",
  description:
    "First-party CLI for scaffolding new Stareezy UI projects and adding components to existing Next.js, Vite, and Expo apps.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/cli" },
};

export default function CliPage() {
  return (
    <DocPage
      title="@stareezy-ui/cli"
      description="Scaffold new projects and add components with a single command — no manual wiring of createUi, the compiler, the runtime, or ThemeProvider."
      badge="CLI"
      icon="▶"
      badgeColor="#C98B25"
    >
      <h2>Installation</h2>
      <pre>
        <code>{`# Use directly with npx (no install required)
npx stareezy create my-app

# Or install globally
npm install -g @stareezy-ui/cli
stareezy create my-app`}</code>
      </pre>

      {/* ── create command ───────────────────────────────────────────────── */}
      <h2>create — scaffold a new project</h2>
      <p>
        The <code>create</code> command scaffolds a new project from one of the
        three pre-wired templates. Each template ships with{" "}
        <code>stareezy.config.ts</code>, compiler wiring, a configured{" "}
        <code>ThemeProvider</code>, and a curated set of components — ready to
        run without any additional setup.
      </p>
      <pre>
        <code>{`stareezy create my-app --template next   # Next.js 14 App Router
stareezy create my-app --template vite   # Vite + React
stareezy create my-app --template expo   # Expo SDK 55`}</code>
      </pre>
      <p>
        If you omit <code>--template</code>, the CLI prompts you to choose:
      </p>
      <pre>
        <code>{`$ stareezy create my-app

? Select a template:
  ❯ next   — Next.js 14 App Router
    vite   — Vite + React
    expo   — Expo SDK 55`}</code>
      </pre>

      <Step n={1} title="next — Next.js App Router template">
        <p>Scaffolds a Next.js 14 App Router project pre-wired with:</p>
        <ul>
          <li>
            <code>stareezy.config.ts</code> with <code>media</code> breakpoints
            and <code>shorthands</code>
          </li>
          <li>
            <code>@stareezy-ui/compiler</code> Vite plugin in{" "}
            <code>next.config.ts</code>
          </li>
          <li>
            Server primitives imported from <code>&quot;./server&quot;</code>
          </li>
          <li>
            Interactive components wrapped in a{" "}
            <code>&quot;use client&quot;</code> boundary
          </li>
          <li>
            <code>ThemeProvider</code> in a client <code>Providers</code>{" "}
            component
          </li>
        </ul>
        <pre>
          <code>{`stareezy create my-next-app --template next
cd my-next-app
pnpm install
pnpm dev`}</code>
        </pre>
      </Step>

      <Step n={2} title="vite — Vite + React template">
        <p>Scaffolds a Vite + React project pre-wired with:</p>
        <ul>
          <li>
            <code>stareezy.config.ts</code> with <code>media</code> and{" "}
            <code>shorthands</code>
          </li>
          <li>
            <code>stareezyVitePlugin()</code> in <code>vite.config.ts</code>
          </li>
          <li>
            <code>import &apos;virtual:stareezy-ui/styles&apos;</code> in the
            entry file
          </li>
          <li>
            <code>ThemeProvider</code> wrapping the app in <code>main.tsx</code>
          </li>
        </ul>
        <pre>
          <code>{`stareezy create my-vite-app --template vite
cd my-vite-app
npm install
npm run dev`}</code>
        </pre>
      </Step>

      <Step n={3} title="expo — Expo SDK 55 template">
        <p>Scaffolds an Expo SDK 55 project pre-wired with:</p>
        <ul>
          <li>
            <code>stareezy.config.ts</code> with <code>media</code> and{" "}
            <code>shorthands</code>
          </li>
          <li>
            <code>stareezyMetroTransformer</code> in{" "}
            <code>metro.config.js</code>
          </li>
          <li>
            <code>ThemeProvider</code> in <code>App.tsx</code>
          </li>
          <li>Compatible with Expo SDK 54 and 56 (see Compatibility guide)</li>
        </ul>
        <pre>
          <code>{`stareezy create my-expo-app --template expo
cd my-expo-app
yarn install
expo start`}</code>
        </pre>
      </Step>

      {/* ── init command ─────────────────────────────────────────────────── */}
      <h2>init — wire an existing project</h2>
      <p>
        The <code>init</code> command adds Stareezy UI wiring to an existing
        project. It detects your framework and package manager automatically,
        then creates any of the following that are absent:
      </p>
      <ul>
        <li>
          <code>stareezy.config.ts</code> with <code>createUi</code>,{" "}
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
      <pre>
        <code>{`# Run from your project root
stareezy init`}</code>
      </pre>

      <Callout type="info">
        <code>init</code> is idempotent — it checks for existing configuration
        and skips anything already set up. Running it on an already-wired
        project is safe and makes no changes.
      </Callout>

      {/* ── add command ──────────────────────────────────────────────────── */}
      <h2>add — install components</h2>
      <p>
        The <code>add</code> command installs one or more Stareezy UI components
        into an existing Next.js, Vite, or Expo project. It:
      </p>
      <ul>
        <li>Detects your framework and package manager</li>
        <li>
          Resolves the full dependency closure (component → its component deps →
          required <code>@stareezy-ui/*</code> packages)
        </li>
        <li>
          Installs missing <code>@stareezy-ui/*</code> packages
        </li>
        <li>
          Offers to run <code>init</code> if wiring is absent
        </li>
      </ul>
      <pre>
        <code>{`# Install a single component
stareezy add button

# Install multiple components at once
stareezy add button input card

# Install new components (6 added in v0.4)
stareezy add breadcrumb pagination table tag tooltip drawer`}</code>
      </pre>

      <Callout type="tip">
        <code>add</code> also resolves transitive component dependencies. For
        example, adding <code>pagination</code> will automatically include{" "}
        <code>button</code> if your project doesn&apos;t already have it.
      </Callout>

      {/* ── Framework detection ──────────────────────────────────────────── */}
      <h2>Framework and package manager detection</h2>
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
                  <code>{signal}</code>
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

      {/* ── What each command does ───────────────────────────────────────── */}
      <h2>Command reference</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Command</th>
              <th>What it does</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "stareezy create <name> [--template next|vite|expo]",
                "Scaffold a new pre-wired project from a template",
              ],
              [
                "stareezy init",
                "Add stareezy.config.ts, compiler wiring, and ThemeProvider to an existing project (idempotent)",
              ],
              [
                "stareezy add <component...>",
                "Install one or more components (with transitive deps) into an existing project",
              ],
            ].map(([cmd, desc]) => (
              <tr key={cmd}>
                <td>
                  <code style={{ fontSize: "0.78em", whiteSpace: "nowrap" }}>
                    {cmd}
                  </code>
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
    </DocPage>
  );
}
