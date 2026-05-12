/**
 * Breakpoints for the Stareezy UI responsive system.
 *
 * Default values match common device widths (mobile-first).
 * Override by calling `configureBreakpoints()` once at app startup.
 *
 * Usage:
 *   <Box flex={{ base: 1, md: 2, lg: 3 }} />
 *   <Box display={{ base: "none", md: "flex" }} />
 */

// ---------------------------------------------------------------------------
// Breakpoint keys
// ---------------------------------------------------------------------------

export type BreakpointKey = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

// ---------------------------------------------------------------------------
// Default breakpoint values (min-width in px, mobile-first)
// ---------------------------------------------------------------------------

export interface BreakpointConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

let _breakpoints: BreakpointConfig = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Override the default breakpoints at app startup.
 *
 * @example
 * configureBreakpoints({ sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 });
 */
export function configureBreakpoints(config: Partial<BreakpointConfig>): void {
  _breakpoints = { ..._breakpoints, ...config };
}

/** Returns the current breakpoint config (read-only snapshot). */
export function getBreakpoints(): Readonly<BreakpointConfig> {
  return _breakpoints;
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
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    // Distinguish from Token objects
    !(value as Record<string, unknown>)["__token"] &&
    // Distinguish from shadowOffset { width, height }
    !("width" in (value as object) && "height" in (value as object)) &&
    // At least one breakpoint key present
    Object.keys(value as object).some((k) =>
      ["base", "sm", "md", "lg", "xl", "2xl"].includes(k),
    )
  );
}

/**
 * Resolve a responsive value to a plain value for React Native,
 * given the current window width.
 *
 * Uses mobile-first cascade: base → sm → md → lg → xl → 2xl.
 */
export function resolveResponsiveValue<T>(
  value: Responsive<T>,
  windowWidth: number,
): T | undefined {
  if (!isResponsive(value)) return value as T;

  const bp = _breakpoints;
  const map = value as Partial<Record<BreakpointKey, T>>;

  // Mobile-first: start from base and override with larger breakpoints
  let resolved: T | undefined = map.base;
  if (windowWidth >= bp.sm && map.sm !== undefined) resolved = map.sm;
  if (windowWidth >= bp.md && map.md !== undefined) resolved = map.md;
  if (windowWidth >= bp.lg && map.lg !== undefined) resolved = map.lg;
  if (windowWidth >= bp.xl && map.xl !== undefined) resolved = map.xl;
  if (windowWidth >= bp["2xl"] && map["2xl"] !== undefined)
    resolved = map["2xl"];

  return resolved;
}

/**
 * Build CSS media query rules for a responsive value.
 *
 * Returns an array of { minWidth, value } pairs, sorted ascending.
 * The `base` value has no media query (applied unconditionally).
 */
export function buildMediaQueryEntries<T>(
  value: Partial<Record<BreakpointKey, T>>,
): Array<{ minWidth: number | null; value: T }> {
  const bp = _breakpoints;
  const entries: Array<{ minWidth: number | null; value: T }> = [];

  if (value.base !== undefined)
    entries.push({ minWidth: null, value: value.base });
  if (value.sm !== undefined)
    entries.push({ minWidth: bp.sm, value: value.sm });
  if (value.md !== undefined)
    entries.push({ minWidth: bp.md, value: value.md });
  if (value.lg !== undefined)
    entries.push({ minWidth: bp.lg, value: value.lg });
  if (value.xl !== undefined)
    entries.push({ minWidth: bp.xl, value: value.xl });
  if (value["2xl"] !== undefined)
    entries.push({ minWidth: bp["2xl"], value: value["2xl"] });

  return entries;
}
