# @quasify-ui/stylesheet

Atomic CSS sheet management with responsive / media-query injection for Quasify UI web builds.

[![npm](https://img.shields.io/npm/v/@quasify-ui/stylesheet)](https://www.npmjs.com/package/@quasify-ui/stylesheet)

## Install

```bash
pnpm add @quasify-ui/stylesheet
```

## Usage

Used internally by `@quasify-ui/runtime`. You only need this directly for custom runtime adapters or for injecting styles outside of `Box`.

```ts
import { AtomicStyleSheet } from "@quasify-ui/stylesheet";

const sheet = new AtomicStyleSheet();

// Inject a token-based atomic rule (deduplicates by token ID)
sheet.inject("primary-500", "background-color", "#024CCE");
// → .sz-primary-500 { background-color: var(--primary-500); }

// Write / replace the :root CSS variable block
sheet.injectRootVariables([
  { id: "primary-500", value: "#024CCE" },
  { id: "spacing-4", value: 4 },
]);
// → :root { --primary-500: #024CCE; --spacing-4: 4; }
```

## Responsive injection

`injectResponsive` accepts the same responsive object syntax that `Box` props accept. Breakpoints are synced from `createUi({ media })` via the shared global channel.

```ts
// Responsive object — emits base + @media rules
sheet.injectResponsive("szr-card", { base: "8px", md: "16px", lg: "24px" }, [
  "padding",
]);
// → .szr-card { padding: 8px }
// → @media(min-width:768px){ .szr-card { padding: 16px } }
// → @media(min-width:1024px){ .szr-card { padding: 24px } }

// Batch version for multiple props
sheet.injectComponentStyle("szr-hero", [
  { cssProperties: ["padding"], value: { base: "16px", md: "32px" } },
  { cssProperties: ["background-color"], value: "var(--surface)" },
]);
```

## Standalone helpers

```ts
import {
  getBreakpoints,
  isResponsiveValue,
  buildBreakpointEntries,
  resolveResponsive,
  buildResponsiveCss,
  buildComponentCss,
  tokenIdToClassName,
  buildScopeClass,
} from "@quasify-ui/stylesheet";

// Read the current breakpoint map (synced from createUi({ media }))
getBreakpoints(); // { sm: 480, md: 768, lg: 1024, xl: 1280, "2xl": 1536 }

// Type guard
isResponsiveValue({ base: "8px", md: "16px" }); // true
isResponsiveValue("8px"); // false

// Build CSS without touching the DOM
const css = buildResponsiveCss(".szr-hero", { base: "16px", md: "32px" }, [
  "padding",
]);

// React Native: resolve a responsive value for a given window width
resolveResponsive({ base: 8, md: 16 }, 800); // 16

// Class name helpers
tokenIdToClassName("primary-500"); // "sz-primary-500"
buildScopeClass("r1abc"); // "szr-r1abc"
```

## License

MIT
