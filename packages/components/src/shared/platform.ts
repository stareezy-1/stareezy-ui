/**
 * Platform detection for Stareezy UI components.
 *
 * Logic:
 *   - React Native (iOS/Android)          → isWeb = false  (use RN path)
 *   - React Native Web (Expo web)         → isWeb = false  (use RN path — RN handles its own styling)
 *   - Pure browser (no react-native)      → isWeb = true   (use DOM/CSS path)
 *   - Next.js SSR / Node.js              → isWeb = true   (renders HTML)
 *   - Jest / jsdom                        → isWeb = true   (document exists, no RN)
 *
 * Key change: React Native Web (Platform.OS === 'web') now returns isWeb = false
 * because RN Web manages its own StyleSheet and CSS-in-JS — the DOM rendering
 * path is not needed and would conflict.
 */

type PlatformOS = "ios" | "android" | "web" | "windows" | "macos";

export function getPlatformOS(): PlatformOS | "node" {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Platform } = require("react-native") as {
      Platform: { OS: PlatformOS };
    };
    if (Platform && Platform.OS) {
      return Platform.OS;
    }
  } catch {
    // react-native not available — pure browser environment
  }

  if (typeof document !== "undefined") {
    return "web";
  }

  return "node";
}

/**
 * True ONLY when running in a pure browser environment with NO React Native.
 * React Native Web (Expo) returns false — RN handles its own rendering.
 */
export const isWeb: boolean = (() => {
  const os = getPlatformOS();
  // "web" means React Native Web (Expo) — use RN path
  // "node" means SSR/pure browser — use DOM path
  // anything else (ios/android/windows/macos) — use RN path
  return os === "node";
})();

export const isNative: boolean = !isWeb;
export const isIOS: boolean = getPlatformOS() === "ios";
export const isAndroid: boolean = getPlatformOS() === "android";
