/**
 * Breakpoints for the Stareezy UI responsive system.
 *
 * Default values match common device widths (mobile-first).
 * Override by calling `configureBreakpoints()` once at app startup,
 * or via `createUi({ media })` which auto-syncs through the global channel.
 *
 * Usage:
 *   <Box flex={{ base: 1, md: 2, lg: 3 }} />
 *   <Box display={{ base: "none", md: "flex" }} />
 */

import type { ConfigBreakpointKey } from "@stareezy-ui/tokens";

// ---------------------------------------------------------------------------
// Breakpoint keys
// ---------------------------------------------------------------------------

/**
 * Re-exported from @stareezy-ui/tokens so that this derives directly from
 * the consuming app's createUi({ media }) configuration via module augmentation.
 * When no augmentation is present, falls back to the default union.
 */
export type BreakpointKey = ConfigBreakpointKey;

// ---------------------------------------------------------------------------
// Default breakpoint values (min-width in px, mobile-first)
// ---------------------------------------------------------------------------

/** A flexible breakpoint config — keys are breakpoint names, values are min-widths in px. */
export type BreakpointConfig = Record<string, number>;

const DEFAULT_BREAKPOINTS: BreakpointConfig = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

let _breakpoints: BreakpointConfig | null = null;
let _initialized = false;

/**
 * Reads breakpoints from the shared global channel written by createUi,
 * falling back to the built-in defaults. Called lazily on first access so
 * values pushed by createUi (which may run before this module initialises)
 * are honoured.
 */
function ensureInitialized(): void {
  if (_initialized) return;
  _initialized = true;
  const global = globalThis as Record<string, unknown>;
  const fromChannel = global["__stareezy_breakpoints__"];
  if (
    fromChannel !== null &&
    typeof fromChannel === "object" &&
    !Array.isArray(fromChannel)
  ) {
    _breakpoints = {
      ...DEFAULT_BREAKPOINTS,
      ...(fromChannel as BreakpointConfig),
    };
  } else {
    _breakpoints = { ...DEFAULT_BREAKPOINTS };
  }
}

/**
 * Override the default breakpoints at app startup.
 *
 * Prefer using `createUi({ media })` which auto-syncs breakpoints.
 *
 * @example
 * configureBreakpoints({ sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 });
 */
export function configureBreakpoints(config: BreakpointConfig): void {
  ensureInitialized();
  _breakpoints = { ...(_breakpoints ?? DEFAULT_BREAKPOINTS), ...config };
  // Mark initialized so a subsequent ensureInitialized() won't overwrite
  _initialized = true;
}

/** Returns the current breakpoint config (read-only snapshot). */
export function getBreakpoints(): Readonly<BreakpointConfig> {
  ensureInitialized();
  return _breakpoints!;
}

// ---------------------------------------------------------------------------
// Responsive<T> — the type for any responsive prop
// ---------------------------------------------------------------------------

/**
 * A responsive value accepts either a plain value or a breakpoint map.
 *
 * @example
 * // Plain value — same at all breakpoints
 * flex={1}
 *
 * // Responsive — different value per breakpoint (mobile-first cascade)
 * flex={{ base: 1, md: 2, lg: 3 }}
 * display={{ base: "none", md: "flex" }}
 */
export type Responsive<T> = T | Partial<Record<BreakpointKey, T>>;

/** Returns true if a value is a responsive object (not a plain value). */
export function isResponsive<T>(
  value: Responsive<T>,
): value is Partial<Record<BreakpointKey, T>> {
  if (value === null || typeof value !== "object" || Array.isArray(value))
    return false;
  const obj = value as Record<string, unknown>;
  // Distinguish from Token objects
  if (obj["__token"]) return false;
  // Distinguish from shadowOffset { width, height }
  if ("width" in obj && "height" in obj) return false;
  // At least one key must match a known breakpoint — check against
  // the resolved config keys plus "base" (always valid).
  const bpKeys = new Set<string>(["base", ...Object.keys(getBreakpoints())]);
  return Object.keys(obj).some((k) => bpKeys.has(k));
}

/**
 * Resolve a responsive value to a plain value for React Native,
 * given the current window width.
 *
 * Uses mobile-first cascade: base → breakpoints in ascending threshold order.
 */
export function resolveResponsiveValue<T>(
  value: Responsive<T>,
  windowWidth: number,
): T | undefined {
  if (!isResponsive(value)) return value as T;

  const bp = getBreakpoints();
  const map = value as Partial<Record<string, T>>;

  // Mobile-first: start from base and override with larger breakpoints
  // Sort ascending by threshold value to ensure correct mobile-first cascade
  let resolved: T | undefined = map["base"];
  const sortedEntries = Object.entries(bp).sort(([, a], [, b]) => a - b);
  for (const [key, threshold] of sortedEntries) {
    if (windowWidth >= threshold && map[key] !== undefined) {
      resolved = map[key];
    }
  }

  return resolved;
}

/**
 * Build CSS media query rules for a responsive value.
 *
 * Returns an array of { minWidth, value } pairs, sorted ascending.
 * The `base` value has no media query (applied unconditionally).
 * Iterates the resolved BreakpointConfig keys so custom breakpoints work correctly.
 */
export function buildMediaQueryEntries<T>(
  value: Partial<Record<string, T>>,
): Array<{ minWidth: number | null; value: T }> {
  const bp = getBreakpoints();
  const entries: Array<{ minWidth: number | null; value: T }> = [];

  if (value["base"] !== undefined)
    entries.push({ minWidth: null, value: value["base"] });

  // Sort breakpoints ascending by threshold so media queries are ordered correctly
  const sortedEntries = Object.entries(bp).sort(([, a], [, b]) => a - b);
  for (const [key, threshold] of sortedEntries) {
    if (value[key] !== undefined) {
      entries.push({ minWidth: threshold, value: value[key]! });
    }
  }

  return entries;
}
