# @stareezy-ui/stylesheet

Atomic CSS sheet management and CSS variable injection for Stareezy UI.

## Installation

```sh
npm install @stareezy-ui/stylesheet
```

## Usage

```ts
import { AtomicStyleSheet } from "@stareezy-ui/stylesheet";

const sheet = new AtomicStyleSheet();

// Inject a CSS variable into :root
sheet.injectRootVariables([{ id: "celurenBlue-500", value: "#024CCE" }]);

// Inject an atomic CSS rule (deduplicates by token ID)
const className = sheet.inject(
  "celurenBlue-500",
  "background-color",
  "#024CCE",
);
// Returns 'sz-celurenBlue-500'
// Inserts: .sz-celurenBlue-500 { background-color: var(--celurenBlue-500); }
```

## How it works

`AtomicStyleSheet` manages a `<style>` tag in the document head. Each call to `inject()` generates a unique class name from the token ID and inserts a single CSS rule. Duplicate token IDs are deduplicated — the rule is only inserted once.
