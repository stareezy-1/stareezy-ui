/**
 * Flattens a React Native StyleSheet array (or a plain object) into a single
 * plain object safe to spread onto a DOM element's style prop.
 *
 * When a StyleSheet array like [styles.a, condition && styles.b] is spread
 * directly onto a CSSStyleDeclaration, the browser throws:
 *   "Failed to set an indexed property [0] on 'CSSStyleDeclaration'"
 * because array indices (0, 1, 2…) become property keys.
 *
 * This utility handles:
 *   - Plain objects → returned as-is
 *   - Arrays        → merged via Object.assign, falsy entries skipped
 *   - null/undefined → returns {}
 */
export function flattenStyle(style: unknown): Record<string, unknown> {
  if (!style) return {};
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.filter(Boolean));
  }
  return style as Record<string, unknown>;
}
