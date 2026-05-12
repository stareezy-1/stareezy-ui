/**
 * ProgressBar — horizontal progress indicator.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export interface IProgressBarProps {
  pasiveColor?: string;
  activeColor?: string;
  progress: string;
  height?: number;
  testID?: string;
}

function parseProgress(progress: string): number {
  const raw = progress.replace("%", "").trim();
  const num = parseFloat(raw);
  if (isNaN(num)) return 0;
  return Math.min(100, Math.max(0, num));
}

export const ProgressBar: React.FC<IProgressBarProps> = ({
  pasiveColor,
  activeColor,
  progress,
  height = spacing[8].value,
  testID,
}) => {
  const themed = useThemedColors();
  const pct = parseProgress(progress);

  const trackColor = pasiveColor ?? themed.borderDefault;
  const fillColor = activeColor ?? colors.celurenBlue[500].value;

  if (isWeb) {
    return (
      <div
        data-testid={testID}
        style={{
          width: "100%",
          height,
          backgroundColor: trackColor,
          borderRadius: radius.full.value,
          overflow: "hidden",
        }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            backgroundColor: fillColor,
            borderRadius: radius.full.value,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    );
  }

  return (
    <View
      testID={testID}
      accessibilityRole="progressbar"
      style={{
        width: "100%",
        height,
        backgroundColor: trackColor,
        borderRadius: radius.full.value,
        overflow: "hidden",
      }}
      {...({ accessibilityValue: { min: 0, max: 100, now: pct } } as Record<string, unknown>)}
    >
      <View
        style={{
          width: `${pct}%`,
          height: "100%",
          backgroundColor: fillColor,
          borderRadius: radius.full.value,
        }}
      />
    </View>
  );
};

ProgressBar.displayName = "ProgressBar";
export default ProgressBar;
