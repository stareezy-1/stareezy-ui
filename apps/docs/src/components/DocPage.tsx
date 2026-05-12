/**
 * DocPage — beautiful wrapper for all MDX documentation pages.
 * Provides a consistent header, breadcrumb, and styled prose container.
 * All pages are "use client" so they can use our token CSS variables safely.
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
  badgeColor = "#024CCE",
  icon = "◈",
  children,
}: DocPageProps) {
  return (
    <div style={{ paddingBottom: "4rem" }}>
      {/* Hero header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #E6EDFA 0%, #ffffff 70%, #E7FDFA 100%)",
          borderRadius: 20,
          padding: "clamp(1.25rem, 4vw, 2rem) clamp(1rem, 4vw, 2.25rem)",
          marginBottom: "2.5rem",
          border: "1px solid var(--color-border-2)",
          position: "relative",
          overflow: "hidden",
          animation: "fadeUp 0.4s ease",
        }}
      >
        {/* Decorative blob */}
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 160,
            height: 160,
            background:
              "radial-gradient(circle, rgba(2,76,206,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {badge && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: `${badgeColor}18`,
              border: `1px solid ${badgeColor}30`,
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
          <div
            style={{
              width: 44,
              height: 44,
              flexShrink: 0,
              background: "linear-gradient(135deg, #024CCE, #14F1D8)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              boxShadow: "0 4px 14px rgba(2,76,206,0.25)",
            }}
          >
            {icon}
          </div>
          <div>
            <h1
              style={{
                fontSize: "clamp(1.4rem, 4vw, 1.85rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                margin: "0 0 0.5rem",
                background: "linear-gradient(135deg, #0F1010 0%, #024CCE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {title}
            </h1>
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

/** Inline callout / tip box */
export function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip" | "danger";
  children: ReactNode;
}) {
  const styles = {
    info: { bg: "#E6EDFA", border: "#B3C9F0", icon: "ℹ", color: "#024CCE" },
    tip: { bg: "#F3FFE3", border: "#CDF79A", icon: "✦", color: "#4D8D01" },
    warning: { bg: "#FEF4E2", border: "#FDDFAB", icon: "⚠", color: "#C98B25" },
    danger: { bg: "#FFE9EC", border: "#FA9AA5", icon: "✕", color: "#C20219" },
  }[type];

  return (
    <div
      style={{
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        borderLeft: `4px solid ${styles.color}`,
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
          color: styles.color,
          fontWeight: 700,
          fontSize: "0.9rem",
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        {styles.icon}
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
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "0.85rem",
          boxShadow: "0 2px 8px rgba(2,76,206,0.3)",
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
