/**
 * Dot — a small status indicator dot component.
 *
 * Supports size (small/medium/large), type (success/danger/warning), and
 * outline mode. Uses token values for colors.
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
// Enums
// ---------------------------------------------------------------------------

export enum ESizeDot {
  small = "small",
  medium = "medium",
  large = "large",
}

export enum ETypeDot {
  success = "success",
  danger = "danger",
  warning = "warning",
}

// ---------------------------------------------------------------------------
// IDotProps
// ---------------------------------------------------------------------------

export interface IDotProps {
  size?: ESizeDot;
  type?: ETypeDot;
  outline?: boolean;
  style?: React.CSSProperties | Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Size map (diameter in px)
// ---------------------------------------------------------------------------

const SIZE_MAP: Record<ESizeDot, number> = {
  [ESizeDot.small]: 8,
  [ESizeDot.medium]: 12,
  [ESizeDot.large]: 16,
};

// ---------------------------------------------------------------------------
// Color map
// ---------------------------------------------------------------------------

const COLOR_MAP: Record<ETypeDot, string> = {
  [ETypeDot.success]: colors.lawnGreen[700].value,
  [ETypeDot.danger]: colors.crimsonRed[500].value,
  [ETypeDot.warning]: colors.brightYellowCrayola[500].value,
};

// ---------------------------------------------------------------------------
// Dot component
// ---------------------------------------------------------------------------

export const Dot: React.FC<IDotProps> = ({
  size = ESizeDot.medium,
  type = ETypeDot.success,
  outline = false,
  style,
}) => {
  const diameter = SIZE_MAP[size];
  const dotColor = COLOR_MAP[type];

  if (isWeb) {
    const webStyle: React.CSSProperties = {
      display: "inline-block",
      width: diameter,
      height: diameter,
      borderRadius: "50%",
      backgroundColor: outline ? "transparent" : dotColor,
      borderWidth: outline ? 2 : 0,
      borderStyle: outline ? "solid" : undefined,
      borderColor: outline ? dotColor : undefined,
      flexShrink: 0,
    };

    return (
      <span
        style={{ ...webStyle, ...(style as React.CSSProperties | undefined) }}
        role="img"
        aria-label={`${type} indicator`}
      />
    );
  }

  // React Native

  const rnStyle: Record<string, unknown> = {
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
    backgroundColor: outline ? "transparent" : dotColor,
    borderWidth: outline ? 2 : 0,
    borderColor: outline ? dotColor : undefined,
    flexShrink: 0,
  };

  const mergedStyle = style
    ? { ...rnStyle, ...(style as Record<string, unknown>) }
    : rnStyle;

  return <View style={mergedStyle} accessibilityLabel={`${type} indicator`} />;
};

Dot.displayName = "Dot";

export default Dot;
