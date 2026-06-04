/**
 * Box / View — foundational layout primitive for Stareezy UI.
 *
 * Cross-platform: renders a <div> on web and a <View> on React Native.
 *
 * style prop accepts:
 *   - React.CSSProperties (web inline styles)
 *   - React Native StyleSheet styles (number IDs or plain objects)
 *   - AtomicStylesheet class name strings
 *   - Arrays of any of the above (falsy entries are skipped)
 */

import React, { useId, useEffect, useRef } from "react";
import type { Token } from "@stareezy-ui/tokens";
import { getUiConfig, useTheme } from "@stareezy-ui/tokens";
import type { ThemeToken } from "@stareezy-ui/tokens";
import { isThemeToken, resolveThemeTokenFromTheme } from "@stareezy-ui/tokens";
import type { ResolvedTheme, SzrShorthands } from "@stareezy-ui/tokens";
import { getRuntime } from "@stareezy-ui/runtime";
import type { RuntimeAdapter } from "@stareezy-ui/runtime";
import {
  isResponsive,
  resolveResponsiveValue,
  buildMediaQueryEntries,
  getBreakpoints,
} from "./breakpoints";
import type { BreakpointKey, Responsive } from "./breakpoints";
import { isWeb } from "../shared/platform";
import { flattenStyle } from "../shared/flattenStyle";
import { EBoxType } from "./Box.types";
import { BOX_PRESETS } from "./Box.presets";
import type { SxProp } from "../shared/sx";

// ---------------------------------------------------------------------------
// Re-exports
// ---------------------------------------------------------------------------

export { configureBreakpoints, getBreakpoints } from "./breakpoints";
export type {
  BreakpointKey,
  BreakpointConfig,
  Responsive,
} from "./breakpoints";

export { EBoxType } from "./Box.types";

// ---------------------------------------------------------------------------
// Style type — accepts CSSProperties, RN StyleSheet IDs, plain objects, arrays
// ---------------------------------------------------------------------------

export type StyleProp =
  | React.CSSProperties
  | Record<string, unknown>
  | number
  | null
  | undefined
  | false
  | StyleProp[];

// ---------------------------------------------------------------------------
// Prop → CSS / RN style mappings
// ---------------------------------------------------------------------------

const propToCssProp: Record<string, string | string[]> = {
  bg: "background-color",
  color: "color",
  p: "padding",
  px: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  pt: "padding-top",
  pb: "padding-bottom",
  pl: "padding-left",
  pr: "padding-right",
  m: "margin",
  mx: ["margin-left", "margin-right"],
  my: ["margin-top", "margin-bottom"],
  mt: "margin-top",
  mb: "margin-bottom",
  ml: "margin-left",
  mr: "margin-right",
  rounded: "border-radius",
  borderWidth: "border-width",
  borderColor: "border-color",
  width: "width",
  height: "height",
  flex: "flex",
  flexDirection: "flex-direction",
  alignItems: "align-items",
  justifyContent: "justify-content",
  gap: "gap",
  rowGap: "row-gap",
  columnGap: "column-gap",
};

const propToRnStyle: Record<string, string> = {
  bg: "backgroundColor",
  color: "color",
  p: "padding",
  px: "paddingHorizontal",
  py: "paddingVertical",
  pt: "paddingTop",
  pb: "paddingBottom",
  pl: "paddingLeft",
  pr: "paddingRight",
  m: "margin",
  mx: "marginHorizontal",
  my: "marginVertical",
  mt: "marginTop",
  mb: "marginBottom",
  ml: "marginLeft",
  mr: "marginRight",
  rounded: "borderRadius",
  borderWidth: "borderWidth",
  borderColor: "borderColor",
  width: "width",
  height: "height",
  flex: "flex",
  flexDirection: "flexDirection",
  alignItems: "alignItems",
  justifyContent: "justifyContent",
  gap: "gap",
  rowGap: "rowGap",
  columnGap: "columnGap",
};

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

type TokenOrValue<T> = Token<T> | ThemeToken | T;

function isToken(value: unknown): value is Token<unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    (value as Record<string, unknown>)["__token"] === true
  );
}

/**
 * Resolves a prop value that may be a Token<T>, ThemeToken, or plain value.
 * ThemeTokens require the current resolved theme to look up the live value.
 */
function resolveTokenOrValue(value: unknown, theme: ResolvedTheme): unknown {
  if (isThemeToken(value)) return resolveThemeTokenFromTheme(value, theme);
  if (isToken(value)) return (value as Token<unknown>).value;
  return value;
}

// ---------------------------------------------------------------------------
// Custom shorthand props — picked up from SzrCustomConfig module augmentation
// ---------------------------------------------------------------------------

