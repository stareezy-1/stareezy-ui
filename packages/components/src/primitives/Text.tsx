/**
 * Text — foundational text primitive for Stareezy UI.
 *
 * Fixed lineHeight bug: web now uses unitless ratio (e.g. 1.5) instead of
 * pixel strings, which caused collapsed/broken line heights.
 * Extended with Inter / Plus Jakarta Sans font families from updated tokens.
 */

import React from "react";
import { colors, spacing, typography } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import type { StyleProp } from "./Box";
import { isWeb } from "../shared/platform";
import { flattenStyle } from "../shared/flattenStyle";

// ---------------------------------------------------------------------------
// ETextType
// ---------------------------------------------------------------------------

export enum ETextType {
  button = "button",
  label = "label",
  // Display
  LDisplay = "L-display",
  MDisplay = "M-display",
  SDisplay = "S-display",
  // Label
  XLLabel = "XL-label",
  LLabel = "L-label",
  MLabel = "M-label",
  SLabel = "S-label",
  XSLabel = "XS-label",
  // XXL Heading
  XXLHeadingBold = "XXL-heading-bold",
  XXLHeadingSemiBold = "XXL-heading-semi-bold",
  // XL Heading
  XLHeadingBold = "XL-heading-bold",
  XLHeadingSemiBold = "XL-heading-semi-bold",
  // L Heading
  LHeadingBold = "L-heading-bold",
  LHeadingSemiBold = "L-heading-semi-bold",
  // M Heading
  MHeadingBold = "M-heading-bold",
  MHeadingSemiBold = "M-heading-semi-bold",
  // S Heading
  SHeadingBold = "S-heading-bold",
  SHeadingSemiBold = "S-heading-semi-bold",
  // XS Heading
  XSHeadingBold = "XS-heading-bold",
  XSHeadingSemiBold = "XS-heading-semi-bold",
  // XXS Heading
  XXSHeadingBold = "XxS-heading-bold",
  XXSHeadingSemiBold = "XxS-heading-semi-bold",
  // XXL Paragraph
  XXLParagraphBold = "XXL-paragraph-bold",
  XXLParagraphSemiBold = "XXL-paragraph-semi-bold",
  XXLParagraphMedium = "XXL-paragraph-medium",
  XXLParagraphRegular = "XXL-paragraph-regular",
  // XL Paragraph
  XLParagraphBold = "XL-paragraph-bold",
  XLParagraphSemiBold = "XL-paragraph-semi-bold",
  XLParagraphMedium = "XL-paragraph-medium",
  XLParagraphRegular = "XL-paragraph-regular",
  // L Paragraph
  LParagraphBold = "L-paragraph-bold",
  LParagraphSemiBold = "L-paragraph-semi-bold",
  LParagraphMedium = "L-paragraph-medium",
  LParagraphRegular = "L-paragraph-regular",
  // M Paragraph
  MParagraphBold = "M-paragraph-bold",
  MParagraphSemiBold = "M-paragraph-semi-bold",
  MParagraphMedium = "M-paragraph-medium",
  MParagraphRegular = "M-paragraph-regular",
  // S Paragraph
  SParagraphBold = "S-paragraph-bold",
  SParagraphSemiBold = "S-paragraph-semi-bold",
  SParagraphMedium = "S-paragraph-medium",
  SParagraphRegular = "S-paragraph-regular",
  // XS Paragraph
  XSParagraphBold = "XS-paragraph-bold",
  XSParagraphSemiBold = "XS-paragraph-semi-bold",
  XSParagraphMedium = "XS-paragraph-medium",
  XSParagraphRegular = "XS-paragraph-regular",
  // Portfolio text roles
  Eyebrow = "eyebrow",
  HeroTitle = "hero-title",
  HeroSubtitle = "hero-subtitle",
  StatNumber = "stat-number",
  StatLabel = "stat-label",
  BadgeText = "badge-text",
  CardTitle = "card-title",
  CardDescription = "card-description",
  SectionHeading = "section-heading",
  OrganizationLabel = "organization-label",
  LocationText = "location-text",
  HighlightText = "highlight-text",
  NavLabel = "nav-label",
  FooterText = "footer-text",
}

export enum EFontStyle {
  ITALIC = "italic",
  UNDERLINE = "underline",
  ITALIC_UNDERLINE = "italic-underline",
}

// ---------------------------------------------------------------------------
// Style presets
// lineHeight is stored as a RATIO (unitless) — works correctly on both web
// and React Native. Previously pixel values caused web lineHeight bugs.
// ---------------------------------------------------------------------------

interface TextStylePreset {
  fontFamily: string;
  fontSize: number;
  fontWeight?: string;
  /** Unitless ratio — e.g. 1.5 means 1.5× the fontSize */
  lineHeight?: number;
  letterSpacing?: number;
  color?: string;
  textAlign?: string;
}

