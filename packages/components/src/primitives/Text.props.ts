import type { StyleProp } from "./Box";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";

// ---------------------------------------------------------------------------
// TextProps
// ---------------------------------------------------------------------------
export interface ITextProps extends BoxLayoutProps {
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
  allowFontScaling?: boolean;
}

export interface TextStylePreset {
  fontFamily: string;
  fontSize: number;
  fontWeight?: string;
  /** Absolute pixel value — applied directly, no multiplication */
  lineHeight?: number;
  letterSpacing?: number;
  color?: string;
  textAlign?: string;
}

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
  // Code / Mono
  CodeInline = "code-inline",
  CodeBlock = "code-block",
  CodeBlockLarge = "code-block-large",
  // Aurora roles
  AuroraHeroTitle = "aurora-hero-title",
  AuroraHeroSubtitle = "aurora-hero-subtitle",
  AuroraStatNumber = "aurora-stat-number",
  AuroraStatLabel = "aurora-stat-label",
  AuroraNavLabel = "aurora-nav-label",
  AuroraCardTitle = "aurora-card-title",
  AuroraCardDescription = "aurora-card-description",
  AuroraBadgeText = "aurora-badge-text",
  AuroraToastMessage = "aurora-toast-message",
  AuroraProgressLabel = "aurora-progress-label",
  AuroraDropZoneLabel = "aurora-drop-zone-label",
  AuroraDropZoneHint = "aurora-drop-zone-hint",
}

export enum EFontStyle {
  ITALIC = "italic",
  UNDERLINE = "underline",
  ITALIC_UNDERLINE = "italic-underline",
}
