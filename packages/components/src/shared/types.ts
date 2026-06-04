/**
 * types.ts — shared enums and type utilities.
 */

import type React from "react";

export enum ELabelsType {
  Regular = "regular",
  Bold = "bold",
  Small = "small",
}

export enum EHintTextType {
  Regular = "regular",
  Small = "small",
}

export enum EApprovalOptionState {
  Default = "default",
  Selected = "selected",
  Disabled = "disabled",
}

/**
 * SzrFC — React-version-agnostic functional component type.
 *
 * `React.FC<P>` in @types/react@19 changed its return type, causing
 * "Property 'children' is missing in type 'ReactPortal'" errors when a
 * consumer uses a different @types/react version.
 *
 * Using `(props: P) => React.ReactElement | null` sidesteps this entirely —
 * it works identically with React 16, 17, 18, and 19.
 *
 * The `displayName` property is included so components can set it for
 * React DevTools without a TypeScript error.
 */
export type SzrFC<P = Record<string, never>> = ((
  props: P,
) => React.ReactElement | null) & { displayName?: string };
