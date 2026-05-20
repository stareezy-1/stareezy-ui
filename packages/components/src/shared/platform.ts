type PlatformOS = "ios" | "android" | "web" | "windows" | "macos";

/** True when the react-native module is resolvable in the current environment. */
const hasReactNative: boolean = (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("react-native");
    return true;
  } catch {
    return false;
  }
})();

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
 * True only in a pure browser or SSR/Node environment with no React Native runtime.
 *
 * - Pure browser (no RN):          true  → renders <div>
 * - SSR / Node.js (no RN):         true  → renders <div>
 * - React Native Web (Expo/RNW):   false → renders RN <View>
 * - React Native iOS/Android:      false → renders RN <View>
 *
 * The key distinction from the old behaviour: react-native-web sets
 * Platform.OS === "web" but the react-native module IS resolvable, so we
 * treat it as native and let RN's own renderer handle the output.
 */
export const isWeb: boolean = (() => {
  const os = getPlatformOS();
  // If react-native is available, always use the RN render path —
  // even when Platform.OS is "web" (react-native-web).
  if (hasReactNative) return false;
  return os === "web" || os === "node";
})();

export const isNative: boolean = !isWeb;
export const isIOS: boolean = getPlatformOS() === "ios";
export const isAndroid: boolean = getPlatformOS() === "android";
