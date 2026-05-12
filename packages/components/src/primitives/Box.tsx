/**
 * Box — the foundational layout primitive for Stareezy UI.
 *
 * Cross-platform: renders a `<div>` on web and a `<View>` on React Native.
 *
 * Token props are resolved via the platform runtime adapter (O(1) lookup).
 * Plain string/number fallback values are applied as inline styles.
 * Responsive props (breakpoint maps) are resolved per-platform.
 *
 * Requirements: 11.1, 11.4, 11.5, 11.6, 16.2
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

// ---------------------------------------------------------------------------
// Re-exports from breakpoints
// ---------------------------------------------------------------------------

export { configureBreakpoints, getBreakpoints } from "./breakpoints";
export type {
  BreakpointKey,
  BreakpointConfig,
  Responsive,
} from "./breakpoints";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

/** True when running in a browser (web) environment. */
import { isWeb } from "../shared/platform";

// ---------------------------------------------------------------------------
// Lazy runtime singleton — created once per platform on first use
// ---------------------------------------------------------------------------

let _runtime: RuntimeAdapter | null = null;

function getRuntime(): RuntimeAdapter {
  if (_runtime === null) {
    _runtime = isWeb ? createWebRuntime() : createNativeRuntime();
  }
  return _runtime;
}

// ---------------------------------------------------------------------------
// Prop-to-CSS-property mapping (web only)
// ---------------------------------------------------------------------------

/**
 * Maps Box prop names to their corresponding CSS property names.
 * Multi-value props (px, py, mx, my) map to an array of CSS properties.
 */
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
};

/**
 * Maps Box prop names to their corresponding React Native style property names.
 */
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
};

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

/** A prop that accepts either a typed Token or a plain fallback value. */
type TokenOrValue<T> = Token<T> | T;

/** Checks whether a value is a Token object. */
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
  // ── Color props ──────────────────────────────────────────────────────────
  /** Background color — accepts a Token<string> or a plain CSS color string. */
  bg?: Responsive<TokenOrValue<string>>;
  /** Text/foreground color — accepts a Token<string> or a plain CSS color string. */
  color?: Responsive<TokenOrValue<string>>;
  /** Border color — accepts a Token<string> or a plain CSS color string. */
  borderColor?: Responsive<TokenOrValue<string>>;

  // ── Spacing token props ───────────────────────────────────────────────────
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

  // ── Border token props ────────────────────────────────────────────────────
  rounded?: Responsive<TokenOrValue<number> | string>;
  borderWidth?: Responsive<TokenOrValue<number> | string>;

  // ── Dimension token props ─────────────────────────────────────────────────
  width?: Responsive<TokenOrValue<number> | string>;
  height?: Responsive<TokenOrValue<number> | string>;

  // ── Flex token props ──────────────────────────────────────────────────────
  flex?: Responsive<TokenOrValue<number>>;
  flexDirection?: Responsive<TokenOrValue<string>>;
  alignItems?: Responsive<TokenOrValue<string>>;
  justifyContent?: Responsive<TokenOrValue<string>>;

  // ── Layout plain props ────────────────────────────────────────────────────
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
  gap?: Responsive<number | string>;
  rowGap?: Responsive<number | string>;
  columnGap?: Responsive<number | string>;
  minWidth?: Responsive<number | string>;
  maxWidth?: Responsive<number | string>;
  minHeight?: Responsive<number | string>;
  maxHeight?: Responsive<number | string>;
  aspectRatio?: Responsive<number | string>;

  // ── Border plain props ────────────────────────────────────────────────────
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

  // ── Visual plain props ────────────────────────────────────────────────────
  opacity?: Responsive<number>;
  backgroundColor?: Responsive<string>;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  shadowOffset?: { width: number; height: number };
  elevation?: number;

  // ── Spacing longhand plain props ──────────────────────────────────────────
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

  // ── Misc plain props ──────────────────────────────────────────────────────
  cursor?: Responsive<React.CSSProperties["cursor"]>;
  pointerEvents?: Responsive<React.CSSProperties["pointerEvents"]>;
  transform?: Responsive<React.CSSProperties["transform"]>;
  boxSizing?: Responsive<React.CSSProperties["boxSizing"]>;
  userSelect?: Responsive<React.CSSProperties["userSelect"]>;

  // ── Interaction / accessibility props ─────────────────────────────────────
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onPress?: ((event: unknown) => void) | undefined;
  role?: React.AriaRole;
  tabIndex?: number;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  id?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean | "true" | "false";
  "aria-disabled"?: boolean | "true" | "false";
  "aria-expanded"?: boolean | "true" | "false";
  "aria-checked"?: boolean | "true" | "false" | "mixed";
  "aria-selected"?: boolean | "true" | "false";
  "aria-busy"?: boolean | "true" | "false";
  "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling";
  "aria-orientation"?: "horizontal" | "vertical";
  "data-testid"?: string;
  "data-theme"?: string;
  accessibilityRole?: string | undefined;
  accessibilityState?: Record<string, unknown> | undefined;

  // ── Standard React / RN props ─────────────────────────────────────────────
  children?: React.ReactNode;
  style?: React.CSSProperties | Record<string, unknown>;
  testID?: string | undefined;
  accessibilityLabel?: string | undefined;
  className?: string;
}

