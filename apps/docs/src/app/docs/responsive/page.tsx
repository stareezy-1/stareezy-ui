import type { Metadata } from "next";
import { DocPage, Callout, Step, PropRow } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Responsive System",
  description:
    "Config-driven responsive breakpoints with createUi({ media, shorthands }), BreakpointKey autocomplete, responsive object syntax, and $-prefixed breakpoint props.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/responsive" },
};

export default function ResponsivePage() {
  return (
    <DocPage
      title="Responsive System"
      description="Config-driven breakpoints, responsive object syntax, and $-prefixed breakpoint props — all fully typed from your createUi configuration."
      badge="Guide"
      icon="◈"
      badgeColor="#024CCE"
    >
      <h2>Overview</h2>
      <p>
        Stareezy UI&apos;s responsive system is driven by your{" "}
        <code>stareezy.config.ts</code>. Declare breakpoints once in{" "}
        <code>createUi({"{ media }"})</code> and TypeScript automatically
        derives the valid breakpoint keys — so autocomplete and type errors work
        everywhere without extra setup.
      </p>

      <Callout type="tip">
        Breakpoints are mobile-first and resolved as <code>min-width</code>{" "}
        media queries on web, and as window-width comparisons on React Native.
      </Callout>

      {/* ── Declaring breakpoints ────────────────────────────────────────── */}
      <h2>Declaring breakpoints with createUi</h2>
      <p>
        Pass a <code>media</code> record to <code>createUi()</code>. Keys are
        breakpoint names, values are <code>min-width</code> thresholds in
        pixels.
      </p>
      <pre>
        <code>{`// stareezy.config.ts
import { createUi, themes } from '@stareezy-ui/tokens'

export const ui = createUi({
  themes: { aurora: themes.aurora, light: themes.light },

  // Declare your responsive breakpoints (mobile-first, min-width px)
  media: {
    sm:  480,
    md:  768,
    lg:  1024,
    xl:  1280,
    '2xl': 1536,
  },

  // Optional — custom shorthands that also accept responsive values
  shorthands: {
    p:  'padding',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    m:  'margin',
    br: 'borderRadius',
    w:  'width',
    h:  'height',
  } as const,
})

// Module augmentation — makes breakpoints and shorthands flow into the type system
type AppConfig = typeof ui
declare module '@stareezy-ui/tokens' {
  interface SzrCustomConfig extends AppConfig {}
}

export default ui`}</code>
      </pre>

      <Callout type="info">
        <code>createUi({"{ media }"})</code> automatically syncs the declared
        breakpoints into the runtime — no separate{" "}
        <code>configureBreakpoints()</code> call is needed.
      </Callout>

      {/* ── BreakpointKey autocomplete ───────────────────────────────────── */}
      <h2>Config-driven BreakpointKey autocomplete</h2>
      <p>
        After the module augmentation above, <code>BreakpointKey</code> is
        derived directly from your <code>media</code> configuration. TypeScript
        autocompletes only the keys you declared, and reports a type error for
        any other key.
      </p>
      <pre>
        <code>{`// After augmenting SzrCustomConfig with the config above,
// BreakpointKey = "base" | "sm" | "md" | "lg" | "xl" | "2xl"

// ✅ Valid — these keys match the declared breakpoints
<Box p={{ base: 8, md: 16, lg: 24 }} />

// ❌ Type error — "tablet" is not a declared breakpoint
<Box p={{ tablet: 16 }} />
//        ↑ Type '"tablet"' is not assignable to type 'BreakpointKey'`}</code>
      </pre>

      <p>
        Without augmentation, the default <code>BreakpointKey</code> is{" "}
        <code>"base" | "sm" | "md" | "lg" | "xl" | "2xl"</code>.
      </p>

      {/* ── Responsive object syntax ─────────────────────────────────────── */}
      <h2>Responsive object syntax</h2>
      <p>
        Pass a <code>{"{ base?, sm?, md?, lg?, xl?, '2xl'? }"}</code> object to
        any layout or shorthand prop. The <code>base</code> value applies
        unconditionally; each named breakpoint applies at and above its
        configured threshold (mobile-first).
      </p>
      <pre>
        <code>{`import { Box, Button, Card } from '@stareezy-ui/components'

// Responsive padding
<Box p={{ base: 8, md: 16, lg: 24 }} />

// Responsive width — full on mobile, auto on desktop
<Button w={{ base: '100%', md: 'auto' }} />

// Responsive flex direction
<Box
  flexDirection={{ base: 'column', lg: 'row' }}
  gap={{ base: 8, lg: 16 }}
>
  <Card p={{ base: 12, md: 20 }} />
  <Card p={{ base: 12, md: 20 }} />
</Box>`}</code>
      </pre>

      {/* ── Responsive values on custom shorthands ───────────────────────── */}
      <h2>Responsive values on custom shorthands</h2>
      <p>
        Custom shorthands declared through{" "}
        <code>createUi({"{ shorthands }"})</code> accept responsive objects with
        the same syntax as built-in props.
      </p>
      <pre>
        <code>{`// With the shorthands declared above:
<Box br={{ base: 4, md: 8, lg: 12 }} />  // borderRadius responsive
<Box px={{ base: 12, lg: 24 }} />        // paddingHorizontal responsive
<Box w={{ base: '100%', md: 320 }} />    // width responsive

// Mix responsive and plain values
<Box p={{ base: 8, md: 16 }} br={8} w="100%" />`}</code>
      </pre>

      {/* ── $-prefixed breakpoint-as-prop syntax ─────────────────────────── */}
      <h2>$-prefixed breakpoint-as-prop syntax</h2>
      <p>
        As an alternative to responsive objects, you can group multiple style
        props under a single <code>$breakpoint</code> key (Tamagui-style). Each{" "}
        <code>$</code>-prefixed prop accepts a partial set of Box style and
        shorthand props scoped to that breakpoint.
      </p>
      <pre>
        <code>{`// Equivalent to writing individual responsive objects on each prop
<Box
  $md={{ p: 16, br: 8 }}
  $lg={{ p: 24, br: 12, flexDirection: 'row' }}
/>

// Same as:
<Box
  p={{ base: undefined, md: 16, lg: 24 }}
  br={{ base: undefined, md: 8, lg: 12 }}
  flexDirection={{ base: undefined, lg: 'row' }}
/>`}</code>
      </pre>

      <Callout type="info">
        When the same property is supplied through both a responsive object{" "}
        <em>and</em> a <code>$</code>-prefixed group for the same breakpoint,
        the <code>$</code>-prefixed value wins.
      </Callout>

      <pre>
        <code>{`// $md value wins over the responsive object's md value
<Box
  p={{ base: 8, md: 12 }}  // md = 12 from responsive object
  $md={{ p: 16 }}          // md = 16 from $-group — this wins
/>
// Result at md: p = 16`}</code>
      </pre>

      {/* ── All components accept responsive props ───────────────────────── */}
      <h2>All components accept responsive props</h2>
      <p>
        Every component in <code>@stareezy-ui/components</code> extends{" "}
        <code>BoxLayoutProps</code>, so responsive layout props work on all of
        them — not just <code>Box</code>.
      </p>
      <pre>
        <code>{`import { Button, Input, Card, Badge } from '@stareezy-ui/components'

<Button
  p={{ base: 8, md: 12 }}
  w={{ base: '100%', md: 'auto' }}
  $lg={{ px: 20, py: 10 }}
/>

<Input
  w={{ base: '100%', md: 360 }}
  mb={{ base: 8, lg: 0 }}
/>

<Card
  p={{ base: 12, md: 20, lg: 28 }}
  $md={{ flexDirection: 'row' }}
/>

<Badge
  px={{ base: 8, md: 12 }}
  py={{ base: 4, md: 6 }}
/>`}</code>
      </pre>

      {/* ── Default breakpoints ──────────────────────────────────────────── */}
      <h2>Default breakpoints</h2>
      <p>
        If you do not augment <code>SzrCustomConfig</code> with a{" "}
        <code>media</code> configuration, the following defaults apply:
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>min-width</th>
              <th>Typical target</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["base", "0px", "All screens (no media query)"],
              ["sm", "480px", "Large phones"],
              ["md", "768px", "Tablets"],
              ["lg", "1024px", "Laptops"],
              ["xl", "1280px", "Desktops"],
              ["2xl", "1536px", "Wide screens"],
            ].map(([key, width, target]) => (
              <tr key={key}>
                <td>
                  <code>{key}</code>
                </td>
                <td>
                  <code>{width}</code>
                </td>
                <td
                  style={{ color: "var(--color-text-2)", fontSize: "0.875rem" }}
                >
                  {target}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DocPage>
  );
}