const DEFAULT_COLOR = colors.raisinBlack[800].value;
const LS_TIGHT = -0.02;

// Inter as the default body font, Plus Jakarta Sans for display/headings
const BODY = typography.fontFamily.interRegular.value;
const BODY_MEDIUM = typography.fontFamily.interMedium.value;
const BODY_SEMIBOLD = typography.fontFamily.interSemiBold.value;
const BODY_BOLD = typography.fontFamily.interBold.value;
const DISPLAY = typography.fontFamily.jakartaBold.value;
const DISPLAY_SEMIBOLD = typography.fontFamily.jakartaSemiBold.value;
const DISPLAY_BLACK = typography.fontFamily.jakartaBlack.value;

export const PRESETS: Record<ETextType, TextStylePreset> = {
  [ETextType.button]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 1.4,
    letterSpacing: 0.01,
    color: colors.neutral[10].value,
    textAlign: "center",
  },
  [ETextType.label]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: spacing[14].value,
    fontWeight: "600",
    lineHeight: 1.43,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  // Display
  [ETextType.LDisplay]: {
    fontFamily: DISPLAY_BLACK,
    fontSize: 72,
    fontWeight: "800",
    lineHeight: 1.1,
    letterSpacing: -0.04,
    color: DEFAULT_COLOR,
  },
  [ETextType.MDisplay]: {
    fontFamily: DISPLAY_BLACK,
    fontSize: 60,
    fontWeight: "800",
    lineHeight: 1.1,
    letterSpacing: -0.03,
    color: DEFAULT_COLOR,
  },
  [ETextType.SDisplay]: {
    fontFamily: DISPLAY_BLACK,
    fontSize: 48,
    fontWeight: "800",
    lineHeight: 1.15,
    letterSpacing: -0.02,
    color: DEFAULT_COLOR,
  },
  // Labels
  [ETextType.XLLabel]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 1.4,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.LLabel]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 1.44,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.MLabel]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.SLabel]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 1.57,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.XSLabel]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 1.33,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  // XXL Headings
  [ETextType.XXLHeadingBold]: {
    fontFamily: DISPLAY,
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 1.2,
    letterSpacing: -0.03,
    color: DEFAULT_COLOR,
  },
  [ETextType.XXLHeadingSemiBold]: {
    fontFamily: DISPLAY_SEMIBOLD,
    fontSize: 40,
    fontWeight: "600",
    lineHeight: 1.2,
    letterSpacing: -0.03,
    color: DEFAULT_COLOR,
  },
  // XL Headings
  [ETextType.XLHeadingBold]: {
    fontFamily: DISPLAY,
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 1.22,
    letterSpacing: -0.025,
    color: DEFAULT_COLOR,
  },
  [ETextType.XLHeadingSemiBold]: {
    fontFamily: DISPLAY_SEMIBOLD,
    fontSize: 36,
    fontWeight: "600",
    lineHeight: 1.22,
    letterSpacing: -0.025,
    color: DEFAULT_COLOR,
  },
  // L Headings
  [ETextType.LHeadingBold]: {
    fontFamily: DISPLAY,
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 1.25,
    letterSpacing: -0.02,
    color: DEFAULT_COLOR,
  },
  [ETextType.LHeadingSemiBold]: {
    fontFamily: DISPLAY_SEMIBOLD,
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 1.25,
    letterSpacing: -0.02,
    color: DEFAULT_COLOR,
  },
  // M Headings
  [ETextType.MHeadingBold]: {
    fontFamily: DISPLAY,
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 1.29,
    letterSpacing: -0.015,
    color: DEFAULT_COLOR,
  },
  [ETextType.MHeadingSemiBold]: {
    fontFamily: DISPLAY_SEMIBOLD,
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 1.29,
    letterSpacing: -0.015,
    color: DEFAULT_COLOR,
  },
  // S Headings
  [ETextType.SHeadingBold]: {
    fontFamily: DISPLAY,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 1.33,
    letterSpacing: -0.01,
    color: DEFAULT_COLOR,
  },
  [ETextType.SHeadingSemiBold]: {
    fontFamily: DISPLAY_SEMIBOLD,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 1.33,
    letterSpacing: -0.01,
    color: DEFAULT_COLOR,
  },
  // XS Headings
  [ETextType.XSHeadingBold]: {
    fontFamily: DISPLAY,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 1.4,
    letterSpacing: -0.01,
    color: DEFAULT_COLOR,
  },
  [ETextType.XSHeadingSemiBold]: {
    fontFamily: DISPLAY_SEMIBOLD,
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 1.4,
    letterSpacing: -0.01,
    color: DEFAULT_COLOR,
  },
  // XXS Headings
  [ETextType.XXSHeadingBold]: {
    fontFamily: DISPLAY,
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 1.44,
    letterSpacing: -0.005,
    color: DEFAULT_COLOR,
  },
  [ETextType.XXSHeadingSemiBold]: {
    fontFamily: DISPLAY_SEMIBOLD,
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 1.44,
    letterSpacing: -0.005,
    color: DEFAULT_COLOR,
  },
  // XXL Paragraphs
  [ETextType.XXLParagraphBold]: {
    fontFamily: BODY_BOLD,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.XXLParagraphSemiBold]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.XXLParagraphMedium]: {
    fontFamily: BODY_MEDIUM,
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.XXLParagraphRegular]: {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  // XL Paragraphs
  [ETextType.XLParagraphBold]: {
    fontFamily: BODY_BOLD,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.XLParagraphSemiBold]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.XLParagraphMedium]: {
    fontFamily: BODY_MEDIUM,
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.XLParagraphRegular]: {
    fontFamily: BODY,
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  // L Paragraphs
  [ETextType.LParagraphBold]: {
    fontFamily: BODY_BOLD,
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 1.56,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.LParagraphSemiBold]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 1.56,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.LParagraphMedium]: {
    fontFamily: BODY_MEDIUM,
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 1.56,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.LParagraphRegular]: {
    fontFamily: BODY,
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 1.56,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  // M Paragraphs
  [ETextType.MParagraphBold]: {
    fontFamily: BODY_BOLD,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.MParagraphSemiBold]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.MParagraphMedium]: {
    fontFamily: BODY_MEDIUM,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.MParagraphRegular]: {
    fontFamily: BODY,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  // S Paragraphs
  [ETextType.SParagraphBold]: {
    fontFamily: BODY_BOLD,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 1.57,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.SParagraphSemiBold]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 1.57,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.SParagraphMedium]: {
    fontFamily: BODY_MEDIUM,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 1.57,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.SParagraphRegular]: {
    fontFamily: BODY,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 1.57,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  // XS Paragraphs
  [ETextType.XSParagraphBold]: {
    fontFamily: BODY_BOLD,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.XSParagraphSemiBold]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.XSParagraphMedium]: {
    fontFamily: BODY_MEDIUM,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  [ETextType.XSParagraphRegular]: {
    fontFamily: BODY,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 1.5,
    letterSpacing: LS_TIGHT,
    color: DEFAULT_COLOR,
  },
  // Portfolio roles
  [ETextType.Eyebrow]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 1.45,
    letterSpacing: 0.08,
    color: colors.celurenBlue[400].value,
  },
  [ETextType.HeroTitle]: {
    fontFamily: DISPLAY_BLACK,
    fontSize: 56,
    fontWeight: "800",
    lineHeight: 1.07,
    letterSpacing: -0.03,
    color: colors.neutral[10].value,
  },
  [ETextType.HeroSubtitle]: {
    fontFamily: BODY_MEDIUM,
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 1.5,
    letterSpacing: -0.01,
    color: DEFAULT_COLOR,
  },
  [ETextType.StatNumber]: {
    fontFamily: DISPLAY_BLACK,
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 1.25,
    letterSpacing: -0.02,
    color: colors.neutral[10].value,
  },
  [ETextType.StatLabel]: {
    fontFamily: BODY,
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 1.54,
    color: colors.raisinBlack[200].value,
  },
  [ETextType.BadgeText]: {
    fontFamily: BODY_MEDIUM,
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 1.45,
    letterSpacing: 0.02,
    color: DEFAULT_COLOR,
  },
  [ETextType.CardTitle]: {
    fontFamily: DISPLAY_SEMIBOLD,
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 1.41,
    letterSpacing: -0.01,
    color: colors.neutral[10].value,
  },
  [ETextType.CardDescription]: {
    fontFamily: BODY,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 1.57,
    color: colors.raisinBlack[100].value,
  },
  [ETextType.SectionHeading]: {
    fontFamily: DISPLAY_BLACK,
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 1.22,
    letterSpacing: -0.025,
    color: colors.neutral[10].value,
  },
  [ETextType.OrganizationLabel]: {
    fontFamily: BODY_SEMIBOLD,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 1.57,
    color: colors.celurenBlue[400].value,
  },
  [ETextType.LocationText]: {
    fontFamily: BODY,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 1.5,
    color: colors.raisinBlack[200].value,
  },
  [ETextType.HighlightText]: {
    fontFamily: BODY_MEDIUM,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 1.54,
    color: colors.raisinBlack[100].value,
  },
  [ETextType.NavLabel]: {
    fontFamily: BODY_MEDIUM,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 1.43,
    color: DEFAULT_COLOR,
  },
  [ETextType.FooterText]: {
    fontFamily: BODY,
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 1.54,
    color: colors.raisinBlack[200].value,
  },
};

