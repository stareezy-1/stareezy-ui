/**
 * Platform detection for Stareezy UI components.
 *
 * Priority order:
 *   1. React Native's `Platform.OS` — authoritative when running in RN
 *   2. `typeof document` fallback — for pure web / SSR environments
 *
 * This correctly handles:
 *   - React Native (iOS/Android)          → isWeb = false
 *   - React Native Web                    → isWeb = true  (Platform.OS === 'web')
 *   - Browser (Vite/CRA/Next.js client)   → isWeb = true
 *   - Next.js SSR / Node.js               → isWeb = false (no document)
 *   - Jest / jsdom                        → isWeb = true  (document exists)
 *
 * Usage:
 *   import { isWeb, getPlatformOS } from "../shared/platform";
 *   if (isWeb) { ... } else { ... }
 */

type PlatformOS = "ios" | "android" | "web" | "windows" | "macos";

/**
 * Returns the current platform OS string.
 * Reads from React Native's Platform.OS when available, otherwise returns
 * "web" (browser) or "node" (SSR/server).
 */
export function getPlatformOS(): PlatformOS | "node" {
  // Try React Native Platform first — this is the authoritative source
  // and correctly distinguishes RN Web (Platform.OS === 'web') from
  // native iOS/Android.
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Platform } = require("react-native") as {
      Platform: { OS: PlatformOS };
    };
    if (Platform && Platform.OS) {
      return Platform.OS;
    }
  } catch {
    // react-native not available — we're in a pure web environment
  }

  // Fallback: browser vs SSR/Node
  if (typeof document !== "undefined") {
    return "web";
  }

  return "node";
}

/**
 * True when running in a web environment (browser or React Native Web).
 *
 * Evaluated once at module load time — safe to use as a module-level constant
 * because the platform never changes at runtime.
 */
export const isWeb: boolean = (() => {
  const os = getPlatformOS();
  return os === "web" || os === "node";
  // Note: "node" (SSR) is treated as web because SSR renders HTML.
  // Components guard against missing DOM APIs with `typeof document !== "undefined"`
  // checks inside effects/event handlers.
})();

/**
 * True when running natively on iOS or Android (not React Native Web).
 */
export const isNative: boolean = !isWeb;

/**
 * True when running on iOS (native only).
 */
export const isIOS: boolean = getPlatformOS() === "ios";

/**
 * True when running on Android (native only).
 */
export const isAndroid: boolean = getPlatformOS() === "android";
