/**
 * ListCheckboxRadioButton — list item with checkbox, radio button, or chevron.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 17.1, 17.3
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import { ETextType } from "../primitives/Text";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export enum EListCheckRadioButtonType {
  Checkbox = "Checkbox",
  RadioButton = "RadioButton",
  ChevronRight = "ChevronRight",
}

export { ETextType };

export interface IListCheckRadioButtonProps {
  testID?: string;
  type: EListCheckRadioButtonType;
  active: boolean;
  withBorder?: boolean;
  text: string;
  onPress: () => void;
  textType?: ETextType;
  isDisabled?: boolean;
}

function CheckIcon({ color }: { color: string }) {
  if (isWeb) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8L6 12L14 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return null;
}

function RadioIcon({ active, color, borderColor }: { active: boolean; color: string; borderColor: string }) {
  if (isWeb) {
    return (
      <div style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: active ? color : borderColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        {active && <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: color }} />}
      </div>
    );
  }
  return null;
}

function ChevronIcon({ color }: { color: string }) {
  if (isWeb) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 4L10 8L6 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return null;
}

export const ListCheckboxRadioButton: React.FC<IListCheckRadioButtonProps> = ({
  testID,
  type,
  active,
  withBorder,
  text,
  onPress,
  isDisabled,
}) => {
  const themed = useThemedColors();

  const activeColor = themed.borderPrimaryBrand;
  const textColor = isDisabled ? themed.textDisabled : themed.textPrimary;
  const iconColor = isDisabled ? themed.textDisabled : active ? activeColor : themed.textSecondary;

  if (isWeb) {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: spacing[12].value,
      padding: spacing[12].value,
      borderRadius: radius.md.value,
      borderWidth: withBorder ? 1 : 0,
      borderStyle: withBorder ? "solid" : undefined,
      borderColor: withBorder ? (active ? activeColor : themed.borderDefault) : undefined,
      cursor: isDisabled ? "not-allowed" : "pointer",
      opacity: isDisabled ? 0.6 : 1,
      backgroundColor: active ? themed.bgSecondary : "transparent",
    };

    return (
      <div
        style={containerStyle}
        onClick={() => { if (!isDisabled) onPress(); }}
        role={type === EListCheckRadioButtonType.RadioButton ? "radio" : "checkbox"}
        aria-checked={active}
        aria-disabled={isDisabled}
        aria-label={text}
        tabIndex={isDisabled ? -1 : 0}
        data-testid={testID}
        onKeyDown={(e) => {
          if (!isDisabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onPress();
          }
        }}
      >
        {type === EListCheckRadioButtonType.Checkbox && (
          <div style={{
            width: 20,
            height: 20,
            borderRadius: radius.xs.value,
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: active ? activeColor : themed.borderDefault,
            backgroundColor: active ? activeColor : themed.surface,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            {active && <CheckIcon color="white" />}
          </div>
        )}
        {type === EListCheckRadioButtonType.RadioButton && (
          <RadioIcon active={active} color={activeColor} borderColor={themed.borderDefault} />
        )}
        <span style={{ flex: 1, fontSize: spacing[14].value, color: textColor }}>
          {text}
        </span>
        {type === EListCheckRadioButtonType.ChevronRight && (
          <ChevronIcon color={iconColor} />
        )}
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
      accessibilityRole={type === EListCheckRadioButtonType.RadioButton ? "radio" : "checkbox"}
      accessibilityState={{ checked: active, disabled: !!isDisabled }}
      accessibilityLabel={text}
      {...(isDisabled !== undefined ? { "aria-disabled": isDisabled } : {})}
      {...(testID !== undefined ? { testID } : {})}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[12].value,
        padding: spacing[12].value,
        borderRadius: radius.md.value,
        borderWidth: withBorder ? 1 : 0,
        borderColor: withBorder ? (active ? activeColor : themed.borderDefault) : undefined,
        opacity: isDisabled ? 0.6 : 1,
        backgroundColor: active ? themed.bgSecondary : "transparent",
      }}
    >
      {type === EListCheckRadioButtonType.Checkbox && (
        <View style={{
          width: 20,
          height: 20,
          borderRadius: radius.xs.value,
          borderWidth: 2,
          borderColor: active ? activeColor : themed.borderDefault,
          backgroundColor: active ? activeColor : themed.surface,
          alignItems: "center",
          justifyContent: "center",
        }} />
      )}
      {type === EListCheckRadioButtonType.RadioButton && (
        <View style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: active ? activeColor : themed.borderDefault,
          alignItems: "center",
          justifyContent: "center",
        }}>
          {active && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: activeColor }} />}
        </View>
      )}
      <RNText style={{ flex: 1, fontSize: spacing[14].value, color: textColor }} allowFontScaling={false}>
        {text}
      </RNText>
    </TouchableOpacity>
  );
};

ListCheckboxRadioButton.displayName = "ListCheckboxRadioButton";
export default ListCheckboxRadioButton;
