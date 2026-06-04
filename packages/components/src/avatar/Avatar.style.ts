/**
 * Avatar.style.ts — geometry-only style constants for the Avatar component.
 * All colors are resolved at render time via useThemedColors() in Avatar.tsx.
 */

import { registerClasses } from "../shared/componentSheet";
import type { AvatarSize, AvatarShape } from "./Avatar.types";

export const SIZE_PX: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  "2xl": 80,
};

export const FONT_SIZE: Record<AvatarSize, number> = {
  xs: 9,
  sm: 12,
  md: 15,
  lg: 18,
  xl: 24,
  "2xl": 30,
};

export const STATUS_SIZE: Record<AvatarSize, number> = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  "2xl": 16,
};

export const SHAPE_RADIUS: Record<AvatarShape, string | number> = {
  circle: "50%",
  rounded: "25%",
  square: 0,
};

// ── Stylesheet registration ───────────────────────────────────────────────────

export const avatarClasses = registerClasses("avatar", {
  container: {
    position: "relative",
    display: "inline-flex",
    flexShrink: 0,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  figure: {
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    userSelect: "none",
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    boxSizing: "border-box",
    borderRadius: "50%",
  },
});
