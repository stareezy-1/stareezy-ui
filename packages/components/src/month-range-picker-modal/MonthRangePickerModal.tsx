/**
 * MonthRangePickerModal — modal for selecting a month range (start/end).
 *
 * Exact port of IMonthRangePickerModalProps from rekosistem-components.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export interface IMonthRange {
  start: string;
  end: string;
}

export interface IMonthRangePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (range: IMonthRange) => void;
  selected?: IMonthRange;
  /** Earliest selectable month, format "yyyy-MM" */
  firstTransaction: string;
  allowAllDates?: boolean;
  endLimit?: Date;
}

const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function parseYM(s: string): { year: number; month: number } {
  const parts = s.split("-").map(Number);
  const y = parts[0] ?? 0;
  const m = parts[1] ?? 1;
  return { year: y, month: m - 1 };
}

function fmtYM(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

function ymToDate(ym: string): Date {
  const { year, month } = parseYM(ym);
  return new Date(year, month, 1);
}

export const MonthRangePickerModal: React.FC<IMonthRangePickerModalProps> = ({
  isVisible,
  onClose,
  onApply,
  selected,
  firstTransaction,
  allowAllDates = false,
  endLimit,
}) => {
  const themed = useThemedColors();
  const today = new Date();
  const todayYM = fmtYM(today.getFullYear(), today.getMonth());

  const [viewYear, setViewYear] = React.useState(() => {
    if (selected?.start) return parseYM(selected.start).year;
    return parseYM(firstTransaction).year;
  });
  const [range, setRange] = React.useState<Partial<IMonthRange>>(selected ?? {});
  const [pickingEnd, setPickingEnd] = React.useState(false);

  React.useEffect(() => {
    if (selected?.start) setViewYear(parseYM(selected.start).year);
    setRange(selected ?? {});
    setPickingEnd(false);
  }, [selected, isVisible]);

  if (!isVisible) return null;

  const isDisabled = (ym: string): boolean => {
    if (allowAllDates) return false;
    const d = ymToDate(ym);
    const first = ymToDate(firstTransaction);
    if (d < first) return true;
    if (endLimit && d > endLimit) return true;
    if (d > ymToDate(todayYM)) return true;
    return false;
  };

  const handleMonthPress = (ym: string) => {
    if (isDisabled(ym)) return;
    if (!pickingEnd || !range.start) {
      setRange({ start: ym });
      setPickingEnd(true);
    } else {
      if (ym < range.start) {
        setRange({ start: ym, end: range.start });
      } else {
        setRange((prev) => ({ ...prev, end: ym }));
      }
      setPickingEnd(false);
    }
  };

  const isInRange = (ym: string): boolean => {
    if (!range.start || !range.end) return false;
    return ym >= range.start && ym <= range.end;
  };

  const isStart = (ym: string) => ym === range.start;
  const isEnd = (ym: string) => ym === range.end;

  const handleApply = () => {
    if (range.start && range.end) {
      onApply({ start: range.start, end: range.end });
    }
  };

  const canApply = !!(range.start && range.end);

  const monthGrid = MONTHS_SHORT.map((label, idx) => {
    const ym = fmtYM(viewYear, idx);
    return {
      label,
      ym,
      isPicked: isStart(ym) || isEnd(ym),
      isInRange: isInRange(ym),
      isDisabled: isDisabled(ym),
    };
  });

  if (isWeb) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Month range picker"
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
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ margin: 0, fontSize: spacing[18].value, fontWeight: "600", color: themed.textPrimary }}>
              Select Month Range
            </h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close month range picker"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: spacing[20].value,
                color: themed.textSecondary,
                padding: spacing[4].value,
              }}
            >
              ×
            </button>
          </div>
          {/* Range label */}
          <div
            style={{
              padding: `${spacing[8].value}px ${spacing[12].value}px`,
              backgroundColor: themed.bgSecondary,
              borderRadius: radius.md.value,
              fontSize: spacing[14].value,
              color: themed.textSecondary,
            }}
          >
            {range.start
              ? `${range.start}${range.end ? ` → ${range.end}` : " → …"}`
              : "Select start month"}
          </div>
          {/* Year navigation */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button type="button" onClick={() => setViewYear((y) => y - 1)} aria-label="Previous year"
              style={{ background: "none", border: "none", cursor: "pointer", color: themed.textPrimary, fontSize: 18 }}>
              &#8249;
            </button>
            <span style={{ fontWeight: "600", color: themed.textPrimary, fontSize: spacing[16].value }}>{viewYear}</span>
            <button type="button" onClick={() => setViewYear((y) => y + 1)} aria-label="Next year"
              style={{ background: "none", border: "none", cursor: "pointer", color: themed.textPrimary, fontSize: 18 }}>
              &#8250;
            </button>
          </div>
          {/* Month grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: spacing[8].value }}>
            {monthGrid.map(({ label, ym, isPicked, isInRange: inRange, isDisabled: dis }) => (
              <button
                key={ym}
                type="button"
                onClick={() => handleMonthPress(ym)}
                disabled={dis}
                aria-label={ym}
                aria-pressed={isPicked}
                style={{
                  padding: `${spacing[8].value}px`,
                  backgroundColor: isPicked ? themed.surfaceDark : inRange ? themed.bgSecondary : "transparent",
                  border: `1px solid ${isPicked ? themed.surfaceDark : inRange ? themed.borderSecondary : themed.borderDefault}`,
                  borderRadius: radius.md.value,
                  cursor: dis ? "not-allowed" : "pointer",
                  color: isPicked ? themed.textInverse : dis ? themed.textDisabled : themed.textPrimary,
                  fontSize: spacing[14].value,
                  fontWeight: isPicked ? "600" : "400",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {/* Buttons */}
          <div style={{ display: "flex", gap: spacing[12].value }}>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cancel"
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
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!canApply}
              aria-label="Apply"
              aria-disabled={!canApply}
              style={{
                flex: 1,
                padding: `${spacing[12].value}px ${spacing[16].value}px`,
                backgroundColor: !canApply ? themed.bgDisabled : themed.surfaceDark,
                border: "none",
                borderRadius: radius.full.value,
                cursor: !canApply ? "not-allowed" : "pointer",
                color: !canApply ? themed.textDisabled : themed.textInverse,
                fontSize: spacing[14].value,
                fontWeight: "600",
              }}
            >
              Apply
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
      accessibilityLabel="Month range picker"
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
        <View style={{ backgroundColor: themed.bgPrimary, borderRadius: radius.xl.value, padding: spacing[24].value, width: "90%" }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing[16].value }}>
            <Text style={{ fontSize: spacing[18].value, fontWeight: "600", color: themed.textPrimary, flex: 1 }} allowFontScaling={false}>
              Select Month Range
            </Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Close month range picker" style={{ padding: spacing[4].value }}>
              <View />
            </TouchableOpacity>
          </View>
          {/* Range label */}
          <View style={{ padding: spacing[8].value, backgroundColor: themed.bgSecondary, borderRadius: radius.md.value, marginBottom: spacing[12].value }}>
            <Text style={{ fontSize: spacing[14].value, color: themed.textSecondary }} allowFontScaling={false}>
              {range.start ? `${range.start}${range.end ? ` → ${range.end}` : " → …"}` : "Select start month"}
            </Text>
          </View>
          {/* Year navigation */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing[12].value }}>
            <TouchableOpacity onPress={() => setViewYear((y) => y - 1)} accessibilityLabel="Previous year">
              <Text style={{ color: themed.textPrimary, fontSize: 18 }} allowFontScaling={false}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: "600", color: themed.textPrimary, fontSize: spacing[16].value }} allowFontScaling={false}>{viewYear}</Text>
            <TouchableOpacity onPress={() => setViewYear((y) => y + 1)} accessibilityLabel="Next year">
              <Text style={{ color: themed.textPrimary, fontSize: 18 }} allowFontScaling={false}>{">"}</Text>
            </TouchableOpacity>
          </View>
          {/* Month grid — 4 columns */}
          {[0, 1, 2].map((row) => (
            <View key={row} style={{ flexDirection: "row", gap: spacing[8].value, marginBottom: spacing[8].value }}>
              {monthGrid.slice(row * 4, row * 4 + 4).map(({ label, ym, isPicked, isInRange: inRange, isDisabled: dis }) => (
                <TouchableOpacity
                  key={ym}
                  onPress={() => handleMonthPress(ym)}
                  disabled={dis}
                  accessibilityLabel={ym}
                  style={{
                    flex: 1,
                    padding: spacing[8].value,
                    backgroundColor: isPicked ? themed.surfaceDark : inRange ? themed.bgSecondary : "transparent",
                    borderWidth: 1,
                    borderColor: isPicked ? themed.surfaceDark : inRange ? themed.borderSecondary : themed.borderDefault,
                    borderRadius: radius.md.value,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: isPicked ? themed.textInverse : dis ? themed.textDisabled : themed.textPrimary,
                      fontSize: spacing[14].value,
                      fontWeight: isPicked ? "600" : "400",
                    }}
                    allowFontScaling={false}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          {/* Buttons */}
          <View style={{ flexDirection: "row", gap: spacing[12].value, marginTop: spacing[8].value }}>
            <TouchableOpacity
              onPress={onClose}
              accessibilityLabel="Cancel"
              style={{ flex: 1, padding: spacing[12].value, backgroundColor: themed.bgSecondary, borderWidth: 1, borderColor: themed.borderDefault, borderRadius: radius.full.value, alignItems: "center" }}
            >
              <Text style={{ color: themed.textPrimary, fontSize: spacing[14].value }} allowFontScaling={false}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleApply}
              disabled={!canApply}
              accessibilityLabel="Apply"
              accessibilityState={{ disabled: !canApply }}
              style={{ flex: 1, padding: spacing[12].value, backgroundColor: !canApply ? themed.bgDisabled : themed.surfaceDark, borderRadius: radius.full.value, alignItems: "center" }}
            >
              <Text style={{ color: !canApply ? themed.textDisabled : themed.textInverse, fontSize: spacing[14].value, fontWeight: "600" }} allowFontScaling={false}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

MonthRangePickerModal.displayName = "MonthRangePickerModal";
export default MonthRangePickerModal;
