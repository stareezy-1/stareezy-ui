/**
 * Accordion — collapsible content sections with smooth animation.
 * Root wrapper accepts BoxProps.
 */

import React, { useState, useRef, useEffect } from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps } from "../primitives/Box";

export interface AccordionItem {
  key: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export type AccordionVariant = "default" | "bordered" | "separated";

export interface AccordionProps
  extends Omit<BoxProps, "children" | "onChange"> {
  items: AccordionItem[];
  defaultOpen?: string[];
  multiple?: boolean;
  variant?: AccordionVariant;
  onChange?: (openKeys: string[]) => void;
}

const ACCORDION_KF = `
@keyframes szr-accordion-open {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

let accordionKfInjected = false;
function injectAccordionKf() {
  if (accordionKfInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
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

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpen = [],
  multiple = false,
  variant = "default",
  onChange,
  testID,
  ...boxProps
}) => {
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpen);

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
        gap={isSeparated ? 8 : 0}
        style={{
          border: isBordered
            ? `1px solid ${colors.beauBlue[300].value}`
            : undefined,
          borderRadius: isBordered ? 12 : undefined,
          overflow: isBordered ? "hidden" : undefined,
        }}
        data-testid={testID}
        {...boxProps}
      >
        {items.map((item, idx) => {
          const isOpen = openKeys.includes(item.key);
          const isLast = idx === items.length - 1;
          return (
            <div
              key={item.key}
              style={{
                border: isSeparated
                  ? `1px solid ${colors.beauBlue[300].value}`
                  : undefined,
                borderRadius: isSeparated ? 10 : undefined,
                overflow: isSeparated ? "hidden" : undefined,
                borderBottom:
                  !isSeparated && !isLast
                    ? `1px solid ${colors.beauBlue[200].value}`
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
                  padding: "14px 18px",
                  background: isOpen
                    ? colors.beauBlue[50].value
                    : "transparent",
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
                          ? colors.celurenBlue[400].value
                          : colors.beauBlue[700].value,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: isOpen
                        ? colors.celurenBlue[500].value
                        : colors.raisinBlack[800].value,
                      fontFamily:
                        "'Plus Jakarta Sans',Inter,system-ui,sans-serif",
                      lineHeight: 1.4,
                      transition: "color 0.15s ease",
                    }}
                  >
                    {item.title}
                  </span>
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
                      ? colors.celurenBlue[400].value
                      : colors.beauBlue[600].value,
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
                      padding: "4px 18px 16px",
                      fontSize: 14,
                      color: colors.raisinBlack[600].value,
                      fontFamily: "Inter,system-ui,sans-serif",
                      lineHeight: 1.6,
                      animation: isOpen
                        ? "szr-accordion-open 0.2s ease"
                        : undefined,
                    }}
                  >
                    {item.content}
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
  const {
    View,
    TouchableOpacity,
    Text: RNText,
  } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
    TouchableOpacity: React.ComponentType<Record<string, unknown>>;
    Text: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <Box testID={testID} {...boxProps}>
      {items.map((item) => {
        const isOpen = openKeys.includes(item.key);
        return (
          <View
            key={item.key}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.beauBlue[200].value,
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
              <RNText
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: colors.raisinBlack[800].value,
                  flex: 1,
                }}
                allowFontScaling={false}
              >
                {item.title}
              </RNText>
              <RNText
                style={{ fontSize: 12, color: colors.beauBlue[600].value }}
                allowFontScaling={false}
              >
                {isOpen ? "▲" : "▼"}
              </RNText>
            </TouchableOpacity>
            {isOpen && (
              <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                {typeof item.content === "string" ? (
                  <RNText
                    style={{
                      fontSize: 14,
                      color: colors.raisinBlack[600].value,
                      lineHeight: 22,
                    }}
                    allowFontScaling={false}
                  >
                    {item.content}
                  </RNText>
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
