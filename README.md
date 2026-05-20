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

Stareezy UI is a **fully typed, object-based design token system and cross-platform component library** for React Native and web. It solves a problem that every design system eventually hits: your tokens are strings, your styles are untyped, and your theme switching causes re-renders.

Every design value — color, spacing, radius, typography, shadow, motion — is a typed `Token<T>` object. The compiler extracts token props at build time into atomic CSS. The runtime resolves styles in O(1) via a `Map`. Theme switching is pure CSS variables — zero JavaScript re-renders.

```tsx
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { Box, Text, Button } from "@stareezy-ui/components";

// Full TypeScript autocomplete. Same code on web and React Native.
<Box bg={colors.celurenBlue[500]} p={spacing[4]} rounded={radius.md}>
  <Text type="M-heading-bold" text="Hello, Stareezy UI" />
  <Button variant="primary" text="Get Started" />
</Box>;
```

---

## Why not Tamagui, Radix, Shadcn, or Chakra?

|                         | Stareezy UI     | Tamagui         | Radix UI    | Shadcn UI   | Chakra UI   |
| ----------------------- | --------------- | --------------- | ----------- | ----------- | ----------- |
| Typed token objects     | ✅ `Token<T>`   | ⚠️ string-based | ❌          | ❌          | ⚠️          |
| React Native + Web      | ✅ same API     | ✅              | ❌ web only | ❌ web only | ❌ web only |
| O(1) style runtime      | ✅ Map.get()    | ⚠️              | N/A         | N/A         | ❌          |
| Build-time compiler     | ✅ Babel + Vite | ✅              | ❌          | ❌          | ❌          |
| Zero-dep token layer    | ✅              | ❌              | ❌          | ❌          | ❌          |
| CDN / script tag        | ✅              | ❌              | ❌          | ❌          | ❌          |
| Theme switch re-renders | ❌ none         | ⚠️ some         | N/A         | N/A         | ⚠️ some     |

**The core difference:** Stareezy UI treats tokens as first-class typed objects, not strings. This enables the compiler to detect token usage statically, the runtime to resolve styles without parsing, and TypeScript to catch invalid values at compile time — not at runtime.

---

## Packages

