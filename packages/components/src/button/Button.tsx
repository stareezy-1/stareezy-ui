/**
 * Button — cross-platform button component for Stareezy UI.
 *
 * All visual styles live in Button.style.ts — no inline styles here.
 * Enums live in Button.types.ts to avoid circular imports with Button.style.ts.
 *
 * Requirements: 13.1–13.5, 17.1, 17.3, 17.4
 */

import React from "react";
import { spacing } from "@stareezy-ui/tokens";
import { Text, ETextType } from "../primitives/Text";
import { useThemedColors } from "../shared/useThemedColors";
import { flattenStyle } from "../shared/flattenStyle";
import { isWeb } from "../shared/platform";
import { View } from "../primitives/View";
import type { StyleProp } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import {
  webBase,
  webTypeGeometry,
  webSizePresets,
  webDefaultPadding,
  webIconSizePresets,
  webIconDefaultPadding,
  webDisabledOverride,
  webAbsoluteBottomOuter,
  webSpinner,
  nativeBase,
  nativeSizePresets,
  nativeDefaultPadding,
  nativeIconSizePresets,
  nativeIconDefaultPadding,
  nativeAbsoluteBottomOuterGeometry,
  BUTTON_BORDER_RADIUS,
  BUTTON_BORDER_WIDTH,
} from "./Button.style";
import { useSx, SxStyleTag } from "../shared/useSx";

// Re-export enums from types file so consumers import from "Button" as before
export { EButtonType, EButtonSize } from "./Button.types";
import { EButtonType, EButtonSize } from "./Button.types";
import type { SzrFC } from "../shared/types";

// ---------------------------------------------------------------------------
// ButtonProps
// ---------------------------------------------------------------------------

