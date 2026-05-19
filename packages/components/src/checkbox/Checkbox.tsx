/**
 * Checkbox — animated checkbox with indeterminate state.
 * Root wrapper accepts BoxProps. Label rendered via <Text>.
 */

import React from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";
import type { CheckboxSize } from "./Checkbox.types";

export type { CheckboxSize };

export interface CheckboxProps extends Omit<BoxProps, "onChange" | "children"> {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  labelPosition?: "left" | "right";
  disabled?: boolean;
  size?: CheckboxSize;
  color?: string;
  /** ETextType for the label text (when label is a string) */
  labelTextType?: ETextType;
  /** Style override for the label text */
  labelTextStyle?: StyleProp;
}

const SIZE_PX: Record<CheckboxSize, number> = { sm: 16, md: 20, lg: 24 };

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  labelPosition = "right",
  disabled = false,
  size = "md",
  color = colors.celurenBlue[400].value,
  labelTextType = ETextType.SParagraphRegular,
  labelTextStyle,
  testID,
  accessibilityLabel,
  ...boxProps
}) => {
  const px = SIZE_PX[size];
  const isChecked = checked || indeterminate;

  const handleChange = () => {
    if (!disabled) onChange?.(!checked);
  };

  if (isWeb) {
    const boxEl = (
      <span
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : checked}
        aria-disabled={disabled}
        aria-label={accessibilityLabel}
        tabIndex={disabled ? -1 : 0}
        onClick={handleChange}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            handleChange();
          }
        }}
        style={{
          width: px,
          height: px,
          borderRadius: Math.round(px * 0.2),
          border: `2px solid ${isChecked ? color : colors.beauBlue[400].value}`,
          backgroundColor: isChecked ? color : "transparent",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          cursor: disabled ? "not-allowed" : "pointer",
          transition:
            "background-color 0.15s ease, border-color 0.15s ease, transform 0.1s ease",
          transform: isChecked ? "scale(1)" : "scale(0.95)",
          opacity: disabled ? 0.5 : 1,
          boxSizing: "border-box",
        }}
      >
        {indeterminate ? (
          <span
            style={{
              width: px * 0.5,
              height: 2,
              backgroundColor: "#fff",
              borderRadius: 1,
            }}
          />
        ) : checked ? (
          <svg
            width={px * 0.55}
            height={px * 0.55}
            viewBox="0 0 12 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 5L4.5 8.5L11 1.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
    );

    return (
      <Box
        display="inline-flex"
        flexDirection={labelPosition === "left" ? "row-reverse" : "row"}
        alignItems="center"
        gap={Math.round(px * 0.4)}
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          userSelect: "none",
        }}
        onClick={handleChange}
        data-testid={testID}
        {...boxProps}
      >
        {boxEl}
        {label &&
          (typeof label === "string" ? (
            <Text
              type={labelTextType}
              text={label}
              color={
                disabled
                  ? colors.beauBlue[600].value
                  : colors.raisinBlack[800].value
              }
              style={{
                lineHeight: 1.5,
                ...(labelTextStyle as React.CSSProperties),
              }}
            />
          ) : (
            label
          ))}
      </Box>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { TouchableOpacity, View } = require("react-native") as {
    TouchableOpacity: React.ComponentType<Record<string, unknown>>;
    View: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <Box testID={testID} {...boxProps}>
      <TouchableOpacity
        onPress={handleChange}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: indeterminate ? "mixed" : checked,
          disabled,
        }}
        accessibilityLabel={accessibilityLabel}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: Math.round(px * 0.4),
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <View
          style={{
            width: px,
            height: px,
            borderRadius: Math.round(px * 0.2),
            borderWidth: 2,
            borderColor: isChecked ? color : colors.beauBlue[400].value,
            backgroundColor: isChecked ? color : "transparent",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {checked && !indeterminate && (
            <Text
              text="✓"
              color="#fff"
              style={{ fontSize: px * 0.55, fontWeight: "700" }}
            />
          )}
          {indeterminate && (
            <View
              style={{
                width: px * 0.5,
                height: 2,
                backgroundColor: "#fff",
                borderRadius: 1,
              }}
            />
          )}
        </View>
        {label &&
          (typeof label === "string" ? (
            <Text
              type={labelTextType}
              text={label}
              color={colors.raisinBlack[800].value}
              style={labelTextStyle as Record<string, unknown>}
            />
          ) : (
            label
          ))}
      </TouchableOpacity>
    </Box>
  );
};

Checkbox.displayName = "Checkbox";
export default Checkbox;
