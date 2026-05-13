/**
 * Dropdown — select/picker component with search, multi-select, and clear support.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 17.1, 17.3
 */

import React, { useState } from "react";
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from '../shared/flattenStyle';

export interface OptionProps<T = unknown> {
  id?: string | number;
  label?: string;
  status?: boolean;
  value: string | number;
  values?: string[];
  objectValue?: T;
  optionValues?: OptionProps<T>[];
  secondValue?: string | number;
  thirdValue?: string | number;
  rightIcon?: unknown;
  leftIcon?: unknown;
}

export interface DropdownProps<T = unknown> {
  testID?: string;
  isRequired?: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  options: OptionProps<T>[];
  filteredOptions?: OptionProps<T>[];
  value?: string;
  errorMessage?: string;
  onSelected?: (value: OptionProps<T>, isReset?: boolean) => void;
  onRightIconPress?: (value: OptionProps<T>) => void;
  onLeftIconPress?: (value: OptionProps<T>) => void;
  isSearch?: boolean;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isDisabled?: boolean;
  isCheckbox?: boolean;
  withConfirmationButtton?: boolean;
  withClearButton?: boolean;
  selectedItems?: string[];
  selectedOptionItems?: OptionProps<T>[];
  style?: React.CSSProperties | Record<string, unknown>;
  dropDownStyle?: React.CSSProperties | Record<string, unknown>;
  onEndReachedThreshold?: number;
  onClearPress?: () => void;
  leftIconTooltipStandalone?: (value: OptionProps<T>) => React.ReactNode;
  handlerOnEndReached?: ((info: { distanceFromEnd: number }) => void) | null;
  isClearable?: boolean;
  onClear?: () => void;
  clearButtonText?: string;
  confirmationButtonText?: string;
  forceShowError?: boolean;
  onFocus?: () => void;
  isValueResetable?: boolean;
}

