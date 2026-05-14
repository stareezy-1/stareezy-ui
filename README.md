# Stareezy UI

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/5fb5ee25-cef6-451a-af4a-2f92de479655" />


A fully typed, object-based design token system and component library for cross-platform React Native and web applications.

[![CI](https://github.com/stareezy-1/stareezy-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/stareezy-1/stareezy-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@stareezy-ui/tokens)](https://www.npmjs.com/package/@stareezy-ui/tokens)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

```tsx
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { Box, Text, Button } from "@stareezy-ui/components";

<Box bg={colors.celurenBlue[500]} p={spacing[4]} rounded={radius.md}>
  <Text type="M-heading-bold" text="Hello, Stareezy UI" />
  <Button variant="primary" text="Get Started" />
</Box>;
```

## Why Stareezy UI?

- **Typed tokens** — every color, spacing, and radius value is a `Token<T>` object with full TypeScript autocomplete
- **O(1) runtime** — style registry built once at init, `resolve(token)` is a single `Map.get()`
- **Build compiler** — Babel/Vite plugin extracts token props at build time, emitting atomic CSS
- **Theme system** — light/dark themes via CSS variables, zero JS re-renders on switch
- **Cross-platform** — same token API on web and React Native
- **Tree-shakeable** — import `colors` without pulling in `spacing` or `typography`

## Packages

| Package                                            | Description                                                    | npm                                                                                                                   |
| -------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`@stareezy-ui/tokens`](./packages/tokens)         | Token factory, all token definitions, theme system, `createUi` | [![npm](https://img.shields.io/npm/v/@stareezy-ui/tokens)](https://www.npmjs.com/package/@stareezy-ui/tokens)         |
| [`@stareezy-ui/components`](./packages/components) | 17+ cross-platform components                                  | [![npm](https://img.shields.io/npm/v/@stareezy-ui/components)](https://www.npmjs.com/package/@stareezy-ui/components) |
| [`@stareezy-ui/runtime`](./packages/runtime)       | O(1) style registry, web and RN adapters                       | [![npm](https://img.shields.io/npm/v/@stareezy-ui/runtime)](https://www.npmjs.com/package/@stareezy-ui/runtime)       |
| [`@stareezy-ui/compiler`](./packages/compiler)     | Babel/Vite build-time transform                                | [![npm](https://img.shields.io/npm/v/@stareezy-ui/compiler)](https://www.npmjs.com/package/@stareezy-ui/compiler)     |
| [`@stareezy-ui/core`](./packages/core)             | Utilities, hooks, platform helpers                             | [![npm](https://img.shields.io/npm/v/@stareezy-ui/core)](https://www.npmjs.com/package/@stareezy-ui/core)             |
| [`@stareezy-ui/stylesheet`](./packages/stylesheet) | Atomic CSS sheet management                                    | [![npm](https://img.shields.io/npm/v/@stareezy-ui/stylesheet)](https://www.npmjs.com/package/@stareezy-ui/stylesheet) |

## Apps

| App                                    | Description                                                |
| -------------------------------------- | ---------------------------------------------------------- |
| [`apps/docs`](./apps/docs)             | Documentation site — Next.js + Token Explorer + Playground |
| [`apps/storybook`](./apps/storybook)   | Component stories — Storybook 9                            |
| [`apps/playground`](./apps/playground) | Standalone live code playground                            |

## Quick Start

### Web (React / Next.js / Vite)

```bash
# Tokens only (zero dependencies)
pnpm add @stareezy-ui/tokens

# Full component library
pnpm add @stareezy-ui/tokens @stareezy-ui/components @stareezy-ui/runtime

# Build-time compiler (dev dependency)
pnpm add -D @stareezy-ui/compiler
```

### React Native (Expo / bare workflow)

```bash
yarn add @stareezy-ui/tokens @stareezy-ui/components @stareezy-ui/runtime
yarn add -D @stareezy-ui/compiler

# Optional — only needed if you use the Slider component
yarn add @react-native-community/slider
npx pod-install  # bare workflow only
```

**metro.config.js** — enable package exports resolution:

```js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
```

**babel.config.js** — add the stareezy plugin:

```js
const { stareezyBabelPlugin } = require("@stareezy-ui/compiler/babel");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      stareezyBabelPlugin(),
      // keep @tamagui/babel-plugin last if you use Tamagui
    ],
  };
};
```

Wrap your app:

```tsx
import { ThemeProvider } from "@stareezy-ui/tokens";

export default function App() {
  return <ThemeProvider theme="light">{/* your app */}</ThemeProvider>;
}
```

Use tokens:

```tsx
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { Box, Text } from "@stareezy-ui/components";

function Card() {
  return (
    <Box bg={colors.celurenBlue[500]} p={spacing[4]} rounded={radius.md}>
      <Text
        type="M-heading-bold"
        text="Hello world"
        color={colors.neutral[10].value}
      />
    </Box>
  );
}
```

Custom configuration with `createUi`:

```ts
import { createUi, token } from "@stareezy-ui/tokens";

const ui = createUi({
  tokens: {
    brand: {
      primary: token("#FF6B35", "brand-primary"),
    },
  },
  breakpoints: { sm: 640, md: 768, lg: 1024 },
});

ui.tokens.brand.primary.value; // "#FF6B35"
```

## Monorepo Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Run tests
pnpm test

# Type check
pnpm typecheck

# Start docs dev server
pnpm --filter @stareezy-ui/docs dev

# Start Storybook
pnpm --filter @stareezy-ui/storybook storybook
```

## Architecture

```
packages/tokens      ← zero deps, token definitions + theme system
    ↓
packages/core        ← utilities, hooks, platform detection
packages/stylesheet  ← atomic CSS injection
    ↓
packages/runtime     ← O(1) style registry, web + RN adapters
    ↓
packages/compiler    ← Babel/Vite build-time transform (build-only dep)
    ↓
packages/components  ← 17+ cross-platform UI components
```

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make changes and add a changeset: `pnpm changeset`
4. Push and open a PR

## License

MIT © [Stareezy UI](https://github.com/stareezy-1)
