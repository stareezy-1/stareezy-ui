/**
 * CheckboxOption — renders a list of options with checkboxes.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 17.1, 17.3
 */

import React from "react";
import { colors, spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import { EApprovalOptionState } from "../shared/types";
import { Checkbox } from "../checkbox/Checkbox";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export interface IOptionProps {
  name: string;
  value: string;
}

export interface ICheckboxOptionProps {
  onSelectedOption: (value: IOptionProps) => void;
  label?: string;
  errorMessage?: string;
  value: string;
  options: IOptionProps[];
  selectedState?: EApprovalOptionState;
  defaultState?: EApprovalOptionState;
  isRequired?: boolean;
  disabled?: boolean;
}

export const CheckboxOption: React.FC<ICheckboxOptionProps> = ({
  onSelectedOption,
  label,
  errorMessage,
  value,
  options,
  isRequired,
  disabled,
}) => {
  const themed = useThemedColors();
  const hasError = !!errorMessage;

  if (isWeb) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: spacing[8].value }}>
        {label && (
          <label style={{ fontSize: spacing[14].value, fontWeight: "500", color: themed.textPrimary }}>
            {label}
            {isRequired && <span style={{ color: colors.danger.main.value, marginLeft: spacing[2].value }}>*</span>}
          </label>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[8].value }}>
          {options.map((option) => (
            <div
              key={option.value}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: spacing[8].value,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.6 : 1,
              }}
              onClick={() => { if (!disabled) onSelectedOption(option); }}
              role="option"
              aria-selected={value === option.value}
              {...(disabled !== undefined ? { "aria-disabled": disabled } : {})}
            >
              <Checkbox
                status={value === option.value ? "checked" : "unchecked"}
                {...(disabled !== undefined ? { disabled } : {})}
                onPress={() => { if (!disabled) onSelectedOption(option); }}
              />
              <span style={{ fontSize: spacing[14].value, color: themed.textPrimary }}>
                {option.name}
              </span>
            </div>
          ))}
        </div>
        {hasError && (
          <span style={{ fontSize: spacing[12].value, color: colors.danger.main.value }}>
            {errorMessage}
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
    <View style={{ gap: spacing[8].value }}>
      {label && (
        <RNText style={{ fontSize: spacing[14].value, fontWeight: "500", color: themed.textPrimary }} allowFontScaling={false}>
          {label}
          {isRequired && <RNText style={{ color: colors.danger.main.value }}>{" *"}</RNText>}
        </RNText>
      )}
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => { if (!disabled) onSelectedOption(option); }}
          disabled={disabled}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: value === option.value, disabled: !!disabled }}
          accessibilityLabel={option.name}
          {...(disabled !== undefined ? { "aria-disabled": disabled } : {})}
          style={{ flexDirection: "row", alignItems: "center", gap: spacing[8].value, opacity: disabled ? 0.6 : 1 }}
        >
          <Checkbox
            status={value === option.value ? "checked" : "unchecked"}
            {...(disabled !== undefined ? { disabled } : {})}
          />
          <RNText style={{ fontSize: spacing[14].value, color: themed.textPrimary }} allowFontScaling={false}>
            {option.name}
          </RNText>
        </TouchableOpacity>
      ))}
      {hasError && (
        <RNText style={{ fontSize: spacing[12].value, color: colors.danger.main.value }} allowFontScaling={false}>
          {errorMessage}
        </RNText>
      )}
    </View>
  );
};

CheckboxOption.displayName = "CheckboxOption";
export default CheckboxOption;
