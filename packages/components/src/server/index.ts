/**
 * @stareezy-ui/components — server entry
 *
 * Server-safe React Server Component (RSC) primitives.
 * Safe to import in Next.js App Router server components.
 *
 * CONSTRAINTS (enforced by scripts/check-server-purity.mjs):
 *   - No "use client" directive
 *   - No React hooks (useState, useEffect, useId, useContext)
 *   - No React context (createContext)
 *
 * ThemeToken values resolve to CSS custom properties (var(--szr-<path>))
 * instead of calling useTheme(), so they work in RSC without hooks.
 */

export { ServerBox as Box } from "./Box.server";
export type { ServerBoxProps } from "./Box.server";

// View is an alias for Box in the server context
export { ServerBox as View } from "./Box.server";

// Stack: a Box with flexDirection defaulting to column (vertical) or row (horizontal)
export {
  ServerVStack as Stack,
  ServerVStack,
  ServerHStack,
} from "./Stack.server";
export type { ServerStackProps } from "./Stack.server";

// Text: a server-safe span-based text primitive
export { ServerText as Text } from "./Text.server";
export type { ServerTextProps } from "./Text.server";

// Divider: a server-safe horizontal/vertical separator
export { ServerDivider as Divider } from "./Divider.server";
export type { ServerDividerProps } from "./Divider.server";
