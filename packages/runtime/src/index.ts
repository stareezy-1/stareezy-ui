// @stareezy-ui/runtime
// Style registry and platform adapters for O(1) token-to-style resolution.

export type { StyleRegistry, RuntimeAdapter } from "./registry";
export { RuntimeNotInitializedError } from "./registry";

export { createWebRuntime } from "./adapters/web";
export { createNativeRuntime } from "./adapters/native";
