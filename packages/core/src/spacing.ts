/**
 * convertSpacing — platform-aware spacing utility
 *
 * On web: returns the raw number value unchanged.
 * On React Native: applies ms() scaling from react-native-size-matters
 * for responsive sizing relative to a 375px base screen width.
 *
 */

/**
 * Simple ms() fallback implementation matching react-native-size-matters behaviour.
 * Formula: size + (size - baseWidth) * factor / baseWidth
 * where baseWidth = 375 (standard iPhone width) and factor defaults to 0.5.
 */
function msFallback(size: number, factor = 0.5): number {
  const baseWidth = 375;
  return size + ((size - baseWidth) * factor) / baseWidth;
}

/**
 * Returns the raw number on web; applies ms() scaling on React Native.
 *
 * @param value - The spacing value in logical pixels
 * @returns The platform-adjusted spacing value
 */
export function convertSpacing(value: number): number {
  // Web detection: document is only defined in browser/web environments
  if (typeof document !== "undefined") {
    return value;
  }

  // React Native path — try to use react-native-size-matters if available,
  // fall back to the inline implementation if the library is not installed.
  // Use Function constructor to avoid static analysis so bundlers don't try
  // to resolve react-native-size-matters on web builds.
  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const requireFn = new Function("m", "return require(m)") as (m: string) => {
      ms?: (size: number, factor?: number) => number;
    };
    const mod = requireFn("react-native-size-matters");
    const msFunc = mod.ms;
    if (typeof msFunc === "function") {
      return msFunc(value);
    }
  } catch {
    // Library not available — use the fallback implementation
  }

  return msFallback(value);
}
