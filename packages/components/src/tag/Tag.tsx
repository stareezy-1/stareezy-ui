/**
 * Tag — cross-platform tag/chip component.
 *
 * All visual styles live in Tag.style.ts — no inline color literals here.
 * Colors are resolved at render time via useThemedColors().
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */

import React from "react";
import { useThemedColors } from "../shared/useThemedColors";
import { isWeb } from "../shared/platform";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import { ETagVariant } from "./Tag.types";
import type { SzrFC } from "../shared/types";
import { useSx, SxStyleTag } from "../shared/useSx";
import {
  webTagBase,
  webVariantBorder,
  webDismissBase,
  nativeTagBase,
  nativeDismissBase,
} from "./Tag.style";

export { ETagVariant } from "./Tag.types";

// ---------------------------------------------------------------------------
// TagProps
// ---------------------------------------------------------------------------

export interface TagProps extends BoxLayoutProps {
  /** Tag label text. */
  label: string;
  /** Visual variant. Default: "solid". */
  variant?: ETagVariant;
  /** Optional dismiss handler — renders an ✕ button when provided. */
  onDismiss?: () => void;
  /** Optional accent color override (hex or CSS color string). */
  color?: string;
  testID?: string;
  accessibilityLabel?: string;
}

// ---------------------------------------------------------------------------
// Color resolver per variant
// ---------------------------------------------------------------------------

function resolveTagColors(
  variant: ETagVariant,
  themed: ReturnType<typeof useThemedColors>,
  accentColor?: string,
): { bg: string; fg: string; border: string } {
  switch (variant) {
    case ETagVariant.Solid:
      return {
        bg: accentColor ?? themed.surfaceDark,
        fg: themed.surface,
        border: "transparent",
      };
    case ETagVariant.Outline:
      return {
        bg: "transparent",
        fg: accentColor ?? themed.textPrimary,
        border: accentColor ?? themed.borderDefault,
      };
    case ETagVariant.Subtle:
    default:
      return {
        bg: themed.bgSecondary,
        fg: accentColor ?? themed.textPrimary,
        border: "transparent",
      };
  }
}

// ---------------------------------------------------------------------------
// Tag
// ---------------------------------------------------------------------------

export const Tag: SzrFC<TagProps> = (props) => {
  const { sxProps, rest } = extractBoxLayoutProps(props);
  const sx = sxProps as import("../shared/sx").SxProp;
  const { sxStyle, sxClassName, sxCss } = useSx(sx);

  const {
    label,
    variant = ETagVariant.Solid,
    onDismiss,
    color: accentColor,
    testID,
    accessibilityLabel,
  } = rest as TagProps;

  const themed = useThemedColors();
  const { bg, fg, border } = resolveTagColors(variant, themed, accentColor);

  const tagElement = isWeb ? (
    <span
      role={onDismiss ? "group" : undefined}
      aria-label={accessibilityLabel ?? label}
      data-testid={testID}
      className={sxClassName || undefined}
      style={{
        ...webTagBase,
        ...webVariantBorder[variant],
        backgroundColor: bg,
        color: fg,
        borderColor: border,
        ...sxStyle,
      }}
    >
      {label}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={`remove ${label}`}
          style={{
            ...webDismissBase,
            color: fg,
          }}
        >
          ✕
        </button>
      )}
    </span>
  ) : (
    // React Native
    (() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { View, TouchableOpacity, Text } = require("react-native") as {
        View: React.ComponentType<Record<string, unknown>>;
        TouchableOpacity: React.ComponentType<Record<string, unknown>>;
        Text: React.ComponentType<Record<string, unknown>>;
      };

      const nativeStyle: Record<string, unknown> = {
        ...nativeTagBase,
        backgroundColor: bg,
        ...(variant === ETagVariant.Outline
          ? { borderWidth: 1, borderColor: border }
          : {}),
        ...sxStyle,
      };

      return (
        <View
          accessibilityRole={onDismiss ? "none" : "text"}
          accessibilityLabel={accessibilityLabel ?? label}
          testID={testID}
          style={nativeStyle}
        >
          <Text style={{ color: fg, fontSize: 12, fontWeight: "500" }}>
            {label}
          </Text>
          {onDismiss && (
            <TouchableOpacity
              onPress={onDismiss}
              accessibilityRole="button"
              accessibilityLabel={`remove ${label}`}
              style={nativeDismissBase}
            >
              <Text style={{ color: fg, fontSize: 10, fontWeight: "700" }}>
                ✕
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    })()
  );

  if (sxCss && isWeb)
    return (
      <>
        {/* @ts-ignore */}
        <SxStyleTag css={sxCss} scopeClass={sxClassName} />
        {tagElement}
      </>
    );
  return tagElement;
};

Tag.displayName = "Tag";
export default Tag;
