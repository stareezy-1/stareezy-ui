/**
 * Avatar — user avatar with image, initials fallback, status indicator.
 * Root wrapper accepts BoxProps for layout/spacing.
 */

import React from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps } from "../primitives/Box";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "rounded" | "square";
export type AvatarStatus = "online" | "offline" | "away" | "busy";

export interface AvatarProps extends Omit<BoxProps, "children"> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  fallbackIcon?: React.ReactNode;
}

const SIZE_PX: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  "2xl": 80,
};
const FONT_SIZE: Record<AvatarSize, number> = {
  xs: 9,
  sm: 12,
  md: 15,
  lg: 18,
  xl: 24,
  "2xl": 30,
};
const STATUS_SIZE: Record<AvatarSize, number> = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  "2xl": 16,
};

const STATUS_COLORS: Record<AvatarStatus, string> = {
  online: colors.lawnGreen[500].value,
  offline: colors.beauBlue[600].value,
  away: colors.brightYellowCrayola[500].value,
  busy: colors.crimsonRed[500].value,
};

const GRADIENTS = [
  "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
  "linear-gradient(135deg,#f093fb 0%,#f5576c 100%)",
  "linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)",
  "linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)",
  "linear-gradient(135deg,#fa709a 0%,#fee140 100%)",
  "linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)",
  "linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)",
  "linear-gradient(135deg,#a1c4fd 0%,#c2e9fb 100%)",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return (parts[0] ?? "").slice(0, 2).toUpperCase();
  return (
    ((parts[0] ?? "")[0] ?? "") +
    ((parts[parts.length - 1] ?? "")[0] ?? "").toUpperCase()
  );
}

function getGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length] ?? GRADIENTS[0] ?? "";
}

const SHAPE_RADIUS: Record<AvatarShape, string | number> = {
  circle: "50%",
  rounded: "25%",
  square: 0,
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = "md",
  shape = "circle",
  status,
  fallbackIcon,
  testID,
  ...boxProps
}) => {
  const [imgError, setImgError] = React.useState(false);
  const px = SIZE_PX[size];
  const fontSize = FONT_SIZE[size];
  const borderRadius = SHAPE_RADIUS[shape];
  const showFallback = !src || imgError;
  const initials = name ? getInitials(name) : null;
  const gradient = name
    ? getGradient(name)
    : GRADIENTS[0] ?? "linear-gradient(135deg,#667eea 0%,#764ba2 100%)";

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
            <span
              style={{
                fontSize,
                fontWeight: "700",
                color: "#ffffff",
                fontFamily: "Inter, system-ui, sans-serif",
                lineHeight: 1,
                letterSpacing: "0.02em",
              }}
            >
              {initials}
            </span>
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
              backgroundColor: STATUS_COLORS[status],
              border: "2px solid #ffffff",
              boxSizing: "border-box",
            }}
          />
        )}
      </Box>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const {
    View,
    Image,
    Text: RNText,
  } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
    Image: React.ComponentType<Record<string, unknown>>;
    Text: React.ComponentType<Record<string, unknown>>;
  };

  const rnBorderRadius =
    shape === "circle" ? px / 2 : shape === "rounded" ? px * 0.25 : 0;

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
          backgroundColor: colors.celurenBlue[400].value,
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
          <RNText
            style={{ fontSize, fontWeight: "700", color: "#ffffff" }}
            allowFontScaling={false}
          >
            {initials}
          </RNText>
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
            backgroundColor: STATUS_COLORS[status],
            borderWidth: 2,
            borderColor: "#ffffff",
          }}
        />
      )}
    </Box>
  );
};

Avatar.displayName = "Avatar";
export default Avatar;
