/**
 * analytics.ts — thin Sentry wrapper for the docs site.
 *
 * Tracks:
 *  - page_view        (fired by SentryPageTracker on every route change)
 *  - doc_section_view (which doc page was read)
 *  - nav_link_click   (header / sidebar link clicks)
 *  - theme_changed    (which theme the user switched to)
 *  - cta_click        (Get Started, Token Explorer, etc.)
 *  - code_copy        (copy-to-clipboard on code blocks)
 */
import * as Sentry from "@sentry/nextjs";

export type DocsAnalyticsEvent =
  | { name: "page_view"; path: string; title: string }
  | { name: "doc_section_view"; slug: string; title: string }
  | {
      name: "nav_link_click";
      label: string;
      href: string;
      location: "header" | "sidebar";
    }
  | { name: "theme_changed"; theme: string }
  | { name: "cta_click"; label: string; href: string }
  | { name: "code_copy"; snippet: string };

export function trackEvent(event: DocsAnalyticsEvent) {
  if (!process.env["NEXT_PUBLIC_SENTRY_DSN"]) return;

  const { name, ...data } = event;

  Sentry.addBreadcrumb({
    category: "analytics",
    message: name,
    data,
    level: "info",
  });

  Sentry.captureEvent({
    message: name,
    level: "info",
    tags: { event_name: name },
    extra: data,
  });
}
