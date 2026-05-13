/**
 * Flattens a style value into a single plain object safe to spread onto a
 * DOM element's style prop or pass to React Native.
 *
 * Handles:
 *   - Plain objects → returned as-is
 *   - Arrays        → merged via Object.assign, falsy entries skipped
 *   - Numbers       → RN StyleSheet IDs; returned as { _rnStyleId: n } on web,
 *                     or kept as-is on native (caller handles them separately)
 *   - null/undefined/false → returns {}
 */
export function flattenStyle(style: unknown): Record<string, unknown> {
  if (!style && style !== 0) return {};
  if (typeof style === "number") {
    // RN StyleSheet ID — on web we can't resolve it, so skip
    return {};
  }
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.filter(Boolean).map(flattenStyle));
  }
  if (typeof style === "object") {
    return style as Record<string, unknown>;
  }
  return {};
}
