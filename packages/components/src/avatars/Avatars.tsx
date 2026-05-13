/**
 * Avatars — circular avatar component supporting image, icon, and letter modes.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from '../shared/flattenStyle';

export enum EAvatarType {
  ImageOnly = "ImageOnly",
  OutlineGrey = "OutlineGrey",
  OutlineBlack = "OutlineBlack",
  Icon = "Icon",
  Letters = "Letters",
}

export enum EAvatarSize {
  Sm = "Sm",
  Md = "Md",
  Lg = "Lg",
  Xl = "Xl",
  XXl = "XXL",
  XXXl = "XXXL",
}

export enum EAvatarState {
  Default = "Default",
  Dot = "Dot",
}

export interface IAvatarProps {
  type?: EAvatarType;
  size?: EAvatarSize;
  style?: React.CSSProperties | Record<string, unknown>;
  onPress?: () => void;
  source?: unknown;
  state?: EAvatarState;
  name?: string;
}

function getSizePx(size?: EAvatarSize): number {
  switch (size) {
    case EAvatarSize.Sm: return spacing[32].value;
    case EAvatarSize.Md: return 40;
    case EAvatarSize.Lg: return spacing[48].value;
    case EAvatarSize.Xl: return spacing[64].value;
    case EAvatarSize.XXl: return spacing[84].value;
    case EAvatarSize.XXXl: return spacing[96].value;
    default: return 40;
  }
}

function getFontSize(size?: EAvatarSize): number {
  switch (size) {
    case EAvatarSize.Sm: return spacing[12].value;
    case EAvatarSize.Md: return spacing[14].value;
    case EAvatarSize.Lg: return spacing[16].value;
    case EAvatarSize.Xl: return spacing[20].value;
    case EAvatarSize.XXl: return spacing[24].value;
    case EAvatarSize.XXXl: return spacing[28].value;
    default: return spacing[14].value;
  }
}

function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return (parts[0] ?? "").charAt(0).toUpperCase();
  return ((parts[0] ?? "").charAt(0) + (parts[parts.length - 1] ?? "").charAt(0)).toUpperCase();
}

export const Avatars: React.FC<IAvatarProps> = ({
  type = EAvatarType.ImageOnly,
  size = EAvatarSize.Md,
  style,
  onPress,
  source,
  state = EAvatarState.Default,
  name,
}) => {
  const themed = useThemedColors();
  const sizePx = getSizePx(size);
  const fontSize = getFontSize(size);
  const initials = getInitials(name);
  const hasDot = state === EAvatarState.Dot;

  const borderColor =
    type === EAvatarType.OutlineBlack
      ? themed.bgPrimaryBlack
      : type === EAvatarType.OutlineGrey
      ? themed.borderDefault
      : undefined;

  const dotSize = Math.max(8, Math.round(sizePx * 0.22));

  if (isWeb) {
    const containerStyle: React.CSSProperties = {
      position: "relative",
      display: "inline-flex",
      width: sizePx,
      height: sizePx,
      borderRadius: radius.full.value,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:
        type === EAvatarType.Letters
          ? colors.celurenBlue[100].value
          : themed.bgSecondary,
      ...(borderColor ? { border: `2px solid ${borderColor}` } : {}),
      cursor: onPress ? "pointer" : undefined,
      ...flattenStyle(style),
    };

    const inner =
      type === EAvatarType.Letters ? (
        <span style={{ fontSize, fontWeight: "600", color: colors.celurenBlue[700].value, userSelect: "none" }}>
          {initials}
        </span>
      ) : source ? (
        <img
          src={source as string}
          alt={name ?? "avatar"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span style={{ fontSize, color: themed.textSecondary }}>?</span>
      );

    const dotEl = hasDot ? (
      <span
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: colors.success.main.value,
          border: `2px solid ${themed.bgPrimary}`,
        }}
      />
    ) : null;

    if (onPress) {
      return (
        <div
          style={containerStyle}
          onClick={onPress}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPress(); } }}
        >
          {inner}
          {dotEl}
        </div>
      );
    }
    return (
      <div style={containerStyle}>
        {inner}
        {dotEl}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText, Image } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>; Image: React.ComponentType<Record<string, unknown>>;

  };

  const rnContainerStyle: Record<string, unknown> = {
    position: "relative",
    width: sizePx,
    height: sizePx,
    borderRadius: radius.full.value,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      type === EAvatarType.Letters
        ? colors.celurenBlue[100].value
        : themed.bgSecondary,
    ...(borderColor ? { borderWidth: 2, borderColor } : {}),
    ...flattenStyle(style),
  };

  const inner =
    type === EAvatarType.Letters ? (
      <RNText allowFontScaling={false} style={{ fontSize, fontWeight: "600", color: colors.celurenBlue[700].value }}>
        {initials}
      </RNText>
    ) : source ? (
      <Image source={source} style={{ width: sizePx, height: sizePx }} resizeMode="cover" />
    ) : (
      <RNText allowFontScaling={false} style={{ fontSize, color: themed.textSecondary }}>?</RNText>
    );

  const dotEl = hasDot ? (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        backgroundColor: colors.success.main.value,
        borderWidth: 2,
        borderColor: themed.bgPrimary,
      }}
    />
  ) : null;

  const Wrapper = onPress ? TouchableOpacity : View;
  const wrapperProps = onPress ? { onPress, activeOpacity: 0.8 } : {};

  return (
    <Wrapper style={rnContainerStyle} {...wrapperProps}>
      {inner}
      {dotEl}
    </Wrapper>
  );
};

Avatars.displayName = "Avatars";
export default Avatars;
