"use client";

/**
 * UiConfigProvider — React context provider for the active UiConfig.
 *
 * Wrap your app (or a subtree) with `<UiConfigProvider config={ui}>` to make
 * the config available to all components via `useUiConfig()`.
 *
 * When `useUiConfig()` is called outside a provider it falls back to the
 * `getUiConfig()` singleton and logs a dev-mode warning. If `createUi()` has
 * never been called it throws a plain Error.
 *
 * Requirements: 10.12, 10.13
 */

import React, { createContext, useContext } from "react";
import type { UiConfig, CustomTokenGroups } from "./createUi";
import { getUiConfig } from "./createUi";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const UiConfigContext = createContext<UiConfig<CustomTokenGroups> | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface UiConfigProviderProps {
  config: UiConfig<CustomTokenGroups>;
  children: React.ReactNode;
}

/**
 * Provides the active `UiConfig` to all descendant components via React context.
 *
 * @example
 * ```tsx
 * const ui = createUi({ tokens: { brand: { ... } } })
 *
 * function App() {
 *   return (
 *     <UiConfigProvider config={ui}>
 *       <MyApp />
 *     </UiConfigProvider>
 *   )
 * }
 * ```
 */
export function UiConfigProvider({
  config,
  children,
}: UiConfigProviderProps): React.ReactElement {
  return (
    <UiConfigContext.Provider value={config}>
      {children}
    </UiConfigContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Returns the active `UiConfig` from the nearest `UiConfigProvider`.
 *
 * Falls back to the `getUiConfig()` singleton when called outside a provider,
 * logging a development-mode warning. Throws if `createUi()` has never been
 * called.
 *
 * Requirements: 10.12, 10.13
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const ui = useUiConfig()
 *   const theme = ui.getTheme('aurora')
 *   return <div style={{ color: theme.text.primary.value }}>Hello</div>
 * }
 * ```
 */
export function useUiConfig(): UiConfig<CustomTokenGroups> {
  const ctx = useContext(UiConfigContext);
  if (ctx) return ctx;

  // Fallback to singleton with dev warning (Requirements 10.13)
  const singleton = getUiConfig();
  if (
    typeof globalThis !== "undefined" &&
    (globalThis as Record<string, unknown>)["process"] !== "production"
  ) {
    console.warn(
      "[stareezy-ui] useUiConfig() called outside a UiConfigProvider. Falling back to getUiConfig() singleton.",
    );
  }
  if (!singleton) {
    throw new Error("[stareezy-ui] createUi() has not been called.");
  }
  return singleton;
}
