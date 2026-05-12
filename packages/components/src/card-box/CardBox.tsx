/**
 * CardBox — a pressable card container with shadow and rounded corners.
 *
 * Wraps children in a styled container. Supports optional press handler and
 * style overrides.
 *
 * Requirements: 12.1, 12.2, 12.3
 */

import React, { ReactElement } from "react";
import { radius, shadow, colors } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

// ---------------------------------------------------------------------------
// ICardBoxProps
// ---------------------------------------------------------------------------

export interface ICardBoxProps {
  children: ReactElement | ReactElement[];
  onPress?: () => void;
  stylesOverride?: React.CSSProperties | Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// CardBox component
// ---------------------------------------------------------------------------

export const CardBox: React.FC<ICardBoxProps> = ({
  children,
  onPress,
  stylesOverride,
}) => {
  const shadowValue = shadow.weak.value;
  const baseStyle = {
    backgroundColor: colors.neutral[10].value,
    borderRadius: radius.xl.value,
    // Shadow values from token (ShadowStyle shape: color, offset, radius, opacity)
    shadowColor: shadowValue.color,
    shadowOffset: shadowValue.offset,
    shadowOpacity: shadowValue.opacity,
    shadowRadius: shadowValue.radius,
    elevation: shadowValue.radius,
    overflow: "hidden" as const,
  };

  if (isWeb) {
    const webStyle: React.CSSProperties = {
      backgroundColor: baseStyle.backgroundColor,
      borderRadius: baseStyle.borderRadius,
      boxShadow: `0px ${baseStyle.shadowOffset.height}px ${baseStyle.shadowRadius}px ${baseStyle.shadowColor}`,
      overflow: "hidden",
      cursor: onPress ? "pointer" : undefined,
    };

    const mergedStyle = {
      ...webStyle,
      ...(stylesOverride as React.CSSProperties | undefined),
    };

    if (onPress) {
      return (
        <div
          style={mergedStyle}
          onClick={onPress}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onPress();
            }
          }}
        >
          {children}
        </div>
      );
    }

    return <div style={mergedStyle}>{children}</div>;
  }

  // React Native

  const rnStyle: Record<string, unknown> = {
    backgroundColor: baseStyle.backgroundColor,
    borderRadius: baseStyle.borderRadius,
    shadowColor: baseStyle.shadowColor,
    shadowOffset: baseStyle.shadowOffset,
    shadowOpacity: baseStyle.shadowOpacity,
    shadowRadius: baseStyle.shadowRadius,
    elevation: baseStyle.elevation,
    overflow: "hidden",
  };

  const mergedRnStyle = stylesOverride
    ? { ...rnStyle, ...(stylesOverride as Record<string, unknown>) }
    : rnStyle;

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={mergedRnStyle}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={mergedRnStyle}>{children}</View>;
};

CardBox.displayName = "CardBox";

export default CardBox;
