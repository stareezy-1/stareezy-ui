/**
 * ImageModal — modal showing an image with action buttons.
 *
 * Exact port of IImageModalProps from rekosistem-components.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React, { ReactNode } from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

// ---------------------------------------------------------------------------
// IImageModalProps — exact faithful port
// ---------------------------------------------------------------------------

export interface IImageModalProps {
  isShow?: boolean;
  onClose?: () => void;
  title?: string;
  image: string;
  negativeButtonText?: string;
  onNegativeButtonPress?: () => void;
  positiveButtonText?: string;
  positiveButtonIcon?: ReactNode;
  onPositiveButtonPress?: () => void;
  isShowNegativeButton?: boolean;
}

// ---------------------------------------------------------------------------
// ImageModal component
// ---------------------------------------------------------------------------

export const ImageModal: React.FC<IImageModalProps> = ({
  isShow = false,
  onClose,
  title,
  image,
  negativeButtonText,
  onNegativeButtonPress,
  positiveButtonText,
  positiveButtonIcon,
  onPositiveButtonPress,
  isShowNegativeButton = true,
}) => {
  const themed = useThemedColors();

  if (!isShow) return null;

  if (isWeb) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Image modal"}
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
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: themed.bgPrimary,
            borderRadius: radius.xl.value,
            padding: spacing[24].value,
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: spacing[16].value,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image modal"
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
          {title && (
            <h3
              style={{
                margin: 0,
                fontSize: spacing[18].value,
                fontWeight: "600",
                color: themed.textPrimary,
              }}
            >
              {title}
            </h3>
          )}
          <img
            src={image}
            alt={title ?? "Modal image"}
            style={{
              width: "100%",
              maxHeight: 400,
              objectFit: "contain",
              borderRadius: radius.md.value,
            }}
          />
          <div style={{ display: "flex", gap: spacing[12].value }}>
            {isShowNegativeButton && negativeButtonText && (
              <button
                type="button"
                onClick={onNegativeButtonPress ?? onClose}
                aria-label={negativeButtonText}
                style={{
                  flex: 1,
                  padding: `${spacing[12].value}px ${spacing[16].value}px`,
                  backgroundColor: themed.bgSecondary,
                  border: `1px solid ${themed.borderDefault}`,
                  borderRadius: radius.full.value,
                  cursor: "pointer",
                  color: themed.textPrimary,
                  fontSize: spacing[14].value,
                }}
              >
                {negativeButtonText}
              </button>
            )}
            {positiveButtonText && (
              <button
                type="button"
                onClick={onPositiveButtonPress}
                aria-label={positiveButtonText}
                style={{
                  flex: 1,
                  padding: `${spacing[12].value}px ${spacing[16].value}px`,
                  backgroundColor: themed.surfaceDark,
                  border: "none",
                  borderRadius: radius.full.value,
                  cursor: "pointer",
                  color: themed.textInverse,
                  fontSize: spacing[14].value,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: spacing[8].value,
                }}
              >
                {positiveButtonIcon}
                {positiveButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Modal, Text, Image } = require("react-native") as {

    Modal: React.ComponentType<Record<string, unknown>>; Text: React.ComponentType<Record<string, unknown>>; Image: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <Modal
      visible={isShow}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityLabel={title ?? "Image modal"}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: themed.bgPrimary,
            borderRadius: radius.xl.value,
            padding: spacing[24].value,
            width: "90%",
            maxHeight: "90%",
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            accessibilityLabel="Close image modal"
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
          {title && (
            <Text
              style={{
                fontSize: spacing[18].value,
                fontWeight: "600",
                color: themed.textPrimary,
                marginBottom: spacing[12].value,
              }}
              allowFontScaling={false}
            >
              {title}
            </Text>
          )}
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 300,
              borderRadius: radius.md.value,
            }}
            resizeMode="contain"
            accessibilityLabel={title ?? "Modal image"}
          />
          <View style={{ flexDirection: "row", gap: spacing[12].value, marginTop: spacing[16].value }}>
            {isShowNegativeButton && negativeButtonText && (
              <TouchableOpacity
                onPress={onNegativeButtonPress ?? onClose}
                accessibilityLabel={negativeButtonText}
                style={{
                  flex: 1,
                  padding: spacing[12].value,
                  backgroundColor: themed.bgSecondary,
                  borderWidth: 1,
                  borderColor: themed.borderDefault,
                  borderRadius: radius.full.value,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: themed.textPrimary, fontSize: spacing[14].value }} allowFontScaling={false}>
                  {negativeButtonText}
                </Text>
              </TouchableOpacity>
            )}
            {positiveButtonText && (
              <TouchableOpacity
                onPress={onPositiveButtonPress}
                accessibilityLabel={positiveButtonText}
                style={{
                  flex: 1,
                  padding: spacing[12].value,
                  backgroundColor: themed.surfaceDark,
                  borderRadius: radius.full.value,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: spacing[8].value,
                }}
              >
                {positiveButtonIcon}
                <Text style={{ color: themed.textInverse, fontSize: spacing[14].value }} allowFontScaling={false}>
                  {positiveButtonText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

ImageModal.displayName = "ImageModal";
export default ImageModal;
