"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";

// ── Example snippets ──────────────────────────────────────────────────────────
const EXAMPLES: Record<string, { label: string; icon: string; code: string }> =
  {
    box: {
      label: "Box",
      icon: "⬡",
      code: `import { colors, spacing, radius } from '@stareezy-ui/tokens'
import { Box, Text } from '@stareezy-ui/components'

export default function Demo() {
  return (
    <Box
      bg={colors.celurenBlue[500]}
      p={spacing[4]}
      rounded={radius.md}
      style={{ maxWidth: 320 }}
    >
      <Text
        type="M-heading-bold"
        text="Hello, Stareezy UI"
        color={colors.neutral[10].value}
      />
      <Text
        type="S-paragraph-regular"
        text="A fully typed design token system."
        color={colors.celurenBlue[100].value}
        style={{ marginTop: 8 }}
      />
    </Box>
  )
}`,
    },
    button: {
      label: "Button",
      icon: "◈",
      code: `import { Button } from '@stareezy-ui/components'
import { HStack } from '@stareezy-ui/components'

export default function Demo() {
  return (
    <HStack gap={12} flexWrap="wrap">
      <Button variant="primary"   size="md" text="Primary" />
      <Button variant="secondary" size="md" text="Secondary" />
      <Button variant="tertiary"  size="md" text="Tertiary" />
      <Button variant="primary"   size="md" text="Loading" loading />
      <Button variant="primary"   size="md" text="Disabled" disabled />
    </HStack>
  )
}`,
    },
    tokens: {
      label: "Tokens",
      icon: "◉",
      code: `import { colors, spacing, radius } from '@stareezy-ui/tokens'
import { Box, Text, VStack } from '@stareezy-ui/components'

const SWATCHES = [
  { label: 'celurenBlue[500]',          value: colors.celurenBlue[500].value },
  { label: 'lawnGreen[500]',            value: colors.lawnGreen[500].value },
  { label: 'crimsonRed[500]',           value: colors.crimsonRed[500].value },
  { label: 'brightYellowCrayola[500]',  value: colors.brightYellowCrayola[500].value },
]

export default function Demo() {
  return (
    <VStack gap={8} style={{ maxWidth: 300 }}>
      {SWATCHES.map(({ label, value }) => (
        <Box
          key={label}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: spacing[3].value,
            borderRadius: radius.md.value,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: 6, background: value }} />
          <Text text={label} style={{ fontSize: 13, fontFamily: 'monospace', color: '#e2e8f0' }} />
        </Box>
      ))}
    </VStack>
  )
}`,
    },
    theme: {
      label: "Theme",
      icon: "◑",
      code: `import { ThemeProvider, useThemeSwitch } from '@stareezy-ui/tokens'
import { Box, Text, Button } from '@stareezy-ui/components'
import { colors, spacing, radius } from '@stareezy-ui/tokens'

function ThemeDemo() {
  const { toggleTheme, isDark } = useThemeSwitch()
  return (
    <Box
      bg={isDark ? colors.raisinBlack[800] : colors.neutral[10]}
      p={spacing[4]}
      rounded={radius.lg}
      style={{ maxWidth: 300 }}
    >
      <Text
        type="M-heading-bold"
        text={isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
        color={isDark ? colors.neutral[10].value : colors.raisinBlack[800].value}
      />
      <Button
        variant="primary"
        text="Toggle Theme"
        onPress={toggleTheme}
        style={{ marginTop: spacing[3].value }}
      />
    </Box>
  )
}

export default function Demo() {
  return (
    <ThemeProvider theme="light">
      <ThemeDemo />
    </ThemeProvider>
  )
}`,
    },
  };

const INSPECTOR_TOKENS = [
  { id: "celurenBlue-500", value: "#024CCE", prop: "bg" },
  { id: "spacing-4", value: "4px", prop: "p" },
  { id: "radius-md", value: "8px", prop: "rounded" },
  { id: "neutral-10", value: "#FFFFFF", prop: "color" },
];

const BREAKPOINTS = [
  { label: "Mobile", icon: "📱", width: 375 },
  { label: "Tablet", icon: "📟", width: 768 },
  { label: "Desktop", icon: "🖥", width: "100%" as const },
];

const GENERATED_CSS = `/* Generated atomic CSS */
:root {
  --celurenBlue-500: #024CCE;
  --spacing-4: 4px;
  --radius-md: 8px;
  --neutral-10: #FFFFFF;
}

.sz-bg-celurenBlue-500 {
  background-color: var(--celurenBlue-500);
}
.sz-p-spacing-4 {
  padding: var(--spacing-4);
}
.sz-rounded-radius-md {
  border-radius: var(--radius-md);
}`;

// ── Shared button style helper ────────────────────────────────────────────────
function tabBtn(active: boolean): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "0.3rem 0.7rem",
    borderRadius: "var(--radius-sm)",
    border: "none",
    background: active ? "rgba(2,76,206,0.15)" : "transparent",
    color: active ? "#89b4fa" : "var(--color-text-2)",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: active ? 600 : 400,
    transition: "all 0.15s",
    whiteSpace: "nowrap" as const,
  };
}

