import type { Metadata } from "next";
import { DocPage, Callout, PropRow } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "BoxLayoutProps",
  description:
    "BoxLayoutProps — spacing, sizing, flex, custom shorthands, and $-prefixed breakpoint props available on every component in the Quasify UI library.",
  alternates: { canonical: "https://ui.quasify.app/docs/box-layout-props" },
};

const SPACING_PROPS = [
  ["p", "padding", "number | string | Responsive<...>"],
  ["px", "paddingHorizontal", "number | string | Responsive<...>"],
  ["py", "paddingVertical", "number | string | Responsive<...>"],
  ["pt", "paddingTop", "number | string | Responsive<...>"],
  ["pb", "paddingBottom", "number | string | Responsive<...>"],
  ["pl", "paddingLeft", "number | string | Responsive<...>"],
  ["pr", "paddingRight", "number | string | Responsive<...>"],
  ["m", "margin", "number | string | Responsive<...>"],
  ["mx", "marginHorizontal", "number | string | Responsive<...>"],
  ["my", "marginVertical", "number | string | Responsive<...>"],
  ["mt", "marginTop", "number | string | Responsive<...>"],
  ["mb", "marginBottom", "number | string | Responsive<...>"],
  ["ml", "marginLeft", "number | string | Responsive<...>"],
  ["mr", "marginRight", "number | string | Responsive<...>"],
];

const SIZING_PROPS = [
  ["w / width", "width", "number | string | Responsive<...>"],
  ["h / height", "height", "number | string | Responsive<...>"],
  ["minW / minWidth", "minWidth", "number | string | Responsive<...>"],
  ["maxW / maxWidth", "maxWidth", "number | string | Responsive<...>"],
  ["minH / minHeight", "minHeight", "number | string | Responsive<...>"],
  ["maxH / maxHeight", "maxHeight", "number | string | Responsive<...>"],
];

const FLEX_PROPS = [
  ["flex / f", "flex", "number | Responsive<number>"],
  ["flexDirection", "flexDirection", "'row' | 'column' | Responsive<...>"],
  ["flexWrap", "flexWrap", "'wrap' | 'nowrap' | Responsive<...>"],
  ["flexGrow", "flexGrow", "number | Responsive<number>"],
  ["flexShrink", "flexShrink", "number | Responsive<number>"],
  [
    "alignItems",
    "alignItems",
    "'center' | 'flex-start' | ... | Responsive<...>",
  ],
  ["alignSelf", "alignSelf", "'center' | 'flex-start' | ... | Responsive<...>"],
  [
    "justifyContent",
    "justifyContent",
    "'center' | 'space-between' | ... | Responsive<...>",
  ],
  ["gap", "gap", "number | string | Responsive<...>"],
  ["rowGap", "rowGap", "number | string | Responsive<...>"],
  ["columnGap", "columnGap", "number | string | Responsive<...>"],
];

