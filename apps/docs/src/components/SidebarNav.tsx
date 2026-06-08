"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "../lib/analytics";

const NAV_SECTIONS = [
  {
    title: "Getting Started",
    links: [
      { href: "/", label: "Introduction", icon: "◈" },
      { href: "/docs/quick-start", label: "Quick Start", icon: "▶" },
      { href: "/docs/installation", label: "Installation", icon: "↓" },
      { href: "/docs/compatibility", label: "Compatibility", icon: "✓" },
      { href: "/docs/cdn", label: "CDN Usage", icon: "↗" },
    ],
  },
  {
    title: "Playground",
    links: [{ href: "/playground", label: "UI Playground", icon: "⬡" }],
  },
  {
    title: "Integrations",
    links: [
      // { href: "/docs/mcp-server", label: "MCP Server", icon: "⚡" },
      { href: "/docs/claude-skills", label: "Skills for Claude", icon: "✦" },
    ],
  },
  {
    title: "CLI",
    links: [{ href: "/docs/cli", label: "CLI", icon: "▶" }],
  },
  {
    title: "Concepts",
    links: [
      { href: "/docs/usage", label: "Usage", icon: "◈" },
      { href: "/docs/theming", label: "Theming", icon: "◑" },
      { href: "/docs/responsive", label: "Responsive System", icon: "⊞" },
      { href: "/docs/create-ui", label: "createUi", icon: "◎" },
      { href: "/docs/szr-custom-config", label: "SzrCustomConfig", icon: "⬢" },
    ],
  },
  {
    title: "Styling",
    links: [
      { href: "/docs/box-layout-props", label: "BoxLayoutProps", icon: "⬡" },
      { href: "/docs/sx", label: "sx Prop", icon: "✦" },
      { href: "/docs/stylesheet", label: "Stylesheet", icon: "⊛" },
      { href: "/docs/compiler", label: "Compiler", icon: "⚙" },
      { href: "/docs/server", label: "Server Components", icon: "⬢" },
    ],
  },

  {
    title: "Components",
    links: [
      { href: "/docs/components", label: "All Components", icon: "⬡" },
      { href: "/docs/components/breadcrumb", label: "Breadcrumb", icon: "◂" },
      { href: "/docs/components/drawer", label: "Drawer", icon: "⬜" },
      { href: "/docs/components/pagination", label: "Pagination", icon: "◁▷" },
      { href: "/docs/components/table", label: "Table", icon: "⊞" },
      { href: "/docs/components/tag", label: "Tag", icon: "◈" },
      { href: "/docs/components/tooltip", label: "Tooltip", icon: "⬦" },
    ],
  },
  {
    title: "Tokens",
    links: [
      { href: "/tokens", label: "Token Explorer", icon: "◉" },
      { href: "/tokens/builder", label: "Theme Builder", icon: "✦" },
      { href: "/tokens/aurora", label: "Aurora", icon: "◉" },
      { href: "/tokens/steins-gate", label: "Steins;Gate", icon: "⌬" },
      { href: "/tokens/quasar", label: "Quasar", icon: "⊛" },
    ],
  },
  {
    title: "Reference",
    links: [
      { href: "/docs/api", label: "API Reference", icon: "◉" },
      { href: "/docs/architecture", label: "Architecture", icon: "⬢" },
      { href: "/docs/use-ui-config", label: "useUiConfig", icon: "◈" },
      { href: "/docs/about", label: "About", icon: "◎" },
      { href: "/docs/thanks", label: "Special Thanks", icon: "✦" },
    ],
  },
];

interface SidebarNavProps {
  open?: boolean;
  onClose?: () => void;
}

export function SidebarNav({ open = false, onClose }: SidebarNavProps) {
  const pathname = usePathname();

  const close = useCallback(() => onClose?.(), [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`sidebar-overlay${open ? " open" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

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
                      onClick={() => {
                        trackEvent({
                          name: "nav_link_click",
                          label: link.label,
                          href: link.href,
                          location: "sidebar",
                        });
                        close();
                      }}
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
