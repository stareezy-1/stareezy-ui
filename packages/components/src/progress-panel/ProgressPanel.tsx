import React from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Text, ETextType } from "../primitives/Text";
import { Box } from "../primitives/Box";
import {
  makeProgressPanelContainerStyle,
  makeProgressStepStatusStyles,
} from "./ProgressPanel.style";
import type { ProgressStep } from "./ProgressPanel.types";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import type { SzrFC } from '../shared/types';

export type { ProgressStep } from "./ProgressPanel.types";

export interface ProgressPanelProps extends BoxLayoutProps {
  steps: ProgressStep[];
  currentStep: number;
  style?: React.CSSProperties | Record<string, unknown>;
}

export const ProgressPanel: SzrFC<ProgressPanelProps> = (props) => {
  const { layout, sxProps, rest } = extractBoxLayoutProps(props);
  const hasLayoutProps =
    Object.keys(layout).length > 0 || Object.keys(sxProps).length > 0;
  const { steps, currentStep, style } = rest as ProgressPanelProps;
  const themed = useThemedColors();

  const containerStyle = makeProgressPanelContainerStyle(themed);
  const stepStatusStyles = makeProgressStepStatusStyles(themed);

  const completedCount = steps.filter((s) => s.status === "complete").length;
  const percentage =
    steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  if (isWeb) {
    const webContent = (
      <div
        style={{
          ...containerStyle,
          ...(style as React.CSSProperties),
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 4,
              backgroundColor: themed.borderDefault,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${percentage}%`,
                height: "100%",
                backgroundColor: themed.colorSuccess,
                borderRadius: 2,
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <Text
            type={ETextType.AuroraStatLabel}
            text={`${percentage}%`}
            color={themed.textSecondary}
          />
        </div>
        {/* Steps */}
        {steps.map((step, index) => {
          const statusStyle = stepStatusStyles[step.status];
          const isCurrentStep = index === currentStep;
          return (
            <div
              key={step.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "6px 0",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: statusStyle.dotColor,
                  flexShrink: 0,
                  boxShadow: isCurrentStep
                    ? `0 0 8px ${statusStyle.dotColor}`
                    : "none",
                }}
              />
              <Text
                type={ETextType.AuroraProgressLabel}
                text={step.label}
                color={statusStyle.labelColor}
                style={{ fontWeight: isCurrentStep ? "600" : "400" }}
              />
              {step.status === "complete" && (
                <span
                  style={{
                    marginLeft: "auto",
                    color: themed.colorSuccess,
                    fontSize: 12,
                  }}
                >
                  ✓
                </span>
              )}
              {step.status === "error" && (
                <span
                  style={{
                    marginLeft: "auto",
                    color: themed.colorDanger,
                    fontSize: 12,
                  }}
                >
                  ✕
                </span>
              )}
            </div>
          );
        })}
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
    <View style={{ padding: 20, ...(style as Record<string, unknown>) }}>
      {steps.map((step) => {
        const statusStyle = stepStatusStyles[step.status];
        return (
          <View
            key={step.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              paddingVertical: 6,
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: statusStyle.dotColor,
              }}
            />
            <Text
              type={ETextType.AuroraProgressLabel}
              text={step.label}
              color={statusStyle.labelColor}
            />
          </View>
        );
      })}
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

ProgressPanel.displayName = "ProgressPanel";
export default ProgressPanel;