/**
 * Extracts only the known shorthand keys from SzrShorthands as optional props,
 * each wrapped in Responsive<T> so callers can pass per-breakpoint values.
 *
 * Uses `string extends keyof S` to avoid creating an index signature when
 * SzrShorthands falls back to Record<string, string> (no augmentation).
 *
 * - No augmentation → `{}` (no extra props, no index signature) — Req 2.4
 * - Augmented → each key accepts a plain value OR a responsive object — Reqs 2.1–2.3
 */
type CustomShorthandProps = string extends keyof SzrShorthands
  ? // No augmentation — don't add any extra props (avoids index signature)
    // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  : {
      [K in keyof SzrShorthands]?: Responsive<TokenOrValue<string | number>>;
    };

// ---------------------------------------------------------------------------
// Breakpoint-as-prop grouped syntax (Req 4)
// ---------------------------------------------------------------------------

/**
 * Keys of the form `$sm`, `$md`, `$lg`, etc. — one per non-base BreakpointKey.
 * Derived from config so custom media keys produce the right `$`-prefixed props.
 */
type BreakpointPropKey = `$${Exclude<BreakpointKey, "base">}`;

/**
 * A partial set of Box style + shorthand props with no nested responsive/$-keys.
 * Used as the value type for each `$`-prefixed breakpoint prop.
 * Omitting BreakpointPropKey avoids recursive nesting.
 */
type BoxStylePropsPartial = Partial<
  Omit<BoxProps, BreakpointPropKey | "children" | "style" | "type">
>;

/**
 * One optional `$`-prefixed prop per non-base breakpoint.
 * e.g. `$md={{ p: 16, color: "red" }}` applies those styles at the md breakpoint.
 */
type BreakpointProps = {
  [K in BreakpointPropKey]?: BoxStylePropsPartial;
};

// ---------------------------------------------------------------------------
// BoxProps
// ---------------------------------------------------------------------------

export interface BoxProps extends CustomShorthandProps, BreakpointProps {
  // ── Preset type ───────────────────────────────────────────────────────────
  /** Applies a preset style combination. Explicit props override preset values. */
  type?: EBoxType;

  // ── Token / shorthand props ───────────────────────────────────────────────
  bg?: Responsive<TokenOrValue<string>>;
  color?: Responsive<TokenOrValue<string>>;
  borderColor?: Responsive<TokenOrValue<string>>;
  p?: Responsive<TokenOrValue<number> | string>;
  px?: Responsive<TokenOrValue<number> | string>;
  py?: Responsive<TokenOrValue<number> | string>;
  pt?: Responsive<TokenOrValue<number> | string>;
  pb?: Responsive<TokenOrValue<number> | string>;
  pl?: Responsive<TokenOrValue<number> | string>;
  pr?: Responsive<TokenOrValue<number> | string>;
  m?: Responsive<TokenOrValue<number> | string>;
  mx?: Responsive<TokenOrValue<number> | string>;
  my?: Responsive<TokenOrValue<number> | string>;
  mt?: Responsive<TokenOrValue<number> | string>;
  mb?: Responsive<TokenOrValue<number> | string>;
  ml?: Responsive<TokenOrValue<number> | string>;
  mr?: Responsive<TokenOrValue<number> | string>;
  rounded?: Responsive<TokenOrValue<number> | string>;
  borderWidth?: Responsive<TokenOrValue<number> | string>;
  width?: Responsive<TokenOrValue<number> | string>;
  height?: Responsive<TokenOrValue<number> | string>;
  flex?: Responsive<TokenOrValue<number>>;
  flexDirection?: Responsive<
    Token<string> | "row" | "column" | "row-reverse" | "column-reverse"
  >;
  alignItems?: Responsive<TokenOrValue<string>>;
  justifyContent?: Responsive<TokenOrValue<string>>;

  // ── Layout props ──────────────────────────────────────────────────────────
  position?: Responsive<React.CSSProperties["position"]>;
  top?: Responsive<number | string>;
  bottom?: Responsive<number | string>;
  left?: Responsive<number | string>;
  right?: Responsive<number | string>;
  zIndex?: Responsive<number | string>;
  overflow?: Responsive<React.CSSProperties["overflow"]>;
  overflowX?: Responsive<React.CSSProperties["overflowX"]>;
  overflowY?: Responsive<React.CSSProperties["overflowY"]>;
  display?: Responsive<React.CSSProperties["display"]>;
  flexWrap?: Responsive<React.CSSProperties["flexWrap"]>;
  flexGrow?: Responsive<number>;
  flexShrink?: Responsive<number>;
  flexBasis?: Responsive<number | string>;
  alignSelf?: Responsive<React.CSSProperties["alignSelf"]>;
  alignContent?: Responsive<React.CSSProperties["alignContent"]>;
  justifySelf?: Responsive<React.CSSProperties["justifySelf"]>;
  gap?: Responsive<TokenOrValue<number> | string>;
  rowGap?: Responsive<TokenOrValue<number> | string>;
  columnGap?: Responsive<TokenOrValue<number> | string>;
  minWidth?: Responsive<number | string>;
  maxWidth?: Responsive<number | string>;
  minHeight?: Responsive<number | string>;
  maxHeight?: Responsive<number | string>;
  aspectRatio?: Responsive<number | string>;

