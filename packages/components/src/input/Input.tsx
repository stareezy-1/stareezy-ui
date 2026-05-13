/**
 * Input — text input component with label, error, icons, prefix support.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 17.1, 17.3
 */

import React from "react";
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import { ELabelsType, EHintTextType } from "../shared/types";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from '../shared/flattenStyle';

export enum EInputType {
  TextField = "TextField",
  TextArea = "TextArea",
  SearchBar = "SearchBar",
  PhoneNumber = "PhoneNumber",
  Tonase = "Tonase",
  MoneyAmount = "MoneyAmount",
  Ton = "Ton",
  Percentage = "Percentage",
  Number = "Number",
  Participant = "Participant",
}

export enum EInputSize {
  Sm = "sm",
  Md = "Md",
}

// Re-export for consumers
export { ELabelsType, EHintTextType };

export interface IInputProps {
  label?: string;
  style?: React.CSSProperties | Record<string, unknown>;
  inputStyle?: React.CSSProperties | Record<string, unknown>;
  labelType?: ELabelsType;
  type?: EInputType;
  size?: EInputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftPrefix?: string;
  rightPrefix?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  onPress?: () => void;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  onChangeMoneyAmount?: (val: string) => void;
  errorMessage?: string;
  errorMessageType?: ELabelsType;
  topChildren?: React.ReactNode;
  hintTextIcon?: React.ReactNode;
  hintTextType?: EHintTextType;
  // TextInput-compatible props
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  keyboardType?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  autoFocus?: boolean;
  testID?: string;
  accessibilityLabel?: string;
}

