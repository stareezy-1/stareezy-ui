import type { ReactNode } from "react";
import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/usage", label: "Usage" },
  { href: "/docs/components", label: "Component API" },
  { href: "/docs/theming", label: "Theming" },
  { href: "/docs/compiler", label: "Compiler" },
  { href: "/docs/migration", label: "Migration" },
  { href: "/docs/architecture", label: "Architecture" },
];

interface DocLayoutProps {
  children: ReactNode;
}

export default function DocLayout({ children }: DocLayoutProps) {
  return (
    <div className="doc-layout">
      <header className="site-header">
        <nav className="top-nav" aria-label="Site navigation">
          <Link href="/" className="site-logo" aria-label="Stareezy UI home">
            <span className="logo-text">Stareezy UI</span>
          </Link>
          <div className="top-nav-links">
            <Link href="/docs/installation">Docs</Link>
            <a
              href="https://github.com/stareezy-1/stareezy-ui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository (opens in new tab)"
            >
              GitHub
            </a>
          </div>
        </nav>
      </header>

      <div className="doc-body">
        <aside className="sidebar" aria-label="Documentation navigation">
          <nav>
            <ul className="sidebar-nav" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="sidebar-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="doc-content" id="main-content">
          {children}
        </main>
      </div>

      <footer className="site-footer">
        <p>
          &copy; {new Date().getFullYear()} Stareezy UI. Built with Next.js and
          MDX.
        </p>
      </footer>
    </div>
  );
}
