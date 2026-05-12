/**
 * FilterButton — button with active filter count badge.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 17.1, 17.3
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export interface IFilterButtonProps {
  testID?: string;
  activeFilter: number;
  onPress?(): void;
  onPressReset?(): void;
}

export const FilterButton: React.FC<IFilterButtonProps> = ({
  testID,
  activeFilter,
  onPress,
  onPressReset,
}) => {
  const themed = useThemedColors();
  const hasActiveFilters = activeFilter > 0;

  if (isWeb) {
    return (
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: spacing[8].value }}>
        <button
          type="button"
          data-testid={testID}
          aria-label={`Filter${hasActiveFilters ? `, ${activeFilter} active` : ""}`}
          aria-busy={false}
          aria-disabled={false}
          onClick={onPress}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: spacing[6].value,
            paddingTop: spacing[8].value,
            paddingBottom: spacing[8].value,
            paddingLeft: spacing[12].value,
            paddingRight: spacing[12].value,
            borderRadius: radius.full.value,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: hasActiveFilters ? themed.borderPrimaryBrand : themed.borderDefault,
            backgroundColor: hasActiveFilters ? themed.bgSecondary : themed.surface,
            cursor: "pointer",
            outline: "none",
          }}
        >
          {/* Filter icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M4 8h8M6 12h4" stroke={hasActiveFilters ? themed.borderPrimaryBrand : themed.textSecondary} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: spacing[14].value, color: hasActiveFilters ? themed.borderPrimaryBrand : themed.textPrimary }}>
            Filter
          </span>
          {hasActiveFilters && (
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: spacing[20].value,
              height: spacing[20].value,
              borderRadius: radius.full.value,
              backgroundColor: themed.borderPrimaryBrand,
              color: themed.surface,
              fontSize: spacing[10].value,
              fontWeight: "600",
              paddingLeft: spacing[4].value,
              paddingRight: spacing[4].value,
            }}>
              {activeFilter}
            </span>
          )}
        </button>
        {hasActiveFilters && onPressReset && (
          <button
            type="button"
            aria-label="Reset filters"
            aria-busy={false}
            aria-disabled={false}
            onClick={onPressReset}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: spacing[32].value,
              height: spacing[32].value,
              borderRadius: radius.full.value,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: themed.borderDefault,
              backgroundColor: themed.surface,
              cursor: "pointer",
              outline: "none",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke={themed.textSecondary} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing[8].value }}>
      <TouchableOpacity
        onPress={onPress}
        testID={testID}
        accessibilityLabel={`Filter${hasActiveFilters ? `, ${activeFilter} active` : ""}`}
        aria-disabled={false}
        aria-busy={false}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[6].value,
          paddingVertical: spacing[8].value,
          paddingHorizontal: spacing[12].value,
          borderRadius: radius.full.value,
          borderWidth: 1,
          borderColor: hasActiveFilters ? themed.borderPrimaryBrand : themed.borderDefault,
          backgroundColor: hasActiveFilters ? themed.bgSecondary : themed.surface,
        }}
      >
        <RNText style={{ fontSize: spacing[14].value, color: hasActiveFilters ? themed.borderPrimaryBrand : themed.textPrimary }} allowFontScaling={false}>
          Filter
        </RNText>
        {hasActiveFilters && (
          <View style={{
            minWidth: spacing[20].value,
            height: spacing[20].value,
            borderRadius: radius.full.value,
            backgroundColor: themed.borderPrimaryBrand,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: spacing[4].value,
          }}>
            <RNText style={{ fontSize: spacing[10].value, color: themed.surface, fontWeight: "600" }} allowFontScaling={false}>
              {activeFilter}
            </RNText>
          </View>
        )}
      </TouchableOpacity>
      {hasActiveFilters && onPressReset && (
        <TouchableOpacity
          onPress={onPressReset}
          accessibilityLabel="Reset filters"
          aria-disabled={false}
          aria-busy={false}
          style={{
            width: spacing[32].value,
            height: spacing[32].value,
            borderRadius: radius.full.value,
            borderWidth: 1,
            borderColor: themed.borderDefault,
            backgroundColor: themed.surface,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RNText style={{ fontSize: spacing[12].value, color: themed.textSecondary }} allowFontScaling={false}>✕</RNText>
        </TouchableOpacity>
      )}
    </View>
  );
};

FilterButton.displayName = "FilterButton";
export default FilterButton;