function modeBtn(active: boolean): React.CSSProperties {
  return {
    padding: "0.25rem 0.65rem",
    borderRadius: "var(--radius-sm)",
    border: "none",
    background: active ? "var(--brand-500)" : "transparent",
    color: active ? "white" : "var(--color-text-2)",
    cursor: "pointer",
    fontSize: "0.75rem",
    fontWeight: 600,
    transition: "all 0.15s",
  };
}

export default function PlaygroundPage() {
  const [activeExample, setActiveExample] = useState("box");
  const [code, setCode] = useState(EXAMPLES["box"]!.code);
  const [previewMode, setPreviewMode] = useState<"web" | "rn">("web");
  const [breakpoint, setBreakpoint] = useState<number | "100%">("100%");
  const [showInspector, setShowInspector] = useState(true);
  const [showCss, setShowCss] = useState(false);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleExampleChange = useCallback((key: string) => {
    setActiveExample(key);
    setCode(EXAMPLES[key]!.code);
  }, []);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 600);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  return (
    <div className="playground-root">
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="playground-topbar">
        {/* Left: logo + example tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            minWidth: 0,
            flex: 1,
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                background:
                  "linear-gradient(135deg, var(--brand-500), #14F1D8)",
                borderRadius: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 800,
                fontSize: "0.75rem",
              }}
            >
              S
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "var(--color-text)",
              }}
            >
              Playground
            </span>
          </Link>
          <div
            style={{
              width: 1,
              height: 20,
              background: "var(--color-border)",
              flexShrink: 0,
            }}
          />
          {/* Example tabs — scrollable on mobile */}
          <div
            className="example-tabs"
            style={{ display: "flex", gap: 2, overflowX: "auto" }}
          >
            {Object.entries(EXAMPLES).map(([key, ex]) => (
              <button
                key={key}
                onClick={() => handleExampleChange(key)}
                style={tabBtn(activeExample === key)}
              >
                <span style={{ fontSize: "0.75rem" }}>{ex.icon}</span>
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexShrink: 0,
          }}
        >
          {/* Preview mode */}
          <div
            style={{
              display: "flex",
              background: "var(--color-surface-2)",
              borderRadius: "var(--radius-sm)",
              padding: "0.2rem",
              border: "1px solid var(--color-border)",
            }}
          >
            {(["web", "rn"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setPreviewMode(m)}
                style={modeBtn(previewMode === m)}
              >
                {m === "web" ? "🌐" : "📱"}
              </button>
            ))}
          </div>

          {/* Mobile panel toggle */}
          <button
            onClick={() => setMobilePanelOpen((v) => !v)}
            aria-label="Toggle inspector panel"
            style={{
              ...modeBtn(mobilePanelOpen),
              display: "none",
              padding: "0.3rem 0.6rem",
            }}
            className="mobile-panel-toggle"
          >
            ◉
          </button>

          {/* Run */}
          <button
            onClick={handleRun}
            aria-label="Run code"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "0.35rem 0.9rem",
              borderRadius: "var(--radius-sm)",
              border: "none",
              background: "var(--brand-500)",
              color: "white",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 700,
              boxShadow: "0 2px 8px rgba(2,76,206,0.35)",
              transition: "all 0.15s",
              opacity: isRunning ? 0.7 : 1,
            }}
          >
            <span
              style={{
                animation: isRunning ? "pulse 0.6s ease infinite" : "none",
              }}
            >
              {isRunning ? "⟳" : "▶"}
            </span>
            <span className="run-label">{isRunning ? "Running…" : "Run"}</span>
          </button>

          <Link
            href="/"
            style={{
              fontSize: "0.78rem",
              color: "var(--color-text-2)",
              textDecoration: "none",
              padding: "0.3rem 0.6rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-border)",
              whiteSpace: "nowrap",
            }}
          >
            ← Docs
          </Link>
        </div>
      </div>

      {/* ── Main area ────────────────────────────────────────────────────── */}
      <div className="playground-main">
        {/* ── Editor ───────────────────────────────────────────────────── */}
        <div className="playground-editor">
          {/* Editor header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.5rem 1rem",
              borderBottom: "1px solid var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: c,
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                App.tsx
              </span>
            </div>
            <span style={{ fontSize: "0.7rem", color: "var(--color-muted)" }}>
              TypeScript JSX
            </span>
          </div>

          {/* Textarea editor */}
          <div style={{ flex: 1, overflow: "auto", background: "#0d1117" }}>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              aria-label="Code editor — TypeScript JSX"
              style={{
                width: "100%",
                minHeight: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#e2e8f0",
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
                lineHeight: 1.7,
                padding: "1.25rem",
                resize: "none",
                tabSize: 2,
              }}
            />
          </div>
        </div>

        {/* ── Preview area ─────────────────────────────────────────────── */}
        <div className="playground-preview-area">
          {/* Breakpoint bar */}
          <div className="playground-breakpoint-bar">
            <span
              style={{
                fontSize: "0.7rem",
                color: "var(--color-muted)",
                marginRight: 4,
                flexShrink: 0,
              }}
            >
              Viewport
            </span>
            {BREAKPOINTS.map((bp) => (
              <button
                key={bp.label}
                onClick={() => setBreakpoint(bp.width)}
                style={tabBtn(breakpoint === bp.width)}
              >
                <span>{bp.icon}</span>
                <span>{bp.label}</span>
                {typeof bp.width === "number" && (
                  <span style={{ opacity: 0.6, fontSize: "0.7rem" }}>
                    {bp.width}px
                  </span>
                )}
              </button>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
              <button
                onClick={() => setShowInspector(!showInspector)}
                style={tabBtn(showInspector)}
              >
                ◉ Inspector
              </button>
              <button
                onClick={() => setShowCss(!showCss)}
                style={tabBtn(showCss)}
              >
                ⚙ CSS
              </button>
            </div>
          </div>

          <div className="playground-preview-content">
            {/* Preview canvas */}
            <div
              style={{
                flex: 1,
                overflow: "auto",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: "2rem",
                background: previewMode === "web" ? "#f8faff" : "#1a1a2e",
              }}
            >
              <div
                style={{
                  width: typeof breakpoint === "number" ? breakpoint : "100%",
                  maxWidth: "100%",
                  transition: "width 0.3s ease",
                  animation: "fadeIn 0.3s ease",
                }}
              >
                <div
                  style={{
                    background: previewMode === "web" ? "white" : "#0d0f14",
                    borderRadius: "var(--radius-lg)",
                    padding: "2rem",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    minHeight: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, var(--brand-500), #14F1D8)",
                        borderRadius: "var(--radius-md)",
                        padding: "1.5rem 2rem",
                        marginBottom: "1rem",
                        boxShadow: "0 8px 24px rgba(2,76,206,0.25)",
                        animation: isRunning ? "pulse 0.6s ease" : "none",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: "1.1rem",
                          color: "white",
                          marginBottom: 4,
                        }}
                      >
                        Hello, Stareezy UI
                      </div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.75)",
                        }}
                      >
                        A fully typed design token system.
                      </div>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#8892a4" }}>
                      {previewMode === "web"
                        ? "🌐 Web Preview"
                        : "📱 React Native Preview"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side panels — desktop */}
            {(showInspector || showCss) && (
              <div
                className={`playground-side-panel${mobilePanelOpen ? " mobile-visible" : ""}`}
              >
                {showInspector && (
                  <div
                    style={{
                      flex: showCss ? "0 0 auto" : 1,
                      overflow: "auto",
                      borderBottom: showCss
                        ? "1px solid var(--color-border)"
                        : "none",
                    }}
                  >
                    <div
                      style={{
                        padding: "0.6rem 0.85rem",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--color-muted)",
                        }}
                      >
                        ◉ Token Inspector
                      </span>
                    </div>
                    <div style={{ padding: "0.5rem" }}>
                      {INSPECTOR_TOKENS.map((t) => (
                        <div
                          key={t.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "0.45rem 0.5rem",
                            borderRadius: "var(--radius-sm)",
                            marginBottom: 2,
                            background: "rgba(255,255,255,0.02)",
                          }}
                        >
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 4,
                              background: t.value.includes("#")
                                ? t.value
                                : "var(--color-surface-2)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              flexShrink: 0,
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: "0.68rem",
                                fontFamily: "var(--font-mono)",
                                color: "#89b4fa",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {t.id}
                            </div>
                            <div
                              style={{
                                fontSize: "0.65rem",
                                color: "var(--color-muted)",
                                fontFamily: "var(--font-mono)",
                              }}
                            >
                              {t.value}
                            </div>
                          </div>
                          <span
                            style={{
                              fontSize: "0.62rem",
                              background: "rgba(2,76,206,0.15)",
                              color: "#89b4fa",
                              padding: "1px 5px",
                              borderRadius: 3,
                              flexShrink: 0,
                            }}
                          >
                            {t.prop}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {showCss && (
                  <div style={{ flex: 1, overflow: "auto" }}>
                    <div
                      style={{
                        padding: "0.6rem 0.85rem",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--color-muted)",
                        }}
                      >
                        ⚙ CSS Output
                      </span>
                    </div>
                    <pre
                      style={{
                        padding: "0.75rem",
                        fontSize: "0.68rem",
                        fontFamily: "var(--font-mono)",
                        color: "#a6e3a1",
                        lineHeight: 1.65,
                        margin: 0,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {GENERATED_CSS}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Status bar ───────────────────────────────────────────────────── */}
      <div className="playground-statusbar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.85)",
              fontWeight: 500,
            }}
          >
            ◉ Stareezy UI Playground
          </span>
          <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.6)" }}>
            {code.split("\n").length} lines
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.6)" }}>
            TypeScript JSX
          </span>
          <span
            style={{
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.85)",
              fontWeight: 600,
            }}
          >
            {isRunning ? "⟳ Running…" : "✓ Ready"}
          </span>
        </div>
      </div>
    </div>
  );
}
