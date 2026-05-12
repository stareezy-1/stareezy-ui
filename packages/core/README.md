# @stareezy-ui/core

Shared utilities, hooks, and platform helpers for Stareezy UI.

[![npm](https://img.shields.io/npm/v/@stareezy-ui/core)](https://www.npmjs.com/package/@stareezy-ui/core)

## Install

```bash
pnpm add @stareezy-ui/core
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
} from "@stareezy-ui/core";

formatToRupiah(1000000); // "Rp 1.000.000"
formatToRupiah(1000000, true); // "1.000.000"
convertSpacing(16); // 16 on web, ms(16) on RN
```

## Hooks

```ts
import { useDeviceLayout } from "@stareezy-ui/core";

function MyComponent() {
  const { width, height, isSmall } = useDeviceLayout();
  // ...
}
```

## License

MIT
