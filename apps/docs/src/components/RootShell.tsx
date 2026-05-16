"use client";

/**
 * RootShell — client component that decides which layout to render.
 * - Docs routes (/  /docs/*  /tokens): AppHeader + sidebar + main
 * - Full-page routes (/playground  /storybook): AppHeader only, no sidebar
 */

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

  return (
    <>
      <AppHeader />
      {docs ? (
        <DocsLayout>{children}</DocsLayout>
      ) : (
        <div className="full-page">{children}</div>
      )}
      <PwaInstallBanner />
    </>
  );
}
