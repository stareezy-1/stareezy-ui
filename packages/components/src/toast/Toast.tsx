/**
 * Toast — simple toast notification component with helper functions.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export interface ToastPropType {
  rightComponent?: React.ReactNode;
  rightButtonText?: string;
  onRightButtonPress?(): void;
}

// ---------------------------------------------------------------------------
// Internal toast state (simple singleton for web; RN uses a library shim)
// ---------------------------------------------------------------------------

type ToastVariant = "success" | "info" | "warning" | "error";

interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
  props?: ToastPropType;
}

let _listeners: Array<(msg: ToastMessage | null) => void> = [];
let _current: ToastMessage | null = null;

function notify(msg: ToastMessage | null) {
  _current = msg;
  _listeners.forEach((l) => l(msg));
}

function showToast(message: string, variant: ToastVariant, props?: ToastPropType) {
  const id = Math.random().toString(36).slice(2);
  const msg: ToastMessage = props !== undefined ? { id, message, variant, props } : { id, message, variant };
  notify(msg);
  setTimeout(() => notify(null), 3500);
}

export function ToastSuccess(message: string, props?: ToastPropType) {
  showToast(message, "success", props);
}

export function ToastInfo(message: string, props?: ToastPropType) {
  showToast(message, "info", props);
}

export function ToastWarning(message: string, props?: ToastPropType) {
  showToast(message, "warning", props);
}

export function ToastError(message: string, props?: ToastPropType) {
  showToast(message, "error", props);
}

// ---------------------------------------------------------------------------
// Toast component — renders the active toast
// ---------------------------------------------------------------------------

function getVariantColors(variant: ToastVariant): { bg: string; text: string; border: string } {
  switch (variant) {
    case "success":
      return { bg: colors.success.surface.value, text: colors.success.main.value, border: colors.success.border.value };
    case "warning":
      return { bg: colors.caution.surface.value, text: colors.caution.main.value, border: colors.caution.border.value };
    case "error":
      return { bg: colors.danger.surface.value, text: colors.danger.main.value, border: colors.danger.border.value };
    default:
      return { bg: colors.celurenBlue[25].value, text: colors.celurenBlue[500].value, border: colors.celurenBlue[100].value };
  }
}

export const Toast: React.FC<ToastPropType> = ({
  rightComponent,
  rightButtonText,
  onRightButtonPress,
}) => {
  const themed = useThemedColors();
  const [current, setCurrent] = React.useState<ToastMessage | null>(_current);

  React.useEffect(() => {
    const listener = (msg: ToastMessage | null) => setCurrent(msg);
    _listeners.push(listener);
    return () => {
      _listeners = _listeners.filter((l) => l !== listener);
    };
  }, []);

  if (!current) return null;

  const variantColors = getVariantColors(current.variant);

  if (isWeb) {
    return (
      <div
        role="alert"
        aria-live="polite"
        style={{
          position: "fixed",
          bottom: spacing[24].value,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: variantColors.bg,
          border: `1px solid ${variantColors.border}`,
          borderRadius: radius.xl.value,
          padding: `${spacing[12].value}px ${spacing[16].value}px`,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[8].value,
          zIndex: 10000,
          minWidth: 200,
          maxWidth: 400,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <span style={{ flex: 1, fontSize: spacing[14].value, color: variantColors.text }}>
          {current.message}
        </span>
        {rightComponent ?? (rightButtonText && (
          <button
            type="button"
            onClick={onRightButtonPress ?? current.props?.onRightButtonPress}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: spacing[12].value,
              fontWeight: "600",
              color: variantColors.text,
              padding: 0,
            }}
          >
            {rightButtonText}
          </button>
        ))}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <View
      accessibilityRole="alert"
      {...({ accessibilityLiveRegion: "polite" } as Record<string, unknown>)}
      style={{
        position: "absolute",
        bottom: spacing[24].value,
        left: spacing[16].value,
        right: spacing[16].value,
        backgroundColor: variantColors.bg,
        borderWidth: 1,
        borderColor: variantColors.border,
        borderRadius: radius.xl.value,
        padding: spacing[12].value,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 10000,
      }}
    >
      <RNText allowFontScaling={false} style={{ flex: 1, fontSize: spacing[14].value, color: variantColors.text }}>
        {current.message}
      </RNText>
      {rightComponent}
      {!rightComponent && rightButtonText && (
        <TouchableOpacity onPress={onRightButtonPress ?? current.props?.onRightButtonPress}>
          <RNText allowFontScaling={false} style={{ fontSize: spacing[12].value, fontWeight: "600", color: variantColors.text }}>
            {rightButtonText}
          </RNText>
        </TouchableOpacity>
      )}
    </View>
  );
};

Toast.displayName = "Toast";
export default Toast;
