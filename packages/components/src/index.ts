// @stareezy-ui/components
// 70+ cross-platform React Native and web components built on the Stareezy UI token system.

// ── Primitives ───────────────────────────────────────────────────────────────
export { Box } from "./primitives/Box";
export type { BoxProps, StyleProp } from "./primitives/Box";
export { EBoxType } from "./primitives/Box.types";

export { View } from "./primitives/View";
export type { ViewProps } from "./primitives/View";
export { EViewType } from "./primitives/View.types";

export { Text, ETextType, EFontStyle } from "./primitives/Text";
export type { TextProps } from "./primitives/Text";

export {
  HStack,
  VStack,
  EStackAlign,
  EStackJustify,
  EStackGap,
  stackGapValues,
} from "./primitives/Stack";
export type { HStackProps, VStackProps } from "./primitives/Stack";

export {
  EFlexDirection,
  EAlignItems,
  EJustifyContent,
  EAlignSelf,
  EFlexWrap,
  EOverflow,
  EPosition,
  ECursor,
} from "./primitives/Box.style";

export { TouchableOpacity } from "./primitives/TouchableOpacity";
export type { TouchableOpacityProps } from "./primitives/TouchableOpacity";
export { ETouchableType } from "./primitives/TouchableOpacity.types";

// ── Breakpoints ───────────────────────────────────────────────────────────────
export { configureBreakpoints, getBreakpoints } from "./primitives/Box";
export type {
  BreakpointKey,
  BreakpointConfig,
  Responsive,
} from "./primitives/Box";

// ── Platform ──────────────────────────────────────────────────────────────────
export {
  isWeb,
  isNative,
  isIOS,
  isAndroid,
  getPlatformOS,
} from "./shared/platform";

// ── Button ────────────────────────────────────────────────────────────────────
export { Button, EButtonType, EButtonSize } from "./button/Button";
export type { ButtonProps } from "./button/Button";

// ── Layout & Display ──────────────────────────────────────────────────────────
export { Screen } from "./screen/Screen";
export type {
  IScreenProps,
  ScreenPresets,
  KeyboardOffsets,
} from "./screen/Screen";

export { Spacer } from "./spacer/Spacer";
export type { SpacerProps } from "./spacer/Spacer";

export { Line } from "./line/Line";
export type { ILineProps } from "./line/Line";

export { Dot, ESizeDot, ETypeDot } from "./dot/Dot";
export type { IDotProps } from "./dot/Dot";

export { CardBox } from "./card-box/CardBox";
export type { ICardBoxProps } from "./card-box/CardBox";

export { Card } from "./card/Card";
export type { ICardProps } from "./card/Card";

export { GroupContainer } from "./group-container/GroupContainer";
export type { IGroupContainerProps } from "./group-container/GroupContainer";

export { Footer } from "./footer/Footer";
export type { IFooterProps } from "./footer/Footer";

export { Header } from "./header/Header";
export type {
  IHeaderProps,
  ImageProps as HeaderImageProps,
} from "./header/Header";

export { Topbar } from "./topbar/Topbar";
export type { ITopbarProps } from "./topbar/Topbar";

export { HStack as ViewStack } from "./primitives/Stack";

// ── Inputs & Forms ────────────────────────────────────────────────────────────
export {
  Labels,
  ElabelsSize,
  ELabelsType,
  EHintTextType,
} from "./labels/Labels";
export type { ILabelsProps } from "./labels/Labels";

export { Input, EInputType, EInputSize } from "./input/Input";
export type { IInputProps } from "./input/Input";

export { Checkbox } from "./checkbox/Checkbox";
export type { ICheckboxProps, CheckboxStatus } from "./checkbox/Checkbox";

export { CheckboxOption } from "./checkbox-option/CheckboxOption";
export type {
  ICheckboxOptionProps,
  IOptionProps,
} from "./checkbox-option/CheckboxOption";

export {
  ListCheckboxRadioButton,
  EListCheckRadioButtonType,
} from "./list-checkbox-radio-button/ListCheckboxRadioButton";
export type { IListCheckRadioButtonProps } from "./list-checkbox-radio-button/ListCheckboxRadioButton";

