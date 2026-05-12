/**
 * Loading — full-screen overlay with optional spinner and text.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export interface ILoadingOverlayProps {
  visible: boolean;
  text?: string;
  withCard?: boolean;
}

export const Loading: React.FC<ILoadingOverlayProps> = ({
  visible,
  text,
  withCard = false,
}) => {
  const themed = useThemedColors();

  if (!visible) return null;

  if (isWeb) {
    const overlayStyle: React.CSSProperties = {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.transparentDark.value,
      zIndex: 9999,
    };

    const cardStyle: React.CSSProperties = withCard
      ? {
          backgroundColor: themed.bgPrimary,
          borderRadius: radius.xl.value,
          padding: spacing[24].value,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: spacing[12].value,
          minWidth: 120,
        }
      : {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: spacing[12].value,
        };

    return (
      <div style={overlayStyle} role="status" aria-live="polite" aria-label={text ?? "Loading"}>
        <div style={cardStyle}>
          <span
            style={{
              display: "inline-block",
              width: spacing[32].value,
              height: spacing[32].value,
              border: `3px solid ${themed.borderDefault}`,
              borderTopColor: colors.celurenBlue[500].value,
              borderRadius: "50%",
              animation: "sz-spin 0.7s linear infinite",
            }}
            aria-hidden="true"
          />
          {text && (
            <span style={{ fontSize: spacing[14].value, color: themed.textPrimary, textAlign: "center" }}>
              {text}
            </span>
          )}
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText, ActivityIndicator, Modal } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>; ActivityIndicator: React.ComponentType<Record<string, unknown>>; Modal: React.ComponentType<Record<string, unknown>>;

  };

  const inner = (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        ...(withCard
          ? {
              backgroundColor: themed.bgPrimary,
              borderRadius: radius.xl.value,
              padding: spacing[24].value,
              minWidth: 120,
            }
          : {}),
      }}
    >
      <ActivityIndicator size="large" color={colors.celurenBlue[500].value} />
      {text && (
        <RNText
          allowFontScaling={false}
          style={{ fontSize: spacing[14].value, color: themed.textPrimary, marginTop: spacing[12].value, textAlign: "center" }}
        >
          {text}
        </RNText>
      )}
    </View>
  );

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.transparentDark.value,
        }}
      >
        {inner}
      </View>
    </Modal>
  );
};

Loading.displayName = "Loading";
export default Loading;
