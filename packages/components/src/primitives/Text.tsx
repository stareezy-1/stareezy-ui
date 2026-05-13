/**
 * Text — foundational text primitive for Stareezy UI.
 *
 * Full port of rekosistem-components/src/components/text/text.tsx.
 * Replaces Tamagui with the new token system.
 *
 * - 50+ ETextType variants (display, heading, paragraph, label at all sizes/weights)
 * - EFontStyle (italic, underline, italic-underline)
 * - emptyState fallback
 * - allowFontScaling={false} on RN
 * - Token props resolved via runtime adapter (O(1))
 *
 * Requirements: 11.2, 14.1, 14.2, 14.3, 14.4, 14.5
 */

import React from "react";
import { colors, spacing, typography } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import type { StyleProp } from "./Box";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

import { isWeb } from "../shared/platform";
import { flattenStyle } from "../shared/flattenStyle";

// ---------------------------------------------------------------------------
// ETextType — mirrors rekosistem-components/src/components/text/text.props.ts
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

// ---------------------------------------------------------------------------
// EFontStyle
// ---------------------------------------------------------------------------

export enum EFontStyle {
  ITALIC = "italic",
  UNDERLINE = "underline",
  ITALIC_UNDERLINE = "italic-underline",
}

// ---------------------------------------------------------------------------
// Style presets — translated from text.presets.ts using token values
// ---------------------------------------------------------------------------

interface TextStylePreset {
  fontFamily: string;
  fontSize: number;
  fontWeight?: string;
  lineHeight?: number;
  letterSpacing?: number;
  color?: string;
  textAlign?: string;
}

const DEFAULT_COLOR = colors.raisinBlack[800].value;
const LETTER_SPACING = -0.02;

