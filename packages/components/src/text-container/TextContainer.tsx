/**
 * TextContainer — displays a title, subtitle, optional description, and
 * optional action icon.  Supports four layout types.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export enum ETextContainerType {
  Default = "Default",
  Heading = "Heading",
  WithAction = "WithAction",
  Info = "Info",
}

export interface ITextContainerProps {
  title: string;
  subtitle: string;
  desc?: string;
  actionOnPress?: () => void;
  actionIcon?: React.ReactNode;
  actionIconStyle?: React.CSSProperties | Record<string, unknown>;
  type?: ETextContainerType;
  style?: React.CSSProperties | Record<string, unknown>;
  titleStyle?: React.CSSProperties | Record<string, unknown>;
  subTitleStyle?: React.CSSProperties | Record<string, unknown>;
  descStyle?: React.CSSProperties | Record<string, unknown>;
}

export const TextContainer: React.FC<ITextContainerProps> = ({
  title,
  subtitle,
  desc,
  actionOnPress,
  actionIcon,
  actionIconStyle,
  type = ETextContainerType.Default,
  style,
  titleStyle,
  subTitleStyle,
  descStyle,
}) => {
  const themed = useThemedColors();

  const isHeading = type === ETextContainerType.Heading;
  const isWithAction = type === ETextContainerType.WithAction;
  const isInfo = type === ETextContainerType.Info;

  const titleFontSize = isHeading ? spacing[20].value : spacing[16].value;
  const titleFontWeight = isHeading ? "700" : "600";
  const subtitleFontSize = isInfo ? spacing[12].value : spacing[14].value;

  if (isWeb) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: spacing[4].value, ...(style as React.CSSProperties) }}>
        <div style={isWithAction ? { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" } : undefined}>
          <span style={{ fontSize: titleFontSize, fontWeight: titleFontWeight as React.CSSProperties["fontWeight"], color: themed.textPrimary, ...(titleStyle as React.CSSProperties) }}>
            {title}
          </span>
          {isWithAction && actionIcon && (
            <span
              style={{ cursor: actionOnPress ? "pointer" : undefined, ...(actionIconStyle as React.CSSProperties) }}
              onClick={actionOnPress}
              role={actionOnPress ? "button" : undefined}
              tabIndex={actionOnPress ? 0 : undefined}
              onKeyDown={actionOnPress ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); actionOnPress(); } } : undefined}
            >
              {actionIcon}
            </span>
          )}
        </div>
        <span style={{ fontSize: subtitleFontSize, color: themed.textSecondary, ...(subTitleStyle as React.CSSProperties) }}>
          {subtitle}
        </span>
        {desc !== undefined && (
          <span style={{ fontSize: spacing[12].value, color: themed.textTertiary, ...(descStyle as React.CSSProperties) }}>
            {desc}
          </span>
        )}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>;

  };

  const titleRow = isWithAction ? (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <RNText allowFontScaling={false} style={{ fontSize: titleFontSize, fontWeight: titleFontWeight, color: themed.textPrimary, ...(titleStyle as Record<string, unknown>) }}>
        {title}
      </RNText>
      {actionIcon && (
        <TouchableOpacity onPress={actionOnPress} style={actionIconStyle as Record<string, unknown>}>
          {actionIcon}
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <RNText allowFontScaling={false} style={{ fontSize: titleFontSize, fontWeight: titleFontWeight, color: themed.textPrimary, ...(titleStyle as Record<string, unknown>) }}>
      {title}
    </RNText>
  );

  return (
    <View style={style as Record<string, unknown>}>
      {titleRow}
      <RNText allowFontScaling={false} style={{ fontSize: subtitleFontSize, color: themed.textSecondary, ...(subTitleStyle as Record<string, unknown>) }}>
        {subtitle}
      </RNText>
      {desc !== undefined && (
        <RNText allowFontScaling={false} style={{ fontSize: spacing[12].value, color: themed.textTertiary, ...(descStyle as Record<string, unknown>) }}>
          {desc}
        </RNText>
      )}
    </View>
  );
};

TextContainer.displayName = "TextContainer";
export default TextContainer;
