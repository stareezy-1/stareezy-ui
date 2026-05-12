import type { Token } from "@stareezy-ui/tokens";

/**
 * A flat map from token ID to its resolved style value.
 * Populated once at initialization; all lookups are O(1).
 *
 * - Web: values are atomic CSS class name strings
 * - React Native: values are StyleSheet entry IDs (numbers)
 */
export type StyleRegistry = Map<string, string | number>;

/**
 * Thrown when `RuntimeAdapter.resolve()` is called before
 * `RuntimeAdapter.register()` has been invoked.
 */
export class RuntimeNotInitializedError extends Error {
  constructor() {
    super(
      "RuntimeAdapter: resolve() was called before register(). " +
        "Call register(tokens) once at app initialization before resolving any tokens.",
    );
    this.name = "RuntimeNotInitializedError";
  }
}

/**
 * Platform-agnostic interface for the Stareezy UI runtime adapter.
 *
 * Implementations must:
 * - Populate the `StyleRegistry` exactly once via `register()`
 * - Return a cached style reference (string on web, number on RN) via `resolve()`
 * - Throw `RuntimeNotInitializedError` if `resolve()` is called before `register()`
 */
export interface RuntimeAdapter {
  /**
   * Populates the `StyleRegistry` with entries for every token in the array.
   * Must be called once at app initialization before any `resolve()` calls.
   *
   * @param tokens - All tokens that will be used by the application
   */
  register(tokens: Token<unknown>[]): void;

  /**
   * Returns the resolved style value for the given token.
   * - Web: returns a CSS class name string
   * - React Native: returns a StyleSheet entry ID (number)
   *
   * @param token - The token to resolve
   * @throws {RuntimeNotInitializedError} if called before `register()`
   */
  resolve(token: Token<unknown>): string | number;
}
