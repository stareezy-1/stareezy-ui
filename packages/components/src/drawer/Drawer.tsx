/**
 * Drawer — slides from edge (right/left/top/bottom).
 *
 * On web: fixed side panel.
 * On RN: Modal with side positioning.
 *
 * Exact port of IDrawerProps from rekosistem-components.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export enum EDrawerType {
  Right = "Right",
  Left = "Left",
  Top = "Top",
  Bottom = "Bottom",
}

// ---------------------------------------------------------------------------
// IDrawerProps — exact faithful port
// ---------------------------------------------------------------------------

export interface IDrawerProps {
  isVisible: boolean;
  width?: number;
  height?: number;
  type?: EDrawerType;
  onClose?: () => void;
  children: React.ReactNode;
  modalStyle?: Record<string, unknown> | React.CSSProperties;
  backdropStyle?: Record<string, unknown> | React.CSSProperties;
  swipeToCloseEnabled?: boolean;
}

// ---------------------------------------------------------------------------
// Drawer component
// ---------------------------------------------------------------------------

export const Drawer: React.FC<IDrawerProps> = ({
  isVisible,
  width = 300,
  height = 300,
  type = EDrawerType.Right,
  onClose,
  children,
  modalStyle,
  backdropStyle,
}) => {
  const themed = useThemedColors();

  if (!isVisible) return null;

  const isHorizontal = type === EDrawerType.Right || type === EDrawerType.Left;

  if (isWeb) {
    const panelStyle: React.CSSProperties = {
      position: "fixed",
      zIndex: 1001,
      backgroundColor: themed.bgPrimary,
      overflowY: "auto",
      ...(type === EDrawerType.Right
        ? { top: 0, right: 0, bottom: 0, width }
        : type === EDrawerType.Left
        ? { top: 0, left: 0, bottom: 0, width }
        : type === EDrawerType.Top
        ? { top: 0, left: 0, right: 0, height }
        : { bottom: 0, left: 0, right: 0, height }),
      ...(isHorizontal
        ? {}
        : { borderTopLeftRadius: type === EDrawerType.Bottom ? radius["2xl"].value : 0,
            borderTopRightRadius: type === EDrawerType.Bottom ? radius["2xl"].value : 0 }),
      ...(modalStyle as React.CSSProperties | undefined),
    };

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Drawer"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: themed.bgPrimaryBlack,
            opacity: 0.5,
            ...(backdropStyle as React.CSSProperties | undefined),
          }}
          onClick={onClose}
          aria-hidden="true"
        />
        <div style={panelStyle}>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            style={{
              position: "absolute",
              top: spacing[8].value,
              right: spacing[8].value,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: spacing[20].value,
              color: themed.textSecondary,
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

  const { Modal } = require("react-native") as {

    Modal: React.ComponentType<Record<string, unknown>>;

  };

  const justifyContent =
    type === EDrawerType.Right
      ? "flex-end"
      : type === EDrawerType.Left
      ? "flex-start"
      : type === EDrawerType.Bottom
      ? "flex-end"
      : "flex-start";

  const flexDirection = isHorizontal ? "row" : "column";

  const panelRnStyle: Record<string, unknown> = {
    backgroundColor: themed.bgPrimary,
    ...(isHorizontal ? { width, height: "100%" } : { height, width: "100%" }),
    ...(type === EDrawerType.Bottom
      ? { borderTopLeftRadius: radius["2xl"].value, borderTopRightRadius: radius["2xl"].value }
      : {}),
    ...(modalStyle as Record<string, unknown> | undefined),
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      accessibilityLabel="Drawer"
    >
      <View
        style={{
          flex: 1,
          flexDirection,
          justifyContent,
          backgroundColor: "rgba(0,0,0,0.5)",
          ...(backdropStyle as Record<string, unknown> | undefined),
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={onClose}
          accessibilityLabel="Close drawer backdrop"
          activeOpacity={1}
        />
        <View style={panelRnStyle}>
          <TouchableOpacity
            onPress={onClose}
            accessibilityLabel="Close drawer"
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
      </View>
    </Modal>
  );
};

Drawer.displayName = "Drawer";
export default Drawer;
