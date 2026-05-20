/**
 * View — cross-platform View primitive for Stareezy UI.
 *
 * Mirrors React Native's ViewProps interface exactly, while rendering
 * correctly on both web (as a <div>) and React Native (as a <View>).
 *
 * Accepts all Box shorthand/token props in addition to the full RN ViewProps
 * surface. This means you can use it as a drop-in for RN's View anywhere,
 * and it will work on web without changes.
 *
 * style prop accepts:
 *   - React.CSSProperties
 *   - RN StyleSheet style IDs (numbers)
 *   - Plain style objects
 *   - Arrays of any of the above (falsy entries skipped)
 */

import React from "react";
import { Box } from "./Box";
import type { BoxProps, StyleProp } from "./Box";
import { EViewType } from "./View.types";
import { VIEW_PRESETS } from "./View.presets";

export { EViewType } from "./View.types";

// ---------------------------------------------------------------------------
// RN ViewProps surface — all props that RN's View accepts
// ---------------------------------------------------------------------------

export interface ViewProps extends Omit<BoxProps, "pointerEvents" | "type"> {
  /** Applies a View-specific preset style combination. Explicit props override preset values. */
  type?: EViewType;
  // ── RN-specific layout callbacks ─────────────────────────────────────────
  /**
   * Invoked on mount and on layout changes.
   * On web this is a no-op (ResizeObserver would be needed for full parity).
   */
  onLayout?: (event: {
    nativeEvent: {
      layout: { x: number; y: number; width: number; height: number };
    };
  }) => void;

  // ── RN hit area ───────────────────────────────────────────────────────────
  /**
   * Extends the touchable area beyond the view bounds.
   * On web this is ignored (no native hit-slop concept).
   */
  hitSlop?:
    | number
    | { top?: number; bottom?: number; left?: number; right?: number };

  // ── RN native IDs ─────────────────────────────────────────────────────────
  /** Native view ID — maps to `id` on web. */
  nativeID?: string;

  // ── RN Android-specific ───────────────────────────────────────────────────
  collapsable?: boolean;
  needsOffscreenAlphaCompositing?: boolean;
  renderToHardwareTextureAndroid?: boolean;
  focusable?: boolean;

  // ── RN iOS-specific ───────────────────────────────────────────────────────
  shouldRasterizeIOS?: boolean;
  /** iOS accessibility: whether to group children into a single accessible element. */
  accessibilityViewIsModal?: boolean;
  /** iOS: whether to hide children from accessibility. */
  importantForAccessibility?: "auto" | "yes" | "no" | "no-hide-descendants";

  // ── RN pointer events (enum form) ─────────────────────────────────────────
  /**
   * Controls whether the view can be the target of touch events.
   * On web: "none" → pointerEvents:none, "box-none" → pointerEvents:none on
   * the container but children still receive events (approximated via CSS).
   */
  pointerEvents?: "box-none" | "none" | "box-only" | "auto";

  // ── RN accessibility extras ───────────────────────────────────────────────
  accessibilityLiveRegion?: "none" | "polite" | "assertive";
  accessibilityElementsHidden?: boolean;
  accessibilityIgnoresInvertColors?: boolean;
  accessible?: boolean;
  accessibilityHint?: string;
  accessibilityValue?: {
    min?: number;
    max?: number;
    now?: number;
    text?: string;
  };

  // ── RN style (typed as StyleProp for full compatibility) ──────────────────
  style?: StyleProp;
}

// ---------------------------------------------------------------------------
// Pointer-events mapping
// ---------------------------------------------------------------------------

function resolvePointerEvents(
  pe: ViewProps["pointerEvents"],
): React.CSSProperties["pointerEvents"] | undefined {
  if (pe === undefined) return undefined;
  switch (pe) {
    case "none":
      return "none";
    case "box-none":
      // The container ignores events but children don't — CSS can't express
      // this perfectly; "none" on the container is the closest approximation.
      return "none";
    case "box-only":
      return "auto";
    case "auto":
      return "auto";
  }
}

