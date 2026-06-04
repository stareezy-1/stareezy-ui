/**
 * Clipboard — copy-to-clipboard with visual feedback.
 * Root wrapper accepts BoxProps. Value text rendered via <Text>.
 */

import React, { useState } from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";
import { clipboardGeometry } from "./Clipboard.style";

export interface ClipboardProps extends Omit<BoxProps, "children"> {
  value: string;
  displayValue?: string;
  showValue?: boolean;
  children?: React.ReactNode;
  onCopy?: (value: string) => void;
  successDuration?: number;
  valueTextType?: ETextType;
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
  const themed = useThemedColors();

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
          background: themed.bgSecondary,
          border: `1px solid ${themed.borderDefault}`,
          borderRadius: clipboardGeometry.containerBorderRadius,
          padding: `${clipboardGeometry.containerPaddingV}px ${clipboardGeometry.containerPaddingH}px`,
          maxWidth: "100%",
        }}
        data-testid={testID}
        {...boxProps}
      >
        {showValue && (
          <Text
            type={valueTextType}
            text={display}
            color={themed.textPrimary}
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
              width: clipboardGeometry.buttonSize,
              height: clipboardGeometry.buttonSize,
              borderRadius: clipboardGeometry.buttonBorderRadius,
              border: "none",
              background: copied ? themed.bgSelected : "transparent",
              cursor: "pointer",
              color: copied ? themed.colorSuccess : themed.textSecondary,
              transition: "background 0.15s ease,color 0.15s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (!copied)
                (e.currentTarget as HTMLButtonElement).style.background =
                  themed.bgHover;
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
      bg={themed.bgSecondary}
      borderWidth={1}
      borderColor={themed.borderDefault}
      rounded={8}
      p={8}
      testID={testID}
      {...boxProps}
    >
      {showValue && (
        <Text
          type={valueTextType}
          text={display}
          color={themed.textPrimary}
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
          color={copied ? themed.colorSuccess : themed.textSecondary}
        />
      </TouchableOpacity>
    </Box>
  );
};

Clipboard.displayName = "Clipboard";
export default Clipboard;
