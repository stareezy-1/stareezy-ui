/**
 * useDocsTheme — docs site theme hook for Stareezy UI.
 *
 * Manages the 3-way theme toggle (aurora / dark / light) for the docs app.
 * Persists the selected theme to localStorage and sets `data-theme` on
 * `document.documentElement` so CSS variables update instantly.
 *
 * Can also be used in any web app that follows the same `data-theme` +
 * CSS variable pattern as the Stareezy UI docs.
 *
 * @example
 * ```ts
 * import { useDocsTheme } from '@stareezy-ui/core'
 *
 * function ThemeToggle() {
 *   const { theme, setTheme, isDark, isAurora } = useDocsTheme()
 *   return (
 *     <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
 *       {isDark ? '☀ Light' : '☾ Dark'}
 *     </button>
 *   )
 * }
 * ```
 */

// Minimal React types — avoids requiring @types/react in this package
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

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
// Types
// ---------------------------------------------------------------------------

/** The three supported docs themes. */
export type DocsTheme = "aurora" | "dark" | "light";

/** Return value of useDocsTheme(). */
export interface UseDocsThemeReturn {
  /** Currently active theme. */
  theme: DocsTheme;
  /** Set the active theme, persist to localStorage, and update data-theme. */
  setTheme: (next: DocsTheme) => void;
  /** Toggle between dark and light (aurora stays as-is unless it's the current theme). */
  toggleTheme: () => void;
  /** true when theme === "dark" or theme === "aurora" */
  isDark: boolean;
  /** true when theme === "aurora" */
  isAurora: boolean;
  /** true when theme === "light" */
  isLight: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "szr-docs-theme";
const DEFAULT_THEME: DocsTheme = "aurora";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readStoredTheme(): DocsTheme {
  if (typeof localStorage === "undefined") return DEFAULT_THEME;
  const stored = localStorage.getItem(STORAGE_KEY) as DocsTheme | null;
  if (stored === "aurora" || stored === "dark" || stored === "light") {
    return stored;
  }
  return DEFAULT_THEME;
}

function applyTheme(theme: DocsTheme): void {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, theme);
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Manages the docs site 3-way theme (aurora / dark / light).
 *
 * - Reads the initial theme from localStorage (defaults to "aurora")
 * - Writes to localStorage and sets `data-theme` on `<html>` on every change
 * - Works on web only — on React Native it returns the default theme with no-op setters
 */
export function useDocsTheme(): UseDocsThemeReturn {
  const { useState, useEffect } = loadReact();

  const [theme, setThemeState] = useState<DocsTheme>(DEFAULT_THEME);

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    const stored = readStoredTheme();
    setThemeState(stored);
    applyTheme(stored);
  }, []);

  const setTheme = (next: DocsTheme) => {
    applyTheme(next);
    setThemeState(next);
  };

  const toggleTheme = () => {
    const next: DocsTheme =
      theme === "aurora" ? "light" : theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === "dark" || theme === "aurora",
    isAurora: theme === "aurora",
    isLight: theme === "light",
  };
}
