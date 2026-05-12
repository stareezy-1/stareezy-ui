/**
 * JSX AST transform for @stareezy-ui/compiler.
 *
 * Traverses JSX source, detects props whose values are Token objects
 * (identified by `__token: true`), replaces them with generated atomic
 * CSS class name strings, and accumulates a CSS sheet.
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.6
 */

import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";
import { resolveConfig, type CompilerConfig } from "./config";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

/**
 * Output produced by the `transform()` function.
 */
export interface CompilerOutput {
  /** All generated atomic CSS rules plus the `:root` variable block. */
  cssSheet: string;
  /** Map from token ID to generated CSS class name. */
  classMap: Map<string, string>;
  /** The JSX source with every Token-valued prop replaced by a class name string. */
  transformedSource: string;
}

// ---------------------------------------------------------------------------
// Error class
// ---------------------------------------------------------------------------

/**
 * Thrown when the compiler encounters a Token object that is missing its `id`
 * property, which is required to generate a stable CSS class name.
 *
 * Requirements: 9.1 (build error on missing id)
 */
export class TokenCompilerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TokenCompilerError";
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Checks whether a Babel `ObjectExpression` node represents a Token object,
 * i.e. it has a property `__token` whose value is the boolean literal `true`.
 */
function isTokenObjectExpression(node: t.ObjectExpression): boolean {
  return node.properties.some(
    (prop) =>
      t.isObjectProperty(prop) &&
      !prop.computed &&
      ((t.isIdentifier(prop.key) && prop.key.name === "__token") ||
        (t.isStringLiteral(prop.key) && prop.key.value === "__token")) &&
      t.isBooleanLiteral(prop.value) &&
      prop.value.value === true,
  );
}

/**
 * Extracts the string value of the `id` property from a Token ObjectExpression.
 * Returns `null` if the property is absent or its value is not a string literal.
 */
function extractTokenId(node: t.ObjectExpression): string | null {
  for (const prop of node.properties) {
    if (
      t.isObjectProperty(prop) &&
      !prop.computed &&
      ((t.isIdentifier(prop.key) && prop.key.name === "id") ||
        (t.isStringLiteral(prop.key) && prop.key.value === "id")) &&
      t.isStringLiteral(prop.value)
    ) {
      return prop.value.value;
    }
  }
  return null;
}

/**
 * Extracts the raw value from the `value` property of a Token ObjectExpression.
 * Returns `null` if the property is absent or its value is not a primitive literal.
 */
function extractTokenValue(node: t.ObjectExpression): string | number | null {
  for (const prop of node.properties) {
    if (
      t.isObjectProperty(prop) &&
      !prop.computed &&
      ((t.isIdentifier(prop.key) && prop.key.name === "value") ||
        (t.isStringLiteral(prop.key) && prop.key.value === "value"))
    ) {
      if (t.isStringLiteral(prop.value)) return prop.value.value;
      if (t.isNumericLiteral(prop.value)) return prop.value.value;
      // Negative numbers are represented as UnaryExpression(-) + NumericLiteral
      if (
        t.isUnaryExpression(prop.value) &&
        prop.value.operator === "-" &&
        t.isNumericLiteral(prop.value.argument)
      ) {
        return -prop.value.argument.value;
      }
    }
  }
  return null;
}

/**
 * Resolves the JSX prop name to one or more CSS property names using the
 * compiler config's `propMappings`. Returns an empty array if the prop is
 * not mapped (the prop will be left unchanged in that case).
 */
function resolveCssProperties(
  propName: string,
  config: CompilerConfig,
): string[] {
  const mapping = config.propMappings[propName];
  if (!mapping) return [];
  return Array.isArray(mapping) ? mapping : [mapping];
}

/**
 * Generates a CSS class name for a given token ID.
 * Format: `sz-<id>`
 */
function generateClassName(id: string): string {
  return `sz-${id}`;
}

// ---------------------------------------------------------------------------
// Main transform
// ---------------------------------------------------------------------------

