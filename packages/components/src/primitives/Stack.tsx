/**
 * HStack and VStack — flex layout primitives.
 *
 * Thin wrappers around Box with a pre-set flexDirection.
 * All visual styles live in Stack.style.ts — no inline styles here.
 * All BoxProps are accepted and any prop can be overridden.
 */

import React from "react";
import { Box } from "./Box";
import type { BoxProps } from "./Box";
import type { SzrFC } from '../shared/types';
export {
  EStackAlign,
  EStackJustify,
  EStackGap,
  stackGapValues,
} from "./Stack.style";

export type HStackProps = BoxProps;
export type VStackProps = BoxProps;

export const HStack: SzrFC<HStackProps> = ({ flexDirection, ...rest }) => (
  <Box flexDirection={flexDirection ?? "row"} {...rest} />
);
HStack.displayName = "HStack";

export const VStack: SzrFC<VStackProps> = ({ flexDirection, ...rest }) => (
  <Box flexDirection={flexDirection ?? "column"} {...rest} />
);
VStack.displayName = "VStack";

export default { HStack, VStack };
