# @stareezy-ui/runtime

O(1) style registry and platform adapters for Stareezy UI. Resolves token references to CSS class names (web) or StyleSheet IDs (React Native) in constant time.

[![npm](https://img.shields.io/npm/v/@stareezy-ui/runtime)](https://www.npmjs.com/package/@stareezy-ui/runtime)

## Install

```bash
pnpm add @stareezy-ui/tokens @stareezy-ui/runtime
```

## Usage

The runtime is used internally by `@stareezy-ui/components`. You only need it directly if you're building custom components.

```ts
import { createWebRuntime } from "@stareezy-ui/runtime";
import { colors, spacing } from "@stareezy-ui/tokens";

const runtime = createWebRuntime();

// Register tokens once at app init
runtime.register([colors.celurenBlue[500], spacing[4]]);

// Resolve to CSS class name — O(1)
const className = runtime.resolve(colors.celurenBlue[500]);
// → "sz-celurenBlue-500"
```

### React Native

```ts
import { createNativeRuntime } from "@stareezy-ui/runtime";

const runtime = createNativeRuntime();
runtime.register([colors.celurenBlue[500]]);

const styleId = runtime.resolve(colors.celurenBlue[500]);
// → StyleSheet entry ID (number)
```

## API

```ts
interface RuntimeAdapter {
  register(tokens: Token<unknown>[]): void;
  resolve(token: Token<unknown>): string | number;
}

function createWebRuntime(): RuntimeAdapter;
function createNativeRuntime(): RuntimeAdapter;
```

## License

MIT
