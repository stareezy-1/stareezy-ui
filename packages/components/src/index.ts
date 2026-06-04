// @stareezy-ui/components
// Rebuilt component library — clean, beautiful, token-driven.

// ── Primitives ───────────────────────────────────────────────────────────────
export { Box } from "./primitives/Box";
export type { BoxProps, StyleProp } from "./primitives/Box";
export { EBoxType } from "./primitives/Box.types";

export { View } from "./primitives/View";
export type { ViewProps } from "./primitives/View";
export { EViewType } from "./primitives/View.types";

export { Text, ETextType, EFontStyle } from "./primitives/Text";
export type { ITextProps } from "./primitives/Text";

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

// ── BoxLayoutProps ─────────────────────────────────────────────────────────────
export type { BoxLayoutProps } from "./shared/boxLayoutProps";
export { extractBoxLayoutProps } from "./shared/boxLayoutProps";

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

// ── Input ─────────────────────────────────────────────────────────────────────
export { Input, EInputType, EInputSize } from "./input/Input";
export type { IInputProps } from "./input/Input";

// ── Accordion ─────────────────────────────────────────────────────────────────
export { Accordion } from "./accordion/Accordion";
export type {
  AccordionProps,
  AccordionItem,
  AccordionVariant,
} from "./accordion/Accordion";

// ── Avatar ────────────────────────────────────────────────────────────────────
export { Avatar } from "./avatar/Avatar";
export type {
  AvatarProps,
  AvatarSize,
  AvatarShape,
  AvatarStatus,
} from "./avatar/Avatar";

// ── Checkbox ──────────────────────────────────────────────────────────────────
export { Checkbox } from "./checkbox/Checkbox";
export type { CheckboxProps, CheckboxSize } from "./checkbox/Checkbox";

// ── CircularProgress ──────────────────────────────────────────────────────────
export { CircularProgress } from "./circular-progress/CircularProgress";
export type {
  CircularProgressProps,
  CircularProgressSize,
} from "./circular-progress/CircularProgress";

// ── Clipboard ─────────────────────────────────────────────────────────────────
export { Clipboard } from "./clipboard/Clipboard";
export type { ClipboardProps } from "./clipboard/Clipboard";

// ── Divider ───────────────────────────────────────────────────────────────────
export { Divider } from "./divider/Divider";
export type {
  DividerProps,
  DividerOrientation,
  DividerVariant,
} from "./divider/Divider";

// ── Dropdown ──────────────────────────────────────────────────────────────────
export { Dropdown } from "./dropdown/Dropdown";
export type {
  DropdownProps,
  DropdownOption,
  DropdownSize,
} from "./dropdown/Dropdown";
// ── Modal ─────────────────────────────────────────────────────────────────────
export { Modal } from "./modal/Modal";
export type { ModalProps, ModalSize } from "./modal/Modal";

// ── Progress ──────────────────────────────────────────────────────────────────
export { Progress } from "./progress/Progress";
export type {
  ProgressProps,
  ProgressSize,
  ProgressVariant,
} from "./progress/Progress";

// ── Resizer ───────────────────────────────────────────────────────────────────
export { Resizer } from "./resizer/Resizer";
export type { ResizerProps, ResizerDirection } from "./resizer/Resizer";

// ── Skeleton ──────────────────────────────────────────────────────────────────
export { Skeleton } from "./skeleton/Skeleton";
export type { SkeletonProps, SkeletonVariant } from "./skeleton/Skeleton";

// ── Slider ────────────────────────────────────────────────────────────────────
export { Slider } from "./slider/Slider";
export type { SliderProps, SliderSize, SliderMark } from "./slider/Slider";

// ── Spinner ───────────────────────────────────────────────────────────────────
export { Spinner } from "./spinner/Spinner";
export type {
  SpinnerProps,
  SpinnerSize,
  SpinnerVariant,
} from "./spinner/Spinner";

// ── Switch ────────────────────────────────────────────────────────────────────
export { Switch } from "./switch/Switch";
export type { SwitchProps, SwitchSize } from "./switch/Switch";

// ── Tabs ──────────────────────────────────────────────────────────────────────
export { Tabs } from "./tabs/Tabs";
export type { TabsProps, TabItem, TabsVariant } from "./tabs/Tabs";

// ── Badge ─────────────────────────────────────────────────────────────────────
export { Badge } from "./badge/Badge";
export type { BadgeProps, BadgeVariant } from "./badge/Badge";

// ── Card ──────────────────────────────────────────────────────────────────────
export { Card } from "./card/Card";
export type { CardProps, CardVariant, GlowColor } from "./card/Card";

// ── CommandPalette ────────────────────────────────────────────────────────────
export { CommandPalette } from "./command-palette/CommandPalette";
export type {
  CommandPaletteProps,
  CommandItem,
} from "./command-palette/CommandPalette";

// ── NavBar ────────────────────────────────────────────────────────────────────
export { NavBar } from "./nav-bar/NavBar";
export type { NavBarProps } from "./nav-bar/NavBar";

// ── FileDropZone ──────────────────────────────────────────────────────────────
export { FileDropZone } from "./file-drop-zone/FileDropZone";
export type {
  FileDropZoneProps,
  FileDropZoneState,
} from "./file-drop-zone/FileDropZone";

// ── ProgressPanel ─────────────────────────────────────────────────────────────
export { ProgressPanel } from "./progress-panel/ProgressPanel";
export type {
  ProgressPanelProps,
  ProgressStep,
} from "./progress-panel/ProgressPanel";

// ── Toast ─────────────────────────────────────────────────────────────────────
export { Toast } from "./toast/Toast";
export type { ToastProps, ToastVariant } from "./toast/Toast";

// ── Breadcrumb ────────────────────────────────────────────────────────────────
export { Breadcrumb } from "./breadcrumb/Breadcrumb";
export type { BreadcrumbProps, BreadcrumbItem } from "./breadcrumb/Breadcrumb";

// ── Pagination ────────────────────────────────────────────────────────────────
export { Pagination, EPaginationVariant } from "./pagination/Pagination";
export type { PaginationProps } from "./pagination/Pagination";

// ── Table ─────────────────────────────────────────────────────────────────────
export { Table } from "./table/Table";
export type { TableProps, TableColumn, TableRow } from "./table/Table";

// ── Tag ───────────────────────────────────────────────────────────────────────
export { Tag, ETagVariant } from "./tag/Tag";
export type { TagProps } from "./tag/Tag";

// ── Tooltip ───────────────────────────────────────────────────────────────────
export { Tooltip } from "./tooltip/Tooltip";
export type { TooltipProps, TooltipPlacement } from "./tooltip/Tooltip";

// ── Drawer ────────────────────────────────────────────────────────────────────
export { Drawer } from "./drawer/Drawer";
export type { DrawerProps, DrawerAnchor } from "./drawer/Drawer";
