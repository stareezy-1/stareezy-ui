import type { Metadata } from "next";
import { DocPage, Callout } from "../../../components/DocPage";
import { StorybookCard } from "./StorybookCard";

export const metadata: Metadata = {
  title: "Component API — Stareezy UI",
  description: "API reference for all Stareezy UI components.",
};

const PRIMITIVES = [
  "Box",
  "View",
  "Text",
  "HStack",
  "VStack",
  "TouchableOpacity",
];

const COMPONENTS = [
  {
    name: "Accordion",
    desc: "Collapsible content sections with smooth animation.",
    icon: "⊞",
    color: "#024CCE",
    bg: "#E6EDFA",
  },
  {
    name: "Avatar",
    desc: "User avatar with image, initials fallback, and status indicator.",
    icon: "◉",
    color: "#0C9182",
    bg: "#E7FDFA",
  },
  {
    name: "Button",
    desc: "Cross-platform button with 12 variants, 5 sizes, loading and disabled states.",
    icon: "⬡",
    color: "#4D8D01",
    bg: "#F3FFE3",
  },
  {
    name: "Checkbox",
    desc: "Animated checkbox with indeterminate state and label support.",
    icon: "☑",
    color: "#C98B25",
    bg: "#FEF4E2",
  },
  {
    name: "CircularProgress",
    desc: "SVG-based circular progress with animated stroke-dashoffset.",
    icon: "◎",
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
  {
    name: "Clipboard",
    desc: "Copy-to-clipboard with visual feedback and monospace display.",
    icon: "⎘",
    color: "#0369a1",
    bg: "#e0f2fe",
  },
  {
    name: "Divider",
    desc: "Horizontal or vertical separator with optional label.",
    icon: "─",
    color: "#64748b",
    bg: "#f1f5f9",
  },
  {
    name: "Dropdown",
    desc: "Select with search, option groups, and multi-select.",
    icon: "▾",
    color: "#C20219",
    bg: "#FFE9EC",
  },
  {
    name: "Input",
    desc: "Text input with focus ring, error state, icons, and prefix slots.",
    icon: "⌨",
    color: "#024CCE",
    bg: "#E6EDFA",
  },
  {
    name: "Modal",
    desc: "Overlay dialog with backdrop blur, smooth animation, and size variants.",
    icon: "⬜",
    color: "#5D2555",
    bg: "#F9DEDE",
  },
  {
    name: "Progress",
    desc: "Linear progress bar with label, percentage, gradient, and striped variants.",
    icon: "▬",
    color: "#4D8D01",
    bg: "#F3FFE3",
  },
  {
    name: "Resizer",
    desc: "Resizable container with drag handle — horizontal, vertical, or both.",
    icon: "⤡",
    color: "#C98B25",
    bg: "#FEF4E2",
  },
  {
    name: "Skeleton",
    desc: "Shimmer loading placeholder — text, circular, rectangular, rounded.",
    icon: "▭",
    color: "#64748b",
    bg: "#f1f5f9",
  },
  {
    name: "Slider",
    desc: "Range input with custom styling, marks, and value display.",
    icon: "⊸",
    color: "#0C9182",
    bg: "#E7FDFA",
  },
  {
    name: "Spinner",
    desc: "Animated loading indicator — ring, dots, and pulse variants.",
    icon: "↻",
    color: "#024CCE",
    bg: "#E6EDFA",
  },
  {
    name: "Switch",
    desc: "Animated toggle switch with label and size variants.",
    icon: "⊙",
    color: "#4D8D01",
    bg: "#F3FFE3",
  },
  {
    name: "Tabs",
    desc: "Tab navigation with animated indicator — underline, pills, and card variants.",
    icon: "⊟",
    color: "#C20219",
    bg: "#FFE9EC",
  },
];

const BOX_PROPS = [
  "bg",
  "color",
  "p",
  "px",
  "py",
  "pt",
  "pb",
  "m",
  "mx",
  "my",
  "mt",
  "mb",
  "rounded",
  "borderWidth",
  "borderColor",
  "width",
  "height",
  "flex",
  "flexDirection",
  "alignItems",
  "justifyContent",
  "gap",
  "opacity",
  "position",
  "zIndex",
  "overflow",
];

export default function ComponentsPage() {
  return (
    <DocPage
      title="Component API"
      description="17 beautiful, cross-platform components built on the Stareezy UI token system. Every component accepts BoxProps for layout and spacing."
      badge="Reference"
      icon="⬡"
      badgeColor="#0C9182"
    >
      <Callout type="info">
        All components are exported from <code>@stareezy-ui/components</code>{" "}
        and work on both web and React Native with the same API. Every component
        extends <code>BoxProps</code> — pass token shorthand props directly to
        the root container.
      </Callout>

      {/* ── BoxProps ─────────────────────────────────────────────────────── */}
      <h2>BoxProps — universal style system</h2>
      <p
        style={{
          color: "var(--color-text-2)",
          fontSize: "0.9rem",
          marginBottom: "1rem",
        }}
      >
        Every component accepts these token-typed shorthand props on its root
        container. Values can be raw numbers, strings, or{" "}
        <code>Token&lt;T&gt;</code> objects from{" "}
        <code>@stareezy-ui/tokens</code>.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginBottom: "2rem",
        }}
      >
        {BOX_PROPS.map((p) => (
          <code
            key={p}
            style={{
              fontSize: "0.75rem",
              background: "var(--brand-50)",
              color: "var(--brand-600)",
              padding: "2px 8px",
              borderRadius: 5,
              border: "1px solid var(--brand-100)",
            }}
          >
            {p}
          </code>
        ))}
      </div>

      {/* ── Primitives ───────────────────────────────────────────────────── */}
      <h2>Primitives</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginBottom: "2rem",
        }}
      >
        {PRIMITIVES.map((c) => (
          <code
            key={c}
            style={{
              fontSize: "0.78rem",
              background: "var(--color-surface)",
              color: "var(--color-text-2)",
              padding: "3px 10px",
              borderRadius: 6,
              border: "1px solid var(--color-border-2)",
            }}
          >
            {c}
          </code>
        ))}
      </div>

      {/* ── Component grid ───────────────────────────────────────────────── */}
      <h2>Components</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {COMPONENTS.map((c) => (
          <div
            key={c.name}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border-2)",
              borderRadius: 14,
              padding: "1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "0.6rem",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: c.bg,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  color: c.color,
                  fontWeight: 700,
                }}
              >
                {c.icon}
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--color-text)",
                }}
              >
                {c.name}
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.82rem",
                color: "var(--color-text-2)",
                lineHeight: 1.55,
              }}
            >
              {c.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── Usage example ────────────────────────────────────────────────── */}
      <h2>Usage example</h2>
      <pre>
        <code>{`import {
  Box, Text, Button, Input, Accordion,
  Avatar, Checkbox, CircularProgress, Clipboard,
  Divider, Dropdown, Modal, Progress, Resizer,
  Skeleton, Slider, Spinner, Switch, Tabs,
} from '@stareezy-ui/components'
import { colors, spacing, radius } from '@stareezy-ui/tokens'

// Every component accepts BoxProps
<Spinner size="md" p={8} bg={colors.beauBlue[50]} rounded={radius.md} />
<Progress value={72} showPercentage label="Upload" mx={16} />
<Avatar name="Bintang R" size="lg" status="online" mr={8} />
<Checkbox checked label="Accept terms" p={12} />`}</code>
      </pre>

      <Callout type="tip">
        Open Storybook to explore all component variants interactively with live
        controls, dark mode toggle, and auto-generated prop tables.
      </Callout>

      <StorybookCard />
    </DocPage>
  );
}
