"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_SECTIONS = [
  {
    title: "Getting Started",
    links: [
      { href: "/", label: "Home", icon: "⌂" },
      { href: "/docs/installation", label: "Installation", icon: "↓" },
      { href: "/docs/usage", label: "Usage", icon: "◈" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/docs/theming", label: "Theming", icon: "◑" },
      { href: "/docs/compiler", label: "Compiler", icon: "⚙" },
      { href: "/docs/create-ui", label: "createUi", icon: "◎" },
      { href: "/docs/use-ui-config", label: "useUiConfig", icon: "◈" },
    ],
  },
  {
    title: "Reference",
    links: [
      { href: "/docs/components", label: "Component API", icon: "⬡" },
      { href: "/docs/architecture", label: "Architecture", icon: "⬢" },
      { href: "/tokens", label: "Token Explorer", icon: "◉" },
    ],
  },
];

interface SidebarNavProps {
  /** Controlled open state — driven by AppHeader's hamburger on mobile */
  open?: boolean;
  onClose?: () => void;
}

export function SidebarNav({ open = false, onClose }: SidebarNavProps) {
  const pathname = usePathname();

  const close = useCallback(() => onClose?.(), [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [close]);

  // Prevent body scroll when drawer is open on mobile
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className={`sidebar-overlay${open ? " open" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <nav
        className={`sidebar-nav${open ? " open" : ""}`}
        aria-label="Documentation navigation"
      >
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="sidebar-section">
            <p className="sidebar-section-title">{section.title}</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {section.links.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`sidebar-link${isActive ? " active" : ""}`}
                      onClick={close}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          opacity: 0.7,
                          width: 16,
                          textAlign: "center",
                          flexShrink: 0,
                        }}
                      >
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--color-border-2)",
          }}
        >
          <a
            href="https://github.com/stareezy-1/stareezy-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-link"
            aria-label="GitHub repository (opens in new tab)"
            onClick={close}
          >
            <span
              style={{
                fontSize: "0.8rem",
                opacity: 0.7,
                width: 16,
                textAlign: "center",
              }}
            >
              ↗
            </span>
            GitHub
          </a>
        </div>
      </nav>
    </>
  );
}
