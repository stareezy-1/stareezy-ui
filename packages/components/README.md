# @stareezy-ui/components

70+ cross-platform React Native and web components for Stareezy UI.

## Installation

```sh
npm install @stareezy-ui/components
```

## Peer Dependencies

```sh
npm install react
# For React Native projects:
npm install react-native
```

## Usage

```tsx
import { Box, Text, Button, HStack, VStack } from "@stareezy-ui/components";
import { colors, spacing, radius } from "@stareezy-ui/tokens";

function MyScreen() {
  return (
    <Box bg={colors.celurenBlue[500]} p={spacing.medium} rounded={radius.md}>
      <Text color={colors.base.white} fontSize={typography.fontSize.md}>
        Hello, Stareezy UI
      </Text>
      <HStack>
        <Button variant="primary" text="Confirm" onPress={() => {}} />
        <Button variant="secondary" text="Cancel" onPress={() => {}} />
      </HStack>
    </Box>
  );
}
```

## Available Components

`Screen`, `ViewStack`, `Box`, `Text`, `HStack`, `VStack`, `Button`, `Input`, `Checkbox`, `CheckboxOption`, `Dropdown`, `FilterButton`, `Card`, `CardBox`, `Spacer`, `Line`, `Dot`, `Badges`, `BadgesStatus`, `Labels`, `ActionText`, `Avatars`, `Loading`, `LoadingSpinner`, `ProgressBar`, `Toast`, `EmptyState`, `Info`, `Limit`, `ContentLength`, `Version`, `BaseModal`, `BottomSheets`, `Drawer`, `ImageModal`, `PreviewImageModal`, `UploadFileModal`, `UploadImageModal`, `CalendarModal`, `DateRangeCalendarModal`, `MonthCalendarModal`, `MonthRangePickerModal`, `Calendar`, `CalendarV2`, `BirthdateCalendar`, `LineChart`, `RadarChart`, `BarChart`, `CustomChartTooltip`, `Table`, `TableHeaderItem`, `TopTabs`, `Pagination`, `SummaryCard`, `PipelineSummaryProgressCard`, `ListApprovalNote`, `ListAndAction`, `CollapsibleCard`, `GeneralHorizontalColumn`, `Photo`, `UploadPhoto`, `Header`, `Footer`, `Topbar`, `GroupContainer`, `PinCode`, `Pins`, `Ratings`, `ApprovalOption`, `ApprovalRadio`, `ListCheckboxRadioButton`, `TextContainer`, `ImagePickerModal`.
