# @stareezy-ui/components

70+ cross-platform UI components for React Native and web, built on the Stareezy UI token system.

[![npm](https://img.shields.io/npm/v/@stareezy-ui/components)](https://www.npmjs.com/package/@stareezy-ui/components)

## Install

```bash
pnpm add @stareezy-ui/tokens @stareezy-ui/components @stareezy-ui/runtime
```

## Usage

### Primitives

```tsx
import { Box, Text, HStack, VStack } from '@stareezy-ui/components'
import { colors, spacing, radius } from '@stareezy-ui/tokens'

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
<Text text="" emptyState="—" />  // emptyState fallback

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
import { Button } from '@stareezy-ui/components'

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

## Full component list

`Box`, `Text`, `HStack`, `VStack`, `Button`, `Input`, `Checkbox`, `CheckboxOption`,
`Dropdown`, `FilterButton`, `PinCode`, `Ratings`, `Screen`, `ViewStack`, `Spacer`,
`Line`, `Dot`, `CardBox`, `Card`, `GroupContainer`, `Footer`, `Header`, `Topbar`,
`BaseModal`, `BottomSheets`, `Drawer`, `ImageModal`, `CalendarModal`,
`DateRangeCalendarModal`, `MonthCalendarModal`, `Labels`, `Badges`, `BadgesStatus`,
`Avatars`, `Loading`, `LoadingSpinner`, `ProgressBar`, `Toast`, `EmptyState`,
`Calendar`, `CalendarV2`, `BirthdateCalendar`, `LineChart`, `RadarChart`, `BarChart`,
`Table`, `TopTabs`, `Pagination`, `SummaryCard`, `Photo`, `UploadPhoto`, and more.

## Peer dependencies

```json
{
  "react": ">=18.0.0",
  "react-native": ">=0.73.0" // optional, for RN usage
}
```

## License

MIT
