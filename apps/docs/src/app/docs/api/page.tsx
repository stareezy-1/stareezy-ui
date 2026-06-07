import type { Metadata } from "next";
import { DocPage, Callout } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "API Reference",
  description:
    "Per-package API reference for all @quasify-ui/* packages — exported types, functions, hooks, and components.",
  alternates: { canonical: "https://ui.quasify.app/docs/api" },
};

interface ApiEntry {
  name: string;
  kind: "type" | "function" | "hook" | "component" | "constant" | "class";
  desc: string;
}

const TOKENS_EXPORTS: ApiEntry[] = [
  {
    name: "createUi(config)",
    kind: "function",
    desc: "Configuration factory. Returns a typed UiConfig with t, tokens, shorthands, breakpoints, and helper methods.",
  },
  {
    name: "token(value, id?)",
    kind: "function",
    desc: "Create a typed Token<T> object. Used to define custom token values.",
  },
  {
    name: "t",
    kind: "constant",
    desc: "Global ThemeToken accessor. Access semantic color slots (t.text.primary, t.backgrounds.primary, etc.).",
  },
  {
    name: "themes",
    kind: "constant",
    desc: "Built-in theme maps: themes.aurora, themes.dark, themes.light, themes['steins-gate'], themes.quasar.",
  },
  {
    name: "colors",
    kind: "constant",
    desc: "Color palette tokens. Access via colors.celurenBlue[500].value.",
  },
  {
    name: "spacing",
    kind: "constant",
    desc: "Spacing scale tokens. Access via spacing[4].value.",
  },
  {
    name: "radius",
    kind: "constant",
    desc: "Border radius tokens. Access via radius.md.value.",
  },
  {
    name: "typography",
    kind: "constant",
    desc: "Typography scale tokens for font sizes, weights, and line heights.",
  },
  {
    name: "motion",
    kind: "constant",
    desc: "Animation tokens for duration, easing, and delay values.",
  },
  {
    name: "ThemeProvider",
    kind: "component",
    desc: '"use client" provider that supplies the active theme to all descendant components.',
  },
  {
    name: "useTheme()",
    kind: "hook",
    desc: "Returns the full resolved theme object for the nearest ThemeProvider.",
  },
  {
    name: "useThemeSwitch()",
    kind: "hook",
    desc: "Returns { theme, setTheme, toggleTheme, isDark } for controlling the active theme.",
  },
  {
    name: "useThemeTokens()",
    kind: "hook",
    desc: "Returns the raw ThemeTokenMap (same as useTheme but returns token objects, not values).",
  },
  {
    name: "Token<T>",
    kind: "type",
    desc: "The base token type: { __token: true, value: T, id?: string }.",
  },
  {
    name: "ThemeToken",
    kind: "type",
    desc: "A theme-reactive token reference — resolves at render time via the Theme_Accessor.",
  },
  {
    name: "QuasifyCustomConfig",
    kind: "type",
    desc: "Module-augmentation interface. Extend with typeof ui to inject custom media/shorthands into the type system.",
  },
  {
    name: "ConfigBreakpointKey",
    kind: "type",
    desc: "The derived BreakpointKey union — 'base' plus your declared media keys (or defaults if unaugmented).",
  },
  {
    name: "DefaultBreakpointKey",
    kind: "type",
    desc: '"base" | "sm" | "md" | "lg" | "xl" | "2xl" — the fallback when QuasifyCustomConfig is unaugmented.',
  },
  {
    name: "Responsive<T>",
    kind: "type",
    desc: "T | Partial<Record<BreakpointKey, T>> — the union type for responsive prop values.",
  },
  {
    name: "MediaConfig",
    kind: "type",
    desc: "Record<string, number> — breakpoint name to min-width pixel mapping.",
  },
];

