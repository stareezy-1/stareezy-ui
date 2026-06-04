/**
 * sx.ts — the `sx` prop type and extraction logic for Stareezy UI components.
 *
 * `sx` works like Tamagui / Chakra's sx prop: it accepts any Box style prop
 * (spacing, sizing, flex, color, border, responsive objects, $-breakpoint groups,
 * custom shorthands from createUi) and applies them to the component's root element.
 *
 * On web the sx props are forwarded to a Box wrapper so Box's full resolver
 * pipeline handles responsive values, token references, and media queries.
 * On native they are included in the Box wrapper styles the same way.
 *
 * All breakpoint-responsive syntax is supported:
 *   <Button sx={{ p: { base: 8, md: 16 }, $lg: { flexDirection: "row" } }} />
 *
 * Token references are supported:
 *   <Card sx={{ bg: colors.celurenBlue[500], rounded: radius.xl }} />
 *
 * ThemeToken references are supported:
 *   <Card sx={{ bg: ui.t.backgrounds.primary }} />
 */

import type { BoxProps } from "../primitives/Box";

// ---------------------------------------------------------------------------
// SxProp — all style-related BoxProps, no interaction/accessibility/children
// ---------------------------------------------------------------------------

/** Keys of BoxProps that carry style information (not event handlers, a11y, or children). */
type SxStyleKeys = Exclude<
  keyof BoxProps,
  // Interaction / accessibility / misc DOM props
  | "children"
  | "style"
  | "className"
  | "testID"
  | "accessibilityLabel"
  | "accessibilityRole"
  | "accessibilityState"
  | "id"
  | "role"
  | "tabIndex"
  | "onClick"
  | "onMouseDown"
  | "onMouseUp"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onPress"
  | "onKeyDown"
  | "aria-label"
  | "aria-hidden"
  | "aria-disabled"
  | "aria-expanded"
  | "aria-checked"
  | "aria-selected"
  | "aria-busy"
  | "aria-invalid"
  | "aria-orientation"
  | "data-testid"
  | "data-theme"
  | "scrollable"
  | "horizontal"
  // Box preset — sx doesn't use presets
  | "type"
>;

/**
 * The `sx` prop type — accepts any Box style prop including:
 * - Spacing: p, px, py, pt, pb, pl, pr, m, mx, my, mt, mb, ml, mr
 * - Sizing: width, height, minWidth, maxWidth, minHeight, maxHeight
 * - Flex: flex, flexDirection, alignItems, justifyContent, gap, etc.
 * - Colors: bg, color, borderColor, backgroundColor, opacity
 * - Borders: borderWidth, borderStyle, borderRadius (via `rounded`), etc.
 * - Position: position, top, right, bottom, left, zIndex, overflow
 * - Visual: cursor, pointerEvents, transform, userSelect, boxSizing
 * - Custom shorthands from createUi (e.g. `bg`, `br`)
 * - Responsive objects: `{ base: 8, md: 16 }`
 * - $-group breakpoint syntax: `$md={{ p: 16, flexDirection: "row" }}`
 * - Token references: `spacing[4]`, `colors.celurenBlue[500]`
 * - ThemeToken references: `ui.t.backgrounds.primary`
 */
export type SxProp = Pick<BoxProps, SxStyleKeys>;

// ---------------------------------------------------------------------------
// Runtime key helpers
// ---------------------------------------------------------------------------

/**
 * Extracts sx props from a props object.
 *
 * Returns the `sx` value (or undefined) and strips it from the original props.
 * The caller should spread sx onto the Box wrapper alongside any layout props.
 *
 * Usage:
 * ```ts
 * const { sx, ...rest } = extractSx(props);
 * // then: <Box {...layout} {...sx}>...</Box>
 * ```
 */
export function extractSx<P extends { sx?: SxProp }>(
  props: P,
): { sx: SxProp | undefined; rest: Omit<P, "sx"> } {
  const { sx, ...rest } = props;
  return { sx, rest: rest as Omit<P, "sx"> };
}
