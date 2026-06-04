import type { Metadata } from "next";
import { DocPage, Callout } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "sx Prop",
  description:
    "Apply any Box style prop directly on any component with the sx escape hatch.",
};

export default function SxPage() {
  return (
    <DocPage
      title="sx Prop"
      description="An escape-hatch style prop on every component — accepts any Box style prop including token values, responsive objects, and $-breakpoint groups."
      badge="Styling"
      badgeColor="var(--brand-primary)"
      icon="⬡"
    >
      <h2>Overview</h2>
      <p>
        Every component in <code>@stareezy-ui/components</code> — including{" "}
        <code>Box</code> itself — accepts an <code>sx</code> prop. It works like
        Tamagui or Chakra&apos;s <code>sx</code>: pass any style prop you&apos;d
        put directly on <code>Box</code> and it gets applied on top of the
        component&apos;s own styles.
      </p>
      <p>
        <code>sx</code> values win on collision with top-level props — it is
        always applied last.
      </p>

      <Callout type="tip">
        Use <code>sx</code> for one-off adjustments. If you&apos;re setting the
        same styles across many instances, consider extracting them into a
        wrapper component or a custom token shorthand via{" "}
        <code>createUi({"{ shorthands }"})</code>.
      </Callout>

      <h2>Basic usage</h2>
      <pre>
        <code>{`import { Box, Button, Card } from "@stareezy-ui/components";

// Plain values
<Box sx={{ mt: 16, p: 20, bg: "#f5f5f5" }} />

// Token references — use .value accessor
import { colors, radius, spacing } from "@stareezy-ui/tokens";
<Card sx={{ rounded: radius.xl, bg: colors.celurenBlue[25] }} />

// ThemeToken references — resolve to current theme at render time
import { createUi } from "@stareezy-ui/tokens";
const ui = createUi({ ... });
<Box sx={{ bg: ui.t.backgrounds.primary, color: ui.t.text.primary }} />`}</code>
      </pre>

      <h2>Responsive values</h2>
      <p>
        <code>sx</code> accepts the same responsive object syntax as all other
        Box props — a plain value or a breakpoint map with <code>base</code>{" "}
        plus any breakpoint keys from your <code>createUi({"{ media }"})</code>{" "}
        config.
      </p>
      <pre>
        <code>{`// Mobile-first responsive padding
<Box sx={{ p: { base: 12, md: 24, lg: 40 } }} />

// Responsive flex direction
<Box sx={{ flexDirection: { base: "column", md: "row" }, gap: 16 }} />

// Responsive visibility
<Box sx={{ display: { base: "none", lg: "flex" } }}>Desktop only</Box>`}</code>
      </pre>

      <h2>$-breakpoint group syntax</h2>
      <p>
        The <code>$md</code>, <code>$lg</code> etc. group syntax is also
        supported inside <code>sx</code>:
      </p>
      <pre>
        <code>{`<Button
  text="Submit"
  sx={{
    mt: 8,
    $md: { mt: 16, px: 32 },
    $lg: { mt: 24, px: 48 },
  }}
/>`}</code>
      </pre>

      <h2>On any component</h2>
      <p>
        <code>sx</code> is part of <code>BoxLayoutProps</code> which every
        component extends. It works on all of them:
      </p>
      <pre>
        <code>{`import {
  Box, Button, Card, Input, Badge, Spinner,
  Tabs, Table, Modal, Drawer, Toast,
} from "@stareezy-ui/components";

<Button text="Save" sx={{ alignSelf: "flex-end", mt: 24 }} />
<Card sx={{ maxWidth: 480, mx: "auto" }}>…</Card>
<Input label="Email" sx={{ mb: 16 }} />
<Badge label="New" sx={{ position: "absolute", top: -8, right: -8 }} />
<Spinner sx={{ opacity: 0.6 }} />
<Modal open={open} onClose={close} sx={{ borderRadius: 0 }} />`}</code>
      </pre>

      <h2>On Box directly</h2>
      <p>
        <code>Box</code> supports <code>sx</code> too. Since Box already accepts
        all style props directly, <code>sx</code> is most useful on Box when you
        want a clear visual separation between structural props and override
        styles, or when building utility wrappers:
      </p>
      <pre>
        <code>{`// Equivalent — both produce the same output
<Box p={16} bg="var(--surface)" rounded={12} />
<Box sx={{ p: 16, bg: "var(--surface)", rounded: 12 }} />

// Mix: structural intent as top-level props, overrides in sx
<Box display="flex" flexDirection="column" gap={8}
     sx={{ $md: { flexDirection: "row" }, maxWidth: 640 }}
/>`}</code>
      </pre>

      <h2>What sx accepts</h2>
      <p>
        <code>sx</code> is typed as <code>SxProp</code> — a subset of{" "}
        <code>BoxProps</code> with all style-related keys. Interaction handlers,
        accessibility props, and <code>children</code> are excluded.
      </p>
      <pre>
        <code>{`import type { SxProp } from "@stareezy-ui/components";

// Everything you can pass to Box as a style prop also works in sx:
type SxProp = {
  // Spacing
  p?, px?, py?, pt?, pb?, pl?, pr?,
  m?, mx?, my?, mt?, mb?, ml?, mr?,
  // Sizing
  width?, height?, minWidth?, maxWidth?, minHeight?, maxHeight?,
  // Flex
  flex?, flexDirection?, alignItems?, justifyContent?, gap?, ...
  // Colors
  bg?, color?, borderColor?, backgroundColor?, opacity?,
  // Borders
  rounded?, borderWidth?, borderStyle?, borderRadius?, ...
  // Position
  position?, top?, right?, bottom?, left?, zIndex?, overflow?,
  // Visual
  cursor?, transform?, userSelect?, boxSizing?,
  // Responsive objects
  p?: { base?: number, sm?: number, md?: number, ... },
  // $-breakpoint groups
  $sm?, $md?, $lg?, $xl?, "$2xl"?,
  // Custom shorthands from createUi({ shorthands })
  bg?, br?, w?, h?, ...
}`}</code>
      </pre>

      <h2>Priority</h2>
      <p>
        When the same property is set both as a direct prop and in{" "}
        <code>sx</code>, <code>sx</code> wins:
      </p>
      <pre>
        <code>{`// bg="red" is overridden by sx — rendered background will be blue
<Box bg="red" sx={{ bg: "blue" }} />`}</code>
      </pre>

      <Callout type="info">
        <code>sx</code> is processed by Box&apos;s full resolver pipeline —
        token references, ThemeTokens, responsive objects, and <code>$</code>
        -groups all work exactly the same as top-level Box props.
      </Callout>
    </DocPage>
  );
}