const COMPONENTS_EXPORTS: ApiEntry[] = [
  {
    name: "Box",
    kind: "component",
    desc: "The core layout and styling primitive. Accepts BoxProps including responsive layout and shorthand props.",
  },
  {
    name: "View",
    kind: "component",
    desc: "Alias for Box with React Native semantics.",
  },
  {
    name: "Stack",
    kind: "component",
    desc: "Flex column container — convenience wrapper around Box.",
  },
  {
    name: "HStack",
    kind: "component",
    desc: "Flex row container with gap support.",
  },
  {
    name: "VStack",
    kind: "component",
    desc: "Flex column container with gap support.",
  },
  {
    name: "Text",
    kind: "component",
    desc: "Theme-reactive text primitive with typography token support.",
  },
  {
    name: "Divider",
    kind: "component",
    desc: "Horizontal or vertical separator with optional label.",
  },
  {
    name: "Button",
    kind: "component",
    desc: "Cross-platform button — 12 variants, 5 sizes, loading and disabled states.",
  },
  {
    name: "Input",
    kind: "component",
    desc: "Text input with focus ring, error state, icons, and prefix/suffix slots.",
  },
  {
    name: "Accordion",
    kind: "component",
    desc: "Collapsible content sections with smooth animation.",
  },
  {
    name: "Avatar",
    kind: "component",
    desc: "User avatar with image, initials fallback, and status indicator.",
  },
  {
    name: "Badge",
    kind: "component",
    desc: "Status badge with variants and size options.",
  },
  {
    name: "Breadcrumb",
    kind: "component",
    desc: "Hierarchical navigation trail with separator customization.",
  },
  {
    name: "Checkbox",
    kind: "component",
    desc: "Animated checkbox with indeterminate state and label.",
  },
  {
    name: "CircularProgress",
    kind: "component",
    desc: "SVG circular progress with animated stroke-dashoffset.",
  },
  {
    name: "Clipboard",
    kind: "component",
    desc: "Copy-to-clipboard with visual feedback.",
  },
  {
    name: "Dropdown",
    kind: "component",
    desc: "Select with search, option groups, and multi-select.",
  },
  {
    name: "Drawer",
    kind: "component",
    desc: "Side-panel overlay with placement variants and focus trap.",
  },
  {
    name: "Modal",
    kind: "component",
    desc: "Overlay dialog with backdrop blur and size variants.",
  },
  {
    name: "NavBar",
    kind: "component",
    desc: "Top navigation bar with left/center/right slot layout.",
  },
  {
    name: "Pagination",
    kind: "component",
    desc: "Page navigation with smart range display and keyboard support.",
  },
  {
    name: "Progress",
    kind: "component",
    desc: "Linear progress bar with label, percentage, and gradient variants.",
  },
  {
    name: "ProgressPanel",
    kind: "component",
    desc: "Multi-step progress panel with labeled steps.",
  },
  {
    name: "Resizer",
    kind: "component",
    desc: "Resizable container with drag handle.",
  },
  {
    name: "Skeleton",
    kind: "component",
    desc: "Shimmer loading placeholder in text, circular, and rectangular variants.",
  },
  {
    name: "Slider",
    kind: "component",
    desc: "Range input with custom styling and value display.",
  },
  {
    name: "Spinner",
    kind: "component",
    desc: "Animated loading indicator — ring, dots, and pulse variants.",
  },
  {
    name: "Switch",
    kind: "component",
    desc: "Animated toggle switch with label and size variants.",
  },
  {
    name: "Table",
    kind: "component",
    desc: "Data table with sortable columns, striped rows, and sticky header.",
  },
  {
    name: "Tabs",
    kind: "component",
    desc: "Tab navigation with animated indicator — underline, pills, and card variants.",
  },
  {
    name: "Tag",
    kind: "component",
    desc: "Compact label chip with variants and removable support.",
  },
  {
    name: "Tooltip",
    kind: "component",
    desc: "Contextual hint overlay with placement and delay options.",
  },
  {
    name: "CommandPalette",
    kind: "component",
    desc: "Keyboard-driven command search palette.",
  },
  {
    name: "BoxLayoutProps",
    kind: "type",
    desc: "Shared layout prop type extended by every component — spacing, sizing, flex, custom shorthands, $-props.",
  },
  {
    name: "extractBoxLayoutProps(props)",
    kind: "function",
    desc: "Splits BoxLayoutProps from component-specific props. Returns { layout, rest }.",
  },
  {
    name: "useThemedColors()",
    kind: "hook",
    desc: "Returns the active theme's resolved color values. Use in component render to be Theme_Reactive.",
  },
];

