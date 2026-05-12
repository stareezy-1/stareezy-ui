/**
 * Header — a page/section header with optional left icon and right component.
 *
 * Supports title text, a pressable left icon (e.g. back button), and an
 * arbitrary right component slot. Adapts layout for mobile vs desktop.
 *
 * Requirements: 12.1, 12.2, 12.3, 17.1
 */

import React, { ReactNode } from "react";
import { spacing, typography } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

// ---------------------------------------------------------------------------
// ImageProps — minimal cross-platform image props type
// ---------------------------------------------------------------------------

export interface ImageProps {
  uri?: string;
  source?: unknown;
  width?: number;
  height?: number;
  style?: React.CSSProperties | Record<string, unknown>;
  accessibilityLabel?: string;
}

// ---------------------------------------------------------------------------
// IHeaderProps
// ---------------------------------------------------------------------------

export interface IHeaderProps {
  title?: string;
  leftIcon?: ImageProps;
  onLeftIconPress?: () => void;
  rightComponent?: ReactNode;
  testID?: string;
  isMobile?: boolean;
}

// ---------------------------------------------------------------------------
// Header component
// ---------------------------------------------------------------------------

export const Header: React.FC<IHeaderProps> = ({
  title,
  leftIcon,
  onLeftIconPress,
  rightComponent,
  testID,
  isMobile = false,
}) => {
  const themed = useThemedColors();

  if (isWeb) {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: spacing.extraMedium.value,
      paddingBottom: spacing.extraMedium.value,
      paddingLeft: isMobile ? spacing.extraMedium.value : spacing.large.value,
      paddingRight: isMobile ? spacing.extraMedium.value : spacing.large.value,
      backgroundColor: themed.surface,
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: themed.borderTertiary,
      minHeight: 56,
    };

    const titleStyle: React.CSSProperties = {
      flex: 1,
      fontSize: typography.fontSize.md.value,
      fontWeight: typography.fontWeight.semiBold
        .value as React.CSSProperties["fontWeight"],
      color: themed.textPrimary,
      fontFamily: typography.fontFamily.montserratSemiBold.value,
      textAlign: "center",
    };

    const leftIconStyle: React.CSSProperties = {
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: onLeftIconPress ? "pointer" : undefined,
      flexShrink: 0,
    };

    const rightSlotStyle: React.CSSProperties = {
      width: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexShrink: 0,
    };

    return (
      <header style={containerStyle} data-testid={testID}>
        {/* Left icon slot */}
        {leftIcon ? (
          <div
            style={leftIconStyle}
            onClick={onLeftIconPress}
            role={onLeftIconPress ? "button" : undefined}
            tabIndex={onLeftIconPress ? 0 : undefined}
            aria-label={leftIcon.accessibilityLabel ?? "Back"}
            onKeyDown={
              onLeftIconPress
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onLeftIconPress();
                    }
                  }
                : undefined
            }
          >
            {leftIcon.uri ? (
              <img
                src={leftIcon.uri}
                width={leftIcon.width ?? 24}
                height={leftIcon.height ?? 24}
                alt={leftIcon.accessibilityLabel ?? "Back"}
                style={leftIcon.style as React.CSSProperties | undefined}
              />
            ) : null}
          </div>
        ) : (
          <div style={{ width: 40, flexShrink: 0 }} />
        )}

        {/* Title */}
        {title ? (
          <span style={titleStyle}>{title}</span>
        ) : (
          <div style={{ flex: 1 }} />
        )}

        {/* Right component slot */}
        <div style={rightSlotStyle}>{rightComponent ?? null}</div>
      </header>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text, Image } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>; Image: React.ComponentType<Record<string, unknown>>;

  };

  const containerRnStyle: Record<string, unknown> = {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.extraMedium.value,
    paddingHorizontal: isMobile
      ? spacing.extraMedium.value
      : spacing.large.value,
    backgroundColor: themed.surface,
    borderBottomWidth: 1,
    borderBottomColor: themed.borderTertiary,
    minHeight: 56,
  };

  const titleRnStyle: Record<string, unknown> = {
    flex: 1,
    fontSize: typography.fontSize.md.value,
    fontWeight: typography.fontWeight.semiBold.value,
    color: themed.textPrimary,
    fontFamily: typography.fontFamily.montserratSemiBold.value,
    textAlign: "center",
  };

  return (
    <View style={containerRnStyle} testID={testID}>
      {/* Left icon slot */}
      {leftIcon ? (
        <TouchableOpacity
          onPress={onLeftIconPress}
          disabled={!onLeftIconPress}
          accessibilityLabel={leftIcon.accessibilityLabel ?? "Back"}
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {leftIcon.source ? (
            <Image
              source={leftIcon.source}
              style={{
                width: leftIcon.width ?? 24,
                height: leftIcon.height ?? 24,
                ...(leftIcon.style as Record<string, unknown> | undefined),
              }}
              accessibilityLabel={leftIcon.accessibilityLabel ?? "Back"}
            />
          ) : null}
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}

      {/* Title */}
      {title ? (
        <Text style={titleRnStyle}>{title}</Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      {/* Right component slot */}
      <View style={{ width: 40, alignItems: "flex-end" }}>
        {rightComponent ?? null}
      </View>
    </View>
  );
};

Header.displayName = "Header";

export default Header;
