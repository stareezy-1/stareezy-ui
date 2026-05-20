"use client";

/**
 * Design System Explorer — /tokens
 *
 * Pure HTML/CSS implementation — no imports from packages/components to avoid
 * pulling React hooks (useContext/createContext) into the server bundle.
 *
 * Requirements: 20.1–20.6
 */

import React, { useState, useCallback } from "react";

// Token data only — no React hooks in these files
import {
  palette,
  colors,
  extendedColors,
} from "../../../../../packages/tokens/src/colors";
import { spacing } from "../../../../../packages/tokens/src/spacing";
import { typography } from "../../../../../packages/tokens/src/typography";
import { radius, roundness } from "../../../../../packages/tokens/src/radius";
import { shadow } from "../../../../../packages/tokens/src/shadow";
import { semanticColors } from "../../../../../packages/tokens/src/semantic";
import { aurora } from "../../../../../packages/tokens/src/aurora";
import { steinsGate } from "../../../../../packages/tokens/src/steins-gate";
import { motion } from "../../../../../packages/tokens/src/motion";
import { glow } from "../../../../../packages/tokens/src/glow";
import type { Token } from "../../../../../packages/tokens/src/token";

type ThemeMode = "light" | "dark";

// ── Helpers ──────────────────────────────────────────────────────────────────
function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length < 6) return true;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return true;
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

function shadowToCss(v: {
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
}): string {
  return `${v.shadowOffset?.width}px ${v.shadowOffset?.height}px ${
    v.shadowRadius * 2
  }px rgba(0,0,0,${v.shadowOpacity})`;
}

// ── Token Popover ─────────────────────────────────────────────────────────────
function TokenPopover({
  tok,
  onClose,
}: {
  tok: Token<unknown>;
  onClose: () => void;
}) {
  const val =
    typeof tok.value === "object"
      ? JSON.stringify(tok.value, null, 2)
      : String(tok.value);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Token: ${tok.id}`}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(7,7,7,0.65)",
        backdropFilter: "blur(6px)",
        animation: "fadeIn 0.15s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0d1117",
          color: "#e2e8f0",
          borderRadius: 16,
          padding: "1.75rem",
          maxWidth: 480,
          width: "90%",
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          lineHeight: 1.7,
          boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
          border: "1px solid rgba(255,255,255,0.08)",
          animation: "fadeUp 0.2s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.25rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#024CCE",
              }}
            />
            <span
              style={{ fontWeight: 700, fontSize: "0.9rem", color: "#89b4fa" }}
            >
              Token Object
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              color: "#e2e8f0",
              cursor: "pointer",
              fontSize: "1rem",
              width: 28,
              height: 28,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: 8,
            padding: "1rem",
          }}
        >
          <pre
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              color: "#cdd6f4",
            }}
          >
            {`{\n  __token: true,\n  id: "${tok.id}",\n  value: ${val}\n}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "3rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: "1.5rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--color-border-2)",
        }}
      >
        <div
          style={{
            width: 4,
            height: 20,
            background: "var(--brand-500)",
            borderRadius: 2,
          }}
        />
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--color-text)",
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

