/**
 * Spacer — a blank space component for layout gaps.
 *
 * Supports fixed width/height and safe-area-aware height on React Native.
 * On web, renders a <div> with the specified dimensions.
 * On RN, renders a <View> with optional safe area insets.
 *
 * Requirements: 12.1, 12.2, 12.3
 */

import React from "react";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

// ---------------------------------------------------------------------------
// SpacerProps
// ---------------------------------------------------------------------------

export interface SpacerProps {
  width?: number;
  height?: number;
  topSafeAreaHeight?: boolean;
  bottomSafeAreaHeight?: boolean;
}

// ---------------------------------------------------------------------------
// Spacer component
// ---------------------------------------------------------------------------

export const Spacer: React.FC<SpacerProps> = ({
  width,
  height,
  topSafeAreaHeight = false,
  bottomSafeAreaHeight = false,
}) => {
  if (isWeb) {
    // On web, safe area heights are not applicable — just use the fixed values
    const style: React.CSSProperties = {
      display: "block",
      flexShrink: 0,
    };
    if (width !== undefined) style.width = width;
    if (height !== undefined) style.height = height;

    return <div style={style} aria-hidden="true" />;
  }

  // React Native

  // Try to use safe area insets if the library is available
  let topInset = 0;
  let bottomInset = 0;

  if (topSafeAreaHeight || bottomSafeAreaHeight) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useSafeAreaInsets } =
        require("react-native-safe-area-context") as {
          useSafeAreaInsets: () => { top: number; bottom: number };
        };
      // We can't call hooks conditionally, so we use a wrapper component
      return (
        <SafeAreaSpacer
          {...(width !== undefined ? { width } : {})}
          {...(height !== undefined ? { height } : {})}
          topSafeAreaHeight={topSafeAreaHeight}
          bottomSafeAreaHeight={bottomSafeAreaHeight}
          useSafeAreaInsets={useSafeAreaInsets}
        />
      );
    } catch {
      // safe area context not available — fall through to plain view
    }
  }

  const rnStyle: Record<string, unknown> = { flexShrink: 0 };
  if (width !== undefined) rnStyle["width"] = width;
  const resolvedHeight =
    (height ?? 0) +
    (topSafeAreaHeight ? topInset : 0) +
    (bottomSafeAreaHeight ? bottomInset : 0);
  if (resolvedHeight > 0) rnStyle["height"] = resolvedHeight;

  return <View style={rnStyle} />;
};

// ---------------------------------------------------------------------------
// SafeAreaSpacer — inner component that can call the hook
// ---------------------------------------------------------------------------

interface SafeAreaSpacerProps extends SpacerProps {
  useSafeAreaInsets: () => { top: number; bottom: number };
}

const SafeAreaSpacer: React.FC<SafeAreaSpacerProps> = ({
  width,
  height,
  topSafeAreaHeight,
  bottomSafeAreaHeight,
  useSafeAreaInsets,
}) => {
  const insets = useSafeAreaInsets();

  const rnStyle: Record<string, unknown> = { flexShrink: 0 };
  if (width !== undefined) rnStyle["width"] = width;

  const resolvedHeight =
    (height ?? 0) +
    (topSafeAreaHeight ? insets.top : 0) +
    (bottomSafeAreaHeight ? insets.bottom : 0);

  if (resolvedHeight > 0) rnStyle["height"] = resolvedHeight;

  return <View style={rnStyle} />;
};

Spacer.displayName = "Spacer";

export default Spacer;
