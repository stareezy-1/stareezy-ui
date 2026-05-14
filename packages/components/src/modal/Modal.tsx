/**
 * Modal — overlay dialog with backdrop blur, smooth animations.
 * Dialog content wrapper accepts BoxProps. Title rendered via <Text>.
 */

import React, { useEffect } from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  size?: ModalSize;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  contentBoxProps?: Omit<BoxProps, "children">;
  testID?: string;
  /** ETextType for the modal title (when title is a string) */
  titleTextType?: ETextType;
  /** Style override for the modal title text */
  titleTextStyle?: StyleProp;
}

const SIZE_W: Record<ModalSize, string> = {
  xs: "320px",
  sm: "440px",
  md: "560px",
  lg: "720px",
  xl: "900px",
  full: "100vw",
};

const MODAL_KF = `
@keyframes szr-modal-in {
  from { opacity: 0; transform: scale(0.95) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes szr-backdrop-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;

let modalKfInjected = false;
function injectModalKf() {
  if (modalKfInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = MODAL_KF;
  document.head.appendChild(el);
  modalKfInjected = true;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  size = "md",
  title,
  footer,
  children,
  closeOnBackdrop = true,
  showCloseButton = true,
  contentBoxProps,
  testID,
  titleTextType = ETextType.XSHeadingBold,
  titleTextStyle,
}) => {
  useEffect(() => {
    if (!isWeb || !open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!isWeb || !open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  if (isWeb) {
    injectModalKf();
    const isFull = size === "full";

    return (
      <div
        role="presentation"
        data-testid={testID}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: isFull ? "stretch" : "center",
          justifyContent: "center",
          padding: isFull ? 0 : 16,
          animation: "szr-backdrop-in 0.2s ease",
        }}
        onClick={(e) => {
          if (closeOnBackdrop && e.target === e.currentTarget) onClose?.();
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(15,16,16,0.6)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
          onClick={() => {
            if (closeOnBackdrop) onClose?.();
          }}
        />
        <Box
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "szr-modal-title" : undefined}
          position="relative"
          display="flex"
          flexDirection="column"
          overflow="hidden"
          bg="#ffffff"
          style={{
            width: SIZE_W[size],
            maxWidth: "100%",
            maxHeight: isFull ? "100vh" : "90vh",
            borderRadius: isFull ? 0 : 16,
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.18),0 8px 24px rgba(0,0,0,0.12)",
            animation: "szr-modal-in 0.22s cubic-bezier(0.34,1.56,0.64,1)",
          }}
          {...contentBoxProps}
        >
          {(title || showCloseButton) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px 16px",
                borderBottom: `1px solid ${colors.beauBlue[200].value}`,
                flexShrink: 0,
              }}
            >
              {title &&
                (typeof title === "string" ? (
                  <span id="szr-modal-title">
                    <Text
                      type={titleTextType}
                      text={title}
                      color={colors.raisinBlack[800].value}
                      style={{
                        lineHeight: 1.3,
                        ...(titleTextStyle as React.CSSProperties),
                      }}
                    />
                  </span>
                ) : (
                  title
                ))}
              {showCloseButton && (
                <button
                  type="button"
                  aria-label="Close dialog"
                  onClick={onClose}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: colors.beauBlue[700].value,
                    fontSize: 18,
                    transition: "background 0.15s ease,color 0.15s ease",
                    flexShrink: 0,
                    marginLeft: "auto",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      colors.beauBlue[100].value;
                    (e.currentTarget as HTMLButtonElement).style.color =
                      colors.raisinBlack[800].value;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      colors.beauBlue[700].value;
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          )}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            {children}
          </div>
          {footer && (
            <div
              style={{
                padding: "16px 24px 20px",
                borderTop: `1px solid ${colors.beauBlue[200].value}`,
                flexShrink: 0,
              }}
            >
              {footer}
            </div>
          )}
        </Box>
      </div>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const {
    Modal: RNModal,
    View,
    TouchableOpacity,
    ScrollView,
  } = require("react-native") as {
    Modal: React.ComponentType<Record<string, unknown>>;
    View: React.ComponentType<Record<string, unknown>>;
    TouchableOpacity: React.ComponentType<Record<string, unknown>>;
    ScrollView: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <RNModal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      testID={testID}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(15,16,16,0.6)",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
        activeOpacity={1}
        onPress={() => {
          if (closeOnBackdrop) onClose?.();
        }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 16,
            width: "100%",
            maxHeight: "85%",
            overflow: "hidden",
          }}
          onStartShouldSetResponder={() => true}
        >
          {(title || showCloseButton) && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: colors.beauBlue[200].value,
              }}
            >
              {title &&
                (typeof title === "string" ? (
                  <Text
                    type={titleTextType}
                    text={title}
                    color={colors.raisinBlack[800].value}
                    style={{
                      flex: 1,
                      ...(titleTextStyle as Record<string, unknown>),
                    }}
                  />
                ) : (
                  title
                ))}
              {showCloseButton && (
                <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
                  <Text
                    type={ETextType.XSHeadingBold}
                    text="✕"
                    color={colors.beauBlue[700].value}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          <ScrollView style={{ padding: 20 }}>{children}</ScrollView>
          {footer && (
            <View
              style={{
                padding: 20,
                borderTopWidth: 1,
                borderTopColor: colors.beauBlue[200].value,
              }}
            >
              {footer}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </RNModal>
  );
};

Modal.displayName = "Modal";
export default Modal;