  // ── Border props ──────────────────────────────────────────────────────────
  borderStyle?: Responsive<React.CSSProperties["borderStyle"]>;
  borderTopWidth?: Responsive<number | string>;
  borderBottomWidth?: Responsive<number | string>;
  borderLeftWidth?: Responsive<number | string>;
  borderRightWidth?: Responsive<number | string>;
  borderTopColor?: Responsive<string>;
  borderBottomColor?: Responsive<string>;
  borderLeftColor?: Responsive<string>;
  borderRightColor?: Responsive<string>;
  borderTopLeftRadius?: Responsive<number | string>;
  borderTopRightRadius?: Responsive<number | string>;
  borderBottomLeftRadius?: Responsive<number | string>;
  borderBottomRightRadius?: Responsive<number | string>;

  // ── Visual props ──────────────────────────────────────────────────────────
  opacity?: Responsive<number>;
  backgroundColor?: Responsive<string>;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  shadowOffset?: { width: number; height: number };
  elevation?: number;

  // ── Spacing longhand ──────────────────────────────────────────────────────
  paddingTop?: Responsive<number | string>;
  paddingBottom?: Responsive<number | string>;
  paddingLeft?: Responsive<number | string>;
  paddingRight?: Responsive<number | string>;
  paddingHorizontal?: Responsive<number | string>;
  paddingVertical?: Responsive<number | string>;
  marginTop?: Responsive<number | string>;
  marginBottom?: Responsive<number | string>;
  marginLeft?: Responsive<number | string>;
  marginRight?: Responsive<number | string>;
  marginHorizontal?: Responsive<number | string>;
  marginVertical?: Responsive<number | string>;

  // ── Misc ──────────────────────────────────────────────────────────────────
  cursor?: Responsive<React.CSSProperties["cursor"]>;
  pointerEvents?: Responsive<React.CSSProperties["pointerEvents"]>;
  transform?: Responsive<React.CSSProperties["transform"]>;
  boxSizing?: Responsive<React.CSSProperties["boxSizing"]>;
  userSelect?: Responsive<React.CSSProperties["userSelect"]>;

  // ── Scroll ────────────────────────────────────────────────────────────────
  /** Renders a ScrollView on native / overflow:auto div on web */
  scrollable?: boolean;
  /** Horizontal scroll (requires scrollable=true) */
  horizontal?: boolean;

  // ── Interaction / accessibility ───────────────────────────────────────────
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement> | undefined;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement> | undefined;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement> | undefined;
  onPress?:
    | React.MouseEventHandler<HTMLDivElement>
    | ((event: import("react-native").GestureResponderEvent) => void)
    | (() => void)
    | undefined;
  role?: React.AriaRole | undefined;
  tabIndex?: number | undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement> | undefined;
  id?: string | undefined;
  "aria-label"?: string | undefined;
  "aria-hidden"?: boolean | "true" | "false" | undefined;
  "aria-disabled"?: boolean | "true" | "false" | undefined;
  "aria-expanded"?: boolean | "true" | "false" | undefined;
  "aria-checked"?: boolean | "true" | "false" | "mixed" | undefined;
  "aria-selected"?: boolean | "true" | "false" | undefined;
  "aria-busy"?: boolean | "true" | "false" | undefined;
  "aria-invalid"?:
    | boolean
    | "true"
    | "false"
    | "grammar"
    | "spelling"
    | undefined;
  "aria-orientation"?: "horizontal" | "vertical" | undefined;
  "data-testid"?: string | undefined;
  "data-theme"?: string | undefined;
  accessibilityRole?: string | undefined;
  accessibilityState?: Record<string, unknown> | undefined;

