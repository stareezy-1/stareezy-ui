# @stareezy-ui/compiler

Babel and Vite plugins for build-time token extraction and atomic CSS generation.

## Installation

```sh
npm install --save-dev @stareezy-ui/compiler
```

## Usage

### Vite

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { stareezyVitePlugin } from "@stareezy-ui/compiler";

export default defineConfig({
  plugins: [stareezyVitePlugin()],
});
```

### Babel

```json
// babel.config.json
{
  "plugins": ["@stareezy-ui/compiler/babel"]
}
```

Or programmatically:

```ts
import { stareezyBabelPlugin } from "@stareezy-ui/compiler";

// Pass to your Babel config
const plugin = stareezyBabelPlugin({
  cssVariablePrefix: "sz",
  outputDir: "./dist/css",
});
```

## What it does

The compiler traverses your JSX AST at build time, detects props whose values are `Token` objects (`__token: true`), and replaces them with generated atomic CSS class names. It emits a CSS file with `:root` variable declarations and one atomic rule per unique token.
