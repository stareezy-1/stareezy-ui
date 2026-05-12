"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Storybook is deployed separately — update this after deploying to Vercel
const STORYBOOK_URL =
  process.env["NEXT_PUBLIC_STORYBOOK_URL"] ??
  "https://stareezy-ui-storybook.vercel.app/";

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

// export function AppHeader() {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="app-header" role="banner">
//       {/* Logo */}
//       <Link href="/" className="app-header-logo" aria-label="Stareezy UI home">
//         <div className="app-header-logo-icon" aria-hidden="true">
//           S
//         </div>
//         <span className="app-header-logo-text">Stareezy UI</span>
//         <span className="app-header-version">v0.0.1</span>
//       </Link>

//       {/* Section tabs — desktop */}
//       <nav className="app-header-tabs" aria-label="Main navigation">
//         {SECTIONS.map((s) => {
//           const active = s.match(pathname);
//           if (s.external) {
//             return (
//               <a
//                 key={s.href}
//                 href={s.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="app-header-tab"
//                 aria-label={`${s.label} (opens in new tab)`}
//               >
//                 <span className="app-header-tab-icon" aria-hidden="true">
//                   {s.icon}
//                 </span>
//                 <span className="app-header-tab-label">{s.label}</span>
//                 <span
//                   style={{ fontSize: "0.65rem", opacity: 0.6, marginLeft: 2 }}
//                 >
//                   ↗
//                 </span>
//               </a>
//             );
//           }
//           return (
//             <Link
//               key={s.href}
//               href={s.href}
//               className={`app-header-tab${active ? " active" : ""}`}
//               aria-current={active ? "page" : undefined}
//             >
//               <span className="app-header-tab-icon" aria-hidden="true">
//                 {s.icon}
//               </span>
//               <span className="app-header-tab-label">{s.label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Right actions */}
//       <div className="app-header-actions">
//         <a
//           href="https://github.com/stareezy-1/stareezy-ui"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="app-header-action-btn"
//           aria-label="GitHub repository (opens in new tab)"
//         >
//           <span aria-hidden="true">↗</span>
//           <span className="app-header-action-label">GitHub</span>
//         </a>

//         {/* Mobile hamburger */}
//         <button
//           className="app-header-mobile-toggle"
//           onClick={() => setMobileMenuOpen((v) => !v)}
//           aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
//           aria-expanded={mobileMenuOpen}
//         >
//           {mobileMenuOpen ? "✕" : "☰"}
//         </button>
//       </div>

//       {/* Mobile dropdown */}
//       {mobileMenuOpen && (
//         <div
//           className="app-header-mobile-menu"
//           role="navigation"
//           aria-label="Mobile navigation"
//         >
//           {SECTIONS.map((s) => {
//             const active = s.match(pathname);
//             if (s.external) {
//               return (
//                 <a
//                   key={s.href}
//                   href={s.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="app-header-mobile-link"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   <span aria-hidden="true">{s.icon}</span>
//                   {s.label} ↗
//                 </a>
//               );
//             }
//             return (
//               <Link
//                 key={s.href}
//                 href={s.href}
//                 className={`app-header-mobile-link${active ? " active" : ""}`}
//                 onClick={() => setMobileMenuOpen(false)}
//                 aria-current={active ? "page" : undefined}
//               >
//                 <span aria-hidden="true">{s.icon}</span>
//                 {s.label}
//               </Link>
//             );
//           })}
//         </div>
//       )}
//     </header>
//   );
// }

export function AppHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="app-header" role="banner">
      {/* Logo */}
      <Link href="/" className="app-header-logo" aria-label="Stareezy UI home">
        <div className="app-header-logo-icon" aria-hidden="true">
          S
        </div>
        <span className="app-header-logo-text">Stareezy UI</span>
        <span className="app-header-version">v0.0.1</span>
      </Link>

      {/* Section tabs — desktop */}
      <nav className="app-header-tabs" aria-label="Main navigation">
        {SECTIONS.map((s) => {
          const active = s.match(pathname);
          return (
            <Link
              key={s.href}
              href={s.href}
              className={`app-header-tab${active ? " active" : ""}`}
              aria-current={active ? "page" : undefined}
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

        {/* Mobile hamburger */}
        <button
          className="app-header-mobile-toggle"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div
          className="app-header-mobile-menu"
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