  // ── Standard React / RN ───────────────────────────────────────────────────
  /**
   * Style shorthand prop — accepts any Box style prop (spacing, colors, borders,
   * flex, responsive objects, $-breakpoint groups, token references, ThemeTokens).
   * Applied on top of other style props; `sx` values win on collision.
   *
   * Identical to Tamagui / Chakra's `sx` — lets you write arbitrary one-off
   * styles without creating a wrapper component.
   *
   * @example
   * <Box sx={{ mt: 16, bg: colors.celurenBlue[500], $md: { mt: 24 } }} />
   */
  sx?: SxProp;
  children?: React.ReactNode;
  /**
   * Style override — accepts CSSProperties, RN StyleSheet styles (numbers),
   * plain objects, AtomicStylesheet class strings, or arrays of any of these.
   */
  style?: StyleProp;
  testID?: string | undefined;
  accessibilityLabel?: string | undefined;
  className?: string | undefined;
}

// ---------------------------------------------------------------------------
// Prop name lists
// ---------------------------------------------------------------------------

const TOKEN_PROP_NAMES = [
  "bg",
  "color",
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
  "rounded",
  "borderWidth",
  "borderColor",
  "width",
  "height",
  "flex",
  "flexDirection",
  "alignItems",
  "justifyContent",
  "gap",
  "rowGap",
  "columnGap",
] as const;

const PLAIN_STYLE_PROPS: Array<keyof BoxProps> = [
  "position",
  "top",
  "bottom",
  "left",
  "right",
  "zIndex",
  "overflow",
  "overflowX",
  "overflowY",
  "display",
  "flexWrap",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "alignSelf",
  "alignContent",
  "justifySelf",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "aspectRatio",
  "borderStyle",
  "borderTopWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRightWidth",
  "borderTopColor",
  "borderBottomColor",
  "borderLeftColor",
  "borderRightColor",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "opacity",
  "backgroundColor",
  "shadowColor",
  "shadowOpacity",
  "shadowRadius",
  "shadowOffset",
  "elevation",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "cursor",
  "pointerEvents",
  "transform",
  "boxSizing",
  "userSelect",
];

const ALL_CONSUMED_PROPS: string[] = [
  ...TOKEN_PROP_NAMES,
  ...PLAIN_STYLE_PROPS.map(String),
  "type",
  "paddingHorizontal",
  "paddingVertical",
  "marginHorizontal",
  "marginVertical",
  "scrollable",
  "horizontal",
  "children",
  "style",
  "testID",
  "accessibilityLabel",
  "className",
  "onClick",
  "onMouseDown",
  "onMouseUp",
  "onMouseEnter",
  "onMouseLeave",
  "onPress",
  "role",
  "tabIndex",
  "onKeyDown",
  "id",
  "aria-label",
  "aria-hidden",
  "aria-disabled",
  "aria-expanded",
  "aria-checked",
  "aria-selected",
  "aria-busy",
  "aria-invalid",
  "aria-orientation",
  "data-testid",
  "data-theme",
  "accessibilityRole",
  "accessibilityState",
  "sx",
];

// ---------------------------------------------------------------------------
// Responsive style tag (web only)
// ---------------------------------------------------------------------------

const ResponsiveStyleTag: React.FC<{ css: string; scopeClass: string }> = ({
  css,
  scopeClass,
}) => {
  const styleRef = useRef<HTMLStyleElement | null>(null);
  useEffect(() => {
    if (!css) return;
    const el = document.createElement("style");
    el.setAttribute("data-szr", scopeClass);
    el.textContent = css;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => {
      styleRef.current?.parentNode?.removeChild(styleRef.current);
      styleRef.current = null;
    };
  }, [css, scopeClass]);
  return null;
};

// ---------------------------------------------------------------------------
// CSS unit helper — appends "px" to numbers for dimensional CSS properties
// ---------------------------------------------------------------------------

const UNITLESS_CSS_PROPS = new Set([
  "opacity",
  "flex",
  "flexGrow",
  "flexShrink",
  "zIndex",
  "fontWeight",
  "lineHeight",
  "order",
  "tabSize",
  "orphans",
  "widows",
  "animationIterationCount",
  "columnCount",
  "fillOpacity",
  "floodOpacity",
  "stopOpacity",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
]);

function toCssValue(cssProp: string, value: unknown): unknown {
  if (typeof value === "number" && !UNITLESS_CSS_PROPS.has(cssProp)) {
    return `${value}px`;
  }
  return value;
}

// ---------------------------------------------------------------------------
// Web prop resolution
// ---------------------------------------------------------------------------

