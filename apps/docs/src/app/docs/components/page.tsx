"use client";

import { useState } from "react";
import { DocPage, Callout, PropRow } from "../../../components/DocPage";
import { StorybookCard } from "./StorybookCard";

const COMPONENTS = [
  {
    name: "Button",
    desc: "Cross-platform button with 12 variants, 5 sizes, loading and disabled states.",
    icon: "⬡",
    color: "#ff6a1a",
    preview: "interactive",
    props: [
      {
        name: "text",
        type: "string",
        desc: "Button label text",
        required: true,
      },
      {
        name: "type",
        type: "'Primary' | 'Secondary' | 'Ghost' | 'Danger' | 'Outline'",
        desc: "Visual variant",
      },
      {
        name: "size",
        type: "'SM' | 'MD' | 'LG' | 'XL' | 'XXL'",
        desc: "Button size",
      },
      { name: "loading", type: "boolean", desc: "Show loading spinner" },
      { name: "disabled", type: "boolean", desc: "Disable interaction" },
      {
        name: "fullWidth",
        type: "boolean",
        desc: "Stretch to container width",
      },
      { name: "leftIcon", type: "ReactNode", desc: "Icon before text" },
      { name: "rightIcon", type: "ReactNode", desc: "Icon after text" },
      { name: "onPress", type: "() => void", desc: "Press handler" },
    ],
    code: `<Button type="Primary" text="Click Me" size="LG" />
<Button type="Secondary" text="Cancel" size="MD" />
<Button type="Ghost" text="Learn More" size="SM" />
<Button type="Danger" text="Delete" size="MD" loading />`,
  },
  {
    name: "Input",
    desc: "Text input with focus ring, error state, icons, and prefix slots.",
    icon: "⌨",
    color: "#22c55e",
    preview: "static",
    props: [
      { name: "label", type: "string", desc: "Input label text" },
      { name: "placeholder", type: "string", desc: "Placeholder text" },
      {
        name: "type",
        type: "'default' | 'password' | 'email' | 'numeric'",
        desc: "Input type",
      },
      { name: "size", type: "'SM' | 'MD' | 'LG'", desc: "Input size" },
      { name: "isDisabled", type: "boolean", desc: "Disable input" },
      {
        name: "errorMessage",
        type: "string",
        desc: "Show error state with message",
      },
      { name: "leftIcon", type: "ReactNode", desc: "Icon on the left" },
      { name: "rightIcon", type: "ReactNode", desc: "Icon on the right" },
      {
        name: "onChangeText",
        type: "(text: string) => void",
        desc: "Text change handler",
      },
    ],
    code: `<Input label="Email" placeholder="you@example.com" size="MD" />
<Input label="Password" placeholder="••••••••" type="password" />
<Input label="With Error" errorMessage="Invalid input" />
<Input label="With Icon" leftIcon={<span>🔍</span>} />`,
  },
  {
    name: "Card",
    desc: "Container card with variants and optional glow colors.",
    icon: "⬜",
    color: "#dc143c",
    preview: "static",
    props: [
      {
        name: "variant",
        type: "'border' | 'elevated' | 'filled'",
        desc: "Card visual style",
      },
      {
        name: "glowColor",
        type: "'green' | 'blue' | 'purple' | 'orange'",
        desc: "Glow accent color",
      },
      { name: "title", type: "string", desc: "Card title text" },
      { name: "description", type: "string", desc: "Card description text" },
    ],
    code: `<Card variant="border" title="Design Tokens">
  <Text>300+ typed tokens</Text>
</Card>
<Card variant="elevated" glowColor="orange">
  <Text>Elevated card with glow</Text>
</Card>`,
  },
  {
    name: "Switch",
    desc: "Animated toggle switch with label and size variants.",
    icon: "⊙",
    color: "#f5a623",
    preview: "interactive",
    props: [
      { name: "checked", type: "boolean", desc: "Toggle state" },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        desc: "Change handler",
      },
      { name: "size", type: "'SM' | 'MD' | 'LG'", desc: "Switch size" },
      { name: "label", type: "string", desc: "Label text" },
      { name: "disabled", type: "boolean", desc: "Disable toggle" },
    ],
    code: `<Switch checked label="Enable notifications" />
<Switch checked={false} label="Dark mode" size="MD" />
<Switch checked label="Disabled" disabled />`,
  },
  {
    name: "Accordion",
    desc: "Collapsible content sections with smooth animation.",
    icon: "⊞",
    color: "#a78bfa",
    preview: "static",
    props: [
      {
        name: "items",
        type: "AccordionItem[]",
        desc: "Array of items with title/content",
      },
      { name: "variant", type: "'default' | 'bordered'", desc: "Visual style" },
    ],
    code: `<Accordion
  items={[
    { title: "Design Tokens", content: "300+ tokens" },
    { title: "Components", content: "31+ components" },
  ]}
/>`,
  },
  {
    name: "Modal",
    desc: "Overlay dialog with backdrop blur, smooth animation, and size variants.",
    icon: "⬜",
    color: "#dc143c",
    preview: "static",
    props: [
      {
        name: "open",
        type: "boolean",
        desc: "Show/hide modal",
        required: true,
      },
      {
        name: "onClose",
        type: "() => void",
        desc: "Close handler",
        required: true,
      },
      {
        name: "size",
        type: "'SM' | 'MD' | 'LG' | 'fullscreen'",
        desc: "Modal size",
      },
      { name: "title", type: "string", desc: "Modal title" },
    ],
    code: `<Modal open={isOpen} onClose={() => setOpen(false)} title="Confirm">
  <Text>Are you sure?</Text>
  <Button text="Confirm" onPress={handleConfirm} />
</Modal>`,
  },
  {
    name: "Tabs",
    desc: "Tab navigation with animated indicator — underline, pills, and card variants.",
    icon: "⊟",
    color: "#ff6a1a",
    preview: "static",
    props: [
      { name: "tabs", type: "TabItem[]", desc: "Array of tab definitions" },
      { name: "activeTab", type: "string", desc: "Currently active tab key" },
      {
        name: "onChange",
        type: "(key: string) => void",
        desc: "Tab change handler",
      },
      {
        name: "variant",
        type: "'underline' | 'pills' | 'card'",
        desc: "Tab style variant",
      },
    ],
    code: `<Tabs
  tabs={[
    { key: 'design', label: 'Design' },
    { key: 'code', label: 'Code' },
    { key: 'preview', label: 'Preview' },
  ]}
  activeTab="design"
  variant="underline"
/>`,
  },
  {
    name: "Checkbox",
    desc: "Animated checkbox with indeterminate state and label support.",
    icon: "☑",
    color: "#22c55e",
    preview: "interactive",
    props: [
      { name: "checked", type: "boolean", desc: "Check state" },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        desc: "Change handler",
      },
      { name: "label", type: "string", desc: "Label text" },
      { name: "indeterminate", type: "boolean", desc: "Indeterminate state" },
      { name: "disabled", type: "boolean", desc: "Disable interaction" },
    ],
    code: `<Checkbox checked label="Accept terms" />
<Checkbox indeterminate label="Select all" />
<Checkbox checked={false} label="Option" />`,
  },
  {
    name: "Slider",
    desc: "Range input with custom styling, marks, and value display.",
    icon: "⊸",
    color: "#f5a623",
    preview: "static",
    props: [
      { name: "value", type: "number", desc: "Current value" },
      {
        name: "onChange",
        type: "(value: number) => void",
        desc: "Value change handler",
      },
      { name: "min", type: "number", desc: "Minimum value (default: 0)" },
      { name: "max", type: "number", desc: "Maximum value (default: 100)" },
      { name: "step", type: "number", desc: "Step increment" },
      { name: "marks", type: "SliderMark[]", desc: "Tick marks" },
    ],
    code: `<Slider value={50} min={0} max={100} />
<Slider value={75} marks={[0, 25, 50, 75, 100]} />`,
  },
  {
    name: "Spinner",
    desc: "Animated loading indicator — ring, dots, and pulse variants.",
    icon: "↻",
    color: "#a78bfa",
    preview: "static",
    props: [
      { name: "size", type: "'SM' | 'MD' | 'LG' | 'XL'", desc: "Spinner size" },
      {
        name: "variant",
        type: "'ring' | 'dots' | 'pulse'",
        desc: "Animation style",
      },
      { name: "color", type: "string", desc: "Custom color" },
    ],
    code: `<Spinner size="MD" variant="ring" />
<Spinner size="LG" variant="dots" color="#ff6a1a" />
<Spinner size="SM" variant="pulse" />`,
  },
  {
    name: "Avatar",
    desc: "User avatar with image, initials fallback, and status indicator.",
    icon: "◉",
    color: "#22c55e",
    preview: "static",
    props: [
      {
        name: "name",
        type: "string",
        desc: "User name (for initials)",
        required: true,
      },
      { name: "image", type: "string", desc: "Image URL" },
      { name: "size", type: "'SM' | 'MD' | 'LG' | 'XL'", desc: "Avatar size" },
      { name: "shape", type: "'circle' | 'rounded'", desc: "Avatar shape" },
      {
        name: "status",
        type: "'online' | 'offline' | 'busy' | 'away'",
        desc: "Status indicator",
      },
    ],
    code: `<Avatar name="Sarah Chen" size="LG" status="online" />
<Avatar name="John Doe" image="/avatar.jpg" size="MD" />
<Avatar name="AI" size="SM" shape="rounded" />`,
  },
  {
    name: "Divider",
    desc: "Horizontal or vertical separator with optional label.",
    icon: "─",
    color: "var(--color-muted)",
    preview: "static",
    props: [
      {
        name: "orientation",
        type: "'horizontal' | 'vertical'",
        desc: "Direction",
      },
      {
        name: "variant",
        type: "'solid' | 'dashed' | 'dotted'",
        desc: "Line style",
      },
      { name: "label", type: "string", desc: "Optional label text" },
    ],
    code: `<Divider />
<Divider label="Section Break" />
<Divider orientation="vertical" />`,
  },
  {
    name: "Dropdown",
    desc: "Select with search, option groups, and multi-select.",
    icon: "▾",
    color: "#dc143c",
    preview: "static",
    props: [
      { name: "options", type: "DropdownOption[]", desc: "Selectable options" },
      { name: "value", type: "string | string[]", desc: "Selected value(s)" },
      { name: "onChange", type: "(value) => void", desc: "Selection handler" },
      { name: "multiple", type: "boolean", desc: "Enable multi-select" },
      { name: "searchable", type: "boolean", desc: "Show search input" },
    ],
    code: `<Dropdown
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ]}
  onChange={(v) => console.log(v)}
/>`,
  },
  {
    name: "Progress",
    desc: "Linear progress bar with label, percentage, gradient, and striped variants.",
    icon: "▬",
    color: "#ff6a1a",
    preview: "static",
    props: [
      { name: "value", type: "number", desc: "Progress value (0-100)" },
      { name: "size", type: "'SM' | 'MD' | 'LG'", desc: "Bar height" },
      {
        name: "variant",
        type: "'default' | 'gradient' | 'striped'",
        desc: "Visual style",
      },
      {
        name: "showPercentage",
        type: "boolean",
        desc: "Show percentage label",
      },
      { name: "label", type: "string", desc: "Label text" },
    ],
    code: `<Progress value={72} showPercentage />
<Progress value={45} variant="gradient" label="Uploading..." />
<Progress value={100} variant="striped" />`,
  },
  {
    name: "Toast",
    desc: "Animated notification toast with success, error, warning, and info variants.",
    icon: "✦",
    color: "#f5a623",
    preview: "static",
    props: [
      {
        name: "message",
        type: "string",
        desc: "Toast message",
        required: true,
      },
      {
        name: "variant",
        type: "'success' | 'error' | 'warning' | 'info'",
        desc: "Visual variant",
      },
      { name: "duration", type: "number", desc: "Auto-dismiss ms" },
      { name: "onClose", type: "() => void", desc: "Close handler" },
    ],
    code: `<Toast message="Changes saved!" variant="success" />
<Toast message="Connection lost" variant="error" />
<Toast message="Almost full" variant="warning" />`,
  },
  {
    name: "Badge",
    desc: "Small status indicator with color variants and dot/icon modes.",
    icon: "◈",
    color: "#a78bfa",
    preview: "static",
    props: [
      { name: "text", type: "string", desc: "Badge label text" },
      {
        name: "variant",
        type: "'default' | 'success' | 'warning' | 'danger' | 'info'",
        desc: "Color variant",
      },
      { name: "dot", type: "boolean", desc: "Show as dot only" },
    ],
    code: `<Badge text="New" variant="danger" />
<Badge text="12" variant="info" />
<Badge variant="success" dot />`,
  },
  {
    name: "Tooltip",
    desc: "Floating tooltip on hover with configurable placement.",
    icon: "⬦",
    color: "var(--color-muted)",
    preview: "static",
    props: [
      {
        name: "content",
        type: "string | ReactNode",
        desc: "Tooltip content",
        required: true,
      },
      {
        name: "placement",
        type: "'top' | 'bottom' | 'left' | 'right'",
        desc: "Tooltip position",
      },
    ],
    code: `<Tooltip content="Save changes" placement="top">
  <Button text="Save" />
</Tooltip>
<Tooltip content="More info" placement="right">
  <span>ⓘ</span>
</Tooltip>`,
  },
  {
    name: "Drawer",
    desc: "Slide-in panel from any edge with smooth animation and overlay.",
    icon: "⬜",
    color: "#dc143c",
    preview: "static",
    props: [
      {
        name: "open",
        type: "boolean",
        desc: "Show/hide drawer",
        required: true,
      },
      {
        name: "onClose",
        type: "() => void",
        desc: "Close handler",
        required: true,
      },
      {
        name: "anchor",
        type: "'left' | 'right' | 'top' | 'bottom'",
        desc: "Slide direction",
      },
      { name: "title", type: "string", desc: "Drawer title" },
    ],
    code: `<Drawer open={isOpen} onClose={() => setOpen(false)} anchor="right" title="Settings">
  <Text>Drawer content</Text>
</Drawer>`,
  },
];

