/**
 * Stack.server.tsx — server-safe Stack primitives for React Server Components.
 *
 * No "use client", no hooks, no context.
 * Thin wrappers around ServerBox with a flexDirection default.
 */

import React from "react";
import { ServerBox } from "./Box.server";
import type { ServerBoxProps } from "./Box.server";

export interface ServerStackProps extends ServerBoxProps {
  /** @default "column" for VStack / Stack, "row" for HStack */
  flexDirection?: unknown;
}

/**
 * ServerVStack — vertical flex container (flexDirection: column).
 * Exported as `Stack` from the server entry.
 */
export const ServerVStack: React.FC<ServerStackProps> = ({
  flexDirection,
  ...rest
}) => <ServerBox flexDirection={flexDirection ?? "column"} {...rest} />;
ServerVStack.displayName = "ServerVStack";

/**
 * ServerHStack — horizontal flex container (flexDirection: row).
 */
export const ServerHStack: React.FC<ServerStackProps> = ({
  flexDirection,
  ...rest
}) => <ServerBox flexDirection={flexDirection ?? "row"} {...rest} />;
ServerHStack.displayName = "ServerHStack";

export default { ServerVStack, ServerHStack };
