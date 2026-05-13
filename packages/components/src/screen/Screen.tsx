/**
 * Screen — a full-screen container component.
 *
 * Supports three presets:
 * - `fixed`: non-scrollable, fills the screen
 * - `scroll`: scrollable content area
 * - `auto`: scrollable only when content overflows
 *
 * On web, renders a <div> with appropriate overflow settings.
 * On RN, renders a View or ScrollView with SafeAreaView support.
 *
 * Requirements: 12.1, 12.2, 12.3
 */

import React from "react";
import { colors } from "@stareezy-ui/tokens";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

import { flattenStyle } from "../shared/flattenStyle";
import { isWeb } from "../shared/platform";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ScreenPresets = "fixed" | "scroll" | "auto";
export type KeyboardOffsets = "none" | "small" | "medium" | "large";

// ---------------------------------------------------------------------------
// IScreenProps
// ---------------------------------------------------------------------------

export interface IScreenProps {
  children?: React.ReactNode;
  style?: React.CSSProperties | Record<string, unknown>;
  preset?: ScreenPresets;
  backgroundColor?: string;
  backgroundStyle?: React.CSSProperties | Record<string, unknown>;
  statusBar?: "light-content" | "dark-content";
  statusBarBackgroundColor?: string;
  unsafe?: boolean;
  keyboardOffset?: KeyboardOffsets;
  keyboardShouldPersistTaps?: "handled" | "always" | "never";
  showsScrollIndicator?: boolean;
  isTranslucent?: boolean;
  refreshControl?: React.ReactElement;
  onScroll?: (e: unknown) => void;
}

// ---------------------------------------------------------------------------
// Keyboard offset values (RN only)
// ---------------------------------------------------------------------------

const KEYBOARD_OFFSET_VALUES: Record<KeyboardOffsets, number> = {
  none: 0,
  small: 40,
  medium: 80,
  large: 120,
};

// ---------------------------------------------------------------------------
// Screen component
// ---------------------------------------------------------------------------

export const Screen: React.FC<IScreenProps> = ({
  children,
  style,
  preset = "fixed",
  backgroundColor,
  backgroundStyle,
  statusBar,
  statusBarBackgroundColor,
  unsafe = false,
  keyboardOffset = "none",
  keyboardShouldPersistTaps = "handled",
  showsScrollIndicator = true,
  isTranslucent = false,
  refreshControl,
  onScroll,
}) => {
  const bgColor = backgroundColor ?? colors.neutral[10].value;

  if (isWeb) {
    // On web, statusBar, keyboardOffset, and safe area are not applicable
    const isScrollable = preset === "scroll" || preset === "auto";

    const outerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minHeight: "100%",
      backgroundColor: bgColor,
      ...(backgroundStyle as React.CSSProperties | undefined),
    };

    const innerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      overflow: isScrollable ? "auto" : "hidden",
      ...flattenStyle(style),
    };

    return (
      <div style={outerStyle}>
        <div
          style={innerStyle}
          onScroll={
            onScroll as React.UIEventHandler<HTMLDivElement> | undefined
          }
        >
          {children}
        </div>
      </div>
    );
  }

  // React Native
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const RN = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
    ScrollView: React.ComponentType<Record<string, unknown>>;
    KeyboardAvoidingView: React.ComponentType<Record<string, unknown>>;
    StatusBar: React.ComponentType<Record<string, unknown>>;
    Platform: { OS: string };
  };

  const { View, ScrollView, KeyboardAvoidingView, StatusBar, Platform } = RN;

  // Try to use SafeAreaView if available
  let SafeAreaWrapper: React.ComponentType<Record<string, unknown>> = View;
  if (!unsafe) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const safeArea = require("react-native-safe-area-context") as {
        SafeAreaView: React.ComponentType<Record<string, unknown>>;
      };
      SafeAreaWrapper = safeArea.SafeAreaView;
    } catch {
      // Fall back to View if safe area context is not available
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { SafeAreaView } = require("react-native") as {
          SafeAreaView: React.ComponentType<Record<string, unknown>>;
        };
        SafeAreaWrapper = SafeAreaView;
      } catch {
        SafeAreaWrapper = View;
      }
    }
  }

  const outerRnStyle: Record<string, unknown> = {
    flex: 1,
    backgroundColor: bgColor,
    ...(backgroundStyle as Record<string, unknown> | undefined),
  };

  const innerRnStyle: Record<string, unknown> = {
    flex: 1,
    ...flattenStyle(style),
  };

  const keyboardOffsetValue = KEYBOARD_OFFSET_VALUES[keyboardOffset];

  const renderContent = () => {
    if (preset === "scroll") {
      return (
        <ScrollView
          style={innerRnStyle}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          showsVerticalScrollIndicator={showsScrollIndicator}
          refreshControl={refreshControl}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {children}
        </ScrollView>
      );
    }

    if (preset === "auto") {
      return (
        <ScrollView
          style={innerRnStyle}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          showsVerticalScrollIndicator={showsScrollIndicator}
          refreshControl={refreshControl}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {children}
        </ScrollView>
      );
    }

    // fixed
    return <View style={innerRnStyle}>{children}</View>;
  };

  const screenContent = (
    <SafeAreaWrapper style={outerRnStyle}>
      {statusBar ? (
        <StatusBar
          barStyle={statusBar}
          backgroundColor={statusBarBackgroundColor ?? bgColor}
          translucent={isTranslucent}
        />
      ) : null}
      {renderContent()}
    </SafeAreaWrapper>
  );

  if (keyboardOffsetValue > 0) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardOffsetValue}
      >
        {screenContent}
      </KeyboardAvoidingView>
    );
  }

  return screenContent;
};

Screen.displayName = "Screen";

export default Screen;
