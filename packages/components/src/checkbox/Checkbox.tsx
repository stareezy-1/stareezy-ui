/**
 * Checkbox — renders a checkbox square with checked/unchecked/indeterminate states.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 17.1, 17.3
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export type CheckboxStatus = "checked" | "unchecked" | "indeterminate";

export interface ICheckboxProps {
  status: CheckboxStatus;
  checkedColor?: string;
  onPress?(e: unknown): void;
  disabled?: boolean;
}

const CHECKBOX_SIZE = spacing[20].value;

export const Checkbox: React.FC<ICheckboxProps> = ({
  status,
  checkedColor,
  onPress,
  disabled,
}) => {
  const themed = useThemedColors();

  const isChecked = status === "checked";
  const isIndeterminate = status === "indeterminate";
  const isActive = isChecked || isIndeterminate;

  const resolvedCheckedColor = checkedColor ?? themed.borderPrimaryBrand;
  const borderColor = isActive ? resolvedCheckedColor : themed.borderDefault;
  const bgColor = isActive ? resolvedCheckedColor : themed.surface;

  if (isWeb) {
    return (
      <div
        role="checkbox"
        aria-checked={isIndeterminate ? "mixed" : isChecked}
        {...(disabled !== undefined ? { "aria-disabled": disabled } : {})}
        tabIndex={disabled ? -1 : 0}
        aria-label="checkbox"
        style={{
          width: CHECKBOX_SIZE,
          height: CHECKBOX_SIZE,
          borderRadius: radius.xs.value,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor,
          backgroundColor: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          flexShrink: 0,
          boxSizing: "border-box",
        }}
        onClick={(e) => { if (!disabled) onPress?.(e); }}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onPress?.(e);
          }
        }}
      >
        {isChecked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {isIndeterminate && (
          <div style={{ width: 10, height: 2, backgroundColor: "white", borderRadius: 1 }} />
        )}
      </div>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => { if (!disabled) onPress?.(undefined); }}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isIndeterminate ? "mixed" : isChecked, disabled: !!disabled }}
      accessibilityLabel="checkbox"
      {...(disabled !== undefined ? { "aria-disabled": disabled } : {})}
      style={{
        width: CHECKBOX_SIZE,
        height: CHECKBOX_SIZE,
        borderRadius: radius.xs.value,
        borderWidth: 2,
        borderColor,
        backgroundColor: bgColor,
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {isIndeterminate && (
        <View style={{ width: 10, height: 2, backgroundColor: "white", borderRadius: 1 }} />
      )}
    </TouchableOpacity>
  );
};

Checkbox.displayName = "Checkbox";
export default Checkbox;
