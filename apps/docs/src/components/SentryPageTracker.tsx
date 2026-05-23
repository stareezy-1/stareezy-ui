"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "../lib/analytics";

/**
 * Fires a `page_view` event on every client-side navigation.
 * Mount once inside RootShell (client component) — it's a no-op
 * when NEXT_PUBLIC_SENTRY_DSN is not set.
 */
export function SentryPageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent({
      name: "page_view",
      path: pathname,
      title: document.title,
    });
  }, [pathname]);

  return null;
}
