/**
 * DocPage — wrapper for all documentation pages.
 * Hero header styling is driven by CSS classes + theme variables (globals.css)
 * so it adapts correctly to aurora / dark / light themes.
 */
"use client";

import type { ReactNode } from "react";

interface DocPageProps {
  title: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
  icon?: string;
  children: ReactNode;
}

export function DocPage({
  title,
  description,
  badge,
  badgeColor = "var(--brand-primary)",
  icon = "◈",
  children,
}: DocPageProps) {
  return (
    <div style={{ paddingBottom: "4rem" }}>
      {/* Hero header — background/colors come from .doc-page-hero CSS class */}
      <div className="doc-page-hero">
        {/* Decorative blob */}
        <div className="doc-page-hero-blob" />

        {badge && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: `color-mix(in srgb, ${badgeColor} 12%, transparent)`,
              border: `1px solid color-mix(in srgb, ${badgeColor} 28%, transparent)`,
              borderRadius: 100,
              padding: "0.25rem 0.75rem",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: badgeColor,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "0.85rem",
            }}
          >
            {badge}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div className="doc-page-hero-icon">{icon}</div>
          <div style={{ minWidth: 0 }}>
            <h1 className="doc-page-hero-title">{title}</h1>
            {description && (
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-text-2)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose">{children}</div>
    </div>
  );
}

/** Inline callout / tip box — colors adapt to current theme via CSS variables */
export function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip" | "danger";
  children: ReactNode;
}) {
  const accent = {
    info: "#024CCE",
    tip: "#4D8D01",
    warning: "#C98B25",
    danger: "#C20219",
  }[type];

  const icon = { info: "ℹ", tip: "✦", warning: "⚠", danger: "✕" }[type];

  return (
    <div
      style={{
        background: `var(--callout-${type}-bg)`,
        border: `1px solid var(--callout-${type}-border)`,
        borderLeft: `4px solid ${accent}`,
        borderRadius: "0 10px 10px 0",
        padding: "0.85rem 1.1rem",
        margin: "1.25rem 0",
        display: "flex",
        gap: "0.75rem",
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
          color: accent,
          fontWeight: 700,
          fontSize: "0.9rem",
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        {icon}
      </span>
      <div
        style={{
          fontSize: "0.9rem",
          color: "var(--color-text-2)",
          lineHeight: 1.65,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Step indicator for numbered guides */
export function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1.75rem" }}>
      <div
        style={{
          width: 32,
          height: 32,
          flexShrink: 0,
          background: "var(--brand-500)",
          color: "var(--color-bg)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "0.85rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          marginTop: 2,
        }}
      >
        {n}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--color-text)",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "0.9rem",
            color: "var(--color-text-2)",
            lineHeight: 1.7,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** Prop table row */
export function PropRow({
  name,
  type,
  desc,
  required,
}: {
  name: string;
  type: string;
  desc: string;
  required?: boolean;
}) {
  return (
    <tr>
      <td>
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.82em",
            background: "var(--brand-50)",
            color: "var(--brand-600)",
            padding: "0.15rem 0.45rem",
            borderRadius: 5,
            border: "1px solid var(--brand-100)",
          }}
        >
          {name}
        </code>
        {required && (
          <span
            style={{
              marginLeft: 6,
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "#C20219",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            req
          </span>
        )}
      </td>
      <td>
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8em",
            color: "var(--color-text-2)",
          }}
        >
          {type}
        </code>
      </td>
      <td style={{ color: "var(--color-text-2)", fontSize: "0.875rem" }}>
        {desc}
      </td>
    </tr>
  );
}