export interface ButtonProps extends BoxLayoutProps {
  /** Button label text. */
  text?: string;
  /** Button type / variant. Default: Primary. */
  type?: EButtonType;
  /** Button size. Default: full-width. */
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
  style?: StyleProp;
  /** Text style override. */
  textStyle?: StyleProp;
  testID?: string;
  accessibilityLabel?: string;
  /** Full-width — stretches button to 100% of its container. Default: false. */
  fullWidth?: boolean;
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
        style={{ ...webSpinner, borderColor: color ?? "currentColor" }}
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
// Theme-aware color resolver
// ---------------------------------------------------------------------------

function useButtonColors(
  type: EButtonType,
  disabled: boolean,
  themed: ReturnType<typeof useThemedColors>,
) {
  const bgMap: Record<EButtonType, string> = {
    [EButtonType.Primary]: themed.surfaceDark,
    [EButtonType.Secondary]: themed.surface,
    [EButtonType.Tertiary]: themed.transparent,
    [EButtonType.Link]: themed.transparent,
    [EButtonType.WithBorder]: themed.surface,
    [EButtonType.AbsoluteBottom]: themed.surfaceDark,
    [EButtonType.AbsoluteBottomWithBorder]: themed.surfaceDark,
    [EButtonType.Transparent]: themed.transparent,
    [EButtonType.Ghost]: "rgba(255,255,255,0.05)",
    // Outline: no token match for this semi-transparent blue tint — kept with comment
    [EButtonType.Outline]: "rgba(59,130,246,0.05)", // no token — nearest: colors.celurenBlue[300] at full opacity
    [EButtonType.Danger]: themed.colorDanger,
  };

  const disabledBgMap: Partial<Record<EButtonType, string>> = {
    [EButtonType.Primary]: themed.bgDisabled,
    [EButtonType.Secondary]: themed.bgDisabled,
    [EButtonType.Tertiary]: themed.transparent,
  };

  const borderColorMap: Partial<Record<EButtonType, string>> = {
    [EButtonType.Secondary]: themed.borderDefault,
    [EButtonType.WithBorder]: themed.borderDefault,
    // Ghost: no token match for this semi-transparent white border — kept with comment
    [EButtonType.Ghost]: "rgba(255,255,255,0.15)", // no token — nearest: colors.neutral[10] at full opacity
    // Outline: no token match for this semi-transparent blue border — kept with comment
    [EButtonType.Outline]: "rgba(59,130,246,0.3)", // no token — nearest: colors.celurenBlue[300] at full opacity
    [EButtonType.Danger]: "transparent",
  };

  const disabledBorderColorMap: Partial<Record<EButtonType, string>> = {
    [EButtonType.Secondary]: themed.borderSecondary,
  };

  const textColorMap: Record<EButtonType, string> = {
    [EButtonType.Primary]: "#ffffff",
    [EButtonType.Secondary]: themed.textPrimary,
    [EButtonType.Tertiary]: themed.textPrimary,
    [EButtonType.Link]: themed.textPrimary,
    [EButtonType.WithBorder]: themed.textPrimary,
    [EButtonType.AbsoluteBottom]: "#ffffff",
    [EButtonType.AbsoluteBottomWithBorder]: "#ffffff",
    [EButtonType.Transparent]: themed.textPrimary,
    [EButtonType.Ghost]: themed.surface,
    [EButtonType.Outline]: themed.borderPrimaryBrand,
    [EButtonType.Danger]: themed.surface,
  };

  return {
    backgroundColor: disabled
      ? disabledBgMap[type] ?? bgMap[type]
      : bgMap[type],
    borderColor: disabled
      ? disabledBorderColorMap[type] ?? borderColorMap[type]
      : borderColorMap[type],
    textColor: disabled ? themed.textDisabled : textColorMap[type],
  };
}

// ---------------------------------------------------------------------------
// Web style builder
// ---------------------------------------------------------------------------

function buildWebContainerStyle(
  type: EButtonType,
  size: EButtonSize | undefined,
  isIconOnly: boolean,
  disabled: boolean,
  fullWidth: boolean,
  backgroundColor: string,
  borderColor: string | undefined,
  callerStyle: React.CSSProperties | null,
  focusRing?: string,
): React.CSSProperties {
  const geometry = webTypeGeometry[type];
  const sizeStyle = isIconOnly
    ? size
      ? webIconSizePresets[size]
      : webIconDefaultPadding
    : size
    ? webSizePresets[size]
    : webDefaultPadding;

  const border =
    geometry.borderWidth && geometry.borderWidth > 0
      ? `${geometry.borderWidth}px ${geometry.borderStyle ?? "solid"} ${
          borderColor ?? "transparent"
        }`
      : "none";

  return {
    ...webBase,
    ...sizeStyle,
    backgroundColor,
    borderRadius: geometry.borderRadius,
    border,
    width: "fit-content",
    height: "fit-content",
    ...(fullWidth && !isIconOnly
      ? {
          display: "flex",
          width: "100%",
          height: undefined,
          alignSelf: "auto",
          flexShrink: undefined,
        }
      : {}),
    ...(disabled ? webDisabledOverride : {}),
    ...(focusRing ? { boxShadow: focusRing } : {}),
    ...(callerStyle ?? {}),
  };
}

// ---------------------------------------------------------------------------
// Native style builder
// ---------------------------------------------------------------------------

function buildNativeContainerStyle(
  type: EButtonType,
  size: EButtonSize | undefined,
  isIconOnly: boolean,
  disabled: boolean,
  fullWidth: boolean,
  backgroundColor: string,
  borderColor: string | undefined,
  callerStyle: Record<string, unknown> | null,
): Record<string, unknown> {
  const geometry = webTypeGeometry[type];
  const sizeStyle = isIconOnly
    ? size
      ? nativeIconSizePresets[size]
      : nativeIconDefaultPadding
    : size
    ? nativeSizePresets[size]
    : nativeDefaultPadding;

  return {
    ...nativeBase,
    ...sizeStyle,
    backgroundColor,
    borderRadius: geometry.borderRadius,
    ...(geometry.borderWidth && geometry.borderWidth > 0
      ? {
          borderWidth: BUTTON_BORDER_WIDTH,
          borderColor: borderColor ?? "transparent",
          borderStyle: "solid",
        }
      : {}),
    ...(fullWidth && !isIconOnly ? { width: "100%" } : {}),
    ...(isIconOnly ? { alignSelf: "center" } : {}),
    ...(disabled ? { opacity: 0.6 } : {}),
    ...(callerStyle ?? {}),
  };
}

// ---------------------------------------------------------------------------
// Button component
// ---------------------------------------------------------------------------

export const Button: SzrFC<ButtonProps> = (props) => {
  const {
    layout: _layout,
    sxProps,
    rest: buttonRest,
  } = extractBoxLayoutProps(props);

  // Resolve sx + layout props directly into styles on the button element itself.
  const sx = sxProps as import("../shared/sx").SxProp;
  const { sxStyle, sxClassName, sxCss } = useSx(sx);

  // Cast rest back to the component-specific props so TypeScript sees full types.
  // extractBoxLayoutProps strips layout keys at runtime; this cast is sound.
  const {
    text,
    type = EButtonType.Primary,
    size,
    textType = ETextType.button,
    textProps,
    loading,
    disabled = false,
    icon,
    leftIcon,
    rightIcon,
    children,
    onPress,
    style,
    textStyle,
    testID,
    accessibilityLabel,
    fullWidth = false,
  } = buttonRest as ButtonProps;

  const themed = useThemedColors();
  const { backgroundColor, borderColor, textColor } = useButtonColors(
    type,
    disabled,
    themed,
  );

  // Focus ring for keyboard navigation (web only — applied via onFocus/onBlur)
  const [isFocused, setIsFocused] = React.useState(false);
  const webFocusRing =
    isWeb && isFocused && !disabled ? themed.focusRing : undefined;

  const a11yLabel = accessibilityLabel ?? testID;
  const isIconOnly = !!icon && !text && !children;
  const callerFlat = flattenStyle(style) as Record<string, unknown>;

  // ── Label content ──────────────────────────────────────────────────────────
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
          color={themed.textSecondary}
        />
      )}
    </>
  );

  // ── Build the core button element ─────────────────────────────────────────
  // Rendered first, then optionally wrapped in a Box for layout props.

  let buttonElement: React.ReactElement;

  // ── AbsoluteBottomWithBorder ───────────────────────────────────────────────
  if (type === EButtonType.AbsoluteBottomWithBorder) {
    if (isWeb) {
      const outerStyle: React.CSSProperties = {
        ...webAbsoluteBottomOuter,
        backgroundColor: themed.surface,
        borderTop: `${BUTTON_BORDER_WIDTH}px solid ${themed.borderTertiary}`,
      };
      const innerStyle = buildWebContainerStyle(
        type,
        size,
        false,
        disabled,
        false,
        backgroundColor,
        borderColor,
        callerFlat as React.CSSProperties | null,
        webFocusRing,
      );
      buttonElement = (
        <div style={outerStyle}>
          <button
            type="button"
            onClick={onPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            aria-disabled={disabled}
            aria-busy={loading}
            aria-label={a11yLabel}
            data-testid={testID}
            style={{ ...innerStyle, ...sxStyle }}
            className={sxClassName || undefined}
          >
            {labelContent}
          </button>
        </div>
      );
    } else {
      const outerNativeStyle = {
        ...nativeAbsoluteBottomOuterGeometry,
        backgroundColor: themed.surface,
        borderTopWidth: BUTTON_BORDER_WIDTH,
        borderTopColor: themed.borderTertiary,
      };
      const innerNativeStyle = buildNativeContainerStyle(
        type,
        size,
        false,
        disabled,
        false,
        backgroundColor,
        borderColor,
        callerFlat,
      );
      buttonElement = (
        <View style={outerNativeStyle}>
          <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            accessibilityLabel={a11yLabel}
            accessibilityState={{ disabled: !!disabled, busy: !!loading }}
            testID={testID}
            style={{ ...innerNativeStyle, ...sxStyle }}
          >
            {labelContent}
          </TouchableOpacity>
        </View>
      );
    }
    // ── Icon-only ──────────────────────────────────────────────────────────────
  } else if (isIconOnly) {
    if (isWeb) {
      const iconStyle = buildWebContainerStyle(
        type,
        size,
        true,
        disabled,
        false,
        backgroundColor,
        borderColor,
        callerFlat as React.CSSProperties | null,
        webFocusRing,
      );
      buttonElement = (
        <button
          type="button"
          onClick={onPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          aria-disabled={disabled}
          aria-busy={loading}
          aria-label={a11yLabel}
          data-testid={testID}
          style={{ ...iconStyle, ...sxStyle }}
          className={sxClassName || undefined}
        >
          {children ?? icon}
        </button>
      );
    } else {
      const iconNativeStyle = buildNativeContainerStyle(
        type,
        size,
        true,
        disabled,
        false,
        backgroundColor,
        borderColor,
        callerFlat,
      );
      buttonElement = (
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          accessibilityLabel={a11yLabel}
          accessibilityState={{ disabled: !!disabled, busy: !!loading }}
          testID={testID}
          style={{ ...iconNativeStyle, ...sxStyle }}
        >
          {children ?? icon}
        </TouchableOpacity>
      );
    }
    // ── Standard button ────────────────────────────────────────────────────────
  } else if (isWeb) {
    const containerStyle = buildWebContainerStyle(
      type,
      size,
      false,
      disabled,
      fullWidth,
      backgroundColor,
      borderColor,
      callerFlat as React.CSSProperties | null,
      webFocusRing,
    );
    buttonElement = (
      <button
        type="button"
        onClick={onPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        aria-disabled={disabled}
        aria-busy={loading}
        aria-label={a11yLabel}
        data-testid={testID}
        style={{ ...containerStyle, ...sxStyle }}
        className={sxClassName || undefined}
      >
        {labelContent}
      </button>
    );
  } else {
    const containerNativeStyle = buildNativeContainerStyle(
      type,
      size,
      false,
      disabled,
      fullWidth,
      backgroundColor,
      borderColor,
      callerFlat,
    );
    buttonElement = (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        accessibilityLabel={a11yLabel}
        accessibilityState={{ disabled: !!disabled, busy: !!loading }}
        testID={testID}
        style={{ ...containerNativeStyle, ...sxStyle }}
      >
        {labelContent}
      </TouchableOpacity>
    );
  }

  // Render SxStyleTag for responsive CSS rules (no Box wrapper needed).
  if (sxCss && isWeb)
    return (
      <>
        {/* @ts-ignore */}
        <SxStyleTag css={sxCss} scopeClass={sxClassName} />
        {buttonElement}
      </>
    );
  return buttonElement;
};

Button.displayName = "Button";

export default Button;
