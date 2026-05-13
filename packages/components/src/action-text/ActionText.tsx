/**
 * ActionText — a line of text with a tappable action portion.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { colors, spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from '../shared/flattenStyle';

export interface IActionTextProps {
  text: string;
  actionText: string;
  onPress: () => void;
  style?: React.CSSProperties | Record<string, unknown>;
}

export const ActionText: React.FC<IActionTextProps> = ({
  text,
  actionText,
  onPress,
  style,
}) => {
  const themed = useThemedColors();

  if (isWeb) {
    return (
      <span
        style={{
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[4].value,
          fontSize: spacing[14].value,
          color: themed.textSecondary,
          ...flattenStyle(style),
        }}
      >
        {text}
        <span
          onClick={onPress}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onPress();
            }
          }}
          style={{
            color: colors.celurenBlue[500].value,
            fontWeight: "600",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {actionText}
        </span>
      </span>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", ...flattenStyle(style) }}>
      <RNText allowFontScaling={false} style={{ fontSize: spacing[14].value, color: themed.textSecondary }}>
        {text}
      </RNText>
      <TouchableOpacity onPress={onPress}>
        <RNText
          allowFontScaling={false}
          style={{
            fontSize: spacing[14].value,
            color: colors.celurenBlue[500].value,
            fontWeight: "600",
            textDecorationLine: "underline",
          }}
        >
          {" "}{actionText}
        </RNText>
      </TouchableOpacity>
    </View>
  );
};

ActionText.displayName = "ActionText";
export default ActionText;
