"use client";

import type { ReactNode } from "react";
import { SidebarNav } from "./SidebarNav";

interface DocsLayoutProps {
  children: ReactNode;
  sidebarOpen: boolean;
  onSidebarClose: () => void;
}

export function DocsLayout({
  children,
  sidebarOpen,
  onSidebarClose,
}: DocsLayoutProps) {
  return (
    <div className="layout">
      <SidebarNav open={sidebarOpen} onClose={onSidebarClose} />
      <main className="main-content" id="main-content">
        {children}
      </main>
    </div>
  );
}
