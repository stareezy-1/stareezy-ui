/**
 * UploadImageModal — modal for image upload with preview and confirm/cancel.
 *
 * Exact port of IUploadImageModalProps from rekosistem-components.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export interface IUploadImageModalProps {
  title?: string;
  positiveButtonText?: string;
  negativeButtonText?: string;
  show: boolean;
  selected?: unknown;
  onClose(): void;
  onPressPositive: (val: unknown) => void;
  type?: string | string[];
  testID?: string;
  fileName?: string;
  placeholder: string;
  previewUri?: string;
}

export const UploadImageModal: React.FC<IUploadImageModalProps> = ({
  title,
  positiveButtonText = "Upload",
  negativeButtonText = "Cancel",
  show,
  selected,
  onClose,
  onPressPositive,
  type,
  testID,
  fileName,
  placeholder,
  previewUri,
}) => {
  const themed = useThemedColors();

  if (!show) return null;

  const acceptType = Array.isArray(type) ? type.join(",") : (type ?? "image/*");
  const displayName = fileName ?? (selected ? "Image selected" : "");

  if (isWeb) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onPressPositive(file);
      }
    };

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Upload image"}
        data-testid={testID}
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
            minWidth: 320,
            maxWidth: "90vw",
            display: "flex",
            flexDirection: "column",
            gap: spacing[16].value,
          }}
        >
          {title && (
            <h3 style={{ margin: 0, fontSize: spacing[18].value, fontWeight: "600", color: themed.textPrimary }}>
              {title}
            </h3>
          )}
          <label
            aria-label={placeholder}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: spacing[24].value,
              border: `2px dashed ${themed.borderDefault}`,
              borderRadius: radius.md.value,
              cursor: "pointer",
              backgroundColor: themed.bgSecondary,
              gap: spacing[8].value,
              minHeight: 160,
            }}
          >
            <input type="file" accept={acceptType} onChange={handleFileChange} style={{ display: "none" }} aria-label={placeholder} />
            {previewUri ? (
              <img src={previewUri} alt="Preview" style={{ maxWidth: "100%", maxHeight: 200, objectFit: "contain", borderRadius: radius.md.value }} />
            ) : (
              <>
                <span style={{ fontSize: spacing[32].value }}>🖼️</span>
                <span style={{ fontSize: spacing[14].value, color: themed.textSecondary, textAlign: "center" }}>
                  {displayName || placeholder}
                </span>
              </>
            )}
          </label>
          <div style={{ display: "flex", gap: spacing[12].value }}>
            <button
              type="button"
              onClick={onClose}
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
            <button
              type="button"
              onClick={() => onPressPositive(selected)}
              disabled={!selected}
              aria-label={positiveButtonText}
              aria-disabled={!selected}
              style={{
                flex: 1,
                padding: `${spacing[12].value}px ${spacing[16].value}px`,
                backgroundColor: !selected ? themed.bgDisabled : themed.surfaceDark,
                border: "none",
                borderRadius: radius.full.value,
                cursor: !selected ? "not-allowed" : "pointer",
                color: !selected ? themed.textDisabled : themed.textInverse,
                fontSize: spacing[14].value,
              }}
            >
              {positiveButtonText}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Modal, Text, Image } = require("react-native") as {
    Modal: React.ComponentType<Record<string, unknown>>;
    Text: React.ComponentType<Record<string, unknown>>;
    Image: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <Modal
      visible={show}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      testID={testID}
      accessibilityLabel={title ?? "Upload image"}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
        <View style={{ backgroundColor: themed.bgPrimary, borderRadius: radius.xl.value, padding: spacing[24].value, width: "90%" }}>
          {title && (
            <Text style={{ fontSize: spacing[18].value, fontWeight: "600", color: themed.textPrimary, marginBottom: spacing[16].value }} allowFontScaling={false}>
              {title}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => onPressPositive(selected)}
            accessibilityLabel={placeholder}
            style={{
              padding: spacing[24].value,
              borderWidth: 2,
              borderColor: themed.borderDefault,
              borderStyle: "dashed",
              borderRadius: radius.md.value,
              alignItems: "center",
              backgroundColor: themed.bgSecondary,
              marginBottom: spacing[16].value,
              gap: spacing[8].value,
              minHeight: 160,
              justifyContent: "center",
            }}
          >
            {previewUri ? (
              <Image source={{ uri: previewUri }} style={{ width: "100%", height: 160, borderRadius: radius.md.value }} resizeMode="contain" accessibilityLabel="Preview" />
            ) : (
              <>
                <Text style={{ fontSize: spacing[32].value }} allowFontScaling={false}>🖼️</Text>
                <Text style={{ fontSize: spacing[14].value, color: themed.textSecondary, textAlign: "center" }} allowFontScaling={false}>
                  {displayName || placeholder}
                </Text>
              </>
            )}
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: spacing[12].value }}>
            <TouchableOpacity
              onPress={onClose}
              accessibilityLabel={negativeButtonText}
              style={{ flex: 1, padding: spacing[12].value, backgroundColor: themed.bgSecondary, borderWidth: 1, borderColor: themed.borderDefault, borderRadius: radius.full.value, alignItems: "center" }}
            >
              <Text style={{ color: themed.textPrimary, fontSize: spacing[14].value }} allowFontScaling={false}>{negativeButtonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressPositive(selected)}
              disabled={!selected}
              accessibilityLabel={positiveButtonText}
              accessibilityState={{ disabled: !selected }}
              style={{ flex: 1, padding: spacing[12].value, backgroundColor: !selected ? themed.bgDisabled : themed.surfaceDark, borderRadius: radius.full.value, alignItems: "center" }}
            >
              <Text style={{ color: !selected ? themed.textDisabled : themed.textInverse, fontSize: spacing[14].value }} allowFontScaling={false}>
                {positiveButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

UploadImageModal.displayName = "UploadImageModal";
export default UploadImageModal;
