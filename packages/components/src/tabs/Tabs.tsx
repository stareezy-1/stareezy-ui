/**
 * Tabs — tab navigation with animated indicator.
 * Root wrapper accepts BoxProps. Tab labels rendered via <Text>.
 */

import React, { useState, useRef, useEffect } from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";
import type { TabsVariant, TabItem } from "./Tabs.types";

export type { TabsVariant, TabItem };

export interface TabsProps extends Omit<BoxProps, "children" | "onChange"> {
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  variant?: TabsVariant;
  fullWidth?: boolean;
  tabBarBoxProps?: Omit<BoxProps, "children">;
  /** ETextType for tab label text (when label is a string) */
  labelTextType?: ETextType;
  /** Style override for tab label text */
  labelTextStyle?: StyleProp;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveKey,
  activeKey: controlledKey,
  onChange,
  variant = "underline",
  fullWidth = false,
  tabBarBoxProps,
  labelTextType,
  labelTextStyle,
  testID,
  ...boxProps
}) => {
  const [internalKey, setInternalKey] = useState(
    defaultActiveKey ?? items[0]?.key ?? "",
  );
  const activeKey = controlledKey ?? internalKey;
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleChange = (key: string) => {
    setInternalKey(key);
    onChange?.(key);
  };

  useEffect(() => {
    if (!isWeb || variant !== "underline") return;
    const activeTab = tabRefs.current[activeKey];
    const indicator = indicatorRef.current;
    if (!activeTab || !indicator) return;
    indicator.style.width = `${activeTab.offsetWidth}px`;
    indicator.style.left = `${activeTab.offsetLeft}px`;
  }, [activeKey, variant]);

  const activeItem = items.find((i) => i.key === activeKey);
  const isPills = variant === "pills";
  const isCard = variant === "card";
  const isUnderline = variant === "underline";

  if (isWeb) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        data-testid={testID}
        {...boxProps}
      >
        <Box
          role="tablist"
          display="flex"
          flexDirection="row"
          position="relative"
          gap={isPills ? 4 : 0}
          style={{
            borderBottom: isUnderline
              ? `2px solid ${colors.beauBlue[200].value}`
              : undefined,
            backgroundColor: isPills
              ? colors.beauBlue[100].value
              : isCard
              ? colors.beauBlue[50].value
              : undefined,
            borderRadius: isPills ? 10 : isCard ? "10px 10px 0 0" : undefined,
            padding: isPills ? 4 : undefined,
          }}
          {...tabBarBoxProps}
        >
          {items.map((item) => {
            const isActive = item.key === activeKey;
            return (
              <button
                key={item.key}
                ref={(el) => {
                  tabRefs.current[item.key] = el;
                }}
                role="tab"
                aria-selected={isActive}
                aria-disabled={item.disabled}
                tabIndex={isActive ? 0 : -1}
                disabled={item.disabled}
                onClick={() => !item.disabled && handleChange(item.key)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: isPills
                    ? "7px 16px"
                    : isCard
                    ? "10px 20px"
                    : "10px 16px",
                  border: "none",
                  borderRadius: isPills ? 7 : isCard ? "8px 8px 0 0" : 0,
                  cursor: item.disabled ? "not-allowed" : "pointer",
                  opacity: item.disabled ? 0.45 : 1,
                  flex: fullWidth ? 1 : undefined,
                  justifyContent: fullWidth ? "center" : undefined,
                  transition: "background 0.15s ease,color 0.15s ease",
                  position: "relative",
                  whiteSpace: "nowrap",
                  backgroundColor: isActive
                    ? isPills
                      ? colors.celurenBlue[400].value
                      : isCard
                      ? "#ffffff"
                      : "transparent"
                    : "transparent",
                  boxShadow:
                    isActive && isCard ? "0 -1px 0 0 #fff inset" : undefined,
                }}
              >
                {item.icon && (
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                )}
                {typeof item.label === "string" ? (
                  <Text
                    type={
                      labelTextType ??
                      (isActive ? ETextType.SLabel : ETextType.SParagraphMedium)
                    }
                    text={item.label}
                    color={
                      isActive
                        ? isPills
                          ? "#ffffff"
                          : colors.celurenBlue[500].value
                        : colors.beauBlue[700].value
                    }
                    style={labelTextStyle as React.CSSProperties}
                  />
                ) : (
                  item.label
                )}
                {item.badge && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 18,
                      height: 18,
                      borderRadius: 9,
                      backgroundColor: isActive
                        ? colors.celurenBlue[100].value
                        : colors.beauBlue[200].value,
                      color: isActive
                        ? colors.celurenBlue[600].value
                        : colors.beauBlue[700].value,
                      fontSize: 10,
                      fontWeight: "700",
                      padding: "0 5px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          {isUnderline && (
            <div
              ref={indicatorRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: -2,
                height: 2,
                borderRadius: 2,
                backgroundColor: colors.celurenBlue[400].value,
                transition:
                  "left 0.22s cubic-bezier(0.4,0,0.2,1),width 0.22s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          )}
        </Box>
        {activeItem?.content !== undefined && (
          <div role="tabpanel" style={{ paddingTop: 16 }}>
            {activeItem.content}
          </div>
        )}
      </Box>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View, TouchableOpacity, ScrollView } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
    TouchableOpacity: React.ComponentType<Record<string, unknown>>;
    ScrollView: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <Box testID={testID} {...boxProps}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          borderBottomWidth: 2,
          borderBottomColor: colors.beauBlue[200].value,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {items.map((item) => {
            const isActive = item.key === activeKey;
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => !item.disabled && handleChange(item.key)}
                disabled={item.disabled}
                accessibilityRole="tab"
                accessibilityState={{
                  selected: isActive,
                  disabled: item.disabled,
                }}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderBottomWidth: isActive ? 2 : 0,
                  borderBottomColor: colors.celurenBlue[400].value,
                  opacity: item.disabled ? 0.45 : 1,
                }}
              >
                {typeof item.label === "string" ? (
                  <Text
                    type={
                      labelTextType ??
                      (isActive ? ETextType.SLabel : ETextType.SParagraphMedium)
                    }
                    text={item.label}
                    color={
                      isActive
                        ? colors.celurenBlue[500].value
                        : colors.beauBlue[700].value
                    }
                    style={labelTextStyle as Record<string, unknown>}
                  />
                ) : (
                  item.label
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {activeItem?.content && (
        <View style={{ paddingTop: 16 }}>{activeItem.content}</View>
      )}
    </Box>
  );
};

Tabs.displayName = "Tabs";
export default Tabs;
