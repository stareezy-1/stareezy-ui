/**
 * TouchableOpacity — pressable container that dims on press.
 *
 * style prop accepts CSSProperties, RN StyleSheet styles, plain objects,
 * AtomicStylesheet class strings, or arrays of any of these.
 */

import React, { useState } from "react";
import type { GestureResponderEvent } from "react-native";
import { Box } from "./Box";
import type { BoxProps, StyleProp } from "./Box";
import { flattenStyle } from "../shared/flattenStyle";
import { isWeb } from "../shared/platform";
import { ETouchableType } from "./TouchableOpacity.types";
import { TOUCHABLE_PRESETS } from "./TouchableOpacity.presets";

export { ETouchableType } from "./TouchableOpacity.types";

export interface TouchableOpacityProps
  extends Omit<BoxProps, "style" | "type"> {
  onPress?:
    | React.MouseEventHandler<HTMLDivElement>
    | ((event: import("react-native").GestureResponderEvent) => void)
    | (() => void)
    | undefined;
  disabled?: boolean | undefined;
  activeOpacity?: number | undefined;
  style?: StyleProp;
  /** Applies a preset style combination. Explicit props override preset values. */
  type?: ETouchableType;
}

export const TouchableOpacity: React.FC<TouchableOpacityProps> = ({
  onPress,
  disabled,
  activeOpacity = 0.7,
  children,
  style,
  opacity,
  cursor,
  type,
  ...rest
}) => {
  const [pressed, setPressed] = useState(false);

  const resolvedOpacity = disabled ? 0.4 : pressed ? activeOpacity : opacity;
  const resolvedCursor = disabled
    ? "not-allowed"
    : cursor ?? (onPress ? "pointer" : undefined);

  // Resolve preset styles from the type prop (if provided)
  const presetStyle: Record<string, unknown> = type
    ? TOUCHABLE_PRESETS[type]
    : {};

  const flatCaller = flattenStyle(style);

  if (isWeb) {
    // Merge order: preset → explicit shorthand props (via Box) → style prop
    const webStyle: Record<string, unknown> = {
      transition: "opacity 0.1s",
      ...presetStyle,
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
        {...(onPress !== undefined
          ? { onClick: onPress as React.MouseEventHandler<HTMLDivElement> }
          : {})}
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

  // Merge order: preset → caller style prop
  const rnStyleParts: Array<Record<string, unknown>> = [];
  if (Object.keys(presetStyle).length > 0) rnStyleParts.push(presetStyle);
  if (flatCaller && Object.keys(flatCaller).length > 0)
    rnStyleParts.push(flatCaller);

  const rnProps: Record<string, unknown> = {
    onPress: disabled ? undefined : onPress,
    disabled: !!disabled,
    activeOpacity,
    style: rnStyleParts.length > 0 ? rnStyleParts : undefined,
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
