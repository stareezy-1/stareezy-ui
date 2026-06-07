/**
 * Breadcrumb — cross-platform navigation breadcrumb component.
 *
 * All visual styles live in Breadcrumb.style.ts — no inline color literals here.
 * Colors are resolved at render time via useThemedColors().
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */

import React from "react";
import { useThemedColors } from "../shared/useThemedColors";
import { isWeb } from "../shared/platform";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import type { BreadcrumbItem } from "./Breadcrumb.types";
import type { SzrFC } from "../shared/types";
import { useSx, SxStyleTag } from "../shared/useSx";
import {
  webNav,
  webOl,
  webLi,
  webCrumbBase,
  webSeparatorWrap,
  nativeContainer,
  nativeCrumbBase,
  nativeSeparator,
} from "./Breadcrumb.style";

export type { BreadcrumbItem } from "./Breadcrumb.types";

// ---------------------------------------------------------------------------
// BreadcrumbProps
// ---------------------------------------------------------------------------

export interface BreadcrumbProps extends BoxLayoutProps {
  /** Ordered list of breadcrumb items. */
  items: BreadcrumbItem[];
  /** Custom separator node. Defaults to "/" on web and "›" on native. */
  separator?: React.ReactNode;
  testID?: string;
  accessibilityLabel?: string;
}

// ---------------------------------------------------------------------------
// Breadcrumb
// ---------------------------------------------------------------------------

export const Breadcrumb: SzrFC<BreadcrumbProps> = (props) => {
  const { sxProps, rest } = extractBoxLayoutProps(props);
  const sx = sxProps as import("../shared/sx").SxProp;
  const { sxStyle, sxClassName, sxCss } = useSx(sx);

  const {
    items,
    separator,
    testID,
    accessibilityLabel = "breadcrumb",
  } = rest as BreadcrumbProps;

  const themed = useThemedColors();

  const breadcrumbElement = isWeb ? (
    <nav
      role="navigation"
      aria-label={accessibilityLabel}
      style={{ ...webNav, ...sxStyle } as React.CSSProperties}
      data-testid={testID}
    >
      <ol style={webOl}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const crumbStyle: React.CSSProperties = {
            ...webCrumbBase,
            color: isLast ? themed.textPrimary : themed.textSecondary,
            fontWeight: isLast ? "600" : "400",
            cursor: isLast ? "default" : "pointer",
          };

          return (
            <li key={index} style={webLi}>
              {/* Separator — rendered before each crumb except the first */}
              {index > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    ...webSeparatorWrap,
                    color: themed.textTertiary,
                  }}
                >
                  {separator ?? "/"}
                </span>
              )}

              {/* Crumb link or static text */}
              {isLast ? (
                <span style={crumbStyle} aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <a href={item.href} onClick={item.onClick} style={crumbStyle}>
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  style={{
                    ...crumbStyle,
                    background: "none",
                    border: "none",
                    font: "inherit",
                    padding: crumbStyle.padding,
                  }}
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
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
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <View key={index} style={nativeCrumbBase}>
                {index > 0 && (
                  <View style={nativeSeparator}>
                    <Text
                      style={{
                        color: themed.textTertiary,
                        fontSize: 12,
                      }}
                    >
                      {separator ?? "›"}
                    </Text>
                  </View>
                )}
                {isLast ? (
                  <Text
                    accessibilityRole="text"
                    style={{
                      color: themed.textPrimary,
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    {item.label}
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={item.onClick}
                    accessibilityRole="link"
                    accessibilityLabel={item.label}
                  >
                    <Text
                      style={{
                        color: themed.textSecondary,
                        fontSize: 14,
                      }}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      );
    })()
  );

  if (sxCss && isWeb)
    return (
      <>
        {/* @ts-ignore */}
        <SxStyleTag css={sxCss} scopeClass={sxClassName} />
        {breadcrumbElement}
      </>
    );
  return breadcrumbElement;
};

Breadcrumb.displayName = "Breadcrumb";
export default Breadcrumb;
