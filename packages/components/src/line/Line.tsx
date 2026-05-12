/**
 * Line — a horizontal or vertical divider component.
 *
 * Uses token values for default color. Supports custom color, height, and
 * vertical orientation.
 *
 * Requirements: 12.1, 12.2, 12.3
 */

import React from "react";
import { colors } from "@stareezy-ui/tokens";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

// ---------------------------------------------------------------------------
// ILineProps
// ---------------------------------------------------------------------------

export interface ILineProps {
  vertical?: boolean;
  color?: string;
  height?: number;
  custom?: boolean;
  style?: React.CSSProperties | Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Line component
// ---------------------------------------------------------------------------

export const Line: React.FC<ILineProps> = ({
  vertical = false,
  color,
  height,
  custom = false,
  style,
}) => {
  const lineColor = color ?? colors.beauBlue[300].value;
  const lineThickness = height ?? 1;

  if (isWeb) {
    const webStyle: React.CSSProperties = vertical
      ? {
          display: "inline-block",
          width: lineThickness,
          alignSelf: "stretch",
          backgroundColor: lineColor,
          flexShrink: 0,
        }
      : {
          display: "block",
          width: custom ? undefined : "100%",
          height: lineThickness,
          backgroundColor: lineColor,
          flexShrink: 0,
        };

    return (
      <div
        style={{ ...webStyle, ...(style as React.CSSProperties | undefined) }}
        role="separator"
        aria-orientation={vertical ? "vertical" : "horizontal"}
      />
    );
  }

  // React Native

  const rnStyle: Record<string, unknown> = vertical
    ? {
        width: lineThickness,
        alignSelf: "stretch",
        backgroundColor: lineColor,
        flexShrink: 0,
      }
    : {
        width: custom ? undefined : "100%",
        height: lineThickness,
        backgroundColor: lineColor,
        flexShrink: 0,
      };

  const mergedStyle = style
    ? { ...rnStyle, ...(style as Record<string, unknown>) }
    : rnStyle;

  return <View style={mergedStyle} accessibilityRole={"none" as never} />;
};

Line.displayName = "Line";

export default Line;
