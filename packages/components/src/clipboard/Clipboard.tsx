/**
 * Clipboard — copy-to-clipboard with visual feedback.
 * Root wrapper accepts BoxProps. Value text rendered via <Text>.
 */

import React, { useState } from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";

export interface ClipboardProps extends Omit<BoxProps, "children"> {
  value: string;
  displayValue?: string;
  showValue?: boolean;
  children?: React.ReactNode;
  onCopy?: (value: string) => void;
  successDuration?: number;
  /** ETextType for the displayed value text */
  valueTextType?: ETextType;
  /** Style override for the displayed value text */
  valueTextStyle?: StyleProp;
}

export const Clipboard: React.FC<ClipboardProps> = ({
  value,
  displayValue,
  showValue = true,
  children,
  onCopy,
  successDuration = 2000,
  valueTextType = ETextType.XSParagraphRegular,
  valueTextStyle,
  testID,
  ...boxProps
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (isWeb && navigator?.clipboard) {
        await navigator.clipboard.writeText(value);
      } else if (isWeb) {
        const el = document.createElement("textarea");
        el.value = value;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      onCopy?.(value);
      setTimeout(() => setCopied(false), successDuration);
    } catch {
      // silently fail
    }
  };

  const display = displayValue ?? value;

  if (isWeb) {
    return (
      <Box
        display="inline-flex"
        flexDirection="row"
        alignItems="center"
        gap={8}
        style={{
          background: colors.beauBlue[50].value,
          border: `1px solid ${colors.beauBlue[200].value}`,
          borderRadius: 8,
          padding: "6px 10px",
          maxWidth: "100%",
        }}
        data-testid={testID}
        {...boxProps}
      >
        {showValue && (
          <Text
            type={valueTextType}
            text={display}
            color={colors.raisinBlack[800].value}
            style={{
              fontFamily: "'Fira Code',monospace,Inter,system-ui,sans-serif",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
              minWidth: 0,
              ...(valueTextStyle as React.CSSProperties),
            }}
          />
        )}
        {children ? (
          <span
            onClick={handleCopy}
            style={{ cursor: "pointer", flexShrink: 0 }}
          >
            {children}
          </span>
        ) : (
          <button
            type="button"
            aria-label={copied ? "Copied!" : "Copy to clipboard"}
            onClick={handleCopy}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "none",
              background: copied ? colors.lawnGreen[50].value : "transparent",
              cursor: "pointer",
              color: copied
                ? colors.lawnGreen[600].value
                : colors.beauBlue[700].value,
              transition: "background 0.15s ease,color 0.15s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (!copied)
                (e.currentTarget as HTMLButtonElement).style.background =
                  colors.beauBlue[100].value;
            }}
            onMouseLeave={(e) => {
              if (!copied)
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
            }}
          >
            {copied ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7L5.5 10.5L12 3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="4"
                  y="4"
                  width="8"
                  height="8"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 10V2h8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        )}
      </Box>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { TouchableOpacity, Clipboard: RNClipboard } =
    require("react-native") as {
      TouchableOpacity: React.ComponentType<Record<string, unknown>>;
      Clipboard: { setString: (s: string) => void };
    };

  const handleNativeCopy = () => {
    RNClipboard.setString(value);
    setCopied(true);
    onCopy?.(value);
    setTimeout(() => setCopied(false), successDuration);
  };

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      gap={8}
      bg={colors.beauBlue[50].value}
      borderWidth={1}
      borderColor={colors.beauBlue[200].value}
      rounded={8}
      p={8}
      testID={testID}
      {...boxProps}
    >
      {showValue && (
        <Text
          type={valueTextType}
          text={display}
          color={colors.raisinBlack[800].value}
          style={{ flex: 1, ...(valueTextStyle as Record<string, unknown>) }}
          numberOfLines={1}
        />
      )}
      <TouchableOpacity
        onPress={handleNativeCopy}
        accessibilityLabel={copied ? "Copied!" : "Copy to clipboard"}
        style={{ padding: 4 }}
      >
        <Text
          type={ETextType.XSLabel}
          text={copied ? "✓" : "Copy"}
          color={
            copied ? colors.lawnGreen[600].value : colors.beauBlue[700].value
          }
        />
      </TouchableOpacity>
    </Box>
  );
};

Clipboard.displayName = "Clipboard";
export default Clipboard;
