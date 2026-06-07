/**
 * Input — beautiful, polished text input component.
 * Label, hint, and error rendered via <Text> component.
 */

import React, { useState } from "react";
import { spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import { ELabelsType, EHintTextType } from "../shared/types";
import { isWeb } from "../shared/platform";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from "../shared/flattenStyle";
import { Text, ETextType } from "../primitives/Text";
import type { StyleProp } from "../primitives/Box";
import { EInputType, EInputSize } from "./Input.types";
import {
  SIZE_PADDING_V,
  SIZE_PADDING_H,
  SIZE_FONT,
  SIZE_BORDER_RADIUS,
} from "./Input.style";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import type { SzrFC } from "../shared/types";
import { useSx, SxStyleTag } from "../shared/useSx";

export { EInputType, EInputSize };
export { ELabelsType, EHintTextType };

export interface IInputProps extends BoxLayoutProps {
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
  /** ETextType for the label text */
  labelTextType?: ETextType;
  /** Style override for the label text */
  labelTextStyle?: StyleProp;
  /** ETextType for the hint text */
  hintTextTypeOverride?: ETextType;
  /** Style override for the hint text */
  hintTextStyleOverride?: StyleProp;
  /** ETextType for the error message text */
  errorTextType?: ETextType;
  /** Style override for the error message text */
  errorTextStyle?: StyleProp;
}

export const Input: SzrFC<IInputProps> = (props) => {
  const { sxProps, rest: inputRest } = extractBoxLayoutProps(props);
  const sx = sxProps as import("../shared/sx").SxProp;
  const { sxStyle, sxClassName, sxCss } = useSx(sx);

  // Cast rest back to the component-specific props — extractBoxLayoutProps strips
  // layout keys at runtime; this cast is sound.
  const {
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
    labelTextType = ETextType.XSLabel,
    labelTextStyle,
    hintTextTypeOverride = ETextType.XSParagraphRegular,
    hintTextStyleOverride,
    errorTextType = ETextType.XSParagraphMedium,
    errorTextStyle,
  } = inputRest as IInputProps;
  const themed = useThemedColors();
  const [isFocused, setIsFocused] = useState(false);

  const isTextArea = type === EInputType.TextArea || multiline;
  const hasError = !!errorMessage;

  const borderColor = hasError
    ? themed.colorDanger
    : isFocused
    ? themed.borderPrimaryBrand
    : isDisabled
    ? themed.borderSecondary
    : themed.borderDefault;

  const bgColor = isDisabled ? themed.bgDisabled : themed.surface;
  const textColor = isDisabled ? themed.textDisabled : themed.textPrimary;

  const paddingV = SIZE_PADDING_V[size];
  const paddingH = SIZE_PADDING_H[size];
  const fontSize = SIZE_FONT[size];
  const borderRadiusVal = SIZE_BORDER_RADIUS[size];

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
        ? themed.focusRing
        : hasError && isFocused
        ? themed.focusRingError
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

    const webContent = (
      <div
        className={sxClassName || undefined}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          ...flattenStyle(style),
          ...sxStyle,
        }}
        onClick={onPress}
      >
        {topChildren}
        {label && (
          <label style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Text
              type={labelTextType}
              text={label}
              color={themed.textPrimary}
              style={{
                letterSpacing: "0.01em",
                ...(labelTextStyle as React.CSSProperties),
              }}
            />
            {isRequired && (
              <Text
                type={ETextType.XSLabel}
                text="*"
                color={themed.colorDanger}
              />
            )}
          </label>
        )}
        {(hintText || hintTextIcon) && (
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {hintTextIcon}
            {hintText && (
              <Text
                type={hintTextTypeOverride}
                text={hintText}
                color={themed.textSecondary}
                style={hintTextStyleOverride as React.CSSProperties}
              />
            )}
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
            <Text
              type={ETextType.SParagraphMedium}
              text={leftPrefix}
              color={themed.textSecondary}
              style={{ flexShrink: 0, fontSize }}
            />
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
            <Text
              type={ETextType.SParagraphMedium}
              text={rightPrefix}
              color={themed.textSecondary}
              style={{ flexShrink: 0, fontSize }}
            />
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
          <Text
            type={errorTextType}
            text={errorMessage!}
            color={themed.colorDanger}
            style={{
              fontWeight: "500",
              ...(errorTextStyle as React.CSSProperties),
            }}
          />
        )}
      </div>
    );

    if (sxCss && isWeb)
      return (
        <>
          {/* @ts-ignore */}
          <SxStyleTag css={sxCss} scopeClass={sxClassName} />
          {webContent}
        </>
      );
    return webContent;
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { TextInput, View } = require("react-native") as {
    TextInput: React.ComponentType<Record<string, unknown>>;
    View: React.ComponentType<Record<string, unknown>>;
  };

  const nativeContent = (
    <View style={{ gap: spacing[4].value, ...flattenStyle(style), ...sxStyle }}>
      {topChildren}
      {label && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
          <Text
            type={labelTextType}
            text={label}
            color={themed.textPrimary}
            style={labelTextStyle as Record<string, unknown>}
          />
          {isRequired && (
            <Text
              type={ETextType.XSLabel}
              text=" *"
              color={themed.colorDanger}
            />
          )}
        </View>
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
          <Text
            type={ETextType.SParagraphMedium}
            text={leftPrefix}
            color={themed.textSecondary}
            style={{ fontSize }}
          />
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
          <Text
            type={ETextType.SParagraphMedium}
            text={rightPrefix}
            color={themed.textSecondary}
            style={{ fontSize }}
          />
        )}
        {rightIcon && (
          <TouchableOpacity onPress={onPressRight}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {hasError && (
        <Text
          type={errorTextType}
          text={errorMessage!}
          color={themed.colorDanger}
          style={{
            fontWeight: "500",
            ...(errorTextStyle as Record<string, unknown>),
          }}
        />
      )}
    </View>
  );
  return nativeContent;
};

Input.displayName = "Input";
export default Input;
