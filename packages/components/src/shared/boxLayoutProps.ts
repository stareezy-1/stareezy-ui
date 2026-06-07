/**
 * BoxLayoutProps — shared layout/spacing/flex props propagated to every component.
 *
 * Includes spacing, sizing, flex props from BoxProps PLUS custom shorthand props
 * and $-prefixed breakpoint group props derived from the consuming app's
 * createUi({ shorthands, media }) configuration.
 *
 * Requirements: 5.1
 */

import { getUiConfig } from "@quasify-ui/tokens";
import type { QuasifyShorthands } from "@quasify-ui/tokens";
import type { BoxProps } from "../primitives/Box";
import type { BreakpointKey, Responsive } from "../primitives/breakpoints";
import type { SxProp } from "./sx";

// ---------------------------------------------------------------------------
// Re-export helper from boxProps
// ---------------------------------------------------------------------------

export { stripUndefined } from "./boxProps";

// ---------------------------------------------------------------------------
// Re-export SxProp
// ---------------------------------------------------------------------------

export type { SxProp } from "./sx";

// ---------------------------------------------------------------------------
// Helper types for custom shorthands + $-prefixed breakpoint props
// ---------------------------------------------------------------------------

/**
 * Custom shorthand props derived from QuasifyCustomConfig["shorthands"].
 *
 * - No augmentation (shorthands key is a wide `string` index) → `{}` (no extra props)
 * - Augmented with literal keys → each key accepts a plain value OR a responsive object
 *
 * This mirrors CustomShorthandProps in Box.tsx so every component that extends
 * BoxLayoutProps automatically gains the app's custom shorthand props (bg, br, etc.).
 */
type LayoutShorthandProps = string extends keyof QuasifyShorthands
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  : {
      [K in keyof QuasifyShorthands]?: Responsive<string | number>;
    };

/**
 * $-prefixed breakpoint prop keys derived from BreakpointKey.
 * e.g. "$sm" | "$md" | "$lg" | "$xl" | "$2xl"
 */
type LayoutBreakpointPropKey = `$${Exclude<BreakpointKey, "base">}`;

/**
 * Partial style group props for the $-prefixed breakpoint-as-prop syntax.
 * Each key accepts a partial set of Box style props scoped to that breakpoint.
 */
type LayoutBreakpointProps = {
  [K in LayoutBreakpointPropKey]?: Partial<
    Pick<
      BoxProps,
      | "p"
      | "px"
      | "py"
      | "pt"
      | "pb"
      | "pl"
      | "pr"
      | "m"
      | "mx"
      | "my"
      | "mt"
      | "mb"
      | "ml"
      | "mr"
      | "width"
      | "height"
      | "minWidth"
      | "maxWidth"
      | "minHeight"
      | "maxHeight"
      | "flex"
      | "flexDirection"
      | "flexGrow"
      | "flexShrink"
      | "flexBasis"
      | "alignItems"
      | "alignSelf"
      | "justifyContent"
      | "gap"
      | "rowGap"
      | "columnGap"
    >
  >;
};

// ---------------------------------------------------------------------------
// BoxLayoutProps
// ---------------------------------------------------------------------------

/**
 * The set of layout-related props shared across every component in the library.
 *
 * Includes:
 * - Spacing (p/m and all directional variants)
 * - Sizing (width/height/min/max)
 * - Flex layout (flex, flexDirection, alignItems, gap, etc.)
 * - Custom shorthand props from `createUi({ shorthands })` — e.g. `bg`, `br`
 * - $-prefixed breakpoint group props from `createUi({ media })` — e.g. `$md`, `$lg`
 *
 * Every component in @quasify-ui/components extends this type, so responsive
 * layout and shorthand props work on Button, Input, Card, and all others.
 */
