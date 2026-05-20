"use client";
import React from "react";
import { useDocsTheme } from "../hooks/useDocsTheme";
import type { DocsTheme } from "../hooks/useDocsTheme";

const THEMES: Array<{ key: DocsTheme; icon: string; label: string }> = [
  { key: "aurora", icon: "◉", label: "Aurora" },
  { key: "dark", icon: "◑", label: "Dark" },
  { key: "light", icon: "○", label: "Light" },
  { key: "steins-gate", icon: "⌬", label: "Steins;Gate" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useDocsTheme();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        background: "var(--color-surface-2)",
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        padding: 3,
      }}
      role="group"
      aria-label="Theme selector"
    >
      {THEMES.map((t) => (
        <button
          key={t.key}
          onClick={() => setTheme(t.key)}
          aria-label={`${t.label} theme`}
          aria-pressed={theme === t.key}
          title={t.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 10px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            fontSize: "0.78rem",
            fontWeight: theme === t.key ? 700 : 500,
            background:
              theme === t.key ? "var(--brand-primary)" : "transparent",
            color: theme === t.key ? "var(--color-bg)" : "var(--color-text-2)",
            transition: "all 0.15s",
          }}
        >
          <span>{t.icon}</span>
          <span className="theme-toggle-label">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
