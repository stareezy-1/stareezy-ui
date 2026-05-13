/**
 * Pins — renders a status pin (Success/Failed/On_Progress).
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 17.1
 */

import React from "react";
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { flattenStyle } from '../shared/flattenStyle';

export interface IPinsProps {
  type: "Success" | "Failed" | "On_Progress";
  icon?: React.ReactNode;
  text?: string;
  textStyle?: React.CSSProperties | Record<string, unknown>;
}

export const Pins: React.FC<IPinsProps> = ({ type, icon, text, textStyle }) => {
  const themed = useThemedColors();

  let bgColor: string;
  let textColor: string;
  let borderColor: string;

  switch (type) {
    case "Success":
      bgColor = colors.success.surface.value;
      textColor = colors.success.pressed.value;
      borderColor = colors.success.border.value;
      break;
    case "Failed":
      bgColor = colors.danger.surface.value;
      textColor = colors.danger.pressed.value;
      borderColor = colors.danger.border.value;
      break;
    case "On_Progress":
    default:
      bgColor = colors.caution.surface.value;
      textColor = colors.caution.pressed.value;
      borderColor = colors.caution.border.value;
      break;
  }

  if (isWeb) {
    return (
      <div
        role="status"
        aria-label={text ?? type}
        style={{
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[4].value,
          paddingTop: spacing[4].value,
          paddingBottom: spacing[4].value,
          paddingLeft: spacing[8].value,
          paddingRight: spacing[8].value,
          borderRadius: radius.full.value,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor,
          backgroundColor: bgColor,
        }}
      >
        {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
        {text && (
          <span style={{
            fontSize: spacing[12].value,
            fontWeight: "600",
            color: textColor,
            ...flattenStyle(textStyle),
          }}>
            {text}
          </span>
        )}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={text ?? type}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[4].value,
        paddingVertical: spacing[4].value,
        paddingHorizontal: spacing[8].value,
        borderRadius: radius.full.value,
        borderWidth: 1,
        borderColor,
        backgroundColor: bgColor,
        alignSelf: "flex-start",
      }}
    >
      {icon}
      {text && (
        <RNText style={{ fontSize: spacing[12].value, fontWeight: "600", color: textColor, ...flattenStyle(textStyle) }} allowFontScaling={false}>
          {text}
        </RNText>
      )}
    </View>
  );
};

Pins.displayName = "Pins";
export default Pins;
