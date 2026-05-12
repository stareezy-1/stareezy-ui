/**
 * BottomSheets — slides up from bottom, extends BaseModal.
 *
 * On web: fixed bottom panel.
 * On RN: Modal with bottom positioning.
 *
 * Exact port of IBottomSheetsProps from rekosistem-components.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import { IBaseModalProps } from "../base-modal/BaseModal";
import { EButtonType } from "../button/Button";
import { ETextType, TextProps } from "../primitives/Text";
import { IInputProps } from "../input/Input";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export enum EDeviceType {
  Mobile = "Mobile",
  Dekstop = "Dekstop",
}

// Re-export for consumers
export { EButtonType, ETextType };

// ---------------------------------------------------------------------------
// IBottomSheetsProps — exact faithful port
// ---------------------------------------------------------------------------

export interface IBottomSheetsProps extends IBaseModalProps {
  testID?: string;
  onClose?: () => void;
  onPressNegative?: () => void;
  onPressPositive?: () => void;
  title?: string;
  desc?: string;
  descStyle?: Record<string, unknown> | React.CSSProperties;
  positiveText?: string;
  negativeText?: string;
  isVisible?: boolean;
  swipeToCloseEnabled?: boolean;
  style?: Record<string, unknown> | React.CSSProperties;
  children?: React.ReactNode;
  bottomChildren?: React.ReactNode;
  middleChildren?: React.ReactNode;
  icon?: React.ReactNode;
  reverse?: boolean;
  device?: EDeviceType;
  negativeType?: EButtonType;
  positiveType?: EButtonType;
  negativeStyle?: Record<string, unknown> | React.CSSProperties;
  positiveStyle?: Record<string, unknown> | React.CSSProperties;
  negativeDisabled?: boolean;
  positiveDisabled?: boolean;
  positiveTextProps?: Partial<TextProps>;
  negativeTextProps?: Partial<TextProps>;
  negativeTextType?: ETextType;
  positiveTextType?: ETextType;
  input?: IInputProps;
  lists?: string[];
}

// ---------------------------------------------------------------------------
// BottomSheets component
// ---------------------------------------------------------------------------

export const BottomSheets: React.FC<IBottomSheetsProps> = ({
  isVisible,
  onClose,
  onPressNegative,
  onPressPositive,
  title,
  desc,
  descStyle,
  positiveText,
  negativeText,
  children,
  bottomChildren,
  middleChildren,
  icon,
  reverse,
  negativeDisabled,
  positiveDisabled,
  style,
  testID,
  lists,
}) => {
  const themed = useThemedColors();

  if (!isVisible) return null;

  const hasButtons = positiveText || negativeText;

  if (isWeb) {
    const buttons = (
      <div
        style={{
          display: "flex",
          flexDirection: reverse ? "row-reverse" : "row",
          gap: spacing[12].value,
          marginTop: spacing[16].value,
        }}
      >
        {negativeText && (
          <button
            type="button"
            onClick={onPressNegative ?? onClose ?? undefined}
            disabled={negativeDisabled}
            aria-label={negativeText}
            aria-disabled={negativeDisabled}
            style={{
              flex: 1,
              padding: `${spacing[12].value}px ${spacing[16].value}px`,
              backgroundColor: negativeDisabled ? themed.bgDisabled : themed.bgSecondary,
              border: `1px solid ${themed.borderDefault}`,
              borderRadius: radius.full.value,
              cursor: negativeDisabled ? "not-allowed" : "pointer",
              color: negativeDisabled ? themed.textDisabled : themed.textPrimary,
              fontSize: spacing[14].value,
              fontWeight: "500",
            }}
          >
            {negativeText}
          </button>
        )}
        {positiveText && (
          <button
            type="button"
            onClick={onPressPositive}
            disabled={positiveDisabled}
            aria-label={positiveText}
            aria-disabled={positiveDisabled}
            style={{
              flex: 1,
              padding: `${spacing[12].value}px ${spacing[16].value}px`,
              backgroundColor: positiveDisabled ? themed.bgDisabled : themed.surfaceDark,
              border: "none",
              borderRadius: radius.full.value,
              cursor: positiveDisabled ? "not-allowed" : "pointer",
              color: positiveDisabled ? themed.textDisabled : themed.textInverse,
              fontSize: spacing[14].value,
              fontWeight: "500",
            }}
          >
            {positiveText}
          </button>
        )}
      </div>
    );

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Bottom sheet"}
        data-testid={testID}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
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
          }}
          onClick={onClose ?? undefined}
          aria-hidden="true"
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: themed.bgPrimary,
            borderTopLeftRadius: radius["2xl"].value,
            borderTopRightRadius: radius["2xl"].value,
            padding: spacing[24].value,
            width: "100%",
            maxWidth: 600,
            maxHeight: "90vh",
            overflow: "auto",
            ...(style as React.CSSProperties | undefined),
          }}
        >
          {/* Drag handle */}
          <div
            style={{
              width: 40,
              height: 4,
              backgroundColor: themed.borderDefault,
              borderRadius: radius.full.value,
              margin: `0 auto ${spacing[16].value}px`,
            }}
            aria-hidden="true"
          />
          {icon && (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: spacing[12].value }}>
              {icon}
            </div>
          )}
          {title && (
            <h3
              style={{
                margin: `0 0 ${spacing[8].value}px`,
                fontSize: spacing[18].value,
                fontWeight: "600",
                color: themed.textPrimary,
              }}
            >
              {title}
            </h3>
          )}
          {desc && (
            <p
              style={{
                margin: `0 0 ${spacing[12].value}px`,
                fontSize: spacing[14].value,
                color: themed.textSecondary,
                ...(descStyle as React.CSSProperties | undefined),
              }}
            >
              {desc}
            </p>
          )}
          {lists && lists.length > 0 && (
            <ul style={{ margin: 0, padding: `0 0 0 ${spacing[16].value}px`, color: themed.textPrimary }}>
              {lists.map((item, i) => (
                <li key={i} style={{ fontSize: spacing[14].value, marginBottom: spacing[4].value }}>
                  {item}
                </li>
              ))}
            </ul>
          )}
          {middleChildren}
          {children}
          {hasButtons && buttons}
          {bottomChildren}
        </div>
      </div>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Modal, Text, ScrollView } = require("react-native") as {

    Modal: React.ComponentType<Record<string, unknown>>; Text: React.ComponentType<Record<string, unknown>>; ScrollView: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <Modal
      visible={!!isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose ?? undefined}
      testID={testID}
      accessibilityLabel={title ?? "Bottom sheet"}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={onClose ?? undefined}
          accessibilityLabel="Close bottom sheet"
          activeOpacity={1}
        />
        <View
          style={{
            backgroundColor: themed.bgPrimary,
            borderTopLeftRadius: radius["2xl"].value,
            borderTopRightRadius: radius["2xl"].value,
            padding: spacing[24].value,
            maxHeight: "90%",
            ...(style as Record<string, unknown> | undefined),
          }}
        >
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: themed.borderDefault,
              borderRadius: radius.full.value,
              alignSelf: "center",
              marginBottom: spacing[16].value,
            }}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {icon && (
              <View style={{ alignItems: "center", marginBottom: spacing[12].value }}>
                {icon}
              </View>
            )}
            {title && (
              <Text
                style={{
                  fontSize: spacing[18].value,
                  fontWeight: "600",
                  color: themed.textPrimary,
                  marginBottom: spacing[8].value,
                }}
                allowFontScaling={false}
              >
                {title}
              </Text>
            )}
            {desc && (
              <Text
                style={{
                  fontSize: spacing[14].value,
                  color: themed.textSecondary,
                  marginBottom: spacing[12].value,
                  ...(descStyle as Record<string, unknown> | undefined),
                }}
                allowFontScaling={false}
              >
                {desc}
              </Text>
            )}
            {lists && lists.length > 0 &&
              lists.map((item, i) => (
                <Text
                  key={i}
                  style={{
                    fontSize: spacing[14].value,
                    color: themed.textPrimary,
                    marginBottom: spacing[4].value,
                  }}
                  allowFontScaling={false}
                >
                  • {item}
                </Text>
              ))}
            {middleChildren}
            {children}
            {hasButtons && (
              <View
                style={{
                  flexDirection: reverse ? "row-reverse" : "row",
                  gap: spacing[12].value,
                  marginTop: spacing[16].value,
                }}
              >
                {negativeText && (
                  <TouchableOpacity
                    onPress={onPressNegative ?? onClose ?? undefined}
                    disabled={negativeDisabled}
                    accessibilityLabel={negativeText}
                    accessibilityState={{ disabled: !!negativeDisabled }}
                    style={{
                      flex: 1,
                      padding: spacing[12].value,
                      backgroundColor: negativeDisabled ? themed.bgDisabled : themed.bgSecondary,
                      borderWidth: 1,
                      borderColor: themed.borderDefault,
                      borderRadius: radius.full.value,
                      alignItems: "center",
                      ...(negativeDisabled ? {} : {}),
                    }}
                  >
                    <Text
                      style={{
                        color: negativeDisabled ? themed.textDisabled : themed.textPrimary,
                        fontSize: spacing[14].value,
                        fontWeight: "500",
                      }}
                      allowFontScaling={false}
                    >
                      {negativeText}
                    </Text>
                  </TouchableOpacity>
                )}
                {positiveText && (
                  <TouchableOpacity
                    onPress={onPressPositive}
                    disabled={positiveDisabled}
                    accessibilityLabel={positiveText}
                    accessibilityState={{ disabled: !!positiveDisabled }}
                    style={{
                      flex: 1,
                      padding: spacing[12].value,
                      backgroundColor: positiveDisabled ? themed.bgDisabled : themed.surfaceDark,
                      borderRadius: radius.full.value,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: positiveDisabled ? themed.textDisabled : themed.textInverse,
                        fontSize: spacing[14].value,
                        fontWeight: "500",
                      }}
                      allowFontScaling={false}
                    >
                      {positiveText}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            {bottomChildren}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

BottomSheets.displayName = "BottomSheets";
export default BottomSheets;
