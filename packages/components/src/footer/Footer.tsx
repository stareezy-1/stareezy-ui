/**
 * Footer — a bottom action bar with positive and negative action buttons.
 *
 * Supports loading and disabled states per button, visibility toggle, and
 * full accessibility attributes.
 *
 * Requirements: 12.1, 12.2, 12.3, 12.5, 17.1, 17.3, 17.4
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from '../shared/flattenStyle';

// ---------------------------------------------------------------------------
// IFooterProps
// ---------------------------------------------------------------------------

export interface IFooterProps {
  positiveText?: string;
  negativeText?: string;
  positiveDisabled?: boolean;
  negativeDisabled?: boolean;
  onPressPositive?: () => void;
  onPressNegative?: () => void;
  isShow: boolean;
  style?: React.CSSProperties | Record<string, unknown>;
  positiveLoading?: boolean;
  negativeLoading?: boolean;
}

// ---------------------------------------------------------------------------
// ActivityIndicator shim
// ---------------------------------------------------------------------------

function ActivityIndicatorShim({ color }: { color?: string }) {
  if (isWeb) {
    return (
      <span
        style={{
          display: "inline-block",
          width: 16,
          height: 16,
          border: `2px solid ${color ?? "#ccc"}`,
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "sz-spin 0.7s linear infinite",
          marginLeft: 8,
        }}
        aria-hidden="true"
      />
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { ActivityIndicator } = require("react-native") as {

    ActivityIndicator: React.ComponentType<Record<string, unknown>>;

  };
  return <ActivityIndicator size={16} color={color} />;
}

// ---------------------------------------------------------------------------
// Footer component
// ---------------------------------------------------------------------------

export const Footer: React.FC<IFooterProps> = ({
  positiveText = "Confirm",
  negativeText = "Cancel",
  positiveDisabled = false,
  negativeDisabled = false,
  onPressPositive,
  onPressNegative,
  isShow,
  style,
  positiveLoading = false,
  negativeLoading = false,
}) => {
  if (!isShow) return null;

  // Read theme-aware colors at render time.
  const themed = useThemedColors();

  const positiveBg = positiveDisabled ? themed.bgDisabled : themed.surfaceDark;
  const positiveTextColor = positiveDisabled
    ? themed.textDisabled
    : themed.textInverse;
  const negativeBg = negativeDisabled ? themed.bgDisabled : themed.surface;
  const negativeTextColor = negativeDisabled
    ? themed.textDisabled
    : themed.textPrimary;

  if (isWeb) {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      gap: spacing.small.value,
      padding: spacing.extraMedium.value,
      backgroundColor: themed.surface,
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderTopColor: themed.borderTertiary,
      ...flattenStyle(style),
    };

    const btnBase: React.CSSProperties = {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: spacing.small.value,
      paddingBottom: spacing.small.value,
      paddingLeft: spacing.extraMedium.value,
      paddingRight: spacing.extraMedium.value,
      borderRadius: radius.full.value,
      border: "none",
      outline: "none",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: "600",
    };

    return (
      <div style={containerStyle}>
        {negativeText ? (
          <button
            type="button"
            style={{
              ...btnBase,
              backgroundColor: negativeBg,
              color: negativeTextColor,
              border: `1px solid ${themed.borderDefault}`,
              cursor: negativeDisabled ? "not-allowed" : "pointer",
              opacity: negativeDisabled ? 0.7 : 1,
            }}
            onClick={onPressNegative}
            disabled={negativeDisabled}
            aria-disabled={negativeDisabled}
            aria-busy={negativeLoading}
            aria-label={negativeText}
          >
            {negativeText}
            {negativeLoading && (
              <ActivityIndicatorShim color={negativeTextColor} />
            )}
          </button>
        ) : null}
        {positiveText ? (
          <button
            type="button"
            style={{
              ...btnBase,
              backgroundColor: positiveBg,
              color: positiveTextColor,
              cursor: positiveDisabled ? "not-allowed" : "pointer",
              opacity: positiveDisabled ? 0.7 : 1,
            }}
            onClick={onPressPositive}
            disabled={positiveDisabled}
            aria-disabled={positiveDisabled}
            aria-busy={positiveLoading}
            aria-label={positiveText}
          >
            {positiveText}
            {positiveLoading && (
              <ActivityIndicatorShim color={positiveTextColor} />
            )}
          </button>
        ) : null}
      </div>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text, ActivityIndicator } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>; ActivityIndicator: React.ComponentType<Record<string, unknown>>;

  };

  const containerRnStyle: Record<string, unknown> = {
    flexDirection: "row",
    gap: spacing.small.value,
    padding: spacing.extraMedium.value,
    backgroundColor: themed.surface,
    borderTopWidth: 1,
    borderTopColor: themed.borderTertiary,
    ...flattenStyle(style),
  };

  const btnRnBase: Record<string, unknown> = {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.small.value,
    paddingHorizontal: spacing.extraMedium.value,
    borderRadius: radius.full.value,
  };

  return (
    <View style={containerRnStyle}>
      {negativeText ? (
        <TouchableOpacity
          style={{
            ...btnRnBase,
            backgroundColor: negativeBg,
            borderWidth: 1,
            borderColor: themed.borderDefault,
            opacity: negativeDisabled ? 0.7 : 1,
          }}
          onPress={onPressNegative}
          disabled={negativeDisabled}
          accessibilityLabel={negativeText}
          accessibilityState={{
            disabled: negativeDisabled,
            busy: negativeLoading,
          }}
        >
          <Text
            style={{
              color: negativeTextColor,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            {negativeText}
          </Text>
          {negativeLoading && (
            <ActivityIndicator size={16} color={negativeTextColor} />
          )}
        </TouchableOpacity>
      ) : null}
      {positiveText ? (
        <TouchableOpacity
          style={{
            ...btnRnBase,
            backgroundColor: positiveBg,
            opacity: positiveDisabled ? 0.7 : 1,
          }}
          onPress={onPressPositive}
          disabled={positiveDisabled}
          accessibilityLabel={positiveText}
          accessibilityState={{
            disabled: positiveDisabled,
            busy: positiveLoading,
          }}
        >
          <Text
            style={{
              color: positiveTextColor,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            {positiveText}
          </Text>
          {positiveLoading && (
            <ActivityIndicator size={16} color={positiveTextColor} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

Footer.displayName = "Footer";

export default Footer;
