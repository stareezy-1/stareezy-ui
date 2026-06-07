/**
 * Property tests for View.presets.ts
 *
 * Feature: portfolio-Quasify-ui-migration
 * Property 3: Enum completeness — EViewType
 * Validates: Requirements 2.1
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { EViewType } from "./View.types";
import { VIEW_PRESETS } from "./View.presets";

describe("VIEW_PRESETS", () => {
  // Feature: portfolio-Quasify-ui-migration, Property 3: Enum completeness
  it("has a defined entry for every EViewType value", () => {
    // Validates: Requirements 2.1
    fc.assert(
      fc.property(
        fc.constantFrom(...(Object.values(EViewType) as EViewType[])),
        (viewType) => {
          return VIEW_PRESETS[viewType] !== undefined;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("EViewType.Screen preset has flex:1 and a backgroundColor", () => {
    const preset = VIEW_PRESETS[EViewType.Screen];
    expect(preset.flex).toBe(1);
    expect(typeof preset.backgroundColor).toBe("string");
    expect((preset.backgroundColor as string).length).toBeGreaterThan(0);
  });

  it("EViewType.Container preset has maxWidth, width, and alignSelf", () => {
    const preset = VIEW_PRESETS[EViewType.Container];
    expect(preset.maxWidth).toBe(1200);
    expect(preset.width).toBe("100%");
    expect(preset.alignSelf).toBe("center");
  });

  it("EViewType.Row preset has flexDirection:row and alignItems:center", () => {
    const preset = VIEW_PRESETS[EViewType.Row];
    expect(preset.flexDirection).toBe("row");
    expect(preset.alignItems).toBe("center");
  });

  it("EViewType.Column preset has flexDirection:column", () => {
    const preset = VIEW_PRESETS[EViewType.Column];
    expect(preset.flexDirection).toBe("column");
  });
});
