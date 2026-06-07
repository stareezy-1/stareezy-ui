/**
 * Metro transformer for @stareezy-ui/compiler.
 *
 * Wraps the Stareezy UI JSX token transform as a Metro (React Native bundler)
 * custom transformer. Reads shorthands from stareezy.config.ts automatically.
 *
 * Usage in metro.config.js:
 * ```js
 * const { stareezyMetroTransformer } = require('@stareezy-ui/compiler')
 *
 * module.exports = {
 *   transformer: {
 *     babelTransformerPath: require.resolve('@stareezy-ui/compiler/metro'),
 *   },
 * }
 * ```
 *
 * Or with a custom transformer path:
 * ```js
 * // metro.transformer.js
 * const { stareezyMetroTransformer } = require('@stareezy-ui/compiler')
 * module.exports = stareezyMetroTransformer()
 * ```
 */

import { transform as szrTransform } from "./transform";
import { type CompilerConfig } from "./config";
import { loadStareezyConfig } from "./loadConfig";

export interface MetroTransformOptions {
  filename: string;
  src: string;
  options?: Record<string, unknown>;
}

export interface MetroTransformResult {
  code: string;
  map?: unknown;
}

/**
 * Creates a Metro-compatible transformer that applies the Stareezy UI
 * token transform before delegating to the default Babel transformer.
 *
 * @param config - Optional partial CompilerConfig to override defaults.
 */
export function stareezyMetroTransformer(config?: Partial<CompilerConfig>) {
  // Merge shorthands from stareezy.config.ts
  const szrConfig = loadStareezyConfig();
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
    transform({ filename, src }: MetroTransformOptions): MetroTransformResult {
      // Only transform JSX/TSX files
      if (!filename.endsWith(".jsx") && !filename.endsWith(".tsx")) {
        return { code: src };
      }

      try {
        const { transformedSource } = szrTransform(src, mergedConfig);
        return { code: transformedSource };
      } catch (err) {
        // Re-throw with the transform stage and source location so Metro
        // surfaces a precise build error rather than silently returning the
        // original source. (Req 8.6)
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
          `[stareezy-ui] ${stage} stage failed at ${filename}${loc}: ${
            inner?.message ?? String(err)
          }`,
        );
      }
    },
  };
}

/**
 * Default export — Metro transformer factory.
 * Used when metro.config.js points babelTransformerPath to this file directly.
 *
 * metro.config.js:
 * ```js
 * config.transformer.babelTransformerPath = require.resolve('@stareezy-ui/compiler/metro')
 * ```
 */
export { stareezyMetroTransformer as default };
