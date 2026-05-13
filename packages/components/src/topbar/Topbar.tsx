/**
 * Topbar — a navigation top bar with title, left icon, and right children.
 *
 * Designed for React Native navigation stacks. The `navigation` prop is the
 * RN navigation object (kept as `any` to avoid a hard dependency on
 * @react-navigation/native). On web it renders a semantic <header>.
 *
 * Requirements: 12.1, 12.2, 12.3, 17.1
 */

import React from "react";
import { colors, spacing, typography } from "@stareezy-ui/tokens";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from '../shared/flattenStyle';

// ---------------------------------------------------------------------------
// ITopbarProps
// ---------------------------------------------------------------------------

export interface ITopbarProps {
  testID?: string;
  onPressLeft?: () => void;
  title: string;
  rightChildren?: React.ReactNode;
  leftIcon?: React.ReactNode;
  backgroundColor?: string;
  navigation?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  style?: React.CSSProperties | Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Topbar component
// ---------------------------------------------------------------------------

export const Topbar: React.FC<ITopbarProps> = ({
  testID,
  onPressLeft,
  title,
  rightChildren,
  leftIcon,
  backgroundColor,
  navigation,
  style,
}) => {
  const bgColor = backgroundColor ?? colors.neutral[10].value;

  // Resolve left press handler — prefer explicit onPressLeft, fall back to
  // navigation.goBack() if navigation is provided
  const handleLeftPress =
    onPressLeft ?? (navigation?.goBack ? () => navigation.goBack() : undefined);

  if (isWeb) {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: spacing.extraMedium.value,
      paddingBottom: spacing.extraMedium.value,
      paddingLeft: spacing.extraMedium.value,
      paddingRight: spacing.extraMedium.value,
      backgroundColor: bgColor,
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: colors.beauBlue[100].value,
      minHeight: 56,
      ...flattenStyle(style),
    };

    const titleStyle: React.CSSProperties = {
      flex: 1,
      fontSize: typography.fontSize.md.value,
      fontWeight: typography.fontWeight.semiBold
        .value as React.CSSProperties["fontWeight"],
      color: colors.raisinBlack[800].value,
      fontFamily: typography.fontFamily.montserratSemiBold.value,
      textAlign: "center",
    };

    const leftBtnStyle: React.CSSProperties = {
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: handleLeftPress ? "pointer" : undefined,
      flexShrink: 0,
      background: "none",
      border: "none",
      padding: 0,
    };

    return (
      <header style={containerStyle} data-testid={testID}>
        {/* Left icon / back button */}
        {leftIcon || handleLeftPress ? (
          <button
            type="button"
            style={leftBtnStyle}
            onClick={handleLeftPress}
            aria-label="Go back"
            disabled={!handleLeftPress}
          >
            {leftIcon ?? null}
          </button>
        ) : (
          <div style={{ width: 40, flexShrink: 0 }} />
        )}

        {/* Title */}
        <span style={titleStyle}>{title}</span>

        {/* Right children */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexShrink: 0,
            minWidth: 40,
            justifyContent: "flex-end",
          }}
        >
          {rightChildren ?? null}
        </div>
      </header>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>;

  };

  const containerRnStyle: Record<string, unknown> = {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.extraMedium.value,
    paddingHorizontal: spacing.extraMedium.value,
    backgroundColor: bgColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.beauBlue[100].value,
    minHeight: 56,
    ...flattenStyle(style),
  };

  const titleRnStyle: Record<string, unknown> = {
    flex: 1,
    fontSize: typography.fontSize.md.value,
    fontWeight: typography.fontWeight.semiBold.value,
    color: colors.raisinBlack[800].value,
    fontFamily: typography.fontFamily.montserratSemiBold.value,
    textAlign: "center",
  };

  return (
    <View style={containerRnStyle} testID={testID}>
      {/* Left icon / back button */}
      {leftIcon || handleLeftPress ? (
        <TouchableOpacity
          onPress={handleLeftPress}
          disabled={!handleLeftPress}
          accessibilityLabel="Go back"
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {leftIcon ?? null}
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}

      {/* Title */}
      <Text style={titleRnStyle}>{title}</Text>

      {/* Right children */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexShrink: 0,
          minWidth: 40,
          justifyContent: "flex-end",
        }}
      >
        {rightChildren ?? null}
      </View>
    </View>
  );
};

Topbar.displayName = "Topbar";

export default Topbar;
