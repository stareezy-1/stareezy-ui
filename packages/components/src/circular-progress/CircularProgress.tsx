/**
 * CircularProgress — SVG-based circular progress indicator.
 * Root wrapper accepts BoxProps. Value text rendered via <Text>.
 */

import React from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";
import {
  SIZE_PX,
  THICKNESS_DEFAULT,
  FONT_SIZE,
} from "./CircularProgress.style";
import type { CircularProgressSize } from "./CircularProgress.types";
import type { SxProp } from "../shared/sx";
import { useSx, SxStyleTag } from "../shared/useSx";
import type { SzrFC } from "../shared/types";

export type { CircularProgressSize };

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
  /** ETextType for the percentage value text */
  valueTextType?: ETextType;
  /** Style override for the percentage value text */
  valueTextStyle?: StyleProp;
  sx?: SxProp;
}

export const CircularProgress: SzrFC<CircularProgressProps> = ({
  value,
  max = 100,
  size = "md",
  thickness,
  color,
  trackColor,
  showValue = false,
  label,
  children,
  animated = true,
  valueTextType,
  valueTextStyle,
  testID,
  sx,
  ...boxProps
}) => {
  const { sxStyle, sxClassName, sxCss } = useSx(sx);
  const themed = useThemedColors();
  const resolvedColor = color ?? themed.borderPrimaryBrand;
  const resolvedTrackColor = trackColor ?? themed.borderSecondary;
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
        style={{ flexShrink: 0, ...sxStyle }}
        className={sxClassName || undefined}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        data-testid={testID}
        {...boxProps}
      >
        {sxCss && isWeb && <SxStyleTag css={sxCss} scopeClass={sxClassName} />}
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
            stroke={resolvedTrackColor}
            strokeWidth={stroke}
          />
          <circle
            cx={px / 2}
            cy={px / 2}
            r={radius}
            fill="none"
            stroke={resolvedColor}
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
            <Text
              {...(valueTextType !== undefined ? { type: valueTextType } : {})}
              text={`${Math.round(pct)}%`}
              color={themed.textPrimary}
              style={{
                fontSize,
                fontWeight: "700",
                lineHeight: 1,
                ...(valueTextStyle as React.CSSProperties),
              }}
            />
          )}
        </div>
      </Box>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <Box
      width={px}
      height={px}
      alignItems="center"
      justifyContent="center"
      testID={testID}
      {...boxProps}
      style={sxStyle as React.CSSProperties}
      className={sxClassName || undefined}
    >
      {sxCss && isWeb && <SxStyleTag css={sxCss} scopeClass={sxClassName} />}
      <View
        style={{
          width: px,
          height: px,
          borderRadius: px / 2,
          borderWidth: stroke,
          borderColor: resolvedTrackColor,
          position: "absolute",
        }}
      />
      {showValue && (
        <Text
          {...(valueTextType !== undefined ? { type: valueTextType } : {})}
          text={`${Math.round(pct)}%`}
          color={themed.textPrimary}
          style={{
            fontSize,
            fontWeight: "700",
            ...(valueTextStyle as Record<string, unknown>),
          }}
        />
      )}
      {children}
    </Box>
  );
};

CircularProgress.displayName = "CircularProgress";
export default CircularProgress;
