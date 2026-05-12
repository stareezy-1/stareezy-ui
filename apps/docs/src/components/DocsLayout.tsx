"use client";

/**
 * DocsLayout — wraps docs pages with the sidebar.
 * Manages the mobile sidebar open/close state driven by AppHeader's hamburger.
 * This is a client component so it can hold state.
 */

import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { SidebarNav } from "./SidebarNav";

interface DocsLayoutProps {
  children: ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClose = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="layout">
      <SidebarNav open={sidebarOpen} onClose={handleClose} />
      <main className="main-content" id="main-content">
        {children}
      </main>
    </div>
  );
}
