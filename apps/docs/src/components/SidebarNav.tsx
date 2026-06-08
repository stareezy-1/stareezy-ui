"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "../lib/analytics";

// ── nav tree definition ───────────────────────────────────────────────────────

interface NavLeaf {
  kind?: "leaf";
  href: string;
  label: string;
  icon: string;
  badge?: string; // e.g. "New"
}

interface NavGroup {
  kind: "group";
  label: string;
  icon: string;
  /** default open on first render */
  defaultOpen?: boolean;
  children: NavLeaf[];
}

type NavItem = NavLeaf | NavGroup;

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV: NavSection[] = [
  // ── 1. Overview ─────────────────────────────────────────────────────────────
  {
    title: "Overview",
    items: [
      { href: "/", label: "Introduction", icon: "◈" },
      { href: "/docs/quick-start", label: "Quick Start", icon: "▶" },
      { href: "/docs/installation", label: "Installation", icon: "↓" },
      { href: "/docs/compatibility", label: "Compatibility", icon: "✓" },
      { href: "/docs/cdn", label: "CDN Usage", icon: "↗" },
    ],
  },

  // ── 2. Tools ─────────────────────────────────────────────────────────────────
  {
    title: "Tools",
    items: [
      { href: "/playground", label: "UI Playground", icon: "⬡" },
      {
        kind: "group",
        label: "Nova Builder",
        icon: "✦",
        defaultOpen: true,
        children: [
          { href: "/nova", label: "Open Nova", icon: "◎", badge: "New" },
        ],
      },
    ],
  },

  // ── 3. AI & Integrations ─────────────────────────────────────────────────────
  {
    title: "AI & Integrations",
    items: [
      {
        kind: "group",
        label: "AI Tooling",
        icon: "⚡",
        defaultOpen: true,
        children: [
          { href: "/docs/mcp-server", label: "MCP Server", icon: "⚡" },
          {
            href: "/docs/claude-skills",
            label: "Skills for Claude",
            icon: "✦",
          },
        ],
      },
      { href: "/docs/cli", label: "CLI", icon: "▶" },
    ],
  },

  // ── 4. Concepts ───────────────────────────────────────────────────────────────
  {
    title: "Concepts",
    items: [
      { href: "/docs/usage", label: "Usage", icon: "◈" },
      { href: "/docs/theming", label: "Theming", icon: "◑" },
      {
        kind: "group",
        label: "Token System",
        icon: "◉",
        defaultOpen: false,
        children: [
          { href: "/docs/create-ui", label: "createUi", icon: "◎" },
          {
            href: "/docs/szr-custom-config",
            label: "SzrCustomConfig",
            icon: "⬢",
          },
          { href: "/docs/use-ui-config", label: "useUiConfig", icon: "◈" },
        ],
      },
      {
        kind: "group",
        label: "Layout & Styling",
        icon: "⬡",
        defaultOpen: false,
        children: [
          { href: "/docs/responsive", label: "Responsive System", icon: "⊞" },
          {
            href: "/docs/box-layout-props",
            label: "BoxLayoutProps",
            icon: "⬡",
          },
          { href: "/docs/sx", label: "sx Prop", icon: "✦" },
          { href: "/docs/stylesheet", label: "Stylesheet", icon: "⊛" },
          { href: "/docs/server", label: "Server Components", icon: "⬢" },
        ],
      },
      { href: "/docs/compiler", label: "Compiler", icon: "⚙" },
    ],
  },

  // ── 5. Components ─────────────────────────────────────────────────────────────
  {
    title: "Components",
    items: [
      { href: "/docs/components", label: "All Components", icon: "⬡" },
      {
        kind: "group",
        label: "Navigation",
        icon: "◂",
        defaultOpen: false,
        children: [
          {
            href: "/docs/components/breadcrumb",
            label: "Breadcrumb",
            icon: "◂",
          },
          {
            href: "/docs/components/pagination",
            label: "Pagination",
            icon: "◁▷",
          },
          { href: "/docs/components/tooltip", label: "Tooltip", icon: "⬦" },
        ],
      },
      {
        kind: "group",
        label: "Overlay",
        icon: "⬜",
        defaultOpen: false,
        children: [
          { href: "/docs/components/drawer", label: "Drawer", icon: "⬜" },
        ],
      },
      {
        kind: "group",
        label: "Data Display",
        icon: "⊞",
        defaultOpen: false,
        children: [
          { href: "/docs/components/table", label: "Table", icon: "⊞" },
          { href: "/docs/components/tag", label: "Tag", icon: "◈" },
        ],
      },
    ],
  },

  // ── 6. Design Tokens ─────────────────────────────────────────────────────────
  {
    title: "Design Tokens",
    items: [
      { href: "/tokens", label: "Token Explorer", icon: "◉" },
      { href: "/tokens/builder", label: "Theme Builder", icon: "✦" },
      {
        kind: "group",
        label: "Themes",
        icon: "◑",
        defaultOpen: false,
        children: [
          { href: "/tokens/aurora", label: "Aurora", icon: "◉" },
          { href: "/tokens/quasar", label: "Quasar", icon: "⊛" },
          { href: "/tokens/steins-gate", label: "Steins;Gate", icon: "⌬" },
          { href: "/tokens/glow", label: "Glow", icon: "✦" },
          { href: "/tokens/motion", label: "Motion", icon: "◎" },
        ],
      },
    ],
  },

  // ── 7. Reference ─────────────────────────────────────────────────────────────
  {
    title: "Reference",
    items: [
      { href: "/docs/api", label: "API Reference", icon: "◉" },
      { href: "/docs/architecture", label: "Architecture", icon: "⬢" },
      {
        kind: "group",
        label: "About",
        icon: "◎",
        defaultOpen: false,
        children: [
          { href: "/docs/about", label: "About", icon: "◎" },
          { href: "/docs/thanks", label: "Special Thanks", icon: "✦" },
        ],
      },
    ],
  },
];