function resolveWebProps(
  props: BoxProps,
  scopeClass: string,
  theme: ResolvedTheme,
): {
  inlineStyle: Record<string, unknown>;
  responsiveCss: string;
} {
  const inlineStyle: Record<string, unknown> = {};
  const cssRules: string[] = [];

  // Merge built-in prop map with config shorthands (config takes precedence)
  const uiConfig = getUiConfig();
  const configShorthands = uiConfig?.shorthands ?? {};
  const effectivePropMap: Record<string, string | string[]> = {
    ...propToCssProp,
    ...configShorthands,
  };

  function camel(kebab: string) {
    return kebab.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
  }

  function addResponsiveRule(
    cssProp: string,
    entries: Array<{ minWidth: number | null; value: unknown }>,
  ) {
    for (const entry of entries) {
      const cssVal = toCssValue(camel(cssProp), entry.value);
      if (entry.minWidth === null) {
        inlineStyle[camel(cssProp)] = cssVal;
      } else {
        cssRules.push(
          `@media(min-width:${
            entry.minWidth
          }px){.${scopeClass}{${cssProp}:${String(cssVal)}}}`,
        );
      }
    }
  }

  // Helper: resolve one prop name against effectivePropMap
  function resolveOneProp(propName: string, rawVal: unknown) {
    if (rawVal === undefined || rawVal === null) return;
    if (isResponsive(rawVal)) {
      const cssPropDef = effectivePropMap[propName];
      const unwrappedMap: Partial<Record<string, unknown>> = {};
      for (const [bp, bpVal] of Object.entries(
        rawVal as Record<string, unknown>,
      )) {
        unwrappedMap[bp] = resolveTokenOrValue(bpVal, theme);
      }
      const entries = buildMediaQueryEntries(
        unwrappedMap as Partial<Record<string, unknown>>,
      );
      if (Array.isArray(cssPropDef)) {
        for (const cp of cssPropDef) addResponsiveRule(cp, entries);
      } else if (cssPropDef) {
        addResponsiveRule(cssPropDef, entries);
      }
    } else {
      const resolved = resolveTokenOrValue(rawVal, theme);
      const cssProp = effectivePropMap[propName];
      if (Array.isArray(cssProp)) {
        for (const cp of cssProp)
          inlineStyle[camel(cp)] = toCssValue(camel(cp), resolved);
      } else if (cssProp) {
        inlineStyle[camel(cssProp)] = toCssValue(camel(cssProp), resolved);
      }
    }
  }

  // Resolve built-in token props
  for (const propName of TOKEN_PROP_NAMES) {
    resolveOneProp(propName, props[propName]);
  }

  // Resolve custom shorthand props from createUi({ shorthands }) config
  // These are any keys in effectivePropMap not already in TOKEN_PROP_NAMES
  const builtinSet = new Set<string>(TOKEN_PROP_NAMES);
  for (const propName of Object.keys(effectivePropMap)) {
    if (builtinSet.has(propName)) continue;
    const rawVal = (props as Record<string, unknown>)[propName];
    if (rawVal !== undefined && rawVal !== null)
      resolveOneProp(propName, rawVal);
  }

  // Plain style props
  for (const propName of PLAIN_STYLE_PROPS) {
    const rawVal = props[propName];
    if (rawVal === undefined || rawVal === null) continue;
    if (isResponsive(rawVal)) {
      const entries = buildMediaQueryEntries(
        rawVal as Partial<Record<string, unknown>>,
      );
      const kebab = (propName as string).replace(
        /([A-Z])/g,
        (c) => `-${c.toLowerCase()}`,
      );
      addResponsiveRule(kebab, entries);
    } else {
      inlineStyle[propName as string] = toCssValue(propName as string, rawVal);
    }
  }

  // Expand paddingHorizontal / paddingVertical / marginHorizontal / marginVertical
  const expandPairs: Array<[keyof BoxProps, string, string]> = [
    ["paddingHorizontal", "paddingLeft", "paddingRight"],
    ["paddingVertical", "paddingTop", "paddingBottom"],
    ["marginHorizontal", "marginLeft", "marginRight"],
    ["marginVertical", "marginTop", "marginBottom"],
  ];
  for (const [src, a, b] of expandPairs) {
    const rawVal = props[src];
    if (rawVal === undefined) continue;
    if (isResponsive(rawVal)) {
      const entries = buildMediaQueryEntries(
        rawVal as Partial<Record<string, unknown>>,
      );
      addResponsiveRule(
        a.replace(/([A-Z])/g, (c) => `-${c.toLowerCase()}`),
        entries,
      );
      addResponsiveRule(
        b.replace(/([A-Z])/g, (c) => `-${c.toLowerCase()}`),
        entries,
      );
    } else {
      inlineStyle[a] = toCssValue(a, rawVal);
      inlineStyle[b] = toCssValue(b, rawVal);
    }
  }

  // ── $-group pass (Req 4.4 / 4.5) ─────────────────────────────────────────
  // Runs AFTER the responsive-object pass so that on a same-property/same-breakpoint
  // collision the $-group value wins (it's emitted later → higher CSS source order).
  // Iterates breakpoints in ascending minWidth order for consistent output.
  const breakpointsForDollar = Object.entries(getBreakpoints()).sort(
    ([, a], [, b]) => a - b,
  );
  for (const [bpName, threshold] of breakpointsForDollar) {
    const dollarKey = `$${bpName}` as BreakpointPropKey;
    const groupVal = (props as Record<string, unknown>)[dollarKey];
    if (groupVal == null || typeof groupVal !== "object") continue;
    const group = groupVal as Record<string, unknown>;
    for (const [innerProp, innerVal] of Object.entries(group)) {
      if (innerVal === undefined || innerVal === null) continue;
      // Resolve token / value
      const resolved = resolveTokenOrValue(innerVal, theme);
      // Look up the CSS property — check effectivePropMap first, then camelCase passthrough
      const cssPropDef = effectivePropMap[innerProp];
      if (cssPropDef) {
        const targets = Array.isArray(cssPropDef) ? cssPropDef : [cssPropDef];
        for (const cp of targets) {
          cssRules.push(
            `@media(min-width:${threshold}px){.${scopeClass}{${cp}:${String(
              toCssValue(camel(cp), resolved),
            )}}}`,
          );
        }
      } else {
        // Plain style prop — camelCase → kebab-case for the media rule
        const kebab = innerProp.replace(
          /([A-Z])/g,
          (c) => `-${c.toLowerCase()}`,
        );
        cssRules.push(
          `@media(min-width:${threshold}px){.${scopeClass}{${kebab}:${String(
            toCssValue(innerProp, resolved),
          )}}}`,
        );
      }
    }
  }

  // Auto display:flex + default flexDirection:column
  // Triggered when any flex-related prop is set (or flex itself).
  // flexDirection defaults to "column" to match RN's default and web block behavior.
  const flexTriggers: Array<keyof BoxProps> = [
    "flexDirection",
    "alignItems",
    "justifyContent",
    "flexWrap",
    "alignContent",
    "gap",
    "rowGap",
    "columnGap",
  ];
  const hasFlexTrigger = flexTriggers.some(
    (p) => props[p] !== undefined && props[p] !== null,
  );
  const hasFlexProp = props.flex !== undefined && props.flex !== null;
  if ((hasFlexTrigger || hasFlexProp) && inlineStyle["display"] === undefined) {
    inlineStyle["display"] = "flex";
    // Default to column unless the caller already set flexDirection
    if (inlineStyle["flexDirection"] === undefined) {
      inlineStyle["flexDirection"] = "column";
    }
  }

  // Auto borderStyle:solid
  const borderWidthTriggers: Array<keyof BoxProps> = [
    "borderWidth",
    "borderTopWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "borderRightWidth",
  ];
  if (
    borderWidthTriggers.some(
      (p) => props[p] !== undefined && props[p] !== null,
    ) &&
    inlineStyle["borderStyle"] === undefined
  ) {
    inlineStyle["borderStyle"] = "solid";
  }

  return {
    inlineStyle,
    responsiveCss: cssRules.join("\n"),
  };
}

