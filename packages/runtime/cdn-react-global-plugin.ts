import type { Plugin } from "esbuild";

/**
 * esbuild plugin for CDN (IIFE) builds:
 * - Maps `react` / `react/jsx-runtime` to window.React
 * - Stubs `react-native` and `@react-native-community/slider` (dead code on web)
 */
export function reactGlobalPlugin(): Plugin {
  return {
    name: "cdn-externals",
    setup(build) {
      build.onResolve({ filter: /^react$/ }, () => ({
        path: "react",
        namespace: "cdn-externals-ns",
      }));

      build.onResolve({ filter: /^react\/jsx-runtime$/ }, () => ({
        path: "react/jsx-runtime",
        namespace: "cdn-externals-ns",
      }));

      build.onLoad(
        { filter: /^react$/, namespace: "cdn-externals-ns" },
        () => ({
          contents: `
const React = window.React;
export default React;
export const {
  Children, cloneElement, createContext, createElement, createRef,
  forwardRef, Fragment, isValidElement, lazy, memo, startTransition,
  Suspense, useCallback, useContext, useDebugValue, useDeferredValue,
  useEffect, useId, useImperativeHandle, useInsertionEffect, useLayoutEffect,
  useMemo, useReducer, useRef, useState, useSyncExternalStore, useTransition,
  version,
} = React;
`,
          loader: "js",
        }),
      );

      build.onLoad(
        { filter: /^react\/jsx-runtime$/, namespace: "cdn-externals-ns" },
        () => ({
          contents: `
const React = window.React;
export const jsx = React.createElement;
export const jsxs = React.createElement;
export const Fragment = React.Fragment;
`,
          loader: "js",
        }),
      );

      build.onResolve({ filter: /^react-native$/ }, () => ({
        path: "react-native",
        namespace: "cdn-externals-ns",
      }));

      build.onLoad(
        { filter: /^react-native$/, namespace: "cdn-externals-ns" },
        () => ({
          contents: `export default {}; export const Platform = { OS: "web" };`,
          loader: "js",
        }),
      );

      build.onResolve({ filter: /^@react-native-community\/slider$/ }, () => ({
        path: "@react-native-community/slider",
        namespace: "cdn-externals-ns",
      }));

      build.onLoad(
        {
          filter: /^@react-native-community\/slider$/,
          namespace: "cdn-externals-ns",
        },
        () => ({ contents: `export default {};`, loader: "js" }),
      );
    },
  };
}
