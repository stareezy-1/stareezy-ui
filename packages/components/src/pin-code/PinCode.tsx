/**
 * PinCode — renders N individual pin digit inputs.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 17.1, 17.3
 */

import React, { useRef, useState } from "react";
import { colors, spacing, radius } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export enum EPinCodeSize {
  Sm = "Sm",
  Md = "Md",
}

export interface IPinCodeProps {
  length: number;
  onCodeChanged: (code: string) => void;
  errorMessage?: string;
  isAutoFocus?: boolean;
  size?: EPinCodeSize;
}

export const PinCode: React.FC<IPinCodeProps> = ({
  length,
  onCodeChanged,
  errorMessage,
  isAutoFocus,
  size = EPinCodeSize.Md,
}) => {
  const themed = useThemedColors();
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hasError = !!errorMessage;

  const isSmall = size === EPinCodeSize.Sm;
  const boxSize = isSmall ? spacing[42].value : spacing[48].value;
  const fontSize = isSmall ? spacing[16].value : spacing[20].value;

  const handleChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    onCodeChanged(newDigits.join(""));
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (isWeb) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: spacing[8].value, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: spacing[8].value }}>
          {Array.from({ length }).map((_, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digits[i]}
              autoFocus={isAutoFocus && i === 0}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`PIN digit ${i + 1}`}
              aria-invalid={hasError}
              style={{
                width: boxSize,
                height: boxSize,
                textAlign: "center",
                fontSize,
                fontWeight: "600",
                borderWidth: 2,
                borderStyle: "solid",
                borderColor: hasError ? themed.borderDanger : digits[i] ? themed.borderPrimaryBrand : themed.borderDefault,
                borderRadius: radius.md.value,
                backgroundColor: themed.surface,
                color: themed.textPrimary,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          ))}
        </div>
        {hasError && (
          <span style={{ fontSize: spacing[12].value, color: colors.danger.main.value, textAlign: "center" }}>
            {errorMessage}
          </span>
        )}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { TextInput, Text: RNText } = require("react-native") as {

    TextInput: React.ComponentType<Record<string, unknown>>; Text: React.ComponentType<Record<string, unknown>>;

  };

  const rnRefs: React.RefObject<unknown>[] = Array.from({ length }, () => React.createRef());

  return (
    <View style={{ alignItems: "center", gap: spacing[8].value }}>
      <View style={{ flexDirection: "row", gap: spacing[8].value }}>
        {Array.from({ length }).map((_, i) => (
          <TextInput
            key={i}
            ref={rnRefs[i]}
            value={digits[i]}
            maxLength={1}
            keyboardType="numeric"
            autoFocus={isAutoFocus && i === 0}
            onChangeText={(text: string) => {
              const digit = text.replace(/\D/g, "").slice(-1);
              const newDigits = [...digits];
              newDigits[i] = digit;
              setDigits(newDigits);
              onCodeChanged(newDigits.join(""));
            }}
            accessibilityLabel={`PIN digit ${i + 1}`}
            aria-invalid={hasError}
            allowFontScaling={false}
            style={{
              width: boxSize,
              height: boxSize,
              textAlign: "center",
              fontSize,
              fontWeight: "600",
              borderWidth: 2,
              borderColor: hasError ? themed.borderDanger : digits[i] ? themed.borderPrimaryBrand : themed.borderDefault,
              borderRadius: radius.md.value,
              backgroundColor: themed.surface,
              color: themed.textPrimary,
            }}
          />
        ))}
      </View>
      {hasError && (
        <RNText style={{ fontSize: spacing[12].value, color: colors.danger.main.value, textAlign: "center" }} allowFontScaling={false}>
          {errorMessage}
        </RNText>
      )}
    </View>
  );
};

PinCode.displayName = "PinCode";
export default PinCode;
