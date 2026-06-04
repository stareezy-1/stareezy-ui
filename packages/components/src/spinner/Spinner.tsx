/**
 * Spinner — animated loading indicator.
 * Root container accepts full BoxProps. No text props needed (label is aria-only).
 */

import React from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Box } from "../primitives/Box";
import type { BoxProps } from "../primitives/Box";
import { SPINNER_KF, SIZE_MAP, THICKNESS_MAP } from "./Spinner.style";
import type { SpinnerSize, SpinnerVariant } from "./Spinner.types";
import type { SxProp } from "../shared/sx";
import { useSx, SxStyleTag } from "../shared/useSx";
import type { SzrFC } from '../shared/types';

export type { SpinnerSize, SpinnerVariant };

export interface SpinnerProps extends Omit<BoxProps, "children"> {
  size?: SpinnerSize;
  color?: string;
  trackColor?: string;
  variant?: SpinnerVariant;
  label?: string;
  sx?: SxProp;
}

let kfInjected = false;
function injectKf() {
  if (kfInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.setAttribute("data-szr-kf", "spinner");
  el.textContent = SPINNER_KF;
  document.head.appendChild(el);
  kfInjected = true;
}

export const Spinner: SzrFC<SpinnerProps> = ({
  size = "md",
  color,
  trackColor,
  variant = "ring",
  label = "Loading",
  testID,
  sx,
  ...boxProps
}) => {
  const { sxStyle, sxClassName, sxCss } = useSx(sx);
  const themed = useThemedColors();
  // Resolve colors at render time — callers can still override via props
  const resolvedColor = color ?? themed.borderPrimaryBrand;
  const resolvedTrackColor = trackColor ?? themed.borderSecondary;

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
                backgroundColor: resolvedColor,
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
            backgroundColor: resolvedColor,
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
            border: `${thickness}px solid ${resolvedTrackColor}`,
            borderTopColor: resolvedColor,
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
        style={sxStyle as React.CSSProperties}
        className={sxClassName || undefined}
      >
        {sxCss && isWeb && <SxStyleTag css={sxCss} scopeClass={sxClassName} />}
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
      style={sxStyle as React.CSSProperties}
      className={sxClassName || undefined}
    >
      {sxCss && isWeb && <SxStyleTag css={sxCss} scopeClass={sxClassName} />}
      <ActivityIndicator
        size={px}
        color={resolvedColor}
        accessibilityLabel={label}
      />
    </Box>
  );
};

Spinner.displayName = "Spinner";
export default Spinner;
