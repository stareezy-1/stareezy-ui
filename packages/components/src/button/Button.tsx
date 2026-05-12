/**
 * Button — full port of rekosistem-components/src/components/button/button.tsx.
 * Replaces Tamagui with the new token system.
 *
 * Supports all EButtonType variants, all EButtonSize values, icon-only mode,
 * AbsoluteBottomWithBorder layout, loading/disabled states, and full
 * accessibility attributes.
 *
 * Requirements: 13.1–13.5, 17.1, 17.3, 17.4
 */

import React from "react";
import { colors, spacing, radius, ss } from "@stareezy-ui/tokens";
import { Text, ETextType } from "../primitives/Text";
import { useThemedColors } from "../shared/useThemedColors";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

// ---------------------------------------------------------------------------
// Enums — mirrors button.props.ts
// ---------------------------------------------------------------------------

export enum EButtonType {
  Primary = "Primary",
  Secondary = "Secondary",
  Tertiary = "Tertiary",
  Link = "link",
  WithBorder = "with-border",
  AbsoluteBottom = "absolute-bottom",
  AbsoluteBottomWithBorder = "absolute-bottom-with-border",
  Transparent = "transparent",
}

export enum EButtonSize {
  SM = "SM",
  MD = "MD",
  LG = "LG",
  XL = "XL",
  XXL = "XXL",
}

// ---------------------------------------------------------------------------
// Style presets — built at render time from themed colors
// ---------------------------------------------------------------------------

interface ButtonStylePreset {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  padding?: number;
  width?: string | number;
  alignSelf?: string;
  position?: string;
  bottom?: number;
  right?: number;
  left?: number;
  borderTopColor?: string;
  borderTopWidth?: number;
  justifyContent?: string;
  opacity?: number;
}

interface TextColorPreset {
  color: string;
}

// Base (spacing/radius only — no colors)
const BASE: ButtonStylePreset = {
  paddingVertical: ss.lG.value,
  borderRadius: radius.full.value,
};

// Size presets (no colors — safe to define at module level)
const SIZE_PRESETS: Record<EButtonSize, ButtonStylePreset> = {
  [EButtonSize.SM]: {
    paddingVertical: ss.sM.value,
    paddingHorizontal: ss.lG.value,
  },
  [EButtonSize.MD]: {
    paddingVertical: spacing[8].value,
    paddingHorizontal: ss.xL.value,
  },
  [EButtonSize.LG]: {
    paddingVertical: spacing[10].value,
    paddingHorizontal: ss["2xL"].value,
  },
  [EButtonSize.XL]: {
    paddingVertical: ss.lG.value,
    paddingHorizontal: ss["3xL"].value,
  },
  [EButtonSize.XXL]: {
    paddingVertical: ss.xL.value,
    paddingHorizontal: ss["4xL"].value,
  },
};

const ICON_SIZE_PRESETS: Record<EButtonSize, ButtonStylePreset> = {
  [EButtonSize.SM]: { padding: ss.sM.value },
  [EButtonSize.MD]: { padding: ss.mD.value },
  [EButtonSize.LG]: { padding: spacing[10].value },
  [EButtonSize.XL]: { padding: ss.lG.value },
  [EButtonSize.XXL]: { padding: ss.xL.value },
};

/**
 * Build color-bearing presets at render time using the active theme.
 * Called inside the component so dark/light switching is reflected.
 */