/**
 * Parses `source` as JSX/TypeScript, traverses all JSX attributes, and:
 *
 * 1. Detects attribute values that are Token objects (`__token: true`).
 * 2. Replaces each such value with a string literal CSS class name.
 * 3. Accumulates atomic CSS rules and `:root` variable declarations.
 *
 * Non-Token props are left completely unchanged (Requirement 9.6).
 *
 * @param source  - The JSX/TSX source string to transform.
 * @param partial - Optional partial `CompilerConfig` to override defaults.
 * @returns       A `CompilerOutput` with `cssSheet`, `classMap`, and `transformedSource`.
 * @throws        `TokenCompilerError` if a Token object is missing its `id` property.
 */
export function transform(
  source: string,
  partial?: Partial<CompilerConfig>,
): CompilerOutput {
  const config = resolveConfig(partial);

  // Parse the source into a Babel AST.
  const ast = parse(source, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  // classMap: tokenId → className (deduplicated)
  const classMap = new Map<string, string>();
  // tokenValues: tokenId → resolved value (for :root block)
  const tokenValues = new Map<string, string | number>();
  // cssRules: tokenId → array of CSS rule strings (one per CSS property)
  const cssRules = new Map<string, string[]>();

  // Traverse the AST looking for JSX attributes whose values are Token objects.
  traverse(ast, {
    JSXAttribute(path) {
      const { node } = path;

      // The attribute value must be a JSX expression container: prop={...}
      if (!t.isJSXExpressionContainer(node.value)) return;

      const expr = node.value.expression;

      // The expression must be an object literal.
      if (!t.isObjectExpression(expr)) return;

      // Check if it's a Token object.
      if (!isTokenObjectExpression(expr)) return;

      // Determine the JSX prop name.
      let propName: string;
      if (t.isJSXIdentifier(node.name)) {
        propName = node.name.name;
      } else if (t.isJSXNamespacedName(node.name)) {
        propName = `${node.name.namespace.name}:${node.name.name.name}`;
      } else {
        return; // Unknown name shape — skip.
      }

      // Extract the token id — throw if missing (Requirement 9.1 build error).
      const tokenId = extractTokenId(expr);
      if (tokenId === null || tokenId === "") {
        throw new TokenCompilerError(
          `Token object on JSX prop "${propName}" is missing a valid "id" property. ` +
            `Every Token must have a non-empty string "id".`,
        );
      }

      // Extract the token value for the :root block (best-effort; may be null for
      // complex values like objects — those are skipped in the :root output).
      const tokenValue = extractTokenValue(expr);

      // Generate the class name.
      const className = generateClassName(tokenId);

      // Register in classMap (deduplication: same id → same class).
      if (!classMap.has(tokenId)) {
        classMap.set(tokenId, className);

        if (tokenValue !== null) {
          tokenValues.set(tokenId, tokenValue);
        }

        // Resolve CSS properties for this prop name.
        const cssProps = resolveCssProperties(propName, config);

        if (cssProps.length > 0) {
          // Generate one CSS rule per CSS property.
          const rules = cssProps.map(
            (cssProp) => `.${className} { ${cssProp}: var(--${tokenId}); }`,
          );
          cssRules.set(tokenId, rules);
        } else {
          // Prop not in mappings — still replace the value but emit no CSS rule.
          cssRules.set(tokenId, []);
        }
      }

      // Replace the JSX attribute value with a string literal class name.
      // e.g.  bg={{ __token: true, id: "primary-500", value: "#..." }}
      //   →   bg="sz-primary-500"
      node.value = t.stringLiteral(className);
    },
  });

  // Build the CSS sheet.
  // 1. Atomic CSS rules (one per unique token × CSS property).
  const atomicRules: string[] = [];
  for (const rules of cssRules.values()) {
    atomicRules.push(...rules);
  }

  // 2. :root block with CSS variable declarations.
  const rootDeclarations: string[] = [];
  for (const [id, value] of tokenValues.entries()) {
    rootDeclarations.push(`  --${id}: ${value};`);
  }

  let cssSheet = atomicRules.join("\n");
  if (rootDeclarations.length > 0) {
    const rootBlock = `:root {\n${rootDeclarations.join("\n")}\n}`;
    cssSheet = cssSheet ? `${cssSheet}\n${rootBlock}` : rootBlock;
  }

  // Generate the transformed source from the mutated AST.
  const { code: transformedSource } = generate(ast, {
    // Preserve as much of the original formatting as possible.
    retainLines: false,
    compact: false,
    jsescOption: { minimal: true },
  });

  return { cssSheet, classMap, transformedSource };
}
