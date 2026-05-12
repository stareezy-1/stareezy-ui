/**
 * Token factory for Stareezy UI design tokens.
 * Platform agnostic — no React or React Native imports.
 */

/**
 * A typed design token carrying a stable identity and a resolved value.
 *
 * The `__token: true` discriminant lets the compiler distinguish token
 * objects from plain values in JSX props at build time.
 */
export type Token<T> = {
  readonly __token: true;
  readonly id: string;
  readonly value: T;
};

/**
 * Creates a frozen `Token<T>` object.
 *
 * @param value - The resolved design value (color hex, spacing number, etc.)
 * @param id    - A stable, unique identifier for this token (e.g. "primary-500")
 * @throws {TypeError} if `id` is null, undefined, or an empty string
 */
export function token<T>(value: T, id: string): Token<T> {
  if (id === null || id === undefined) {
    throw new TypeError(
      `Token id must be a non-null, non-empty string. Received: ${id}`,
    );
  }

  if (id === "") {
    throw new TypeError('Token id must be a non-empty string. Received: ""');
  }

  return Object.freeze({
    __token: true as const,
    id,
    value,
  });
}
