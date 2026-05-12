/**
 * Info — informational banner with optional icon and right children.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";
import { Text, ETextType } from "../primitives/Text";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export interface IInfoProps {
  text: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  style?: React.CSSProperties | Record<string, unknown>;
  textType?: ETextType;
  rightChildren?: React.ReactNode;
}

export const Info: React.FC<IInfoProps> = ({
  text,
  icon,
  backgroundColor,
  textColor,
  style,
  textType = ETextType.SParagraphRegular,
  rightChildren,
}) => {
  const themed = useThemedColors();

  const resolvedBg = backgroundColor ?? themed.bgSecondary;
  const resolvedTextColor = textColor ?? themed.textPrimary;

  if (isWeb) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[8].value,
          backgroundColor: resolvedBg,
          borderRadius: radius.md.value,
          padding: spacing[12].value,
          ...(style as React.CSSProperties),
        }}
      >
        {icon && <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{icon}</span>}
        <span style={{ flex: 1 }}>
          <Text type={textType} text={text} color={resolvedTextColor} />
        </span>
        {rightChildren && <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{rightChildren}</span>}
      </div>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: resolvedBg,
        borderRadius: radius.md.value,
        padding: spacing[12].value,
        ...(style as Record<string, unknown>),
      }}
    >
      {icon && <View style={{ marginRight: spacing[8].value }}>{icon}</View>}
      <View style={{ flex: 1 }}>
        <Text type={textType} text={text} color={resolvedTextColor} />
      </View>
      {rightChildren && <View style={{ marginLeft: spacing[8].value }}>{rightChildren}</View>}
    </View>
  );
};

Info.displayName = "Info";
export default Info;
