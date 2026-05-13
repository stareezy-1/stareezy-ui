/**
 * EmptyState — centered empty state with icon, title, subtitle, and optional children.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import { Text, ETextType } from "../primitives/Text";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { flattenStyle } from '../shared/flattenStyle';

export interface IEmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  otherChildren?: React.ReactNode;
  titleType?: ETextType;
  subTitleType?: ETextType;
  style?: React.CSSProperties | Record<string, unknown>;
  spacerHeight?: number;
}

export const EmptyState: React.FC<IEmptyStateProps> = ({
  icon,
  title,
  subtitle,
  otherChildren,
  titleType = ETextType.SHeadingBold,
  subTitleType = ETextType.MParagraphRegular,
  style,
  spacerHeight,
}) => {
  const themed = useThemedColors();

  if (isWeb) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: spacing[24].value,
          gap: spacing[12].value,
          ...flattenStyle(style),
        }}
      >
        {spacerHeight !== undefined && <div style={{ height: spacerHeight }} />}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        <Text type={titleType} text={title} color={themed.textPrimary} style={{ textAlign: "center" }} />
        <Text type={subTitleType} text={subtitle} color={themed.textSecondary} style={{ textAlign: "center" }} />
        {otherChildren}
      </div>
    );
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: spacing[24].value,
        ...flattenStyle(style),
      }}
    >
      {spacerHeight !== undefined && <View style={{ height: spacerHeight }} />}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {icon}
      </View>
      <View style={{ height: spacing[12].value }} />
      <Text type={titleType} text={title} color={themed.textPrimary} style={{ textAlign: "center" }} />
      <View style={{ height: spacing[8].value }} />
      <Text type={subTitleType} text={subtitle} color={themed.textSecondary} style={{ textAlign: "center" }} />
      {otherChildren}
    </View>
  );
};

EmptyState.displayName = "EmptyState";
export default EmptyState;
