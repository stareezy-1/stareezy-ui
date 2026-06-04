/**
 * Progress — linear progress bar with label and percentage.
 * Root wrapper accepts BoxProps. Label/percentage rendered via <Text>.
 */

import React from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";
import { PROGRESS_KF, HEIGHT } from "./Progress.style";
import type { ProgressSize, ProgressVariant } from "./Progress.types";
import type { SxProp } from "../shared/sx";
import type { SzrFC } from "../shared/types";

export type { ProgressSize, ProgressVariant };

export interface ProgressProps extends Omit<BoxProps, "children"> {
  value: number;
  max?: number;
  size?: ProgressSize;
  variant?: ProgressVariant;
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
  showPercentage?: boolean;
  label?: string;
  animated?: boolean;
  labelTextType?: ETextType;
  labelTextStyle?: StyleProp;
  percentageTextType?: ETextType;
  percentageTextStyle?: StyleProp;
  sx?: SxProp;
}

let progressKfInjected = false;
function injectProgressKf() {
  if (progressKfInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.setAttribute("data-szr-kf", "progress");
  el.textContent = PROGRESS_KF;
  document.head.appendChild(el);
  progressKfInjected = true;
}

export const Progress: SzrFC<ProgressProps> = ({
  value,
  max = 100,
  size = "md",
  variant = "default",
  color,
  trackColor,
  showLabel = false,
  showPercentage = false,
  label,
  animated = true,
  labelTextType = ETextType.XSParagraphMedium,
  labelTextStyle,
  percentageTextType = ETextType.XSLabel,
  percentageTextStyle,
  testID,
  sx,
  ...boxProps
}) => {
  const themed = useThemedColors();
  const resolvedColor = color ?? themed.borderPrimaryBrand;
  const resolvedTrackColor = trackColor ?? themed.borderSecondary;

  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const height = HEIGHT[size];

  if (isWeb) {
    injectProgressKf();

    // gradient / striped use the brand color family — token-based approximation
    const gradientFrom = themed.borderPrimaryBrand;
    const gradientTo = themed.textImportantBrand;
    const stripeSecondary = themed.borderPrimaryBrand;

    let fillBg = resolvedColor;
    if (variant === "gradient") {
      fillBg = `linear-gradient(90deg,${gradientFrom},${gradientTo})`;
    } else if (variant === "striped") {
      fillBg = `repeating-linear-gradient(45deg,${resolvedColor},${resolvedColor} 10px,${stripeSecondary} 10px,${stripeSecondary} 20px)`;
    }

    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={6}
        data-testid={testID}
        {...boxProps}
        {...sx}
      >
        {(showLabel || label || showPercentage) && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {label && (
              <Text
                type={labelTextType}
                text={label}
                color={themed.textPrimary}
                style={labelTextStyle as React.CSSProperties}
              />
            )}
            {showPercentage && (
              <Text
                type={percentageTextType}
                text={`${Math.round(pct)}%`}
                color={resolvedColor}
                style={{
                  marginLeft: "auto",
                  ...(percentageTextStyle as React.CSSProperties),
                }}
              />
            )}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
          style={{
            width: "100%",
            height,
            borderRadius: height / 2,
            backgroundColor: resolvedTrackColor,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              borderRadius: height / 2,
              background: fillBg,
              transition: animated
                ? "width 0.4s cubic-bezier(0.4,0,0.2,1)"
                : "none",
              animation:
                variant === "striped"
                  ? "szr-progress-stripe 0.8s linear infinite"
                  : undefined,
              backgroundSize: variant === "striped" ? "40px 40px" : undefined,
            }}
          />
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
    <Box testID={testID} {...boxProps} {...sx}>
      {(label || showPercentage) && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          {label && (
            <Text
              type={labelTextType}
              text={label}
              color={themed.textPrimary}
              style={labelTextStyle as Record<string, unknown>}
            />
          )}
          {showPercentage && (
            <Text
              type={percentageTextType}
              text={`${Math.round(pct)}%`}
              color={resolvedColor}
              style={percentageTextStyle as Record<string, unknown>}
            />
          )}
        </View>
      )}
      <View
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max, now: value }}
        style={{
          width: "100%",
          height,
          borderRadius: height / 2,
          backgroundColor: resolvedTrackColor,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: height / 2,
            backgroundColor: resolvedColor,
          }}
        />
      </View>
    </Box>
  );
};

Progress.displayName = "Progress";
export default Progress;
