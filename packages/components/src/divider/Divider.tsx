/**
 * Divider — horizontal or vertical separator with optional label.
 * Accepts BoxProps. Label rendered via <Text>.
 */

import React from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";
import type { DividerOrientation, DividerVariant } from "./Divider.types";
import type { SxProp } from "../shared/sx";
import type { SzrFC } from '../shared/types';

export type { DividerOrientation, DividerVariant };

export interface DividerProps extends Omit<BoxProps, "children"> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  color?: string;
  thickness?: number;
  label?: React.ReactNode;
  labelPosition?: "left" | "center" | "right";
  spacing?: number;
  /** ETextType for the label text (when label is a string) */
  labelTextType?: ETextType;
  /** Style override for the label text */
  labelTextStyle?: StyleProp;
  sx?: SxProp;
}

export const Divider: SzrFC<DividerProps> = ({
  orientation = "horizontal",
  variant = "solid",
  color = colors.beauBlue[300].value,
  thickness = 1,
  label,
  labelPosition = "center",
  spacing: spacingProp = 16,
  labelTextType = ETextType.XSLabel,
  labelTextStyle,
  testID,
  sx,
  ...boxProps
}) => {
  const isHorizontal = orientation === "horizontal";

  if (isWeb) {
    if (label && isHorizontal) {
      return (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={spacingProp * 0.5}
          my={spacingProp * 0.5}
          role="separator"
          aria-orientation={orientation}
          data-testid={testID}
          {...boxProps}
          {...sx}
        >
          {labelPosition !== "left" && (
            <div
              style={{
                flex: labelPosition === "center" ? 1 : 0,
                height: thickness,
                backgroundColor: color,
                borderRadius: thickness,
              }}
            />
          )}
          {typeof label === "string" ? (
            <Text
              type={labelTextType}
              text={label}
              color={colors.beauBlue[700].value}
              style={{
                whiteSpace: "nowrap",
                flexShrink: 0,
                ...(labelTextStyle as React.CSSProperties),
              }}
            />
          ) : (
            label
          )}
          {labelPosition !== "right" && (
            <div
              style={{
                flex: labelPosition === "center" ? 1 : 0,
                height: thickness,
                backgroundColor: color,
                borderRadius: thickness,
              }}
            />
          )}
        </Box>
      );
    }

    return (
      <Box
        role="separator"
        aria-orientation={orientation}
        {...(testID !== undefined ? { "data-testid": testID } : {})}
        style={{
          ...(isHorizontal
            ? {
                width: "100%",
                height: thickness,
                backgroundColor: color,
                borderStyle: variant !== "solid" ? variant : undefined,
              }
            : {
                width: thickness,
                alignSelf: "stretch",
                backgroundColor: color,
              }),
          flexShrink: 0,
        }}
        {...(isHorizontal ? { my: spacingProp * 0.5 } : {})}
        {...(!isHorizontal ? { mx: spacingProp * 0.5 } : {})}
        {...boxProps}
        {...sx}
      />
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
  };
  return (
    <View
      accessibilityRole="separator"
      testID={testID}
      style={
        isHorizontal
          ? {
              width: "100%",
              height: thickness,
              backgroundColor: color,
              marginVertical: spacingProp * 0.5,
            }
          : {
              width: thickness,
              alignSelf: "stretch",
              backgroundColor: color,
              marginHorizontal: spacingProp * 0.5,
            }
      }
    />
  );
};

Divider.displayName = "Divider";
export default Divider;
