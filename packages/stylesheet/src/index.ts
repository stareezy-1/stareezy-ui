// @stareezy-ui/stylesheet
// Atomic CSS sheet management and CSS variable injection.
//
// Requirements: 9.2, 9.3, 9.4, 16.3

/**
 * Manages atomic CSS class injection and CSS variable (`:root`) injection for
 * the Stareezy UI web runtime.
 *
 * Design goals:
 * - Each token ID maps to exactly one CSS class rule (deduplication via a Set)
 * - CSS rules use `var(--<tokenId>)` so theme switching only requires updating
 *   the `:root` block — no class regeneration needed
 * - A separate `<style>` tag is used for `:root` variables so it can be
 *   replaced atomically on theme change
 * - Both `<style>` tags are lazily created on first use and appended to
 *   `document.head`
 *
 * Example output in the DOM:
 * ```html
 * <style id="sz-atomic">
 *   .sz-primary-500 { background-color: var(--primary-500); }
 *   .sz-spacing-4 { padding: var(--spacing-4); }
 * </style>
 * <style id="sz-root-vars">
 *   :root { --primary-500: #024CCE; --spacing-4: 4px; }
 * </style>
 * ```
 */
export class AtomicStyleSheet {
  /** Set of token IDs that have already been injected as atomic CSS rules. */
  private readonly injected = new Set<string>();

  /** The `<style>` element that holds atomic class rules. */
  private atomicStyleEl: HTMLStyleElement | null = null;

  /** The `<style>` element that holds the `:root` CSS variable block. */
  private rootVarsStyleEl: HTMLStyleElement | null = null;

  // ─── Lazy style-tag creation ──────────────────────────────────────────────

  /**
   * Returns (creating if necessary) the `<style>` tag used for atomic rules.
   * The element is appended to `document.head` on first access.
   */
  private getAtomicStyleEl(): HTMLStyleElement {
    if (!this.atomicStyleEl) {
      const el = document.createElement("style");
      el.id = "sz-atomic";
      document.head.appendChild(el);
      this.atomicStyleEl = el;
    }
    return this.atomicStyleEl;
  }

  /**
   * Returns (creating if necessary) the `<style>` tag used for `:root`
   * variable declarations.  The element is appended to `document.head` on
   * first access.
   */
  private getRootVarsStyleEl(): HTMLStyleElement {
    if (!this.rootVarsStyleEl) {
      const el = document.createElement("style");
      el.id = "sz-root-vars";
      document.head.appendChild(el);
      this.rootVarsStyleEl = el;
    }
    return this.rootVarsStyleEl;
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  /**
   * Returns the atomic CSS class name for a given token ID.
   *
   * The class name format is `sz-<tokenId>`.
   *
   * @example
   * sheet.getClassName("primary-500"); // "sz-primary-500"
   */
  getClassName(tokenId: string): string {
    return `sz-${tokenId}`;
  }

  /**
   * Injects an atomic CSS rule for the given token into the DOM `<style>` tag.
   *
   * The generated rule references the token value via a CSS custom property so
   * that theme switching only requires updating the `:root` block:
   *
   * ```css
   * .sz-primary-500 { background-color: var(--primary-500); }
   * ```
   *
   * Deduplication: if `tokenId` has already been injected, this method is a
   * no-op (Requirement 9.4 / 16.3).
   *
   * @param tokenId     - The token's stable ID (e.g. `"primary-500"`)
   * @param cssProperty - The CSS property to set (e.g. `"background-color"`)
   * @param _value      - The resolved token value (unused in the rule itself
   *                      because the rule uses `var(--<tokenId>)`; kept in the
   *                      signature for symmetry with `injectRootVariables`)
   *
   * Requirements: 9.2, 9.4, 16.3
   */
  inject(tokenId: string, cssProperty: string, _value: string): void {
    // Deduplication — skip if already injected (Requirement 9.4)
    if (this.injected.has(tokenId)) {
      return;
    }

    const className = this.getClassName(tokenId);
    const rule = `.${className} { ${cssProperty}: var(--${tokenId}); }`;

    const styleEl = this.getAtomicStyleEl();
    styleEl.textContent += `\n${rule}`;

    this.injected.add(tokenId);
  }

  /**
   * Writes (or replaces) the `:root` CSS variable block in a dedicated
   * `<style>` tag.
   *
   * Each call **replaces** the entire `:root` block so that theme switching
   * produces a clean update without accumulating stale variable declarations.
   *
   * Generated output:
   * ```css
   * :root {
   *   --primary-500: #024CCE;
   *   --spacing-4: 4px;
   * }
   * ```
   *
   * @param tokens - Array of `{ id, value }` pairs to declare as CSS variables.
   *                 `value` is coerced to a string via `String()`.
   *
   * Requirements: 9.3
   */
  injectRootVariables(tokens: Array<{ id: string; value: unknown }>): void {
    if (tokens.length === 0) {
      return;
    }

    const declarations = tokens
      .map((t) => `  --${t.id}: ${String(t.value)};`)
      .join("\n");

    const block = `:root {\n${declarations}\n}`;

    const styleEl = this.getRootVarsStyleEl();
    styleEl.textContent = block;
  }
}

/**
 * Returns the atomic CSS class name for a given token ID.
 * Output always starts with "sz-" (CSS class name prefix invariant).
 *
 * @example
 * tokenIdToClassName("primary-500") // "sz-primary-500"
 *
 * Requirements: 8.5
 */
export function tokenIdToClassName(id: string): string {
  return `sz-${id}`;
}
