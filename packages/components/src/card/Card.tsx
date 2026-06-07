import React from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Text, ETextType } from "../primitives/Text";
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
import type { SzrFC } from "../shared/types";
import { useSx, SxStyleTag } from "../shared/useSx";

export type { CardVariant, GlowColor } from "./Card.types";

export interface CardProps extends Pick<BoxProps, "style">, BoxLayoutProps {
  variant?: CardVariant;
  glowColor?: GlowColor;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Card: SzrFC<CardProps> = (props) => {
  const { sxProps, rest } = extractBoxLayoutProps(props);
  const sx = sxProps as import("../shared/sx").SxProp;
  const { sxStyle, sxClassName, sxCss } = useSx(sx);
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
        className={
          [cardClasses.base, sxClassName].filter(Boolean).join(" ") || undefined
        }
        style={{
          ...variantStyle,
          boxShadow: resolvedBoxShadow,
          ...(style as React.CSSProperties),
          ...sxStyle,
        }}
      >
        {title && <Text type={ETextType.AuroraCardTitle} text={title} />}
        {description && (
          <Text type={ETextType.AuroraCardDescription} text={description} />
        )}
        {children}
      </div>
    );
    if (sxCss && isWeb)
      return (
        <>
          {/* @ts-ignore */}
          <SxStyleTag css={sxCss} scopeClass={sxClassName} />
          {webContent}
        </>
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
        ...sxStyle,
      }}
    >
      {title && <Text type={ETextType.AuroraCardTitle} text={title} />}
      {description && (
        <Text type={ETextType.AuroraCardDescription} text={description} />
      )}
      {children}
    </View>
  );
  if (sxCss && isWeb)
    return (
      <>
        {/* @ts-ignore */}
        <SxStyleTag css={sxCss} scopeClass={sxClassName} />
        {nativeContent}
      </>
    );
  return nativeContent;
};

Card.displayName = "Card";
export default Card;
