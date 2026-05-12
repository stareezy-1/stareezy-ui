/**
 * String utilities ported from rekosistem-components/src/utils/index.ts
 * Requirements: 12.8
 */

/**
 * Extracts the first letter of each word in `text`, joins them,
 * uppercases the result, and returns at most the first 2 characters.
 *
 * Matches the original rekosistem-components behaviour:
 *   textToUppercaseSubstring("John Doe") → "JD"
 *   textToUppercaseSubstring("Alice")    → "A"
 *   textToUppercaseSubstring(null)       → ""
 */
export const textToUppercaseSubstring = (
  text: string | undefined | null,
): string => {
  if (!text) return "";
  return text.match(/\b\w/g)?.join("")?.toUpperCase()?.substring(0, 2) ?? "";
};
