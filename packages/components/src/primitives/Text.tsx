/**
 * Text — foundational text primitive for Stareezy UI.
 *
 * lineHeight is stored as an ABSOLUTE pixel value in all presets.
 * It is applied directly on both web (as "Npx") and React Native (as a number).
 * No multiplication, no ratio conversion — what you set is what you get.
 */

import React from "react";
import { colors, typography } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import { isWeb } from "../shared/platform";
import { flattenStyle } from "../shared/flattenStyle";
import { TEXT_PRESETS } from "./Text.style";
import { EFontStyle, ITextProps, TextStylePreset } from "./Text.props";

export * from "./Text.props";
export * from "./Text.style";
// ---------------------------------------------------------------------------
// ETextType
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Style presets
// lineHeight is an ABSOLUTE pixel value — applied as-is on web and React Native.
// ---------------------------------------------------------------------------

const DEFAULT_COLOR = colors.raisinBlack[800].value;

const BODY = typography.fontFamily.interRegular.value;

const DEFAULT_PRESET: TextStylePreset = {
  fontFamily: BODY,
  fontSize: 14,
  fontWeight: "400",
  lineHeight: 21,
  color: DEFAULT_COLOR,
};

// ---------------------------------------------------------------------------
// Text component
// ---------------------------------------------------------------------------

export const Text: React.FC<ITextProps> = (props) => {
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
    allowFontScaling,
  } = props;

  const themed = useThemedColors();
  const resolvedColor = colorOverride ?? themed.textPrimary;

  let content: React.ReactNode = text || children;
  if (typeof content === "string" && content === "" && emptyState !== "") {
    content = emptyState;
  }

  const preset = type ? TEXT_PRESETS[type] ?? DEFAULT_PRESET : DEFAULT_PRESET;

  const activeFontStyle = fontStyle ?? fontStyles;
  const isItalic =
    activeFontStyle === EFontStyle.ITALIC ||
    activeFontStyle === EFontStyle.ITALIC_UNDERLINE;
  const isUnderline =
    activeFontStyle === EFontStyle.UNDERLINE ||
    activeFontStyle === EFontStyle.ITALIC_UNDERLINE;

  if (isWeb) {
    // lineHeight is an absolute px value — output as "Npx" so CSS treats it
    // as a fixed pixel height, not a unitless multiplier.
    const webStyle: React.CSSProperties = {
      fontFamily: preset.fontFamily,
      fontSize: preset.fontSize,
      ...(preset.fontWeight
        ? { fontWeight: preset.fontWeight as React.CSSProperties["fontWeight"] }
        : {}),
      ...(preset.lineHeight !== undefined
        ? { lineHeight: `${preset.lineHeight}px` }
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

  // React Native — lineHeight is already an absolute pixel value, use directly.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text: RNText } = require("react-native") as {
    Text: React.ComponentType<Record<string, unknown>>;
  };

  const rnStyle: Record<string, unknown> = {
    fontFamily: preset.fontFamily,
    fontSize: preset.fontSize,
    ...(preset.fontWeight ? { fontWeight: preset.fontWeight } : {}),
    ...(preset.lineHeight !== undefined
      ? { lineHeight: preset.lineHeight }
      : {}),
    ...(preset.letterSpacing !== undefined
      ? { letterSpacing: preset.letterSpacing * preset.fontSize }
      : {}),
    color: resolvedColor,
    ...(isItalic ? { fontStyle: "italic" } : {}),
    ...(isUnderline ? { textDecorationLine: "underline" } : {}),
    ...flattenStyle(style),
  };

  const rnProps: Record<string, unknown> = {
    allowFontScaling,
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
