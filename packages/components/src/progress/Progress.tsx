/**
 * Progress — linear progress bar with label and percentage.
 * Root wrapper accepts BoxProps. Label/percentage rendered via <Text>.
 */

import React from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";
import type { ProgressSize, ProgressVariant } from "./Progress.types";

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
  /** ETextType for the label text */
  labelTextType?: ETextType;
  /** Style override for the label text */
  labelTextStyle?: StyleProp;
  /** ETextType for the percentage text */
  percentageTextType?: ETextType;
  /** Style override for the percentage text */
  percentageTextStyle?: StyleProp;
}

const HEIGHT: Record<ProgressSize, number> = { xs: 4, sm: 6, md: 8, lg: 12 };

const PROGRESS_KF = `
@keyframes szr-progress-stripe {
  from { background-position: 40px 0; }
  to { background-position: 0 0; }
}
`;

let progressKfInjected = false;
function injectProgressKf() {
  if (progressKfInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.setAttribute("data-szr-kf", "progress");
  el.textContent = PROGRESS_KF;
  document.head.appendChild(el);
  progressKfInjected = true;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = "md",
  variant = "default",
  color = colors.celurenBlue[400].value,
  trackColor = colors.beauBlue[200].value,
  showLabel = false,
  showPercentage = false,
  label,
  animated = true,
  labelTextType = ETextType.XSParagraphMedium,
  labelTextStyle,
  percentageTextType = ETextType.XSLabel,
  percentageTextStyle,
  testID,
  ...boxProps
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const height = HEIGHT[size];

  if (isWeb) {
    injectProgressKf();

    let fillBg = color;
    if (variant === "gradient") {
      fillBg = `linear-gradient(90deg,${colors.celurenBlue[300].value},${colors.celurenBlue[500].value})`;
    } else if (variant === "striped") {
      fillBg = `repeating-linear-gradient(45deg,${color},${color} 10px,${colors.celurenBlue[300].value} 10px,${colors.celurenBlue[300].value} 20px)`;
    }

    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={6}
        data-testid={testID}
        {...boxProps}
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
                color={colors.raisinBlack[800].value}
                style={labelTextStyle as React.CSSProperties}
              />
            )}
            {showPercentage && (
              <Text
                type={percentageTextType}
                text={`${Math.round(pct)}%`}
                color={color}
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
            backgroundColor: trackColor,
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
    <Box testID={testID} {...boxProps}>
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
              color={colors.raisinBlack[800].value}
              style={labelTextStyle as Record<string, unknown>}
            />
          )}
          {showPercentage && (
            <Text
              type={percentageTextType}
              text={`${Math.round(pct)}%`}
              color={color}
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
          backgroundColor: trackColor,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: height / 2,
            backgroundColor: color,
          }}
        />
      </View>
    </Box>
  );
};

Progress.displayName = "Progress";
export default Progress;
