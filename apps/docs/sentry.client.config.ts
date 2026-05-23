/**
 * Sentry client-side initialisation.
 * Runs in the browser only — imported automatically by Next.js via
 * the instrumentation hook when NEXT_PUBLIC_SENTRY_DSN is set.
 */
import * as Sentry from "@sentry/nextjs";

const dsn = process.env["NEXT_PUBLIC_SENTRY_DSN"];
if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env["NODE_ENV"],
    ...(process.env["NEXT_PUBLIC_APP_VERSION"] && {
      release: process.env["NEXT_PUBLIC_APP_VERSION"],
    }),

    // 10 % of transactions in production, 100 % in dev
    tracesSampleRate: process.env["NODE_ENV"] === "production" ? 0.1 : 1.0,

    // Session replay: 5 % of sessions, 100 % on error
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,

    integrations: [
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: true,
      }),
    ],
  });
}
