/**
 * Next.js instrumentation hook — loads Sentry for server and edge runtimes.
 * https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
  if (process.env["NEXT_RUNTIME"] === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env["NEXT_RUNTIME"] === "edge") {
    await import("./sentry.edge.config");
  }
}
