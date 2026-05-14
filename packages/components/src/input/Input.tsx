/**
 * Input — beautiful, polished text input component.
 * Improved: floating focus ring, smooth transitions, refined typography.
 */

import React, { useState } from "react";
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import { ELabelsType, EHintTextType } from "../shared/types";
import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from "../shared/flattenStyle";

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
  Lg = "Lg",
}

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
  hintText?: string;
  hintTextIcon?: React.ReactNode;
  hintTextType?: EHintTextType;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
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
  hintText,
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
  const [isFocused, setIsFocused] = useState(false);

  const isTextArea = type === EInputType.TextArea || multiline;
  const isSmall = size === EInputSize.Sm;
  const isLarge = size === EInputSize.Lg;
  const hasError = !!errorMessage;

  const borderColor = hasError
    ? colors.crimsonRed[500].value
    : isFocused
    ? colors.celurenBlue[400].value
    : isDisabled
    ? themed.borderSecondary
    : themed.borderDefault;

  const bgColor = isDisabled ? themed.bgDisabled : themed.surface;
  const textColor = isDisabled ? themed.textDisabled : themed.textPrimary;

  const paddingV = isSmall ? 7 : isLarge ? 13 : 10;
  const paddingH = isSmall ? 10 : isLarge ? 16 : 12;
  const fontSize = isSmall ? 13 : isLarge ? 16 : 14;
  const borderRadiusVal = isSmall ? radius.md.value : radius.lg.value;

  if (isWeb) {
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      onChange?.(e);
      onChangeText?.(e.target.value);
      if (type === EInputType.MoneyAmount)
        onChangeMoneyAmount?.(e.target.value);
    };

    const handleFocus = () => {
      setIsFocused(true);
      onFocus?.();
    };
    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    const focusRing =
      isFocused && !hasError
        ? `0 0 0 3px ${colors.celurenBlue[25].value}`
        : hasError && isFocused
        ? `0 0 0 3px ${colors.crimsonRed[50].value}`
        : "none";

    const sharedInputStyle: React.CSSProperties = {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      color: textColor,
      fontSize,
      fontFamily: "Inter, system-ui, sans-serif",
      lineHeight: 1.5,
      cursor: isDisabled ? "not-allowed" : undefined,
      ...(inputStyle as React.CSSProperties),
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          fontFamily: "Inter, system-ui, sans-serif",
          ...flattenStyle(style),
        }}
        onClick={onPress}
      >
        {topChildren}
        {label && (
          <label
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: themed.textPrimary,
              letterSpacing: "0.01em",
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            {label}
            {isRequired && (
              <span style={{ color: colors.crimsonRed[500].value }}>*</span>
            )}
          </label>
        )}
        {(hintText || hintTextIcon) && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              color: themed.textSecondary,
            }}
          >
            {hintTextIcon}
            {hintText}
          </span>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: isTextArea ? "flex-start" : "center",
            border: `1.5px solid ${borderColor}`,
            borderRadius: borderRadiusVal,
            backgroundColor: bgColor,
            paddingTop: paddingV,
            paddingBottom: paddingV,
            paddingLeft: paddingH,
            paddingRight: paddingH,
            cursor: isDisabled
              ? "not-allowed"
              : onPress
              ? "pointer"
              : undefined,
            opacity: isDisabled ? 0.65 : 1,
            gap: 8,
            transition: "border-color 0.18s ease, box-shadow 0.18s ease",
            boxShadow: focusRing,
            boxSizing: "border-box",
          }}
        >
          {leftIcon && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: themed.textSecondary,
                flexShrink: 0,
                cursor: onPressLeft ? "pointer" : undefined,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onPressLeft?.();
              }}
            >
              {leftIcon}
            </span>
          )}
          {leftPrefix && (
            <span
              style={{
                color: themed.textSecondary,
                fontSize,
                flexShrink: 0,
                fontWeight: "500",
              }}
            >
              {leftPrefix}
            </span>
          )}
          {isTextArea ? (
            <textarea
              style={{
                ...sharedInputStyle,
                resize: "none",
                minHeight: (numberOfLines ?? 3) * (fontSize * 1.5),
                paddingTop: 2,
              }}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              disabled={isDisabled || editable === false}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              maxLength={maxLength}
              autoFocus={autoFocus}
              data-testid={testID}
              aria-label={accessibilityLabel ?? label ?? testID}
              aria-disabled={isDisabled}
              aria-invalid={hasError}
            />
          ) : (
            <input
              style={sharedInputStyle}
              type={
                secureTextEntry
                  ? "password"
                  : type === EInputType.Number
                  ? "number"
                  : "text"
              }
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              disabled={isDisabled || editable === false}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              maxLength={maxLength}
              autoFocus={autoFocus}
              data-testid={testID}
              aria-label={accessibilityLabel ?? label ?? testID}
              aria-disabled={isDisabled}
              aria-invalid={hasError}
            />
          )}
          {rightPrefix && (
            <span
              style={{
                color: themed.textSecondary,
                fontSize,
                flexShrink: 0,
                fontWeight: "500",
              }}
            >
              {rightPrefix}
            </span>
          )}
          {rightIcon && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: themed.textSecondary,
                flexShrink: 0,
                cursor: onPressRight ? "pointer" : undefined,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onPressRight?.();
              }}
            >
              {rightIcon}
            </span>
          )}
        </div>
        {hasError && (
          <span
            style={{
              fontSize: 12,
              color: colors.crimsonRed[500].value,
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontWeight: "500",
            }}
          >
            {errorMessage}
          </span>
        )}
      </div>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { TextInput, Text: RNText } = require("react-native") as {
    TextInput: React.ComponentType<Record<string, unknown>>;
    Text: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <View style={{ gap: spacing[4].value, ...flattenStyle(style) }}>
      {topChildren}
      {label && (
        <RNText
          style={{ fontSize: 13, fontWeight: "600", color: themed.textPrimary }}
          allowFontScaling={false}
        >
          {label}
          {isRequired && (
            <RNText style={{ color: colors.crimsonRed[500].value }}>
              {" *"}
            </RNText>
          )}
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
          borderWidth: 1.5,
          borderColor,
          borderRadius: borderRadiusVal,
          backgroundColor: bgColor,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
          opacity: isDisabled ? 0.65 : 1,
          gap: 8,
        }}
      >
        {leftIcon && (
          <TouchableOpacity onPress={onPressLeft}>{leftIcon}</TouchableOpacity>
        )}
        {leftPrefix && (
          <RNText
            style={{ color: themed.textSecondary, fontSize }}
            allowFontScaling={false}
          >
            {leftPrefix}
          </RNText>
        )}
        <TextInput
          style={{
            flex: 1,
            color: textColor,
            fontSize,
            ...(inputStyle as Record<string, unknown>),
          }}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          placeholderTextColor={themed.textPlaceholder}
          editable={!isDisabled && editable !== false}
          onChangeText={(text: string) => {
            onChangeText?.(text);
            if (type === EInputType.MoneyAmount) onChangeMoneyAmount?.(text);
          }}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          maxLength={maxLength}
          multiline={isTextArea}
          numberOfLines={numberOfLines}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          testID={testID}
          accessibilityLabel={accessibilityLabel ?? label ?? testID}
          allowFontScaling={false}
        />
        {rightPrefix && (
          <RNText
            style={{ color: themed.textSecondary, fontSize }}
            allowFontScaling={false}
          >
            {rightPrefix}
          </RNText>
        )}
        {rightIcon && (
          <TouchableOpacity onPress={onPressRight}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {hasError && (
        <RNText
          style={{
            fontSize: 12,
            color: colors.crimsonRed[500].value,
            fontWeight: "500",
          }}
          allowFontScaling={false}
        >
          {errorMessage}
        </RNText>
      )}
    </View>
  );
};

Input.displayName = "Input";
export default Input;
