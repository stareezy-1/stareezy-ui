# @quasify-ui/compiler

Build-time Babel/Vite plugin that extracts Quasify UI token props from JSX and replaces them with atomic CSS class names.

[![npm](https://img.shields.io/npm/v/@quasify-ui/compiler)](https://www.npmjs.com/package/@quasify-ui/compiler)

## Install

```bash
pnpm add -D @quasify-ui/compiler
```

## How it works

**Before:**

```tsx
<Box bg={colors.celurenBlue[500]} p={spacing[4]} />
```

**After:**

```tsx
<Box className="sz-bg-celurenBlue-500 sz-p-spacing-4" />
```

**Generated CSS:**

```css
:root {
  --celurenBlue-500: #024cce;
  --spacing-4: 4px;
}
.sz-bg-celurenBlue-500 {
  background-color: var(--celurenBlue-500);
}
.sz-p-spacing-4 {
  padding: var(--spacing-4);
}
```

## Vite

```ts
// vite.config.ts
import { quasifyVitePlugin } from "@quasify-ui/compiler";

export default {
  plugins: [
    quasifyVitePlugin({
      cssVariablePrefix: "sz",
      outputDir: "dist/styles",
    }),
  ],
};
```

## Babel / Metro (React Native)

```js
// babel.config.js
module.exports = {
  plugins: [["@quasify-ui/compiler/babel", { cssVariablePrefix: "sz" }]],
};
```

## Prop mappings

| JSX prop     | CSS property                    |
| ------------ | ------------------------------- |
| `bg`         | `background-color`              |
| `color`      | `color`                         |
| `p`          | `padding`                       |
| `px`         | `padding-left`, `padding-right` |
| `py`         | `padding-top`, `padding-bottom` |
| `m`          | `margin`                        |
| `rounded`    | `border-radius`                 |
| `fontSize`   | `font-size`                     |
| `fontWeight` | `font-weight`                   |

## License

MIT
