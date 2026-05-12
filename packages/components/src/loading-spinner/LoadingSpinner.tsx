/**
 * LoadingSpinner — a standalone spinner (no overlay).
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { colors, spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export interface LoadingSpinnerProps {
  centered?: boolean;
  size?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  centered = false,
  size = spacing[32].value,
}) => {
  const themed = useThemedColors();

  if (isWeb) {
    const spinnerEl = (
      <span
        style={{
          display: "inline-block",
          width: size,
          height: size,
          border: `3px solid ${themed.borderDefault}`,
          borderTopColor: colors.celurenBlue[500].value,
          borderRadius: "50%",
          animation: "sz-spin 0.7s linear infinite",
        }}
        role="status"
        aria-label="Loading"
      />
    );

    if (centered) {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
          {spinnerEl}
        </div>
      );
    }
    return spinnerEl;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { ActivityIndicator } = require("react-native") as {

    ActivityIndicator: React.ComponentType<Record<string, unknown>>;

  };

  const spinner = <ActivityIndicator size={size} color={colors.celurenBlue[500].value} />;

  if (centered) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {spinner}
      </View>
    );
  }
  return spinner;
};

LoadingSpinner.displayName = "LoadingSpinner";
export default LoadingSpinner;
