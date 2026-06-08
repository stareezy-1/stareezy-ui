/**
 * Minimal react-native stub for Next.js web builds.
 *
 * The stareezy-ui components use react-native APIs only inside isNative guards
 * (Platform.OS !== "web"). This stub prevents webpack from trying to parse
 * the real react-native package (which contains Flow syntax) while still
 * satisfying any runtime require() calls.
 *
 * Only the APIs actually referenced in the packages are stubbed out.
 */

const noop = () => {};
const noopObj = {};

const Platform = {
  OS: "web",
  Version: 0,
  select: (spec) => ("web" in spec ? spec.web : spec.default ?? undefined),
};

const Dimensions = {
  get: () => ({ width: 0, height: 0, scale: 1, fontScale: 1 }),
  addEventListener: () => ({ remove: noop }),
  removeEventListener: noop,
};

const StyleSheet = {
  create: (styles) => styles,
  flatten: (style) => style ?? {},
  hairlineWidth: 1,
  absoluteFill: { position: "absolute", top: 0, left: 0, bottom: 0, right: 0 },
  absoluteFillObject: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
};

const Animated = {
  Value: class {
    constructor(v) {
      this._value = v;
    }
  },
  View: (props) => props.children ?? null,
  Text: (props) => props.children ?? null,
  timing: () => ({ start: noop, stop: noop, reset: noop }),
  spring: () => ({ start: noop, stop: noop, reset: noop }),
  sequence: () => ({ start: noop, stop: noop, reset: noop }),
  parallel: () => ({ start: noop, stop: noop, reset: noop }),
  createAnimatedComponent: (C) => C,
};

class TouchableOpacityStub extends Function {
  constructor() {
    super();
    return () => null;
  }
}

module.exports = {
  Platform,
  Dimensions,
  StyleSheet,
  Animated,
  View: (props) => props.children ?? null,
  Text: (props) => props.children ?? null,
  TouchableOpacity: () => null,
  Pressable: () => null,
  ScrollView: (props) => props.children ?? null,
  FlatList: () => null,
  SafeAreaView: (props) => props.children ?? null,
  Modal: () => null,
  Image: () => null,
  TextInput: () => null,
  ActivityIndicator: () => null,
  Alert: { alert: noop },
  AppRegistry: { registerComponent: noop, runApplication: noop },
  NativeModules: noopObj,
  NativeEventEmitter: class {
    addListener() {
      return { remove: noop };
    }
    removeAllListeners() {}
  },
  DeviceEventEmitter: {
    addListener: () => ({ remove: noop }),
    removeAllListeners: noop,
  },
  PixelRatio: {
    get: () => 1,
    getFontScale: () => 1,
    roundToNearestPixel: (v) => v,
  },
  LayoutAnimation: { configureNext: noop, create: () => ({}) },
  Keyboard: {
    addListener: () => ({ remove: noop }),
    removeAllListeners: noop,
    dismiss: noop,
  },
  BackHandler: {
    addEventListener: () => ({ remove: noop }),
    removeEventListener: noop,
  },
  Linking: {
    openURL: () => Promise.resolve(),
    canOpenURL: () => Promise.resolve(false),
    getInitialURL: () => Promise.resolve(null),
  },
  Share: { share: () => Promise.resolve() },
  Clipboard: { getString: () => Promise.resolve(""), setString: noop },
  Vibration: { vibrate: noop, cancel: noop },
  useColorScheme: () => "light",
  useWindowDimensions: () => ({ width: 0, height: 0, scale: 1, fontScale: 1 }),
};
