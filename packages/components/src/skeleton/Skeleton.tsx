/**
 * Skeleton — shimmer loading placeholder.
 * Root wrapper accepts BoxProps.
 */

import React from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Box } from "../primitives/Box";
import type { BoxProps } from "../primitives/Box";
import { SKELETON_KF } from "./Skeleton.style";
import type { SkeletonVariant } from "./Skeleton.types";
import type { SxProp } from "../shared/sx";
import type { SzrFC } from '../shared/types';

export type { SkeletonVariant };

export interface SkeletonProps
  extends Omit<BoxProps, "children" | "width" | "height"> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  lines?: number;
  animated?: boolean;
  baseColor?: string;
  highlightColor?: string;
  sx?: SxProp;
}

let skeletonKfInjected = false;
function injectSkeletonKf() {
  if (skeletonKfInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.setAttribute("data-szr-kf", "skeleton");
  el.textContent = SKELETON_KF;
  document.head.appendChild(el);
  skeletonKfInjected = true;
}

export const Skeleton: SzrFC<SkeletonProps> = ({
  variant = "rectangular",
  width,
  height,
  lines = 1,
  animated = true,
  baseColor,
  highlightColor,
  testID,
  sx,
  ...boxProps
}) => {
  const themed = useThemedColors();
  const resolvedBaseColor = baseColor ?? themed.borderSecondary;
  const resolvedHighlightColor = highlightColor ?? themed.bgSecondary;
  const getBorderRadius = () => {
    switch (variant) {
      case "circular":
        return 9999;
      case "text":
        return 4;
      case "rounded":
        return 12;
      default:
        return 6;
    }
  };

  if (isWeb) {
    injectSkeletonKf();

    const shimmerBg = animated
      ? `linear-gradient(90deg,${resolvedBaseColor} 25%,${resolvedHighlightColor} 50%,${resolvedBaseColor} 75%)`
      : resolvedBaseColor;

    if (lines > 1 && variant === "text") {
      return (
        <Box
          display="flex"
          flexDirection="column"
          gap={8}
          data-testid={testID}
          aria-busy="true"
          aria-label="Loading"
          {...boxProps}
          {...sx}
        >
          {Array.from({ length: lines }).map((_, i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: i === lines - 1 ? "70%" : width ?? "100%",
                height: height ?? "1em",
                borderRadius: getBorderRadius(),
                background: shimmerBg,
                backgroundSize: animated ? "200% 100%" : undefined,
                animation: animated
                  ? "szr-skeleton-wave 1.6s ease-in-out infinite"
                  : undefined,
              }}
            />
          ))}
        </Box>
      );
    }

    return (
      <Box
        data-testid={testID}
        aria-busy="true"
        aria-label="Loading"
        rounded={getBorderRadius()}
        style={{
          width: (width ?? (variant === "circular" ? 40 : "100%")) as
            | string
            | number,
          height: (height ??
            (variant === "circular" ? 40 : variant === "text" ? "1em" : 20)) as
            | string
            | number,
          background: shimmerBg,
          backgroundSize: animated ? "200% 100%" : undefined,
          animation: animated
            ? "szr-skeleton-wave 1.6s ease-in-out infinite"
            : undefined,
          display: "block",
          flexShrink: 0,
        }}
        {...boxProps}
        {...sx}
      />
    );
  }

  // React Native
  return (
    <Box
      testID={testID}
      rounded={getBorderRadius()}
      style={{
        width: (width ?? "100%") as string | number,
        height: (height ?? 20) as string | number,
        backgroundColor: resolvedBaseColor,
      }}
      {...boxProps}
      {...sx}
    />
  );
};

Skeleton.displayName = "Skeleton";
export default Skeleton;
