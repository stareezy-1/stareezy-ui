/**
 * HStack and VStack — flex layout primitives for Stareezy UI.
 *
 * Both are thin wrappers around `Box` with a pre-set `flexDirection`.
 * All `BoxProps` are accepted and any prop (including `flexDirection`) can
 * be overridden by the caller.
 *
 * - `HStack` → `flexDirection="row"`
 * - `VStack` → `flexDirection="column"`
 *
 * Requirements: 11.3
 */

import React from "react";
import { Box } from "./Box";
import type { BoxProps } from "./Box";

// ---------------------------------------------------------------------------
// HStackProps
// ---------------------------------------------------------------------------

/**
 * Props for `HStack`.
 *
 * Identical to `BoxProps` — `flexDirection` defaults to `"row"` but can be
 * overridden if needed.
 */
export type HStackProps = BoxProps;

// ---------------------------------------------------------------------------
// VStackProps
// ---------------------------------------------------------------------------

/**
 * Props for `VStack`.
 *
 * Identical to `BoxProps` — `flexDirection` defaults to `"column"` but can be
 * overridden if needed.
 */
export type VStackProps = BoxProps;

// ---------------------------------------------------------------------------
// HStack component
// ---------------------------------------------------------------------------

/**
 * A horizontal flex container.
 *
 * Renders a `Box` with `flexDirection="row"` pre-set. All `BoxProps` are
 * forwarded, and `flexDirection` can be overridden by the caller.
 *
 * @example
 * ```tsx
 * <HStack p={spacing[4]} gap={8}>
 *   <Text text="Left" />
 *   <Text text="Right" />
 * </HStack>
 * ```
 */
export const HStack: React.FC<HStackProps> = ({ flexDirection, ...rest }) => {
  return <Box flexDirection={flexDirection ?? "row"} {...rest} />;
};

HStack.displayName = "HStack";

// ---------------------------------------------------------------------------
// VStack component
// ---------------------------------------------------------------------------

/**
 * A vertical flex container.
 *
 * Renders a `Box` with `flexDirection="column"` pre-set. All `BoxProps` are
 * forwarded, and `flexDirection` can be overridden by the caller.
 *
 * @example
 * ```tsx
 * <VStack p={spacing[4]} gap={8}>
 *   <Text text="Top" />
 *   <Text text="Bottom" />
 * </VStack>
 * ```
 */
export const VStack: React.FC<VStackProps> = ({ flexDirection, ...rest }) => {
  return <Box flexDirection={flexDirection ?? "column"} {...rest} />;
};

VStack.displayName = "VStack";

export default { HStack, VStack };
