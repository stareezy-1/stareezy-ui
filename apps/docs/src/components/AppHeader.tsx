"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { trackEvent } from "../lib/analytics";

const STORYBOOK_URL =
  process.env["NEXT_PUBLIC_STORYBOOK_URL"] ??
  "https://storybook.stareezy.tech/";

const SECTIONS = [
  {
    href: "/",
    label: "Docs",
    icon: "◈",
    external: false,
    match: (p: string) =>
      p === "/" || p.startsWith("/docs") || p.startsWith("/tokens"),
  },
  {
    href: "/playground",
    label: "Playground",
    icon: "▶",
    external: false,
    match: (p: string) => p.startsWith("/playground"),
  },
  {
    href: STORYBOOK_URL,
    label: "Storybook",
    icon: "⬡",
    external: true,
    match: (_p: string) => false,
  },
];

function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

interface AppHeaderProps {
  /** Called when the hamburger is tapped on docs routes — opens the sidebar drawer */
  onSidebarToggle?: () => void;
  /** Reflects the sidebar open state so the hamburger icon can show ✕ */
  sidebarOpen?: boolean;
}

export function AppHeader({
  onSidebarToggle,
  sidebarOpen = false,
}: AppHeaderProps) {
  const pathname = usePathname();
  // Only used on non-docs routes (playground/storybook) where there's no sidebar
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolled = useScrolled();

  const menuOpen = onSidebarToggle ? sidebarOpen : mobileMenuOpen;

  return (
    <header
      className={`app-header${scrolled ? " scrolled" : ""}`}
      role="banner"
    >
      {/* Logo */}
      <Link href="/" className="app-header-logo" aria-label="Stareezy UI home">
        <div className="app-header-logo-icon" aria-hidden="true">
          S
        </div>
        <span className="app-header-logo-text">Stareezy UI</span>
        <span className="app-header-version" suppressHydrationWarning>
          v1.1.0
        </span>
      </Link>

      {/* Section tabs — desktop only, hidden via CSS on mobile */}
      <nav className="app-header-tabs" aria-label="Main navigation">
        {SECTIONS.map((s) => {
          const active = s.match(pathname);
          return (
            <Link
              key={s.href}
              href={s.href}
              className={`app-header-tab${active ? " active" : ""}`}
              aria-current={active ? "page" : undefined}
              onClick={() =>
                trackEvent({
                  name: "nav_link_click",
                  label: s.label,
                  href: s.href,
                  location: "header",
                })
              }
            >
              <span className="app-header-tab-icon" aria-hidden="true">
                {s.icon}
              </span>
              <span className="app-header-tab-label">{s.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right actions */}
      <div className="app-header-actions">
        <ThemeToggle />

        <a
          href="https://github.com/stareezy-1/stareezy-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="app-header-action-btn"
          aria-label="GitHub repository (opens in new tab)"
        >
          <span aria-hidden="true">↗</span>
          <span className="app-header-action-label">GitHub</span>
        </a>

        <button
          className="app-header-mobile-toggle"
          onClick={() => {
            if (onSidebarToggle) {
              onSidebarToggle();
            } else {
              setMobileMenuOpen((v) => !v);
            }
          }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile section dropdown — only on non-docs routes (no sidebar) */}
      {!onSidebarToggle && mobileMenuOpen && (
        <div
          className="app-header-mobile-menu"
          style={{ display: "flex" }}
          role="navigation"
          aria-label="Mobile navigation"
        >
          {SECTIONS.map((s) => {
            const active = s.match(pathname);
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`app-header-mobile-link${active ? " active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={active ? "page" : undefined}
              >
                <span aria-hidden="true">{s.icon}</span>
                {s.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
