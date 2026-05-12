# @stareezy-ui/runtime

O(1) token-to-style lookup and platform adapters for Stareezy UI.

## Installation

```sh
npm install @stareezy-ui/runtime
```

## Usage

### Web

```ts
import { createWebRuntime } from "@stareezy-ui/runtime";
import { colors, spacing } from "@stareezy-ui/tokens";

const runtime = createWebRuntime();
runtime.register([colors.celurenBlue[500], spacing.medium]);

// Returns a CSS class name string — O(1) lookup
const className = runtime.resolve(colors.celurenBlue[500]);
// e.g. 'sz-celurenBlue-500'
```

### React Native

```ts
import { createNativeRuntime } from "@stareezy-ui/runtime";
import { colors } from "@stareezy-ui/tokens";

const runtime = createNativeRuntime();
runtime.register([colors.celurenBlue[500]]);

// Returns a StyleSheet entry ID — O(1) lookup
const styleId = runtime.resolve(colors.celurenBlue[500]);
// e.g. 42
```
