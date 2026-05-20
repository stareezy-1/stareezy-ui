"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { DocsLayout } from "./DocsLayout";
import { PwaInstallBanner } from "./PwaInstallBanner";

interface RootShellProps {
  children: ReactNode;
}

function isDocsRoute(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/docs") ||
    pathname.startsWith("/tokens")
  );
}

export function RootShell({ children }: RootShellProps) {
  const pathname = usePathname();
  const docs = isDocsRoute(pathname);

  // Sidebar state lives here so AppHeader's hamburger and DocsLayout share it
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarToggle = useCallback(() => setSidebarOpen((v) => !v), []);
  const handleSidebarClose = useCallback(() => setSidebarOpen(false), []);

  return (
    <>
      <AppHeader
        onSidebarToggle={docs ? handleSidebarToggle : () => {}}
        sidebarOpen={docs ? sidebarOpen : false}
      />
      {docs ? (
        <DocsLayout
          sidebarOpen={sidebarOpen}
          onSidebarClose={handleSidebarClose}
        >
          {children}
        </DocsLayout>
      ) : (
        <div className="full-page">{children}</div>
      )}
      <PwaInstallBanner />
    </>
  );
}
