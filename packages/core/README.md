# @quasify-ui/core

Shared utilities, hooks, and platform helpers for Quasify UI.

[![npm](https://img.shields.io/npm/v/@quasify-ui/core)](https://www.npmjs.com/package/@quasify-ui/core)

## Install

```bash
pnpm add @quasify-ui/core
```

## Utilities

```ts
import {
  // Guards
  isEmptyList,
  isEmptyString,
  isUndefinied,
  isZero,
  // String
  textToUppercaseSubstring,
  // Date
  formatDate,
  formatDateWithYear,
  formatDateWithYearHours,
  formatDateWithMonth,
  getTodayDate,
  generateDaysBeforeDate,
  // Currency
  formatToRupiah,
  // Spacing
  convertSpacing,
  // Weeks
  isoWeeks,
} from "@quasify-ui/core";

formatToRupiah(1000000); // "Rp 1.000.000"
formatToRupiah(1000000, true); // "1.000.000"
convertSpacing(16); // 16 on web, ms(16) on RN
```

## Hooks

```ts
import { useDeviceLayout } from "@quasify-ui/core";

function MyComponent() {
  const { width, height, isSmall } = useDeviceLayout();
  // ...
}
```

## License

MIT
