/**
 * stripUndefined — removes keys with undefined values from an object.
 * Used to satisfy exactOptionalPropertyTypes when spreading into BoxProps.
 */
export function stripUndefined<T extends Record<string, unknown>>(
  obj: T,
): Partial<T> {
  const result: Partial<T> = {};
  for (const key of Object.keys(obj) as Array<keyof T>) {
    if (obj[key] !== undefined) result[key] = obj[key];
  }
  return result;
}
