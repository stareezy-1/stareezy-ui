/**
 * Skeleton — shimmer loading placeholder.
 * Root wrapper accepts BoxProps.
 */

import React from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps } from "../primitives/Box";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";

export interface SkeletonProps
  extends Omit<BoxProps, "children" | "width" | "height"> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  lines?: number;
  animated?: boolean;
  baseColor?: string;
  highlightColor?: string;
}

const SKELETON_KF = `
@keyframes szr-skeleton-wave {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

let skeletonKfInjected = false;
function injectSkeletonKf() {
  if (skeletonKfInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = SKELETON_KF;
  document.head.appendChild(el);
  skeletonKfInjected = true;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "rectangular",
  width,
  height,
  lines = 1,
  animated = true,
  baseColor = colors.beauBlue[200].value,
  highlightColor = colors.beauBlue[50].value,
  testID,
  ...boxProps
}) => {
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
      ? `linear-gradient(90deg,${baseColor} 25%,${highlightColor} 50%,${baseColor} 75%)`
      : baseColor;

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
        backgroundColor: baseColor,
      }}
      {...boxProps}
    />
  );
};

Skeleton.displayName = "Skeleton";
export default Skeleton;
