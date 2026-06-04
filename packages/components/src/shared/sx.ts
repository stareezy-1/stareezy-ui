/**
 * sx.ts — sx prop type and style resolution for Stareezy UI components.
 *
 * sx injects styles directly onto the component's own root element.
 * No wrapper elements are ever created — not for static values, not for
 * responsive values, not for $-breakpoint groups.
 *
 * Web:    static values → merged into inline style object
 *         responsive/$ values → emitted as @media rules into a scoped <style>
 * Native: responsive values resolved against current windowWidth
 */

import type React from "react";
import type { BoxProps } from "../primitives/Box";

// ---------------------------------------------------------------------------
// SxProp
// ---------------------------------------------------------------------------

type SxStyleKeys = Exclude<
  keyof BoxProps,
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
  | "type"
>;

/**
 * sx prop — accepts any Box style prop plus raw CSSProperties / RN style keys.
 * Applied directly on the component's own root element. sx wins on collision.
 *
 * - All Box shorthands: p, px, py, bg, color, rounded, flex, gap, …
 * - Responsive objects: { base: 8, md: 16 }
 * - $-breakpoint groups: $md={{ flexDirection: "row" }}
 * - Token / ThemeToken references
 * - Raw React.CSSProperties keys (boxShadow, fontFamily, textDecoration, …)
 * - Raw RN style keys (elevation, tintColor, textAlignVertical, …)
 */
export type SxProp = Pick<BoxProps, SxStyleKeys> & {
  // ── Raw CSSProperties pass-through ─────────────────────────────────────
  boxShadow?: React.CSSProperties["boxShadow"];
  outline?: React.CSSProperties["outline"];
  outlineOffset?: React.CSSProperties["outlineOffset"];
  textDecoration?: React.CSSProperties["textDecoration"];
  textDecorationLine?: React.CSSProperties["textDecorationLine"];
  textOverflow?: React.CSSProperties["textOverflow"];
  whiteSpace?: React.CSSProperties["whiteSpace"];
  wordBreak?: React.CSSProperties["wordBreak"];
  fontFamily?: React.CSSProperties["fontFamily"];
  fontSize?: React.CSSProperties["fontSize"];
  fontWeight?: React.CSSProperties["fontWeight"];
  fontStyle?: React.CSSProperties["fontStyle"];
  lineHeight?: React.CSSProperties["lineHeight"];
  letterSpacing?: React.CSSProperties["letterSpacing"];
  textAlign?: React.CSSProperties["textAlign"];
  verticalAlign?: React.CSSProperties["verticalAlign"];
  background?: React.CSSProperties["background"];
  backgroundImage?: React.CSSProperties["backgroundImage"];
  backgroundSize?: React.CSSProperties["backgroundSize"];
  backgroundPosition?: React.CSSProperties["backgroundPosition"];
  backgroundRepeat?: React.CSSProperties["backgroundRepeat"];
  border?: React.CSSProperties["border"];
  borderTop?: React.CSSProperties["borderTop"];
  borderRight?: React.CSSProperties["borderRight"];
  borderBottom?: React.CSSProperties["borderBottom"];
  borderLeft?: React.CSSProperties["borderLeft"];
  borderRadius?: React.CSSProperties["borderRadius"];
  visibility?: React.CSSProperties["visibility"];
  transition?: React.CSSProperties["transition"];
  animation?: React.CSSProperties["animation"];
  animationDelay?: React.CSSProperties["animationDelay"];
  animationDuration?: React.CSSProperties["animationDuration"];
  animationName?: React.CSSProperties["animationName"];
  filter?: React.CSSProperties["filter"];
  backdropFilter?: React.CSSProperties["backdropFilter"];
  objectFit?: React.CSSProperties["objectFit"];
  objectPosition?: React.CSSProperties["objectPosition"];
  resize?: React.CSSProperties["resize"];
  appearance?: React.CSSProperties["appearance"];
  WebkitAppearance?: string;
  WebkitFontSmoothing?: string;
  MozOsxFontSmoothing?: string;
  isolation?: React.CSSProperties["isolation"];
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
  willChange?: React.CSSProperties["willChange"];
  // ── RN style pass-through ────────────────────────────────────────────────
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  tintColor?: string;
  overlayColor?: string;
  includeFontPadding?: boolean;
  textAlignVertical?: "auto" | "top" | "bottom" | "center";
  writingDirection?: "auto" | "ltr" | "rtl";
  textShadowColor?: string;
  textShadowOffset?: { width: number; height: number };
  textShadowRadius?: number;
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
  // Escape hatch — any other style key
  [key: string]: unknown;
};