export default function BoxLayoutPropsPage() {
  return (
    <DocPage
      title="BoxLayoutProps"
      description="The shared layout prop type extended by every component — spacing, sizing, flex, custom shorthands, and $-prefixed breakpoint groups."
      badge="API Reference"
      icon="⬡"
      badgeColor="#ff6a1a"
    >
      <h2 className="gradient-text">What is BoxLayoutProps?</h2>
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-2)",
          borderLeft: "4px solid #ff6a1a",
          borderRadius: "0 12px 12px 0",
          padding: "1rem 1.25rem",
          marginBottom: "1.5rem",
          boxShadow: "0 0 40px rgba(255,106,26,0.03)",
        }}
      >
        <p>
          <code>BoxLayoutProps</code> is a TypeScript type that bundles all
          layout-related props:
        </p>
        <ul>
          <li>Responsive spacing props (padding, margin)</li>
          <li>Responsive sizing props (width, height)</li>
          <li>Responsive flex props (flex, flexDirection, alignItems, gap, …)</li>
          <li>
            Custom shorthands declared in your{" "}
            <code>createUi({"{ shorthands }"})</code> config, each wrapped in{" "}
            <code>Responsive&lt;T&gt;</code>
          </li>
          <li>
            <code>$</code>-prefixed breakpoint props (<code>$sm</code>,{" "}
            <code>$md</code>, …) derived from your{" "}
            <code>createUi({"{ media }"})</code> config
          </li>
        </ul>
      </div>

      <Callout type="info">
        Every component in <code>@quasify-ui/components</code> extends{" "}
        <code>BoxLayoutProps</code>. You can pass layout props directly to any
        component — they are forwarded to the root element automatically.
      </Callout>

      {/* ── All components accept these props ────────────────────────────── */}
      <h2 className="gradient-text">Every component accepts these props</h2>
      <pre
        style={{
          border: "1px solid var(--color-border)",
          boxShadow: "0 0 40px rgba(255,106,26,0.03)",
        }}
      >
        <code>{`import {
  Button, Input, Card, Badge, Accordion,
  Avatar, Checkbox, Dropdown, Modal,
  Progress, Skeleton, Spinner, Switch, Tabs,
  Breadcrumb, Pagination, Table, Tag, Tooltip, Drawer,
} from '@quasify-ui/components'

// Spacing on any component
<Button p={{ base: 8, md: 12 }} mb={16} />
<Input  mx={12} mt={8} />
<Card   p={{ base: 12, md: 20, lg: 28 }} />
<Badge  px={8} py={4} />

// Sizing on any component
<Button w={{ base: '100%', md: 'auto' }} />
<Input  w={{ base: '100%', md: 360 }} />
<Modal  maxW={560} />

// $-prefixed breakpoint groups
<Card
  $md={{ flexDirection: 'row', p: 20 }}
  $lg={{ p: 28, gap: 16 }}
/>`}</code>
      </pre>

      {/* ── Usage with custom shorthands ─────────────────────────────────── */}
      <h2 className="gradient-text">With custom shorthands</h2>
      <p>
        Custom shorthands from your <code>quasify.config.ts</code> are also
        part of <code>BoxLayoutProps</code> after module augmentation. They
        accept both plain values and responsive objects.
      </p>
      <pre
        style={{
          border: "1px solid var(--color-border)",
          boxShadow: "0 0 40px rgba(255,106,26,0.03)",
        }}
      >
        <code>{`// With shorthands: { br: 'borderRadius', w: 'width', h: 'height' } as const

<Button
  p={{ md: 16 }}
  w="100%"
  br={8}
/>

// TypeScript knows 'br', 'w', 'h' are valid on Button because
// Button extends BoxLayoutProps which includes CustomShorthandProps`}</code>
      </pre>

      {/* ── Spacing props ─────────────────────────────────────────────────── */}
      <h2 className="gradient-text">Spacing props</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr style={{ borderTop: "2px solid #ff6a1a" }}>
              <th>Prop</th>
              <th>CSS/RN property</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {SPACING_PROPS.map(([prop, css, type]) => (
              <tr key={prop}>
                <td>
                  <code style={{ color: "#ff6a1a" }}>{prop}</code>
                </td>
                <td>
                  <code
                    style={{ fontSize: "0.8em", color: "var(--color-text-2)" }}
                  >
                    {css}
                  </code>
                </td>
                <td>
                  <code
                    style={{ fontSize: "0.78em", color: "var(--color-text-2)" }}
                  >
                    {type}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Sizing props ─────────────────────────────────────────────────── */}
      <h2 className="gradient-text">Sizing props</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr style={{ borderTop: "2px solid #ff6a1a" }}>
              <th>Prop</th>
              <th>CSS/RN property</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {SIZING_PROPS.map(([prop, css, type]) => (
              <tr key={prop}>
                <td>
                  <code style={{ color: "#ff6a1a" }}>{prop}</code>
                </td>
                <td>
                  <code
                    style={{ fontSize: "0.8em", color: "var(--color-text-2)" }}
                  >
                    {css}
                  </code>
                </td>
                <td>
                  <code
                    style={{ fontSize: "0.78em", color: "var(--color-text-2)" }}
                  >
                    {type}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Flex props ───────────────────────────────────────────────────── */}
      <h2 className="gradient-text">Flex props</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr style={{ borderTop: "2px solid #ff6a1a" }}>
              <th>Prop</th>
              <th>CSS/RN property</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {FLEX_PROPS.map(([prop, css, type]) => (
              <tr key={prop}>
                <td>
                  <code style={{ color: "#ff6a1a" }}>{prop}</code>
                </td>
                <td>
                  <code
                    style={{ fontSize: "0.8em", color: "var(--color-text-2)" }}
                  >
                    {css}
                  </code>
                </td>
                <td>
                  <code
                    style={{ fontSize: "0.78em", color: "var(--color-text-2)" }}
                  >
                    {type}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── extractBoxLayoutProps ─────────────────────────────────────────── */}
      <h2 className="gradient-text">extractBoxLayoutProps utility</h2>
      <p>
        When building custom components that should accept{" "}
        <code>BoxLayoutProps</code>, use <code>extractBoxLayoutProps</code> to
        split layout props from component-specific props:
      </p>
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-2)",
          borderRadius: 12,
          padding: "0.25rem 0",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 40px rgba(255,106,26,0.06)",
        }}
      >
        <pre
          style={{
            border: "1px solid var(--color-border)",
            boxShadow: "0 0 40px rgba(255,106,26,0.03)",
          }}
        >
          <code>{`import { extractBoxLayoutProps, Box } from '@quasify-ui/components'
import type { BoxLayoutProps } from '@quasify-ui/components'

interface MyCardProps extends BoxLayoutProps {
  title: string
  children: React.ReactNode
}

function MyCard({ title, children, ...props }: MyCardProps) {
  const { layout, rest } = extractBoxLayoutProps(props)

  return (
    <Box {...layout} style={{ borderRadius: 12 }}>
      <h3>{title}</h3>
      {children}
    </Box>
  )
}

// Usage — layout props are accepted
<MyCard title="Hello" p={{ base: 12, md: 20 }} mb={16}>
  Content here
</MyCard>`}</code>
        </pre>
      </div>

      <Callout type="tip">
        All built-in components already call <code>extractBoxLayoutProps</code>{" "}
        internally — you only need it when building your own components that
        should accept the same layout API.
      </Callout>
    </DocPage>
  );
}
