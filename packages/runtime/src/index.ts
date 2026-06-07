// @quasify-ui/runtime
// Style registry and platform adapters for O(1) token-to-style resolution.

export type { StyleRegistry, RuntimeAdapter } from "./registry";
export { RuntimeNotInitializedError } from "./registry";

export { createWebRuntime } from "./adapters/web";
export { createNativeRuntime } from "./adapters/native";

import { createWebRuntime } from "./adapters/web";
import { createNativeRuntime } from "./adapters/native";
import type { RuntimeAdapter } from "./registry";

// Platform detection — same pattern used in @quasify-ui/components
const isWeb = typeof document !== "undefined";

let _runtimeInstance: RuntimeAdapter | null = null;

/**
 * Returns the shared runtime singleton, lazily initializing it on first call.
 * Uses `createWebRuntime()` on web and `createNativeRuntime()` on React Native.
 *
 * All components should import this function instead of creating their own
 * runtime instances.
 *
 * Requirements: 1.4, 13.1, 13.2
 */
export function getRuntime(): RuntimeAdapter {
  if (_runtimeInstance === null) {
    _runtimeInstance = isWeb ? createWebRuntime() : createNativeRuntime();
  }
  return _runtimeInstance;
}

/**
 * Resets the runtime singleton. For testing only — do not use in production.
 */
export function _resetRuntime(): void {
  _runtimeInstance = null;
}