export { Dropdown } from "./dropdown/Dropdown";
export type { DropdownProps, OptionProps } from "./dropdown/Dropdown";

export { FilterButton } from "./filter-button/FilterButton";
export type { IFilterButtonProps } from "./filter-button/FilterButton";

export {
  ApprovalOption,
  EApprovalOptionState,
  ERadioStatus,
} from "./approval-option/ApprovalOption";
export type { IApprovalOptionProps } from "./approval-option/ApprovalOption";

export { ApprovalRadio } from "./approval-radio/ApprovalRadio";
export type { IApprovalRadioProps } from "./approval-radio/ApprovalRadio";

export { PinCode, EPinCodeSize } from "./pin-code/PinCode";
export type { IPinCodeProps } from "./pin-code/PinCode";

export { Pins } from "./pins/Pins";
export type { IPinsProps } from "./pins/Pins";

export { Ratings } from "./ratings/Ratings";
export type { RatingsProps } from "./ratings/Ratings";

// ── Modals & Overlays ─────────────────────────────────────────────────────────
export { BaseModal } from "./base-modal/BaseModal";
export type { IBaseModalProps } from "./base-modal/BaseModal";

export { BottomSheets, EDeviceType } from "./bottom-sheets/BottomSheets";
export type { IBottomSheetsProps } from "./bottom-sheets/BottomSheets";

export { Drawer, EDrawerType } from "./drawer/Drawer";
export type { IDrawerProps } from "./drawer/Drawer";

export { ImageModal } from "./image-modal/ImageModal";
export type { IImageModalProps } from "./image-modal/ImageModal";

export { ImagePickerModal } from "./image-picker-modal/ImagePickerModal";
export type {
  IImagePickerModalProps,
  ImageItemType,
} from "./image-picker-modal/ImagePickerModal";

export { PreviewImageModal } from "./preview-image-modal/PreviewImageModal";
export type { IPreviewImageModalProps } from "./preview-image-modal/PreviewImageModal";

export { UploadFileModal } from "./upload-file-modal/UploadFileModal";
export type { IUploadFileModalProps } from "./upload-file-modal/UploadFileModal";

export { UploadImageModal } from "./upload-image-modal/UploadImageModal";
export type { IUploadImageModalProps } from "./upload-image-modal/UploadImageModal";

export { CalendarModal } from "./calendar-modal/CalendarModal";
export type { ICalendarModalProps } from "./calendar-modal/CalendarModal";

export { DateRangeCalendarModal } from "./date-range-calendar-modal/DateRangeCalendarModal";
export type {
  IDateRangeCalendarModalProps,
  IDateRange,
} from "./date-range-calendar-modal/DateRangeCalendarModal";

export { MonthCalendarModal } from "./month-calendar-modal/MonthCalendarModal";
export type { IMonthCalendarModalProps } from "./month-calendar-modal/MonthCalendarModal";

export { MonthRangePickerModal } from "./month-range-picker-modal/MonthRangePickerModal";
export type {
  IMonthRangePickerModalProps,
  IMonthRange,
} from "./month-range-picker-modal/MonthRangePickerModal";

// ── Data Display & Feedback ───────────────────────────────────────────────────
export {
  TextContainer,
  ETextContainerType,
} from "./text-container/TextContainer";
export type { ITextContainerProps } from "./text-container/TextContainer";

export {
  Badges,
  EBadgesType,
  EBadgesState,
  EBadgesStyle,
} from "./badges/Badges";
export type { IBadgesProps } from "./badges/Badges";

export { BadgesStatus, EBadgesStatusType } from "./badges-status/BadgesStatus";
export type { IBadgesStatusProps } from "./badges-status/BadgesStatus";

export { ActionText } from "./action-text/ActionText";
export type { IActionTextProps } from "./action-text/ActionText";

export {
  Avatars,
  EAvatarType,
  EAvatarSize,
  EAvatarState,
} from "./avatars/Avatars";
export type { IAvatarProps } from "./avatars/Avatars";

export { Loading } from "./loading/Loading";
export type { ILoadingOverlayProps } from "./loading/Loading";

export { LoadingSpinner } from "./loading-spinner/LoadingSpinner";
export type { LoadingSpinnerProps } from "./loading-spinner/LoadingSpinner";

