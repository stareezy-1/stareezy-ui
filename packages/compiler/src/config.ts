/**
 * Compiler configuration for @stareezy-ui/compiler.
 * Defines prop-to-CSS-property mappings and build output options.
 */

/**
 * Configuration interface for the Stareezy UI compiler.
 *
 * - `propMappings`: Maps JSX prop names to one or more CSS property names.
 *   A single string maps to one CSS property; an array maps to multiple.
 * - `outputDir`: Directory where generated CSS and transformed source are written.
 * - `cssVariablePrefix`: Optional prefix for generated CSS custom property names.
 */
export interface CompilerConfig {
  propMappings: Record<string, string | string[]>;
  outputDir?: string;
  cssVariablePrefix?: string;
}

/**
 * Default JSX prop → CSS property mappings.
 * Requirements: 9.5
 */
export const DEFAULT_PROP_MAPPINGS: Record<string, string | string[]> = {
  bg: "background-color",
  color: "color",
  p: "padding",
  px: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  m: "margin",
  rounded: "border-radius",
  fontSize: "font-size",
  fontWeight: "font-weight",
};

/**
 * Default compiler configuration.
 * Requirements: 9.7
 */
export const DEFAULT_CONFIG: CompilerConfig = {
  propMappings: DEFAULT_PROP_MAPPINGS,
  outputDir: "dist",
  cssVariablePrefix: "",
};

/**
 * Merges a partial config with the defaults, producing a complete `CompilerConfig`.
 * Prop mappings from the partial config are merged on top of the defaults so that
 * callers can extend or override individual mappings without replacing the entire map.
 *
 * @param partial - Optional partial configuration to merge with defaults.
 * @returns A fully resolved `CompilerConfig`.
 */
export function resolveConfig(
  partial?: Partial<CompilerConfig>,
): CompilerConfig {
  const mergedPropMappings: Record<string, string | string[]> = {
    ...DEFAULT_PROP_MAPPINGS,
    ...(partial?.propMappings ?? {}),
  };

  const resolved: CompilerConfig = { propMappings: mergedPropMappings };

  const outputDir =
    partial?.outputDir !== undefined
      ? partial.outputDir
      : DEFAULT_CONFIG.outputDir;
  if (outputDir !== undefined) {
    resolved.outputDir = outputDir;
  }

  const cssVariablePrefix =
    partial?.cssVariablePrefix !== undefined
      ? partial.cssVariablePrefix
      : DEFAULT_CONFIG.cssVariablePrefix;
  if (cssVariablePrefix !== undefined) {
    resolved.cssVariablePrefix = cssVariablePrefix;
  }

  return resolved;
}
