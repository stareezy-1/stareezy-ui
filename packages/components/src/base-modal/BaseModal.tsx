/**
 * BaseModal — cross-platform modal primitive.
 *
 * On web: renders a dialog-style overlay with backdrop.
 * On RN: uses dynamic require("react-native") Modal.
 *
 * Exact port of IBaseModalProps from rekosistem-components.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React, { ReactNode } from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export interface IBaseModalProps {
  onClose?(): void;
  isVisible?: boolean;
  hasBackdrop?: boolean;
  coverScreen?: boolean;
  avoidKeyboard?: boolean;
  animationInTiming?: number;
  animationOutTiming?: number;
  style?: Record<string, unknown> | React.CSSProperties;
  children?: ReactNode;
  swipeDirection?: Array<"up" | "right" | "down" | "left">;
  swipeToCloseEnabled?: boolean;
  backdropOpacity?: number;
  onBackdropPress?(): void;
  onBackButtonPress?(): void;
  onSwipeComplete?(): void;
  onModalHide?(): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationIn?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationOut?: any;
  customBackdrop?: ReactNode;
}

export const BaseModal: React.FC<IBaseModalProps> = ({
  isVisible = false,
  hasBackdrop = true,
  backdropOpacity = 0.5,
  onClose,
  onBackdropPress,
  onBackButtonPress,
  onModalHide,
  style,
  children,
  customBackdrop,
}) => {
  const themed = useThemedColors();

  const handleBackdropPress = () => {
    onBackdropPress?.();
    onClose?.();
  };

  const handleClose = () => {
    onClose?.();
    onModalHide?.();
  };

  if (!isVisible) return null;

  if (isWeb) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Modal"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hasBackdrop &&
          (customBackdrop ? (
            <div
              style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
              onClick={handleBackdropPress}
              aria-hidden="true"
            >
              {customBackdrop}
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: themed.bgPrimaryBlack,
                opacity: backdropOpacity,
              }}
              onClick={handleBackdropPress}
              aria-hidden="true"
            />
          ))}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: themed.bgPrimary,
            borderRadius: radius.xl.value,
            padding: spacing[16].value,
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflow: "auto",
            ...(style as React.CSSProperties | undefined),
          }}
        >
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            style={{
              position: "absolute",
              top: spacing[8].value,
              right: spacing[8].value,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: spacing[20].value,
              color: themed.textSecondary,
              lineHeight: 1,
              padding: spacing[4].value,
            }}
          >
            ×
          </button>
          {children}
        </div>
      </div>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Modal, TouchableWithoutFeedback } = require("react-native") as {

    Modal: React.ComponentType<Record<string, unknown>>; TouchableWithoutFeedback: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onBackButtonPress ?? onClose}
      accessibilityLabel="Modal"
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress} accessible={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: hasBackdrop
              ? `rgba(0,0,0,${backdropOpacity})`
              : themed.transparent,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {customBackdrop}
          <TouchableWithoutFeedback accessible={false}>
            <View
              style={{
                backgroundColor: themed.bgPrimary,
                borderRadius: radius.xl.value,
                padding: spacing[16].value,
                maxWidth: "90%",
                ...(style as Record<string, unknown> | undefined),
              }}
            >
              <TouchableOpacity
                onPress={handleClose}
                accessibilityLabel="Close modal"
                style={{
                  position: "absolute",
                  top: spacing[8].value,
                  right: spacing[8].value,
                  zIndex: 1,
                  padding: spacing[4].value,
                }}
              >
                <View />
              </TouchableOpacity>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

BaseModal.displayName = "BaseModal";
export default BaseModal;
