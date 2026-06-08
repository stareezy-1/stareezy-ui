/**
 * react-native web stub for Next.js builds.
 *
 * Sub-path imports (react-native/Libraries/...) from @react-native-community
 * packages get redirected here by NormalModuleReplacementPlugin so webpack
 * never tries to parse Flow-typed RN source files.
 *
 * The TOP-LEVEL "react-native" import is handled differently (see next.config.mjs):
 * it uses webpack `externals` so that require("react-native") throws a
 * MODULE_NOT_FOUND error at runtime, which makes stareezy-ui's `hasReactNative`
 * check return false and `isWeb` return true — enabling the correct web render path.
 *
 * This file is only ever loaded for SUB-PATH imports and must be a valid JS module.
 */

const noop = () => {};

const Platform = {
  OS: "web",
  Version: 0,
  select: (spec) => ("web" in spec ? spec.web : spec.default ?? undefined),
};

const StyleSheet = {
  create: (s) => s,
  flatten: (s) => s ?? {},
  hairlineWidth: 1,
};

const Dimensions = {
  get: () => ({ width: 0, height: 0, scale: 1, fontScale: 1 }),
  addEventListener: () => ({ remove: noop }),
};

module.exports = {
  Platform,
  StyleSheet,
  Dimensions,
  View: ({ children }) => children ?? null,
  Text: ({ children }) => children ?? null,
  TouchableOpacity: ({ children }) => children ?? null,
  Pressable: ({ children }) => children ?? null,
  ScrollView: ({ children }) => children ?? null,
  SafeAreaView: ({ children }) => children ?? null,
  Modal: () => null,
  Image: () => null,
  TextInput: () => null,
  ActivityIndicator: () => null,
  Animated: {
    Value: class {
      constructor(v) {
        this._v = v;
      }
    },
    View: ({ children }) => children ?? null,
    createAnimatedComponent: (C) => C,
    timing: () => ({ start: noop }),
    spring: () => ({ start: noop }),
  },
  NativeModules: {},
  NativeEventEmitter: class {
    addListener() {
      return { remove: noop };
    }
  },
  PixelRatio: {
    get: () => 1,
    getFontScale: () => 1,
    roundToNearestPixel: (v) => v,
  },
  useColorScheme: () => "light",
  useWindowDimensions: () => ({ width: 0, height: 0, scale: 1, fontScale: 1 }),
  processColor: (c) => c,
  findNodeHandle: () => null,
  // RNCSlider placeholder for @react-native-community/slider sub-imports
  default: null,
};
