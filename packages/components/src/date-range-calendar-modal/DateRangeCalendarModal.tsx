/**
 * DateRangeCalendarModal — modal for selecting a date range.
 *
 * Exact port of IDateRangeCalendarModalProps from rekosistem-components.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { Calendar } from "../calendar/Calendar";

export interface IDateRange {
  startDate?: string;
  endDate?: string;
}

export interface IDateRangeCalendarModalProps {
  onClose: () => void;
  onPressPositive: (dateRange: IDateRange) => void;
  isVisible: boolean;
  style?: React.CSSProperties | Record<string, unknown>;
  children?: React.ReactNode;
  selected?: IDateRange;
  disableNextDay?: boolean;
  disableDates?: string[];
  disablePastDates?: boolean;
  initialDateRange?: IDateRange;
  disableApply?: boolean;
  title?: string;
  negativeButtonText?: string;
  positiveButtonText?: string;
  onPressReset?: (dateRange: IDateRange) => void;
}

export const DateRangeCalendarModal: React.FC<IDateRangeCalendarModalProps> = ({
  onClose,
  onPressPositive,
  isVisible,
  style,
  children,
  selected,
  initialDateRange,
  disableApply = false,
  title,
  negativeButtonText = "Reset",
  positiveButtonText = "Apply",
  onPressReset,
}) => {
  const themed = useThemedColors();
  const [range, setRange] = React.useState<IDateRange>(selected ?? initialDateRange ?? {});
  const [pickingEnd, setPickingEnd] = React.useState(false);

  React.useEffect(() => {
    setRange(selected ?? initialDateRange ?? {});
    setPickingEnd(false);
  }, [selected, initialDateRange, isVisible]);

  if (!isVisible) return null;

  const handleDaySelect = (date: string) => {
    if (!pickingEnd) {
      setRange({ startDate: date });
      setPickingEnd(true);
    } else {
      if (range.startDate && date < range.startDate) {
        setRange({ startDate: date, endDate: range.startDate });
      } else {
        setRange((prev) => ({ ...prev, endDate: date }));
      }
      setPickingEnd(false);
    }
  };

  const handleReset = () => {
    const empty: IDateRange = {};
    setRange(empty);
    setPickingEnd(false);
    onPressReset?.(empty);
  };

  const handleConfirm = () => {
    onPressPositive(range);
  };

  const rangeLabel = range.startDate
    ? `${range.startDate}${range.endDate ? ` → ${range.endDate}` : " → …"}`
    : "Select start date";

  if (isWeb) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Date range calendar"}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: themed.bgPrimaryBlack,
            opacity: 0.5,
          }}
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: themed.bgPrimary,
            borderRadius: radius.xl.value,
            padding: spacing[24].value,
            minWidth: 320,
            maxWidth: "90vw",
            display: "flex",
            flexDirection: "column",
            gap: spacing[16].value,
            ...(style as React.CSSProperties | undefined),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {title && (
              <h3 style={{ margin: 0, fontSize: spacing[18].value, fontWeight: "600", color: themed.textPrimary }}>
                {title}
              </h3>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close date range modal"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: spacing[20].value,
                color: themed.textSecondary,
                padding: spacing[4].value,
                marginLeft: "auto",
              }}
            >
              ×
            </button>
          </div>
          {/* Range indicator */}
          <div
            style={{
              padding: `${spacing[8].value}px ${spacing[12].value}px`,
              backgroundColor: themed.bgSecondary,
              borderRadius: radius.md.value,
              fontSize: spacing[14].value,
              color: themed.textSecondary,
            }}
          >
            {rangeLabel}
          </div>
          <Calendar
            {...(range.startDate !== undefined ? { selected: range.startDate } : {})}
            onSelectedChange={handleDaySelect}
            onDateChange={handleDaySelect}
          />
          {children}
          <div style={{ display: "flex", gap: spacing[12].value }}>
            <button
              type="button"
              onClick={handleReset}
              aria-label={negativeButtonText}
              style={{
                flex: 1,
                padding: `${spacing[12].value}px ${spacing[16].value}px`,
                backgroundColor: themed.bgSecondary,
                border: `1px solid ${themed.borderDefault}`,
                borderRadius: radius.full.value,
                cursor: "pointer",
                color: themed.textPrimary,
                fontSize: spacing[14].value,
              }}
            >
              {negativeButtonText}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={disableApply || !range.startDate}
              aria-label={positiveButtonText}
              aria-disabled={disableApply || !range.startDate}
              style={{
                flex: 1,
                padding: `${spacing[12].value}px ${spacing[16].value}px`,
                backgroundColor: disableApply || !range.startDate ? themed.bgDisabled : themed.surfaceDark,
                border: "none",
                borderRadius: radius.full.value,
                cursor: disableApply || !range.startDate ? "not-allowed" : "pointer",
                color: disableApply || !range.startDate ? themed.textDisabled : themed.textInverse,
                fontSize: spacing[14].value,
                fontWeight: "600",
              }}
            >
              {positiveButtonText}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Modal, Text } = require("react-native") as {
    Modal: React.ComponentType<Record<string, unknown>>;
    Text: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityLabel={title ?? "Date range calendar"}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: themed.bgPrimary,
            borderRadius: radius.xl.value,
            padding: spacing[24].value,
            width: "90%",
            ...(style as Record<string, unknown> | undefined),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing[16].value }}>
            {title && (
              <Text style={{ fontSize: spacing[18].value, fontWeight: "600", color: themed.textPrimary, flex: 1 }} allowFontScaling={false}>
                {title}
              </Text>
            )}
            <TouchableOpacity onPress={onClose} accessibilityLabel="Close date range modal" style={{ padding: spacing[4].value }}>
              <View />
            </TouchableOpacity>
          </View>
          <View style={{ padding: spacing[8].value, backgroundColor: themed.bgSecondary, borderRadius: radius.md.value, marginBottom: spacing[12].value }}>
            <Text style={{ fontSize: spacing[14].value, color: themed.textSecondary }} allowFontScaling={false}>
              {rangeLabel}
            </Text>
          </View>
          <Calendar
            {...(range.startDate !== undefined ? { selected: range.startDate } : {})}
            onSelectedChange={handleDaySelect}
            onDateChange={handleDaySelect}
          />
          {children}
          <View style={{ flexDirection: "row", gap: spacing[12].value, marginTop: spacing[16].value }}>
            <TouchableOpacity
              onPress={handleReset}
              accessibilityLabel={negativeButtonText}
              style={{ flex: 1, padding: spacing[12].value, backgroundColor: themed.bgSecondary, borderWidth: 1, borderColor: themed.borderDefault, borderRadius: radius.full.value, alignItems: "center" }}
            >
              <Text style={{ color: themed.textPrimary, fontSize: spacing[14].value }} allowFontScaling={false}>{negativeButtonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              disabled={disableApply || !range.startDate}
              accessibilityLabel={positiveButtonText}
              accessibilityState={{ disabled: disableApply || !range.startDate }}
              style={{ flex: 1, padding: spacing[12].value, backgroundColor: disableApply || !range.startDate ? themed.bgDisabled : themed.surfaceDark, borderRadius: radius.full.value, alignItems: "center" }}
            >
              <Text style={{ color: disableApply || !range.startDate ? themed.textDisabled : themed.textInverse, fontSize: spacing[14].value, fontWeight: "600" }} allowFontScaling={false}>
                {positiveButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

DateRangeCalendarModal.displayName = "DateRangeCalendarModal";
export default DateRangeCalendarModal;
