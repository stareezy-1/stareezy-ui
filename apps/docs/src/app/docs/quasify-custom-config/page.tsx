import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "QuasifyCustomConfig",
  description:
    "Module augmentation guide for QuasifyCustomConfig — how to declare custom media breakpoints and shorthands so they flow into the Quasify UI type system.",
  alternates: { canonical: "https://ui.quasify.app/docs/quasify-custom-config" },
};

export default function QuasifyCustomConfigPage() {
  return (
    <DocPage
      title="QuasifyCustomConfig"
      description="Module augmentation pattern that feeds your createUi configuration into the Quasify UI type system — enabling typed breakpoints and custom shorthand props everywhere."
      badge="API Reference"
      icon="⬢"
      badgeColor="#5D2555"
    >
      <h2>What is QuasifyCustomConfig?</h2>
      <p>
        <code>QuasifyCustomConfig</code> is a TypeScript interface exported from{" "}
        <code>@quasify-ui/tokens</code> that acts as a bridge between your{" "}
        <code>createUi()</code> configuration and the rest of the type system.
        By augmenting it with <code>typeof ui</code>, you inject your custom
        breakpoints and shorthands into <code>BreakpointKey</code>,{" "}
        <code>BoxProps</code>, and <code>BoxLayoutProps</code>.
      </p>

      <Callout type="info">
        Module augmentation is a standard TypeScript mechanism — you are not
        patching a runtime object, only extending a type declaration. It has
        zero runtime cost.
      </Callout>

      {/* ── How to augment ───────────────────────────────────────────────── */}
      <h2>How to augment QuasifyCustomConfig</h2>
      <p>
        Add the <code>declare module</code> block after calling{" "}
        <code>createUi()</code> in your <code>quasify.config.ts</code>:
      </p>
      <pre>
        <code>{`// quasify.config.ts
import { createUi, themes } from '@quasify-ui/tokens'

export const ui = createUi({
  themes: {
    aurora:  themes.aurora,
    dark:    themes.dark,
    light:   themes.light,
  },
  media: {
    sm:  480,
    md:  768,
    lg:  1024,
    xl:  1280,
  },
  shorthands: {
    p:  'padding',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    m:  'margin',
    br: 'borderRadius',
    w:  'width',
    h:  'height',
    f:  'flex',
  } as const,  // ← as const is required
})

// ── Module augmentation ──────────────────────────────────────────────
// Extend QuasifyCustomConfig with the full type of your ui config.
// This single declaration makes your media keys and shorthands
// available everywhere in the type system.
type AppConfig = typeof ui
declare module '@quasify-ui/tokens' {
  interface QuasifyCustomConfig extends AppConfig {}
}

export default ui`}</code>
      </pre>

      {/* ── What changes after augmentation ─────────────────────────────── */}
      <h2>What changes after augmentation</h2>

      <Step n={1} title="BreakpointKey derives from your media config">
        <pre>
          <code>{`// Before augmentation (default):
// BreakpointKey = "base" | "sm" | "md" | "lg" | "xl" | "2xl"

// After augmenting with { media: { sm: 480, md: 768, lg: 1024, xl: 1280 } }:
// BreakpointKey = "base" | "sm" | "md" | "lg" | "xl"

// TypeScript will now error on undeclared keys:
<Box p={{ '2xl': 24 }} />  // ❌ "2xl" is not in your media config`}</code>
        </pre>
      </Step>

      <Step
        n={2}
        title="Custom shorthands appear on BoxProps and every component"
      >
        <pre>
          <code>{`// Before augmentation:
<Box br={8} />   // ❌ Property 'br' does not exist on type 'BoxProps'

// After augmentation:
<Box br={8} />   // ✅ br → borderRadius, fully typed
<Box p={12} />   // ✅ p  → padding
<Box w="100%" /> // ✅ w  → width

// Also works on all other components:
<Button br={12} p={{ base: 8, md: 12 }} />
<Input  w={{ base: '100%', md: 360 }} />`}</code>
        </pre>
      </Step>

      <Step n={3} title="Responsive objects on shorthands are typed">
        <pre>
          <code>{`// Custom shorthands accept responsive objects after augmentation:
<Box br={{ base: 4, md: 8, lg: 12 }} />  // ✅ typed
<Box px={{ base: 12, lg: 24 }} />        // ✅ typed

// Type safety applies here too:
<Box br={{ tablet: 8 }} />  // ❌ "tablet" not in BreakpointKey`}</code>
        </pre>
      </Step>

      <Step n={4} title="$-prefixed breakpoint props derive from your keys">
        <pre>
          <code>{`// With { media: { sm, md, lg, xl } }, these $-props are available:
<Box $sm={{ p: 8 }} />   // ✅
<Box $md={{ p: 16 }} />  // ✅
<Box $lg={{ p: 24 }} />  // ✅
<Box $xl={{ p: 32 }} />  // ✅

// Undeclared breakpoints are not available:
<Box $2xl={{ p: 40 }} /> // ❌ "2xl" not in your media config`}</code>
        </pre>
      </Step>

      {/* ── Custom media breakpoints ─────────────────────────────────────── */}
      <h2>Custom media breakpoints</h2>
      <p>
        You can declare any breakpoint names you want — there is no restriction
        to <code>sm</code>, <code>md</code>, etc. The values must be{" "}
        <code>number</code> (min-width in pixels).
      </p>
      <pre>
        <code>{`export const ui = createUi({
  media: {
    compact:  600,
    regular:  900,
    expanded: 1200,
  },
  // ...
})

// After augmentation:
// BreakpointKey = "base" | "compact" | "regular" | "expanded"

<Box p={{ base: 8, compact: 12, regular: 16, expanded: 24 }} />
<Box $compact={{ flexDirection: 'row' }} />
<Box $expanded={{ maxWidth: 1200, mx: 'auto' }} />`}</code>
      </pre>

      {/* ── Custom shorthands ────────────────────────────────────────────── */}
      <h2>Custom shorthands declaration</h2>
      <p>
        Shorthands map a short prop name to a CSS/React Native style property.
        The <code>as const</code> assertion is required so TypeScript infers
        literal key types rather than widening to <code>string</code>.
      </p>
      <pre>
        <code>{`export const ui = createUi({
  shorthands: {
    // spacing
    p:   'padding',
    px:  'paddingHorizontal',
    py:  'paddingVertical',
    pt:  'paddingTop',
    pb:  'paddingBottom',
    pl:  'paddingLeft',
    pr:  'paddingRight',
    m:   'margin',
    mx:  'marginHorizontal',
    my:  'marginVertical',
    mt:  'marginTop',
    mb:  'marginBottom',
    // sizing
    w:   'width',
    h:   'height',
    minW: 'minWidth',
    maxW: 'maxWidth',
    // appearance
    br:  'borderRadius',
    bg:  'backgroundColor',
    f:   'flex',
    z:   'zIndex',
  } as const,  // ← required
})`}</code>
      </pre>

      <Callout type="warning">
        Omitting <code>as const</code> is the most common mistake. Without it,
        TypeScript sees <code>Record&lt;string, string&gt;</code> instead of the
        literal key types, and no new props are added to <code>BoxProps</code>.
      </Callout>

      {/* ── Minimal config ───────────────────────────────────────────────── */}
      <h2>Minimal config (no augmentation needed)</h2>
      <p>
        If you do not call <code>createUi()</code> or do not augment{" "}
        <code>QuasifyCustomConfig</code>, the defaults apply:
      </p>
      <ul>
        <li>
          <code>BreakpointKey</code> ={" "}
          <code>"base" | "sm" | "md" | "lg" | "xl" | "2xl"</code>
        </li>
        <li>No custom shorthand props on BoxProps</li>
        <li>
          No <code>$</code>-prefixed breakpoint props beyond the defaults
        </li>
      </ul>
      <p>
        You can start without augmentation and add it later as your app grows.
      </p>

      {/* ── Where to put the augmentation ───────────────────────────────── */}
      <h2>Where to put the augmentation</h2>
      <p>
        The <code>declare module</code> block must be in a <em>module</em> — a
        file that has at least one <code>import</code> or <code>export</code>{" "}
        statement. The recommended location is your{" "}
        <code>quasify.config.ts</code>, which satisfies this requirement
        because it already imports from <code>@quasify-ui/tokens</code>.
      </p>
      <p>
        TypeScript picks up the augmentation automatically as long as the file
        is included in your <code>tsconfig.json</code>&apos;s{" "}
        <code>include</code> paths.
      </p>

      <Callout type="tip">
        The compiler also reads <code>quasify.config.ts</code> at build time to
        pick up your custom shorthands. Keeping the augmentation in the same
        file means there is exactly one source of truth for your configuration.
      </Callout>
    </DocPage>
  );
}
