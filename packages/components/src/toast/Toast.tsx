"use client";
import React, { useEffect } from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Text, ETextType } from "../primitives/Text";
import { Box } from "../primitives/Box";
import { makeToastBaseStyle, makeToastVariantStyles } from "./Toast.style";
import type { ToastVariant } from "./Toast.types";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";

export type { ToastVariant } from "./Toast.types";

export interface ToastProps extends BoxLayoutProps {
  variant: ToastVariant;
  message: string;
  onDismiss?: () => void;
  duration?: number;
  style?: React.CSSProperties | Record<string, unknown>;
}

export const Toast: React.FC<ToastProps> = (props) => {
  const { layout, rest } = extractBoxLayoutProps(props);
  const hasLayoutProps = Object.keys(layout).length > 0;
  const {
    variant,
    message,
    onDismiss,
    duration = 4000,
    style,
  } = rest as ToastProps;

  const themed = useThemedColors();
  const toastBaseStyle = makeToastBaseStyle(themed);
  const variantStyles = makeToastVariantStyles(themed);

  useEffect(() => {
    if (!onDismiss || duration <= 0) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  const variantStyle = variantStyles[variant] ?? variantStyles.info;

  if (isWeb) {
    const webContent = (
      <div
        role="alert"
        aria-live="polite"
        style={{
          ...toastBaseStyle,
          borderColor: variantStyle.borderColor,
          ...(style as React.CSSProperties),
        }}
      >
        <span
          style={{
            color: variantStyle.iconColor,
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          {variantStyle.icon}
        </span>
        <Text
          type={ETextType.AuroraToastMessage}
          text={message}
          color={themed.textPrimary}
          style={{ flex: 1 }}
        />
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss notification"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: themed.textMuted,
              fontSize: 14,
              padding: 4,
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        )}
      </div>
    );
    if (hasLayoutProps) return <Box {...layout}>{webContent}</Box>;
    return webContent;
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View, TouchableOpacity } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
    TouchableOpacity: React.ComponentType<Record<string, unknown>>;
  };
  const nativeContent = (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 16,
        ...(style as Record<string, unknown>),
      }}
    >
      <Text
        type={ETextType.AuroraToastMessage}
        text={`${variantStyle.icon} ${message}`}
        color={themed.textPrimary}
      />
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss}>
          <Text type={ETextType.XSLabel} text="✕" color={themed.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
  if (hasLayoutProps) return <Box {...layout}>{nativeContent}</Box>;
  return nativeContent;
};

Toast.displayName = "Toast";
export default Toast;
