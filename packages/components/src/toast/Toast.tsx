"use client";
import React, { useEffect } from "react";
import { isWeb } from "../shared/platform";
import { Text, ETextType } from "../primitives/Text";
import { aurora } from "@stareezy-ui/tokens";
import { toastBaseStyle, toastVariantStyles } from "./Toast.style";
import type { ToastVariant } from "./Toast.types";

export type { ToastVariant } from "./Toast.types";

export interface ToastProps {
  variant: ToastVariant;
  message: string;
  onDismiss?: () => void;
  duration?: number;
  style?: React.CSSProperties | Record<string, unknown>;
}

export const Toast: React.FC<ToastProps> = ({
  variant,
  message,
  onDismiss,
  duration = 4000,
  style,
}) => {
  useEffect(() => {
    if (!onDismiss || duration <= 0) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  const variantStyle = toastVariantStyles[variant] ?? toastVariantStyles.info;

  if (isWeb) {
    return (
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
          color={aurora.starWhite.value}
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
              color: aurora.textMuted.value,
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
  }

  // React Native
  const { View, TouchableOpacity } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
    TouchableOpacity: React.ComponentType<Record<string, unknown>>;
  };
  return (
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
        color={aurora.starWhite.value}
      />
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss}>
          <Text
            type={ETextType.XSLabel}
            text="✕"
            color={aurora.textMuted.value}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

Toast.displayName = "Toast";
export default Toast;
