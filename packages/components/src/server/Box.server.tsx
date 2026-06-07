/**
 * Box.server.tsx — server-safe Box primitive for React Server Components.
 *
 * This file MUST NOT contain any React hooks, context, or "use client" directive.
 * It is verified by the check-server-purity script.
 *
 * ThemeToken values are resolved to CSS custom property references:
 *   var(--szr-<tokenId>)
 * Token<T> values are resolved to their .value directly.
 * Plain values pass through unchanged.
 *
 * Server components are web-only (Next.js App Router RSC). This file
 * renders a <div> and never imports react-native.
 */

import React from "react";
import { isThemeToken, THEME_TOKEN_BRAND } from "@quasify-ui/tokens";
import type { ThemeToken } from "@quasify-ui/tokens";

// ---------------------------------------------------------------------------
// Token type guard (inline, no hook dependency)
// ---------------------------------------------------------------------------

function isToken(value: unknown): boolean {
  return (
    value !== null &&
    typeof value === "object" &&
    (value as Record<string, unknown>)["__token"] === true
  );
}

// ---------------------------------------------------------------------------
// Value resolver — no useTheme(), no hooks
// ---------------------------------------------------------------------------

/**
 * Resolves a prop value that may be a Token<T>, ThemeToken, or plain value.
 *
 * - `Token<T>` → read `.value` directly (static)
 * - `ThemeToken` → emit `var(--szr-<path>)` (CSS custom property injected by :root)
 * - Anything else → pass through
 */
function resolveServerValue(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value !== "object") return value;

  const obj = value as Record<string, unknown>;

  // ThemeToken detection: { __themeToken: true, path: "..." }
  if (isThemeToken(value)) {
    const token = value as ThemeToken;
    // Convert dot path to a CSS-safe identifier: "text.primary" → "text-primary"
    const cssId = token.path.replace(/\./g, "-");
    return `var(--szr-${cssId})`;
  }

  // Token<T> detection: { __token: true, value: T, ... }
  if (isToken(value)) {
    return obj["value"];
  }

  return value;
}

// ---------------------------------------------------------------------------
// Prop → CSS property mapping (web only, no RN)
// ---------------------------------------------------------------------------

const propToCssProp: Record<string, string | string[]> = {
  bg: "backgroundColor",
  color: "color",
  p: "padding",
  px: ["paddingLeft", "paddingRight"],
  py: ["paddingTop", "paddingBottom"],
  pt: "paddingTop",
  pb: "paddingBottom",
  pl: "paddingLeft",
  pr: "paddingRight",
  m: "margin",
  mx: ["marginLeft", "marginRight"],
  my: ["marginTop", "marginBottom"],
  mt: "marginTop",
  mb: "marginBottom",
  ml: "marginLeft",
  mr: "marginRight",
  rounded: "borderRadius",
  borderColor: "borderColor",
  borderWidth: "borderWidth",
  width: "width",
  height: "height",
  flex: "flex",
  flexDirection: "flexDirection",
  alignItems: "alignItems",
  justifyContent: "justifyContent",
  gap: "gap",
};

// CSS properties that should NOT get "px" suffix on numbers
const UNITLESS_CSS_PROPS = new Set([
  "opacity",
  "flex",
  "flexGrow",
  "flexShrink",
  "zIndex",
  "fontWeight",
  "lineHeight",
  "order",
]);

function toCssValue(prop: string, value: unknown): string | number | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number" && !UNITLESS_CSS_PROPS.has(prop)) {
    return `${value}px`;
  }
  return value as string | number;
}

// ---------------------------------------------------------------------------
// ServerBoxProps — subset of Box props safe for server components
// ---------------------------------------------------------------------------

export interface ServerBoxProps {
  // Token / shorthand props
  bg?: unknown;
  color?: unknown;
  p?: unknown;
  px?: unknown;
  py?: unknown;
  pt?: unknown;
  pb?: unknown;
  pl?: unknown;
  pr?: unknown;
  m?: unknown;
  mx?: unknown;
  my?: unknown;
  mt?: unknown;
  mb?: unknown;
  ml?: unknown;
  mr?: unknown;
  rounded?: unknown;
  borderColor?: unknown;
  borderWidth?: unknown;
  width?: unknown;
  height?: unknown;
  flex?: unknown;
  flexDirection?: unknown;
  alignItems?: unknown;
  justifyContent?: unknown;
  gap?: unknown;

  // Layout extras (plain values only — no responsive objects in server)
  position?: React.CSSProperties["position"];
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  zIndex?: number | string;
  overflow?: React.CSSProperties["overflow"];
  display?: React.CSSProperties["display"];
  flexWrap?: React.CSSProperties["flexWrap"];
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  alignSelf?: React.CSSProperties["alignSelf"];
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  opacity?: number;

  // Accessibility
  role?: React.AriaRole;
  id?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean | "true" | "false";
  "aria-disabled"?: boolean | "true" | "false";
  "aria-expanded"?: boolean | "true" | "false";
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "data-testid"?: string;

