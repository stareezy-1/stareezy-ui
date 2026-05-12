/**
 * Card — a bordered container component with optional press handler.
 * Uses useThemedColors() so it responds to light/dark theme switching.
 * Requirements: 12.1, 12.2, 12.3
 */

import React from "react";
import { radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export interface ICardProps {
  borderRadius?: number;
  borderColor?: string;
  children: React.ReactNode;
  style?: React.CSSProperties | Record<string, unknown>;
  withoutBorder?: boolean;
  onPress?: () => void;
}

export const Card: React.FC<ICardProps> = ({
  borderRadius,
  borderColor,
  children,
  style,
  withoutBorder = false,
  onPress,
}) => {
  const themed = useThemedColors();
  const resolvedBorderRadius = borderRadius ?? radius.xl.value;
  const resolvedBorderColor = borderColor ?? themed.borderDefault;

  if (isWeb) {
    const webStyle: React.CSSProperties = {
      borderRadius: resolvedBorderRadius,
      borderWidth: withoutBorder ? 0 : 1,
      borderStyle: withoutBorder ? undefined : "solid",
      borderColor: withoutBorder ? undefined : resolvedBorderColor,
      backgroundColor: themed.surface,
      overflow: "hidden",
      cursor: onPress ? "pointer" : undefined,
      ...((style as React.CSSProperties | undefined) ?? {}),
    };

    if (onPress) {
      return (
        <div
          style={webStyle}
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
    return <div style={webStyle}>{children}</div>;
  }

  // React Native

  const rnStyle: Record<string, unknown> = {
    borderRadius: resolvedBorderRadius,
    borderWidth: withoutBorder ? 0 : 1,
    borderColor: withoutBorder ? undefined : resolvedBorderColor,
    backgroundColor: themed.surface,
    overflow: "hidden",
    ...((style as Record<string, unknown> | undefined) ?? {}),
  };

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={rnStyle} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={rnStyle}>{children}</View>;
};

Card.displayName = "Card";
export default Card;