export const PRESETS: Record<ETextType, TextStylePreset> = {
  // button
  [ETextType.button]: {
    fontFamily: typography.fontFamily.montserratRegular.value,
    fontSize: spacing.extraMedium.value,
    lineHeight: spacing[24].value,
    letterSpacing: LETTER_SPACING,
    color: colors.neutral[10].value,
    textAlign: "center",
  },
  [ETextType.label]: {
    fontFamily: typography.fontFamily.nunitoSemiBold.value,
    fontSize: spacing[14].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // Display
  [ETextType.LDisplay]: {
    fontFamily: typography.fontFamily.montserratBold.value,
    fontSize: spacing[72].value,
    lineHeight: 90,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.MDisplay]: {
    fontFamily: typography.fontFamily.montserratBold.value,
    fontSize: spacing[60].value,
    lineHeight: 76,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.SDisplay]: {
    fontFamily: typography.fontFamily.montserratBold.value,
    fontSize: spacing[48].value,
    lineHeight: 64,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // Labels
  [ETextType.XLLabel]: {
    fontFamily: typography.fontFamily.nunitoSemiBold.value,
    fontSize: spacing[20].value,
    lineHeight: spacing[32].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.LLabel]: {
    fontFamily: typography.fontFamily.nunitoSemiBold.value,
    fontSize: spacing[18].value,
    lineHeight: spacing[28].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.MLabel]: {
    fontFamily: typography.fontFamily.nunitoSemiBold.value,
    fontSize: spacing[16].value,
    lineHeight: spacing[24].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.SLabel]: {
    fontFamily: typography.fontFamily.nunitoSemiBold.value,
    fontSize: spacing[14].value,
    lineHeight: spacing[22].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XSLabel]: {
    fontFamily: typography.fontFamily.nunitoSemiBold.value,
    fontSize: spacing[12].value,
    lineHeight: spacing[16].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // XXL Headings
  [ETextType.XXLHeadingBold]: {
    fontFamily: typography.fontFamily.montserratBold.value,
    fontSize: 40,
    lineHeight: spacing[2].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XXLHeadingSemiBold]: {
    fontFamily: typography.fontFamily.montserratSemiBold.value,
    fontWeight: "600",
    fontSize: 40,
    lineHeight: spacing[2].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // XL Headings
  [ETextType.XLHeadingBold]: {
    fontFamily: typography.fontFamily.montserratBold.value,
    fontSize: spacing[36].value,
    lineHeight: 44,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XLHeadingSemiBold]: {
    fontFamily: typography.fontFamily.montserratSemiBold.value,
    fontWeight: "600",
    fontSize: spacing[36].value,
    lineHeight: 44,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // L Headings
  [ETextType.LHeadingBold]: {
    fontFamily: typography.fontFamily.montserratBold.value,
    fontSize: spacing[32].value,
    lineHeight: 40,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.LHeadingSemiBold]: {
    fontFamily: typography.fontFamily.montserratSemiBold.value,
    fontWeight: "600",
    fontSize: spacing[32].value,
    lineHeight: 40,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // M Headings
  [ETextType.MHeadingBold]: {
    fontFamily: typography.fontFamily.montserratBold.value,
    fontSize: spacing[28].value,
    lineHeight: spacing[36].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.MHeadingSemiBold]: {
    fontFamily: typography.fontFamily.montserratSemiBold.value,
    fontWeight: "600",
    fontSize: spacing[28].value,
    lineHeight: spacing[36].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // S Headings
  [ETextType.SHeadingBold]: {
    fontFamily: typography.fontFamily.montserratBold.value,
    fontSize: spacing[24].value,
    lineHeight: spacing[32].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.SHeadingSemiBold]: {
    fontFamily: typography.fontFamily.montserratSemiBold.value,
    fontWeight: "600",
    fontSize: spacing[24].value,
    lineHeight: spacing[32].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // XS Headings
  [ETextType.XSHeadingBold]: {
    fontFamily: typography.fontFamily.montserratBold.value,
    fontSize: spacing[20].value,
    lineHeight: spacing[28].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XSHeadingSemiBold]: {
    fontFamily: typography.fontFamily.montserratSemiBold.value,
    fontWeight: "600",
    fontSize: spacing[20].value,
    lineHeight: spacing[28].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // XXS Headings
  [ETextType.XXSHeadingBold]: {
    fontFamily: typography.fontFamily.montserratBold.value,
    fontSize: spacing[18].value,
    lineHeight: spacing[28].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XXSHeadingSemiBold]: {
    fontFamily: typography.fontFamily.montserratSemiBold.value,
    fontWeight: "600",
    fontSize: spacing[18].value,
    lineHeight: spacing[28].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // XXL Paragraphs
  [ETextType.XXLParagraphBold]: {
    fontFamily: typography.fontFamily.nunitoBold.value,
    fontSize: spacing[24].value,
    lineHeight: 40,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XXLParagraphSemiBold]: {
    fontFamily: typography.fontFamily.nunitoSemiBold.value,
    fontWeight: "600",
    fontSize: spacing[24].value,
    lineHeight: 40,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XXLParagraphMedium]: {
    fontFamily: typography.fontFamily.nunitoMedium.value,
    fontWeight: "500",
    fontSize: spacing[24].value,
    lineHeight: 40,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XXLParagraphRegular]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontWeight: "500",
    fontSize: spacing[24].value,
    lineHeight: 40,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // XL Paragraphs
  [ETextType.XLParagraphBold]: {
    fontFamily: typography.fontFamily.nunitoBold.value,
    fontSize: spacing[20].value,
    lineHeight: spacing[32].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XLParagraphSemiBold]: {
    fontFamily: typography.fontFamily.nunitoSemiBold.value,
    fontWeight: "600",
    fontSize: spacing[20].value,
    lineHeight: spacing[32].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XLParagraphMedium]: {
    fontFamily: typography.fontFamily.nunitoMedium.value,
    fontWeight: "500",
    fontSize: spacing[20].value,
    lineHeight: spacing[32].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XLParagraphRegular]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontWeight: "500",
    fontSize: spacing[20].value,
    lineHeight: spacing[32].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // L Paragraphs
  [ETextType.LParagraphBold]: {
    fontFamily: typography.fontFamily.nunitoBold.value,
    fontSize: spacing[18].value,
    lineHeight: spacing[28].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.LParagraphSemiBold]: {
    fontFamily: typography.fontFamily.nunitoSemiBold.value,
    fontWeight: "600",
    fontSize: spacing[18].value,
    lineHeight: spacing[28].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.LParagraphMedium]: {
    fontFamily: typography.fontFamily.nunitoMedium.value,
    fontWeight: "500",
    fontSize: spacing[18].value,
    lineHeight: spacing[28].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.LParagraphRegular]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontWeight: "500",
    fontSize: spacing[18].value,
    lineHeight: spacing[28].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // M Paragraphs
  [ETextType.MParagraphBold]: {
    fontFamily: typography.fontFamily.nunitoBold.value,
    fontSize: spacing[16].value,
    lineHeight: spacing[24].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.MParagraphSemiBold]: {
    fontFamily: typography.fontFamily.nunitoSemiBold.value,
    fontWeight: "600",
    fontSize: spacing[16].value,
    lineHeight: spacing[24].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.MParagraphMedium]: {
    fontFamily: typography.fontFamily.nunitoMedium.value,
    fontWeight: "500",
    fontSize: spacing[16].value,
    lineHeight: spacing[24].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.MParagraphRegular]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontWeight: "400",
    fontSize: spacing[16].value,
    lineHeight: spacing[24].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // S Paragraphs
  [ETextType.SParagraphBold]: {
    fontFamily: typography.fontFamily.nunitoBold.value,
    fontSize: spacing[14].value,
    lineHeight: spacing[22].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.SParagraphSemiBold]: {
    fontFamily: typography.fontFamily.nunitoSemiBold.value,
    fontWeight: "600",
    fontSize: spacing[14].value,
    lineHeight: spacing[22].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.SParagraphMedium]: {
    fontFamily: typography.fontFamily.nunitoMedium.value,
    fontWeight: "500",
    fontSize: spacing[14].value,
    lineHeight: spacing[22].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.SParagraphRegular]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontWeight: "400",
    fontSize: spacing[14].value,
    lineHeight: spacing[22].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // XS Paragraphs
  [ETextType.XSParagraphBold]: {
    fontFamily: typography.fontFamily.nunitoBold.value,
    fontSize: spacing[12].value,
    lineHeight: spacing[16].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XSParagraphSemiBold]: {
    fontFamily: typography.fontFamily.nunitoSemiBold.value,
    fontWeight: "600",
    fontSize: spacing[12].value,
    lineHeight: spacing[16].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XSParagraphMedium]: {
    fontFamily: typography.fontFamily.nunitoMedium.value,
    fontWeight: "500",
    fontSize: spacing[12].value,
    lineHeight: spacing[16].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  [ETextType.XSParagraphRegular]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontWeight: "400",
    fontSize: spacing[12].value,
    lineHeight: spacing[16].value,
    letterSpacing: LETTER_SPACING,
    color: DEFAULT_COLOR,
  },
  // Portfolio text roles
  [ETextType.Eyebrow]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 2,
    color: colors.celurenBlue[400].value,
  },
  [ETextType.HeroTitle]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 56,
    fontWeight: "800",
    lineHeight: 64,
    letterSpacing: -1,
    color: colors.neutral[10].value,
  },
  [ETextType.HeroSubtitle]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 36,
    color: DEFAULT_COLOR,
  },
  [ETextType.StatNumber]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 40,
    color: colors.neutral[10].value,
  },
  [ETextType.StatLabel]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 13,
    lineHeight: 20,
    color: colors.raisinBlack[200].value,
  },
  [ETextType.BadgeText]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
    color: DEFAULT_COLOR,
  },
  [ETextType.CardTitle]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 24,
    color: colors.neutral[10].value,
  },
  [ETextType.CardDescription]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    color: colors.raisinBlack[100].value,
  },
  [ETextType.SectionHeading]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 44,
    letterSpacing: -0.5,
    color: colors.neutral[10].value,
  },
  [ETextType.OrganizationLabel]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 22,
    color: colors.celurenBlue[400].value,
  },
  [ETextType.LocationText]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 12,
    lineHeight: 18,
    color: colors.raisinBlack[200].value,
  },
  [ETextType.HighlightText]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 13,
    lineHeight: 20,
    color: colors.raisinBlack[100].value,
  },
  [ETextType.NavLabel]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: DEFAULT_COLOR,
  },
  [ETextType.FooterText]: {
    fontFamily: typography.fontFamily.nunitoRegular.value,
    fontSize: 13,
    lineHeight: 20,
    color: colors.raisinBlack[200].value,
  },
};

