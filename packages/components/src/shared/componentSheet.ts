/**
 * componentSheet.ts — shared singleton AtomicStyleSheet for all components.
 *
 * Each component registers its static geometry styles once on first render
 * (web only) and gets back a CSS class name. Dynamic / themed styles continue
 * to be applied as inline styles so they react to theme changes.
 *
 * Usage in a .style.ts file:
 *   export const SHEET_ID = "szc-badge-base";
 *   export const BADGE_BASE_CSS = { display: "inline-flex", ... };
 *
 * Usage in a .tsx file:
 *   const cls = useComponentClass(SHEET_ID, BADGE_BASE_CSS_STRING);
 *   // → "szc-badge-base" after registration; "" on native
 *
 * The sheet lives as a module-level singleton so it is shared across all
 * component instances and is only created once per page load.
 */

import { isWeb } from "./platform";

// ---------------------------------------------------------------------------
// Singleton style tag
// ---------------------------------------------------------------------------

let styleEl: HTMLStyleElement | null = null;
const injected = new Set<string>();

function getStyleEl(): HTMLStyleElement {
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "szc-components";
    document.head.appendChild(styleEl);
  }
  return styleEl;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Register a static CSS rule for a component class name.
 * Safe to call on every render — deduplicates by `id`.
 * Returns the class name on web, empty string on native.
 *
 * @param id   Stable class name (e.g. "szc-badge-base").
 * @param css  The full CSS rule string including selector,
 *             e.g. `.szc-badge-base { display: inline-flex; ... }`
 */
export function registerClass(id: string, css: string): string {
  if (!isWeb) return "";
  if (typeof document === "undefined") return "";
  if (injected.has(id)) return id;
  getStyleEl().textContent += `\n${css}`;
  injected.add(id);
  return id;
}

/**
 * Register a keyframe block once (e.g. `@keyframes szr-spin { ... }`).
 * Deduplicates by a stable key.
 */
export function registerKeyframes(key: string, css: string): void {
  if (!isWeb) return;
  if (typeof document === "undefined") return;
  if (injected.has(key)) return;
  getStyleEl().textContent += `\n${css}`;
  injected.add(key);
}

/**
 * Register multiple classes from a style object map.
 * Each key becomes a class name (`szc-<key>`), each value is a
 * `Record<string, string | number>` of CSS properties.
 *
 * Returns a map of key → full class name.
 *
 * @example
 * const cls = registerClasses("badge", {
 *   base: { display: "inline-flex", borderRadius: 9999 },
 *   sm:   { fontSize: 11, padding: "2px 8px" },
 * });
 * // cls.base === "szc-badge-base", cls.sm === "szc-badge-sm"
 */
export function registerClasses<K extends string>(
  prefix: string,
  rules: Record<K, Record<string, string | number>>,
): Record<K, string> {
  const result = {} as Record<K, string>;
  for (const key of Object.keys(rules) as K[]) {
    const id = `szc-${prefix}-${key}`;
    const declarations = toCssDeclarations(rules[key]);
    registerClass(id, `.${id} { ${declarations} }`);
    result[key] = id;
  }
  return result;
}

// ---------------------------------------------------------------------------
// CSS serialisation helpers
// ---------------------------------------------------------------------------

/**
 * Convert a camelCase style object to a CSS declaration string.
 * Numbers are suffixed with `px` unless the property is unitless.
 */
export function toCssDeclarations(
  styles: Record<string, string | number>,
): string {
  return Object.entries(styles)
    .map(([prop, value]) => {
      const kebab = camelToKebab(prop);
      const cssVal =
        typeof value === "number" && !UNITLESS_PROPS.has(prop)
          ? `${value}px`
          : String(value);
      return `${kebab}: ${cssVal}`;
    })
    .join("; ");
}

function camelToKebab(str: string): string {
  // Handle vendor prefixes like WebkitFontSmoothing → -webkit-font-smoothing
  return str
    .replace(/^Webkit/, "-webkit-")
    .replace(/^Moz/, "-moz-")
    .replace(/^Ms/, "-ms-")
    .replace(/([A-Z])/g, (c) => `-${c.toLowerCase()}`);
}

const UNITLESS_PROPS = new Set([
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
