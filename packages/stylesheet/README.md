# @stareezy-ui/stylesheet

Atomic CSS sheet management and CSS variable injection for Stareezy UI web builds.

[![npm](https://img.shields.io/npm/v/@stareezy-ui/stylesheet)](https://www.npmjs.com/package/@stareezy-ui/stylesheet)

## Install

```bash
pnpm add @stareezy-ui/stylesheet
```

## Usage

Used internally by `@stareezy-ui/runtime`. You only need this directly for custom runtime adapters.

```ts
import { AtomicStyleSheet } from "@stareezy-ui/stylesheet";

const sheet = new AtomicStyleSheet();

// Inject a CSS variable into :root
sheet.injectRootVariables([{ id: "celurenBlue-500", value: "#024CCE" }]);

// Inject an atomic CSS rule (deduplicates by token ID)
sheet.inject("celurenBlue-500", "background-color", "#024CCE");
// → .sz-celurenBlue-500 { background-color: var(--celurenBlue-500); }
```

## License

MIT
