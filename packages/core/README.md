# @stareezy-ui/core

Shared utilities, hooks, and platform helpers for Stareezy UI.

## Installation

```sh
npm install @stareezy-ui/core
```

## Usage

```ts
import {
  convertSpacing,
  useDeviceLayout,
  isEmptyList,
  isEmptyString,
  formatDate,
  formatToRupiah,
  isoWeeks,
} from "@stareezy-ui/core";

// Platform-aware spacing (raw number on web, ms() scaled on React Native)
const size = convertSpacing(16);

// Device layout hook
function MyComponent() {
  const { width, height, isTablet } = useDeviceLayout();
  return null;
}

// Guard utilities
isEmptyList([]); // true
isEmptyString(""); // true

// Date formatting
formatDate(new Date()); // '01/01/2024'

// Currency formatting
formatToRupiah(50000); // 'Rp 50.000'
```
