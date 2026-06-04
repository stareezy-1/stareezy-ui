/**
 * Divider.style.ts — geometry-only style constants for the Divider component.
 * All colors are resolved at render time via useThemedColors() in Divider.tsx.
 */

import { registerClasses } from "../shared/componentSheet";

export const dividerGeometry = {
  thickness: 1,
  labelGap: 12,
} as const;

// ── Stylesheet registration ───────────────────────────────────────────────────

export const dividerClasses = registerClasses("divider", {
  horizontal: {
    width: "100%",
    flexShrink: 0,
  },
  vertical: {
    alignSelf: "stretch",
    flexShrink: 0,
  },
  withLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