export const Input: React.FC<IInputProps> = ({
  label,
  style,
  inputStyle,
  type = EInputType.TextField,
  size = EInputSize.Md,
  leftIcon,
  rightIcon,
  leftPrefix,
  rightPrefix,
  isDisabled,
  isRequired,
  onPress,
  onPressLeft,
  onPressRight,
  onChangeMoneyAmount,
  errorMessage,
  topChildren,
  hintTextIcon,
  value,
  defaultValue,
  placeholder,
  onChangeText,
  onChange,
  onFocus,
  onBlur,
  multiline,
  numberOfLines,
  maxLength,
  secureTextEntry,
  editable,
  autoFocus,
  testID,
  accessibilityLabel,
}) => {
  const themed = useThemedColors();

  const isTextArea = type === EInputType.TextArea || multiline;
  const isSmall = size === EInputSize.Sm;
  const hasError = !!errorMessage;

  const borderColor = hasError
    ? themed.borderDanger
    : isDisabled
    ? themed.borderSecondary
    : themed.borderDefault;

  const bgColor = isDisabled ? themed.bgDisabled : themed.surface;
  const textColor = isDisabled ? themed.textDisabled : themed.textPrimary;
  const placeholderColor = themed.textPlaceholder;

  const paddingV = isSmall ? spacing[8].value : spacing[12].value;
  const paddingH = spacing[12].value;
  const borderRadiusVal = radius.md.value;
  const fontSize = isSmall ? spacing[12].value : spacing[14].value;

  if (isWeb) {
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      onChange?.(e);
      onChangeText?.(e.target.value);
      if (type === EInputType.MoneyAmount) {
        onChangeMoneyAmount?.(e.target.value);
      }
    };

    return (
      <div
        style={{ display: "flex", flexDirection: "column", gap: spacing[4].value, ...flattenStyle(style) }}
        onClick={onPress}
      >
        {topChildren}
        {label && (
          <label style={{ fontSize: spacing[14].value, fontWeight: "500", color: themed.textPrimary }}>
            {label}
            {isRequired && (
              <span style={{ color: colors.danger.main.value, marginLeft: spacing[2].value }}>*</span>
            )}
          </label>
        )}
        {hintTextIcon && (
          <span style={{ display: "flex", alignItems: "center", gap: spacing[4].value }}>{hintTextIcon}</span>
        )}
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor,
          borderRadius: borderRadiusVal,
          backgroundColor: bgColor,
          paddingTop: paddingV,
          paddingBottom: paddingV,
          paddingLeft: paddingH,
          paddingRight: paddingH,
          cursor: isDisabled ? "not-allowed" : onPress ? "pointer" : undefined,
          opacity: isDisabled ? 0.7 : 1,
          gap: spacing[8].value,
        }}>
          {leftIcon && (
            <span
              style={{ display: "flex", alignItems: "center", cursor: onPressLeft ? "pointer" : undefined }}
              onClick={(e) => { e.stopPropagation(); onPressLeft?.(); }}
            >
              {leftIcon}
            </span>
          )}
          {leftPrefix && (
            <span style={{ color: themed.textSecondary, fontSize, flexShrink: 0 }}>{leftPrefix}</span>
          )}
          {isTextArea ? (
            <textarea
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                color: textColor,
                fontSize,
                cursor: isDisabled ? "not-allowed" : undefined,
                resize: "none",
                minHeight: (numberOfLines ?? 3) * 24,
                fontFamily: "inherit",
                ...(inputStyle as React.CSSProperties),
              }}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              disabled={isDisabled || editable === false}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              maxLength={maxLength}
              autoFocus={autoFocus}
              data-testid={testID}
              aria-label={accessibilityLabel ?? label ?? testID}
              aria-disabled={isDisabled}
              aria-invalid={hasError}
            />
          ) : (
            <input
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                color: textColor,
                fontSize,
                cursor: isDisabled ? "not-allowed" : undefined,
                ...(inputStyle as React.CSSProperties),
              }}
              type={secureTextEntry ? "password" : type === EInputType.Number ? "number" : "text"}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              disabled={isDisabled || editable === false}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              maxLength={maxLength}
              autoFocus={autoFocus}
              data-testid={testID}
              aria-label={accessibilityLabel ?? label ?? testID}
              aria-disabled={isDisabled}
              aria-invalid={hasError}
            />
          )}
          {rightPrefix && (
            <span style={{ color: themed.textSecondary, fontSize, flexShrink: 0 }}>{rightPrefix}</span>
          )}
          {rightIcon && (
            <span
              style={{ display: "flex", alignItems: "center", cursor: onPressRight ? "pointer" : undefined }}
              onClick={(e) => { e.stopPropagation(); onPressRight?.(); }}
            >
              {rightIcon}
            </span>
          )}
        </div>
        {hasError && (
          <span style={{ fontSize: spacing[12].value, color: colors.danger.main.value }}>{errorMessage}</span>
        )}
      </div>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { TextInput, Text: RNText } = require("react-native") as {

    TextInput: React.ComponentType<Record<string, unknown>>; Text: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <View style={{ gap: spacing[4].value, ...flattenStyle(style) }}>
      {topChildren}
      {label && (
        <RNText style={{ fontSize: spacing[14].value, fontWeight: "500", color: themed.textPrimary }} allowFontScaling={false}>
          {label}
          {isRequired && <RNText style={{ color: colors.danger.main.value }}>{" *"}</RNText>}
        </RNText>
      )}
      {hintTextIcon}
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={onPress ? 0.8 : 1}
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor,
          borderRadius: borderRadiusVal,
          backgroundColor: bgColor,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
          opacity: isDisabled ? 0.7 : 1,
          gap: spacing[8].value,
        }}
      >
        {leftIcon && (
          <TouchableOpacity onPress={onPressLeft}>{leftIcon}</TouchableOpacity>
        )}
        {leftPrefix && (
          <RNText style={{ color: themed.textSecondary, fontSize }} allowFontScaling={false}>{leftPrefix}</RNText>
        )}
        <TextInput
          style={{ flex: 1, color: textColor, fontSize, ...(inputStyle as Record<string, unknown>) }}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          editable={!isDisabled && editable !== false}
          onChangeText={(text: string) => {
            onChangeText?.(text);
            if (type === EInputType.MoneyAmount) onChangeMoneyAmount?.(text);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          maxLength={maxLength}
          multiline={isTextArea}
          numberOfLines={numberOfLines}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          testID={testID}
          accessibilityLabel={accessibilityLabel ?? label ?? testID}
          aria-disabled={isDisabled}
          allowFontScaling={false}
        />
        {rightPrefix && (
          <RNText style={{ color: themed.textSecondary, fontSize }} allowFontScaling={false}>{rightPrefix}</RNText>
        )}
        {rightIcon && (
          <TouchableOpacity onPress={onPressRight}>{rightIcon}</TouchableOpacity>
        )}
      </TouchableOpacity>
      {hasError && (
        <RNText style={{ fontSize: spacing[12].value, color: colors.danger.main.value }} allowFontScaling={false}>
          {errorMessage}
        </RNText>
      )}
    </View>
  );
};

Input.displayName = "Input";
export default Input;
