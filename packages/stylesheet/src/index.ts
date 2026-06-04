// @stareezy-ui/stylesheet
// Atomic CSS sheet management, CSS variable injection, and responsive media
// query helpers matching Box's breakpoints/media prop system.
//
// Requirements: 9.2, 9.3, 9.4, 16.3

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A breakpoint map: keys are breakpoint names, values are min-width in px. */
export type BreakpointMap = Record<string, number>;

/** A style value that may be a plain value or a responsive object. */
export type ResponsiveValue<T> = T | Partial<Record<string, T>>;

/** A single CSS declaration. */
export interface CssDeclaration {
  property: string;
  value: string;
}

/** One rule emitted by `buildResponsiveCss`. */
export interface ResponsiveCssRule {
  /** null = base (no media query). number = min-width in px. */
  minWidth: number | null;
  declarations: CssDeclaration[];
}

// ---------------------------------------------------------------------------
// Responsive helpers
// ---------------------------------------------------------------------------

const BUILTIN_BREAKPOINTS: BreakpointMap = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Returns the breakpoints from the global channel synced by createUi,
 * falling back to built-in defaults. Mirrors Box's `getBreakpoints()` logic
 * so styles are always in sync with the component layer.
 */
export function getBreakpoints(): Readonly<BreakpointMap> {
  const global = globalThis as Record<string, unknown>;
  const fromChannel = global["__stareezy_breakpoints__"];
  if (
    fromChannel !== null &&
    typeof fromChannel === "object" &&
    !Array.isArray(fromChannel)
  ) {
    return { ...BUILTIN_BREAKPOINTS, ...(fromChannel as BreakpointMap) };
  }
  return { ...BUILTIN_BREAKPOINTS };
}

/**
 * Returns `true` when `value` is a responsive map (i.e. has at least one key
 * that matches "base" or a known breakpoint). Mirrors Box's `isResponsive()`.
 */
export function isResponsiveValue<T>(
  value: ResponsiveValue<T>,
): value is Partial<Record<string, T>> {
  if (value === null || typeof value !== "object" || Array.isArray(value))
    return false;
  const obj = value as Record<string, unknown>;
  if (obj["__token"]) return false;
  const bpKeys = new Set(["base", ...Object.keys(getBreakpoints())]);
  return Object.keys(obj).some((k) => bpKeys.has(k));
}

/**
 * Converts a responsive value map into ordered `{ minWidth, value }` entries,
 * sorted ascending by breakpoint threshold. `base` has `minWidth: null`.
 *
 * @example
 * buildBreakpointEntries({ base: "8px", md: "16px" })
 * // [{ minWidth: null, value: "8px" }, { minWidth: 768, value: "16px" }]
 */
export function buildBreakpointEntries<T>(
  value: Partial<Record<string, T>>,
): Array<{ minWidth: number | null; value: T }> {
  const bp = getBreakpoints();
  const entries: Array<{ minWidth: number | null; value: T }> = [];

  if (value["base"] !== undefined) {
    entries.push({ minWidth: null, value: value["base"] });
  }

  const sorted = Object.entries(bp).sort(([, a], [, b]) => a - b);
  for (const [key, threshold] of sorted) {
    if (value[key] !== undefined) {
      entries.push({ minWidth: threshold, value: value[key]! });
    }
  }

  return entries;
}

/**
 * Resolves a responsive value for React Native given the current window width.
 * Mobile-first: base → ascending breakpoints.
 */
export function resolveResponsive<T>(
  value: ResponsiveValue<T>,
  windowWidth: number,
): T | undefined {
  if (!isResponsiveValue(value)) return value as T;

  const bp = getBreakpoints();
  const map = value as Partial<Record<string, T>>;
  let resolved: T | undefined = map["base"];

  const sorted = Object.entries(bp).sort(([, a], [, b]) => a - b);
  for (const [key, threshold] of sorted) {
    if (windowWidth >= threshold && map[key] !== undefined) {
      resolved = map[key];
    }
  }

  return resolved;
}

// ---------------------------------------------------------------------------
// CSS rule building
// ---------------------------------------------------------------------------

/**
 * Builds the CSS string for a responsive prop value and a set of CSS
 * properties, scoped to a given selector class. Emits base styles inline
 * and wraps breakpoint overrides in `@media(min-width: Npx)` rules.
 *
 * @example
 * buildResponsiveCss(
 *   ".szr-u1",
 *   { base: "8px", md: "16px" },
 *   ["padding"]
 * )
 * // ".szr-u1 { padding: 8px }"
 * // "@media(min-width:768px){ .szr-u1 { padding: 16px } }"
 */
export function buildResponsiveCss(
  selector: string,
  value: ResponsiveValue<string>,
  cssProperties: string[],
): string {
  if (!isResponsiveValue(value)) {
    const decls = cssProperties
      .map((p) => `${p}: ${value as string}`)
      .join("; ");
    return `${selector} { ${decls} }`;
  }

  const entries = buildBreakpointEntries(
    value as Partial<Record<string, string>>,
  );
  const rules: string[] = [];

  for (const entry of entries) {
    const decls = cssProperties.map((p) => `${p}: ${entry.value}`).join("; ");
    if (entry.minWidth === null) {
      rules.push(`${selector} { ${decls} }`);
    } else {
      rules.push(
        `@media(min-width:${entry.minWidth}px){ ${selector} { ${decls} } }`,
      );
    }
  }

  return rules.join("\n");
}

