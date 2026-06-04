/**
 * Modal — overlay dialog with backdrop blur, smooth animations.
 * Dialog content wrapper accepts BoxProps. Title rendered via <Text>.
 *
 * Accessibility (Req 14.1–14.4):
 * - role="dialog" + aria-modal="true" on the panel
 * - aria-labelledby wired to the title span
 * - Close button: aria-label="Close dialog" + data-szr-close (focus ring via CSS)
 * - Focus trap: Tab cycles within the dialog; focus returns on close
 * - Escape key dismisses
 */

import React, { useEffect } from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";
import { MODAL_KF, SIZE_W } from "./Modal.style";
import type { ModalSize } from "./Modal.types";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import { useSx, SxStyleTag } from "../shared/useSx";
import { injectFocusStyles } from "../shared/injectFocusStyles";
import type { SzrFC } from "../shared/types";

export type { ModalSize };

export interface ModalProps extends BoxLayoutProps {
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
  style?: StyleProp;
  titleTextType?: ETextType;
  titleTextStyle?: StyleProp;
}

// ---------------------------------------------------------------------------
// Keyframe injection
// ---------------------------------------------------------------------------

let modalKfInjected = false;
function injectModalKf() {
  if (modalKfInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.setAttribute("data-szr-kf", "modal");
  el.textContent = MODAL_KF;
  document.head.appendChild(el);
  modalKfInjected = true;
}

// ---------------------------------------------------------------------------
// Focus trap (web) — keeps keyboard focus within the dialog while open
// ---------------------------------------------------------------------------

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function useModalFocusTrap(
  ref: React.RefObject<HTMLDivElement | null>,
  active: boolean,
) {
  React.useEffect(() => {
    if (!active || !ref.current) return;
    const panel = ref.current;
    const previousFocus = document.activeElement as HTMLElement | null;

    // Move focus into the dialog on open
    const first = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((node) => !node.closest("[hidden]"));
      if (!focusables.length) {
        e.preventDefault();
        return;
      }
      const firstEl = focusables[0]!;
      const lastEl = focusables[focusables.length - 1]!;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [active, ref]);
}

// ---------------------------------------------------------------------------
// Modal component
// ---------------------------------------------------------------------------

export const Modal: SzrFC<ModalProps> = (props) => {
  const { layout, sxProps, rest: modalRest } = extractBoxLayoutProps(props);
  const sx = sxProps as import("../shared/sx").SxProp;
  const { sxStyle, sxClassName, sxCss } = useSx(sx);
  const {
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
    style,
    titleTextType = ETextType.XSHeadingBold,
    titleTextStyle,
  } = modalRest as ModalProps;

  const themed = useThemedColors();

  // Focus trap: ref attached to the dialog wrapper div (web only)
  const dialogRef = React.useRef<HTMLDivElement>(null);
  useModalFocusTrap(dialogRef, isWeb && open);

  // Lock body scroll while open
  useEffect(() => {
    if (!isWeb || !open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape key dismissal
  useEffect(() => {
    if (!isWeb || !open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  // ── Web ────────────────────────────────────────────────────────────────────
  if (isWeb) {
    injectModalKf();
    injectFocusStyles();
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
          ...(style as React.CSSProperties),
        }}
        onClick={(e) => {
          if (closeOnBackdrop && e.target === e.currentTarget) onClose?.();
        }}
      >
        {sxCss && <SxStyleTag css={sxCss} scopeClass={sxClassName} />}
        {/* Backdrop */}
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

        {/*
          Focus trap wrapper: plain div so we can attach a ref without
          requiring Box to support forwardRef.
        */}
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "szr-modal-title" : undefined}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            backgroundColor: themed.surface,
            width: SIZE_W[size],
            maxWidth: "100%",
            maxHeight: isFull ? "100vh" : "90vh",
            borderRadius: isFull ? 0 : 16,
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.18),0 8px 24px rgba(0,0,0,0.12)",
            animation: "szr-modal-in 0.22s cubic-bezier(0.34,1.56,0.64,1)",
            ...sxStyle,
          }}
        >
          {/* Forward BoxLayoutProps and contentBoxProps via an inner Box */}
          <Box
            display="flex"
            flexDirection="column"
            style={{ flex: 1, overflow: "hidden" } as React.CSSProperties}
            {...layout}
            {...contentBoxProps}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px 16px",
                  borderBottom: `1px solid ${themed.borderDefault}`,
                  flexShrink: 0,
                }}
              >
                {title &&
                  (typeof title === "string" ? (
                    <span id="szr-modal-title">
                      <Text
                        type={titleTextType}
                        text={title}
                        color={themed.textPrimary}
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
                    data-szr-close=""
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
                      color: themed.textSecondary,
                      fontSize: 18,
                      transition: "background 0.15s ease,color 0.15s ease",
                      flexShrink: 0,
                      marginLeft: "auto",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        themed.bgHover;
                      (e.currentTarget as HTMLButtonElement).style.color =
                        themed.textPrimary;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        themed.textSecondary;
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div
                style={{
                  padding: "16px 24px 20px",
                  borderTop: `1px solid ${themed.borderDefault}`,
                  flexShrink: 0,
                }}
              >
                {footer}
              </div>
            )}
          </Box>
        </div>
      </div>
    );
  }

  // ── React Native ──────────────────────────────────────────────────────────
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
          ...(style as Record<string, unknown>),
        }}
        activeOpacity={1}
        onPress={() => {
          if (closeOnBackdrop) onClose?.();
        }}
      >
        <View
          style={{
            backgroundColor: themed.surface,
            borderRadius: 16,
            width: "100%",
            maxHeight: "85%",
            overflow: "hidden",
            ...sxStyle,
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
                borderBottomColor: themed.borderDefault,
              }}
            >
              {title &&
                (typeof title === "string" ? (
                  <Text
                    type={titleTextType}
                    text={title}
                    color={themed.textPrimary}
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
                    color={themed.textSecondary}
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
                borderTopColor: themed.borderDefault,
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