// ---------------------------------------------------------------------------
// Token prop names (the full list of props that can carry Token values)
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
] as const;

// ---------------------------------------------------------------------------
// Plain style prop names — folded into inlineStyle on web / style on RN
// ---------------------------------------------------------------------------

/** Plain props that map 1:1 to camelCase CSS/RN style properties. */
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
  "gap",
  "rowGap",
  "columnGap",
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
  "cursor",
  "pointerEvents",
  "transform",
  "boxSizing",
  "userSelect",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
];

/** All props consumed by Box that must NOT be forwarded to the DOM element. */
const ALL_CONSUMED_PROPS: Array<keyof BoxProps> = [
  ...TOKEN_PROP_NAMES,
  ...PLAIN_STYLE_PROPS,
  "paddingHorizontal",
  "paddingVertical",
  "marginHorizontal",
  "marginVertical",
  "children",
  "style",
  "testID",
  "accessibilityLabel",
  "className",
  "onClick",
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
// ResponsiveStyleTag — injects media-query CSS into document.head
// ---------------------------------------------------------------------------

interface ResponsiveStyleTagProps {
  css: string;
  scopeClass: string;
}

const ResponsiveStyleTag: React.FC<ResponsiveStyleTagProps> = ({
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
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
      }
      styleRef.current = null;
    };
  }, [css, scopeClass]);

  return null;
};

// ---------------------------------------------------------------------------
// Web rendering
// ---------------------------------------------------------------------------

