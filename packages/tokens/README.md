# @stareezy-ui/tokens

Fully typed design token definitions for Stareezy UI — zero dependencies.

## Installation

```sh
npm install @stareezy-ui/tokens
```

## Usage

```ts
import {
  colors,
  spacing,
  radius,
  typography,
  shadow,
  semanticColors,
} from "@stareezy-ui/tokens";

// Color token
const primary = colors.celurenBlue[500]; // Token<string> { __token: true, id: 'celurenBlue-500', value: '#024CCE' }

// Spacing token
const gap = spacing.medium; // Token<number> { __token: true, id: 'spacing-medium', value: 12 }

// Radius token
const rounded = radius.md; // Token<number> { __token: true, id: 'radius-md', value: 8 }

// Semantic color token
const textColor = semanticColors.text.primary; // references colors.raisinBlack[800]
```

## Token Shape

Every token is a plain object with three fields:

```ts
type Token<T> = {
  readonly __token: true;
  readonly id: string;
  readonly value: T;
};
```

## Serialization

```ts
import { serializeToken, deserializeToken } from "@stareezy-ui/tokens";

const json = serializeToken(colors.celurenBlue[500]);
const token = deserializeToken(json);
```
