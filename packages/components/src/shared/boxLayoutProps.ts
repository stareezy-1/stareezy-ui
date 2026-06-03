/**
 * BoxLayoutProps — shared layout/spacing/flex props propagated to every component.
 *
 * This file defines the BoxLayoutProps type (spacing + sizing + flex props picked
 * from BoxProps, plus CustomShorthandProps and BreakpointProps) and the runtime
 * `extractBoxLayoutProps` splitter used by each component to separate layout
 * props from component-specific props.
 *
 * Requirements: 5.1
 */

import { getUiConfig } from "@stareezy-ui/tokens";
import type { BoxProps } from "../primitives/Box";
import type { BreakpointKey } from "../primitives/breakpoints";

// ---------------------------------------------------------------------------
// Re-export helper from boxProps
// ---------------------------------------------------------------------------

export { stripUndefined } from "./boxProps";

// ---------------------------------------------------------------------------
// BoxLayoutProps
// ---------------------------------------------------------------------------

/**
 * The set of layout-related props shared across every component.
 * Covers spacing (p/m shorthands), sizing (width/height/min/max), and flex layout
 * properties, plus custom shorthand props and $-prefixed breakpoint-as-prop groups.
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
>;

// ---------------------------------------------------------------------------
// Runtime key lists — used to split props at runtime
// ---------------------------------------------------------------------------

/**
 * The explicit set of BoxLayoutProps keys (spacing + sizing + flex).
 * Used at runtime by `extractBoxLayoutProps` to identify layout keys.
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
 * A prop belongs to `layout` if it is:
 * 1. One of the explicit BoxLayoutProps keys (spacing/sizing/flex), OR
 * 2. A `$`-prefixed key (breakpoint-as-prop group, e.g. `$md`), OR
 * 3. A key present in the configured custom shorthands (`getUiConfig().shorthands`).
 *
 * Everything else goes into `rest`.
 *
 * Requirements: 5.1
 */
export function extractBoxLayoutProps<P extends object>(
  props: P,
): { layout: Partial<BoxLayoutProps>; rest: Omit<P, keyof BoxLayoutProps> } {
  const configShorthands = getUiConfig()?.shorthands ?? {};
  const layout: Partial<BoxLayoutProps> = {};
  const rest: Record<string, unknown> = {};

  for (const key of Object.keys(props as Record<string, unknown>)) {
    const value = (props as Record<string, unknown>)[key];
    if (
      BOX_LAYOUT_PROP_KEYS.has(key) ||
      key.startsWith("$") ||
      Object.prototype.hasOwnProperty.call(configShorthands, key)
    ) {
      // Cast needed because TypeScript can't narrow Record<string,unknown> -> BoxLayoutProps
      (layout as Record<string, unknown>)[key] = value;
    } else {
      rest[key] = value;
    }
  }

  return {
    layout,
    rest: rest as Omit<P, keyof BoxLayoutProps>,
  };
}

// ---------------------------------------------------------------------------
// Re-export BreakpointKey for convenience
// ---------------------------------------------------------------------------

export type { BreakpointKey };
