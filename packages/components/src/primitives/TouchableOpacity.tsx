/**
 * TouchableOpacity — pressable container that dims on press.
 *
 * style prop accepts CSSProperties, RN StyleSheet styles, plain objects,
 * AtomicStylesheet class strings, or arrays of any of these.
 */

import React, { useState } from "react";
import { Box } from "./Box";
import type { BoxProps, StyleProp } from "./Box";
import { flattenStyle } from "../shared/flattenStyle";
import { isWeb } from "../shared/platform";

export interface TouchableOpacityProps extends Omit<BoxProps, "style"> {
  onPress?: ((event: unknown) => void) | undefined;
  disabled?: boolean | undefined;
  activeOpacity?: number | undefined;
  style?: StyleProp;
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
  const [pressed, setPressed] = useState(false);

  const resolvedOpacity = disabled ? 0.4 : pressed ? activeOpacity : opacity;
  const resolvedCursor = disabled
    ? "not-allowed"
    : cursor ?? (onPress ? "pointer" : undefined);

  const flatCaller = flattenStyle(style);

  if (isWeb) {
    const webStyle: Record<string, unknown> = {
      transition: "opacity 0.1s",
      ...flatCaller,
    };

    return (
      <Box
        {...(disabled || !onPress ? {} : { onPress })}
        {...(resolvedOpacity !== undefined ? { opacity: resolvedOpacity } : {})}
        {...(resolvedCursor !== undefined ? { cursor: resolvedCursor } : {})}
        style={webStyle as React.CSSProperties}
        accessibilityState={
          rest.accessibilityState ??
          (disabled !== undefined ? { disabled } : undefined)
        }
        onMouseDown={disabled ? undefined : () => setPressed(true)}
        onMouseUp={disabled ? undefined : () => setPressed(false)}
        onMouseLeave={disabled ? undefined : () => setPressed(false)}
        onClick={onPress}
        {...rest}
      >
        {children}
      </Box>
    );
  }

  // React Native — delegate to RN's TouchableOpacity for native press feedback
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { TouchableOpacity: RNTouchableOpacity } = require("react-native") as {
    TouchableOpacity: React.ComponentType<Record<string, unknown>>;
  };

  const rnProps: Record<string, unknown> = {
    onPress: disabled ? undefined : onPress,
    disabled: !!disabled,
    activeOpacity,
    style:
      flatCaller && Object.keys(flatCaller).length > 0 ? flatCaller : undefined,
    accessibilityState:
      rest.accessibilityState ??
      (disabled !== undefined ? { disabled } : undefined),
    children,
  };

  if (rest.testID !== undefined) rnProps["testID"] = rest.testID;
  if (rest.accessibilityLabel !== undefined)
    rnProps["accessibilityLabel"] = rest.accessibilityLabel;

  return <RNTouchableOpacity {...rnProps} />;
};

TouchableOpacity.displayName = "TouchableOpacity";
export default TouchableOpacity;