// ---------------------------------------------------------------------------
// Native prop resolution
// ---------------------------------------------------------------------------

function resolveNativeProps(
  props: BoxProps,
  runtime: RuntimeAdapter,
  windowWidth: number,
  theme: ResolvedTheme,
): Array<number | Record<string, unknown>> {
  const styles: Array<number | Record<string, unknown>> = [];
  const plainStyle: Record<string, unknown> = {};

  function unwrap<T>(val: Responsive<T> | undefined): T | undefined {
    if (val === undefined || val === null) return undefined;
    if (isResponsive(val)) return resolveResponsiveValue(val, windowWidth);
    return val as T;
  }

  // Register tokens (only static Token<T>, not ThemeTokens)
  const tokensToRegister: Token<unknown>[] = [];
  for (const propName of TOKEN_PROP_NAMES) {
    const val = unwrap(props[propName]);
    if (isToken(val)) tokensToRegister.push(val as Token<unknown>);
  }
  if (tokensToRegister.length > 0) runtime.register(tokensToRegister);

  // Resolve token props — ThemeTokens resolve to string values directly
  for (const propName of TOKEN_PROP_NAMES) {
    const val = unwrap(props[propName]);
    if (val === undefined || val === null) continue;
    if (isThemeToken(val)) {
      // ThemeToken → resolve to string value, apply as plain style
      const resolved = resolveThemeTokenFromTheme(val, theme);
      const rnProp = propToRnStyle[propName];
      if (rnProp) plainStyle[rnProp] = resolved;
    } else if (isToken(val)) {
      const styleId = runtime.resolve(val as Token<unknown>) as number;
      if (styleId !== undefined) styles.push(styleId);
    } else {
      const rnProp = propToRnStyle[propName];
      if (rnProp) plainStyle[rnProp] = val;
    }
  }

  // Plain style props
  for (const propName of PLAIN_STYLE_PROPS) {
    const val = unwrap(props[propName] as Responsive<unknown>);
    if (val !== undefined && val !== null) plainStyle[propName as string] = val;
  }

  // RN passthrough
  for (const propName of [
    "paddingHorizontal",
    "paddingVertical",
    "marginHorizontal",
    "marginVertical",
  ] as const) {
    const val = unwrap(props[propName] as Responsive<unknown>);
    if (val !== undefined) plainStyle[propName] = val;
  }

  // ── $-group pass (Req 4.4 / 4.5, native) ─────────────────────────────────
  // Mobile-first cascade: iterate breakpoints in ascending order.
  // Merge the group's props into plainStyle when windowWidth >= threshold,
  // so larger breakpoints overwrite smaller ones (same win condition as web).
  const breakpointsForDollar = Object.entries(getBreakpoints()).sort(
    ([, a], [, b]) => a - b,
  );
  for (const [bpName, threshold] of breakpointsForDollar) {
    if (windowWidth < threshold) continue;
    const dollarKey = `$${bpName}`;
    const groupVal = (props as Record<string, unknown>)[dollarKey];
    if (groupVal == null || typeof groupVal !== "object") continue;
    const group = groupVal as Record<string, unknown>;
    for (const [innerProp, innerVal] of Object.entries(group)) {
      if (innerVal === undefined || innerVal === null) continue;
      const resolved = resolveTokenOrValue(innerVal, theme);
      // Map shorthand → RN style key, falling back to the prop name directly
      const rnKey = propToRnStyle[innerProp] ?? innerProp;
      plainStyle[rnKey] = resolved;
    }
  }

  if (Object.keys(plainStyle).length > 0) styles.push(plainStyle);
  return styles;
}