const SERVER_EXPORTS: ApiEntry[] = [
  {
    name: "Box",
    kind: "component",
    desc: "Server-safe Box — resolves tokens via CSS custom properties, no hooks.",
  },
  { name: "View", kind: "component", desc: "Server-safe View." },
  { name: "Stack", kind: "component", desc: "Server-safe Stack." },
  { name: "Text", kind: "component", desc: "Server-safe Text." },
  { name: "Divider", kind: "component", desc: "Server-safe Divider." },
];

const COMPILER_EXPORTS: ApiEntry[] = [
  {
    name: "quasifyVitePlugin(options?)",
    kind: "function",
    desc: "Vite plugin — emits the virtual:quasify-ui/styles module. Reads quasify.config.ts automatically.",
  },
  {
    name: "quasifyBabelPlugin(options?)",
    kind: "function",
    desc: "Babel plugin — transforms token prop values to atomic CSS class names at build time.",
  },
  {
    name: "quasifyMetroTransformer",
    kind: "constant",
    desc: "Metro transformer for React Native / Expo. Point babelTransformerPath at this module.",
  },
];

const CLI_EXPORTS: ApiEntry[] = [
  {
    name: "create <name> [--template]",
    kind: "function",
    desc: "Scaffold a new pre-wired project (next | vite | expo).",
  },
  {
    name: "init",
    kind: "function",
    desc: "Add quasify.config.ts, compiler wiring, and ThemeProvider to an existing project (idempotent).",
  },
  {
    name: "add <component...>",
    kind: "function",
    desc: "Install one or more components with transitive dependency resolution.",
  },
];

const KIND_COLORS: Record<ApiEntry["kind"], { bg: string; color: string }> = {
  type: { bg: "#f5f3ff", color: "#7c3aed" },
  function: { bg: "#e0f2fe", color: "#0369a1" },
  hook: { bg: "#fef4e2", color: "#c98b25" },
  component: { bg: "#e7fdfa", color: "#0c9182" },
  constant: { bg: "#f3ffe3", color: "#4d8d01" },
  class: { bg: "#ffe9ec", color: "#c20219" },
};

