/**
 * Labels — form label component with size/type/hint styling.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 17.1
 */

import React from "react";
import { colors, spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { flattenStyle } from '../shared/flattenStyle';

export enum ElabelsSize {
  Sm = "Sm",
  Md = "Md",
  Lg = "Lg",
}

export enum ELabelsType {
  Reguler = "Reguler",
  Medium = "Medium",
  SemiBold = "SemiBold",
  Bold = "Bold",
}

export enum EHintTextType {
  Disable = "Disable",
  Placeholder = "Placeholder",
  Danger = "Danger",
  Primary = "Primary",
  Warning = "Warning",
  Info = "Info",
}

export interface ILabelsProps {
  size?: ElabelsSize;
  type?: ELabelsType;
  text: string;
  hintTextType?: EHintTextType;
  hintTextIcon?: React.ReactNode;
  isRequired?: boolean;
  textStyle?: React.CSSProperties | Record<string, unknown>;
  style?: React.CSSProperties | Record<string, unknown>;
}

function getFontSize(size?: ElabelsSize): number {
  switch (size) {
    case ElabelsSize.Sm: return spacing[12].value;
    case ElabelsSize.Lg: return spacing[16].value;
    default: return spacing[14].value;
  }
}

function getFontWeight(type?: ELabelsType): "400" | "500" | "600" | "700" {
  switch (type) {
    case ELabelsType.Medium: return "500";
    case ELabelsType.SemiBold: return "600";
    case ELabelsType.Bold: return "700";
    default: return "400";
  }
}

export const Labels: React.FC<ILabelsProps> = ({
  size, type, text, hintTextType, hintTextIcon, isRequired, textStyle, style,
}) => {
  const themed = useThemedColors();
  const fontSize = getFontSize(size);
  const fontWeight = getFontWeight(type);

  let hintColor = themed.textSecondary;
  if (hintTextType === EHintTextType.Disable) hintColor = themed.textDisabled;
  else if (hintTextType === EHintTextType.Placeholder) hintColor = themed.textPlaceholder;
  else if (hintTextType === EHintTextType.Danger) hintColor = themed.textDanger;
  else if (hintTextType === EHintTextType.Primary) hintColor = themed.textPrimary;
  else if (hintTextType === EHintTextType.Warning) hintColor = themed.textWarningPrimary;
  else if (hintTextType === EHintTextType.Info) hintColor = themed.textImportantBrand;

  const resolvedTextColor = hintTextType ? hintColor : themed.textPrimary;

  if (isWeb) {
    return (
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: spacing[4].value, ...flattenStyle(style) }}>
        {hintTextIcon && <span style={{ display: "flex", alignItems: "center" }}>{hintTextIcon}</span>}
        <span style={{ fontSize, fontWeight: fontWeight as React.CSSProperties["fontWeight"], color: resolvedTextColor, ...flattenStyle(textStyle) }}>
          {text}
          {isRequired && <span style={{ color: colors.danger.main.value, marginLeft: spacing[2].value }}>*</span>}
        </span>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", ...flattenStyle(style) }}>
      {hintTextIcon}
      <RNText style={{ fontSize, fontWeight, color: resolvedTextColor, ...flattenStyle(textStyle) }} allowFontScaling={false}>
        {text}
        {isRequired && <RNText style={{ color: colors.danger.main.value }}>{" *"}</RNText>}
      </RNText>
    </View>
  );
};

Labels.displayName = "Labels";
export default Labels;
