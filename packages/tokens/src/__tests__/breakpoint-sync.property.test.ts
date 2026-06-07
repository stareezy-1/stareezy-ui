/**
 * @property-based-test
 *
 * Consolidated correctness validation suite — Property 2
 *
 * Property 2 — Breakpoint-sync invariant
 *   Runtime_Breakpoints after `createUi` equal the provided `media`, defaults
 *   merged. When no `media` is provided, the global channel is left untouched.
 *   Validates: Requirements 17.3
 */

import fc from "fast-check";
import { describe, it, beforeEach } from "vitest";
import { createUi } from "../createUi";

// ---------------------------------------------------------------------------
// Property 2 — Breakpoint-sync invariant
// Validates: Requirements 17.3
// ---------------------------------------------------------------------------

describe("Property 2 — Breakpoint-sync invariant", () => {
  beforeEach(() => {
    // Reset the global channel before each test so tests are independent
    (globalThis as Record<string, unknown>)["__Quasify_breakpoints__"] =
      undefined;
  });

  // Property 2a — All keys provided to createUi({ media }) are present in
  //               the global breakpoint channel after the call
  it("Runtime_Breakpoints after createUi include every key from the provided media config", () => {
    fc.assert(
      fc.property(
        fc.record({
          custom1: fc.integer({ min: 100, max: 400 }),
          custom2: fc.integer({ min: 401, max: 800 }),
        }),
        (media) => {
          // Reset channel before each run
          (globalThis as Record<string, unknown>)["__Quasify_breakpoints__"] =
            undefined;

          createUi({ media });

          const stored = (globalThis as Record<string, unknown>)[
            "__Quasify_breakpoints__"
          ] as Record<string, number> | undefined;

          if (!stored) return false;

          // All provided keys must be present with the correct value
          for (const [key, val] of Object.entries(media)) {
            if (stored[key] !== val) return false;
          }
          return true;
        },
      ),
      { numRuns: 100 },
    );
  });

  // Property 2b — The values stored in the global channel exactly match the
  //               values passed in (not approximate — exact equality)
  it("stored breakpoint values exactly equal the provided media values", () => {
    fc.assert(
      fc.property(
        // Use unique integers to avoid aliasing issues
        fc
          .tuple(
            fc.integer({ min: 50, max: 300 }),
            fc.integer({ min: 301, max: 600 }),
            fc.integer({ min: 601, max: 1200 }),
          )
          .map(([a, b, c]) => ({ tabletSm: a, tabletLg: b, desktop: c })),
        (media) => {
          (globalThis as Record<string, unknown>)["__Quasify_breakpoints__"] =
            undefined;

          createUi({ media });

          const stored = (globalThis as Record<string, unknown>)[
            "__Quasify_breakpoints__"
          ] as Record<string, number> | undefined;

          if (!stored) return false;

          return (
            stored["tabletSm"] === media.tabletSm &&
            stored["tabletLg"] === media.tabletLg &&
            stored["desktop"] === media.desktop
          );
        },
      ),
      { numRuns: 100 },
    );
  });

  // Property 2c — Built-in defaults are also present in the stored channel
  //               (media overrides are merged on top of defaults)
  it("default breakpoints are present alongside custom media keys", () => {
    fc.assert(
      fc.property(
        fc.record({
          widescreen: fc.integer({ min: 1600, max: 2400 }),
        }),
        (media) => {
          (globalThis as Record<string, unknown>)["__Quasify_breakpoints__"] =
            undefined;

          createUi({ media });

          const stored = (globalThis as Record<string, unknown>)[
            "__Quasify_breakpoints__"
          ] as Record<string, number> | undefined;

          if (!stored) return false;

          // Defaults (from createUi's DEFAULT_BREAKPOINTS) must still be present
          const defaultKeys = ["sm", "md", "lg", "xl", "2xl"];
          for (const key of defaultKeys) {
            if (!(key in stored)) return false;
          }

          // Custom key must also be present
          return stored["widescreen"] === media.widescreen;
        },
      ),
      { numRuns: 100 },
    );
  });

  // Property 2d — createUi without media leaves the global channel untouched
  it("createUi without media does not write to the global breakpoint channel", () => {
    fc.assert(
      fc.property(fc.constant(undefined as undefined), () => {
        // Start with no channel value
        (globalThis as Record<string, unknown>)["__Quasify_breakpoints__"] =
          undefined;

        createUi({});

        const stored = (globalThis as Record<string, unknown>)[
          "__Quasify_breakpoints__"
        ];
        // Channel must remain undefined — createUi({}) must not push defaults
        return stored === undefined;
      }),
      { numRuns: 100 },
    );
  });

  // Property 2e — createUi is idempotent w.r.t. the channel:
  //               calling it twice with the same media yields the same stored values
  it("calling createUi twice with the same media yields identical stored breakpoints", () => {
    fc.assert(
      fc.property(
        fc.record({
          narrow: fc.integer({ min: 300, max: 600 }),
          wide: fc.integer({ min: 601, max: 1200 }),
        }),
        (media) => {
          (globalThis as Record<string, unknown>)["__Quasify_breakpoints__"] =
            undefined;

          createUi({ media });
          const storedAfterFirst = {
            ...((globalThis as Record<string, unknown>)[
              "__Quasify_breakpoints__"
            ] as Record<string, number>),
          };

          createUi({ media });
          const storedAfterSecond = {
            ...((globalThis as Record<string, unknown>)[
              "__Quasify_breakpoints__"
            ] as Record<string, number>),
          };

          // All keys from the first call must match the second call
          for (const [key, val] of Object.entries(storedAfterFirst)) {
            if (storedAfterSecond[key] !== val) return false;
          }
          return true;
        },
      ),
      { numRuns: 100 },
    );
  });
});