function ApiTable({ entries }: { entries: ApiEntry[] }) {
  return (
    <div style={{ overflowX: "auto", margin: "0.75rem 0 2rem" }}>
      <table style={{ borderTop: "2px solid var(--brand-primary)" }}>
        <thead>
          <tr>
            <th>Export</th>
            <th>Kind</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => {
            const c = KIND_COLORS[e.kind];
            return (
              <tr key={e.name}>
                <td>
                  <code style={{ fontSize: "0.8em", color: "var(--brand-500)" }}>
                    {e.name}
                  </code>
                </td>
                <td>
                  <span
                    style={{
                      background: c.bg,
                      color: c.color,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "2px 7px",
                      borderRadius: 4,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {e.kind}
                  </span>
                </td>
                <td
                  style={{ color: "var(--color-text-2)", fontSize: "0.875rem" }}
                >
                  {e.desc}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function ApiPage() {
  return (
    <DocPage
      title="API Reference"
      description="Exported symbols from every @quasify-ui/* package — types, functions, hooks, and components."
      badge="Reference"
      icon="◉"
      badgeColor="#ff6a1a"
    >
      <Callout type="info">
        All packages are written in TypeScript with strict mode. Type
        definitions are bundled in each package&apos;s <code>dist/</code> output
        — no separate <code>@types/*</code> packages are needed.
      </Callout>

      {/* ── @quasify-ui/tokens ─────────────────────────────────────────── */}
      <h2 className="gradient-text">@quasify-ui/tokens</h2>
      <p>
        Zero-dependency token definitions and the <code>createUi()</code>{" "}
        configuration factory. This package builds first in the dependency
        chain.
      </p>
      <pre style={{ border: "1px solid var(--color-border)" }}>
        <code>{`import { createUi, t, token, colors, spacing, radius, themes } from '@quasify-ui/tokens'`}</code>
      </pre>
      <ApiTable entries={TOKENS_EXPORTS} />

      {/* ── @quasify-ui/components ─────────────────────────────────────── */}
      <h2 className="gradient-text">@quasify-ui/components</h2>
      <p>
        31 cross-platform UI components (26 existing + 6 new in v0.4) plus
        layout primitives and shared types.
      </p>
      <pre style={{ border: "1px solid var(--color-border)" }}>
        <code>{`import { Box, Button, Input, Modal, Breadcrumb, Drawer } from '@quasify-ui/components'
// RSC-safe primitives:
import { Box, Stack, Text } from '@quasify-ui/components/server'`}</code>
      </pre>
      <ApiTable entries={COMPONENTS_EXPORTS} />

      {/* ── @quasify-ui/components/server ──────────────────────────────── */}
      <h2 className="gradient-text">@quasify-ui/components/server</h2>
      <p>
        Hook-free, RSC-safe primitives. Safe to use in Next.js App Router Server
        Components without a <code>&quot;use client&quot;</code> boundary.
      </p>
      <ApiTable entries={SERVER_EXPORTS} />

      {/* ── @quasify-ui/compiler ───────────────────────────────────────── */}
      <h2 className="gradient-text">@quasify-ui/compiler</h2>
      <p>
        Build-time transforms for Vite, Babel, and Metro. Reads{" "}
        <code>quasify.config.ts</code> automatically.
      </p>
      <pre style={{ border: "1px solid var(--color-border)" }}>
        <code>{`import { quasifyVitePlugin } from '@quasify-ui/compiler'
const { quasifyBabelPlugin } = require('@quasify-ui/compiler')
// Metro: require.resolve('@quasify-ui/compiler/metro')`}</code>
      </pre>
      <ApiTable entries={COMPILER_EXPORTS} />

      {/* ── @quasify-ui/cli ────────────────────────────────────────────── */}
      <h2 className="gradient-text">@quasify-ui/cli</h2>
      <p>
        First-party scaffolding CLI. Invoke via <code>npx Quasify</code> or
        install globally as <code>@quasify-ui/cli</code>.
      </p>
      <pre style={{ border: "1px solid var(--color-border)" }}>
        <code>{`npx quasify create my-app --template next
npx quasify init
npx quasify add button input card`}</code>
      </pre>
      <ApiTable entries={CLI_EXPORTS} />

      {/* ── @quasify-ui/runtime ────────────────────────────────────────── */}
      <h2 className="gradient-text">@quasify-ui/runtime</h2>
      <p>
        O(1) style registry with web and React Native adapters. Used internally
        by the Components_Package — not typically imported directly.
      </p>
      <pre style={{ border: "1px solid var(--color-border)" }}>
        <code>{`import { configureBreakpoints, getBreakpoints, applyRuntimeBreakpoints } from '@quasify-ui/runtime'`}</code>
      </pre>

      {/* ── @quasify-ui/core ───────────────────────────────────────────── */}
      <h2 className="gradient-text">@quasify-ui/core</h2>
      <p>
        Utilities, platform helpers, and hooks shared across packages. Used
        internally — only import from this package if you are building on top of
        Quasify-ui internals.
      </p>

      {/* ── @quasify-ui/stylesheet ─────────────────────────────────────── */}
      <h2 className="gradient-text">@quasify-ui/stylesheet</h2>
      <p>
        Atomic CSS sheet management using <code>@stitches/core</code> under the
        hood. Used internally by the runtime. Not imported directly in
        application code.
      </p>
    </DocPage>
  );
}
