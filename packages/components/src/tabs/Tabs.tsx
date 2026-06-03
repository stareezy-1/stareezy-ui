/**
 * Tabs — tab navigation with animated indicator.
 * Root wrapper accepts BoxProps. Tab labels rendered via <Text>.
 */

import React, { useState, useRef, useEffect } from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";
import { tabsGeometry } from "./Tabs.style";
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
  labelTextType?: ETextType;
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
  const themed = useThemedColors();

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
              ? `2px solid ${themed.borderSecondary}`
              : undefined,
            backgroundColor: isPills
              ? themed.bgHover
              : isCard
              ? themed.bgSecondary
              : undefined,
            borderRadius: isPills
              ? tabsGeometry.pillsBorderRadius
              : isCard
              ? "10px 10px 0 0"
              : undefined,
            padding: isPills ? tabsGeometry.pillsPadding : undefined,
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
                    ? `${tabsGeometry.pillsItemPaddingV}px ${tabsGeometry.pillsItemPaddingH}px`
                    : isCard
                    ? `${tabsGeometry.cardItemPaddingV}px ${tabsGeometry.cardItemPaddingH}px`
                    : `${tabsGeometry.underlineItemPaddingV}px ${tabsGeometry.underlineItemPaddingH}px`,
                  border: "none",
                  borderRadius: isPills
                    ? tabsGeometry.pillsItemBorderRadius
                    : isCard
                    ? tabsGeometry.cardItemBorderRadius
                    : 0,
                  cursor: item.disabled ? "not-allowed" : "pointer",
                  opacity: item.disabled ? 0.45 : 1,
                  flex: fullWidth ? 1 : undefined,
                  justifyContent: fullWidth ? "center" : undefined,
                  transition: "background 0.15s ease,color 0.15s ease",
                  position: "relative",
                  whiteSpace: "nowrap",
                  backgroundColor: isActive
                    ? isPills
                      ? themed.bgInteractive
                      : isCard
                      ? themed.surface
                      : "transparent"
                    : "transparent",
                  boxShadow:
                    isActive && isCard
                      ? `0 -1px 0 0 ${themed.surface} inset`
                      : undefined,
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
                          ? themed.surface
                          : themed.textImportantBrand
                        : themed.textSecondary
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
                      minWidth: tabsGeometry.badgeMinWidth,
                      height: tabsGeometry.badgeHeight,
                      borderRadius: tabsGeometry.badgeBorderRadius,
                      backgroundColor: isActive
                        ? themed.bgInteractive
                        : themed.borderSecondary,
                      color: isActive ? themed.surface : themed.textSecondary,
                      fontSize: tabsGeometry.badgeFontSize,
                      fontWeight: "700",
                      padding: `0 ${tabsGeometry.badgePaddingH}px`,
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
                height: tabsGeometry.indicatorHeight,
                borderRadius: tabsGeometry.indicatorBorderRadius,
                backgroundColor: themed.borderPrimaryBrand,
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
          borderBottomColor: themed.borderSecondary,
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
                  borderBottomColor: themed.borderPrimaryBrand,
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
                        ? themed.textImportantBrand
                        : themed.textSecondary
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
