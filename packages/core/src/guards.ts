/**
 * Guard utilities ported from rekosistem-components/src/utils/index.ts
 * Requirements: 12.8
 */

/**
 * Returns true if the list is null, undefined, or has zero elements.
 */
export const isEmptyList = (l: unknown[] | undefined | null): boolean => {
  if (!l) {
    return true;
  }
  return l.length === 0;
};

/**
 * Returns true if the string is null, undefined, or an empty string.
 */
export const isEmptyString = (s: string | null | undefined): boolean => {
  if (!s) return true;
  return s === "";
};

/**
 * Returns true if the value is undefined.
 * Note: intentional typo "Undefinied" matches the source API.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isUndefinied = (s: string | null | undefined | any): boolean => {
  if (s === undefined) return true;
  return false;
};

/**
 * Returns true if the value is null, undefined, or zero.
 */
export const isZero = (i: number | undefined | null): boolean => {
  if (!i) return true;
  return i === 0;
};