export { ProgressBar } from "./progress-bar/ProgressBar";
export type { IProgressBarProps } from "./progress-bar/ProgressBar";

export {
  Toast,
  ToastSuccess,
  ToastInfo,
  ToastWarning,
  ToastError,
} from "./toast/Toast";
export type { ToastPropType } from "./toast/Toast";

export { EmptyState } from "./empty-state/EmptyState";
export type { IEmptyStateProps } from "./empty-state/EmptyState";

export { Info } from "./info/Info";
export type { IInfoProps } from "./info/Info";

export { Limit } from "./limit/Limit";
export type { ILimitProps } from "./limit/Limit";

export { ContentLength } from "./content-length/ContentLength";
export type { IContentLengthProps } from "./content-length/ContentLength";

export { Version } from "./version/Version";
export type { VersionProps } from "./version/Version";

// ── Calendars, Charts, Tables, Navigation ────────────────────────────────────
export { Calendar, ECalendarType } from "./calendar/Calendar";
export type {
  ICalendarProps,
  ISelectedMonthRange,
  OptionsShape,
} from "./calendar/Calendar";

export { CalendarV2, ECalendarViewType } from "./calendar-v2/CalendarV2";
export type { ICalendarV2Props } from "./calendar-v2/CalendarV2";

export { BirthdateCalendar } from "./birthdate-calendar/BirthdateCalendar";
export type { IBirthdateCalendarProps } from "./birthdate-calendar/BirthdateCalendar";

export {
  LineChart,
  ELineChartType,
  ELineChartStyling,
} from "./line-chart/LineChart";
export type { ILineChartProps, ILineChartData } from "./line-chart/LineChart";

export { RadarChart } from "./radar-chart/RadarChart";
export type {
  IRadarChartProps,
  IRadarChartData,
} from "./radar-chart/RadarChart";

export { BarChart } from "./bar-chart/BarChart";
export type { IBarChartProps, IBarChartData } from "./bar-chart/BarChart";

export { CustomChartTooltip } from "./custom-chart-tooltip/CustomChartTooltip";
export type { ICustomChartTooltip } from "./custom-chart-tooltip/CustomChartTooltip";

export { Table } from "./table/Table";
export type { ITableProps, TableColumnType } from "./table/Table";

export { TableHeaderItem } from "./table-header-item/TableHeaderItem";
export type { ITableHeaderItemProps } from "./table-header-item/TableHeaderItem";

export { TopTabs } from "./top-tabs/TopTabs";
export type { TopTabsProps, TopTabItem } from "./top-tabs/TopTabs";

export { Pagination } from "./pagination/Pagination";
export type { IPaginationProps, PaginationType } from "./pagination/Pagination";

export { SummaryCard } from "./summary-card/SummaryCard";
export type { ISummaryCardProps } from "./summary-card/SummaryCard";

export {
  PipelineSummaryProgressCard,
  EPipelineSummaryProgress,
} from "./pipeline-summary-progress-card/PipelineSummaryProgressCard";
export type { IPipelineSummaryProgressCardProps } from "./pipeline-summary-progress-card/PipelineSummaryProgressCard";

export {
  ListApprovalNote,
  EListApprovalNoteType,
} from "./list-approval-note/ListApprovalNote";
export type { IListApprovalNoteProps } from "./list-approval-note/ListApprovalNote";

export { ListAndAction } from "./list-and-action/ListAndAction";
export type {
  IListAndActionProps,
  IListAndActionItem,
} from "./list-and-action/ListAndAction";

export { CollapsibleCard } from "./collapsible-card/CollapsibleCard";
export type { ICollapsibleProps } from "./collapsible-card/CollapsibleCard";

export { GeneralHorizontalColumn } from "./general-horizontal-column/GeneralHorizontalColumn";
export type { IGeneralHorizontalColumn } from "./general-horizontal-column/GeneralHorizontalColumn";

export { Photo } from "./photo/Photo";
export type { IPhotoProps } from "./photo/Photo";

export {
  UploadPhoto,
  EButtonEditPositionUploadPhoto,
} from "./upload-photo/UploadPhoto";
export type { IUploadPhotoProps } from "./upload-photo/UploadPhoto";
