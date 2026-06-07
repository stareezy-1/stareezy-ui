"use client";

/**
 * ThemeProvider component, useTheme() hook, and useThemeSwitch() hook.
 *
 * - Web: injects CSS variables under `[data-theme="<name>"]` on mount/change.
 *   Named themes use `[data-theme="<name>"]`; ThemeOverride objects use a
 *   generated unique selector. Wraps children in a `<div data-theme="<name>">`.
 * - React Native: provides resolved token values via React context.
 * - Supports nested providers: child overrides only specified tokens and
 *   inherits the rest from the nearest ancestor ThemeProvider.
 * - useThemeSwitch() lets any descendant toggle light/dark without prop drilling.
 *
 * Requirements: 7.2, 7.3, 7.4, 7.5, 7.6, 7.7
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { semanticColors } from "./semantic";
import { themes } from "./themes";
import type { ThemeOverride } from "./themes";
import type { Token } from "./token";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

const isWeb = typeof document !== "undefined";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * The resolved theme value — every leaf is a Token<string>.
 * Shape is derived from `semanticColors` so TypeScript validates all keys.
 */
export type ResolvedTheme = typeof semanticColors;

export interface ThemeProviderProps {
  /**
   * A named theme key (`"light"` | `"dark"`) or a partial override object.
   * Defaults to `"light"` when omitted.
   * Can be controlled externally or left to internal state (use `useThemeSwitch`).
   */
  theme?: keyof typeof themes | ThemeOverride;
  children: ReactNode;
}

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

const ThemeContext = createContext<ResolvedTheme>(semanticColors);

/** Active theme name — undefined when an override object is active. */
const ThemeNameContext = createContext<keyof typeof themes | undefined>(
  "light",
);

/** Setter exposed to useThemeSwitch — only set by the nearest ThemeProvider. */
const ThemeSetterContext = createContext<
  ((next: keyof typeof themes | ThemeOverride) => void) | undefined
>(undefined);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveTheme(
  themeProp: keyof typeof themes | ThemeOverride,
  parentTheme: ResolvedTheme,
): ResolvedTheme {
  if (typeof themeProp === "string") {
    return deepMergeTheme(parentTheme, themes[themeProp] as ThemeOverride);
  }
  return deepMergeTheme(parentTheme, themeProp);
}

function deepMergeTheme(
  base: ResolvedTheme,
  override: ThemeOverride,
): ResolvedTheme {
  if (!override || Object.keys(override).length === 0) return base;
  return {
    border: override.border
      ? { ...base.border, ...override.border }
      : base.border,
    backgrounds: override.backgrounds
      ? { ...base.backgrounds, ...override.backgrounds }
      : base.backgrounds,
    text: override.text ? { ...base.text, ...override.text } : base.text,
  } as ResolvedTheme;
}

// ---------------------------------------------------------------------------
// CSS variable helpers (web only)
// ---------------------------------------------------------------------------

function tokenGroupToCssVars(
  groupName: string,
  group: Record<string, Token<string>>,
): string {
  return Object.entries(group)
    .map(([key, tok]) => `  --${groupName}-${key}: ${tok.value};`)
    .join("\n");
}

function buildCssBlock(selector: string, resolved: ResolvedTheme): string {
  const lines: string[] = [];
  for (const [groupName, group] of Object.entries(resolved)) {
    lines.push(
      tokenGroupToCssVars(groupName, group as Record<string, Token<string>>),
    );
  }
  return `${selector} {\n${lines.join("\n")}\n}`;
}

// ---------------------------------------------------------------------------
// ThemeProvider
// ---------------------------------------------------------------------------

/**
 * Provides theme tokens to the component tree.
 *
 * Manages its own internal theme state so `useThemeSwitch()` works without
 * prop drilling. Pass `theme` to control it externally.
 */
