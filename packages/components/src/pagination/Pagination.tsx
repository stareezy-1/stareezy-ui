/**
 * Pagination — cross-platform pagination component.
 *
 * All visual styles live in Pagination.style.ts — no inline color literals here.
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
import type { SzrFC } from "../shared/types";
import { useSx, SxStyleTag } from "../shared/useSx";
import {
  webNav,
  webPageButtonBase,
  webDisabled,
  nativeContainer,
  nativePageButtonBase,
} from "./Pagination.style";

export { EPaginationVariant } from "./Pagination.types";

// ---------------------------------------------------------------------------
// PaginationProps
// ---------------------------------------------------------------------------

export interface PaginationProps extends BoxLayoutProps {
  /** Current active page (1-indexed). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Callback when a page is selected. */
  onPageChange: (page: number) => void;
  /** Whether to show previous/next navigation buttons. Default: true. */
  showPrevNext?: boolean;
  /** Maximum number of page buttons shown before ellipsis. Default: 7. */
  siblingCount?: number;
  testID?: string;
  accessibilityLabel?: string;
}

// ---------------------------------------------------------------------------
// Page range computation
// ---------------------------------------------------------------------------

function buildPageRange(
  page: number,
  totalPages: number,
  siblingCount: number,
): Array<number | "ellipsis"> {
  if (totalPages <= siblingCount + 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const range: Array<number | "ellipsis"> = [];
  const delta = Math.floor(siblingCount / 2);
  let start = Math.max(2, page - delta);
  let end = Math.min(totalPages - 1, page + delta);

  // Adjust range so it always shows `siblingCount` pages in the middle
  if (end - start + 1 < siblingCount) {
    if (page < totalPages / 2) {
      end = Math.min(totalPages - 1, start + siblingCount - 1);
    } else {
      start = Math.max(2, end - siblingCount + 1);
    }
  }

  range.push(1);
  if (start > 2) range.push("ellipsis");
  for (let i = start; i <= end; i++) range.push(i);
  if (end < totalPages - 1) range.push("ellipsis");
  if (totalPages > 1) range.push(totalPages);

  return range;
}

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export const Pagination: SzrFC<PaginationProps> = (props) => {
  const { layout, sxProps, rest } = extractBoxLayoutProps(props);
  const sx = sxProps as import("../shared/sx").SxProp;
  const { sxStyle, sxClassName, sxCss } = useSx(sx);

  const {
    page,
    totalPages,
    onPageChange,
    showPrevNext = true,
    siblingCount = 5,
    testID,
    accessibilityLabel = "pagination",
  } = rest as PaginationProps;

  const themed = useThemedColors();

  const pages = buildPageRange(page, totalPages, siblingCount);

  const activeButtonStyle: React.CSSProperties = {
    ...webPageButtonBase,
    backgroundColor: themed.surfaceDark,
    color: themed.surface,
    fontWeight: "700",
  };

  const defaultButtonStyle: React.CSSProperties = {
    ...webPageButtonBase,
    backgroundColor: "transparent",
    color: themed.textPrimary,
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...webPageButtonBase,
    ...webDisabled,
    backgroundColor: "transparent",
    color: themed.textDisabled,
  };

  const paginationElement = isWeb ? (
    <nav
      role="navigation"
      aria-label={accessibilityLabel}
      className={sxClassName || undefined}
      style={{ ...webNav, ...sxStyle } as React.CSSProperties}
      data-testid={testID}
    >
      {showPrevNext && (
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          style={page <= 1 ? disabledButtonStyle : defaultButtonStyle}
        >
          ‹
        </button>
      )}

      {pages.map((p, index) =>
        p === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            style={{
              ...webPageButtonBase,
              cursor: "default",
              color: themed.textTertiary,
              backgroundColor: "transparent",
            }}
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
            style={p === page ? activeButtonStyle : defaultButtonStyle}
          >
            {p}
          </button>
        ),
      )}

      {showPrevNext && (
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          style={page >= totalPages ? disabledButtonStyle : defaultButtonStyle}
        >
          ›
        </button>
      )}
    </nav>
  ) : (
    // React Native
    (() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { View, TouchableOpacity, Text } = require("react-native") as {
        View: React.ComponentType<Record<string, unknown>>;
        TouchableOpacity: React.ComponentType<Record<string, unknown>>;
        Text: React.ComponentType<Record<string, unknown>>;
      };

      return (
        <View
          accessibilityRole="menu"
          accessibilityLabel={accessibilityLabel}
          testID={testID}
          style={{ ...nativeContainer, ...sxStyle }}
        >
          {showPrevNext && (
            <TouchableOpacity
              onPress={() => page > 1 && onPageChange(page - 1)}
              disabled={page <= 1}
              accessibilityLabel="Previous page"
              style={{
                ...nativePageButtonBase,
                backgroundColor: "transparent",
                opacity: page <= 1 ? 0.4 : 1,
              }}
            >
              <Text style={{ color: themed.textPrimary, fontSize: 18 }}>‹</Text>
            </TouchableOpacity>
          )}

          {pages.map((p, index) =>
            p === "ellipsis" ? (
              <Text
                key={`ellipsis-${index}`}
                style={{ color: themed.textTertiary, paddingHorizontal: 4 }}
              >
                …
              </Text>
            ) : (
              <TouchableOpacity
                key={p}
                onPress={() => onPageChange(p)}
                accessibilityLabel={`Page ${p}`}
                accessibilityRole="button"
                style={{
                  ...nativePageButtonBase,
                  backgroundColor:
                    p === page ? themed.surfaceDark : "transparent",
                }}
              >
                <Text
                  style={{
                    color: p === page ? themed.surface : themed.textPrimary,
                    fontWeight: p === page ? "700" : "400",
                    fontSize: 14,
                  }}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ),
          )}

          {showPrevNext && (
            <TouchableOpacity
              onPress={() => page < totalPages && onPageChange(page + 1)}
              disabled={page >= totalPages}
              accessibilityLabel="Next page"
              style={{
                ...nativePageButtonBase,
                backgroundColor: "transparent",
                opacity: page >= totalPages ? 0.4 : 1,
              }}
            >
              <Text style={{ color: themed.textPrimary, fontSize: 18 }}>›</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    })()
  );

  if (sxCss && isWeb)
    return (
      <>
        {/* @ts-ignore */}
        <SxStyleTag css={sxCss} scopeClass={sxClassName} />
        {paginationElement}
      </>
    );
  return paginationElement;
};

Pagination.displayName = "Pagination";
export default Pagination;