export function Dropdown<T = unknown>({
  testID,
  isRequired,
  disabled,
  label,
  placeholder = "Select...",
  options,
  filteredOptions,
  value,
  errorMessage,
  onSelected,
  isSearch,
  onSearchChange,
  searchPlaceholder,
  leftIcon,
  rightIcon,
  isDisabled,
  isCheckbox,
  withClearButton,
  selectedItems,
  style,
  dropDownStyle,
  onClearPress,
  isClearable,
  onClear,
  clearButtonText = "Clear",
  confirmationButtonText = "Confirm",
  withConfirmationButtton,
  forceShowError,
  onFocus,
}: DropdownProps<T>): React.ReactElement {
  const themed = useThemedColors();
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const effectiveDisabled = disabled || isDisabled;
  const hasError = !!errorMessage || forceShowError;
  const displayOptions = filteredOptions ?? options;
  const filteredBySearch = isSearch && searchText
    ? displayOptions.filter((o) =>
        (o.label ?? String(o.value)).toLowerCase().includes(searchText.toLowerCase())
      )
    : displayOptions;

  const selectedOption = options.find((o) => String(o.value) === value);
  const displayValue = selectedOption?.label ?? selectedOption?.value ?? "";

  const borderColor = hasError
    ? themed.borderDanger
    : effectiveDisabled
    ? themed.borderSecondary
    : isOpen
    ? themed.borderPrimaryBrand
    : themed.borderDefault;

  if (isWeb) {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", gap: spacing[4].value, position: "relative", ...flattenStyle(style) }}
        data-testid={testID}
      >
        {label && (
          <label style={{ fontSize: spacing[14].value, fontWeight: "500", color: themed.textPrimary }}>
            {label}
            {isRequired && <span style={{ color: colors.danger.main.value, marginLeft: spacing[2].value }}>*</span>}
          </label>
        )}
        <div
          role="combobox"
          aria-expanded={isOpen}
          aria-disabled={effectiveDisabled}
          aria-label={label ?? testID ?? "dropdown"}
          aria-busy={false}
          tabIndex={effectiveDisabled ? -1 : 0}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor,
            borderRadius: radius.md.value,
            backgroundColor: effectiveDisabled ? themed.bgDisabled : themed.surface,
            padding: spacing[12].value,
            cursor: effectiveDisabled ? "not-allowed" : "pointer",
            opacity: effectiveDisabled ? 0.7 : 1,
            gap: spacing[8].value,
          }}
          onClick={() => {
            if (!effectiveDisabled) {
              setIsOpen((prev) => !prev);
              onFocus?.();
            }
          }}
          onKeyDown={(e) => {
            if (!effectiveDisabled && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }
          }}
        >
          {leftIcon && <span style={{ display: "flex", alignItems: "center" }}>{leftIcon}</span>}
          <span style={{ flex: 1, fontSize: spacing[14].value, color: displayValue ? themed.textPrimary : themed.textPlaceholder }}>
            {displayValue || placeholder}
          </span>
          {(isClearable || withClearButton) && displayValue && (
            <span
              style={{ cursor: "pointer", fontSize: spacing[12].value, color: themed.textSecondary }}
              onClick={(e) => { e.stopPropagation(); onClear?.(); onClearPress?.(); }}
            >
              {clearButtonText}
            </span>
          )}
          {rightIcon ?? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: isOpen ? "rotate(180deg)" : undefined, transition: "transform 0.2s" }}>
              <path d="M4 6L8 10L12 6" stroke={themed.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        {isOpen && (
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: themed.surface,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: themed.borderDefault,
            borderRadius: radius.md.value,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxHeight: 240,
            overflowY: "auto",
            marginTop: spacing[4].value,
            ...(dropDownStyle as React.CSSProperties),
          }}>
            {isSearch && (
              <div style={{ padding: spacing[8].value, borderBottom: `1px solid ${themed.borderDefault}` }}>
                <input
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    fontSize: spacing[14].value,
                    color: themed.textPrimary,
                    backgroundColor: "transparent",
                    boxSizing: "border-box",
                  }}
                  placeholder={searchPlaceholder ?? "Search..."}
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    onSearchChange?.(e.target.value);
                  }}
                  aria-label="search options"
                />
              </div>
            )}
            {filteredBySearch.map((option) => {
              const optLabel = option.label ?? String(option.value);
              const isSelected = isCheckbox
                ? selectedItems?.includes(String(option.value))
                : String(option.value) === value;
              return (
                <div
                  key={String(option.id ?? option.value)}
                  role="option"
                  aria-selected={isSelected}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: spacing[12].value,
                    cursor: "pointer",
                    backgroundColor: isSelected ? themed.bgSecondary : "transparent",
                    gap: spacing[8].value,
                  }}
                  onClick={() => {
                    onSelected?.(option);
                    if (!isCheckbox && !withConfirmationButtton) setIsOpen(false);
                  }}
                >
                  {isCheckbox && (
                    <div style={{
                      width: 16,
                      height: 16,
                      borderRadius: radius.xs.value,
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: isSelected ? themed.borderPrimaryBrand : themed.borderDefault,
                      backgroundColor: isSelected ? themed.borderPrimaryBrand : "transparent",
                      flexShrink: 0,
                    }} />
                  )}
                  <span style={{ fontSize: spacing[14].value, color: themed.textPrimary }}>{optLabel}</span>
                </div>
              );
            })}
            {withConfirmationButtton && (
              <div style={{ padding: spacing[8].value, borderTop: `1px solid ${themed.borderDefault}` }}>
                <button
                  style={{
                    width: "100%",
                    padding: spacing[8].value,
                    backgroundColor: themed.borderPrimaryBrand,
                    color: themed.surface,
                    border: "none",
                    borderRadius: radius.md.value,
                    cursor: "pointer",
                    fontSize: spacing[14].value,
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {confirmationButtonText}
                </button>
              </div>
            )}
          </div>
        )}
        {hasError && (
          <span style={{ fontSize: spacing[12].value, color: colors.danger.main.value }}>
            {errorMessage}
          </span>
        )}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText, ScrollView, TextInput } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>; ScrollView: React.ComponentType<Record<string, unknown>>; TextInput: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <View style={{ gap: spacing[4].value, ...flattenStyle(style) }}>
      {label && (
        <RNText style={{ fontSize: spacing[14].value, fontWeight: "500", color: themed.textPrimary }} allowFontScaling={false}>
          {label}
          {isRequired && <RNText style={{ color: colors.danger.main.value }}>{" *"}</RNText>}
        </RNText>
      )}
      <TouchableOpacity
        onPress={() => { if (!effectiveDisabled) { setIsOpen((p) => !p); onFocus?.(); } }}
        disabled={effectiveDisabled}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: isOpen, disabled: !!effectiveDisabled }}
        accessibilityLabel={label ?? testID ?? "dropdown"}
        {...(effectiveDisabled !== undefined ? { "aria-disabled": effectiveDisabled } : {})}
        {...(testID !== undefined ? { testID } : {})}
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor,
          borderRadius: radius.md.value,
          backgroundColor: effectiveDisabled ? themed.bgDisabled : themed.surface,
          padding: spacing[12].value,
          opacity: effectiveDisabled ? 0.7 : 1,
          gap: spacing[8].value,
        }}
      >
        {leftIcon}
        <RNText style={{ flex: 1, fontSize: spacing[14].value, color: displayValue ? themed.textPrimary : themed.textPlaceholder }} allowFontScaling={false}>
          {displayValue || placeholder}
        </RNText>
      </TouchableOpacity>
      {isOpen && (
        <View style={{ borderWidth: 1, borderColor: themed.borderDefault, borderRadius: radius.md.value, backgroundColor: themed.surface, maxHeight: 240, ...(dropDownStyle as Record<string, unknown>) }}>
          {isSearch && (
            <TextInput
              style={{ padding: spacing[8].value, fontSize: spacing[14].value, color: themed.textPrimary, borderBottomWidth: 1, borderBottomColor: themed.borderDefault }}
              placeholder={searchPlaceholder ?? "Search..."}
              value={searchText}
              onChangeText={(t: string) => { setSearchText(t); onSearchChange?.(t); }}
              allowFontScaling={false}
            />
          )}
          <ScrollView>
            {filteredBySearch.map((option) => {
              const optLabel = option.label ?? String(option.value);
              const isSelected = String(option.value) === value;
              return (
                <TouchableOpacity
                  key={String(option.id ?? option.value)}
                  onPress={() => { onSelected?.(option); if (!isCheckbox) setIsOpen(false); }}
                  accessibilityRole="option"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={optLabel}
                  style={{ padding: spacing[12].value, backgroundColor: isSelected ? themed.bgSecondary : "transparent" }}
                >
                  <RNText style={{ fontSize: spacing[14].value, color: themed.textPrimary }} allowFontScaling={false}>
                    {optLabel}
                  </RNText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
      {hasError && (
        <RNText style={{ fontSize: spacing[12].value, color: colors.danger.main.value }} allowFontScaling={false}>
          {errorMessage}
        </RNText>
      )}
    </View>
  );
}

Dropdown.displayName = "Dropdown";
export default Dropdown;
