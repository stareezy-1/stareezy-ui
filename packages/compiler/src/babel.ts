/**
 * Babel plugin wrapper for @stareezy-ui/compiler.
 *
 * Exposes the JSX token transform as a standard Babel plugin using the
 * visitor pattern. The plugin processes `JSXAttribute` nodes directly on
 * Babel's already-parsed AST, so no re-parsing is needed.
 *
 * Requirements: 9.7
 */

import * as t from "@babel/types";
import { resolveConfig, type CompilerConfig } from "./config";
import { TokenCompilerError } from "./transform";
import { loadStareezyConfig } from "./loadConfig";

// ---------------------------------------------------------------------------
// Helpers (duplicated from transform.ts to operate on Babel's live AST nodes
// without re-parsing — the plugin receives nodes by reference so mutations
// are reflected in the final output automatically)
// ---------------------------------------------------------------------------

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

function generateClassName(id: string): string {
  return `sz-${id}`;
}

// ---------------------------------------------------------------------------
// Plugin factory
// ---------------------------------------------------------------------------

/**
 * Returns a Babel plugin object that replaces Token-valued JSX props with
 * generated atomic CSS class name strings.
 *
 * Usage in babel.config.js:
 * ```js
 * const { stareezyBabelPlugin } = require('@stareezy-ui/compiler');
 * module.exports = { plugins: [stareezyBabelPlugin()] };
 * ```
 *
 * @param config - Optional partial `CompilerConfig` to override defaults.
 */
export function stareezyBabelPlugin(config?: Partial<CompilerConfig>): {
  visitor: {
    JSXAttribute(path: { node: t.JSXAttribute }): void;
  };
} {
  // Merge shorthands from stareezy.config.ts if present
  const szrConfig = loadStareezyConfig();
  const mergedPartial: Partial<CompilerConfig> = {
    ...config,
    propMappings: {
      ...(szrConfig?.shorthands ?? {}),
      ...(config?.propMappings ?? {}),
    },
    ...(szrConfig?.boxPropsComponents
      ? { boxPropsComponents: szrConfig.boxPropsComponents }
      : {}),
  };
  const resolvedConfig = resolveConfig(mergedPartial);

  return {
    visitor: {
      JSXAttribute(path: { node: t.JSXAttribute }) {
        const { node } = path;

        // Only process expression containers: prop={...}
        if (!t.isJSXExpressionContainer(node.value)) return;

        const expr = node.value.expression;

        // Must be an object literal.
        if (!t.isObjectExpression(expr)) return;

        // Must be a Token object.
        if (!isTokenObjectExpression(expr)) return;

        // Resolve the prop name.
        let propName: string;
        if (t.isJSXIdentifier(node.name)) {
          propName = node.name.name;
        } else if (t.isJSXNamespacedName(node.name)) {
          propName = `${node.name.namespace.name}:${node.name.name.name}`;
        } else {
          return;
        }

        // Validate that the token has a non-empty id.
        const tokenId = extractTokenId(expr);
        if (tokenId === null || tokenId === "") {
          throw new TokenCompilerError(
            `Token object on JSX prop "${propName}" is missing a valid "id" property. ` +
              `Every Token must have a non-empty string "id".`,
          );
        }

        // Suppress unused variable warning — propName is available for future
        // CSS-property resolution if the plugin is extended to emit CSS.
        void resolvedConfig;

        // Replace the attribute value with the generated class name string.
        node.value = t.stringLiteral(generateClassName(tokenId));
      },
    },
  };
}