function resolveWebProps(
  props: BoxProps,
  runtime: RuntimeAdapter,
  scopeClass: string,
): {
  className: string;
  inlineStyle: React.CSSProperties;
  responsiveCss: string;
  hasResponsive: boolean;
} {
  const classNames: string[] = [];
  const inlineStyle: React.CSSProperties = {};
  const cssRules: string[] = [];

  // Helper: convert a CSS property + value into a scoped media-query rule
  function addResponsiveRule(
    cssProp: string,
    entries: Array<{ minWidth: number | null; value: unknown }>,
  ): void {
    for (const entry of entries) {
      const cssValue = String(entry.value);
      if (entry.minWidth === null) {
        // Base value — goes into inline style
        const camel = cssProp.replace(/-([a-z])/g, (_, c: string) =>
          c.toUpperCase(),
        );
        (inlineStyle as Record<string, unknown>)[camel] = entry.value;
      } else {
        cssRules.push(
          `@media(min-width:${entry.minWidth}px){.${scopeClass}{${cssProp}:${cssValue}}}`,
        );
      }
    }
  }

  // Register all token props before resolving
  const tokensToRegister: Token<unknown>[] = [];
  for (const propName of TOKEN_PROP_NAMES) {
    const rawVal = props[propName];
    // Unwrap responsive to find any tokens inside
    const val = isResponsive(rawVal) ? undefined : rawVal;
    if (isToken(val)) {
      tokensToRegister.push(val as Token<unknown>);
    }
  }
  if (tokensToRegister.length > 0) {
    runtime.register(tokensToRegister);
  }

  // Resolve token props
  for (const propName of TOKEN_PROP_NAMES) {
    const rawVal = props[propName];
    if (rawVal === undefined || rawVal === null) continue;

    if (isResponsive(rawVal)) {
      // Responsive breakpoint map — build media query entries
      const cssPropDef = propToCssProp[propName];
      const entries = buildMediaQueryEntries(
        rawVal as Partial<Record<string, unknown>>,
      );
      if (Array.isArray(cssPropDef)) {
        for (const cp of cssPropDef) {
          addResponsiveRule(cp, entries);
        }
      } else if (cssPropDef) {
        addResponsiveRule(cssPropDef, entries);
      }
    } else if (isToken(rawVal)) {
      const className = runtime.resolve(rawVal as Token<unknown>) as string;
      if (className) {
        classNames.push(className);
      }
    } else {
      const cssProp = propToCssProp[propName];
      if (Array.isArray(cssProp)) {
        for (const cp of cssProp) {
          const camel = cp.replace(/-([a-z])/g, (_, c: string) =>
            c.toUpperCase(),
          );
          (inlineStyle as Record<string, unknown>)[camel] = rawVal;
        }
      } else if (cssProp) {
        const camel = cssProp.replace(/-([a-z])/g, (_, c: string) =>
          c.toUpperCase(),
        );
        (inlineStyle as Record<string, unknown>)[camel] = rawVal;
      }
    }
  }

  // Fold plain style props into inlineStyle (or responsive CSS)
  for (const propName of PLAIN_STYLE_PROPS) {
    const rawVal = props[propName];
    if (rawVal === undefined || rawVal === null) continue;

    if (isResponsive(rawVal)) {
      const entries = buildMediaQueryEntries(
        rawVal as Partial<Record<string, unknown>>,
      );
      // Convert camelCase prop to kebab-case for CSS
      const kebab = (propName as string).replace(
        /([A-Z])/g,
        (c) => `-${c.toLowerCase()}`,
      );
      addResponsiveRule(kebab, entries);
    } else {
      (inlineStyle as Record<string, unknown>)[propName as string] = rawVal;
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
      const kebabA = a.replace(/([A-Z])/g, (c) => `-${c.toLowerCase()}`);
      const kebabB = b.replace(/([A-Z])/g, (c) => `-${c.toLowerCase()}`);
      addResponsiveRule(kebabA, entries);
      addResponsiveRule(kebabB, entries);
    } else {
      (inlineStyle as Record<string, unknown>)[a] = rawVal;
      (inlineStyle as Record<string, unknown>)[b] = rawVal;
    }
  }

  const responsiveCss = cssRules.join("\n");
  const hasResponsive = cssRules.length > 0;

  return {
    className: classNames.join(" "),
    inlineStyle,
    responsiveCss,
    hasResponsive,
  };
}

// ---------------------------------------------------------------------------
// React Native rendering
// ---------------------------------------------------------------------------

function resolveNativeProps(
  props: BoxProps,
  runtime: RuntimeAdapter,
  windowWidth: number,
): Array<number | Record<string, unknown>> {
  const styles: Array<number | Record<string, unknown>> = [];
  const plainStyle: Record<string, unknown> = {};

  // Helper: unwrap a potentially responsive value for the current window width
  function unwrap<T>(val: Responsive<T> | undefined): T | undefined {
    if (val === undefined || val === null) return undefined;
    if (isResponsive(val)) return resolveResponsiveValue(val, windowWidth);
    return val as T;
  }

  // Register all token props before resolving
  const tokensToRegister: Token<unknown>[] = [];
  for (const propName of TOKEN_PROP_NAMES) {
    const val = unwrap(props[propName]);
    if (isToken(val)) {
      tokensToRegister.push(val as Token<unknown>);
    }
  }
  if (tokensToRegister.length > 0) {
    runtime.register(tokensToRegister);
  }

  // Resolve token props
  for (const propName of TOKEN_PROP_NAMES) {
    const val = unwrap(props[propName]);
    if (val === undefined || val === null) continue;

    if (isToken(val)) {
      const styleId = runtime.resolve(val as Token<unknown>) as number;
      if (styleId !== undefined) {
        styles.push(styleId);
      }
    } else {
      const rnProp = propToRnStyle[propName];
      if (rnProp) {
        plainStyle[rnProp] = val;
      }
    }
  }

  // Fold plain style props directly into the style object
  for (const propName of PLAIN_STYLE_PROPS) {
    const val = unwrap(props[propName] as Responsive<unknown>);
    if (val !== undefined && val !== null) {
      plainStyle[propName as string] = val;
    }
  }

  // Pass paddingHorizontal / paddingVertical / marginHorizontal / marginVertical directly (RN supports them)
  const rnPassthrough: Array<keyof BoxProps> = [
    "paddingHorizontal",
    "paddingVertical",
    "marginHorizontal",
    "marginVertical",
  ];
  for (const propName of rnPassthrough) {
    const val = unwrap(props[propName] as Responsive<unknown>);
    if (val !== undefined) {
      plainStyle[propName as string] = val;
    }
  }

  if (Object.keys(plainStyle).length > 0) {
    styles.push(plainStyle);
  }

  return styles;
}

