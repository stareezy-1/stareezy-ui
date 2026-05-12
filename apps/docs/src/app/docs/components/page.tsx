import type { Metadata } from "next";
import { DocPage, Callout } from "../../../components/DocPage";
export const metadata: Metadata = {
  title: "Component API",
  description: "API reference for all Stareezy UI components.",
};

const COMPONENT_LIST = [
  "Box",
  "Text",
  "HStack",
  "VStack",
  "Button",
  "Input",
  "Checkbox",
  "CheckboxOption",
  "Dropdown",
  "FilterButton",
  "PinCode",
  "Ratings",
  "Screen",
  "ViewStack",
  "Spacer",
  "Line",
  "Dot",
  "CardBox",
  "Card",
  "GroupContainer",
  "Footer",
  "Header",
  "Topbar",
  "BaseModal",
  "BottomSheets",
  "Drawer",
  "ImageModal",
  "CalendarModal",
  "DateRangeCalendarModal",
  "MonthCalendarModal",
  "Labels",
  "Badges",
  "BadgesStatus",
  "Avatars",
  "Loading",
  "LoadingSpinner",
  "ProgressBar",
  "Toast",
  "EmptyState",
  "Calendar",
  "LineChart",
  "RadarChart",
  "BarChart",
  "Table",
  "TopTabs",
  "Pagination",
  "SummaryCard",
  "Photo",
  "UploadPhoto",
];

const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "tertiary",
  "link",
  "transparent",
];
const BUTTON_SIZES = ["sm", "md", "lg", "xl", "xxl"];

export default function ComponentsPage() {
  return (
    <DocPage
      title="Component API"
      description="70+ cross-platform components built on the Stareezy UI token system."
      badge="Reference"
      icon="⬡"
      badgeColor="#0C9182"
    >
      <Callout type="info">
        All components are exported from <code>@stareezy-ui/components</code>{" "}
        and work on both web and React Native with the same API.
      </Callout>

      <h2>Primitives</h2>

      {/* Box */}
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-2)",
          borderRadius: 14,
          padding: "1.5rem",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: "0.85rem",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "var(--brand-50)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            ⬡
          </div>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>
            Box
          </h3>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "var(--brand-500)",
              background: "var(--brand-50)",
              padding: "2px 8px",
              borderRadius: 100,
            }}
          >
            Primitive
          </span>
        </div>
        <p
          style={{
            color: "var(--color-text-2)",
            fontSize: "0.9rem",
            marginBottom: "1rem",
          }}
        >
          The foundational layout component. Accepts all token-typed style props
          and renders a <code>div</code> on web or <code>View</code> on React
          Native.
        </p>
        <pre>
          <code>{`import { Box } from '@stareezy-ui/components'
import { colors, spacing, radius } from '@stareezy-ui/tokens'

<Box
  bg={colors.celurenBlue[500]}
  p={spacing[4]}
  rounded={radius.md}
  flexDirection="row"
  alignItems="center"
/>`}</code>
        </pre>
        <div
          style={{
            marginTop: "0.85rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
          }}
        >
          {[
            "bg",
            "color",
            "p",
            "px",
            "py",
            "m",
            "mx",
            "my",
            "rounded",
            "borderWidth",
            "borderColor",
            "width",
            "height",
            "flex",
            "flexDirection",
            "alignItems",
            "justifyContent",
          ].map((p) => (
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
      </div>

      {/* Text */}
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-2)",
          borderRadius: 14,
          padding: "1.5rem",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: "0.85rem",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "#F3FFE3",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            T
          </div>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>
            Text
          </h3>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#4D8D01",
              background: "#F3FFE3",
              padding: "2px 8px",
              borderRadius: 100,
            }}
          >
            Primitive
          </span>
        </div>
        <p
          style={{
            color: "var(--color-text-2)",
            fontSize: "0.9rem",
            marginBottom: "1rem",
          }}
        >
          Typography component with 50+ variant presets. Sets{" "}
          <code>allowFontScaling=false</code> on React Native automatically.
        </p>
        <pre>
          <code>{`import { Text, ETextType } from '@stareezy-ui/components'

<Text type={ETextType.MHeadingBold} text="Hello world" />
<Text type={ETextType.MParagraphRegular} text="Body copy" color="#024CCE" />
<Text text="" emptyState="—" />`}</code>
        </pre>
      </div>

      {/* HStack / VStack */}
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-2)",
          borderRadius: 14,
          padding: "1.5rem",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: "0.85rem",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "#FEF4E2",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "#C98B25",
            }}
          >
            ⇔
          </div>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>
            HStack / VStack
          </h3>
        </div>
        <p
          style={{
            color: "var(--color-text-2)",
            fontSize: "0.9rem",
            marginBottom: "1rem",
          }}
        >
          Flex layout helpers built on <code>Box</code>. HStack is{" "}
          <code>flexDirection="row"</code>, VStack is{" "}
          <code>flexDirection="column"</code>.
        </p>
        <pre>
          <code>{`import { HStack, VStack } from '@stareezy-ui/components'

<HStack gap={8} alignItems="center">
  <Text text="Left" />
  <Text text="Right" />
</HStack>`}</code>
        </pre>
      </div>

      <h2>Button</h2>
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-2)",
          borderRadius: 14,
          padding: "1.5rem",
          marginBottom: "1.25rem",
        }}
      >
        <pre>
          <code>{`import { Button } from '@stareezy-ui/components'

<Button
  variant="primary"
  size="md"
  text="Submit"
  onPress={() => {}}
  accessibilityLabel="Submit form"
/>

// Loading state
<Button variant="primary" text="Saving…" loading />

// Disabled state
<Button variant="secondary" text="Unavailable" disabled />`}</code>
        </pre>

        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            marginTop: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-muted)",
                marginBottom: "0.4rem",
              }}
            >
              Variants
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {BUTTON_VARIANTS.map((v) => (
                <code
                  key={v}
                  style={{
                    fontSize: "0.75rem",
                    background: "var(--brand-50)",
                    color: "var(--brand-600)",
                    padding: "2px 8px",
                    borderRadius: 5,
                    border: "1px solid var(--brand-100)",
                  }}
                >
                  {v}
                </code>
              ))}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-muted)",
                marginBottom: "0.4rem",
              }}
            >
              Sizes
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {BUTTON_SIZES.map((s) => (
                <code
                  key={s}
                  style={{
                    fontSize: "0.75rem",
                    background: "var(--color-surface-2)",
                    color: "var(--color-text-2)",
                    padding: "2px 8px",
                    borderRadius: 5,
                    border: "1px solid var(--color-border-2)",
                  }}
                >
                  {s}
                </code>
              ))}
            </div>
          </div>
        </div>
      </div>

      <h2>Full Component List</h2>
      <p>
        All {COMPONENT_LIST.length}+ components are exported from{" "}
        <code>@stareezy-ui/components</code>:
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          margin: "0.75rem 0",
        }}
      >
        {COMPONENT_LIST.map((c) => (
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

      <Callout type="tip">
        Every component has a TypeScript prop interface with no <code>any</code>{" "}
        types. Prop tables are auto-generated in Storybook from these
        interfaces.
      </Callout>
    </DocPage>
  );
}