function buildThemedPresets(themed: ReturnType<typeof useThemedColors>) {
  const TYPE_PRESETS: Record<EButtonType, ButtonStylePreset> = {
    [EButtonType.Primary]: {
      ...BASE,
      backgroundColor: themed.surfaceDark,
    },
    [EButtonType.Secondary]: {
      ...BASE,
      backgroundColor: themed.surface,
      borderColor: themed.borderDefault,
      borderWidth: spacing[1].value,
    },
    [EButtonType.Tertiary]: {
      ...BASE,
      backgroundColor: themed.transparent,
      borderWidth: 0,
    },
    [EButtonType.Link]: {
      backgroundColor: themed.transparent,
    },
    [EButtonType.WithBorder]: {
      ...BASE,
      backgroundColor: themed.surface,
      borderColor: themed.borderDefault,
      borderWidth: spacing[1].value,
    },
    [EButtonType.AbsoluteBottom]: {
      ...BASE,
      backgroundColor: themed.surfaceDark,
    },
    [EButtonType.AbsoluteBottomWithBorder]: {
      ...BASE,
      backgroundColor: themed.surfaceDark,
    },
    [EButtonType.Transparent]: {
      backgroundColor: themed.transparent,
      borderWidth: 0,
      padding: 0,
      borderRadius: 0,
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
  };

  const DISABLED_PRESETS: Partial<Record<EButtonType, ButtonStylePreset>> = {
    [EButtonType.Primary]: { backgroundColor: themed.bgDisabled },
    [EButtonType.Secondary]: {
      backgroundColor: themed.bgDisabled,
      borderColor: themed.borderSecondary,
      borderWidth: spacing[1].value,
    },
    [EButtonType.Tertiary]: { backgroundColor: themed.transparent },
  };

  const TEXT_COLOR_PRESETS: Record<EButtonType, TextColorPreset> = {
    [EButtonType.Primary]: { color: themed.textInverse },
    [EButtonType.Secondary]: { color: themed.textPrimary },
    [EButtonType.Tertiary]: { color: themed.textPrimary },
    [EButtonType.Link]: { color: themed.textPrimary },
    [EButtonType.WithBorder]: { color: themed.textPrimary },
    [EButtonType.AbsoluteBottom]: { color: themed.textInverse },
    [EButtonType.AbsoluteBottomWithBorder]: { color: themed.textInverse },
    [EButtonType.Transparent]: { color: themed.textPrimary },
  };

  return { TYPE_PRESETS, DISABLED_PRESETS, TEXT_COLOR_PRESETS };
}

// ---------------------------------------------------------------------------
// ButtonProps
// ---------------------------------------------------------------------------

export interface ButtonProps {
  /** Button label text. */
  text?: string;
  /** Button type / variant. Default: Primary. */
  type?: EButtonType;
  /** Button size. Default: full-width mobile. */
  size?: EButtonSize;
  /** Text type for the label. Default: button. */
  textType?: ETextType;
  /** Additional props forwarded to the inner Text component. */
  textProps?: Partial<React.ComponentProps<typeof Text>>;
  /** Show loading indicator alongside content. */
  loading?: boolean;
  /** Success state (reserved for future use). */
  success?: boolean;
  /** Disabled state. */
  disabled?: boolean;
  /** Icon-only mode — renders a square button sized to the icon. */
  icon?: React.ReactNode;
  /** Icon rendered to the left of the label. */
  leftIcon?: React.ReactNode;
  /** Icon rendered to the right of the label. */
  rightIcon?: React.ReactNode;
  /** Child nodes override (replaces default label rendering). */
  children?: React.ReactNode;
  /** Press handler. */
  onPress?: () => void;
  /** Style override. */
  style?: React.CSSProperties | Record<string, unknown>;
  /** Text style override. */
  textStyle?: React.CSSProperties | Record<string, unknown>;
  testID?: string;
  accessibilityLabel?: string;
  /** Full-width on mobile (default true for non-icon buttons). */
  fullWidth?: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mergeStyles(
  ...styles: (ButtonStylePreset | undefined)[]
): ButtonStylePreset {
  return Object.assign({}, ...styles.filter(Boolean));
}

function presetToWebStyle(preset: ButtonStylePreset): React.CSSProperties {
  return {
    backgroundColor: preset.backgroundColor,
    borderColor: preset.borderColor,
    borderWidth: preset.borderWidth,
    borderStyle: preset.borderWidth ? "solid" : undefined,
    borderRadius: preset.borderRadius,
    paddingTop: preset.paddingVertical,
    paddingBottom: preset.paddingVertical,
    paddingLeft: preset.paddingHorizontal ?? preset.padding,
    paddingRight: preset.paddingHorizontal ?? preset.padding,
    padding: preset.padding,
    width: preset.width,
    alignSelf: preset.alignSelf as React.CSSProperties["alignSelf"],
    position: preset.position as React.CSSProperties["position"],
    bottom: preset.bottom,
    right: preset.right,
    left: preset.left,
    borderTopColor: preset.borderTopColor,
    borderTopWidth: preset.borderTopWidth,
    justifyContent:
      preset.justifyContent as React.CSSProperties["justifyContent"],
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    boxSizing: "border-box",
  };
}

function presetToRnStyle(preset: ButtonStylePreset): Record<string, unknown> {
  const s: Record<string, unknown> = {};
  if (preset.backgroundColor !== undefined)
    s["backgroundColor"] = preset.backgroundColor;
  if (preset.borderColor !== undefined) s["borderColor"] = preset.borderColor;
  if (preset.borderWidth !== undefined) s["borderWidth"] = preset.borderWidth;
  if (preset.borderRadius !== undefined)
    s["borderRadius"] = preset.borderRadius;
  if (preset.paddingVertical !== undefined)
    s["paddingVertical"] = preset.paddingVertical;
  if (preset.paddingHorizontal !== undefined)
    s["paddingHorizontal"] = preset.paddingHorizontal;
  if (preset.padding !== undefined) s["padding"] = preset.padding;
  if (preset.width !== undefined) s["width"] = preset.width;
  if (preset.alignSelf !== undefined) s["alignSelf"] = preset.alignSelf;
  if (preset.position !== undefined) s["position"] = preset.position;
  if (preset.bottom !== undefined) s["bottom"] = preset.bottom;
  if (preset.right !== undefined) s["right"] = preset.right;
  if (preset.left !== undefined) s["left"] = preset.left;
  if (preset.borderTopColor !== undefined)
    s["borderTopColor"] = preset.borderTopColor;
  if (preset.borderTopWidth !== undefined)
    s["borderTopWidth"] = preset.borderTopWidth;
  if (preset.justifyContent !== undefined)
    s["justifyContent"] = preset.justifyContent;
  s["flexDirection"] = "row";
  s["alignItems"] = "center";
  return s;
}

// ---------------------------------------------------------------------------
// ActivityIndicator shim
// ---------------------------------------------------------------------------

function ActivityIndicatorShim({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) {
  if (isWeb) {
    return (
      <span
        style={{
          display: "inline-block",
          width: size ?? 16,
          height: size ?? 16,
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
  return <ActivityIndicator size={size} color={color} />;
}

// ---------------------------------------------------------------------------
// Button component
// ---------------------------------------------------------------------------

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    text,
    type = EButtonType.Primary,
    size,
    textType = ETextType.button,
    textProps,
    loading,
    disabled,
    icon,
    leftIcon,
    rightIcon,
    children,
    onPress,
    style,
    textStyle,
    testID,
    accessibilityLabel,
    fullWidth = !icon,
  } = props;

  // Read theme-aware colors at render time.
  const themed = useThemedColors();
  const { TYPE_PRESETS, DISABLED_PRESETS, TEXT_COLOR_PRESETS } =
    buildThemedPresets(themed);

  // Resolve container style
  const typePreset = TYPE_PRESETS[type] ?? TYPE_PRESETS[EButtonType.Primary];
  const disabledPreset = disabled ? (DISABLED_PRESETS[type] ?? {}) : {};
  const sizePreset = size
    ? icon
      ? ICON_SIZE_PRESETS[size]
      : SIZE_PRESETS[size]
    : {};

  const containerPreset = mergeStyles(typePreset, disabledPreset, sizePreset);
  if (fullWidth && !icon) containerPreset.width = "100%";

  // Resolve text color
  const textColorPreset =
    TEXT_COLOR_PRESETS[type] ?? TEXT_COLOR_PRESETS[EButtonType.Primary];
  const textColor = disabled ? themed.textDisabled : textColorPreset.color;

  // Accessibility
  const a11yLabel = accessibilityLabel ?? testID;

  // Content
  const labelContent = children ?? (
    <>
      {leftIcon}
      <Text
        type={textType}
        {...(text !== undefined ? { text } : {})}
        color={textColor}
        {...(textStyle !== undefined ? { style: textStyle } : {})}
        {...textProps}
      />
      {rightIcon}
      {loading && (
        <ActivityIndicatorShim
          size={spacing.large.value}
          color={colors.raisinBlack[300].value}
        />
      )}
    </>
  );

  // AbsoluteBottomWithBorder layout
  if (type === EButtonType.AbsoluteBottomWithBorder) {
    const outerPreset: ButtonStylePreset = {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      borderTopColor: themed.borderTertiary,
      borderTopWidth: spacing[1].value,
      backgroundColor: themed.surface,
      justifyContent: "center",
      paddingVertical: spacing.extraMedium.value,
      paddingHorizontal: spacing.extraMedium.value,
    };

    if (isWeb) {
      return (
        <div style={presetToWebStyle(outerPreset)}>
          <button
            type="button"
            onClick={onPress}
            disabled={disabled}
            aria-disabled={disabled}
            aria-busy={loading}
            aria-label={a11yLabel}
            data-testid={testID}
            style={{
              ...presetToWebStyle(containerPreset),
              ...(style as React.CSSProperties | undefined),
              border: "none",
              outline: "none",
              background: "none",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            {labelContent}
          </button>
        </div>
      );
    }
    return (
      <View style={presetToRnStyle(outerPreset)}>
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          accessibilityLabel={a11yLabel}
          accessibilityState={{ disabled: !!disabled, busy: !!loading }}
          testID={testID}
          style={{
            ...presetToRnStyle(containerPreset),
            ...(style as Record<string, unknown> | undefined),
          }}
        >
          {labelContent}
        </TouchableOpacity>
      </View>
    );
  }

  // Icon-only mode
  if (icon) {
    const iconPreset = mergeStyles(
      { ...BASE, padding: ss.lG.value, borderRadius: radius.full.value },
      typePreset,
      disabledPreset,
      sizePreset,
    );
    delete iconPreset.width;
    iconPreset.alignSelf = "center";

    if (isWeb) {
      return (
        <button
          type="button"
          onClick={onPress}
          disabled={disabled}
          aria-disabled={disabled}
          aria-busy={loading}
          aria-label={a11yLabel}
          data-testid={testID}
          style={{
            ...presetToWebStyle(iconPreset),
            ...(style as React.CSSProperties | undefined),
            border: "none",
            outline: "none",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          {children ?? icon}
        </button>
      );
    }
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        accessibilityLabel={a11yLabel}
        accessibilityState={{ disabled: !!disabled, busy: !!loading }}
        testID={testID}
        style={{
          ...presetToRnStyle(iconPreset),
          ...(style as Record<string, unknown> | undefined),
        }}
      >
        {children ?? icon}
      </TouchableOpacity>
    );
  }

  // Standard button
  if (isWeb) {
    return (
      <button
        type="button"
        onClick={onPress}
        disabled={disabled}
        aria-disabled={disabled}
        aria-busy={loading}
        aria-label={a11yLabel}
        data-testid={testID}
        style={{
          ...presetToWebStyle(containerPreset),
          ...(style as React.CSSProperties | undefined),
          border: containerPreset.borderWidth
            ? `${containerPreset.borderWidth}px solid ${containerPreset.borderColor}`
            : "none",
          outline: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.7 : 1,
        }}
      >
        {labelContent}
      </button>
    );
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={a11yLabel}
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      testID={testID}
      style={{
        ...presetToRnStyle(containerPreset),
        ...(style as Record<string, unknown> | undefined),
      }}
    >
      {labelContent}
    </TouchableOpacity>
  );
};

Button.displayName = "Button";

export default Button;