// ---------------------------------------------------------------------------
// View component
// ---------------------------------------------------------------------------

export const View: React.FC<ViewProps> = ({
  // RN-specific props consumed here (not forwarded to Box/DOM)
  onLayout,
  hitSlop,
  nativeID,
  collapsable,
  needsOffscreenAlphaCompositing,
  renderToHardwareTextureAndroid,
  focusable,
  shouldRasterizeIOS,
  accessibilityViewIsModal,
  importantForAccessibility,
  pointerEvents,
  accessibilityLiveRegion,
  accessibilityElementsHidden,
  accessibilityIgnoresInvertColors,
  accessible,
  accessibilityHint,
  accessibilityValue,
  id,
  // View-specific type prop (EViewType) — consumed here, not forwarded to Box
  type,
  style,
  ...rest
}) => {
  // Resolve pointerEvents to CSS value for Box
  const resolvedPointerEvents = resolvePointerEvents(pointerEvents);

  // nativeID maps to id on web
  const resolvedId = id ?? nativeID;

  // Resolve preset styles from the type prop (if provided).
  // Merge order: preset → explicit shorthand props (in rest) → style prop.
  // We pass the preset as the base of the style array/object so that
  // explicit shorthand props resolved by Box naturally override it.
  const presetStyle: Record<string, unknown> = type ? VIEW_PRESETS[type] : {};
  const resolvedStyle: StyleProp =
    Object.keys(presetStyle).length > 0
      ? style !== undefined && style !== null
        ? [presetStyle as StyleProp, style]
        : (presetStyle as StyleProp)
      : style;

  // On native, forward all RN-specific props via the Box passthrough
  // (Box renders RN.View and passes unknown props through `rest`)
  const nativeExtras: Record<string, unknown> = {};

  if (typeof document === "undefined") {
    // React Native environment — forward native-only props
    if (onLayout !== undefined) nativeExtras["onLayout"] = onLayout;
    if (hitSlop !== undefined) nativeExtras["hitSlop"] = hitSlop;
    if (nativeID !== undefined) nativeExtras["nativeID"] = nativeID;
    if (collapsable !== undefined) nativeExtras["collapsable"] = collapsable;
    if (needsOffscreenAlphaCompositing !== undefined)
      nativeExtras["needsOffscreenAlphaCompositing"] =
        needsOffscreenAlphaCompositing;
    if (renderToHardwareTextureAndroid !== undefined)
      nativeExtras["renderToHardwareTextureAndroid"] =
        renderToHardwareTextureAndroid;
    if (focusable !== undefined) nativeExtras["focusable"] = focusable;
    if (shouldRasterizeIOS !== undefined)
      nativeExtras["shouldRasterizeIOS"] = shouldRasterizeIOS;
    if (accessibilityViewIsModal !== undefined)
      nativeExtras["accessibilityViewIsModal"] = accessibilityViewIsModal;
    if (importantForAccessibility !== undefined)
      nativeExtras["importantForAccessibility"] = importantForAccessibility;
    if (pointerEvents !== undefined)
      nativeExtras["pointerEvents"] = pointerEvents;
    if (accessibilityLiveRegion !== undefined)
      nativeExtras["accessibilityLiveRegion"] = accessibilityLiveRegion;
    if (accessibilityElementsHidden !== undefined)
      nativeExtras["accessibilityElementsHidden"] = accessibilityElementsHidden;
    if (accessibilityIgnoresInvertColors !== undefined)
      nativeExtras["accessibilityIgnoresInvertColors"] =
        accessibilityIgnoresInvertColors;
    if (accessible !== undefined) nativeExtras["accessible"] = accessible;
    if (accessibilityHint !== undefined)
      nativeExtras["accessibilityHint"] = accessibilityHint;
    if (accessibilityValue !== undefined)
      nativeExtras["accessibilityValue"] = accessibilityValue;
  }

  return (
    <Box
      id={resolvedId}
      pointerEvents={resolvedPointerEvents}
      {...nativeExtras}
      {...rest}
      style={resolvedStyle}
    />
  );
};

View.displayName = "View";
export default View;
