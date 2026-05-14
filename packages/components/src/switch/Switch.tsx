/**
 * Switch — animated toggle switch.
 * Root wrapper accepts BoxProps. Label rendered via <Text>.
 */

import React from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends Omit<BoxProps, "onChange" | "children"> {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
  activeColor?: string;
  inactiveColor?: string;
  label?: React.ReactNode;
  labelPosition?: "left" | "right";
  /** ETextType for the label text (when label is a string) */
  labelTextType?: ETextType;
  /** Style override for the label text */
  labelTextStyle?: StyleProp;
}

const TRACK: Record<SwitchSize, { w: number; h: number }> = {
  sm: { w: 32, h: 18 },
  md: { w: 44, h: 24 },
  lg: { w: 56, h: 30 },
};
const THUMB: Record<SwitchSize, number> = { sm: 12, md: 18, lg: 24 };

export const Switch: React.FC<SwitchProps> = ({
  value = false,
  onChange,
  disabled = false,
  size = "md",
  activeColor = colors.celurenBlue[400].value,
  inactiveColor = colors.beauBlue[300].value,
  label,
  labelPosition = "right",
  labelTextType = ETextType.SParagraphRegular,
  labelTextStyle,
  testID,
  accessibilityLabel,
  ...boxProps
}) => {
  const track = TRACK[size];
  const thumbSize = THUMB[size];
  const padding = (track.h - thumbSize) / 2;
  const thumbTravel = track.w - thumbSize - padding * 2;

  const handleToggle = () => {
    if (!disabled) onChange?.(!value);
  };

  if (isWeb) {
    const trackEl = (
      <span
        role="switch"
        aria-checked={value}
        aria-disabled={disabled}
        aria-label={accessibilityLabel}
        tabIndex={disabled ? -1 : 0}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            handleToggle();
          }
        }}
        style={{
          position: "relative",
          width: track.w,
          height: track.h,
          borderRadius: track.h / 2,
          backgroundColor: value ? activeColor : inactiveColor,
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background-color 0.2s ease",
          flexShrink: 0,
          opacity: disabled ? 0.5 : 1,
          boxSizing: "border-box",
          display: "inline-block",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: padding,
            left: value ? padding + thumbTravel : padding,
            width: thumbSize,
            height: thumbSize,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
            transition: "left 0.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </span>
    );

    return (
      <Box
        display="inline-flex"
        flexDirection={labelPosition === "left" ? "row-reverse" : "row"}
        alignItems="center"
        gap={10}
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          userSelect: "none",
        }}
        onClick={handleToggle}
        data-testid={testID}
        {...boxProps}
      >
        {trackEl}
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
  const { Switch: RNSwitch } = require("react-native") as {
    Switch: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <Box testID={testID} {...boxProps}>
      <RNSwitch
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{ false: inactiveColor, true: activeColor }}
        thumbColor="#ffffff"
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled }}
        accessibilityLabel={accessibilityLabel}
      />
    </Box>
  );
};

Switch.displayName = "Switch";
export default Switch;
