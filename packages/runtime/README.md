# @quasify-ui/runtime

O(1) style registry and platform adapters for Quasify UI. Resolves token references to CSS class names (web) or StyleSheet IDs (React Native) in constant time.

[![npm](https://img.shields.io/npm/v/@quasify-ui/runtime)](https://www.npmjs.com/package/@quasify-ui/runtime)

## Install

```bash
pnpm add @quasify-ui/tokens @quasify-ui/runtime
```

## Usage

The runtime is used internally by `@quasify-ui/components`. You only need it directly if you're building custom components.

```ts
import { createWebRuntime } from "@quasify-ui/runtime";
import { colors, spacing } from "@quasify-ui/tokens";

const runtime = createWebRuntime();

// Register tokens once at app init
runtime.register([colors.celurenBlue[500], spacing[4]]);

// Resolve to CSS class name — O(1)
const className = runtime.resolve(colors.celurenBlue[500]);
// → "sz-celurenBlue-500"
```

### React Native

```ts
import { createNativeRuntime } from "@quasify-ui/runtime";

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