export function ThemeProvider({
  theme: themeProp = "light",
  children,
}: ThemeProviderProps): React.ReactElement {
  const [activeTheme, setActiveTheme] = useState<
    keyof typeof themes | ThemeOverride
  >(themeProp);

  // Sync when the caller changes the prop externally.
  const prevPropRef = useRef(themeProp);
  if (themeProp !== prevPropRef.current) {
    prevPropRef.current = themeProp;
    setActiveTheme(themeProp);
  }

  const parentTheme = useContext(ThemeContext);

  const resolved = useMemo(
    () => resolveTheme(activeTheme, parentTheme),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTheme, parentTheme],
  );

  const setTheme = useCallback(
    (next: keyof typeof themes | ThemeOverride) => setActiveTheme(next),
    [],
  );

  const themeName =
    typeof activeTheme === "string"
      ? (activeTheme as keyof typeof themes)
      : undefined;

  if (isWeb) {
    return (
      <ThemeSetterContext.Provider value={setTheme}>
        <ThemeNameContext.Provider value={themeName}>
          <WebThemeProvider theme={activeTheme} resolved={resolved}>
            {children}
          </WebThemeProvider>
        </ThemeNameContext.Provider>
      </ThemeSetterContext.Provider>
    );
  }

  return (
    <ThemeSetterContext.Provider value={setTheme}>
      <ThemeNameContext.Provider value={themeName}>
        <ThemeContext.Provider value={resolved}>
          {children}
        </ThemeContext.Provider>
      </ThemeNameContext.Provider>
    </ThemeSetterContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Web-specific provider
// ---------------------------------------------------------------------------

interface WebThemeProviderProps {
  theme: keyof typeof themes | ThemeOverride;
  resolved: ResolvedTheme;
  children: ReactNode;
}

function WebThemeProvider({
  theme,
  resolved,
  children,
}: WebThemeProviderProps): React.ReactElement {
  const uid = useId();

  const { dataTheme, selector } = useMemo(() => {
    if (typeof theme === "string") {
      return {
        dataTheme: theme,
        selector: `[data-theme="${theme}"]`,
      };
    }
    const id = `override-${uid.replace(/:/g, "")}`;
    return { dataTheme: id, selector: `[data-theme="${id}"]` };
  }, [theme, uid]);

  const styleElRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const css = buildCssBlock(selector, resolved);

    if (!styleElRef.current) {
      const el = document.createElement("style");
      el.setAttribute("data-stareezy-theme", dataTheme);
      el.textContent = css;
      document.head.appendChild(el);
      styleElRef.current = el;
    } else {
      styleElRef.current.textContent = css;
      styleElRef.current.setAttribute("data-stareezy-theme", dataTheme);
    }

    return () => {
      if (styleElRef.current) {
        styleElRef.current.remove();
        styleElRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, resolved]);

  return (
    <ThemeContext.Provider value={resolved}>
      <div
        data-theme={dataTheme}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// useTheme
// ---------------------------------------------------------------------------

/**
 * Returns the current theme's resolved token values with full TypeScript types.
 *
 * Falls back to the default `semanticColors` (light theme) if used outside
 * a `ThemeProvider`.
 *
 * @example
 * ```tsx
 * const theme = useTheme();
 * <Text style={{ color: theme.text.primary.value }} />
 * ```
 */
export function useTheme(): ResolvedTheme {
  return useContext(ThemeContext);
}

// ---------------------------------------------------------------------------
// useThemeSwitch
// ---------------------------------------------------------------------------

/**
 * Returns controls for switching the active theme from anywhere in the tree.
 *
 * Must be used inside a `ThemeProvider`.
 *
 * @returns
 * - `theme` — current active theme name (`"light"` | `"dark"` | `undefined` for overrides)
 * - `setTheme(name)` — switch to a named theme or apply a partial override
 * - `toggleTheme()` — toggle between `"light"` and `"dark"`
 * - `isDark` — `true` when the active theme is `"dark"`
 *
 * @example
 * ```tsx
 * const { toggleTheme, isDark } = useThemeSwitch();
 *
 * <Button onPress={toggleTheme} text={isDark ? 'Light mode' : 'Dark mode'} />
 * ```
 */
export function useThemeSwitch(): {
  theme: keyof typeof themes | undefined;
  setTheme: (next: keyof typeof themes | ThemeOverride) => void;
  toggleTheme: () => void;
  isDark: boolean;
} {
  const themeName = useContext(ThemeNameContext);
  const setter = useContext(ThemeSetterContext);

  const setTheme = useCallback(
    (next: keyof typeof themes | ThemeOverride) => {
      if (!setter) {
        if (
          typeof globalThis !== "undefined" &&
          (globalThis as Record<string, unknown>)["process"] !== "production"
        ) {
          console.warn(
            "[stareezy-ui] useThemeSwitch() called outside of a ThemeProvider.",
          );
        }
        return;
      }
      setter(next);
    },
    [setter],
  );

  const toggleTheme = useCallback(() => {
    setTheme(themeName === "dark" ? "light" : "dark");
  }, [themeName, setTheme]);

  return {
    theme: themeName,
    setTheme,
    toggleTheme,
    isDark: themeName === "dark",
  };
}
