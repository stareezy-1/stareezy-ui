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
    // react-native not available — pure browser
  }

  if (typeof document !== "undefined") {
    return "web";
  }

  return "node";
}

/**
 * True when running in any web environment:
 * - React Native Web (Expo) — Platform.OS === "web"
 * - Pure browser (no RN)
 * - SSR / Node.js
 *
 * False only on native iOS/Android.
 */
export const isWeb: boolean = (() => {
  const os = getPlatformOS();
  return os === "web" || os === "node";
})();

export const isNative: boolean = !isWeb;
export const isIOS: boolean = getPlatformOS() === "ios";
export const isAndroid: boolean = getPlatformOS() === "android";
