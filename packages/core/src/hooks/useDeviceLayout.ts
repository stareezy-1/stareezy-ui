/**
 * useDeviceLayout — cross-platform device layout hook
 *
 * Returns the current window dimensions and device-class flags.
 * On web: reads from window.innerWidth / window.innerHeight.
 * On React Native: reads from Dimensions.get('window').
 *
 * React is a peer dependency consumed via a dynamic require so this file
 * compiles without @types/react in the package devDependencies.
 */

// Declare minimal React types inline to avoid requiring @types/react
// as a devDependency in this package.
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface DeviceLayout {
  /** Current window width in logical pixels */
  width: number;
  /** Current window height in logical pixels */
  height: number;
  /** true when width >= 768 */
  isTablet: boolean;
  /** true when width < 768 */
  isPhone: boolean;
}

// ---------------------------------------------------------------------------
// Internal React interface (minimal surface needed by this hook)
// ---------------------------------------------------------------------------

interface ReactModule {
  useState<S>(init: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
}

function loadReact(): ReactModule {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return (new Function("m", "return require(m)") as (m: string) => ReactModule)(
    "react",
  );
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TABLET_BREAKPOINT = 768;

// ---------------------------------------------------------------------------
// Platform helpers
// ---------------------------------------------------------------------------

function isWeb(): boolean {
  return typeof document !== "undefined";
}

function getWebDimensions(): { width: number; height: number } {
  if (typeof window !== "undefined") {
    return { width: window.innerWidth, height: window.innerHeight };
  }
  return { width: 375, height: 812 };
}

function getNativeDimensions(): { width: number; height: number } {
  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const rn = (
      new Function("m", "return require(m)") as (m: string) => {
        Dimensions: {
          get(dim: "window" | "screen"): { width: number; height: number };
        };
      }
    )("react-native");
    return rn.Dimensions.get("window");
  } catch {
    return { width: 375, height: 812 };
  }
}

function getCurrentDimensions(): { width: number; height: number } {
  return isWeb() ? getWebDimensions() : getNativeDimensions();
}

function buildLayout(width: number, height: number): DeviceLayout {
  return {
    width,
    height,
    isTablet: width >= TABLET_BREAKPOINT,
    isPhone: width < TABLET_BREAKPOINT,
  };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Returns the current device layout dimensions and device-class flags.
 *
 * Subscribes to resize (web) or Dimensions change (RN) events so the
 * returned values stay in sync with the window size.
 *
 * @example
 * const { width, height, isTablet, isPhone } = useDeviceLayout();
 */
export function useDeviceLayout(): DeviceLayout {
  const { useState, useEffect } = loadReact();

  const [layout, setLayout] = useState<DeviceLayout>(() => {
    const dims = getCurrentDimensions();
    return buildLayout(dims.width, dims.height);
  });

  useEffect(() => {
    if (isWeb()) {
      const onResize = () => {
        const dims = getWebDimensions();
        setLayout(buildLayout(dims.width, dims.height));
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    // React Native
    try {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      const rn = (
        new Function("m", "return require(m)") as (m: string) => {
          Dimensions: {
            addEventListener(
              event: string,
              handler: (e: {
                window: { width: number; height: number };
              }) => void,
            ): { remove(): void };
          };
        }
      )("react-native");

      const sub = rn.Dimensions.addEventListener("change", (e) => {
        setLayout(buildLayout(e.window.width, e.window.height));
      });
      return () => sub.remove();
    } catch {
      // react-native unavailable
    }

    return undefined;
  }, []);

  return layout;
}