// ---------------------------------------------------------------------------
// Box component
// ---------------------------------------------------------------------------

export const Box: React.FC<BoxProps> = (props) => {
  const runtime = getRuntime();

  // Build a rest object that excludes all consumed props to avoid DOM warnings
  const rest: Record<string, unknown> = {};
  const consumedSet = new Set<string>(ALL_CONSUMED_PROPS as string[]);
  for (const key of Object.keys(props)) {
    if (!consumedSet.has(key)) {
      rest[key] = (props as Record<string, unknown>)[key];
    }
  }

  const {
    children,
    style,
    testID,
    accessibilityLabel,
    className: extraClassName,
    onClick,
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
  } = props;

  if (isWeb) {
    // ── Web rendering ──────────────────────────────────────────────────────
    // Generate a stable scope class for responsive media queries
    const uid = useId();
    const scopeClass = `szr-${uid.replace(/:/g, "")}`;

    const { className: tokenClassNames, inlineStyle, responsiveCss, hasResponsive } =
      resolveWebProps(props, runtime, scopeClass);

    const finalClassName = [
      tokenClassNames,
      hasResponsive ? scopeClass : undefined,
      extraClassName,
    ]
      .filter(Boolean)
      .join(" ");

    const finalStyle: React.CSSProperties = style
      ? { ...inlineStyle, ...(style as React.CSSProperties) }
      : inlineStyle;

    return (
      <>
        {hasResponsive && (
          <ResponsiveStyleTag css={responsiveCss} scopeClass={scopeClass} />
        )}
        <div
          id={id}
          className={finalClassName || undefined}
          style={Object.keys(finalStyle).length > 0 ? finalStyle : undefined}
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
          onClick={onClick}
          onKeyDown={onKeyDown}
          {...rest}
        >
          {children}
        </div>
      </>
    );
  } else {
    // ── React Native rendering ─────────────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { View: RNView, Dimensions } = require("react-native") as {
      View: React.ComponentType<Record<string, unknown>>;
      Dimensions: { get: (dim: string) => { width: number; height: number } };
    };

    const windowWidth = Dimensions.get("window").width;

    const resolvedStyles = resolveNativeProps(props, runtime, windowWidth);

    const finalStyles = style
      ? [...resolvedStyles, style as Record<string, unknown>]
      : resolvedStyles;

    const rnProps: Record<string, unknown> = {
      children,
    };
    if (finalStyles.length > 0) {
      rnProps["style"] = finalStyles;
    }
    if (testID !== undefined) {
      rnProps["testID"] = testID;
    }
    if (accessibilityLabel !== undefined) {
      rnProps["accessibilityLabel"] = accessibilityLabel;
    }
    if (accessibilityRole !== undefined) {
      rnProps["accessibilityRole"] = accessibilityRole;
    }
    if (accessibilityState !== undefined) {
      rnProps["accessibilityState"] = accessibilityState;
    }
    if (onPress !== undefined) {
      rnProps["onPress"] = onPress;
    }

    return <RNView {...rnProps} />;
  }
};

Box.displayName = "Box";

export default Box;

// ---------------------------------------------------------------------------
// Aliases
// ---------------------------------------------------------------------------

/** Alias for Box — use View when semantics match React Native's View. */
export const View = Box;

/** Alias for BoxProps. */
export type ViewProps = BoxProps;
