/**
 * TouchableOpacity — a pressable container that dims on press.
 * Drop-in replacement for RN's TouchableOpacity using our Box primitive.
 */
import React from "react";
import { Box, type BoxProps } from "./Box";

export interface TouchableOpacityProps extends BoxProps {
  onPress?: ((event: unknown) => void) | undefined;
  disabled?: boolean | undefined;
  activeOpacity?: number | undefined;
}

export const TouchableOpacity: React.FC<TouchableOpacityProps> = ({
  onPress,
  disabled,
  activeOpacity = 0.7,
  children,
  style,
  opacity,
  cursor,
  ...rest
}) => {
  const resolvedOpacity = disabled ? 0.4 : opacity;
  const resolvedCursor = disabled
    ? "not-allowed"
    : cursor ?? (onPress ? "pointer" : undefined);

  return (
    <Box
      {...(disabled || !onPress ? {} : { onPress })}
      {...(resolvedOpacity !== undefined ? { opacity: resolvedOpacity } : {})}
      cursor={resolvedCursor}
      style={{
        ...(typeof document !== "undefined" && onPress && !disabled
          ? { transition: "opacity 0.1s" }
          : {}),
        ...(style as React.CSSProperties | undefined),
      }}
      accessibilityState={
        rest.accessibilityState ??
        (disabled !== undefined ? { disabled } : undefined)
      }
      {...rest}
    >
      {children}
    </Box>
  );
};

TouchableOpacity.displayName = "TouchableOpacity";
export default TouchableOpacity;
