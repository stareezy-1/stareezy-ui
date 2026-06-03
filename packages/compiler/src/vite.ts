/**
 * Vite plugin wrapper for @stareezy-ui/compiler.
 *
 * Exposes the JSX token transform as a standard Vite plugin. The plugin
 * hooks into Vite's `transform` lifecycle for `.jsx` and `.tsx` files,
 * calls the `transform()` function from `transform.ts`, and injects the
 * generated CSS as a virtual module side-effect.
 *
 * Requirements: 9.7
 */

import type { Plugin } from "vite";
import { transform } from "./transform";
import { type CompilerConfig } from "./config";
import { loadSzrConfig } from "./loadConfig";

// ---------------------------------------------------------------------------
// Virtual module helpers
// ---------------------------------------------------------------------------

/** Virtual module ID used to expose the accumulated CSS sheet to Vite. */
const VIRTUAL_MODULE_ID = "virtual:stareezy-ui/styles";
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;

// ---------------------------------------------------------------------------
// Plugin factory
// ---------------------------------------------------------------------------

/**
 * Returns a Vite plugin that transforms `.jsx` and `.tsx` files at build time,
 * replacing Token-valued JSX props with atomic CSS class names and collecting
 * the generated CSS into a virtual module.
 *
 * Usage in vite.config.ts:
 * ```ts
 * import { stareezyVitePlugin } from '@stareezy-ui/compiler';
 * export default { plugins: [stareezyVitePlugin()] };
 * ```
 *
 * To include the generated CSS in your app, add this import once (e.g. in
 * your entry file):
 * ```ts
 * import 'virtual:stareezy-ui/styles';
 * ```
 *
 * @param config - Optional partial `CompilerConfig` to override defaults.
 */
export function stareezyVitePlugin(config?: Partial<CompilerConfig>): Plugin {
  /** Accumulated CSS rules across all transformed files. */
  const cssChunks: string[] = [];

  // Merge shorthands from stareezy.config.ts if present
  const szrConfig = loadSzrConfig();
  const mergedConfig: Partial<CompilerConfig> = {
    ...config,
    propMappings: {
      ...(szrConfig?.shorthands ?? {}),
      ...(config?.propMappings ?? {}),
    },
    ...(szrConfig?.boxPropsComponents
      ? { boxPropsComponents: szrConfig.boxPropsComponents }
      : {}),
  };

  return {
    name: "stareezy-ui",

    // Expose the virtual CSS module so consumers can import it.
    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
      return undefined;
    },

    // Serve the accumulated CSS when the virtual module is requested.
    load(id: string) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return cssChunks.join("\n");
      }
      return undefined;
    },

    // Transform JSX/TSX files: replace Token props and collect CSS.
    transform(code: string, id: string) {
      if (!id.endsWith(".jsx") && !id.endsWith(".tsx")) {
        return undefined;
      }

      let result;
      try {
        result = transform(code, mergedConfig);
      } catch (err) {
        // Re-throw with transform stage and source location so Vite surfaces
        // a precise error. TokenCompilerError carries loc; fall back to the
        // raw message for unexpected errors. (Req 8.6)
        const stage = "transform";
        const inner = err as Error & {
          loc?: { line?: number; column?: number };
        };
        const loc =
          inner?.loc?.line !== undefined
            ? `:${inner.loc.line}${
                inner.loc.column !== undefined ? `:${inner.loc.column}` : ""
              }`
            : "";
        throw new Error(
          `[stareezy-ui] ${stage} stage failed at ${id}${loc}: ${
            inner?.message ?? String(err)
          }`,
        );
      }

      const { cssSheet, transformedSource } = result;

      if (cssSheet) {
        cssChunks.push(cssSheet);
      }

      return {
        code: transformedSource,
        map: null,
      };
    },
  };
}
