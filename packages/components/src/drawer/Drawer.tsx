/**
 * Drawer — cross-platform edge-anchored panel component.
 *
 * Web: overlay + side panel with CSS transition, focus trapped inside.
 * Native: Modal-style overlay.
 *
 * All visual styles live in Drawer.style.ts — no inline color literals here.
 * Colors are resolved at render time via useThemedColors().
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */

import React from "react";
import { useThemedColors } from "../shared/useThemedColors";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import type { DrawerAnchor } from "./Drawer.types";
import { injectFocusStyles } from "../shared/injectFocusStyles";
import type { SzrFC } from "../shared/types";
import {
  webOverlay,
  webPanelBase,
  webPanelGeometry,
  webPanelClosedTransform,
  webPanelOpenTransform,
  webHeader,
  webHeaderTitle,
  webCloseButton,
  webBody,
  nativeOverlay,
  nativePanelBase,
  nativePanelGeometry,
  nativeHeader,
  nativeBody,
} from "./Drawer.style";

export type { DrawerAnchor } from "./Drawer.types";

// ---------------------------------------------------------------------------
// Focus trap helpers (web)
// ---------------------------------------------------------------------------

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function useFocusTrap(
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
) {
  React.useEffect(() => {
    if (!active || !ref.current) return;

    const panel = ref.current;
    const previousFocus = document.activeElement as HTMLElement | null;

    // Move focus into the panel
    const firstFocusable = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.closest("[hidden]"));
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [active, ref]);
}

// ---------------------------------------------------------------------------
// DrawerProps
// ---------------------------------------------------------------------------

export interface DrawerProps extends BoxLayoutProps {
  /** Whether the drawer is open. */
  open: boolean;
  /** Callback to close the drawer. */
  onClose: () => void;
  /** Side from which the drawer appears. Default: "right". */
  anchor?: DrawerAnchor;
  /** Drawer content. */
  children: React.ReactNode;
  /** Optional title shown in the header bar. */
  title?: string;
  testID?: string;
}

// ---------------------------------------------------------------------------
// Drawer
// ---------------------------------------------------------------------------

export const Drawer: SzrFC<DrawerProps> = (props) => {
  const { layout, sxProps, rest } = extractBoxLayoutProps(props);
  const hasLayoutProps =
    Object.keys(layout).length > 0 || Object.keys(sxProps).length > 0;

  const {
    open,
    onClose,
    anchor = "right",
    children,
    title,
    testID,
  } = rest as DrawerProps;

  const themed = useThemedColors();

  // Close on Escape key (web)
  React.useEffect(() => {
    if (!isWeb || !open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent body scroll while open (web)
  React.useEffect(() => {
    if (!isWeb) return;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus trap ref
  const panelRef = React.useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef as React.RefObject<HTMLElement | null>, isWeb && open);

  if (isWeb) {
    if (!open) {
      // Render nothing when closed — avoids hidden-but-accessible panel in DOM
      // For animated version: keep in DOM with transform. For simplicity: unmount.
      return null;
    }

    injectFocusStyles();

    const panelStyle: React.CSSProperties = {
      ...webPanelBase,
      ...webPanelGeometry[anchor],
      ...(open ? webPanelOpenTransform : webPanelClosedTransform[anchor]),
      backgroundColor: themed.bgPrimary,
      borderColor: themed.borderDefault,
    };

    const backdropStyle: React.CSSProperties = {
      ...webOverlay,
      backgroundColor: "rgba(0,0,0,0.45)",
    };

    const drawerElement = (
      <>
        {/* Backdrop */}
        <div
          style={backdropStyle}
          onClick={onClose}
          aria-hidden="true"
          data-testid={testID ? `${testID}-backdrop` : undefined}
        />
        {/* Panel */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={title ?? "Drawer"}
          style={panelStyle}
          data-testid={testID}
        >
          {/* Header */}
          <div
            style={{
              ...webHeader,
              borderBottomColor: themed.borderDefault,
            }}
          >
            {title && (
              <p
                style={{
                  ...webHeaderTitle,
                  color: themed.textPrimary,
                  margin: 0,
                }}
              >
                {title}
              </p>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              data-szr-close=""
              style={{
                ...webCloseButton,
                color: themed.textSecondary,
                marginLeft: title ? "auto" : 0,
              }}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div style={webBody}>{children}</div>
        </div>
      </>
    );

    if (hasLayoutProps) {
      return (
        <Box {...layout} {...sxProps}>
          {drawerElement}
        </Box>
      );
    }
    return drawerElement;
  }

  // ── React Native ──────────────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Modal, View, TouchableOpacity, Text, ScrollView } =
    require("react-native") as {
      Modal: React.ComponentType<Record<string, unknown>>;
      View: React.ComponentType<Record<string, unknown>>;
      TouchableOpacity: React.ComponentType<Record<string, unknown>>;
      Text: React.ComponentType<Record<string, unknown>>;
      ScrollView: React.ComponentType<Record<string, unknown>>;
    };

  const nativeElement = (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      accessibilityViewIsModal
      testID={testID}
    >
      <View
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        {/* Backdrop */}
        <TouchableOpacity
          style={{
            ...nativeOverlay,
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
          onPress={onClose}
          activeOpacity={1}
          accessibilityLabel="Close drawer"
        />
        {/* Panel */}
        <View
          style={{
            ...nativePanelBase,
            ...nativePanelGeometry[anchor],
            backgroundColor: themed.bgPrimary,
            borderColor: themed.borderDefault,
          }}
          accessibilityRole="none"
          accessibilityViewIsModal={true}
        >
          {/* Header */}
          <View
            style={{
              ...nativeHeader,
              borderBottomColor: themed.borderDefault,
            }}
          >
            {title && (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: themed.textPrimary,
                  flex: 1,
                }}
              >
                {title}
              </Text>
            )}
            <TouchableOpacity
              onPress={onClose}
              accessibilityLabel="Close drawer"
              accessibilityRole="button"
              style={{
                width: 32,
                height: 32,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 18, color: themed.textSecondary }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <ScrollView style={nativeBody}>{children}</ScrollView>
        </View>
      </View>
    </Modal>
  );

  if (hasLayoutProps) {
    return (
      <Box {...layout} {...sxProps}>
        {nativeElement}
      </Box>
    );
  }
  return nativeElement;
};

Drawer.displayName = "Drawer";
export default Drawer;