// ---------------------------------------------------------------------------
// Prop → CSS property map (shorthands only — raw keys pass through as-is)
// ---------------------------------------------------------------------------

const SHORTHAND_MAP: Record<string, string | [string, string]> = {
  bg: "backgroundColor",
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
  borderWidth: "borderWidth",
  borderColor: "borderColor",
  color: "color",
};

// Shorthand → CSS kebab for @media emission
const SHORTHAND_KEBAB: Record<string, string | [string, string]> = {
  bg: "background-color",
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
  color: "color",
};

const UNITLESS = new Set([
  "opacity",
  "flex",
  "flexGrow",
  "flexShrink",
  "zIndex",
  "fontWeight",
  "lineHeight",
  "order",
  "animationIterationCount",
  "columnCount",
  "fillOpacity",
  "strokeOpacity",
  "strokeWidth",
]);

function camelToKebab(s: string): string {
  return s
    .replace(/^Webkit/, "-webkit-")
    .replace(/^Moz/, "-moz-")
    .replace(/^Ms/, "-ms-")
    .replace(/([A-Z])/g, (c) => `-${c.toLowerCase()}`);
}

function toCssVal(prop: string, val: unknown): string {
  if (typeof val === "number" && !UNITLESS.has(prop)) return `${val}px`;
  return String(val);
}

function resolveToken(val: unknown): unknown {
  if (
    val !== null &&
    typeof val === "object" &&
    (val as Record<string, unknown>)["__token"] === true
  ) {
    return (val as Record<string, unknown>)["value"];
  }
  return val;
}

// ---------------------------------------------------------------------------
// getBreakpoints — reads from the same global channel as Box
// ---------------------------------------------------------------------------

function getSortedBreakpoints(): Array<[string, number]> {
  const global = globalThis as Record<string, unknown>;
  const channel = global["__stareezy_breakpoints__"];
  const map: Record<string, number> =
    channel !== null && typeof channel === "object" && !Array.isArray(channel)
      ? {
          sm: 480,
          md: 768,
          lg: 1024,
          xl: 1280,
          "2xl": 1536,
          ...(channel as Record<string, number>),
        }
      : { sm: 480, md: 768, lg: 1024, xl: 1280, "2xl": 1536 };
  return Object.entries(map).sort(([, a], [, b]) => a - b);
}

// ---------------------------------------------------------------------------
// resolveResponsiveForWidth — RN: pick the right value for a given windowWidth
// ---------------------------------------------------------------------------

function resolveResponsiveForWidth<T>(
  val: Record<string, T>,
  windowWidth: number,
): T | undefined {
  const bps = getSortedBreakpoints();
  let resolved: T | undefined = val["base"];
  for (const [key, threshold] of bps) {
    if (windowWidth >= threshold && val[key] !== undefined) {
      resolved = val[key];
    }
  }
  return resolved;
}

// ---------------------------------------------------------------------------
// isResponsiveLike — object with breakpoint keys (not a Token, not shadowOffset)
// ---------------------------------------------------------------------------

const BP_KEYS = new Set(["base", "sm", "md", "lg", "xl", "2xl"]);

function isResponsiveLike(val: unknown): val is Record<string, unknown> {
  if (val === null || typeof val !== "object" || Array.isArray(val))
    return false;
  const obj = val as Record<string, unknown>;
  if (obj["__token"]) return false;
  if ("width" in obj && "height" in obj) return false;
  const keys = Object.keys(obj);
  return keys.some((k) => BP_KEYS.has(k) || k.startsWith("$"));
}

