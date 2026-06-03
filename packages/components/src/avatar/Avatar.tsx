/**
 * Avatar — user avatar with image, initials fallback, status indicator.
 * Root wrapper accepts BoxProps. Initials rendered via <Text>.
 */

import React from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";
import { SIZE_PX, FONT_SIZE, STATUS_SIZE, SHAPE_RADIUS } from "./Avatar.style";
import { AVATAR_GRADIENTS, getAvatarGradient } from "./Avatar.gradients";
import type { AvatarSize, AvatarShape, AvatarStatus } from "./Avatar.types";

export type { AvatarSize, AvatarShape, AvatarStatus };

export interface AvatarProps extends Omit<BoxProps, "children"> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  fallbackIcon?: React.ReactNode;
  initialsTextType?: ETextType;
  initialsTextStyle?: StyleProp;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return (parts[0] ?? "").slice(0, 2).toUpperCase();
  return (
    ((parts[0] ?? "")[0] ?? "") +
    ((parts[parts.length - 1] ?? "")[0] ?? "").toUpperCase()
  );
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = "md",
  shape = "circle",
  status,
  fallbackIcon,
  initialsTextType,
  initialsTextStyle,
  testID,
  ...boxProps
}) => {
  const [imgError, setImgError] = React.useState(false);
  const themed = useThemedColors();

  // Status colors resolved from the theme at render time
  const statusColors: Record<AvatarStatus, string> = {
    online: themed.colorSuccess,
    offline: themed.textDisabled,
    away: themed.colorWarning,
    busy: themed.colorDanger,
  };

  const px = SIZE_PX[size];
  const fontSize = FONT_SIZE[size];
  const borderRadius = SHAPE_RADIUS[shape];
  const showFallback = !src || imgError;
  const initials = name ? getInitials(name) : null;
  // Decorative gradient — theme-independent (Req 10.6)
  const gradient = name
    ? getAvatarGradient(name)
    : AVATAR_GRADIENTS[0] ?? "linear-gradient(135deg,#667eea 0%,#764ba2 100%)";

  if (isWeb) {
    const statusDotSize = status ? STATUS_SIZE[size] : 0;

    return (
      <Box
        position="relative"
        display="inline-flex"
        style={{ flexShrink: 0 }}
        data-testid={testID}
        {...boxProps}
      >
        <span
          role="img"
          aria-label={alt ?? name ?? "avatar"}
          style={{
            width: px,
            height: px,
            borderRadius: borderRadius as string,
            overflow: "hidden",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: showFallback ? gradient : undefined,
            userSelect: "none",
          }}
        >
          {!showFallback && (
            <img
              src={src}
              alt={alt ?? name ?? "avatar"}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          {showFallback && fallbackIcon}
          {showFallback && !fallbackIcon && initials && (
            <Text
              {...(initialsTextType !== undefined
                ? { type: initialsTextType }
                : {})}
              text={initials}
              color={themed.surface}
              style={{
                fontSize,
                fontWeight: "700",
                lineHeight: 1,
                letterSpacing: "0.02em",
                ...(initialsTextStyle as React.CSSProperties),
              }}
            />
          )}
        </span>
        {status && (
          <span
            aria-label={status}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: statusDotSize,
              height: statusDotSize,
              borderRadius: "50%",
              backgroundColor: statusColors[status],
              border: `2px solid ${themed.surface}`,
              boxSizing: "border-box",
            }}
          />
        )}
      </Box>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View, Image } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
    Image: React.ComponentType<Record<string, unknown>>;
  };

  const rnBorderRadius =
    shape === "circle" ? px / 2 : shape === "rounded" ? px * 0.25 : 0;

  // RN fallback bg: use the brand color from theme (Req 10.8)
  const rnFallbackBgColor = themed.bgInteractive;

  return (
    <Box
      position="relative"
      width={px}
      height={px}
      testID={testID}
      {...boxProps}
    >
      <View
        style={{
          width: px,
          height: px,
          borderRadius: rnBorderRadius,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: rnFallbackBgColor,
        }}
      >
        {!showFallback ? (
          <Image
            source={{ uri: src }}
            style={{ width: px, height: px }}
            onError={() => setImgError(true)}
            accessibilityLabel={alt ?? name ?? "avatar"}
          />
        ) : initials ? (
          <Text
            {...(initialsTextType !== undefined
              ? { type: initialsTextType }
              : {})}
            text={initials}
            color={themed.surface}
            style={{
              fontSize,
              fontWeight: "700",
              ...(initialsTextStyle as Record<string, unknown>),
            }}
          />
        ) : null}
      </View>
      {status && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: STATUS_SIZE[size],
            height: STATUS_SIZE[size],
            borderRadius: STATUS_SIZE[size] / 2,
            backgroundColor: statusColors[status],
            borderWidth: 2,
            borderColor: themed.surface,
          }}
        />
      )}
    </Box>
  );
};

Avatar.displayName = "Avatar";
export default Avatar;
