/**
 * GroupContainer — a labeled section container.
 *
 * Renders an optional title above a content area. Used to group related
 * UI elements under a common heading.
 *
 * Requirements: 12.1, 12.2, 12.3
 */

import React, { ReactNode } from "react";
import { colors, spacing, typography } from "@stareezy-ui/tokens";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

import { flattenStyle } from "../shared/flattenStyle";
import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

// ---------------------------------------------------------------------------
// IGroupContainerProps
// ---------------------------------------------------------------------------

export interface IGroupContainerProps {
  title?: string;
  children: ReactNode;
  testID?: string;
  style?: React.CSSProperties | Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// GroupContainer component
// ---------------------------------------------------------------------------

export const GroupContainer: React.FC<IGroupContainerProps> = ({
  title,
  children,
  testID,
  style,
}) => {
  if (isWeb) {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      ...flattenStyle(style),
    };

    const titleStyle: React.CSSProperties = {
      fontSize: typography.fontSize.sm.value,
      fontWeight: typography.fontWeight.semiBold
        .value as React.CSSProperties["fontWeight"],
      color: colors.raisinBlack[800].value,
      marginBottom: spacing.small.value,
      fontFamily: typography.fontFamily.montserratSemiBold.value,
    };

    return (
      <div style={containerStyle} data-testid={testID}>
        {title ? <span style={titleStyle}>{title}</span> : null}
        {children}
      </div>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text } = require("react-native") as {
    Text: React.ComponentType<Record<string, unknown>>;
  };

  const containerRnStyle: Record<string, unknown> = {
    flexDirection: "column",
    ...flattenStyle(style),
  };

  const titleRnStyle: Record<string, unknown> = {
    fontSize: typography.fontSize.sm.value,
    fontWeight: typography.fontWeight.semiBold.value,
    color: colors.raisinBlack[800].value,
    marginBottom: spacing.small.value,
    fontFamily: typography.fontFamily.montserratSemiBold.value,
  };

  return (
    <View style={containerRnStyle} testID={testID}>
      {title ? <Text style={titleRnStyle}>{title}</Text> : null}
      {children}
    </View>
  );
};

GroupContainer.displayName = "GroupContainer";

export default GroupContainer;
