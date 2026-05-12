/**
 * Limit — renders a row of selectable limit options (e.g. 10, 25, 50, 100).
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export interface ILimitProps {
  limitOption: number[];
  onLimitChange?(data: number): void;
  limitDescText?: string;
  currentLimit?: number;
  testID?: string;
}

export const Limit: React.FC<ILimitProps> = ({
  limitOption,
  onLimitChange,
  limitDescText,
  currentLimit,
  testID,
}) => {
  const themed = useThemedColors();

  if (isWeb) {
    return (
      <div
        data-testid={testID}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[8].value,
          flexWrap: "wrap",
        }}
      >
        {limitDescText && (
          <span style={{ fontSize: spacing[14].value, color: themed.textSecondary }}>
            {limitDescText}
          </span>
        )}
        {limitOption.map((opt) => {
          const isActive = opt === currentLimit;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onLimitChange?.(opt)}
              aria-pressed={isActive}
              style={{
                fontSize: spacing[14].value,
                fontWeight: isActive ? "600" : "400",
                color: isActive ? colors.celurenBlue[500].value : themed.textSecondary,
                backgroundColor: isActive ? colors.celurenBlue[25].value : "transparent",
                border: `1px solid ${isActive ? colors.celurenBlue[100].value : themed.borderDefault}`,
                borderRadius: radius.sm.value,
                padding: `${spacing[4].value}px ${spacing[10].value}px`,
                cursor: "pointer",
                minWidth: spacing[32].value,
                textAlign: "center",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <View testID={testID} style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
      {limitDescText && (
        <RNText allowFontScaling={false} style={{ fontSize: spacing[14].value, color: themed.textSecondary, marginRight: spacing[8].value }}>
          {limitDescText}
        </RNText>
      )}
      {limitOption.map((opt) => {
        const isActive = opt === currentLimit;
        return (
          <TouchableOpacity
            key={opt}
            onPress={() => onLimitChange?.(opt)}
            style={{
              marginRight: spacing[8].value,
              marginBottom: spacing[4].value,
              paddingHorizontal: spacing[10].value,
              paddingVertical: spacing[4].value,
              borderRadius: radius.sm.value,
              borderWidth: 1,
              borderColor: isActive ? colors.celurenBlue[100].value : themed.borderDefault,
              backgroundColor: isActive ? colors.celurenBlue[25].value : "transparent",
            }}
          >
            <RNText
              allowFontScaling={false}
              style={{
                fontSize: spacing[14].value,
                fontWeight: isActive ? "600" : "400",
                color: isActive ? colors.celurenBlue[500].value : themed.textSecondary,
              }}
            >
              {opt}
            </RNText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

Limit.displayName = "Limit";
export default Limit;