const DEFAULT_PRESET: TextStylePreset = {
  fontFamily: typography.fontFamily.montserratRegular.value,
  fontSize: spacing[14].value,
  color: DEFAULT_COLOR,
};

// ---------------------------------------------------------------------------
// TextProps
// ---------------------------------------------------------------------------

export interface TextProps {
  /** Text content. When empty string, renders `emptyState` instead. */
  text?: string;
  /** Rendered when `text` is an empty string. */
  emptyState?: string;
  /** One of 50+ type variants matching ETextType. */
  type?: ETextType;
  /** Font style modifier (italic, underline, italic-underline). */
  fontStyle?: EFontStyle;
  /** @deprecated use fontStyle */
  fontStyles?: EFontStyle;
  /** Override text color — plain CSS color string or hex. */
  color?: string;
  /** Child nodes (alternative to `text` prop). */
  children?: React.ReactNode;
  /**
   * Style override — accepts CSSProperties, RN StyleSheet styles (numbers),
   * plain objects, AtomicStylesheet class strings, or arrays of any of these.
   */
  style?: StyleProp;
  testID?: string;
  accessibilityLabel?: string;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  /** Additional CSS class names (web only). */
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

  // Read theme-aware colors at render time so dark/light switching works.
  const themed = useThemedColors();
  const defaultColor = themed.textPrimary;

