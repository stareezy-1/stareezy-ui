import type { Token } from "@quasify-ui/tokens";
import type { RuntimeAdapter } from "../registry";
import { RuntimeNotInitializedError } from "../registry";

/**
 * Lazily loads `StyleSheet` from `react-native` using a dynamic require to
 * avoid static import issues when the package is consumed in non-RN
 * environments (e.g. during SSR or web builds where react-native is absent).
 */
function getStyleSheet(): {
  create: (styles: Record<string, object>) => Record<string, number>;
} {
  // Use new Function to prevent bundlers from statically analysing the require
  // and attempting to resolve react-native at build time.
  // eslint-disable-next-line no-new-func
  const req = new Function("moduleName", "return require(moduleName)");
  return req("react-native").StyleSheet as {
    create: (styles: Record<string, object>) => Record<string, number>;
  };
}

/**
 * Creates a React Native `RuntimeAdapter` that maps token IDs to pre-registered
 * `StyleSheet` entry IDs (numbers).
 *
 * Usage:
 * ```ts
 * const runtime = createNativeRuntime();
 * runtime.register(allTokens);
 * const styleId = runtime.resolve(colors.primary[500]); // number
 * ```
 *
 * Guarantees:
 * - `register()` calls `StyleSheet.create()` once to pre-register all styles,
 *   then maps each token ID to its corresponding StyleSheet entry ID.
 * - `resolve()` is O(1) — a single `Map.get()` call returning the cached number.
 * - Repeated calls to `resolve()` with the same token return the **same number
 *   reference** (referential equality), preventing unnecessary re-renders.
 * - Throws `RuntimeNotInitializedError` if `resolve()` is called before
 *   `register()`.
 *
 * Requirements: 10.1, 10.7, 16.1
 */
export function createNativeRuntime(): RuntimeAdapter {
  // token ID → StyleSheet entry ID (number)
  const registry = new Map<string, number>();

  // Tracks whether register() has been called at least once
  let initialized = false;

  return {
    /**
     * Populates the registry by:
     * 1. Building a style object map keyed by token ID (using the token's
     *    value as the style value where applicable).
     * 2. Calling `StyleSheet.create()` once with all entries to obtain
     *    pre-registered StyleSheet entry IDs.
     * 3. Storing the token ID → StyleSheet entry ID mapping in the registry.
     *
     * Safe to call multiple times — subsequent calls add new entries for any
     * tokens not already registered, without clearing existing ones.
     */
    register(tokens: Token<unknown>[]): void {
      // Collect only tokens that haven't been registered yet
      const newTokens = tokens.filter((t) => !registry.has(t.id));

      if (newTokens.length === 0) {
        initialized = true;
        return;
      }

      // Build the styles object for StyleSheet.create().
      // Each entry is keyed by token ID and contains the token's value as a
      // style object. For non-object values (strings, numbers) we wrap them
      // in a generic container so StyleSheet.create() accepts them.
      const stylesInput: Record<string, object> = {};
      for (const t of newTokens) {
        const val = t.value;
        if (val !== null && typeof val === "object") {
          stylesInput[t.id] = val as object;
        } else {
          // Wrap primitive values in a plain object so StyleSheet.create()
          // can process them. The entry ID is what matters — not the content.
          stylesInput[t.id] = { _value: val };
        }
      }

      // Pre-register all styles in a single StyleSheet.create() call.
      const StyleSheet = getStyleSheet();
      const created = StyleSheet.create(stylesInput);

      // Map each token ID to its StyleSheet entry ID (number).
      for (const t of newTokens) {
        registry.set(t.id, created[t.id] as number);
      }

      initialized = true;
    },

    /**
     * Returns the pre-registered StyleSheet entry ID (number) for the given
     * token.
     *
     * The returned number is always the **same reference** for a given token
     * ID because it is stored in the `Map` and retrieved via `Map.get()` —
     * no new value is created on repeated calls.
     *
     * @throws {RuntimeNotInitializedError} if called before `register()`
     */
    resolve(token: Token<unknown>): number {
      if (!initialized) {
        throw new RuntimeNotInitializedError();
      }
      // O(1) lookup; returns the cached StyleSheet entry ID stored during register()
      return registry.get(token.id) as number;
    },
  };
}
