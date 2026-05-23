/**
 * Sentry edge runtime initialisation (middleware, edge routes).
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
    tracesSampleRate: process.env["NODE_ENV"] === "production" ? 0.1 : 1.0,
  });
}
