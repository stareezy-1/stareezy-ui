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
import { createWebRuntime, createNativeRuntime } from "@stareezy-ui/runtime";
import type { RuntimeAdapter } from "@stareezy-ui/runtime";
import {
  isResponsive,
  resolveResponsiveValue,
  buildMediaQueryEntries,
} from "./breakpoints";
import type { Responsive } from "./breakpoints";
import { isWeb } from "../shared/platform";
import { flattenStyle } from "../shared/flattenStyle";
import { EBoxType } from "./Box.types";
import { BOX_PRESETS } from "./Box.presets";

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
// Runtime singleton
// ---------------------------------------------------------------------------

let _runtime: RuntimeAdapter | null = null;
function getRuntime(): RuntimeAdapter {
  if (_runtime === null) {
    _runtime = isWeb ? createWebRuntime() : createNativeRuntime();
  }
  return _runtime;
}

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

type TokenOrValue<T> = Token<T> | T;

function isToken(value: unknown): value is Token<unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    (value as Record<string, unknown>)["__token"] === true
  );
}

// ---------------------------------------------------------------------------
// BoxProps
// ---------------------------------------------------------------------------

export interface BoxProps {
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
  flexDirection?: Responsive<TokenOrValue<string>>;
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
): {
  inlineStyle: Record<string, unknown>;
  responsiveCss: string;
} {
  const inlineStyle: Record<string, unknown> = {};
  const cssRules: string[] = [];

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

  // Resolve token props — extract .value from tokens, apply px units
  for (const propName of TOKEN_PROP_NAMES) {
    const rawVal = props[propName];
    if (rawVal === undefined || rawVal === null) continue;

    if (isResponsive(rawVal)) {
      const cssPropDef = propToCssProp[propName];
      // Unwrap token values inside the responsive map
      const unwrappedMap: Partial<Record<string, unknown>> = {};
      for (const [bp, bpVal] of Object.entries(
        rawVal as Record<string, unknown>,
      )) {
        unwrappedMap[bp] = isToken(bpVal)
          ? (bpVal as Token<unknown>).value
          : bpVal;
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
      // Resolve token to its value, or use plain value directly
      const resolved = isToken(rawVal)
        ? (rawVal as Token<unknown>).value
        : rawVal;
      const cssProp = propToCssProp[propName];
      if (Array.isArray(cssProp)) {
        for (const cp of cssProp) {
          inlineStyle[camel(cp)] = toCssValue(camel(cp), resolved);
        }
      } else if (cssProp) {
        inlineStyle[camel(cssProp)] = toCssValue(camel(cssProp), resolved);
      }
    }
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

  // Auto display:flex — only when no explicit display is set
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
): Array<number | Record<string, unknown>> {
  const styles: Array<number | Record<string, unknown>> = [];
  const plainStyle: Record<string, unknown> = {};

  function unwrap<T>(val: Responsive<T> | undefined): T | undefined {
    if (val === undefined || val === null) return undefined;
    if (isResponsive(val)) return resolveResponsiveValue(val, windowWidth);
    return val as T;
  }

  // Register tokens
  const tokensToRegister: Token<unknown>[] = [];
  for (const propName of TOKEN_PROP_NAMES) {
    const val = unwrap(props[propName]);
    if (isToken(val)) tokensToRegister.push(val as Token<unknown>);
  }
  if (tokensToRegister.length > 0) runtime.register(tokensToRegister);

  // Resolve token props
  for (const propName of TOKEN_PROP_NAMES) {
    const val = unwrap(props[propName]);
    if (val === undefined || val === null) continue;
    if (isToken(val)) {
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

  if (Object.keys(plainStyle).length > 0) styles.push(plainStyle);
  return styles;
}

// ---------------------------------------------------------------------------
// Box component
// ---------------------------------------------------------------------------

export const Box: React.FC<BoxProps> = (props) => {
  const runtime = getRuntime();

  // useId must be called unconditionally (React hook rules)
  const uid = useId(); // Strip consumed props from rest to avoid DOM warnings
  const consumedSet = new Set<string>(ALL_CONSUMED_PROPS);
  const rest: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (!consumedSet.has(key))
      rest[key] = (props as Record<string, unknown>)[key];
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
  } = props;

  // Resolve preset styles from the type prop (if provided)
  const presetStyle: Record<string, unknown> = props.type
    ? BOX_PRESETS[props.type]
    : {};

  if (isWeb) {
    const scopeClass = `szr-${uid.replace(/:/g, "")}`;
    const { inlineStyle, responsiveCss } = resolveWebProps(props, scopeClass);

    const hasResponsive = responsiveCss.length > 0;

    // Merge: preset styles → token-derived styles → caller style override
    const flatCaller = flattenStyle(style);
    const merged: Record<string, unknown> = {
      ...presetStyle,
      ...inlineStyle,
      ...flatCaller,
    };

    // After merge, re-check display:flex (caller style may have set flexDirection etc.)
    const flexCssProps = [
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
  const resolvedStyles = resolveNativeProps(props, runtime, windowWidth);

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
};

Box.displayName = "Box";
export default Box;

// ---------------------------------------------------------------------------
// Legacy alias — prefer importing View from "./View" for full RN ViewProps
// ---------------------------------------------------------------------------

/** @deprecated Import View from "./View" for full RN ViewProps support. */
export const View = Box;
/** @deprecated Import ViewProps from "./View" for full RN ViewProps support. */
export type ViewProps = BoxProps;
