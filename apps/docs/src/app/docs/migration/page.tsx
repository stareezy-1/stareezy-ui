import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Migration Guide",
  description: "How to migrate from rekosistem-components to Stareezy UI.",
};

const COMPONENT_MAP = [
  ["Button", "Button"],
  ["Text", "Text"],
  ["Input", "Input"],
  ["BaseModal", "BaseModal"],
  ["BottomSheets", "BottomSheets"],
  ["Card", "Card"],
  ["Topbar", "Topbar"],
  ["All others", "Same name"],
];

export default function MigrationPage() {
  return (
    <DocPage
      title="Migration Guide"
      description="Migrate from rekosistem-components to @stareezy-ui/components step by step."
      badge="Migration"
      icon="→"
      badgeColor="#C98B25"
    >
      <h2>Why Migrate?</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "0.75rem",
          margin: "1rem 0 1.5rem",
        }}
      >
        {[
          {
            icon: "⬡",
            title: "Type safety",
            desc: "Autocomplete and compile-time errors for invalid values",
            color: "#024CCE",
            bg: "#E6EDFA",
          },
          {
            icon: "⚡",
            title: "Performance",
            desc: "O(1) style lookups, no string parsing at render time",
            color: "#4D8D01",
            bg: "#F3FFE3",
          },
          {
            icon: "◈",
            title: "Tree shaking",
            desc: "Import only the tokens you use",
            color: "#C98B25",
            bg: "#FEF4E2",
          },
          {
            icon: "◑",
            title: "Cross-platform",
            desc: "Same token API on web and React Native",
            color: "#0C9182",
            bg: "#E7FDFA",
          },
        ].map((b) => (
          <div
            key={b.title}
            style={{
              background: b.bg,
              border: `1px solid ${b.color}20`,
              borderRadius: 10,
              padding: "0.85rem 1rem",
            }}
          >
            <div style={{ fontSize: "1.1rem", marginBottom: 4 }}>{b.icon}</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.875rem",
                color: b.color,
                marginBottom: 2,
              }}
            >
              {b.title}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-2)" }}>
              {b.desc}
            </div>
          </div>
        ))}
      </div>

      <h2>Migration Steps</h2>

      <Step n={1} title="Install Packages">
        <pre>
          <code>{`pnpm add @stareezy-ui/tokens @stareezy-ui/components @stareezy-ui/runtime
pnpm add -D @stareezy-ui/compiler`}</code>
        </pre>
      </Step>

      <Step n={2} title="Replace Color References">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#C20219",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.4rem",
              }}
            >
              Before
            </div>
            <pre style={{ margin: 0 }}>
              <code>{`import { color } from 'rekosistem-components/styles'

style={{
  backgroundColor: color.raisinBlack[800]
}}`}</code>
            </pre>
          </div>
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#4D8D01",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.4rem",
              }}
            >
              After
            </div>
            <pre style={{ margin: 0 }}>
              <code>{`import { colors } from '@stareezy-ui/tokens'

bg={colors.raisinBlack[800]}`}</code>
            </pre>
          </div>
        </div>
      </Step>

      <Step n={3} title="Replace Spacing References">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#C20219",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.4rem",
              }}
            >
              Before
            </div>
            <pre style={{ margin: 0 }}>
              <code>{`style={{ padding: spacing.extraMedium }}`}</code>
            </pre>
          </div>
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#4D8D01",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.4rem",
              }}
            >
              After
            </div>
            <pre style={{ margin: 0 }}>
              <code>{`p={spacing.extraMedium}
// or numeric:
p={spacing[16]}`}</code>
            </pre>
          </div>
        </div>
      </Step>

      <Step n={4} title="Replace Tamagui Props">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#C20219",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.4rem",
              }}
            >
              Before (Tamagui)
            </div>
            <pre style={{ margin: 0 }}>
              <code>{`<Stack
  backgroundColor="$primary500"
  padding="$4"
  borderRadius="$md"
/>`}</code>
            </pre>
          </div>
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#4D8D01",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.4rem",
              }}
            >
              After
            </div>
            <pre style={{ margin: 0 }}>
              <code>{`<Box
  bg={colors.celurenBlue[500]}
  p={spacing[4]}
  rounded={radius.md}
/>`}</code>
            </pre>
          </div>
        </div>
      </Step>

      <Step n={5} title="Update Disabled States">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#C20219",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.4rem",
              }}
            >
              Before
            </div>
            <pre style={{ margin: 0 }}>
              <code>{`style={{
  backgroundColor: color.neutral[200],
  color: color.neutral[500]
}}`}</code>
            </pre>
          </div>
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#4D8D01",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.4rem",
              }}
            >
              After
            </div>
            <pre style={{ margin: 0 }}>
              <code>{`bg={semanticColors.backgrounds.disabled}
color={semanticColors.text.secondary}`}</code>
            </pre>
          </div>
        </div>
      </Step>

      <Callout type="tip">
        All component APIs are backward compatible — the same props work, with
        token-typed alternatives available. You can migrate incrementally, one
        component at a time.
      </Callout>

      <h2>Component Name Mapping</h2>
      <table>
        <thead>
          <tr>
            <th>rekosistem-components</th>
            <th>@stareezy-ui/components</th>
          </tr>
        </thead>
        <tbody>
          {COMPONENT_MAP.map(([from, to]) => (
            <tr key={from}>
              <td>
                <code>{from}</code>
              </td>
              <td>
                <code>{to}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DocPage>
  );
}
