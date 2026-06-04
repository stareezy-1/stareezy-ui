import React from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Text, ETextType } from "../primitives/Text";
import { Box } from "../primitives/Box";
import {
  cardBaseStyle,
  makeCardVariantStyles,
  makeCardGlowColorStyles,
  cardClasses,
} from "./Card.style";
import type { CardVariant, GlowColor } from "./Card.types";
import type { BoxProps } from "../primitives/Box";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import type { SzrFC } from '../shared/types';

export type { CardVariant, GlowColor } from "./Card.types";

export interface CardProps extends Pick<BoxProps, "style">, BoxLayoutProps {
  variant?: CardVariant;
  glowColor?: GlowColor;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Card: SzrFC<CardProps> = (props) => {
  const { layout, sxProps, rest } = extractBoxLayoutProps(props);
  const hasLayoutProps =
    Object.keys(layout).length > 0 || Object.keys(sxProps).length > 0;
  const {
    variant = "border",
    glowColor = "green",
    title,
    description,
    children,
    style,
  } = rest as CardProps;

  const themed = useThemedColors();
  const variantStyles = makeCardVariantStyles(themed);
  const glowColorStyles = makeCardGlowColorStyles(themed);

  const variantStyle = variantStyles[variant] ?? variantStyles.border;
  const resolvedBoxShadow =
    variant === "glow"
      ? (glowColorStyles[glowColor] ?? glowColorStyles.green).boxShadow
      : variantStyle.boxShadow;

  if (isWeb) {
    const webContent = (
      <div
        className={cardClasses.base}
        style={{
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
    if (hasLayoutProps)
      return (
        <Box {...layout} {...sxProps}>
          {webContent}
        </Box>
      );
    return webContent;
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
  };
  const nativeContent = (
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
  if (hasLayoutProps)
    return (
      <Box {...layout} {...sxProps}>
        {nativeContent}
      </Box>
    );
  return nativeContent;
};

Card.displayName = "Card";
export default Card;
