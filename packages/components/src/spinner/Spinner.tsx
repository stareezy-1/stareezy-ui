/**
 * Spinner — animated loading indicator.
 * Root container accepts full BoxProps. No text props needed (label is aria-only).
 */

import React from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps } from "../primitives/Box";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "ring" | "dots" | "pulse";

export interface SpinnerProps extends Omit<BoxProps, "children"> {
  size?: SpinnerSize;
  color?: string;
  trackColor?: string;
  variant?: SpinnerVariant;
  label?: string;
}

const SIZE_MAP: Record<SpinnerSize, number> = {
  xs: 16,
  sm: 20,
  md: 28,
  lg: 40,
  xl: 56,
};
const THICKNESS_MAP: Record<SpinnerSize, number> = {
  xs: 2,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 4,
};

const KEYFRAMES = `
@keyframes szr-spin { to { transform: rotate(360deg); } }
@keyframes szr-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
`;

let kfInjected = false;
function injectKf() {
  if (kfInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
  kfInjected = true;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = colors.celurenBlue[400].value,
  trackColor = colors.beauBlue[200].value,
  variant = "ring",
  label = "Loading",
  testID,
  ...boxProps
}) => {
  const px = SIZE_MAP[size];
  const thickness = THICKNESS_MAP[size];

  if (isWeb) {
    injectKf();

    let inner: React.ReactNode;

    if (variant === "dots") {
      const dotSize = Math.max(4, Math.round(px * 0.22));
      inner = (
        <span
          role="status"
          aria-label={label}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: dotSize * 0.6,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                backgroundColor: color,
                display: "inline-block",
                animation: `szr-spin 1.2s ease-in-out ${i * 0.16}s infinite`,
              }}
            />
          ))}
        </span>
      );
    } else if (variant === "pulse") {
      inner = (
        <span
          role="status"
          aria-label={label}
          style={{
            display: "inline-block",
            width: px,
            height: px,
            borderRadius: "50%",
            backgroundColor: color,
            animation: "szr-pulse 1.4s ease-in-out infinite",
          }}
        />
      );
    } else {
      inner = (
        <span
          role="status"
          aria-label={label}
          style={{
            display: "inline-block",
            width: px,
            height: px,
            borderRadius: "50%",
            border: `${thickness}px solid ${trackColor}`,
            borderTopColor: color,
            animation: "szr-spin 0.65s linear infinite",
            flexShrink: 0,
          }}
        />
      );
    }

    return (
      <Box
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        data-testid={testID}
        {...boxProps}
      >
        {inner}
      </Box>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { ActivityIndicator } = require("react-native") as {
    ActivityIndicator: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      testID={testID}
      {...boxProps}
    >
      <ActivityIndicator size={px} color={color} accessibilityLabel={label} />
    </Box>
  );
};

Spinner.displayName = "Spinner";
export default Spinner;
