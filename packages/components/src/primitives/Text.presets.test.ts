/**
 * Property tests for ETextType presets in Text.tsx
 *
 * Feature: portfolio-stareezy-ui-migration
 * Property 3: Enum completeness — ETextType new values
 * Validates: Requirements 7.1, 7.16
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { ETextType, PRESETS } from "./Text";
import { colors } from "@stareezy-ui/tokens";

// New portfolio text role enum values added in Task 5
const NEW_TEXT_TYPES = [
  ETextType.Eyebrow,
  ETextType.HeroTitle,
  ETextType.HeroSubtitle,
  ETextType.StatNumber,
  ETextType.StatLabel,
  ETextType.BadgeText,
  ETextType.CardTitle,
  ETextType.CardDescription,
  ETextType.SectionHeading,
  ETextType.OrganizationLabel,
  ETextType.LocationText,
  ETextType.HighlightText,
  ETextType.NavLabel,
  ETextType.FooterText,
] as const;

describe("PRESETS — new portfolio ETextType values", () => {
  // Feature: portfolio-stareezy-ui-migration, Property 3: Enum completeness
  it("has a defined entry for every new ETextType value", () => {
    // Validates: Requirements 7.1, 7.16
    fc.assert(
      fc.property(fc.constantFrom(...NEW_TEXT_TYPES), (textType) => {
        return PRESETS[textType] !== undefined;
      }),
      { numRuns: 100 },
    );
  });

  it("ETextType.Eyebrow preset has correct fontSize, fontWeight, letterSpacing, and color", () => {
    const preset = PRESETS[ETextType.Eyebrow];
    expect(preset.fontSize).toBe(12);
    expect(preset.fontWeight).toBe("600");
    expect(preset.letterSpacing).toBe(2);
    expect(preset.color).toBe(colors.celurenBlue[400].value);
  });

  it("ETextType.HeroTitle preset has correct fontSize, fontWeight, lineHeight, letterSpacing, and color", () => {
    const preset = PRESETS[ETextType.HeroTitle];
    expect(preset.fontSize).toBe(56);
    expect(preset.fontWeight).toBe("800");
    expect(preset.lineHeight).toBe(64);
    expect(preset.letterSpacing).toBe(-1);
    expect(preset.color).toBe(colors.neutral[10].value);
  });

  it("ETextType.SectionHeading preset has correct fontSize, fontWeight, lineHeight, letterSpacing, and color", () => {
    const preset = PRESETS[ETextType.SectionHeading];
    expect(preset.fontSize).toBe(36);
    expect(preset.fontWeight).toBe("800");
    expect(preset.lineHeight).toBe(44);
    expect(preset.letterSpacing).toBe(-0.5);
    expect(preset.color).toBe(colors.neutral[10].value);
  });

  it("ETextType.StatNumber preset has correct fontSize, fontWeight, lineHeight, and color", () => {
    const preset = PRESETS[ETextType.StatNumber];
    expect(preset.fontSize).toBe(32);
    expect(preset.fontWeight).toBe("800");
    expect(preset.lineHeight).toBe(40);
    expect(preset.color).toBe(colors.neutral[10].value);
  });

  it("ETextType.CardTitle preset has correct fontSize, fontWeight, lineHeight, and color", () => {
    const preset = PRESETS[ETextType.CardTitle];
    expect(preset.fontSize).toBe(17);
    expect(preset.fontWeight).toBe("700");
    expect(preset.lineHeight).toBe(24);
    expect(preset.color).toBe(colors.neutral[10].value);
  });

  it("ETextType.OrganizationLabel preset uses celurenBlue[400] color", () => {
    const preset = PRESETS[ETextType.OrganizationLabel];
    expect(preset.color).toBe(colors.celurenBlue[400].value);
  });

  it("ETextType.StatLabel preset uses raisinBlack[200] color", () => {
    const preset = PRESETS[ETextType.StatLabel];
    expect(preset.color).toBe(colors.raisinBlack[200].value);
  });

  it("ETextType.CardDescription preset uses raisinBlack[100] color", () => {
    const preset = PRESETS[ETextType.CardDescription];
    expect(preset.color).toBe(colors.raisinBlack[100].value);
  });

  it("ETextType.Eyebrow preset does NOT include textTransform (must be applied via style prop)", () => {
    const preset = PRESETS[ETextType.Eyebrow];
    expect(
      (preset as unknown as Record<string, unknown>)["textTransform"],
    ).toBeUndefined();
  });

  it("all new presets have a fontFamily defined", () => {
    for (const textType of NEW_TEXT_TYPES) {
      const preset = PRESETS[textType];
      expect(typeof preset.fontFamily).toBe("string");
      expect(preset.fontFamily.length).toBeGreaterThan(0);
    }
  });
});