const DEFAULT_PRESET: TextStylePreset = {
  fontFamily: BODY,
  fontSize: 14,
  fontWeight: "400",
  lineHeight: 1.5,
  color: DEFAULT_COLOR,
};

// ---------------------------------------------------------------------------
// TextProps
// ---------------------------------------------------------------------------

export interface TextProps {
  text?: string;
  emptyState?: string;
  type?: ETextType | undefined;
  fontStyle?: EFontStyle;
  /** @deprecated use fontStyle */
  fontStyles?: EFontStyle;
  color?: string;
  children?: React.ReactNode;
  style?: StyleProp;
  testID?: string;
  accessibilityLabel?: string;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  className?: string;
}

// ---------------------------------------------------------------------------
// Text component
// ---------------------------------------------------------------------------

export const Text: React.FC<TextProps> = (props) => {
  const {
    text = "",
    emptyState = "",
    type,
    fontStyle,
    fontStyles,
    color: colorOverride,
    children,
    style,
    testID,
    accessibilityLabel,
    numberOfLines,
    ellipsizeMode,
    className,
  } = props;

  const themed = useThemedColors();
  const resolvedColor = colorOverride ?? themed.textPrimary;

  let content: React.ReactNode = text || children;
  if (typeof content === "string" && content === "" && emptyState !== "") {
    content = emptyState;
  }

  const preset = type ? PRESETS[type] ?? DEFAULT_PRESET : DEFAULT_PRESET;

  const activeFontStyle = fontStyle ?? fontStyles;
  const isItalic =
    activeFontStyle === EFontStyle.ITALIC ||
    activeFontStyle === EFontStyle.ITALIC_UNDERLINE;
  const isUnderline =
    activeFontStyle === EFontStyle.UNDERLINE ||
    activeFontStyle === EFontStyle.ITALIC_UNDERLINE;

  if (isWeb) {
    // On web: lineHeight is unitless ratio — no "px" suffix needed.
    // This is the correct CSS behavior and fixes the lineHeight bug.
    const webStyle: React.CSSProperties = {
      fontFamily: preset.fontFamily,
      fontSize: preset.fontSize,
      ...(preset.fontWeight
        ? { fontWeight: preset.fontWeight as React.CSSProperties["fontWeight"] }
        : {}),
      // Use unitless lineHeight ratio — avoids the pixel-based lineHeight bug
      ...(preset.lineHeight !== undefined
        ? { lineHeight: preset.lineHeight }
        : {}),
      ...(preset.letterSpacing !== undefined
        ? { letterSpacing: `${preset.letterSpacing}em` }
        : {}),
      color: resolvedColor,
      ...(preset.textAlign
        ? { textAlign: preset.textAlign as React.CSSProperties["textAlign"] }
        : {}),
      ...(isItalic ? { fontStyle: "italic" } : {}),
      ...(isUnderline ? { textDecorationLine: "underline" } : {}),
      ...flattenStyle(style),
    };

    return (
      <span
        className={className}
        style={webStyle}
        data-testid={testID}
        aria-label={accessibilityLabel ?? testID}
      >
        {content}
      </span>
    );
  }

  // React Native — lineHeight must be a pixel value (fontSize × ratio)
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text: RNText } = require("react-native") as {
    Text: React.ComponentType<Record<string, unknown>>;
  };

  const rnLineHeight =
    preset.lineHeight !== undefined
      ? Math.round(preset.fontSize * preset.lineHeight)
      : undefined;

  const rnStyle: Record<string, unknown> = {
    fontFamily: preset.fontFamily,
    fontSize: preset.fontSize,
    ...(preset.fontWeight ? { fontWeight: preset.fontWeight } : {}),
    ...(rnLineHeight !== undefined ? { lineHeight: rnLineHeight } : {}),
    ...(preset.letterSpacing !== undefined
      ? { letterSpacing: preset.letterSpacing * preset.fontSize }
      : {}),
    color: resolvedColor,
    ...(isItalic ? { fontStyle: "italic" } : {}),
    ...(isUnderline ? { textDecorationLine: "underline" } : {}),
    ...flattenStyle(style),
  };

  const rnProps: Record<string, unknown> = {
    allowFontScaling: false,
    accessibilityLabel: accessibilityLabel ?? testID,
    "aria-label": accessibilityLabel ?? testID,
    style: rnStyle,
    children: content,
  };
  if (testID !== undefined) rnProps["testID"] = testID;
  if (numberOfLines !== undefined) rnProps["numberOfLines"] = numberOfLines;
  if (ellipsizeMode !== undefined) rnProps["ellipsizeMode"] = ellipsizeMode;

  return <RNText {...rnProps} />;
};

Text.displayName = "Text";
export default Text;
