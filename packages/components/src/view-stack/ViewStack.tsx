/**
 * ViewStack — re-exports HStack and VStack from the primitives layer.
 *
 * HStack and VStack are cross-platform flex containers already implemented
 * in `packages/components/src/primitives/Stack.tsx`. This module provides
 * the `view-stack/` folder entry point expected by the component list.
 *
 * Requirements: 12.1, 12.2, 12.3
 */

export { HStack, VStack } from "../primitives/Stack";
export type { HStackProps, VStackProps } from "../primitives/Stack";

// Default export for convenience
export { HStack as default } from "../primitives/Stack";