// ---------------------------------------------------------------------------
// applySxProp — write one shorthand/raw prop into inlineStyle + cssRules
// ---------------------------------------------------------------------------

type StyleOut = Record<string, unknown>;

function applySxPropWeb(
  key: string,
  val: unknown,
  scopeClass: string,
  inlineStyle: StyleOut,
  cssRules: string[],
): void {
  if (key.startsWith("$")) {
    // $-breakpoint group: $md={{ p: 16, color: "red" }}
    const bpName = key.slice(1);
    const bps = getSortedBreakpoints();
    const threshold = bps.find(([k]) => k === bpName)?.[1];
    if (threshold === undefined || typeof val !== "object" || val === null)
      return;
    const group = val as Record<string, unknown>;
    const decls: string[] = [];
    for (const [innerKey, innerVal] of Object.entries(group)) {
      if (innerVal === undefined || innerVal === null) continue;
      const resolved = resolveToken(innerVal);
      emitWebDecl(innerKey, resolved, decls);
    }
    if (decls.length > 0) {
      cssRules.push(
        `@media(min-width:${threshold}px){.${scopeClass}{${decls.join(";")}}}`,
      );
    }
    return;
  }

  const resolved = resolveToken(val);

  if (isResponsiveLike(resolved)) {
    // Responsive object: { base: 8, md: 16 }
    const map = resolved as Record<string, unknown>;
    const bps = getSortedBreakpoints();

    if (map["base"] !== undefined) {
      const base = resolveToken(map["base"]);
      applyInlineShorthand(key, base, inlineStyle);
    }
    for (const [bpName, threshold] of bps) {
      if (map[bpName] === undefined) continue;
      const bpVal = resolveToken(map[bpName]);
      const decls: string[] = [];
      emitWebDecl(key, bpVal, decls);
      if (decls.length > 0) {
        cssRules.push(
          `@media(min-width:${threshold}px){.${scopeClass}{${decls.join(
            ";",
          )}}}`,
        );
      }
    }
    return;
  }

  // Plain value
  applyInlineShorthand(key, resolved, inlineStyle);
}

function emitWebDecl(key: string, val: unknown, decls: string[]): void {
  const kebabDef = SHORTHAND_KEBAB[key];
  if (kebabDef) {
    if (Array.isArray(kebabDef)) {
      for (const k of kebabDef) decls.push(`${k}:${toCssVal(k, val)}`);
    } else {
      decls.push(`${kebabDef}:${toCssVal(kebabDef, val)}`);
    }
  } else {
    const kebab = camelToKebab(key);
    decls.push(`${kebab}:${toCssVal(key, val)}`);
  }
}

function applyInlineShorthand(key: string, val: unknown, out: StyleOut): void {
  const cssDef = SHORTHAND_MAP[key];
  if (cssDef) {
    if (Array.isArray(cssDef)) {
      for (const k of cssDef) {
        out[k] = typeof val === "number" && !UNITLESS.has(k) ? `${val}px` : val;
      }
    } else {
      out[cssDef] =
        typeof val === "number" && !UNITLESS.has(cssDef) ? `${val}px` : val;
    }
  } else {
    // Pass raw CSS property through
    out[key] = typeof val === "number" && !UNITLESS.has(key) ? `${val}px` : val;
  }
}

// ---------------------------------------------------------------------------
// resolveSxWeb — returns { inlineStyle, cssRules } for the current sx value
// ---------------------------------------------------------------------------

export function resolveSxWeb(
  sx: SxProp | undefined,
  scopeClass: string,
): { inlineStyle: Record<string, unknown>; responsiveCss: string } {
  if (!sx) return { inlineStyle: {}, responsiveCss: "" };

  const inlineStyle: StyleOut = {};
  const cssRules: string[] = [];

  for (const [key, val] of Object.entries(sx)) {
    if (val === undefined || val === null) continue;
    applySxPropWeb(key, val, scopeClass, inlineStyle, cssRules);
  }

  return { inlineStyle, responsiveCss: cssRules.join("\n") };
}

