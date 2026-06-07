"use client";
import { useState, useEffect } from "react";

export type DocsTheme = "aurora" | "dark" | "light" | "steins-gate" | "quasar";
const STORAGE_KEY = "szr-docs-theme";

export function useDocsTheme() {
  const [theme, setThemeState] = useState<DocsTheme>("quasar");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as DocsTheme | null;
    const initial = stored ?? "quasar";
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const setTheme = (next: DocsTheme) => {
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute("data-theme", next);
    setThemeState(next);
  };

  return { theme, setTheme };
}
