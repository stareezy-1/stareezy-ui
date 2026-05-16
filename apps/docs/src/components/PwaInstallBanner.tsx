"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const FEATURES = [
  { icon: "⚡", text: "Instant access — no browser chrome" },
  { icon: "📖", text: "Browse docs offline" },
  { icon: "🔍", text: "Quick launch from home screen" },
];

export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Already standalone
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // User already dismissed — never show again
    if (localStorage.getItem("pwa-dismissed-docs")) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShow(true), 4000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setShow(false);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function install() {
    if (!deferredPrompt) return;
    setInstalling(true);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setInstalling(false);
    setShow(false);
    setDeferredPrompt(null);
  }

  function dismiss() {
    setShow(false);
    localStorage.setItem("pwa-dismissed-docs", String(Date.now()));
  }

  if (!show || installed) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 300,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          animation: "fadeIn 0.2s ease",
        }}
        aria-hidden="true"
      />

      {/* Modal — bottom sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pwa-docs-title"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 301,
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          borderRadius: "20px 20px 0 0",
          padding: "8px 0 0",
          maxWidth: 520,
          margin: "0 auto",
          animation: "slideUp 0.3s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "8px 0 16px",
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              background: "var(--color-border-2)",
            }}
          />
        </div>

        <div style={{ padding: "0 24px 32px" }}>
          {/* App icon + name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 14,
                background: "#0d1117",
                border: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 16px rgba(2,76,206,0.25)",
              }}
            >
              <svg viewBox="0 0 32 32" width="32" height="32">
                <polygon
                  points="16,3 27,9 27,23 16,29 5,23 5,9"
                  fill="none"
                  stroke="#024CCE"
                  strokeWidth="2"
                />
                <circle cx="16" cy="16" r="5" fill="#14F1D8" />
              </svg>
            </div>
            <div>
              <h2
                id="pwa-docs-title"
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "var(--color-text)",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Install Stareezy UI Docs
              </h2>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--color-muted)",
                  margin: "4px 0 0",
                }}
              >
                stareezy-ui.vercel.app
              </p>
            </div>
          </div>

          <p
            style={{
              fontSize: 14,
              color: "var(--color-text-2)",
              lineHeight: 1.6,
              marginBottom: 18,
            }}
          >
            Add the docs to your home screen for quick access to all components,
            tokens, and guides — even offline.
          </p>

          {/* Features */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 20,
            }}
          >
            {FEATURES.map(({ icon, text }) => (
              <div
                key={text}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: "var(--brand-50)",
                    border: "1px solid var(--brand-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <span style={{ fontSize: 13, color: "var(--color-text-2)" }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              onClick={install}
              disabled={installing}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: 12,
                border: "none",
                background: installing
                  ? "rgba(2,76,206,0.5)"
                  : "linear-gradient(135deg, #024CCE, #14F1D8)",
                color: "white",
                fontSize: 15,
                fontWeight: 700,
                cursor: installing ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: installing
                  ? "none"
                  : "0 4px 16px rgba(2,76,206,0.4)",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              {installing ? (
                <>
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      border: "2px solid white",
                      borderTopColor: "transparent",
                      animation: "spin 0.8s linear infinite",
                      display: "inline-block",
                    }}
                  />
                  Installing…
                </>
              ) : (
                "⬇ Install App"
              )}
            </button>
            <button
              onClick={dismiss}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: 12,
                background: "transparent",
                border: "1px solid var(--color-border)",
                color: "var(--color-muted)",
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              Not now
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
