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
 *
 * Fix summary (v1.1.1):
 * - Config shorthands (w→width, h→height, br→borderRadius, etc.) now resolved
 *   at runtime from getUiConfig().shorthands — no longer hardcoded.
 * - BP_KEYS is now dynamic — reads from the same breakpoint channel as Box,
 *   so custom breakpoints (3xl, etc.) work in responsive objects.
 * - All BoxProps keys (display, position, overflow, …) pass through correctly
 *   in both static and responsive contexts.
 */

import type React from "react";
import type { BoxProps } from "../primitives/Box";
import { getUiConfig } from "@stareezy-ui/tokens";

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
 * - All Box shorthands + config shorthands: p, px, py, bg, w, h, br, fz, …
 * - All Box layout/visual props: display, position, overflow, opacity, …
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
  // Escape hatch — any other style key (config shorthands, raw CSS props, etc.)
  [key: string]: unknown;
};

// ---------------------------------------------------------------------------
// Built-in shorthand → CSS property maps
// These are the hardcoded Box shorthands. Config shorthands are merged in at
// runtime via getEffectiveShorthandMaps().
// ---------------------------------------------------------------------------

/** Built-in shorthand → camelCase CSS property (for inline style objects) */
const BUILTIN_SHORTHAND_MAP: Record<string, string | [string, string]> = {
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

/** Built-in shorthand → kebab-case CSS property (for @media rule strings) */
const BUILTIN_SHORTHAND_KEBAB: Record<string, string | [string, string]> = {
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

// ---------------------------------------------------------------------------
// Runtime shorthand resolution — merges config shorthands into built-ins
// ---------------------------------------------------------------------------

/**
 * Convert a camelCase CSS property name to kebab-case.
 * e.g. "backgroundColor" → "background-color", "borderRadius" → "border-radius"
 */
function camelToKebab(s: string): string {
  return s
    .replace(/^Webkit/, "-webkit-")
    .replace(/^Moz/, "-moz-")
    .replace(/^Ms/, "-ms-")
    .replace(/([A-Z])/g, (c) => `-${c.toLowerCase()}`);
}

/**
 * Map a config shorthand value to its web CSS property.
 * Config shorthands use camelCase CSS property names (e.g. "backgroundColor").
 * We need both the camelCase version (for inline style) and kebab (for @media).
 *
 * Special cases from stareezy.config.ts shorthands:
 *   paddingHorizontal → [paddingLeft, paddingRight]
 *   paddingVertical   → [paddingTop, paddingBottom]
 *   marginHorizontal  → [marginLeft, marginRight]
 *   marginVertical    → [marginTop, marginBottom]
 */
const EXPAND_PAIRS: Record<string, [string, string]> = {
  paddingHorizontal: ["paddingLeft", "paddingRight"],
  paddingVertical: ["paddingTop", "paddingBottom"],
  marginHorizontal: ["marginLeft", "marginRight"],
  marginVertical: ["marginTop", "marginBottom"],
};

function getConfigShorthandCamel(cssProp: string): string | [string, string] {
  if (EXPAND_PAIRS[cssProp]) return EXPAND_PAIRS[cssProp];
  return cssProp; // already camelCase
}

function getConfigShorthandKebab(cssProp: string): string | [string, string] {
  if (EXPAND_PAIRS[cssProp]) {
    const [a, b] = EXPAND_PAIRS[cssProp];
    return [camelToKebab(a), camelToKebab(b)];
  }
  return camelToKebab(cssProp);
}

/** Lazily built effective shorthand maps (built-in + config). */
let _effectiveCamelMap: Record<string, string | [string, string]> | null = null;
let _effectiveKebabMap: Record<string, string | [string, string]> | null = null;

function getEffectiveShorthandMaps(): {
  camel: Record<string, string | [string, string]>;
  kebab: Record<string, string | [string, string]>;
} {
  if (_effectiveCamelMap && _effectiveKebabMap) {
    return { camel: _effectiveCamelMap, kebab: _effectiveKebabMap };
  }

  const configShorthands = getUiConfig()?.shorthands ?? {};
  const camel: Record<string, string | [string, string]> = {
    ...BUILTIN_SHORTHAND_MAP,
  };
  const kebab: Record<string, string | [string, string]> = {
    ...BUILTIN_SHORTHAND_KEBAB,
  };

  for (const [alias, cssProp] of Object.entries(configShorthands)) {
    // Don't overwrite built-ins — they have their own (possibly multi-target) mappings
    if (!(alias in camel)) {
      camel[alias] = getConfigShorthandCamel(cssProp);
    }
    if (!(alias in kebab)) {
      kebab[alias] = getConfigShorthandKebab(cssProp);
    }
  }

  _effectiveCamelMap = camel;
  _effectiveKebabMap = kebab;
  return { camel, kebab };
}

// ---------------------------------------------------------------------------
// Unitless CSS properties
// ---------------------------------------------------------------------------

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

function toCssVal(prop: string, val: unknown): string {
  if (typeof val === "number" && !UNITLESS.has(prop)) return `${val}px`;
  return String(val);
}

// ---------------------------------------------------------------------------
// Token resolution
// ---------------------------------------------------------------------------

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
// Breakpoint helpers — dynamic, reads from the same global channel as Box
// ---------------------------------------------------------------------------

function getSortedBreakpoints(): Array<[string, number]> {
  const global = globalThis as Record<string, unknown>;
  const channel = global["__stareezy_breakpoints__"];
  const defaults: Record<string, number> = {
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };
  const map: Record<string, number> =
    channel !== null && typeof channel === "object" && !Array.isArray(channel)
      ? { ...defaults, ...(channel as Record<string, number>) }
      : defaults;
  return Object.entries(map).sort(([, a], [, b]) => a - b);
}

/**
 * Returns a Set of all known breakpoint keys (including "base" and config keys).
 * Used by isResponsiveLike to recognise responsive objects correctly.
 */
function getBreakpointKeySet(): Set<string> {
  const bps = getSortedBreakpoints();
  return new Set(["base", ...bps.map(([k]) => k)]);
}

// ---------------------------------------------------------------------------
// isResponsiveLike — detects responsive objects { base?, sm?, md?, … }
// Uses dynamic breakpoint keys so custom keys (3xl, etc.) are recognised.
// ---------------------------------------------------------------------------

function isResponsiveLike(val: unknown): val is Record<string, unknown> {
  if (val === null || typeof val !== "object" || Array.isArray(val))
    return false;
  const obj = val as Record<string, unknown>;
  if (obj["__token"]) return false;
  // Distinguish from shadowOffset { width, height }
  if ("width" in obj && "height" in obj && Object.keys(obj).length === 2)
    return false;
  const bpKeys = getBreakpointKeySet();
  return Object.keys(obj).some((k) => bpKeys.has(k) || k.startsWith("$"));
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
// Core emitters
// ---------------------------------------------------------------------------

type StyleOut = Record<string, unknown>;

/**
 * Emit a CSS declaration into decls[] using the effective shorthand map.
 * Falls back to camelToKebab passthrough for raw CSS properties.
 */
function emitWebDecl(key: string, val: unknown, decls: string[]): void {
  const { kebab } = getEffectiveShorthandMaps();
  const kebabDef = kebab[key];
  if (kebabDef) {
    if (Array.isArray(kebabDef)) {
      for (const k of kebabDef) decls.push(`${k}:${toCssVal(k, val)}`);
    } else {
      decls.push(`${kebabDef}:${toCssVal(kebabDef, val)}`);
    }
  } else {
    // Raw CSS property (display, position, overflow, …) — camelToKebab passthrough
    const k = camelToKebab(key);
    decls.push(`${k}:${toCssVal(key, val)}`);
  }
}

/**
 * Apply a single prop into the inline style object using the effective shorthand map.
 * Falls back to raw CSS passthrough for unknown keys.
 */
function applyInlineShorthand(key: string, val: unknown, out: StyleOut): void {
  const { camel } = getEffectiveShorthandMaps();
  const cssDef = camel[key];
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
    // Raw CSS property passthrough — key is already camelCase (e.g. "display")
    out[key] = typeof val === "number" && !UNITLESS.has(key) ? `${val}px` : val;
  }
}

// ---------------------------------------------------------------------------
// applySxPropWeb — resolve one prop into inlineStyle + cssRules
// ---------------------------------------------------------------------------

function applySxPropWeb(
  key: string,
  val: unknown,
  scopeClass: string,
  inlineStyle: StyleOut,
  cssRules: string[],
): void {
  // ── $-breakpoint group: $md={{ p: 16, color: "red" }} ─────────────────────
  if (key.startsWith("$")) {
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

  // ── Responsive object: { base: 8, md: 16, sm: "inline-flex" } ─────────────
  if (isResponsiveLike(resolved)) {
    const map = resolved as Record<string, unknown>;
    const bps = getSortedBreakpoints();

    // base value → inline style
    if (map["base"] !== undefined) {
      const base = resolveToken(map["base"]);
      applyInlineShorthand(key, base, inlineStyle);
    }
    // per-breakpoint values → @media rules
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

  // ── Plain value ────────────────────────────────────────────────────────────
  applyInlineShorthand(key, resolved, inlineStyle);
}

// ---------------------------------------------------------------------------
// resolveSxWeb
// ---------------------------------------------------------------------------

export function resolveSxWeb(
  sx: SxProp | undefined,
  scopeClass: string,
): { inlineStyle: Record<string, unknown>; responsiveCss: string } {
  if (!sx) return { inlineStyle: {}, responsiveCss: "" };

  const inlineStyle: StyleOut = {};
  const cssRules: string[] = [];

  // Two-pass: longhands first, then shorthands, then $-groups.
  // This ensures shorthands (p, m, bg, w, …) win over conflicting longhands
  // when both are present: sx={{ p: 16, paddingLeft: 8 }} → p wins.
  const { camel } = getEffectiveShorthandMaps();
  const SHORTHAND_KEYS = new Set(Object.keys(camel));

  const entries = Object.entries(sx);
  const nonShorthands = entries.filter(
    ([k]) => !SHORTHAND_KEYS.has(k) && !k.startsWith("$"),
  );
  const shorthands = entries.filter(
    ([k]) => SHORTHAND_KEYS.has(k) && !k.startsWith("$"),
  );
  const breakpointGroups = entries.filter(([k]) => k.startsWith("$"));

  for (const [key, val] of [
    ...nonShorthands,
    ...shorthands,
    ...breakpointGroups,
  ]) {
    if (val === undefined || val === null) continue;
    applySxPropWeb(key, val, scopeClass, inlineStyle, cssRules);
  }

  return { inlineStyle, responsiveCss: cssRules.join("\n") };
}

// ---------------------------------------------------------------------------
// resolveSxNative
// ---------------------------------------------------------------------------

/**
 * Apply a prop into a React Native style object.
 * Uses effective shorthand map (built-in + config).
 */
function applyNativeShorthand(key: string, val: unknown, out: StyleOut): void {
  const { camel } = getEffectiveShorthandMaps();

  // Built-in + config camel map covers web CSS property names.
  // For RN we need to map px→[paddingLeft,paddingRight], etc.
  // The camel map already has the right RN-compatible names for most keys.
  const mapped = camel[key];
  if (mapped) {
    if (Array.isArray(mapped)) {
      for (const k of mapped) out[k] = val;
    } else {
      out[mapped] = val;
    }
  } else {
    // Raw prop passthrough (flexDirection, alignItems, etc.)
    out[key] = val;
  }
}

export function resolveSxNative(
  sx: SxProp | undefined,
  windowWidth: number,
): Record<string, unknown> {
  if (!sx) return {};

  const out: StyleOut = {};
  const { camel } = getEffectiveShorthandMaps();
  const SHORTHAND_KEYS = new Set(Object.keys(camel));

  const entries = Object.entries(sx).filter(([k]) => !k.startsWith("$"));
  const nonShorthands = entries.filter(([k]) => !SHORTHAND_KEYS.has(k));
  const shorthands = entries.filter(([k]) => SHORTHAND_KEYS.has(k));

  for (const [key, val] of [...nonShorthands, ...shorthands]) {
    if (val === undefined || val === null) continue;

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

  // $-breakpoint groups on native
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

// ---------------------------------------------------------------------------
// useSxStyle — React hook
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
// Legacy exports
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
  return { staticStyle: resolveSxToStyle(sx), dynamicSx: undefined };
}

export function extractSx<P extends { sx?: SxProp }>(
  props: P,
): { sx: SxProp | undefined; rest: Omit<P, "sx"> } {
  const { sx, ...rest } = props;
  return { sx, rest: rest as Omit<P, "sx"> };
}