/**
 * Builds a full responsive CSS block for multiple props at once, scoped to
 * a given class name. Useful when injecting styles for a component instance
 * that has many responsive props.
 *
 * @param className - The CSS class name (without leading dot)
 * @param propEntries - Array of { cssProperties, value } pairs
 * @returns The combined CSS string
 */
export function buildComponentCss(
  className: string,
  propEntries: Array<{
    cssProperties: string[];
    value: ResponsiveValue<string>;
  }>,
): string {
  const selector = `.${className}`;
  return propEntries
    .map((e) => buildResponsiveCss(selector, e.value, e.cssProperties))
    .filter(Boolean)
    .join("\n");
}

// ---------------------------------------------------------------------------
// AtomicStyleSheet
// ---------------------------------------------------------------------------

/**
 * Manages atomic CSS class injection and CSS variable (`:root`) injection for
 * the Stareezy UI web runtime. Now also supports responsive / media-query style
 * injection via `injectResponsive()` and `injectComponentStyle()`, matching
 * Box's breakpoints/media prop system.
 *
 * Design goals:
 * - Each token ID maps to exactly one CSS class rule (deduplication via a Set)
 * - CSS rules use `var(--<tokenId>)` so theme switching only requires updating
 *   the `:root` block — no class regeneration needed
 * - A separate `<style>` tag is used for `:root` variables so it can be
 *   replaced atomically on theme change
 * - Responsive / media-query rules are injected into a dedicated `#sz-responsive`
 *   tag and deduplicated per class + property + breakpoint key
 * - All `<style>` tags are lazily created on first use
 *
 * Example output in the DOM:
 * ```html
 * <style id="sz-atomic">
 *   .sz-primary-500 { background-color: var(--primary-500); }
 * </style>
 * <style id="sz-root-vars">
 *   :root { --primary-500: #024CCE; }
 * </style>
 * <style id="sz-responsive">
 *   .szr-u1 { padding: 8px }
 *   @media(min-width:768px){ .szr-u1 { padding: 16px } }
 * </style>
 * ```
 */
export class AtomicStyleSheet {
  /** Token IDs that have already been injected as atomic CSS rules. */
  private readonly injected = new Set<string>();

  /** Responsive rule keys already injected (className + prop + bp). */
  private readonly responsiveInjected = new Set<string>();

  private atomicStyleEl: HTMLStyleElement | null = null;
  private rootVarsStyleEl: HTMLStyleElement | null = null;
  private responsiveStyleEl: HTMLStyleElement | null = null;

  // ─── Lazy style-tag creation ──────────────────────────────────────────────

  private getAtomicStyleEl(): HTMLStyleElement {
    if (!this.atomicStyleEl) {
      const el = document.createElement("style");
      el.id = "sz-atomic";
      document.head.appendChild(el);
      this.atomicStyleEl = el;
    }
    return this.atomicStyleEl;
  }

  private getRootVarsStyleEl(): HTMLStyleElement {
    if (!this.rootVarsStyleEl) {
      const el = document.createElement("style");
      el.id = "sz-root-vars";
      document.head.appendChild(el);
      this.rootVarsStyleEl = el;
    }
    return this.rootVarsStyleEl;
  }

