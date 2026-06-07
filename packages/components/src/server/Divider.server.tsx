/**
 * Divider.server.tsx — server-safe Divider for React Server Components.
 *
 * No "use client", no hooks, no context.
 * Renders a plain <div> with inline styles.
 *
 * Token/ThemeToken values for `color` are resolved via resolveServerValue().
 */

import React from "react";
import { isThemeToken } from "@quasify-ui/tokens";
import type { ThemeToken } from "@quasify-ui/tokens";

// ---------------------------------------------------------------------------
// Value resolver
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
// ServerDividerProps
// ---------------------------------------------------------------------------

export interface ServerDividerProps {
  /** Orientation of the divider line */
  orientation?: "horizontal" | "vertical";
  /** Border style */
  variant?: "solid" | "dashed" | "dotted";
  /** Line color — accepts a plain string, Token<string>, or ThemeToken */
  color?: unknown;
  /** Line thickness in px */
  thickness?: number;
  /** Margin around the divider (each side) */
  spacing?: number;
  /** Additional CSS class */
  className?: string;
  /** Inline style override */
  style?: React.CSSProperties;
  id?: string;
  "data-testid"?: string;
}

// ---------------------------------------------------------------------------
// ServerDivider component — hook-free, server-safe
// ---------------------------------------------------------------------------

const DEFAULT_COLOR = "#e2e8f0"; // neutral light border fallback

export const ServerDivider: React.FC<ServerDividerProps> = ({
  orientation = "horizontal",
  variant = "solid",
  color,
  thickness = 1,
  spacing = 16,
  className,
  style,
  id,
  "data-testid": testId,
}) => {
  const isHorizontal = orientation === "horizontal";
  const resolvedColor = resolveServerValue(color) ?? DEFAULT_COLOR;

  const computedStyle: React.CSSProperties = isHorizontal
    ? {
        width: "100%",
        height: `${thickness}px`,
        backgroundColor: resolvedColor,
        borderStyle: variant !== "solid" ? variant : undefined,
        flexShrink: 0,
        marginTop: `${spacing * 0.5}px`,
        marginBottom: `${spacing * 0.5}px`,
        ...style,
      }
    : {
        width: `${thickness}px`,
        alignSelf: "stretch",
        backgroundColor: resolvedColor,
        flexShrink: 0,
        marginLeft: `${spacing * 0.5}px`,
        marginRight: `${spacing * 0.5}px`,
        ...style,
      };

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      {...(id !== undefined ? { id } : {})}
      {...(className !== undefined ? { className } : {})}
      {...(testId !== undefined ? { "data-testid": testId } : {})}
      style={computedStyle}
    />
  );
};

ServerDivider.displayName = "ServerDivider";
export default ServerDivider;