// ── helpers ───────────────────────────────────────────────────────────────────

function isLeaf(item: NavItem): item is NavLeaf {
  return !("kind" in item) || item.kind === "leaf";
}

function groupContainsActive(group: NavGroup, pathname: string): boolean {
  return group.children.some((c) =>
    c.href === "/" ? pathname === "/" : pathname.startsWith(c.href),
  );
}

// ── sub-components ────────────────────────────────────────────────────────────

function LeafLink({
  leaf,
  depth = 0,
  pathname,
  onClose,
}: {
  leaf: NavLeaf;
  depth?: number;
  pathname: string;
  onClose: () => void;
}) {
  const isActive =
    leaf.href === "/" ? pathname === "/" : pathname.startsWith(leaf.href);

  return (
    <li>
      <Link
        href={leaf.href}
        className={`sidebar-link${isActive ? " active" : ""}`}
        style={
          depth > 0
            ? { paddingLeft: `calc(0.75rem + ${depth * 1.1}rem)` }
            : undefined
        }
        onClick={() => {
          trackEvent({
            name: "nav_link_click",
            label: leaf.label,
            href: leaf.href,
            location: "sidebar",
          });
          onClose();
        }}
      >
        <span
          style={{
            fontSize: "0.8rem",
            opacity: 0.65,
            width: 16,
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {leaf.icon}
        </span>
        <span style={{ flex: 1 }}>{leaf.label}</span>
        {leaf.badge && (
          <span
            style={{
              fontSize: "0.55rem",
              fontWeight: 700,
              padding: "1px 5px",
              borderRadius: 9999,
              background: "var(--brand-500)",
              color: "#fff",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              lineHeight: 1.6,
              flexShrink: 0,
            }}
          >
            {leaf.badge}
          </span>
        )}
      </Link>
    </li>
  );
}

function GroupItem({
  group,
  pathname,
  onClose,
}: {
  group: NavGroup;
  pathname: string;
  onClose: () => void;
}) {
  const hasActive = groupContainsActive(group, pathname);
  const [open, setOpen] = useState(group.defaultOpen ?? hasActive);

  // Auto-open when a child becomes active (e.g. navigating directly to a URL)
  useEffect(() => {
    if (hasActive) setOpen(true);
  }, [hasActive]);

  return (
    <li>
      {/* Group toggle button */}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          width: "100%",
          padding: "0.45rem 0.75rem",
          borderRadius: "var(--radius-sm)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: hasActive ? "var(--brand-500)" : "var(--color-text-2)",
          fontSize: "0.875rem",
          fontWeight: hasActive ? 600 : 450,
          textAlign: "left",
          transition: "all 0.15s",
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "var(--brand-50)";
          (e.currentTarget as HTMLButtonElement).style.color =
            "var(--brand-500)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = hasActive
            ? "var(--brand-500)"
            : "var(--color-text-2)";
        }}
      >
        <span
          style={{
            fontSize: "0.8rem",
            opacity: 0.65,
            width: 16,
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {group.icon}
        </span>
        <span style={{ flex: 1 }}>{group.label}</span>
        {/* Chevron */}
        <span
          style={{
            fontSize: "0.55rem",
            opacity: 0.5,
            transition: "transform 0.2s",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            display: "inline-block",
            marginRight: 2,
          }}
        >
          ▶
        </span>
      </button>

      {/* Collapsible children */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? `${group.children.length * 3}rem` : 0,
          transition: "max-height 0.22s ease",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            borderLeft: "1px solid var(--color-border-2)",
            marginLeft: "1.25rem",
          }}
        >
          {group.children.map((child) => (
            <LeafLink
              key={child.href}
              leaf={child}
              depth={1}
              pathname={pathname}
              onClose={onClose}
            />
          ))}
        </ul>
      </div>
    </li>
  );
}

// ── main component ────────────────────────────────────────────────────────────

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
        {/* ── Sections ─────────────────────────────────────────────────── */}
        {NAV.map((section) => (
          <div key={section.title} className="sidebar-section">
            <p className="sidebar-section-title">{section.title}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {section.items.map((item) =>
                isLeaf(item) ? (
                  <LeafLink
                    key={item.href}
                    leaf={item}
                    pathname={pathname}
                    onClose={close}
                  />
                ) : (
                  <GroupItem
                    key={item.label}
                    group={item}
                    pathname={pathname}
                    onClose={close}
                  />
                ),
              )}
            </ul>
          </div>
        ))}

        {/* ── Footer: GitHub link ───────────────────────────────────────── */}
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
                opacity: 0.65,
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
