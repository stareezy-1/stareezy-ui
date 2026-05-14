/**
 * Resizer — resizable container with drag handle.
 * Accepts BoxProps for all layout/style overrides.
 */

import React, { useRef, useState, useCallback } from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps } from "../primitives/Box";

export type ResizerDirection = "horizontal" | "vertical" | "both";

export interface ResizerProps extends Omit<BoxProps, "children"> {
  children?: React.ReactNode;
  direction?: ResizerDirection;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  handleColor?: string;
  onResize?: (size: { width: number; height: number }) => void;
}

export const Resizer: React.FC<ResizerProps> = ({
  children,
  direction = "horizontal",
  defaultWidth = 300,
  defaultHeight = 200,
  minWidth: minW = 100,
  maxWidth: maxW = 1200,
  minHeight: minH = 80,
  maxHeight: maxH = 800,
  handleColor = colors.beauBlue[300].value,
  onResize,
  testID,
  ...boxProps
}) => {
  const [size, setSize] = useState({
    width: defaultWidth,
    height: defaultHeight,
  });
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: defaultWidth, height: defaultHeight });

  const canH = direction === "horizontal" || direction === "both";
  const canV = direction === "vertical" || direction === "both";

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      startPos.current = { x: e.clientX, y: e.clientY };
      startSize.current = { ...size };

      const onMove = (ev: MouseEvent) => {
        if (!isDragging.current) return;
        const dx = ev.clientX - startPos.current.x;
        const dy = ev.clientY - startPos.current.y;
        const newSize = {
          width: canH
            ? Math.min(maxW, Math.max(minW, startSize.current.width + dx))
            : size.width,
          height: canV
            ? Math.min(maxH, Math.max(minH, startSize.current.height + dy))
            : size.height,
        };
        setSize(newSize);
        onResize?.(newSize);
      };

      const onUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [size, canH, canV, minW, maxW, minH, maxH, onResize],
  );

  if (!isWeb) {
    // On native, just render children in a Box — no drag resize
    return (
      <Box testID={testID} {...boxProps}>
        {children}
      </Box>
    );
  }

  const handleStyle: React.CSSProperties = {
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 10,
    transition: "background 0.15s ease",
  };

  return (
    <Box
      position="relative"
      style={{
        width: canH ? size.width : undefined,
        height: canV ? size.height : undefined,
        overflow: "hidden",
      }}
      data-testid={testID}
      {...boxProps}
    >
      {children}

      {/* Right handle */}
      {canH && (
        <div
          aria-label="Resize horizontally"
          role="separator"
          aria-orientation="vertical"
          onMouseDown={onMouseDown}
          style={{
            ...handleStyle,
            right: 0,
            top: 0,
            bottom: 0,
            width: 6,
            cursor: "col-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = handleColor;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "transparent";
          }}
        >
          <div
            style={{
              width: 2,
              height: 32,
              borderRadius: 1,
              backgroundColor: handleColor,
              opacity: 0.6,
            }}
          />
        </div>
      )}

      {/* Bottom handle */}
      {canV && (
        <div
          aria-label="Resize vertically"
          role="separator"
          aria-orientation="horizontal"
          onMouseDown={onMouseDown}
          style={{
            ...handleStyle,
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            cursor: "row-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = handleColor;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "transparent";
          }}
        >
          <div
            style={{
              height: 2,
              width: 32,
              borderRadius: 1,
              backgroundColor: handleColor,
              opacity: 0.6,
            }}
          />
        </div>
      )}

      {/* Corner handle (both) */}
      {direction === "both" && (
        <div
          aria-label="Resize"
          onMouseDown={onMouseDown}
          style={{
            ...handleStyle,
            bottom: 0,
            right: 0,
            width: 14,
            height: 14,
            cursor: "nwse-resize",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: 2,
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 1L1 9M9 5L5 9M9 9"
              stroke={handleColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </Box>
  );
};

Resizer.displayName = "Resizer";
export default Resizer;