  // Children + style
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

// ---------------------------------------------------------------------------
// The consumed prop names — excluded from DOM passthrough
// ---------------------------------------------------------------------------

const SERVER_SHORTHAND_PROPS = new Set(Object.keys(propToCssProp));

const EXTRA_CONSUMED_PROPS = new Set([
  "position",
  "top",
  "bottom",
  "left",
  "right",
  "zIndex",
  "overflow",
  "display",
  "flexWrap",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "alignSelf",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "opacity",
  "children",
  "style",
  "className",
  "role",
  "id",
  "aria-label",
  "aria-hidden",
  "aria-disabled",
  "aria-expanded",
  "aria-labelledby",
  "aria-describedby",
  "data-testid",
]);

// ---------------------------------------------------------------------------
// resolveServerStyle — build an inline style object from ServerBoxProps
// ---------------------------------------------------------------------------

function resolveServerStyle(props: ServerBoxProps): React.CSSProperties {
  const style: Record<string, string | number | undefined> = {};

  // Resolve all shorthand / token props
  for (const propName of SERVER_SHORTHAND_PROPS) {
    const rawVal = (props as Record<string, unknown>)[propName];
    if (rawVal === undefined || rawVal === null) continue;

    const resolved = resolveServerValue(rawVal);
    if (resolved === undefined || resolved === null) continue;

    const cssPropDef = propToCssProp[propName];
    if (Array.isArray(cssPropDef)) {
      for (const cp of cssPropDef) {
        style[cp] = toCssValue(cp, resolved);
      }
    } else if (cssPropDef) {
      style[cssPropDef] = toCssValue(cssPropDef, resolved);
    }
  }

  // Plain layout props — pass through directly
  const plainProps = [
    "position",
    "top",
    "bottom",
    "left",
    "right",
    "zIndex",
    "overflow",
    "display",
    "flexWrap",
    "flexGrow",
    "flexShrink",
    "flexBasis",
    "alignSelf",
    "minWidth",
    "maxWidth",
    "minHeight",
    "maxHeight",
    "opacity",
  ] as const;

  for (const propName of plainProps) {
    const val = props[propName];
    if (val !== undefined && val !== null) {
      style[propName] = toCssValue(propName, val);
    }
  }

  // Auto display:flex when flex-layout props are set
  const flexTriggers = [
    "flexDirection",
    "alignItems",
    "justifyContent",
    "flexWrap",
    "gap",
  ];
  const hasFlexTrigger = flexTriggers.some(
    (p) => (props as Record<string, unknown>)[p] !== undefined,
  );
  if (hasFlexTrigger && style["display"] === undefined) {
    style["display"] = "flex";
    if (style["flexDirection"] === undefined) {
      style["flexDirection"] = "column";
    }
  }

  // Auto borderStyle:solid when borderWidth is set
  if (
    (props.borderWidth !== undefined || props.borderColor !== undefined) &&
    style["borderStyle"] === undefined
  ) {
    style["borderStyle"] = "solid";
  }

  return style as React.CSSProperties;
}

// ---------------------------------------------------------------------------
// ServerBox component — hook-free, server-safe
// ---------------------------------------------------------------------------

export const ServerBox: React.FC<ServerBoxProps> = (props) => {
  const resolvedStyle = resolveServerStyle(props);

  // Merge computed style with explicit style override
  const mergedStyle: React.CSSProperties =
    props.style !== undefined
      ? { ...resolvedStyle, ...props.style }
      : resolvedStyle;

  // Build DOM passthrough props (strip all consumed props)
  const domProps: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (SERVER_SHORTHAND_PROPS.has(key)) continue;
    if (EXTRA_CONSUMED_PROPS.has(key)) continue;
    domProps[key] = (props as Record<string, unknown>)[key];
  }

  return (
    <div
      {...(props.id !== undefined ? { id: props.id } : {})}
      {...(props.role !== undefined ? { role: props.role } : {})}
      {...(props["aria-label"] !== undefined
        ? { "aria-label": props["aria-label"] }
        : {})}
      {...(props["aria-hidden"] !== undefined
        ? { "aria-hidden": props["aria-hidden"] }
        : {})}
      {...(props["aria-disabled"] !== undefined
        ? { "aria-disabled": props["aria-disabled"] }
        : {})}
      {...(props["aria-expanded"] !== undefined
        ? { "aria-expanded": props["aria-expanded"] }
        : {})}
      {...(props["aria-labelledby"] !== undefined
        ? { "aria-labelledby": props["aria-labelledby"] }
        : {})}
      {...(props["aria-describedby"] !== undefined
        ? { "aria-describedby": props["aria-describedby"] }
        : {})}
      {...(props["data-testid"] !== undefined
        ? { "data-testid": props["data-testid"] }
        : {})}
      {...(props.className !== undefined ? { className: props.className } : {})}
      {...domProps}
      style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
    >
      {props.children}
    </div>
  );
};

ServerBox.displayName = "ServerBox";