// ---------------------------------------------------------------------------
// resolveSxNative — returns flat RN style for the current sx value
// ---------------------------------------------------------------------------

export function resolveSxNative(
  sx: SxProp | undefined,
  windowWidth: number,
): Record<string, unknown> {
  if (!sx) return {};

  const out: StyleOut = {};

  for (const [key, val] of Object.entries(sx)) {
    if (val === undefined || val === null || key.startsWith("$")) continue;

    const resolved = resolveToken(val);

    if (isResponsiveLike(resolved)) {
      const picked = resolveResponsiveForWidth(
        resolved as Record<string, unknown>,
        windowWidth,
      );
      if (picked !== undefined) {
        const r = resolveToken(picked);
        applyNativeShorthand(key, r, out);
      }
      continue;
    }

    applyNativeShorthand(key, resolved, out);
  }

  // Handle $-breakpoint groups on native (apply when windowWidth >= threshold)
  const bps = getSortedBreakpoints();
  for (const [bpName, threshold] of bps) {
    if (windowWidth < threshold) continue;
    const group = (sx as Record<string, unknown>)[`$${bpName}`];
    if (!group || typeof group !== "object") continue;
    for (const [innerKey, innerVal] of Object.entries(
      group as Record<string, unknown>,
    )) {
      if (innerVal === undefined || innerVal === null) continue;
      const r = resolveToken(innerVal);
      applyNativeShorthand(innerKey, r, out);
    }
  }

  return out;
}

function applyNativeShorthand(key: string, val: unknown, out: StyleOut): void {
  // Map web shorthands to their RN equivalents
  const rnMap: Record<string, string | [string, string]> = {
    bg: "backgroundColor",
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
    borderWidth: "borderWidth",
    borderColor: "borderColor",
    color: "color",
  };
  const mapped = rnMap[key];
  if (mapped) {
    if (Array.isArray(mapped)) {
      for (const k of mapped) out[k] = val;
    } else {
      out[mapped] = val;
    }
  } else {
    out[key] = val;
  }
}

// ---------------------------------------------------------------------------
// useSxStyle — React hook: resolves sx to { style, scopeClass, responsiveCss }
// for use in web components that build their own <style> tag for responsive sx.
// ---------------------------------------------------------------------------

export function useSxStyle(
  sx: SxProp | undefined,
  uid: string,
): {
  sxInlineStyle: Record<string, unknown>;
  sxResponsiveCss: string;
  sxScopeClass: string;
} {
  const scopeClass = `szx-${uid.replace(/:/g, "")}`;
  if (!sx)
    return { sxInlineStyle: {}, sxResponsiveCss: "", sxScopeClass: scopeClass };
  const { inlineStyle, responsiveCss } = resolveSxWeb(sx, scopeClass);
  return {
    sxInlineStyle: inlineStyle,
    sxResponsiveCss: responsiveCss,
    sxScopeClass: scopeClass,
  };
}

// ---------------------------------------------------------------------------
// Legacy exports kept for backward compatibility
// ---------------------------------------------------------------------------

export function resolveSxToStyle(
  sx: SxProp | undefined,
): Record<string, unknown> {
  const { inlineStyle } = resolveSxWeb(sx, "tmp");
  return inlineStyle;
}

export function hasDynamicSx(sx: SxProp | undefined): boolean {
  if (!sx) return false;
  for (const [key, val] of Object.entries(sx)) {
    if (key.startsWith("$")) return true;
    if (isResponsiveLike(val)) return true;
  }
  return false;
}

export function splitSx(sx: SxProp | undefined): {
  staticStyle: Record<string, unknown>;
  dynamicSx: SxProp | undefined;
} {
  // No longer splits — everything resolves inline. Keep for compat.
  return { staticStyle: resolveSxToStyle(sx), dynamicSx: undefined };
}

export function extractSx<P extends { sx?: SxProp }>(
  props: P,
): { sx: SxProp | undefined; rest: Omit<P, "sx"> } {
  const { sx, ...rest } = props;
  return { sx, rest: rest as Omit<P, "sx"> };
}