function ComponentPreview({ name }: { name: string }) {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  if (name === "Switch") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            onClick={() => setChecked(!checked)}
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              background: checked
                ? "var(--brand-primary)"
                : "rgba(255,255,255,0.1)",
              position: "relative",
              cursor: "pointer",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "white",
                position: "absolute",
                top: 2,
                left: checked ? 22 : 2,
                transition: "all 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              }}
            />
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--color-text)" }}>
            {checked ? "Enabled" : "Disabled"}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["SM", "MD", "LG"].map((s) => (
            <div
              key={s}
              style={{
                width: s === "SM" ? 28 : s === "MD" ? 36 : 44,
                height: s === "SM" ? 16 : s === "MD" ? 20 : 24,
                borderRadius: s === "SM" ? 8 : s === "MD" ? 10 : 12,
                background: "var(--brand-primary)",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: s === "SM" ? 12 : s === "MD" ? 16 : 20,
                  height: s === "SM" ? 12 : s === "MD" ? 16 : 20,
                  borderRadius: "50%",
                  background: "white",
                  position: "absolute",
                  top: 2,
                  right: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (name === "Button") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Primary", "Secondary", "Ghost"].map((t) => (
            <div
              key={t}
              onClick={() => setLoading(!loading)}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
                transition: "all 0.15s",
                background:
                  t === "Primary"
                    ? "linear-gradient(135deg, var(--brand-primary), var(--brand-600))"
                    : t === "Secondary"
                    ? "var(--brand-50)"
                    : "transparent",
                color:
                  t === "Primary"
                    ? "white"
                    : t === "Secondary"
                    ? "var(--brand-primary)"
                    : "var(--color-text-2)",
                border:
                  t === "Primary"
                    ? "none"
                    : t === "Secondary"
                    ? "1px solid var(--brand-100)"
                    : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["SM", "MD", "LG"].map((s) => (
            <div
              key={s}
              style={{
                padding:
                  s === "SM"
                    ? "4px 10px"
                    : s === "MD"
                    ? "8px 16px"
                    : "12px 24px",
                borderRadius: 8,
                fontSize: "0.72rem",
                fontWeight: 600,
                background: "var(--brand-50)",
                color: "var(--brand-primary)",
                border: "1px solid var(--brand-100)",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (name === "Checkbox") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
        }}
      >
        {["Accept terms", "Subscribe to newsletter", "Remember me"].map((l) => (
          <div
            key={l}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                flexShrink: 0,
                border: "2px solid var(--brand-100)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s",
              }}
            >
              <span
                style={{ fontSize: "0.65rem", color: "var(--brand-primary)" }}
              >
                ✓
              </span>
            </div>
            <span style={{ fontSize: "0.82rem", color: "var(--color-text-2)" }}>
              {l}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

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
  const [selected, setSelected] = useState<string | null>(null);
  const [expandedCode, setExpandedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const active = COMPONENTS.find((c) => c.name === selected);

  return (
    <DocPage
      title="Component API"
      description="31+ beautiful, cross-platform components built on the Stareezy UI token system. Every component accepts BoxProps for layout and spacing."
      badge="Reference"
      icon="⬡"
      badgeColor="#ff6a1a"
    >
      <Callout type="info">
        All components are exported from <code>@stareezy-ui/components</code>{" "}
        and work on both web and React Native with the same API. Every component
        extends <code>BoxProps</code> — pass token shorthand props directly to
        the root container.
      </Callout>

      {/* ── BoxProps ─────────────────────────────────────────────────────── */}
      <h2>BoxProps — universal style system</h2>
      <p>
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
              color: "var(--brand-primary)",
              padding: "2px 8px",
              borderRadius: 5,
              border: "1px solid var(--brand-100)",
            }}
          >
            {p}
          </code>
        ))}
      </div>

      {/* ── Component grid with preview ──────────────────────────────────── */}
      <h2>Components</h2>

      {/* Filter / active selection */}
      {selected && active ? (
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={() => setSelected(null)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              background: "transparent",
              color: "var(--color-text-2)",
              fontSize: "0.8rem",
              cursor: "pointer",
              marginBottom: "1rem",
              fontFamily: "var(--font-sans)",
              transition: "all 0.15s",
            }}
          >
            ← Back to all components
          </button>

          <div
            className="glass-card"
            style={{
              borderRadius: 16,
              padding: "2rem",
              marginBottom: "1.5rem",
              border: "1px solid var(--brand-50)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${active.color}15`,
                  border: `1px solid ${active.color}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  color: active.color,
                  flexShrink: 0,
                }}
              >
                {active.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    margin: "0 0 4px",
                    color: "var(--color-text)",
                  }}
                >
                  {active.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    color: "var(--color-text-2)",
                    lineHeight: 1.6,
                  }}
                >
                  {active.desc}
                </p>
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <span
                    className="pill-tag orange"
                    style={{ fontSize: "0.65rem" }}
                  >
                    Cross-Platform
                  </span>
                  <span
                    className="pill-tag teal"
                    style={{ fontSize: "0.65rem" }}
                  >
                    Theme-Reactive
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive preview */}
            {active.preview === "interactive" && (
              <div
                style={{
                  background: "var(--color-surface)",
                  borderRadius: 12,
                  padding: "1.5rem",
                  border: "1px solid var(--color-border)",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 100,
                }}
              >
                <ComponentPreview name={active.name} />
              </div>
            )}

            {/* Props table */}
            <h4
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                margin: "0 0 0.75rem",
                color: "var(--color-text)",
              }}
            >
              Props
            </h4>
            <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
              <table
                className="prose"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.85rem",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "8px 12px",
                        textAlign: "left",
                        background: "var(--brand-50)",
                        fontWeight: 700,
                        fontSize: "0.72rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        borderBottom: "1px solid var(--brand-100)",
                      }}
                    >
                      Prop
                    </th>
                    <th
                      style={{
                        padding: "8px 12px",
                        textAlign: "left",
                        background: "var(--brand-50)",
                        fontWeight: 700,
                        fontSize: "0.72rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        borderBottom: "1px solid var(--brand-100)",
                      }}
                    >
                      Type
                    </th>
                    <th
                      style={{
                        padding: "8px 12px",
                        textAlign: "left",
                        background: "var(--brand-50)",
                        fontWeight: 700,
                        fontSize: "0.72rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        borderBottom: "1px solid var(--brand-100)",
                      }}
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {active.props.map((p) => (
                    <tr key={p.name}>
                      <td
                        style={{
                          padding: "6px 12px",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <code
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.82em",
                            background: "var(--brand-50)",
                            color: "var(--brand-primary)",
                            padding: "0.15rem 0.45rem",
                            borderRadius: 5,
                            border: "1px solid var(--brand-100)",
                          }}
                        >
                          {p.name}
                        </code>
                        {p.required && (
                          <span
                            style={{
                              marginLeft: 6,
                              fontSize: "0.6rem",
                              fontWeight: 700,
                              color: "var(--brand-accent)",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}
                          >
                            req
                          </span>
                        )}
                      </td>
                      <td
                        style={{
                          padding: "6px 12px",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <code
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.8em",
                            color: "var(--color-text-2)",
                          }}
                        >
                          {p.type}
                        </code>
                      </td>
                      <td
                        style={{
                          padding: "6px 12px",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          color: "var(--color-text-2)",
                          fontSize: "0.82rem",
                        }}
                      >
                        {p.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Code example */}
            <h4
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                margin: "0 0 0.75rem",
                color: "var(--color-text)",
              }}
            >
              Example
            </h4>
            <div
              style={{
                position: "relative",
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 12px",
                  background: "var(--color-surface)",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--color-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {active.name}.tsx
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(active.code);
                    setCopied(active.name);
                    setTimeout(() => setCopied(null), 2000);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "3px 8px",
                    borderRadius: 6,
                    border: "1px solid var(--brand-100)",
                    background: "transparent",
                    color:
                      copied === active.name
                        ? "#22c55e"
                        : "var(--color-text-2)",
                    fontSize: "0.68rem",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    transition: "all 0.15s",
                  }}
                >
                  {copied === active.name ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: "14px 16px",
                  background: "var(--color-code-bg)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  lineHeight: 1.7,
                  color: "var(--color-text)",
                  overflowX: "auto",
                }}
              >
                <code>{active.code}</code>
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "0.85rem",
            marginBottom: "2rem",
          }}
        >
          {COMPONENTS.map((c) => (
            <div
              key={c.name}
              onClick={() => setSelected(c.name)}
              className="glass-card"
              style={{
                borderRadius: 14,
                padding: "1.25rem",
                cursor: "pointer",
                transition: "all 0.2s",
                border: "1px solid var(--color-border)",
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
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `${c.color}15`,
                    border: `1px solid ${c.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    color: c.color,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {c.icon}
                </div>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "var(--color-text)",
                  }}
                >
                  {c.name}
                </span>
                {c.preview === "interactive" && (
                  <span
                    style={{
                      fontSize: "0.55rem",
                      fontWeight: 700,
                      color: "#22c55e",
                      background: "rgba(34,197,94,0.1)",
                      padding: "1px 6px",
                      borderRadius: 4,
                      border: "1px solid rgba(34,197,94,0.2)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      marginLeft: "auto",
                    }}
                  >
                    Live
                  </span>
                )}
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
      )}

      {/* ── Usage example ────────────────────────────────────────────────── */}
      <h2>Import example</h2>
      <pre>
        <code>{`import {
  Box, Text, Button, Input, Accordion,
  Avatar, Checkbox, CircularProgress, Clipboard,
  Divider, Dropdown, Modal, Progress, Resizer,
  Skeleton, Slider, Spinner, Switch, Tabs,
  Card, Badge, Tooltip, Drawer, Toast,
  NavBar, FileDropZone, ProgressPanel,
} from '@stareezy-ui/components'
import { colors, spacing, radius, t } from '@stareezy-ui/tokens'

// Use BoxProps on every component
<Button type="Primary" text="Click" p={8} rounded={8} />
<Input label="Email" placeholder="you@example.com" mb={16} />
<Card variant="border" title="Hello" bg={t.backgrounds.primary} />`}</code>
      </pre>

      <Callout type="tip">
        Click any component card above to see its full props table, interactive
        preview, and code example. Open Storybook to explore all variants with
        live controls.
      </Callout>

      <StorybookCard />
    </DocPage>
  );
}