export type BoxLayoutProps = Pick<
  BoxProps,
  // ── Spacing ───────────────────────────────────────────────────────────────
  | "p"
  | "px"
  | "py"
  | "pt"
  | "pb"
  | "pl"
  | "pr"
  | "m"
  | "mx"
  | "my"
  | "mt"
  | "mb"
  | "ml"
  | "mr"
  // ── Sizing ────────────────────────────────────────────────────────────────
  | "width"
  | "height"
  | "minWidth"
  | "maxWidth"
  | "minHeight"
  | "maxHeight"
  // ── Flex ──────────────────────────────────────────────────────────────────
  | "flex"
  | "flexDirection"
  | "flexGrow"
  | "flexShrink"
  | "flexBasis"
  | "alignItems"
  | "alignSelf"
  | "justifyContent"
  | "gap"
  | "rowGap"
  | "columnGap"
> &
  LayoutShorthandProps &
  LayoutBreakpointProps & {
    /**
     * Escape-hatch style prop — accepts any Box style prop including responsive
     * values, token references, and $-breakpoint groups. Applied on top of the
     * component's own styles via its root Box wrapper.
     *
     * @example
     * <Button sx={{ mt: 16, $md: { mt: 24 }, bg: colors.celurenBlue[500] }} />
     * <Card sx={{ p: { base: 12, md: 20 }, rounded: radius.xl }} />
     */
    sx?: SxProp;
  };

// ---------------------------------------------------------------------------
// Runtime key lists — used by extractBoxLayoutProps
// ---------------------------------------------------------------------------

/**
 * Explicit BoxLayoutProps keys (spacing + sizing + flex).
 * Custom shorthands and $-prefixed keys are detected dynamically at runtime.
 */
const BOX_LAYOUT_PROP_KEYS: ReadonlySet<string> = new Set<string>([
  // Spacing
  "p",
  "px",
  "py",
  "pt",
  "pb",
  "pl",
  "pr",
  "m",
  "mx",
  "my",
  "mt",
  "mb",
  "ml",
  "mr",
  // Sizing
  "width",
  "height",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  // Flex
  "flex",
  "flexDirection",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "alignItems",
  "alignSelf",
  "justifyContent",
  "gap",
  "rowGap",
  "columnGap",
]);

// ---------------------------------------------------------------------------
// extractBoxLayoutProps
// ---------------------------------------------------------------------------

/**
 * Splits a props object into `{ layout, rest }` at runtime.
 *
 * A prop is routed to `layout` when:
 * 1. It is one of the explicit BoxLayoutProps keys (spacing/sizing/flex)
 * 2. It starts with `$` (breakpoint-as-prop group, e.g. `$md`)
 * 3. It is a key in the configured custom shorthands from `getUiConfig().shorthands`
 *    (e.g. `bg`, `br` when declared in quasify.config.ts)
 *
 * Everything else goes to `rest`.
 *
 * Requirements: 5.1
 */
export function extractBoxLayoutProps<P extends object>(
  props: P,
): {
  layout: Partial<BoxLayoutProps>;
  sxProps: Partial<BoxLayoutProps>;
  rest: Omit<P, keyof BoxLayoutProps>;
} {
  const configShorthands = getUiConfig()?.shorthands ?? {};
  // layout is kept for backward compat but is always empty now —
  // layout props are merged into sxProps so they resolve directly on the
  // component's own element via useSx, with no Box wrapper needed.
  const layout: Partial<BoxLayoutProps> = {};
  const sxProps: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};

  // Collect sx contents first so direct layout props can override them
  const rawSx = (props as Record<string, unknown>)["sx"];
  if (rawSx && typeof rawSx === "object") {
    Object.assign(sxProps, rawSx);
  }

  for (const key of Object.keys(props as Record<string, unknown>)) {
    if (key === "sx") continue;
    const value = (props as Record<string, unknown>)[key];
    if (
      BOX_LAYOUT_PROP_KEYS.has(key) ||
      key.startsWith("$") ||
      Object.prototype.hasOwnProperty.call(configShorthands, key)
    ) {
      // Merge layout props directly into sxProps so useSx resolves them
      // onto the component's own element — no outer Box wrapper created.
      sxProps[key] = value;
    } else {
      rest[key] = value;
    }
  }

  return {
    layout,
    sxProps: sxProps as Partial<BoxLayoutProps>,
    rest: rest as Omit<P, keyof BoxLayoutProps>,
  };
}

// ---------------------------------------------------------------------------
// Re-export BreakpointKey for convenience
// ---------------------------------------------------------------------------

export type { BreakpointKey };