// ---------------------------------------------------------------------------
// Box component
// ---------------------------------------------------------------------------

export function Box(props: BoxProps): React.ReactElement | null {
  const runtime = getRuntime();
  const theme = useTheme(); // always call — needed for ThemeToken resolution

  // useId must be called unconditionally (React hook rules)
  const uid = useId();

  // Merge sx into props so Box's resolver pipeline processes sx keys identically
  // to top-level props. sx values win on key collision (spread last).
  // Destructure sx out before spreading to satisfy exactOptionalPropertyTypes —
  // setting sx: undefined explicitly would violate the flag.
  let resolvedProps: BoxProps;
  if (props.sx && Object.keys(props.sx).length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sx: _sx, ...propsWithoutSx } = props;
    resolvedProps = { ...propsWithoutSx, ...props.sx } as BoxProps;
  } else {
    resolvedProps = props;
  }

  // Strip consumed props from rest to avoid DOM warnings
  const consumedSet = new Set<string>(ALL_CONSUMED_PROPS);
  const rest: Record<string, unknown> = {};
  for (const key of Object.keys(resolvedProps)) {
    // Skip all Box-consumed props, config shorthand keys, and any $-prefixed
    // breakpoint-as-prop keys (e.g. $md, $lg) — none of these should reach the DOM.
    if (consumedSet.has(key) || key.startsWith("$")) continue;
    rest[key] = (resolvedProps as Record<string, unknown>)[key];
  }

  const {
    children,
    style,
    testID,
    accessibilityLabel,
    className: extraClassName,
    onClick,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onPress,
    role,
    tabIndex,
    onKeyDown,
    id,
    "aria-label": ariaLabel,
    "aria-hidden": ariaHidden,
    "aria-disabled": ariaDisabled,
    "aria-expanded": ariaExpanded,
    "aria-checked": ariaChecked,
    "aria-selected": ariaSelected,
    "aria-busy": ariaBusy,
    "aria-invalid": ariaInvalid,
    "aria-orientation": ariaOrientation,
    "data-testid": dataTestId,
    "data-theme": dataTheme,
    accessibilityRole,
    accessibilityState,
    scrollable,
    horizontal,
  } = resolvedProps;

  // Resolve preset styles from the type prop (if provided)
  const presetStyle: Record<string, unknown> = resolvedProps.type
    ? BOX_PRESETS[resolvedProps.type]
    : {};

  if (isWeb) {
    const scopeClass = `szr-${uid.replace(/:/g, "")}`;
    const { inlineStyle, responsiveCss } = resolveWebProps(
      resolvedProps,
      scopeClass,
      theme,
    );

    const hasResponsive = responsiveCss.length > 0;

    // Merge: preset styles → token-derived styles → caller style override
    const flatCaller = flattenStyle(style);
    const merged: Record<string, unknown> = {
      ...presetStyle,
      ...inlineStyle,
      ...flatCaller,
    };

    // After merge, re-check display:flex + default flexDirection:column
    const flexCssProps = [
      "flex",
      "flexDirection",
      "alignItems",
      "justifyContent",
      "flexWrap",
      "alignContent",
      "gap",
      "rowGap",
      "columnGap",
    ];
    if (
      flexCssProps.some((p) => merged[p] !== undefined) &&
      merged["display"] === undefined
    ) {
      merged["display"] = "flex";
      if (merged["flexDirection"] === undefined) {
        merged["flexDirection"] = "column";
      }
    }

    // After merge, re-check borderStyle
    const borderCssProps = [
      "borderWidth",
      "borderTopWidth",
      "borderBottomWidth",
      "borderLeftWidth",
      "borderRightWidth",
    ];
    if (
      borderCssProps.some((p) => merged[p] !== undefined) &&
      merged["borderStyle"] === undefined
    ) {
      merged["borderStyle"] = "solid";
    }

    // Scrollable on web
    if (scrollable) {
      merged["overflow"] =
        merged["overflow"] ?? (horizontal ? "auto hidden" : "hidden auto");
    }

    const finalClassName = [
      hasResponsive ? scopeClass : undefined,
      extraClassName,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <>
        {hasResponsive && (
          <ResponsiveStyleTag css={responsiveCss} scopeClass={scopeClass} />
        )}
        <div
          id={id}
          className={finalClassName || undefined}
          style={
            Object.keys(merged).length > 0
              ? (merged as React.CSSProperties)
              : undefined
          }
          data-testid={dataTestId ?? testID}
          data-theme={dataTheme}
          aria-label={ariaLabel ?? accessibilityLabel}
          aria-hidden={ariaHidden}
          aria-disabled={ariaDisabled}
          aria-expanded={ariaExpanded}
          aria-checked={ariaChecked}
          aria-selected={ariaSelected}
          aria-busy={ariaBusy}
          aria-invalid={ariaInvalid}
          aria-orientation={ariaOrientation}
          role={role}
          tabIndex={tabIndex}
          onClick={
            onClick ??
            (onPress as React.MouseEventHandler<HTMLDivElement> | undefined)
          }
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onKeyDown={onKeyDown}
          {...rest}
        >
          {children}
        </div>
      </>
    );
  }

  // ── React Native ──────────────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const RN = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
    ScrollView: React.ComponentType<Record<string, unknown>>;
    Dimensions: { get: (dim: string) => { width: number; height: number } };
  };

  const windowWidth = RN.Dimensions.get("window").width;
  const resolvedStyles = resolveNativeProps(
    resolvedProps,
    runtime,
    windowWidth,
    theme,
  );

  // Flatten caller style (handles arrays, numbers, objects)
  const callerStyle = flattenStyle(style);
  const baseStyles: Array<number | Record<string, unknown>> =
    Object.keys(presetStyle).length > 0
      ? [presetStyle, ...resolvedStyles]
      : resolvedStyles;
  const finalStyles: Array<number | Record<string, unknown>> =
    callerStyle && Object.keys(callerStyle).length > 0
      ? [...baseStyles, callerStyle]
      : baseStyles;

  const rnProps: Record<string, unknown> = { children };
  if (finalStyles.length > 0) rnProps["style"] = finalStyles;
  if (testID !== undefined) rnProps["testID"] = testID;
  if (accessibilityLabel !== undefined)
    rnProps["accessibilityLabel"] = accessibilityLabel;
  if (accessibilityRole !== undefined)
    rnProps["accessibilityRole"] = accessibilityRole;
  if (accessibilityState !== undefined)
    rnProps["accessibilityState"] = accessibilityState;
  if (onPress !== undefined) rnProps["onPress"] = onPress;

  if (scrollable) {
    rnProps["horizontal"] = !!horizontal;
    rnProps["showsVerticalScrollIndicator"] = !horizontal;
    rnProps["showsHorizontalScrollIndicator"] = !!horizontal;
    return <RN.ScrollView {...rnProps} />;
  }

  return <RN.View {...rnProps} />;
}

Box.displayName = "Box";
export default Box;

// ---------------------------------------------------------------------------
// Legacy alias — prefer importing View from "./View" for full RN ViewProps
// ---------------------------------------------------------------------------

/** @deprecated Import View from "./View" for full RN ViewProps support. */
export const View = Box;
/** @deprecated Import ViewProps from "./View" for full RN ViewProps support. */
export type ViewProps = BoxProps;
