/**
 * CircularProgress — SVG-based circular progress indicator.
 * Root wrapper accepts BoxProps.
 */

import React from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps } from "../primitives/Box";

export type CircularProgressSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface CircularProgressProps extends Omit<BoxProps, "children"> {
  value: number;
  max?: number;
  size?: CircularProgressSize;
  thickness?: number;
  color?: string;
  trackColor?: string;
  showValue?: boolean;
  label?: string;
  children?: React.ReactNode;
  animated?: boolean;
}

const SIZE_PX: Record<CircularProgressSize, number> = {
  xs: 32,
  sm: 48,
  md: 64,
  lg: 96,
  xl: 128,
};
const THICKNESS_DEFAULT: Record<CircularProgressSize, number> = {
  xs: 3,
  sm: 4,
  md: 5,
  lg: 6,
  xl: 8,
};
const FONT_SIZE: Record<CircularProgressSize, number> = {
  xs: 9,
  sm: 12,
  md: 16,
  lg: 22,
  xl: 28,
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = "md",
  thickness,
  color = colors.celurenBlue[400].value,
  trackColor = colors.beauBlue[200].value,
  showValue = false,
  label,
  children,
  animated = true,
  testID,
  ...boxProps
}) => {
  const px = SIZE_PX[size];
  const stroke = thickness ?? THICKNESS_DEFAULT[size];
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (px - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const fontSize = FONT_SIZE[size];

  if (isWeb) {
    return (
      <Box
        position="relative"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        width={px}
        height={px}
        style={{ flexShrink: 0 }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        data-testid={testID}
        {...boxProps}
      >
        <svg
          width={px}
          height={px}
          viewBox={`0 0 ${px} ${px}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "rotate(-90deg)",
          }}
          aria-hidden="true"
        >
          <circle
            cx={px / 2}
            cy={px / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={stroke}
          />
          <circle
            cx={px / 2}
            cy={px / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: animated
                ? "stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)"
                : "none",
            }}
          />
        </svg>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
          {!children && showValue && (
            <span
              style={{
                fontSize,
                fontWeight: "700",
                color: colors.raisinBlack[800].value,
                fontFamily: "Inter, system-ui, sans-serif",
                lineHeight: 1,
              }}
            >
              {Math.round(pct)}%
            </span>
          )}
        </div>
      </Box>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View, Text: RNText } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
    Text: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <Box
      width={px}
      height={px}
      alignItems="center"
      justifyContent="center"
      testID={testID}
      {...boxProps}
    >
      <View
        style={{
          width: px,
          height: px,
          borderRadius: px / 2,
          borderWidth: stroke,
          borderColor: trackColor,
          position: "absolute",
        }}
      />
      {showValue && (
        <RNText
          style={{
            fontSize,
            fontWeight: "700",
            color: colors.raisinBlack[800].value,
          }}
          allowFontScaling={false}
        >
          {Math.round(pct)}%
        </RNText>
      )}
      {children}
    </Box>
  );
};

CircularProgress.displayName = "CircularProgress";
export default CircularProgress;
