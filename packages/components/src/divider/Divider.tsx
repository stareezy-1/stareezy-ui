/**
 * Divider — horizontal or vertical separator with optional label.
 * Accepts BoxProps for spacing/layout overrides.
 */

import React from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps } from "../primitives/Box";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed" | "dotted";

export interface DividerProps extends Omit<BoxProps, "children"> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  color?: string;
  thickness?: number;
  label?: React.ReactNode;
  labelPosition?: "left" | "center" | "right";
  spacing?: number;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  variant = "solid",
  color = colors.beauBlue[300].value,
  thickness = 1,
  label,
  labelPosition = "center",
  spacing: spacingProp = 16,
  testID,
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
          <span
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: colors.beauBlue[700].value,
              whiteSpace: "nowrap",
              fontFamily: "Inter, system-ui, sans-serif",
              flexShrink: 0,
            }}
          >
            {label}
          </span>
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
