import React from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Text, ETextType } from "../primitives/Text";
import { Box } from "../primitives/Box";
import {
  badgeBaseStyle,
  makeBadgeVariantStyles,
  badgeClasses,
} from "./Badge.style";
import type { BadgeVariant } from "./Badge.types";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import type { SzrFC } from '../shared/types';

export type { BadgeVariant } from "./Badge.types";

export interface BadgeProps extends BoxLayoutProps {
  label: string;
  variant?: BadgeVariant;
  style?: React.CSSProperties | Record<string, unknown>;
}

export const Badge: SzrFC<BadgeProps> = (props) => {
  const { layout, sxProps, rest } = extractBoxLayoutProps(props);
  const hasLayoutProps =
    Object.keys(layout).length > 0 || Object.keys(sxProps).length > 0;
  const { label, variant = "default", style } = rest as BadgeProps;

  const themed = useThemedColors();
  const variantStyles = makeBadgeVariantStyles(themed);
  const variantStyle = variantStyles[variant] ?? variantStyles.default;

  let content: React.ReactElement;

  if (isWeb) {
    content = (
      <span
        className={badgeClasses.base}
        style={{
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
  } else {
    // React Native
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { View } = require("react-native") as {
      View: React.ComponentType<Record<string, unknown>>;
    };
    content = (
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
  }

  if (hasLayoutProps)
    return (
      <Box {...layout} {...sxProps}>
        {content}
      </Box>
    );
  return content;
};

Badge.displayName = "Badge";
export default Badge;
