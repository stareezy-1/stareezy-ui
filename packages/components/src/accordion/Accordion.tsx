/**
 * Accordion — collapsible content sections with smooth animation.
 * Root wrapper accepts BoxProps. Text rendered via <Text> component.
 */

import React, { useState, useRef, useEffect } from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";
import { ACCORDION_KF, accordionGeometry } from "./Accordion.style";
import type { AccordionVariant } from "./Accordion.types";
import type { SxProp } from "../shared/sx";
import { useSx, SxStyleTag } from "../shared/useSx";
import type { SzrFC } from "../shared/types";

export interface AccordionItem {
  key: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export type { AccordionVariant };

export interface AccordionProps
  extends Omit<BoxProps, "children" | "onChange"> {
  items: AccordionItem[];
  defaultOpen?: string[];
  multiple?: boolean;
  variant?: AccordionVariant;
  onChange?: (openKeys: string[]) => void;
  titleTextType?: ETextType;
  titleTextStyle?: StyleProp;
  contentTextType?: ETextType;
  contentTextStyle?: StyleProp;
  /** sx prop — apply any Box style prop (responsive values, tokens, breakpoints) to the root element. */
  sx?: SxProp;
}

let accordionKfInjected = false;
function injectAccordionKf() {
  if (accordionKfInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.setAttribute("data-szr-kf", "accordion");
  el.textContent = ACCORDION_KF;
  document.head.appendChild(el);
  accordionKfInjected = true;
}

const AnimatedPanel: React.FC<{ open: boolean; children: React.ReactNode }> = ({
  open,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (ref.current) setHeight(ref.current.scrollHeight);
  });
  return (
    <div
      style={{
        overflow: "hidden",
        maxHeight: open ? height : 0,
        transition: "max-height 0.28s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
};

export const Accordion: SzrFC<AccordionProps> = ({
  items,
  defaultOpen = [],
  multiple = false,
  variant = "default",
  onChange,
  titleTextType = ETextType.SLabel,
  titleTextStyle,
  contentTextType = ETextType.SParagraphRegular,
  contentTextStyle,
  testID,
  sx,
  ...boxProps
}) => {
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpen);
  const { sxStyle, sxClassName, sxCss } = useSx(sx);
  const themed = useThemedColors();

  const toggle = (key: string) => {
    const next = openKeys.includes(key)
      ? openKeys.filter((k) => k !== key)
      : multiple
      ? [...openKeys, key]
      : [key];
    setOpenKeys(next);
    onChange?.(next);
  };

  if (isWeb) {
    injectAccordionKf();
    const isSeparated = variant === "separated";
    const isBordered = variant === "bordered";

    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={isSeparated ? accordionGeometry.itemGap : 0}
        style={{
          border: isBordered ? `1px solid ${themed.borderDefault}` : undefined,
          borderRadius: isBordered
            ? accordionGeometry.borderedBorderRadius
            : undefined,
          overflow: isBordered ? "hidden" : undefined,
          ...sxStyle,
        }}
        data-testid={testID}
        {...boxProps}
        className={sxClassName || undefined}
      >
        {sxCss && isWeb && <SxStyleTag css={sxCss} scopeClass={sxClassName} />}
        {items.map((item, idx) => {
          const isOpen = openKeys.includes(item.key);
          const isLast = idx === items.length - 1;
          return (
            <div
              key={item.key}
              style={{
                border: isSeparated
                  ? `1px solid ${themed.borderDefault}`
                  : undefined,
                borderRadius: isSeparated
                  ? accordionGeometry.separatedBorderRadius
                  : undefined,
                overflow: isSeparated ? "hidden" : undefined,
                borderBottom:
                  !isSeparated && !isLast
                    ? `1px solid ${themed.borderSecondary}`
                    : undefined,
              }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`szr-acc-panel-${item.key}`}
                id={`szr-acc-trigger-${item.key}`}
                disabled={item.disabled}
                onClick={() => !item.disabled && toggle(item.key)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: `${accordionGeometry.triggerPaddingV}px ${accordionGeometry.triggerPaddingH}px`,
                  background: isOpen ? themed.bgHover : "transparent",
                  border: "none",
                  cursor: item.disabled ? "not-allowed" : "pointer",
                  opacity: item.disabled ? 0.5 : 1,
                  textAlign: "left",
                  transition: "background 0.15s ease",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  {item.icon && (
                    <span
                      style={{
                        color: isOpen
                          ? themed.borderPrimaryBrand
                          : themed.textSecondary,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </span>
                  )}
                  {typeof item.title === "string" ? (
                    <Text
                      type={titleTextType}
                      text={item.title}
                      color={
                        isOpen ? themed.textImportantBrand : themed.textPrimary
                      }
                      style={{
                        transition: "color 0.15s ease",
                        ...(titleTextStyle as React.CSSProperties),
                      }}
                    />
                  ) : (
                    item.title
                  )}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
                    color: isOpen
                      ? themed.borderPrimaryBrand
                      : themed.textSecondary,
                  }}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                id={`szr-acc-panel-${item.key}`}
                role="region"
                aria-labelledby={`szr-acc-trigger-${item.key}`}
              >
                <AnimatedPanel open={isOpen}>
                  <div
                    style={{
                      padding: `${accordionGeometry.contentPaddingTop}px ${accordionGeometry.contentPaddingH}px ${accordionGeometry.contentPaddingBottom}px`,
                      animation: isOpen
                        ? "szr-accordion-open 0.2s ease"
                        : undefined,
                    }}
                  >
                    {typeof item.content === "string" ? (
                      <Text
                        type={contentTextType}
                        text={item.content}
                        color={themed.textSecondary}
                        style={{
                          lineHeight: 1.6,
                          ...(contentTextStyle as React.CSSProperties),
                        }}
                      />
                    ) : (
                      item.content
                    )}
                  </div>
                </AnimatedPanel>
              </div>
            </div>
          );
        })}
      </Box>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View, TouchableOpacity } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
    TouchableOpacity: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <Box
      testID={testID}
      {...boxProps}
      style={sxStyle as Record<string, unknown>}
      className={sxClassName || undefined}
    >
      {sxCss && isWeb && <SxStyleTag css={sxCss} scopeClass={sxClassName} />}
      {items.map((item) => {
        const isOpen = openKeys.includes(item.key);
        return (
          <View
            key={item.key}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: themed.borderSecondary,
            }}
          >
            <TouchableOpacity
              onPress={() => !item.disabled && toggle(item.key)}
              disabled={item.disabled}
              accessibilityRole="button"
              accessibilityState={{ expanded: isOpen, disabled: item.disabled }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 16,
                opacity: item.disabled ? 0.5 : 1,
              }}
            >
              {typeof item.title === "string" ? (
                <Text
                  type={titleTextType}
                  text={item.title}
                  color={themed.textPrimary}
                  style={{
                    flex: 1,
                    ...(titleTextStyle as Record<string, unknown>),
                  }}
                />
              ) : (
                item.title
              )}
              <Text
                type={ETextType.XSParagraphRegular}
                text={isOpen ? "▲" : "▼"}
                color={themed.textSecondary}
              />
            </TouchableOpacity>
            {isOpen && (
              <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                {typeof item.content === "string" ? (
                  <Text
                    type={contentTextType}
                    text={item.content}
                    color={themed.textSecondary}
                    style={{
                      lineHeight: 22,
                      ...(contentTextStyle as Record<string, unknown>),
                    }}
                  />
                ) : (
                  item.content
                )}
              </View>
            )}
          </View>
        );
      })}
    </Box>
  );
};

Accordion.displayName = "Accordion";
export default Accordion;
