# Stareezy UI

<img width="1536" height="1024" alt="Stareezy UI — Typed Design Token System" src="https://github.com/user-attachments/assets/5fb5ee25-cef6-451a-af4a-2f92de479655" />

**The typed design token system for React Native and web — one token API, every platform.**

[![CI](https://github.com/stareezy-1/stareezy-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/stareezy-1/stareezy-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@stareezy-ui/tokens)](https://www.npmjs.com/package/@stareezy-ui/tokens)
[![npm downloads](https://img.shields.io/npm/dm/@stareezy-ui/tokens)](https://www.npmjs.com/package/@stareezy-ui/tokens)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![tree-shakeable](https://img.shields.io/badge/tree--shakeable-yes-brightgreen)](https://bundlephobia.com/package/@stareezy-ui/tokens)

---

## What is Stareezy UI?

Stareezy UI is a **fully typed, object-based design token system and cross-platform component library** for React Native and web. Every design value — color, spacing, radius, typography, shadow, motion — is a typed `Token<T>` object. Theme switching is pure CSS variables — zero JavaScript re-renders.

```tsx
import { colors, spacing, t } from "@stareezy-ui/tokens";
import { Box, Text, Button } from "@stareezy-ui/components";

// Full TypeScript autocomplete. Same code on web and React Native.
// t.* props resolve to the current theme's value at render time.
<Box bg={t.backgrounds.secondary} p={spacing[4]} rounded={8}>
  <Text type="M-heading-bold" text="Hello, Stareezy UI" />
  <Button type="Primary" text="Get Started" />
</Box>;
```

---

## Scaffold a project in one command

```bash
# Next.js 15 App Router
npx stareezy create my-app --template next

# Vite + React 19
npx stareezy create my-app --template vite

# Expo SDK 56 (React Native 0.85 + React 19)
npx stareezy create my-app --template expo
```

Each template ships pre-wired with `stareezy.config.ts`, compiler/runtime setup, and `ThemeProvider`. No manual wiring needed.

---

## What changed in v0.4

### Config-driven responsive type system (Core Vision Gap closed)

`createUi({ media, shorthands })` now drives the entire type system. Declare breakpoints once and every prop, autocomplete, and error derives from your config — no separate manual wiring.

```ts
const ui = createUi({
  media: { sm: 480, md: 768, lg: 1024 },
  shorthands: { p: "padding", br: "borderRadius", w: "width" } as const,
});
// BreakpointKey is now "base" | "sm" | "md" | "lg" — from your config
// <Box p={{ base: 8, md: 16, lg: 24 }} />  ← fully typed
```

### `$`-prefixed breakpoint-as-prop syntax (Tamagui-style)

Group multiple style props under a single breakpoint key:

```tsx
<Box $md={{ p: 16, br: 8 }} $lg={{ p: 24, br: 12, flexDirection: "row" }} />
```

### `BoxLayoutProps` on every component

Every component in the library now accepts spacing, sizing, flex, and `$`-prefixed props:

```tsx
<Button p={{ base: 8, md: 12 }} w={{ base: "100%", md: "auto" }} />
<Input w={{ base: "100%", md: 360 }} mb={8} />
```

### React Server Components — `./server` entry

Hook-free primitives safe for Next.js App Router Server Components:

```tsx
// In a Server Component — no "use client" needed
import { Box, Stack, Text, Divider } from "@stareezy-ui/components/server";
```

### 6 new components

Breadcrumb, Pagination, Table, Tag, Tooltip, Drawer — all theme-reactive, all accessible, all extending `BoxLayoutProps`.

### All existing components are now theme-reactive

Every existing component now resolves colors from the active theme at render time via `useThemedColors()`. No more components locked to the aurora or light palette.

### Five themes

Added the **Quasar** theme (deep violet, pulsar orange accent). All five themes: `light`, `dark`, `aurora`, `steins-gate`, `quasar`.

### @stareezy-ui/cli

First-party CLI with `create`, `add`, and `init` commands:

```bash
npx stareezy create my-app --template next   # scaffold pre-wired project
npx stareezy init                             # add wiring to existing project
npx stareezy add button input card drawer    # add components with dep resolution
```

---

## Packages

| Package                                            | Description                                                         | Size                                                                                                                  |
| -------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`@stareezy-ui/tokens`](./packages/tokens)         | Token definitions, theme system, `createUi` — **zero dependencies** | [![npm](https://img.shields.io/npm/v/@stareezy-ui/tokens)](https://www.npmjs.com/package/@stareezy-ui/tokens)         |
| [`@stareezy-ui/components`](./packages/components) | 31+ cross-platform UI components                                    | [![npm](https://img.shields.io/npm/v/@stareezy-ui/components)](https://www.npmjs.com/package/@stareezy-ui/components) |
| [`@stareezy-ui/cli`](./packages/cli)               | Scaffolding CLI — `create`, `add`, `init`                           | [![npm](https://img.shields.io/npm/v/@stareezy-ui/cli)](https://www.npmjs.com/package/@stareezy-ui/cli)               |
| [`@stareezy-ui/runtime`](./packages/runtime)       | O(1) style registry, web + RN adapters                              | [![npm](https://img.shields.io/npm/v/@stareezy-ui/runtime)](https://www.npmjs.com/package/@stareezy-ui/runtime)       |
| [`@stareezy-ui/compiler`](./packages/compiler)     | Babel/Vite/Metro build-time transform                               | [![npm](https://img.shields.io/npm/v/@stareezy-ui/compiler)](https://www.npmjs.com/package/@stareezy-ui/compiler)     |
| [`@stareezy-ui/core`](./packages/core)             | Utilities, hooks, platform helpers                                  | [![npm](https://img.shields.io/npm/v/@stareezy-ui/core)](https://www.npmjs.com/package/@stareezy-ui/core)             |
| [`@stareezy-ui/stylesheet`](./packages/stylesheet) | Atomic CSS sheet management                                         | [![npm](https://img.shields.io/npm/v/@stareezy-ui/stylesheet)](https://www.npmjs.com/package/@stareezy-ui/stylesheet) |
| [`@stareezy-ui/mcp-server`](./packages/mcp-server) | MCP protocol server for AI tool integration                         | [![npm](https://img.shields.io/npm/v/@stareezy-ui/mcp-server)](https://www.npmjs.com/package/@stareezy-ui/mcp-server) |

---

## Quick Start

### CLI (fastest)

```bash
npx stareezy create my-app --template next
cd my-app
pnpm install
pnpm dev
```

### Manual — Web (React 19 / Next.js 15 / Vite 7)

```bash
pnpm add @stareezy-ui/tokens @stareezy-ui/components @stareezy-ui/runtime
pnpm add -D @stareezy-ui/compiler
```

**stareezy.config.ts** (project root):

```ts
import { createUi, themes } from "@stareezy-ui/tokens";

const ui = createUi({
  themes: { aurora: themes.aurora, dark: themes.dark, light: themes.light },
  media: { sm: 480, md: 768, lg: 1024, xl: 1280, "2xl": 1536 },
  shorthands: {
    p: "padding", m: "margin", br: "borderRadius", w: "width",
  } as const,
});

declare module "@stareezy-ui/tokens" {
  interface SzrCustomConfig extends typeof ui {}
}
export default ui;
```

**vite.config.ts** (or in `next.config.ts` webpack config):

```ts
import { stareezyVitePlugin } from "@stareezy-ui/compiler";
export default { plugins: [stareezyVitePlugin()] };
```

**App root**:

```tsx
import { ThemeProvider } from "@stareezy-ui/tokens";
export default function App({ children }) {
  return <ThemeProvider defaultTheme="aurora">{children}</ThemeProvider>;
}
```

### Manual — React Native / Expo SDK 56

```bash
yarn add @stareezy-ui/tokens @stareezy-ui/components @stareezy-ui/runtime
yarn add -D @stareezy-ui/compiler
```

**metro.config.js**:

```js
const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("@stareezy-ui/compiler/metro"),
};
module.exports = config;
```

---

## Compatibility

| Framework    | Supported versions |
| ------------ | ------------------ |
| React        | 18, 19             |
| React Native | 0.81 – 0.86        |
| Expo SDK     | 54, 55, 56         |
| Next.js      | 14, 15, 16         |
| Vite         | 4, 5, 6, 7         |

All `@stareezy-ui/*` packages declare ranged `peerDependencies` — no hard-pinned major versions.

---

## Token System

Every design value is a typed `Token<T>` object:

```ts
import { colors, spacing, radius, t } from "@stareezy-ui/tokens";

colors.celurenBlue[500].value; // "#024CCE"
spacing[4].value; // 16
radius.md.value; // 8

// t.* = ThemeToken — resolves to current theme's value at render time
t.text.primary; // → "#0f1010" (light), "#f0f6fc" (dark), "#f0f0f8" (aurora)
t.backgrounds.primary; // → brand color in current theme
```

### createUi — configure once

```ts
import { createUi, themes, token } from "@stareezy-ui/tokens";

const ui = createUi({
  themes: {
    aurora: themes.aurora, dark: themes.dark, light: themes.light,
    "steins-gate": themes["steins-gate"], quasar: themes.quasar,
  },
  tokens: {
    brand: { primary: token("#FF6B35", "brand-primary") },
  },
  media: { sm: 480, md: 768, lg: 1024, xl: 1280 },
  shorthands: { bg: "backgroundColor", p: "padding", br: "borderRadius" } as const,
});

// Type augmentation — makes your config flow into BoxProps everywhere
declare module "@stareezy-ui/tokens" {
  interface SzrCustomConfig extends typeof ui {}
}
```

---

## Components

31+ cross-platform components that work identically on web and React Native.

**Primitives** — `Box`, `View`, `Text`, `HStack`, `VStack`, `Divider`

**RSC-safe** (via `./server`) — `Box`, `View`, `Stack`, `Text`, `Divider`

**Inputs** — `Button`, `Input`, `Checkbox`, `Switch`, `Slider`, `Dropdown`

**Feedback** — `Badge`, `Toast`, `Progress`, `CircularProgress`, `Spinner`, `Skeleton`

**Overlay** — `Modal`, `Drawer`, `Tooltip`

**Navigation** — `Tabs`, `Accordion`, `Breadcrumb`, `Pagination`, `CommandPalette`

**Data** — `Table`

**Display** — `Card`, `Avatar`, `Tag`, `Clipboard`, `NavBar`

All components accept `BoxLayoutProps` — responsive spacing/sizing/flex props work everywhere:

```tsx
// These all work the same way
<Button  p={{ base: 8, md: 12 }} w={{ base: "100%", md: "auto" }} />
<Input   w={{ base: "100%", md: 360 }} mb={8} />
<Card    p={{ base: 12, md: 20 }} $lg={{ flexDirection: "row" }} />
<Drawer  open={open} onClose={close} anchor="right" />
```

---

## MCP Server

Connect Claude, Cursor, and other AI tools to your design tokens and components via the [Model Context Protocol](https://modelcontextprotocol.io).

```bash
npx @stareezy-ui/mcp
```

Configure in your AI tool's MCP settings:

```json
{
  "mcpServers": {
    "stareezy-ui": {
      "command": "npx",
      "args": ["-y", "@stareezy-ui/mcp"],
      "env": { "STAREEZY_PROJECT_PATH": "/path/to/your/project" }
    }
  }
}
```

Exposes tools for token discovery, component generation, theme analysis, and code generation — all respecting your `stareezy.config.ts`.

---

## Skills for Claude

Give Claude deep knowledge of the Stareezy UI design system with installable skills covering tokens, components, theming, and best practices.

```
git clone https://github.com/stareezy-1/claude-skills.git
```

Add to Claude Desktop or Claude Code config to enable context-aware UI generation that uses your actual design tokens and component APIs.

---

## Theming

Five built-in themes — switch with a single call, zero re-renders:

```tsx
import { ThemeProvider, useThemeSwitch } from "@stareezy-ui/tokens";

// Available: "light" | "dark" | "aurora" | "steins-gate" | "quasar"
<ThemeProvider defaultTheme="aurora">
  <App />
</ThemeProvider>;

function ThemeToggle() {
  const { setTheme } = useThemeSwitch();
  return (
    <>
      <button onClick={() => setTheme("aurora")}>Aurora</button>
      <button onClick={() => setTheme("quasar")}>Quasar</button>
      <button onClick={() => setTheme("steins-gate")}>Steins;Gate</button>
    </>
  );
}
```

All components are **Theme_Reactive** — no hardcoded colors anywhere in the library. Colors come from `useThemedColors()` at render time.

---

## Architecture

```
@stareezy-ui/tokens       ← zero deps — token definitions, 5 themes, createUi, SzrCustomConfig
         ↓
@stareezy-ui/core         ← utilities, hooks, platform detection
@stareezy-ui/stylesheet   ← atomic CSS injection, :root variable management
         ↓
@stareezy-ui/runtime      ← O(1) style registry, web + RN adapters
         ↓
@stareezy-ui/compiler     ← Babel/Vite/Metro build-time transform (devDependency only)
         ↓
@stareezy-ui/components   ← 31+ cross-platform UI components (. and ./server entries)
         ↓
@stareezy-ui/cli          ← create / add / init scaffolding tool
```

---

## Monorepo Development

```bash
pnpm install                          # install all deps
pnpm run build                        # build all packages in dependency order
pnpm test                             # run all tests
pnpm typecheck                        # type-check all packages
pnpm --filter @stareezy-ui/docs dev   # start docs dev server
pnpm --filter @stareezy-ui/storybook storybook  # start Storybook
pnpm check:peers                      # verify peerDependency ranges
pnpm size                             # check bundle size budgets

# Build a single package
pnpm --filter @stareezy-ui/tokens build
pnpm --filter @stareezy-ui/cli build
```

### Release

```bash
pnpm changeset              # describe changes, select version bump
pnpm run version-packages   # apply version bumps + update CHANGELOGs
pnpm run release            # build → publish to npm
```

---

## Apps

| App                                    | Description                                                      |
| -------------------------------------- | ---------------------------------------------------------------- |
| [`apps/docs`](./apps/docs)             | Documentation site — Next.js 14, full guide coverage             |
| [`apps/storybook`](./apps/storybook)   | Component stories — Storybook 8 with Chromatic visual regression |
| [`apps/playground`](./apps/playground) | Live code sandbox                                                |
| [`apps/docs/src/app/nova`](./apps/docs/src/app/nova) | Nova — Figma-like drag & drop visual builder                     |

---

## Nova — Visual Drag & Drop Builder

[Nova](./apps/docs/src/app/nova) is a Figma-inspired visual builder at `/nova` that lets you construct UIs by dragging components onto a canvas.

- **30+ draggable components** across 8 categories (Layout, Buttons, Inputs, Data, Navigation, Overlay, Media, Feedback)
- **Canvas** with grid background, zoom (25%-200%), and component selection with orange highlight
- **Properties panel** with Style, Content, and Layers tabs
- **Token Browser** — click to apply any token (Colors, Spacing, Typography, Radius, Shadow) to the selected component
- **Code generation** with copy and `.tsx` download
- **Live preview** tab and theme switcher (quasar / aurora / steins-gate)
- **Undo/redo**, auto-save to localStorage, keyboard shortcuts

---

## Testing

```bash
pnpm test       # all tests (Vitest + fast-check property-based)
pnpm typecheck  # all packages
```

Six consolidated correctness properties (fast-check, ≥100 iterations each):

- Responsive resolution round-trip
- Breakpoint-sync invariant (`createUi` → runtime)
- `$`-group precedence over responsive object
- CLI dependency closure
- CLI init/add idempotency
- Theme-reactivity across all five themes

---

## License

MIT © [Stareezy UI](https://github.com/Stareezy-1)
