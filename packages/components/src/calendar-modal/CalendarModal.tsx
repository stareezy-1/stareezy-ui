/**
 * CalendarModal — modal wrapping the Calendar component for date selection.
 *
 * Exact port of ICalendarModalProps from rekosistem-components.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";
import { Calendar } from "../calendar/Calendar";
import { flattenStyle } from '../shared/flattenStyle';

export interface ICalendarModalProps {
  onClose: () => void;
  onPressPositive: (date: string) => void;
  title?: string;
  isVisible: boolean;
  style?: React.CSSProperties | Record<string, unknown>;
  children?: React.ReactNode;
  selected?: string;
  isDateRange?: boolean;
  disableNextDay?: boolean;
  currentDate: string;
  positiveButtonText?: string;
  minDate?: string;
}

export const CalendarModal: React.FC<ICalendarModalProps> = ({
  onClose,
  onPressPositive,
  title,
  isVisible,
  style,
  children,
  selected,
  currentDate,
  positiveButtonText = "Apply",
  minDate,
}) => {
  const themed = useThemedColors();
  const [pickedDate, setPickedDate] = React.useState<string>(selected ?? currentDate);

  React.useEffect(() => {
    setPickedDate(selected ?? currentDate);
  }, [selected, currentDate, isVisible]);

  if (!isVisible) return null;

  const handleConfirm = () => {
    onPressPositive(pickedDate);
  };

  if (isWeb) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Calendar"}
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
            ...flattenStyle(style),
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
              aria-label="Close calendar modal"
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
          <Calendar
            current={currentDate}
            selected={pickedDate}
            {...(minDate !== undefined ? { minimumDate: minDate } : {})}
            onSelectedChange={setPickedDate}
            onDateChange={setPickedDate}
          />
          {children}
          <button
            type="button"
            onClick={handleConfirm}
            aria-label={positiveButtonText}
            style={{
              padding: `${spacing[12].value}px ${spacing[16].value}px`,
              backgroundColor: themed.surfaceDark,
              border: "none",
              borderRadius: radius.full.value,
              cursor: "pointer",
              color: themed.textInverse,
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
      onRequestClose={onClose}
      accessibilityLabel={title ?? "Calendar"}
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
            <TouchableOpacity onPress={onClose} accessibilityLabel="Close calendar modal" style={{ padding: spacing[4].value }}>
              <View />
            </TouchableOpacity>
          </View>
          <Calendar
            current={currentDate}
            selected={pickedDate}
            {...(minDate !== undefined ? { minimumDate: minDate } : {})}
            onSelectedChange={setPickedDate}
            onDateChange={setPickedDate}
          />
          {children}
          <TouchableOpacity
            onPress={handleConfirm}
            accessibilityLabel={positiveButtonText}
            style={{ marginTop: spacing[16].value, padding: spacing[12].value, backgroundColor: themed.surfaceDark, borderRadius: radius.full.value, alignItems: "center" }}
          >
            <Text style={{ color: themed.textInverse, fontSize: spacing[14].value, fontWeight: "600" }} allowFontScaling={false}>
              {positiveButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

CalendarModal.displayName = "CalendarModal";
export default CalendarModal;
