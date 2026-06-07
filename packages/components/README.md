# @quasify-ui/components

17+ cross-platform UI components for React Native and web, built on the Quasify UI token system.

[![npm](https://img.shields.io/npm/v/@quasify-ui/components)](https://www.npmjs.com/package/@quasify-ui/components)

---

## Installation

### Web (React / Next.js / Vite)

```bash
npm add @quasify-ui/tokens @quasify-ui/components @quasify-ui/runtime
# or
pnpm add @quasify-ui/tokens @quasify-ui/components @quasify-ui/runtime
# or
yarn add @quasify-ui/tokens @quasify-ui/components @quasify-ui/runtime
```

### React Native (Expo / bare workflow)

```bash
yarn add @quasify-ui/tokens @quasify-ui/components @quasify-ui/runtime
```

#### Optional peer dependency — Slider component only

The `Slider` component requires `@react-native-community/slider` on React Native.
All other components use only React Native core APIs.

```bash
yarn add @react-native-community/slider
# bare workflow only — Expo managed workflow handles this automatically
npx pod-install
```

If you don't install it, `Slider` renders an empty placeholder and logs a warning in dev mode. All other components work without it.

#### Metro config

Metro must be able to resolve the `exports` field in package.json. Add this to your `metro.config.js`:

```js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Required: allow Metro to resolve package exports subpaths
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
```

> If you use `@tamagui/metro-plugin` or another Metro wrapper, apply the exports flag before wrapping:
>
> ```js
> const { getDefaultConfig } = require("expo/metro-config");
> const { withTamagui } = require("@tamagui/metro-plugin");
>
> let config = getDefaultConfig(__dirname);
> config.resolver.unstable_enablePackageExports = true;
>
> module.exports = withTamagui(config, {
>   /* ... */
> });
> ```

#### Babel config

Add the Quasify babel plugin to your `babel.config.js`. Keep it before any Tamagui plugin:

```js
const { quasifyBabelPlugin } = require("@quasify-ui/compiler/babel");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      quasifyBabelPlugin(),
      // ... other plugins
      // keep @tamagui/babel-plugin last if you use Tamagui
    ],
  };
};
```

The compiler package also needs to be installed:

```bash
yarn add -D @quasify-ui/compiler
```

---

## Usage

### Primitives

```tsx
import { Box, Text, HStack, VStack } from '@quasify-ui/components'
import { colors, spacing, radius } from '@quasify-ui/tokens'

// Box — foundational layout primitive
<Box
  bg={colors.celurenBlue[500]}
  p={spacing[4]}
  rounded={radius.md}
  flexDirection="row"
  alignItems="center"
/>

// Text — typography with 50+ variants
<Text type="M-heading-bold" text="Hello world" />
<Text type="S-paragraph-regular" text="Body copy" color="#024CCE" />
<Text text="" emptyState="—" />

// Layout stacks
<HStack gap={8}>
  <Text text="Left" />
  <Text text="Right" />
</HStack>

<VStack gap={16}>
  <Text text="Top" />
  <Text text="Bottom" />
</VStack>
```

### Button

```tsx
import { Button } from '@quasify-ui/components'

<Button variant="primary"   size="md" text="Submit" onPress={() => {}} />
<Button variant="secondary" size="md" text="Cancel" />
<Button variant="primary"   size="md" text="Loading" loading />
<Button variant="primary"   size="md" text="Disabled" disabled />
```

**Variants:** `primary` | `secondary` | `tertiary` | `link` | `transparent`  
**Sizes:** `sm` | `md` | `lg` | `xl` | `xxl`

### Responsive props

All style props accept breakpoint maps:

```tsx
<Box
  flexDirection={{ base: "column", md: "row" }}
  p={{ base: spacing[2], lg: spacing[6] }}
/>
```

---

## Full component list

`Box`, `Text`, `HStack`, `VStack`, `Button`, `Input`, `Checkbox`, `CheckboxOption`,
`Dropdown`, `FilterButton`, `PinCode`, `Ratings`, `Screen`, `ViewStack`, `Spacer`,
`Line`, `Dot`, `CardBox`, `Card`, `GroupContainer`, `Footer`, `Header`, `Topbar`,
`BaseModal`, `BottomSheets`, `Drawer`, `ImageModal`, `CalendarModal`,
`DateRangeCalendarModal`, `MonthCalendarModal`, `Labels`, `Badges`, `BadgesStatus`,
`Avatars`, `Loading`, `LoadingSpinner`, `ProgressBar`, `Toast`, `EmptyState`,
`Calendar`, `CalendarV2`, `BirthdateCalendar`, `LineChart`, `RadarChart`, `BarChart`,
`Table`, `TopTabs`, `Pagination`, `SummaryCard`, `Photo`, `UploadPhoto`, and more.

---

## Peer dependencies

| Dependency                           | Required | Notes                                         |
| ------------------------------------ | -------- | --------------------------------------------- |
| `react` ≥ 18                         | ✅       |                                               |
| `react-native` ≥ 0.73                | optional | Only needed for React Native targets          |
| `@react-native-community/slider` ≥ 4 | optional | Only needed if you use the `Slider` component |

---

## License

MIT
