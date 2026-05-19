import React from "react";
import { isWeb } from "../shared/platform";
import { Text, ETextType } from "../primitives/Text";
import { badgeBaseStyle, badgeVariantStyles } from "./Badge.style";
import type { BadgeVariant } from "./Badge.types";

export type { BadgeVariant } from "./Badge.types";

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: React.CSSProperties | Record<string, unknown>;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "default",
  style,
}) => {
  const variantStyle =
    badgeVariantStyles[variant] ?? badgeVariantStyles.default;

  if (isWeb) {
    return (
      <span
        style={{
          ...badgeBaseStyle,
          ...variantStyle,
          ...(style as React.CSSProperties),
        }}
      >
        <Text
          type={ETextType.AuroraBadgeText}
          text={label}
          color={variantStyle.color}
        />
      </span>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
  };
  return (
    <View
      style={{
        ...badgeBaseStyle,
        backgroundColor: variantStyle.backgroundColor,
        ...(style as Record<string, unknown>),
      }}
    >
      <Text
        type={ETextType.AuroraBadgeText}
        text={label}
        color={variantStyle.color}
      />
    </View>
  );
};

Badge.displayName = "Badge";
export default Badge;