  // Caller-supplied color takes priority; fall back to themed primary text.
  const resolvedColor = colorOverride ?? defaultColor;

  // emptyState fallback
  let content: React.ReactNode = text || children;
  if (typeof content === "string" && content === "" && emptyState !== "") {
    content = emptyState;
  }

  // Resolve preset
  const preset = type ? PRESETS[type] ?? DEFAULT_PRESET : DEFAULT_PRESET;

  // Font style modifiers
  const activeFontStyle = fontStyle ?? fontStyles;
  const isItalic =
    activeFontStyle === EFontStyle.ITALIC ||
    activeFontStyle === EFontStyle.ITALIC_UNDERLINE;
  const isUnderline =
    activeFontStyle === EFontStyle.UNDERLINE ||
    activeFontStyle === EFontStyle.ITALIC_UNDERLINE;

  if (isWeb) {
    const webStyle: React.CSSProperties = {
      display: "inline",
      fontFamily: preset.fontFamily,
      fontSize: preset.fontSize,
      ...(preset.fontWeight
        ? { fontWeight: preset.fontWeight as React.CSSProperties["fontWeight"] }
        : {}),
      // lineHeight from presets is a pixel value — append "px" for web
      ...(preset.lineHeight ? { lineHeight: `${preset.lineHeight}px` } : {}),
      ...(preset.letterSpacing ? { letterSpacing: preset.letterSpacing } : {}),
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

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text: RNText } = require("react-native") as {
    Text: React.ComponentType<Record<string, unknown>>;
  };

  const rnStyle: Record<string, unknown> = {
    fontFamily: preset.fontFamily,
    fontSize: preset.fontSize,
    ...(preset.fontWeight ? { fontWeight: preset.fontWeight } : {}),
    ...(preset.lineHeight ? { lineHeight: preset.lineHeight } : {}),
    ...(preset.letterSpacing ? { letterSpacing: preset.letterSpacing } : {}),
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
