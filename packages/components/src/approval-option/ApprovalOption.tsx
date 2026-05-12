/**
 * ApprovalOption — approve/decline radio option.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 17.1, 17.3
 */

import React from "react";
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import { EApprovalOptionState } from "../shared/types";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

// Re-export from shared/types so consumers can import from here
export { EApprovalOptionState };

export enum ERadioStatus {
  Checked = "checked",
  Unchecked = "unchecked",
}

export interface IApprovalOptionProps {
  text: string;
  onPress: () => void;
  style?: React.CSSProperties | Record<string, unknown>;
  state?: EApprovalOptionState;
  color?: string;
  uncheckColor?: string;
  status?: boolean;
  value: string;
}

export const ApprovalOption: React.FC<IApprovalOptionProps> = ({
  text,
  onPress,
  style,
  state = EApprovalOptionState.Default,
  color,
  uncheckColor,
}) => {
  const themed = useThemedColors();

  const isApprove = state === EApprovalOptionState.Approve;
  const isDecline = state === EApprovalOptionState.Decline;
  const isApproveDisable = state === EApprovalOptionState.ApproveDisable;
  const isDeclineDisable = state === EApprovalOptionState.DeclineDisable;
  const isDisabled = isApproveDisable || isDeclineDisable;
  const isActive = isApprove || isDecline || isApproveDisable || isDeclineDisable;

  let activeColor = color ?? themed.borderPrimaryBrand;
  if (isApprove || isApproveDisable) activeColor = color ?? colors.success.main.value;
  if (isDecline || isDeclineDisable) activeColor = color ?? colors.danger.main.value;

  const borderColor = isActive ? activeColor : (uncheckColor ?? themed.borderDefault);
  const bgColor = isActive ? activeColor + "1A" : "transparent";

  if (isWeb) {
    return (
      <div
        role="radio"
        aria-checked={isActive}
        aria-disabled={isDisabled}
        aria-label={text}
        tabIndex={isDisabled ? -1 : 0}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[8].value,
          padding: spacing[12].value,
          borderRadius: radius.md.value,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor,
          backgroundColor: bgColor,
          cursor: isDisabled ? "not-allowed" : "pointer",
          opacity: isDisabled ? 0.6 : 1,
          ...(style as React.CSSProperties),
        }}
        onClick={() => { if (!isDisabled) onPress(); }}
        onKeyDown={(e) => {
          if (!isDisabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onPress();
          }
        }}
      >
        <div style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: isActive ? activeColor : (uncheckColor ?? themed.borderDefault),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          {isActive && (
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: activeColor }} />
          )}
        </div>
        <span style={{ fontSize: spacing[14].value, color: isActive ? activeColor : themed.textPrimary, flex: 1 }}>
          {text}
        </span>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <TouchableOpacity
      onPress={() => { if (!isDisabled) onPress(); }}
      disabled={isDisabled}
      accessibilityRole="radio"
      accessibilityState={{ checked: isActive, disabled: isDisabled }}
      accessibilityLabel={text}
      aria-disabled={isDisabled}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[8].value,
        padding: spacing[12].value,
        borderRadius: radius.md.value,
        borderWidth: 1,
        borderColor,
        backgroundColor: bgColor,
        opacity: isDisabled ? 0.6 : 1,
        ...(style as Record<string, unknown>),
      }}
    >
      <View style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: isActive ? activeColor : (uncheckColor ?? themed.borderDefault),
        alignItems: "center",
        justifyContent: "center",
      }}>
        {isActive && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: activeColor }} />}
      </View>
      <RNText style={{ fontSize: spacing[14].value, color: isActive ? activeColor : themed.textPrimary, flex: 1 }} allowFontScaling={false}>
        {text}
      </RNText>
    </TouchableOpacity>
  );
};

ApprovalOption.displayName = "ApprovalOption";
export default ApprovalOption;
