import React from "react";
import { isWeb } from "../shared/platform";
import { Text, ETextType } from "../primitives/Text";
import {
  progressPanelContainerStyle,
  progressStepStatusStyles,
} from "./ProgressPanel.style";
import type { ProgressStep } from "./ProgressPanel.types";
import { aurora } from "@stareezy-ui/tokens";

export type { ProgressStep } from "./ProgressPanel.types";

export interface ProgressPanelProps {
  steps: ProgressStep[];
  currentStep: number;
  style?: React.CSSProperties | Record<string, unknown>;
}

export const ProgressPanel: React.FC<ProgressPanelProps> = ({
  steps,
  currentStep,
  style,
}) => {
  const completedCount = steps.filter((s) => s.status === "complete").length;
  const percentage =
    steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  if (isWeb) {
    return (
      <div
        style={{
          ...progressPanelContainerStyle,
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
              backgroundColor: aurora.borderSubtle.value,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${percentage}%`,
                height: "100%",
                backgroundColor: aurora.auroraGreen.value,
                borderRadius: 2,
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <Text
            type={ETextType.AuroraStatLabel}
            text={`${percentage}%`}
            color={aurora.textSecondary.value}
          />
        </div>
        {/* Steps */}
        {steps.map((step, index) => {
          const statusStyle = progressStepStatusStyles[step.status];
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
                    color: aurora.auroraGreen.value,
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
                    color: aurora.errorRed.value,
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
  }

  // React Native
  const { View } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
  };
  return (
    <View style={{ padding: 20, ...(style as Record<string, unknown>) }}>
      {steps.map((step) => {
        const statusStyle = progressStepStatusStyles[step.status];
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
};

ProgressPanel.displayName = "ProgressPanel";
export default ProgressPanel;
