import type { Token } from "@quasify-ui/tokens";
import type { RuntimeAdapter } from "../registry";
import { RuntimeNotInitializedError } from "../registry";
import { AtomicStyleSheet } from "@quasify-ui/stylesheet";

/**
 * Converts a token ID to an atomic CSS class name.
 *
 * Examples:
 *   "primary-500"       → "sz-primary-500"
 *   "spacing-extraMedium" → "sz-spacing-extraMedium"
 *   "radius-md"         → "sz-radius-md"
 */
function tokenIdToClassName(id: string): string {
  return `sz-${id}`;
}

/**
 * Creates a web-platform `RuntimeAdapter` that maps token IDs to atomic CSS
 * class name strings and manages CSS injection via `AtomicStyleSheet`.
 *
 * Usage:
 * ```ts
 * const runtime = createWebRuntime();
 * runtime.register(allTokens);
 * const className = runtime.resolve(colors.primary[500]); // "sz-primary-500"
 * ```
 *
 * Guarantees:
 * - `register()` is idempotent and must be called before `resolve()`
 * - `resolve()` is O(1) — a single `Map.get()` call
 * - Repeated calls to `resolve()` with the same token return the **same string
 *   reference** (referential equality), preventing unnecessary re-renders
 * - Throws `RuntimeNotInitializedError` if `resolve()` is called before
 *   `register()`
 * - CSS rules are injected via `AtomicStyleSheet` which deduplicates by token ID
 */
export function createWebRuntime(): RuntimeAdapter {
  // token ID → CSS class name string
  const registry = new Map<string, string>();

  // Tracks whether register() has been called at least once
  let initialized = false;

  // AtomicStyleSheet instance — manages <style> tag injection and deduplication
  const stylesheet = new AtomicStyleSheet();

  return {
    /**
     * Populates the registry by mapping each token's `id` to a generated
     * atomic CSS class name, and injects the corresponding CSS rules and
     * `:root` variable declarations via `AtomicStyleSheet`.
     *
     * Safe to call multiple times — subsequent calls add new entries without
     * clearing existing ones.  `AtomicStyleSheet.inject()` handles
     * deduplication of CSS rules internally.
     */
    register(tokens: Token<unknown>[]): void {
      const newTokens: Array<{ id: string; value: unknown }> = [];

      for (const t of tokens) {
        if (!registry.has(t.id)) {
          const className = tokenIdToClassName(t.id);
          registry.set(t.id, className);
          newTokens.push({ id: t.id, value: t.value });
        }
      }

      if (newTokens.length > 0) {
        // Inject :root CSS variables for all newly registered tokens.
        // We pass all tokens (not just new ones) so the :root block is always
        // complete — injectRootVariables replaces the entire block each time.
        const allTokenEntries = Array.from(registry.entries()).map(([id]) => ({
          id,
          // Retrieve the original value from the tokens array or the new batch
          value:
            tokens.find((t) => t.id === id)?.value ??
            newTokens.find((t) => t.id === id)?.value ??
            "",
        }));
        stylesheet.injectRootVariables(allTokenEntries);

        // Inject atomic CSS rules for each new token.
        // We use a generic "all" property here; in practice the compiler
        // plugin injects rules with the correct CSS property per token.
        // The web adapter's role is to ensure the class name exists in the DOM.
        for (const t of newTokens) {
          // Use a placeholder CSS property — the actual property is determined
          // by the compiler's prop-to-CSS mapping. The class name is what
          // matters for the runtime; the compiler emits the full rule.
          // For runtime-only usage (without the compiler), we inject a
          // minimal rule so the class is at least present in the stylesheet.
          stylesheet.inject(t.id, "all", String(t.value));
        }
      }

      initialized = true;
    },

    /**
     * Returns the CSS class name string for the given token.
     *
     * The returned string is always the **same reference** for a given token
     * ID because it is stored in the `Map` and retrieved via `Map.get()` —
     * no new string is created on repeated calls.
     *
     * @throws {RuntimeNotInitializedError} if called before `register()`
     */
    resolve(token: Token<unknown>): string {
      if (!initialized) {
        throw new RuntimeNotInitializedError();
      }
      // O(1) lookup; returns the cached string reference stored during register()
      return registry.get(token.id) as string;
    },
  };
}
