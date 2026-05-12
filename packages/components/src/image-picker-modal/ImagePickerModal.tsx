/**
 * ImagePickerModal — modal with camera/gallery options for image selection.
 *
 * Exact port of IImagePickerModalProps from rekosistem-components.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ImageItemType = {
  id: number | string;
  url: string | undefined;
  imageFile?: unknown;
  fileSize?: number;
  type?: string;
  uri?: string;
  base64?: string;
};

export interface IImagePickerModalProps {
  closeImagePickerModal(): void;
  isShowImagePickerModal: boolean;
  setImage(image: unknown): void;
  modalTitle: string;
}

// ---------------------------------------------------------------------------
// ImagePickerModal component
// ---------------------------------------------------------------------------

export const ImagePickerModal: React.FC<IImagePickerModalProps> = ({
  closeImagePickerModal,
  isShowImagePickerModal,
  setImage,
  modalTitle,
}) => {
  const themed = useThemedColors();

  if (!isShowImagePickerModal) return null;

  const handleCamera = () => {
    if (isWeb) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.capture = "environment";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const item: ImageItemType = {
            id: Date.now(),
            url: URL.createObjectURL(file),
            imageFile: file,
            type: file.type,
            fileName: file.name,
          } as ImageItemType & { fileName: string };
          setImage(item);
        }
        closeImagePickerModal();
      };
      input.click();
    } else {
      setImage({ source: "camera" });
      closeImagePickerModal();
    }
  };

  const handleGallery = () => {
    if (isWeb) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const item: ImageItemType = {
            id: Date.now(),
            url: URL.createObjectURL(file),
            imageFile: file,
            type: file.type,
          };
          setImage(item);
        }
        closeImagePickerModal();
      };
      input.click();
    } else {
      setImage({ source: "gallery" });
      closeImagePickerModal();
    }
  };

  if (isWeb) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={modalTitle}
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
          onClick={closeImagePickerModal}
          aria-hidden="true"
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: themed.bgPrimary,
            borderRadius: radius.xl.value,
            padding: spacing[24].value,
            minWidth: 280,
            display: "flex",
            flexDirection: "column",
            gap: spacing[16].value,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: spacing[18].value,
              fontWeight: "600",
              color: themed.textPrimary,
              textAlign: "center",
            }}
          >
            {modalTitle}
          </h3>
          <button
            type="button"
            onClick={handleCamera}
            aria-label="Take photo with camera"
            style={{
              padding: `${spacing[12].value}px ${spacing[16].value}px`,
              backgroundColor: themed.bgSecondary,
              border: `1px solid ${themed.borderDefault}`,
              borderRadius: radius.md.value,
              cursor: "pointer",
              color: themed.textPrimary,
              fontSize: spacing[16].value,
            }}
          >
            Camera
          </button>
          <button
            type="button"
            onClick={handleGallery}
            aria-label="Choose from gallery"
            style={{
              padding: `${spacing[12].value}px ${spacing[16].value}px`,
              backgroundColor: themed.bgSecondary,
              border: `1px solid ${themed.borderDefault}`,
              borderRadius: radius.md.value,
              cursor: "pointer",
              color: themed.textPrimary,
              fontSize: spacing[16].value,
            }}
          >
            Gallery
          </button>
          <button
            type="button"
            onClick={closeImagePickerModal}
            aria-label="Cancel image picker"
            style={{
              padding: `${spacing[12].value}px ${spacing[16].value}px`,
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: themed.textSecondary,
              fontSize: spacing[14].value,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Modal, Text } = require("react-native") as {

    Modal: React.ComponentType<Record<string, unknown>>; Text: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <Modal
      visible={isShowImagePickerModal}
      transparent
      animationType="slide"
      onRequestClose={closeImagePickerModal}
      accessibilityLabel={modalTitle}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: themed.bgPrimary,
            borderTopLeftRadius: radius["2xl"].value,
            borderTopRightRadius: radius["2xl"].value,
            padding: spacing[24].value,
            gap: spacing[12].value,
          }}
        >
          <Text
            style={{
              fontSize: spacing[18].value,
              fontWeight: "600",
              color: themed.textPrimary,
              textAlign: "center",
              marginBottom: spacing[8].value,
            }}
            allowFontScaling={false}
          >
            {modalTitle}
          </Text>
          <TouchableOpacity
            onPress={handleCamera}
            accessibilityLabel="Take photo with camera"
            style={{
              padding: spacing[12].value,
              backgroundColor: themed.bgSecondary,
              borderRadius: radius.md.value,
              alignItems: "center",
            }}
          >
            <Text style={{ color: themed.textPrimary, fontSize: spacing[16].value }} allowFontScaling={false}>
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleGallery}
            accessibilityLabel="Choose from gallery"
            style={{
              padding: spacing[12].value,
              backgroundColor: themed.bgSecondary,
              borderRadius: radius.md.value,
              alignItems: "center",
            }}
          >
            <Text style={{ color: themed.textPrimary, fontSize: spacing[16].value }} allowFontScaling={false}>
              Gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={closeImagePickerModal}
            accessibilityLabel="Cancel image picker"
            style={{ padding: spacing[12].value, alignItems: "center" }}
          >
            <Text style={{ color: themed.textSecondary, fontSize: spacing[14].value }} allowFontScaling={false}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

ImagePickerModal.displayName = "ImagePickerModal";
export default ImagePickerModal;
