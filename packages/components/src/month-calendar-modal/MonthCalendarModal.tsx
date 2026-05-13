/**
 * MonthCalendarModal — modal for selecting a month (or multiple months).
 *
 * Exact port of IMonthCalendarModalProps from rekosistem-components.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { flattenStyle } from '../shared/flattenStyle';

export interface IMonthCalendarModalProps {
  onClose: () => void;
  onPressPositive?: (date: string) => void;
  title?: string;
  isVisible: boolean;
  style?: React.CSSProperties | Record<string, unknown>;
  children?: React.ReactNode;
  selected?: string;
  disableNextDay?: boolean;
  currentDate: string;
  selecteds?: string[];
  positiveButtonText?: string;
  isMultiple?: boolean;
  availableDates?: string[];
  onPressPositiveMultiple?: (dates: string[]) => void;
  disabledPositive?: boolean;
  disabledNegative?: boolean;
  resetCallback?: string;
}

const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function parseYearMonth(s: string): { year: number; month: number } {
  const d = new Date(s + "-01");
  return { year: d.getFullYear(), month: d.getMonth() };
}

function fmtYM(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

export const MonthCalendarModal: React.FC<IMonthCalendarModalProps> = ({
  onClose,
  onPressPositive,
  title,
  isVisible,
  style,
  children,
  selected,
  currentDate,
  selecteds,
  positiveButtonText = "Apply",
  isMultiple = false,
  availableDates,
  onPressPositiveMultiple,
  disabledPositive = false,
  disabledNegative = false,
}) => {
  const themed = useThemedColors();
  const init = parseYearMonth(selected ?? currentDate);
  const [viewYear, setViewYear] = React.useState(init.year);
  const [pickedMonths, setPickedMonths] = React.useState<string[]>(
    selecteds ?? (selected ? [selected] : [])
  );

  React.useEffect(() => {
    const i = parseYearMonth(selected ?? currentDate);
    setViewYear(i.year);
    setPickedMonths(selecteds ?? (selected ? [selected] : []));
  }, [selected, currentDate, selecteds, isVisible]);

  if (!isVisible) return null;

  const toggleMonth = (ym: string) => {
    if (!isMultiple) {
      setPickedMonths([ym]);
      return;
    }
    setPickedMonths((prev) =>
      prev.includes(ym) ? prev.filter((m) => m !== ym) : [...prev, ym]
    );
  };

  const isAvailable = (ym: string) =>
    !availableDates || availableDates.includes(ym);

  const handleConfirm = () => {
    if (isMultiple) {
      onPressPositiveMultiple?.(pickedMonths);
    } else {
      onPressPositive?.(pickedMonths[0] ?? "");
    }
  };

  const monthGrid = MONTHS_SHORT.map((label, idx) => {
    const ym = fmtYM(viewYear, idx);
    const isPicked = pickedMonths.includes(ym);
    const isDisabled = !isAvailable(ym);
    return { label, ym, isPicked, isDisabled };
  });

  if (isWeb) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Month calendar"}
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
          onClick={disabledNegative ? undefined : onClose}
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
            ...flattenStyle(style),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {title && (
              <h3 style={{ margin: 0, fontSize: spacing[18].value, fontWeight: "600", color: themed.textPrimary }}>
                {title}
              </h3>
            )}
            {!disabledNegative && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close month calendar modal"
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
            )}
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
            {monthGrid.map(({ label, ym, isPicked, isDisabled }) => (
              <button
                key={ym}
                type="button"
                onClick={() => !isDisabled && toggleMonth(ym)}
                disabled={isDisabled}
                aria-label={ym}
                aria-pressed={isPicked}
                style={{
                  padding: `${spacing[8].value}px`,
                  backgroundColor: isPicked ? themed.surfaceDark : themed.bgSecondary,
                  border: `1px solid ${isPicked ? themed.surfaceDark : themed.borderDefault}`,
                  borderRadius: radius.md.value,
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  color: isPicked ? themed.textInverse : isDisabled ? themed.textDisabled : themed.textPrimary,
                  fontSize: spacing[14].value,
                  fontWeight: isPicked ? "600" : "400",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {children}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={disabledPositive || pickedMonths.length === 0}
            aria-label={positiveButtonText}
            aria-disabled={disabledPositive || pickedMonths.length === 0}
            style={{
              padding: `${spacing[12].value}px ${spacing[16].value}px`,
              backgroundColor: disabledPositive || pickedMonths.length === 0 ? themed.bgDisabled : themed.surfaceDark,
              border: "none",
              borderRadius: radius.full.value,
              cursor: disabledPositive || pickedMonths.length === 0 ? "not-allowed" : "pointer",
              color: disabledPositive || pickedMonths.length === 0 ? themed.textDisabled : themed.textInverse,
              fontSize: spacing[14].value,
              fontWeight: "600",
            }}
          >
            {positiveButtonText}
          </button>
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
      onRequestClose={disabledNegative ? undefined : onClose}
      accessibilityLabel={title ?? "Month calendar"}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: themed.bgPrimary,
            borderRadius: radius.xl.value,
            padding: spacing[24].value,
            width: "90%",
            ...flattenStyle(style),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing[16].value }}>
            {title && (
              <Text style={{ fontSize: spacing[18].value, fontWeight: "600", color: themed.textPrimary, flex: 1 }} allowFontScaling={false}>
                {title}
              </Text>
            )}
            {!disabledNegative && (
              <TouchableOpacity onPress={onClose} accessibilityLabel="Close month calendar modal" style={{ padding: spacing[4].value }}>
                <View />
              </TouchableOpacity>
            )}
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
              {monthGrid.slice(row * 4, row * 4 + 4).map(({ label, ym, isPicked, isDisabled }) => (
                <TouchableOpacity
                  key={ym}
                  onPress={() => !isDisabled && toggleMonth(ym)}
                  disabled={isDisabled}
                  accessibilityLabel={ym}
                  style={{
                    flex: 1,
                    padding: spacing[8].value,
                    backgroundColor: isPicked ? themed.surfaceDark : themed.bgSecondary,
                    borderWidth: 1,
                    borderColor: isPicked ? themed.surfaceDark : themed.borderDefault,
                    borderRadius: radius.md.value,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: isPicked ? themed.textInverse : isDisabled ? themed.textDisabled : themed.textPrimary,
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
          {children}
          <TouchableOpacity
            onPress={handleConfirm}
            disabled={disabledPositive || pickedMonths.length === 0}
            accessibilityLabel={positiveButtonText}
            accessibilityState={{ disabled: disabledPositive || pickedMonths.length === 0 }}
            style={{
              marginTop: spacing[8].value,
              padding: spacing[12].value,
              backgroundColor: disabledPositive || pickedMonths.length === 0 ? themed.bgDisabled : themed.surfaceDark,
              borderRadius: radius.full.value,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: disabledPositive || pickedMonths.length === 0 ? themed.textDisabled : themed.textInverse,
                fontSize: spacing[14].value,
                fontWeight: "600",
              }}
              allowFontScaling={false}
            >
              {positiveButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

MonthCalendarModal.displayName = "MonthCalendarModal";
export default MonthCalendarModal;
