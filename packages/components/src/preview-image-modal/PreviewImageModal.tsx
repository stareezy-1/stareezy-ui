/**
 * PreviewImageModal — full-screen image preview with download/edit actions.
 *
 * Exact port of IPreviewImageModalProps from rekosistem-components.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from '../shared/flattenStyle';

// ---------------------------------------------------------------------------
// IPreviewImageModalProps — exact faithful port
// ---------------------------------------------------------------------------

export interface IPreviewImageModalProps {
  isVisible?: boolean;
  onClose: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
  title: string;
  url?: string;
  style?: Record<string, unknown> | React.CSSProperties;
  contentStyle?: Record<string, unknown> | React.CSSProperties;
}

// ---------------------------------------------------------------------------
// PreviewImageModal component
// ---------------------------------------------------------------------------

export const PreviewImageModal: React.FC<IPreviewImageModalProps> = ({
  isVisible = false,
  onClose,
  onDownload,
  onEdit,
  title,
  url,
  style,
  contentStyle,
}) => {
  const themed = useThemedColors();

  if (!isVisible) return null;

  if (isWeb) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          backgroundColor: themed.bgPrimaryBlack,
          display: "flex",
          flexDirection: "column",
          ...flattenStyle(style),
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `${spacing[12].value}px ${spacing[16].value}px`,
            borderBottom: `1px solid ${themed.borderDefault}`,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: spacing[20].value,
              color: themed.textInverse,
              padding: spacing[4].value,
            }}
          >
            ←
          </button>
          <span
            style={{
              fontSize: spacing[16].value,
              fontWeight: "600",
              color: themed.textInverse,
            }}
          >
            {title}
          </span>
          <div style={{ display: "flex", gap: spacing[8].value }}>
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                aria-label="Edit image"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: themed.textInverse,
                  fontSize: spacing[14].value,
                  padding: spacing[4].value,
                }}
              >
                Edit
              </button>
            )}
            {onDownload && (
              <button
                type="button"
                onClick={onDownload}
                aria-label="Download image"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: themed.textInverse,
                  fontSize: spacing[14].value,
                  padding: spacing[4].value,
                }}
              >
                Download
              </button>
            )}
          </div>
        </div>
        {/* Image */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {url ? (
            <img
              src={url}
              alt={title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: radius.md.value,
                ...(contentStyle as React.CSSProperties | undefined),
              }}
            />
          ) : (
            <span style={{ color: themed.textSecondary, fontSize: spacing[14].value }}>
              No image available
            </span>
          )}
        </div>
      </div>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Modal, Text, Image, SafeAreaView } = require("react-native") as {

    Modal: React.ComponentType<Record<string, unknown>>; Text: React.ComponentType<Record<string, unknown>>; Image: React.ComponentType<Record<string, unknown>>; SafeAreaView: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <Modal
      visible={isVisible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
      accessibilityLabel={title}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: themed.bgPrimaryBlack,
          ...flattenStyle(style),
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: spacing[16].value,
            paddingVertical: spacing[12].value,
            borderBottomWidth: 1,
            borderBottomColor: themed.borderDefault,
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            accessibilityLabel="Close preview"
            style={{ padding: spacing[4].value }}
          >
            <Text style={{ color: themed.textInverse, fontSize: spacing[20].value }} allowFontScaling={false}>
              ←
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: spacing[16].value,
              fontWeight: "600",
              color: themed.textInverse,
              flex: 1,
              textAlign: "center",
            }}
            allowFontScaling={false}
          >
            {title}
          </Text>
          <View style={{ flexDirection: "row", gap: spacing[8].value }}>
            {onEdit && (
              <TouchableOpacity
                onPress={onEdit}
                accessibilityLabel="Edit image"
                style={{ padding: spacing[4].value }}
              >
                <Text style={{ color: themed.textInverse, fontSize: spacing[14].value }} allowFontScaling={false}>
                  Edit
                </Text>
              </TouchableOpacity>
            )}
            {onDownload && (
              <TouchableOpacity
                onPress={onDownload}
                accessibilityLabel="Download image"
                style={{ padding: spacing[4].value }}
              >
                <Text style={{ color: themed.textInverse, fontSize: spacing[14].value }} allowFontScaling={false}>
                  Download
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Image */}
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          {url ? (
            <Image
              source={{ uri: url }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: radius.md.value,
                ...(contentStyle as Record<string, unknown> | undefined),
              }}
              resizeMode="contain"
              accessibilityLabel={title}
            />
          ) : (
            <Text style={{ color: themed.textSecondary, fontSize: spacing[14].value }} allowFontScaling={false}>
              No image available
            </Text>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

PreviewImageModal.displayName = "PreviewImageModal";
export default PreviewImageModal;
