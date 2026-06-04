/**
 * Tooltip — cross-platform tooltip component.
 *
 * Web: hover/focus-triggered overlay positioned relative to trigger.
 * Native: renders children unchanged; tooltip text shown via accessibilityHint.
 *
 * All visual styles live in Tooltip.style.ts — no inline color literals here.
 * Colors are resolved at render time via useThemedColors().
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */

import React from "react";
import { useThemedColors } from "../shared/useThemedColors";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import type { TooltipPlacement } from "./Tooltip.types";
import { webTooltipBase, webTriggerWrapper } from "./Tooltip.style";
import type { SzrFC } from '../shared/types';

export type { TooltipPlacement } from "./Tooltip.types";

// ---------------------------------------------------------------------------
// TooltipProps
// ---------------------------------------------------------------------------

export interface TooltipProps extends BoxLayoutProps {
  /** Tooltip text content. */
  content: string;
  /** The element that triggers the tooltip. */
  children: React.ReactNode;
  /** Tooltip placement relative to trigger. Default: "top". */
  placement?: TooltipPlacement;
  testID?: string;
}

// ---------------------------------------------------------------------------
// Tooltip position helper (web)
// ---------------------------------------------------------------------------

function getTooltipPositionStyle(
  placement: TooltipPlacement,
): React.CSSProperties {
  const offset = 8;
  switch (placement) {
    case "bottom":
      return {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: offset,
      };
    case "left":
      return {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        marginRight: offset,
      };
    case "right":
      return {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        marginLeft: offset,
      };
    case "top":
    default:
      return {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: offset,
      };
  }
}

// ---------------------------------------------------------------------------
// Tooltip (web-only interactive; native renders children with hint)
// ---------------------------------------------------------------------------

export const Tooltip: SzrFC<TooltipProps> = (props) => {
  const { layout, sxProps, rest } = extractBoxLayoutProps(props);
  const hasLayoutProps =
    Object.keys(layout).length > 0 || Object.keys(sxProps).length > 0;

  const { content, children, placement = "top", testID } = rest as TooltipProps;

  const themed = useThemedColors();
  const tooltipId = React.useId ? React.useId() : `tooltip-${Math.random()}`;

  // ── Native: just render children with accessibilityHint ───────────────────
  if (!isWeb) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { View } = require("react-native") as {
      View: React.ComponentType<Record<string, unknown>>;
    };

    const nativeChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(
          child as React.ReactElement<Record<string, unknown>>,
          { accessibilityHint: content },
        );
      }
      return child;
    });

    const element = <View testID={testID}>{nativeChildren}</View>;

    if (hasLayoutProps) {
      return (
        <Box {...layout} {...sxProps}>
          {element}
        </Box>
      );
    }
    return element;
  }

  // ── Web: hover/focus-triggered tooltip overlay ────────────────────────────
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visible, setVisible] = React.useState(false);

  const positionStyle = getTooltipPositionStyle(placement);

  const tooltipElement = (
    <span
      style={{
        ...webTriggerWrapper,
        position: "relative",
      }}
      data-testid={testID}
    >
      {/* Trigger: clone children to attach aria-describedby */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(
            child as React.ReactElement<Record<string, unknown>>,
            {
              "aria-describedby": visible ? tooltipId : undefined,
              onMouseEnter: (e: React.MouseEvent) => {
                setVisible(true);
                const original = (child.props as Record<string, unknown>)
                  .onMouseEnter as ((e: React.MouseEvent) => void) | undefined;
                original?.(e);
              },
              onMouseLeave: (e: React.MouseEvent) => {
                setVisible(false);
                const original = (child.props as Record<string, unknown>)
                  .onMouseLeave as ((e: React.MouseEvent) => void) | undefined;
                original?.(e);
              },
              onFocus: (e: React.FocusEvent) => {
                setVisible(true);
                const original = (child.props as Record<string, unknown>)
                  .onFocus as ((e: React.FocusEvent) => void) | undefined;
                original?.(e);
              },
              onBlur: (e: React.FocusEvent) => {
                setVisible(false);
                const original = (child.props as Record<string, unknown>)
                  .onBlur as ((e: React.FocusEvent) => void) | undefined;
                original?.(e);
              },
            },
          );
        }
        return child;
      })}

      {/* Tooltip panel */}
      {visible && (
        <span
          id={tooltipId}
          role="tooltip"
          style={{
            ...webTooltipBase,
            ...positionStyle,
            backgroundColor: themed.surfaceDark,
            color: themed.surface,
          }}
        >
          {content}
        </span>
      )}
    </span>
  );

  if (hasLayoutProps) {
    return (
      <Box {...layout} {...sxProps}>
        {tooltipElement}
      </Box>
    );
  }
  return tooltipElement;
};

Tooltip.displayName = "Tooltip";
export default Tooltip;
