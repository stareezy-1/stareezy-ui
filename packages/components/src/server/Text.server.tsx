/**
 * Text.server.tsx — server-safe Text primitive for React Server Components.
 *
 * No "use client", no hooks, no context.
 * Renders a <span> on web (server components are web/Next.js RSC only).
 *
 * Colors: ThemeToken values resolve to var(--szr-<path>),
 * Token<T> values resolve to .value, plain strings pass through.
 */

import React from "react";
import { isThemeToken, THEME_TOKEN_BRAND } from "@quasify-ui/tokens";
import type { ThemeToken } from "@quasify-ui/tokens";

// ---------------------------------------------------------------------------
// Value resolver (same pattern as Box.server.tsx)
// ---------------------------------------------------------------------------

function isToken(value: unknown): boolean {
  return (
    value !== null &&
    typeof value === "object" &&
    (value as Record<string, unknown>)["__token"] === true
  );
}

function resolveServerValue(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "string") return value;
  if (typeof value !== "object") return String(value);

  if (isThemeToken(value)) {
    const token = value as ThemeToken;
    const cssId = token.path.replace(/\./g, "-");
    return `var(--szr-${cssId})`;
  }

  if (isToken(value)) {
    const v = (value as Record<string, unknown>)["value"];
    return v !== undefined ? String(v) : undefined;
  }

  return undefined;
}

// ---------------------------------------------------------------------------
// ServerTextProps
// ---------------------------------------------------------------------------

export interface ServerTextProps {
  /** Text content (alternative to children) */
  text?: string;
  children?: React.ReactNode;
  /** Color value, Token<string>, or ThemeToken */
  color?: unknown;
  /** Font size in px */
  fontSize?: number | string;
  /** Font weight */
  fontWeight?: React.CSSProperties["fontWeight"];
  /** Font family */
  fontFamily?: string;
  /** Line height */
  lineHeight?: number | string;
  /** Letter spacing */
  letterSpacing?: number | string;
  /** Text alignment */
  textAlign?: React.CSSProperties["textAlign"];
  /** Italic */
  italic?: boolean;
  /** Underline */
  underline?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Inline style override */
  style?: React.CSSProperties;
  /** Accessibility */
  "aria-label"?: string;
  "aria-hidden"?: boolean | "true" | "false";
  id?: string;
  "data-testid"?: string;
}

// ---------------------------------------------------------------------------
// ServerText component — hook-free, server-safe
// ---------------------------------------------------------------------------

export const ServerText: React.FC<ServerTextProps> = ({
  text,
  children,
  color,
  fontSize,
  fontWeight,
  fontFamily,
  lineHeight,
  letterSpacing,
  textAlign,
  italic,
  underline,
  className,
  style,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
  id,
  "data-testid": testId,
}) => {
  const content = text !== undefined ? text : children;

  const resolvedColor = resolveServerValue(color);

  const computedStyle: React.CSSProperties = {
    ...(resolvedColor !== undefined ? { color: resolvedColor } : {}),
    ...(fontSize !== undefined
      ? {
          fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
        }
      : {}),
    ...(fontWeight !== undefined ? { fontWeight } : {}),
    ...(fontFamily !== undefined ? { fontFamily } : {}),
    ...(lineHeight !== undefined
      ? {
          lineHeight:
            typeof lineHeight === "number" ? `${lineHeight}px` : lineHeight,
        }
      : {}),
    ...(letterSpacing !== undefined
      ? {
          letterSpacing:
            typeof letterSpacing === "number"
              ? `${letterSpacing}em`
              : letterSpacing,
        }
      : {}),
    ...(textAlign !== undefined ? { textAlign } : {}),
    ...(italic ? { fontStyle: "italic" as const } : {}),
    ...(underline ? { textDecorationLine: "underline" as const } : {}),
    ...style,
  };

  return (
    <span
      {...(id !== undefined ? { id } : {})}
      {...(className !== undefined ? { className } : {})}
      {...(ariaLabel !== undefined ? { "aria-label": ariaLabel } : {})}
      {...(ariaHidden !== undefined ? { "aria-hidden": ariaHidden } : {})}
      {...(testId !== undefined ? { "data-testid": testId } : {})}
      style={Object.keys(computedStyle).length > 0 ? computedStyle : undefined}
    >
      {content}
    </span>
  );
};

ServerText.displayName = "ServerText";
export default ServerText;
