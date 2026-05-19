import React from "react";
import { isWeb } from "../shared/platform";
import { Text, ETextType } from "../primitives/Text";
import {
  cardBaseStyle,
  cardVariantStyles,
  cardGlowColorStyles,
} from "./Card.style";
import type { CardVariant, GlowColor } from "./Card.types";
import type { BoxProps } from "../primitives/Box";

export type { CardVariant, GlowColor } from "./Card.types";

export interface CardProps extends Pick<BoxProps, "style"> {
  variant?: CardVariant;
  glowColor?: GlowColor;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = "border",
  glowColor = "green",
  title,
  description,
  children,
  style,
}) => {
  const variantStyle = cardVariantStyles[variant] ?? cardVariantStyles.border;
  const resolvedBoxShadow =
    variant === "glow"
      ? (cardGlowColorStyles[glowColor] ?? cardGlowColorStyles.green).boxShadow
      : variantStyle.boxShadow;

  if (isWeb) {
    return (
      <div
        style={{
          ...cardBaseStyle,
          ...variantStyle,
          boxShadow: resolvedBoxShadow,
          ...(style as React.CSSProperties),
        }}
      >
        {title && <Text type={ETextType.AuroraCardTitle} text={title} />}
        {description && (
          <Text type={ETextType.AuroraCardDescription} text={description} />
        )}
        {children}
      </div>
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
        borderRadius: cardBaseStyle.borderRadius,
        padding: cardBaseStyle.padding,
        backgroundColor: variantStyle.backgroundColor,
        ...(style as Record<string, unknown>),
      }}
    >
      {title && <Text type={ETextType.AuroraCardTitle} text={title} />}
      {description && (
        <Text type={ETextType.AuroraCardDescription} text={description} />
      )}
      {children}
    </View>
  );
};

Card.displayName = "Card";
export default Card;
