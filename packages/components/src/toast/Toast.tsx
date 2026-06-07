"use client";
import React, { useEffect } from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Text, ETextType } from "../primitives/Text";
import {
  makeToastBaseStyle,
  makeToastVariantStyles,
  toastClasses,
} from "./Toast.style";
import type { ToastVariant } from "./Toast.types";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import type { SzrFC } from "../shared/types";
import { useSx, SxStyleTag } from "../shared/useSx";

export type { ToastVariant } from "./Toast.types";

export interface ToastProps extends BoxLayoutProps {
  variant: ToastVariant;
  message: string;
  onDismiss?: () => void;
  duration?: number;
  style?: React.CSSProperties | Record<string, unknown>;
}

export const Toast: SzrFC<ToastProps> = (props) => {
  const { sxProps, rest } = extractBoxLayoutProps(props);
  const sx = sxProps as import("../shared/sx").SxProp;
  const { sxStyle, sxClassName, sxCss } = useSx(sx);
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
        className={toastClasses.base}
        style={{
          backgroundColor: toastBaseStyle.backgroundColor,
          borderColor: variantStyle.borderColor,
          ...(style as React.CSSProperties),
          ...sxStyle,
        }}
      >
        <span
          style={{ color: variantStyle.iconColor, fontSize: 16, flexShrink: 0 }}
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
    if (sxCss)
      return (
        <>
          {/* @ts-ignore */}
          <SxStyleTag css={sxCss} scopeClass={sxClassName} />
          {webContent}
        </>
      );
    return webContent;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
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
        ...sxStyle,
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
};

Toast.displayName = "Toast";
export default Toast;