// ── Color Swatch ──────────────────────────────────────────────────────────────
function ColorSwatch({
  tok,
  onSelect,
}: {
  tok: Token<string>;
  onSelect: (t: Token<unknown>) => void;
}) {
  const [hov, setHov] = useState(false);
  const light = isLight(tok.value);
  return (
    <button
      aria-label={`${tok.id}: ${tok.value}`}
      onClick={() => onSelect(tok)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${
          hov ? "var(--brand-200)" : "var(--color-border-2)"
        }`,
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        background: "none",
        padding: 0,
        textAlign: "left",
        width: "100%",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? "0 8px 24px rgba(2,76,206,0.12)" : "var(--shadow-sm)",
        transition: "all 0.18s ease",
      }}
    >
      <div
        style={{
          height: 52,
          background: tok.value,
          display: "flex",
          alignItems: "flex-end",
          padding: "0.3rem 0.4rem",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            fontFamily: "var(--font-mono)",
            color: light ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.85)",
            background: light ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.35)",
            borderRadius: 3,
            padding: "1px 4px",
          }}
        >
          {tok.value}
        </span>
      </div>
      <div
        style={{
          padding: "0.45rem 0.5rem",
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border-2)",
        }}
      >
        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            color: "var(--color-text)",
            wordBreak: "break-all",
            marginBottom: 2,
          }}
        >
          {tok.id}
        </div>
        <div
          style={{
            fontSize: "0.6rem",
            fontFamily: "var(--font-mono)",
            color: "var(--color-muted)",
            wordBreak: "break-all",
          }}
        >{`--${tok.id}`}</div>
      </div>
    </button>
  );
}

// ── Color Group ───────────────────────────────────────────────────────────────
function ColorGroup({
  name,
  tokens,
  onSelect,
}: {
  name: string;
  tokens: Record<string | number, Token<string>>;
  onSelect: (t: Token<unknown>) => void;
}) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <div
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--color-muted)",
          marginBottom: "0.6rem",
        }}
      >
        {name}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          gap: "0.5rem",
        }}
      >
        {Object.entries(tokens).map(([, tok]) => (
          <ColorSwatch key={tok.id} tok={tok} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

// ── Spacing Row ───────────────────────────────────────────────────────────────
function SpacingRow({
  tok,
  onSelect,
}: {
  tok: Token<number>;
  onSelect: (t: Token<unknown>) => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      aria-label={`${tok.id}: ${tok.value}px`}
      onClick={() => onSelect(tok)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.5rem 0.75rem",
        border: `1px solid ${
          hov ? "var(--brand-100)" : "var(--color-border-2)"
        }`,
        borderRadius: 8,
        background: hov ? "var(--brand-50)" : "var(--color-surface)",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        transition: "all 0.15s",
      }}
    >
      <div
        style={{
          height: 14,
          width: Math.min(tok.value, 280),
          minWidth: tok.value > 0 ? 4 : 0,
          background:
            "linear-gradient(90deg, var(--brand-400), var(--brand-200))",
          borderRadius: 3,
          flexShrink: 0,
          opacity: 0.85,
        }}
      />
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "var(--color-text)",
            minWidth: 120,
          }}
        >
          {tok.id}
        </span>
        <span style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>
          {tok.value}px
        </span>
      </div>
    </button>
  );
}

// ── Typography Sample ─────────────────────────────────────────────────────────
function TypoSample({
  label,
  tok,
  sampleStyle,
  onSelect,
}: {
  label: string;
  tok: Token<string | number>;
  sampleStyle: React.CSSProperties;
  onSelect: (t: Token<unknown>) => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      aria-label={`Typography token ${tok.id}`}
      onClick={() => onSelect(tok)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        padding: "0.85rem 1rem",
        border: `1px solid ${
          hov ? "var(--brand-100)" : "var(--color-border-2)"
        }`,
        borderRadius: 10,
        background: hov ? "var(--brand-50)" : "var(--color-surface)",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        transition: "all 0.15s",
      }}
    >
      <div style={{ minWidth: 160, flexShrink: 0 }}>
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--color-muted)",
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "0.68rem",
            fontFamily: "var(--font-mono)",
            color: "var(--brand-500)",
            marginBottom: 1,
          }}
        >
          {tok.id}
        </div>
        <div style={{ fontSize: "0.68rem", color: "var(--color-muted)" }}>
          {String(tok.value)}
        </div>
      </div>
      <div
        style={{
          ...sampleStyle,
          color: "var(--color-text)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          flex: 1,
        }}
      >
        The quick brown fox jumps
      </div>
    </button>
  );
}

// ── Radius Card ───────────────────────────────────────────────────────────────
function RadiusCard({
  tok,
  onSelect,
}: {
  tok: Token<number>;
  onSelect: (t: Token<unknown>) => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      aria-label={`${tok.id}: ${tok.value}px`}
      onClick={() => onSelect(tok)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.6rem",
        padding: "1.25rem",
        border: `1px solid ${
          hov ? "var(--brand-100)" : "var(--color-border-2)"
        }`,
        borderRadius: 10,
        background: hov ? "var(--brand-50)" : "var(--color-surface)",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          background:
            "linear-gradient(135deg, var(--brand-400), var(--brand-200))",
          borderRadius: Math.min(tok.value, 48),
          opacity: 0.85,
        }}
      />
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "var(--color-text)",
          }}
        >
          {tok.id}
        </div>
        <div style={{ fontSize: "0.68rem", color: "var(--color-muted)" }}>
          {tok.value}px
        </div>
      </div>
    </button>
  );
}

// ── Shadow Card ───────────────────────────────────────────────────────────────
function ShadowCard({
  name,
  tok,
  onSelect,
}: {
  name: string;
  tok: Token<unknown>;
  onSelect: (t: Token<unknown>) => void;
}) {
  const [hov, setHov] = useState(false);
  const v = tok.value as {
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
  };
  return (
    <button
      aria-label={`Shadow: ${tok.id}`}
      onClick={() => onSelect(tok)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "1.5rem",
        border: `1px solid ${
          hov ? "var(--brand-100)" : "var(--color-border-2)"
        }`,
        borderRadius: 12,
        background: hov ? "var(--brand-50)" : "var(--color-surface)",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          background: "var(--color-surface)",
          borderRadius: 10,
          boxShadow: shadowToCss(v),
          border: "1px solid var(--color-border-2)",
        }}
      />
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--color-text)",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: "0.68rem",
            fontFamily: "var(--font-mono)",
            color: "var(--color-muted)",
          }}
        >
          {tok.id}
        </div>
      </div>
    </button>
  );
}

// ── Semantic Row ──────────────────────────────────────────────────────────────
function SemanticRow({
  group,
  name,
  tok,
  onSelect,
}: {
  group: string;
  name: string;
  tok: Token<string>;
  onSelect: (t: Token<unknown>) => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      aria-label={`${group}.${name}: ${tok.value}`}
      onClick={() => onSelect(tok)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.85rem",
        padding: "0.6rem 0.85rem",
        border: `1px solid ${
          hov ? "var(--brand-100)" : "var(--color-border-2)"
        }`,
        borderRadius: 8,
        background: hov ? "var(--brand-50)" : "var(--color-surface)",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        transition: "all 0.15s",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          background: tok.value,
          borderRadius: 6,
          flexShrink: 0,
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--color-text)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {group}.{name}
          </div>
          <div
            style={{
              fontSize: "0.68rem",
              color: "var(--color-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {tok.id}
          </div>
        </div>
        <span
          style={{
            fontSize: "0.72rem",
            fontFamily: "var(--font-mono)",
            color: "var(--color-text-2)",
            background: "var(--color-surface-2)",
            padding: "2px 8px",
            borderRadius: 4,
          }}
        >
          {tok.value}
        </span>
      </div>
    </button>
  );
}

// ── Sub-section label ─────────────────────────────────────────────────────────
function SubLabel({ text }: { text: string }) {
  return (
    <div
      style={{
        fontSize: "0.72rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--color-muted)",
        marginBottom: "0.6rem",
        marginTop: "0.25rem",
      }}
    >
      {text}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TokensPage() {
  const [selected, setSelected] = useState<Token<unknown> | null>(null);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const isDark = theme === "dark";

  const handleSelect = useCallback(
    (tok: Token<unknown>) => setSelected(tok),
    [],
  );
  const handleClose = useCallback(() => setSelected(null), []);

  const NAMED_SPACING = [
    spacing.zero,
    spacing.pixel,
    spacing.nano,
    spacing.tiny,
    spacing.regular,
    spacing.small,
    spacing.medium,
    spacing.extraMedium,
    spacing.large,
    spacing.extraLarge,
    spacing.extraLarge2,
    spacing.extraLarge3,
    spacing.huge,
  ];
  const NUMERIC_SPACING = [
    spacing[1],
    spacing[2],
    spacing[4],
    spacing[6],
    spacing[8],
    spacing[10],
    spacing[12],
    spacing[14],
    spacing[16],
    spacing[18],
    spacing[20],
    spacing[24],
    spacing[28],
    spacing[32],
    spacing[36],
    spacing[42],
    spacing[48],
    spacing[64],
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: isDark ? "#0F1010" : "var(--color-bg)",
        transition: "background 0.3s",
        paddingBottom: "4rem",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div
        style={{
          background: isDark
            ? "linear-gradient(135deg, #0F1010 0%, #011E52 100%)"
            : "linear-gradient(135deg, #E6EDFA 0%, #ffffff 60%, #E7FDFA 100%)",
          borderRadius: 20,
          padding: "2.5rem",
          marginBottom: "2.5rem",
          border: `1px solid ${
            isDark ? "rgba(255,255,255,0.06)" : "var(--color-border-2)"
          }`,
          position: "relative",
          overflow: "hidden",
          animation: "fadeUp 0.4s ease",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle, rgba(2,76,206,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: 100,
            width: 150,
            height: 150,
            background:
              "radial-gradient(circle, rgba(20,241,216,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "linear-gradient(135deg, #024CCE, #14F1D8)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  boxShadow: "0 4px 12px rgba(2,76,206,0.3)",
                }}
              >
                ◉
              </div>
              <h1
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  margin: 0,
                  color: isDark ? "#ffffff" : "var(--color-text)",
                  background: isDark
                    ? "none"
                    : "linear-gradient(135deg, #0F1010, #024CCE)",
                  WebkitBackgroundClip: isDark ? "none" : "text",
                  WebkitTextFillColor: isDark ? "white" : "transparent",
                }}
              >
                Token Explorer
              </h1>
            </div>
            <p
              style={{
                fontSize: "0.9rem",
                color: isDark ? "rgba(255,255,255,0.6)" : "var(--color-text-2)",
                maxWidth: 480,
                margin: 0,
              }}
            >
              Browse all design tokens — colors, spacing, typography, radius,
              shadows, and semantic tokens. Click any token to inspect its raw
              object.
            </p>
          </div>

          {/* Theme switcher */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: isDark
                ? "rgba(255,255,255,0.06)"
                : "var(--color-surface)",
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.1)" : "var(--color-border)"
              }`,
              borderRadius: 10,
              padding: "0.35rem",
            }}
          >
            {(["light", "dark"] as ThemeMode[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                aria-label={`${t} theme`}
                style={{
                  padding: "0.4rem 0.85rem",
                  borderRadius: 7,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  background:
                    theme === t
                      ? isDark
                        ? "rgba(255,255,255,0.12)"
                        : "var(--brand-500)"
                      : "transparent",
                  color:
                    theme === t
                      ? "white"
                      : isDark
                      ? "rgba(255,255,255,0.5)"
                      : "var(--color-muted)",
                  transition: "all 0.2s",
                }}
              >
                {t === "light" ? "☀ Light" : "☾ Dark"}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            marginTop: "1.75rem",
            flexWrap: "wrap",
          }}
        >
          {[
            ["300+", "Color tokens"],
            ["50+", "Spacing tokens"],
            ["30+", "Typography tokens"],
            ["23", "Radius tokens"],
          ].map(([v, l]) => (
            <div key={l}>
              <div
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: isDark ? "white" : "var(--brand-500)",
                  letterSpacing: "-0.02em",
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: isDark
                    ? "rgba(255,255,255,0.5)"
                    : "var(--color-muted)",
                  fontWeight: 500,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Colors ─────────────────────────────────────────────────────── */}
      <Section title="Colors">
        <ColorGroup
          name="Palette"
          tokens={palette as unknown as Record<string, Token<string>>}
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Celuren Blue"
          tokens={
            colors.celurenBlue as unknown as Record<string, Token<string>>
          }
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Beau Blue"
          tokens={colors.beauBlue as unknown as Record<string, Token<string>>}
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Raisin Black"
          tokens={
            colors.raisinBlack as unknown as Record<string, Token<string>>
          }
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Turquoise Blue"
          tokens={
            colors.turquiseBlue as unknown as Record<string, Token<string>>
          }
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Bright Yellow Crayola"
          tokens={
            colors.brightYellowCrayola as unknown as Record<
              string,
              Token<string>
            >
          }
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Lawn Green"
          tokens={colors.lawnGreen as unknown as Record<string, Token<string>>}
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Crimson Red"
          tokens={colors.crimsonRed as unknown as Record<string, Token<string>>}
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Neutral"
          tokens={colors.neutral as unknown as Record<string, Token<string>>}
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Success"
          tokens={colors.success as unknown as Record<string, Token<string>>}
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Caution"
          tokens={colors.caution as unknown as Record<string, Token<string>>}
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Danger"
          tokens={colors.danger as unknown as Record<string, Token<string>>}
          onSelect={handleSelect}
        />
        {/* Extended palette */}
        <ColorGroup
          name="Violet"
          tokens={
            extendedColors.violet as unknown as Record<string, Token<string>>
          }
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Rose"
          tokens={
            extendedColors.rose as unknown as Record<string, Token<string>>
          }
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Amber"
          tokens={
            extendedColors.amber as unknown as Record<string, Token<string>>
          }
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Emerald"
          tokens={
            extendedColors.emerald as unknown as Record<string, Token<string>>
          }
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Sky"
          tokens={
            extendedColors.sky as unknown as Record<string, Token<string>>
          }
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Slate"
          tokens={
            extendedColors.slate as unknown as Record<string, Token<string>>
          }
          onSelect={handleSelect}
        />
        <ColorGroup
          name="Zinc"
          tokens={
            extendedColors.zinc as unknown as Record<string, Token<string>>
          }
          onSelect={handleSelect}
        />
      </Section>

      {/* ── Semantic Tokens ─────────────────────────────────────────────── */}
      <Section title="Semantic Tokens">
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {Object.entries(semanticColors).map(([group, groupTokens]) =>
            Object.entries(groupTokens as Record<string, Token<string>>).map(
              ([name, tok]) => (
                <SemanticRow
                  key={tok.id}
                  group={group}
                  name={name}
                  tok={tok}
                  onSelect={handleSelect}
                />
              ),
            ),
          )}
        </div>
      </Section>

      {/* ── Aurora Colors ───────────────────────────────────────────────── */}
      <Section title="Aurora Colors">
        <ColorGroup
          name="Aurora"
          tokens={aurora as unknown as Record<string, Token<string>>}
          onSelect={handleSelect}
        />
      </Section>

      {/* ── Steins;Gate Colors ──────────────────────────────────────────── */}
      <Section title="Steins;Gate Colors">
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--color-text-2)",
            marginBottom: "1rem",
            lineHeight: 1.6,
          }}
        >
          Midnight navy / electric blue palette — drawn from the Steins;Gate
          visual novel. Electric blue (<code>ibmBlue</code>) is the primary
          brand color; divergence red (<code>divergenceRed</code>) is the danger
          accent.
        </p>
        <ColorGroup
          name="Steins;Gate"
          tokens={steinsGate as unknown as Record<string, Token<string>>}
          onSelect={handleSelect}
        />
      </Section>

      {/* ── Motion Tokens ───────────────────────────────────────────────── */}
      <Section title="Motion Tokens">
        <SubLabel text="Duration" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            marginBottom: "1.5rem",
          }}
        >
          {Object.entries(motion.duration).map(([key, tok]) => (
            <button
              key={tok.id}
              aria-label={`${tok.id}: ${tok.value}ms`}
              onClick={() => handleSelect(tok)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.5rem 0.75rem",
                border: "1px solid var(--color-border-2)",
                borderRadius: 8,
                background: "var(--color-surface)",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  height: 14,
                  width: Math.min(tok.value / 3, 200),
                  minWidth: 4,
                  background:
                    "linear-gradient(90deg, var(--brand-400), var(--brand-200))",
                  borderRadius: 3,
                  flexShrink: 0,
                  opacity: 0.85,
                }}
              />
              <div
                style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: "var(--color-text)",
                    minWidth: 160,
                  }}
                >
                  {tok.id}
                </span>
                <span
                  style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}
                >
                  {tok.value}ms
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--color-text-2)",
                    fontStyle: "italic",
                  }}
                >
                  {key}
                </span>
              </div>
            </button>
          ))}
        </div>
        <SubLabel text="Easing" />
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
        >
          {Object.entries(motion.easing).map(([key, tok]) => (
            <button
              key={tok.id}
              aria-label={`${tok.id}: ${tok.value}`}
              onClick={() => handleSelect(tok)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.5rem 0.75rem",
                border: "1px solid var(--color-border-2)",
                borderRadius: 8,
                background: "var(--color-surface)",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: "var(--color-text)",
                    minWidth: 160,
                  }}
                >
                  {tok.id}
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-muted)",
                    flex: 1,
                  }}
                >
                  {tok.value}
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--color-text-2)",
                    fontStyle: "italic",
                  }}
                >
                  {key}
                </span>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* ── Glow Tokens ─────────────────────────────────────────────────── */}
      <Section title="Glow Tokens">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {Object.entries(glow).map(([name, tok]) => (
            <button
              key={tok.id}
              aria-label={`Glow: ${tok.id}`}
              onClick={() => handleSelect(tok)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                padding: "1.5rem",
                border: "1px solid var(--color-border-2)",
                borderRadius: 12,
                background: "var(--color-surface)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  background: "#0a0a1a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: tok.value,
                }}
              />
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    marginBottom: 4,
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-muted)",
                    wordBreak: "break-all",
                  }}
                >
                  {tok.id}
                </div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* ── Spacing ─────────────────────────────────────────────────────── */}
      <Section title="Spacing">
        <SubLabel text="Named aliases" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            marginBottom: "1.5rem",
          }}
        >
          {NAMED_SPACING.map((tok) => (
            <SpacingRow key={tok.id} tok={tok} onSelect={handleSelect} />
          ))}
        </div>
        <SubLabel text="Numeric scale" />
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
        >
          {NUMERIC_SPACING.map((tok) => (
            <SpacingRow key={tok.id} tok={tok} onSelect={handleSelect} />
          ))}
        </div>
      </Section>

      {/* ── Typography ──────────────────────────────────────────────────── */}
      <Section title="Typography">
        <SubLabel text="Font Sizes" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {Object.entries(typography.fontSize).map(([key, tok]) => (
            <TypoSample
              key={tok.id}
              label={key}
              tok={tok}
              sampleStyle={{ fontSize: tok.value }}
              onSelect={handleSelect}
            />
          ))}
        </div>
        <SubLabel text="Font Weights" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {Object.entries(typography.fontWeight).map(([key, tok]) => (
            <TypoSample
              key={tok.id}
              label={key}
              tok={tok}
              sampleStyle={{
                fontWeight: tok.value as React.CSSProperties["fontWeight"],
              }}
              onSelect={handleSelect}
            />
          ))}
        </div>
        <SubLabel text="Font Families" />
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {Object.entries(typography.fontFamily).map(([key, tok]) => (
            <TypoSample
              key={tok.id}
              label={key}
              tok={tok}
              sampleStyle={{ fontFamily: tok.value as string }}
              onSelect={handleSelect}
            />
          ))}
        </div>
        <SubLabel text="Line Heights" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {Object.entries(typography.lineHeight).map(([key, tok]) => (
            <TypoSample
              key={tok.id}
              label={key}
              tok={tok}
              sampleStyle={{ lineHeight: tok.value as number, fontSize: 14 }}
              onSelect={handleSelect}
            />
          ))}
        </div>
        <SubLabel text="Letter Spacing" />
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {Object.entries(typography.letterSpacing).map(([key, tok]) => (
            <TypoSample
              key={tok.id}
              label={key}
              tok={tok}
              sampleStyle={{
                letterSpacing: `${(tok.value as number) * 16}px`,
                fontSize: 14,
              }}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </Section>

      {/* ── Radius ──────────────────────────────────────────────────────── */}
      <Section title="Border Radius">
        <SubLabel text="Radius scale" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          {Object.entries(radius).map(([, tok]) => (
            <RadiusCard key={tok.id} tok={tok} onSelect={handleSelect} />
          ))}
        </div>
        <SubLabel text="Roundness scale" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {Object.entries(roundness).map(([, tok]) => (
            <RadiusCard key={tok.id} tok={tok} onSelect={handleSelect} />
          ))}
        </div>
      </Section>

      {/* ── Shadows ─────────────────────────────────────────────────────── */}
      <Section title="Shadows">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "1rem",
          }}
        >
          {Object.entries(shadow).map(([name, tok]) => (
            <ShadowCard
              key={tok.id}
              name={name}
              tok={tok as Token<unknown>}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </Section>

      {/* ── Popover ─────────────────────────────────────────────────────── */}
      {selected && <TokenPopover tok={selected} onClose={handleClose} />}
    </div>
  );
}
