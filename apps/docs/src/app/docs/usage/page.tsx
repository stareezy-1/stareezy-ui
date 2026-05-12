import type { Metadata } from "next";
import { DocPage, Callout } from "apps/docs/src/components/DocPage";

export const metadata: Metadata = {
  title: "Usage",
  description: "How to use Stareezy UI tokens and components.",
};

const TOKEN_CATEGORIES = [
  {
    name: "colors",
    desc: "Full color palette (celurenBlue, raisinBlack, etc.)",
    color: "#024CCE",
    bg: "#E6EDFA",
  },
  {
    name: "semanticColors",
    desc: "Role-based colors (bg.primary, text.secondary…)",
    color: "#4D8D01",
    bg: "#F3FFE3",
  },
  {
    name: "spacing",
    desc: "Spacing scale (0–480px)",
    color: "#C98B25",
    bg: "#FEF4E2",
  },
  {
    name: "radius",
    desc: "Border radius scale",
    color: "#0C9182",
    bg: "#E7FDFA",
  },
  {
    name: "typography",
    desc: "Font sizes, weights, families",
    color: "#5D2555",
    bg: "#F9DEDE",
  },
  {
    name: "shadow",
    desc: "Box shadow presets",
    color: "#535A5E",
    bg: "#F4F6FB",
  },
  {
    name: "timing",
    desc: "Animation timing values",
    color: "#C20219",
    bg: "#FFE9EC",
  },
];

export default function UsagePage() {
  return (
    <DocPage
      title="Usage"
      description="Learn the token API and how to use components with full type safety."
      badge="Guide"
      icon="◈"
    >
      <h2>Token Objects</h2>
      <p>
        Every design value in Stareezy UI is a typed token object. Tokens carry
        their identity and value in a single, frozen object:
      </p>

      <pre>
        <code>{`type Token<T> = {
  readonly __token: true  // discriminant for compiler detection
  readonly id: string     // stable unique identifier
  readonly value: T       // resolved design value
}`}</code>
      </pre>

      <Callout type="tip">
        The <code>__token: true</code> discriminant is what lets the compiler
        detect token props at build time and replace them with atomic CSS class
        names.
      </Callout>

      <h2>Using Tokens in Components</h2>
      <p>
        Pass token objects directly as props — TypeScript will autocomplete and
        validate every value:
      </p>

      <pre>
        <code>{`import { colors, spacing, radius, typography } from '@stareezy-ui/tokens'
import { Box, Text } from '@stareezy-ui/components'

function Card() {
  return (
    <Box
      bg={colors.celurenBlue[500]}
      p={spacing[4]}
      rounded={radius.md}
    >
      <Text
        type="M-heading-bold"
        color={colors.neutral[10].value}
        text="Hello, Stareezy UI"
      />
    </Box>
  )
}`}</code>
      </pre>

      <h2>Token Categories</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "0.75rem",
          margin: "1rem 0 1.5rem",
        }}
      >
        {TOKEN_CATEGORIES.map((c) => (
          <div
            key={c.name}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border-2)",
              borderRadius: 10,
              padding: "0.85rem 1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: c.color,
                }}
              />
              <code
                style={{ fontSize: "0.82rem", fontWeight: 700, color: c.color }}
              >
                {c.name}
              </code>
            </div>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--color-text-2)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {c.desc}
            </p>
          </div>
        ))}
      </div>

      <h2>Fallback Values</h2>
      <p>
        All style props also accept plain strings or numbers for backward
        compatibility:
      </p>
      <pre>
        <code>{`// Token prop (type-safe, compiler-optimized)
<Box bg={colors.celurenBlue[500]} p={spacing[4]} rounded={radius.md} />

// Plain fallback (still works, no compiler optimization)
<Box bg="#024CCE" p={16} rounded={8} />`}</code>
      </pre>

      <h2>Accessing Token Values</h2>
      <p>
        Every token exposes its raw value via <code>.value</code>:
      </p>
      <pre>
        <code>{`import { colors } from '@stareezy-ui/tokens'

const token = colors.celurenBlue[500]
console.log(token.id)    // "celurenBlue-500"
console.log(token.value) // "#024CCE"

// Use in non-token contexts (e.g. inline styles, RN StyleSheet)
const style = { backgroundColor: colors.celurenBlue[500].value }`}</code>
      </pre>

      <h2>Custom Configuration with createUi</h2>
      <p>
        Use <code>createUi()</code> to register custom tokens and breakpoints at
        app startup:
      </p>
      <pre>
        <code>{`import { createUi } from '@stareezy-ui/tokens'
import { token } from '@stareezy-ui/tokens'

const ui = createUi({
  tokens: {
    brand: {
      primary: token('#FF6B35', 'brand-primary'),
      secondary: token('#004E89', 'brand-secondary'),
    },
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
})

// Access your custom tokens with full type safety
ui.tokens.brand.primary.value // "#FF6B35"`}</code>
      </pre>

      <Callout type="info">
        <code>createUi()</code> merges your custom tokens with the built-in
        token set and configures breakpoints globally. Call it once at app
        startup before rendering any components.
      </Callout>
    </DocPage>
  );
}