| Package                                            | Description                                                         | Size                                                                                                                  |
| -------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`@stareezy-ui/tokens`](./packages/tokens)         | Token definitions, theme system, `createUi` — **zero dependencies** | [![npm](https://img.shields.io/npm/v/@stareezy-ui/tokens)](https://www.npmjs.com/package/@stareezy-ui/tokens)         |
| [`@stareezy-ui/components`](./packages/components) | 70+ cross-platform UI components                                    | [![npm](https://img.shields.io/npm/v/@stareezy-ui/components)](https://www.npmjs.com/package/@stareezy-ui/components) |
| [`@stareezy-ui/runtime`](./packages/runtime)       | O(1) style registry, web + RN adapters                              | [![npm](https://img.shields.io/npm/v/@stareezy-ui/runtime)](https://www.npmjs.com/package/@stareezy-ui/runtime)       |
| [`@stareezy-ui/compiler`](./packages/compiler)     | Babel/Vite build-time transform                                     | [![npm](https://img.shields.io/npm/v/@stareezy-ui/compiler)](https://www.npmjs.com/package/@stareezy-ui/compiler)     |
| [`@stareezy-ui/core`](./packages/core)             | Utilities, hooks, platform helpers                                  | [![npm](https://img.shields.io/npm/v/@stareezy-ui/core)](https://www.npmjs.com/package/@stareezy-ui/core)             |
| [`@stareezy-ui/stylesheet`](./packages/stylesheet) | Atomic CSS sheet management                                         | [![npm](https://img.shields.io/npm/v/@stareezy-ui/stylesheet)](https://www.npmjs.com/package/@stareezy-ui/stylesheet) |

Install only what you need. Every package is independently tree-shakeable.

---

## Quick Start

### Web — React / Next.js / Vite

```bash
# Tokens only (zero dependencies, ~25 KB)
pnpm add @stareezy-ui/tokens

# Full component library
pnpm add @stareezy-ui/tokens @stareezy-ui/components @stareezy-ui/runtime

# Build-time compiler (optional, dev dependency)
pnpm add -D @stareezy-ui/compiler
```

**vite.config.ts**

```ts
import { stareezyVitePlugin } from "@stareezy-ui/compiler";

export default {
  plugins: [stareezyVitePlugin()],
};
```

**App root**

```tsx
import { ThemeProvider } from "@stareezy-ui/tokens";

export default function App() {
  return <ThemeProvider theme="light">{/* your app */}</ThemeProvider>;
}
```

### React Native — Expo / bare workflow

```bash
yarn add @stareezy-ui/tokens @stareezy-ui/components @stareezy-ui/runtime
yarn add -D @stareezy-ui/compiler

# Only needed for the Slider component
yarn add @react-native-community/slider
npx pod-install  # bare workflow only
```

**metro.config.js**

```js
const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
config.resolver.unstable_enablePackageExports = true;
module.exports = config;
```

**babel.config.js**

```js
const { stareezyBabelPlugin } = require("@stareezy-ui/compiler/babel");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [stareezyBabelPlugin()],
  };
};
```

### CDN / Script tag

No bundler? Load directly from jsDelivr:

```html
<!-- React (required peer dep) -->
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>

<!-- Tokens only (~25 KB) -->
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/tokens/dist/cdn/stareezy-tokens.global.js"></script>

<!-- OR: Full component library (~118 KB) -->
<script src="https://cdn.jsdelivr.net/npm/@stareezy-ui/components/dist/cdn/stareezy-ui.global.js"></script>

<script>
  const { colors, spacing } = StareezyTokens;
  console.log(colors.celurenBlue[500].value); // "#024CCE"
</script>
```

See the [CDN usage guide](https://ui.stareezy.tech/docs/cdn) for full documentation.

---

## Token System

Every design value is a typed `Token<T>` object:

```ts
type Token<T> = {
  readonly __token: true; // compiler discriminant
  readonly id: string; // stable identifier
  readonly value: T; // resolved primitive
};
```

```ts
import {
  colors,
  spacing,
  radius,
  typography,
  shadow,
  timing,
} from "@stareezy-ui/tokens";

// Full TypeScript autocomplete on every value
colors.celurenBlue[500].value; // "#024CCE"
spacing[4].value; // 16
radius.md.value; // 8

// Use .value anywhere tokens aren't accepted (inline styles, StyleSheet, etc.)
const style = { backgroundColor: colors.celurenBlue[500].value };
```

### Custom tokens with `createUi`

```ts
import { createUi, token } from "@stareezy-ui/tokens";

const ui = createUi({
  tokens: {
    brand: {
      primary: token("#FF6B35", "brand-primary"),
      secondary: token("#004E89", "brand-secondary"),
    },
  },
  breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280 },
  themes: {
    aurora: {
      "bg.primary": token("#050505", "aurora-bg-primary"),
      "text.primary": token("#ffffff", "aurora-text-primary"),
    },
  },
});

ui.tokens.brand.primary.value; // "#FF6B35" — fully typed
```

---

## Components

70+ cross-platform components that work identically on web and React Native:

**Primitives** — `Box`, `Text`, `TouchableOpacity`

**Inputs** — `Button`, `Input`, `Checkbox`, `Switch`, `Slider`, `Dropdown`

**Feedback** — `Badge`, `Toast`, `Progress`, `CircularProgress`, `Spinner`, `Skeleton`

**Overlay** — `Modal`, `BottomSheets`, `Tooltip`

**Navigation** — `Tabs`, `Accordion`, `CommandPalette`

**Layout** — `Card`, `Divider`, `Avatar`, `Clipboard`

All components accept token objects directly as props:

```tsx
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { Box, Text, Badge, Button } from "@stareezy-ui/components";

function ProfileCard() {
  return (
    <Box bg={colors.neutral[50]} p={spacing[6]} rounded={radius.lg}>
      <Badge variant="green" label="Active" />
      <Text type="L-heading-bold" text="Jane Smith" />
      <Text
        type="S-body"
        text="Senior Engineer"
        color={colors.neutral[500].value}
      />
      <Button variant="primary" text="View Profile" />
    </Box>
  );
}
```

---

## Theming

Themes are CSS variable maps — switching themes is a single attribute change, no JavaScript re-renders:

```tsx
import { ThemeProvider, useThemeSwitch } from "@stareezy-ui/tokens";

// Built-in themes: "light" | "dark" | "aurora"
<ThemeProvider theme="aurora">
  <App />
</ThemeProvider>;

// Switch at runtime — zero re-renders
function ThemeToggle() {
  const { setTheme } = useThemeSwitch();
  return <Button onPress={() => setTheme("dark")} text="Dark mode" />;
}
```

Custom theme overrides:

```ts
const ui = createUi({
  themes: {
    brand: {
      "bg.primary": token("#0a0a0a", "brand-bg"),
      "text.primary": token("#f5f5f5", "brand-text"),
      accent: token("#FF6B35", "brand-accent"),
    },
  },
});
```

---

## Architecture

```
@stareezy-ui/tokens       ← zero deps — token definitions, theme system, createUi
         ↓
@stareezy-ui/core         ← utilities, hooks, platform detection
@stareezy-ui/stylesheet   ← atomic CSS injection, :root variable management
         ↓
@stareezy-ui/runtime      ← O(1) style registry, web + RN adapters
         ↓
@stareezy-ui/compiler     ← Babel/Vite build-time transform (devDependency only)
         ↓
@stareezy-ui/components   ← 70+ cross-platform UI components
```

**Build dependency chain:** `tokens` → `core` / `stylesheet` → `runtime` → `compiler` → `components`

The compiler is optional. Without it, the runtime adapter handles style resolution at render time. With it, token props are extracted at build time into atomic CSS classes — zero runtime cost.

---

## Accessibility

Stareezy UI components are built with accessibility in mind:

- Keyboard navigation support on all interactive components
- ARIA attributes on Modal, Tooltip, Accordion, Tabs, CommandPalette
- Focus management and focus trapping in overlays
- `prefers-reduced-motion` respected in animation tokens
- Screen reader labels on icon-only buttons and controls

> Full WCAG 2.1 AA compliance requires manual testing with assistive technologies. We provide the primitives — your implementation determines the outcome.

---

## SSR Support

The token system and theme provider are SSR-safe. CSS variables are injected server-side, so there is no flash of unstyled content on hydration. The `ThemeProvider` accepts an initial theme that matches the server-rendered output.

```tsx
// Next.js App Router
import { ThemeProvider } from "@stareezy-ui/tokens";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider theme="light">{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

---

## Testing

Tests use [Vitest](https://vitest.dev/) with [fast-check](https://fast-check.dev/) for property-based testing:

```bash
pnpm test              # run all tests
pnpm typecheck         # type-check all packages
```

Property tests cover token serialization, style resolution, compiler transforms, and component prop validation. Each package runs tests independently — no cross-package test pollution.

---

## Monorepo Development

```bash
# Install all dependencies
pnpm install

# Build all packages in dependency order
pnpm run build

# Build CDN bundles (IIFE)
pnpm run build:cdn

# Run all tests
pnpm test

# Type-check all packages
pnpm typecheck

# Start docs dev server
pnpm --filter @stareezy-ui/docs dev

# Start Storybook
pnpm --filter @stareezy-ui/storybook storybook

# Build a single package
pnpm --filter @stareezy-ui/tokens build
```

### Release

```bash
pnpm changeset              # describe changes, select version bump
pnpm run version-packages   # apply version bumps + update CHANGELOGs
pnpm run release            # build → build:cdn → publish to npm
```

---

## Apps

| App                                    | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| [`apps/docs`](./apps/docs)             | Documentation site — Next.js, Token Explorer, CDN guide |
| [`apps/storybook`](./apps/storybook)   | Component stories — Storybook 8                         |
| [`apps/playground`](./apps/playground) | Live code sandbox                                       |

---

## Roadmap

- [ ] CLI — `npx create-stareezy-app` scaffolding
- [ ] VS Code extension — token autocomplete in style files
- [ ] Figma plugin — sync design tokens from Figma variables
- [ ] React Server Components adapter
- [ ] Animation system — token-driven motion primitives
- [ ] More components — DataTable, DatePicker, Combobox, FileUpload
- [ ] Accessibility audit — full WCAG 2.1 AA certification per component

---

## Contributing

Contributions are welcome. Please read the guidelines before opening a PR.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Add a changeset: `pnpm changeset`
5. Push and open a pull request

For bug reports and feature requests, open an [issue](https://github.com/stareezy-1/stareezy-ui/issues).

---

## License

MIT © [Stareezy UI](https://github.com/stareezy-1)