  private getResponsiveStyleEl(): HTMLStyleElement {
    if (!this.responsiveStyleEl) {
      const el = document.createElement("style");
      el.id = "sz-responsive";
      document.head.appendChild(el);
      this.responsiveStyleEl = el;
    }
    return this.responsiveStyleEl;
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  /**
   * Returns the atomic CSS class name for a given token ID (`sz-<tokenId>`).
   */
  getClassName(tokenId: string): string {
    return `sz-${tokenId}`;
  }

  /**
   * Injects an atomic CSS rule for the given token into the DOM `<style>` tag.
   * Deduplicates by tokenId — if already injected, this is a no-op.
   *
   * ```css
   * .sz-primary-500 { background-color: var(--primary-500); }
   * ```
   */
  inject(tokenId: string, cssProperty: string, _value: string): void {
    if (this.injected.has(tokenId)) return;

    const className = this.getClassName(tokenId);
    const rule = `.${className} { ${cssProperty}: var(--${tokenId}); }`;
    const styleEl = this.getAtomicStyleEl();
    styleEl.textContent += `\n${rule}`;
    this.injected.add(tokenId);
  }

  /**
   * Writes (or replaces) the `:root` CSS variable block in a dedicated
   * `<style>` tag. Each call replaces the entire block for clean theme
   * switching.
   *
   * ```css
   * :root { --primary-500: #024CCE; }
   * ```
   */
  injectRootVariables(tokens: Array<{ id: string; value: unknown }>): void {
    if (tokens.length === 0) return;

    const declarations = tokens
      .map((t) => `  --${t.id}: ${String(t.value)};`)
      .join("\n");

    const styleEl = this.getRootVarsStyleEl();
    styleEl.textContent = `:root {\n${declarations}\n}`;
  }

  /**
   * Injects a responsive CSS value for a given class name and CSS properties.
   * Supports both plain values and responsive objects like `{ base: "8px", md: "16px" }`.
   * Deduplicates by a compound key of `className + cssProperties + breakpoint`.
   *
   * This mirrors Box's inline responsive style injection but keeps the CSS in a
   * dedicated `#sz-responsive` sheet for reuse across component instances.
   *
   * @example
   * sheet.injectResponsive("szr-my-comp", { base: "8px", md: "16px" }, ["padding"])
   * // → base: .szr-my-comp { padding: 8px }
   * // → md:   @media(min-width:768px){ .szr-my-comp { padding: 16px } }
   */
  injectResponsive(
    className: string,
    value: ResponsiveValue<string>,
    cssProperties: string[],
  ): void {
    const selector = `.${className}`;

    if (!isResponsiveValue(value)) {
      // Plain value — check dedup key
      const dedupKey = `${className}:${cssProperties.join(",")}:base:${String(
        value,
      )}`;
      if (this.responsiveInjected.has(dedupKey)) return;
      const decls = cssProperties
        .map((p) => `${p}: ${value as string}`)
        .join("; ");
      const rule = `${selector} { ${decls} }`;
      this.getResponsiveStyleEl().textContent += `\n${rule}`;
      this.responsiveInjected.add(dedupKey);
      return;
    }

    const entries = buildBreakpointEntries(
      value as Partial<Record<string, string>>,
    );

    for (const entry of entries) {
      const bpLabel = entry.minWidth === null ? "base" : String(entry.minWidth);
      const dedupKey = `${className}:${cssProperties.join(",")}:${bpLabel}:${
        entry.value
      }`;
      if (this.responsiveInjected.has(dedupKey)) continue;

      const decls = cssProperties.map((p) => `${p}: ${entry.value}`).join("; ");

      let rule: string;
      if (entry.minWidth === null) {
        rule = `${selector} { ${decls} }`;
      } else {
        rule = `@media(min-width:${entry.minWidth}px){ ${selector} { ${decls} } }`;
      }

      this.getResponsiveStyleEl().textContent += `\n${rule}`;
      this.responsiveInjected.add(dedupKey);
    }
  }

  /**
   * Injects a full set of responsive styles for a component instance.
   * Each entry maps an array of CSS properties to a (possibly responsive) value.
   * All rules are scoped to the given `className` and deduplicated.
   *
   * @example
   * sheet.injectComponentStyle("szr-card-1", [
   *   { cssProperties: ["padding"], value: { base: "8px", md: "16px" } },
   *   { cssProperties: ["background-color"], value: "var(--surface)" },
   * ])
   */
  injectComponentStyle(
    className: string,
    propEntries: Array<{
      cssProperties: string[];
      value: ResponsiveValue<string>;
    }>,
  ): void {
    for (const entry of propEntries) {
      this.injectResponsive(className, entry.value, entry.cssProperties);
    }
  }

  /**
   * Injects a raw CSS string into the responsive style tag.
   * Use this when you've already built the CSS string with `buildResponsiveCss`
   * or `buildComponentCss` and want to inject it directly.
   *
   * Deduplication is done by the raw CSS string itself.
   */
  injectRaw(css: string): void {
    if (!css) return;
    const dedupKey = `raw:${css}`;
    if (this.responsiveInjected.has(dedupKey)) return;
    this.getResponsiveStyleEl().textContent += `\n${css}`;
    this.responsiveInjected.add(dedupKey);
  }

  /**
   * Clears all injected rules and removes all style tags from the DOM.
   * Useful for testing or full resets.
   */
  reset(): void {
    this.injected.clear();
    this.responsiveInjected.clear();

    this.atomicStyleEl?.parentNode?.removeChild(this.atomicStyleEl);
    this.atomicStyleEl = null;

    this.rootVarsStyleEl?.parentNode?.removeChild(this.rootVarsStyleEl);
    this.rootVarsStyleEl = null;

    this.responsiveStyleEl?.parentNode?.removeChild(this.responsiveStyleEl);
    this.responsiveStyleEl = null;
  }
}

// ---------------------------------------------------------------------------
// Standalone helpers (used by @stareezy-ui/runtime and the compiler)
// ---------------------------------------------------------------------------

/**
 * Returns the atomic CSS class name for a given token ID.
 * Output always starts with "sz-".
 *
 * @example
 * tokenIdToClassName("primary-500") // "sz-primary-500"
 */
export function tokenIdToClassName(id: string): string {
  return `sz-${id}`;
}

/**
 * Builds a scoped CSS class name for a component instance's responsive styles.
 * Format: `szr-<uid>` where uid is a short stable identifier.
 *
 * @example
 * buildScopeClass("r1abc") // "szr-r1abc"
 */
export function buildScopeClass(uid: string): string {
  return `szr-${uid.replace(/:/g, "")}`;
}
