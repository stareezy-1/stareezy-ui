/**
 * Badges — status/type badge component.
 * State colors (success/danger/warning/info) use colors.* directly as they
 * do not change with theme.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export enum EBadgesType {
  badge = "badge",
  pill = "pill",
  pillOnly = "pill-only",
  round = "round",
  icon = "icon",
  roundOpacity = "round-opacity",
}

export enum EBadgesState {
  info = "info",
  danger = "danger",
  warning = "warning",
  success = "success",
  default = "default",
}

export enum EBadgesStyle {
  default = "default",
  outline = "outline",
  text = "text",
  solid = "solid",
  solidHalf = "solid-half",
}

export interface IBadgesProps {
  type?: EBadgesType;
  state: EBadgesState;
  style?: EBadgesStyle;
  text?: string;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textStyle?: React.CSSProperties | Record<string, unknown>;
  styleOverride?: React.CSSProperties | Record<string, unknown>;
  color?: string;
}

function getStateColors(state: EBadgesState): {
  bg: string;
  border: string;
  text: string;
  solid: string;
} {
  switch (state) {
    case EBadgesState.success:
      return {
        bg: colors.success.surface.value,
        border: colors.success.border.value,
        text: colors.success.main.value,
        solid: colors.success.main.value,
      };
    case EBadgesState.danger:
      return {
        bg: colors.danger.surface.value,
        border: colors.danger.border.value,
        text: colors.danger.main.value,
        solid: colors.danger.main.value,
      };
    case EBadgesState.warning:
      return {
        bg: colors.caution.surface.value,
        border: colors.caution.border.value,
        text: colors.caution.main.value,
        solid: colors.caution.main.value,
      };
    case EBadgesState.info:
      return {
        bg: colors.celurenBlue[25].value,
        border: colors.celurenBlue[100].value,
        text: colors.celurenBlue[500].value,
        solid: colors.celurenBlue[500].value,
      };
    default:
      return {
        bg: colors.neutral[20].value,
        border: colors.neutral[40].value,
        text: colors.neutral[70].value,
        solid: colors.neutral[60].value,
      };
  }
}

function getBorderRadius(type?: EBadgesType): number {
  switch (type) {
    case EBadgesType.pill:
    case EBadgesType.pillOnly:
    case EBadgesType.round:
    case EBadgesType.roundOpacity:
      return radius.full.value;
    case EBadgesType.icon:
      return radius.md.value;
    default:
      return radius.sm.value;
  }
}

export const Badges: React.FC<IBadgesProps> = ({
  type = EBadgesType.badge,
  state,
  style: badgeStyle = EBadgesStyle.default,
  text,
  icon,
  leftIcon,
  rightIcon,
  textStyle,
  styleOverride,
  color,
}) => {
  const themed = useThemedColors();
  void themed;
  const stateColors = getStateColors(state);
  const borderRadius = getBorderRadius(type);

  let bgColor: string;
  let textColor: string;
  let borderColor: string | undefined;
  let borderWidth = 0;

  const resolvedColor = color ?? stateColors.text;

  switch (badgeStyle) {
    case EBadgesStyle.solid:
      bgColor = stateColors.solid;
      textColor = colors.neutral[10].value;
      break;
    case EBadgesStyle.solidHalf:
      bgColor = stateColors.bg;
      textColor = stateColors.text;
      borderColor = stateColors.border;
      borderWidth = 1;
      break;
    case EBadgesStyle.outline:
      bgColor = colors.transparent.value;
      textColor = resolvedColor;
      borderColor = resolvedColor;
      borderWidth = 1;
      break;
    case EBadgesStyle.text:
      bgColor = colors.transparent.value;
      textColor = resolvedColor;
      break;
    default:
      bgColor = stateColors.bg;
      textColor = stateColors.text;
  }

  if (type === EBadgesType.roundOpacity) {
    bgColor = stateColors.bg;
  }

  const paddingH = spacing[8].value;
  const paddingV = spacing[4].value;

  if (isWeb) {
    const containerStyle: React.CSSProperties = {
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "center",
      gap: spacing[4].value,
      backgroundColor: bgColor,
      borderRadius,
      paddingLeft: paddingH,
      paddingRight: paddingH,
      paddingTop: paddingV,
      paddingBottom: paddingV,
      ...(borderWidth > 0
        ? { border: `${borderWidth}px solid ${borderColor}` }
        : {}),
      ...(styleOverride as React.CSSProperties),
    };

    return (
      <span style={containerStyle}>
        {leftIcon}
        {icon && !text && icon}
        {text && (
          <span
            style={{
              fontSize: spacing[12].value,
              fontWeight: "500",
              color: textColor,
              ...(textStyle as React.CSSProperties),
            }}
          >
            {text}
          </span>
        )}
        {rightIcon}
      </span>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>;

  };

  const rnContainerStyle: Record<string, unknown> = {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: bgColor,
    borderRadius,
    paddingHorizontal: paddingH,
    paddingVertical: paddingV,
    ...(borderWidth > 0 ? { borderWidth, borderColor } : {}),
    ...(styleOverride as Record<string, unknown>),
  };

  return (
    <View style={rnContainerStyle}>
      {leftIcon}
      {icon && !text && icon}
      {text && (
        <RNText
          allowFontScaling={false}
          style={{
            fontSize: spacing[12].value,
            fontWeight: "500",
            color: textColor,
            ...(textStyle as Record<string, unknown>),
          }}
        >
          {text}
        </RNText>
      )}
      {rightIcon}
    </View>
  );
};

Badges.displayName = "Badges";
export default Badges;
