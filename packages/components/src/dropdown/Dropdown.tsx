/**
 * Dropdown — select with search, groups, multi-select, async/paginated support.
 *
 * New in v2:
 *  - searchValue / onSearchChange  — controlled search for API-driven filtering
 *  - onEndReached / onEndReachedThreshold — pagination (load more on scroll end)
 *  - loading — show spinner at list bottom while fetching
 *  - dropdownStyle — style override for the floating panel
 *  - listStyle — style override for the scrollable list wrapper
 *  - contentContainerStyle — style for the inner content (FlatList contentContainerStyle)
 *  - renderEmpty — custom empty state node
 *  - renderFooter — custom footer node (rendered below list items)
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps } from "../primitives/Box";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DropdownOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  group?: string;
  icon?: React.ReactNode;
}

export type DropdownSize = "sm" | "md" | "lg";

export interface DropdownProps extends Omit<BoxProps, "onChange" | "children"> {
  options: DropdownOption[];

  // ── Value ─────────────────────────────────────────────────────────────────
  value?: string | string[];
  defaultValue?: string;
  onChange?: (value: string | string[]) => void;

  // ── Search ────────────────────────────────────────────────────────────────
  /** Controlled search text — when provided, internal search state is ignored.
   *  Use this to drive API calls from the parent. */
  searchValue?: string;
  /** Called on every keystroke in the search input.
   *  When provided alongside searchValue, the parent owns the search state. */
  onSearchChange?: (text: string) => void;
  /** Show the search input. Defaults to false. */
  searchable?: boolean;
  /** Placeholder text inside the search input. */
  searchPlaceholder?: string;

  // ── Pagination ────────────────────────────────────────────────────────────
  /** Called when the user scrolls near the end of the list.
   *  Use this to fetch the next page of results. */
  onEndReached?: () => void;
  /** How far from the end (0–1) to trigger onEndReached. Default: 0.2 */
  onEndReachedThreshold?: number;
  /** Show a loading spinner at the bottom of the list (e.g. while fetching). */
  loading?: boolean;

  // ── Appearance ────────────────────────────────────────────────────────────
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  size?: DropdownSize;
  label?: string;
  errorMessage?: string;
  isRequired?: boolean;

  // ── Style overrides ───────────────────────────────────────────────────────
  /** Style for the floating dropdown panel. */
  dropdownStyle?: React.CSSProperties;
  /** Style for the scrollable list wrapper (web: the overflow:auto div; native: FlatList style). */
  listStyle?: React.CSSProperties;
  /** Style for the inner content container (web: inner div; native: FlatList contentContainerStyle). */
  contentContainerStyle?: React.CSSProperties;

  // ── Slots ─────────────────────────────────────────────────────────────────
  /** Custom empty state — replaces the default "No options found" message. */
  renderEmpty?: React.ReactNode;
  /** Custom footer rendered below the list items (e.g. "Load more" button). */
  renderFooter?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SIZE_H: Record<DropdownSize, number> = { sm: 34, md: 42, lg: 50 };
const FONT: Record<DropdownSize, number> = { sm: 13, md: 14, lg: 15 };

const DROPDOWN_KF = `
@keyframes szr-dropdown-in {
  from { opacity: 0; transform: translateY(-6px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
}
@keyframes szr-spin { to { transform: rotate(360deg); } }
`;

let dropdownKfInjected = false;
function injectDropdownKf() {
  if (dropdownKfInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = DROPDOWN_KF;
  document.head.appendChild(el);
  dropdownKfInjected = true;
}

// ---------------------------------------------------------------------------
// Spinner shim (web only, used inside the list footer)
// ---------------------------------------------------------------------------

function ListSpinner() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "10px 0" }}
    >
      <span
        aria-label="Loading more"
        style={{
          display: "inline-block",
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: `2px solid ${colors.beauBlue[200].value}`,
          borderTopColor: colors.celurenBlue[400].value,
          animation: "szr-spin 0.65s linear infinite",
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dropdown component
// ---------------------------------------------------------------------------

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  // search
  searchValue: controlledSearch,
  onSearchChange,
  searchable = false,
  searchPlaceholder = "Search...",
  // pagination
  onEndReached,
  onEndReachedThreshold = 0.2,
  loading = false,
  // appearance
  placeholder = "Select an option",
  multiple = false,
  disabled = false,
  size = "md",
  label,
  errorMessage,
  isRequired,
  // style overrides
  dropdownStyle,
  listStyle,
  contentContainerStyle,
  // slots
  renderEmpty,
  renderFooter,
  // box
  testID,
  accessibilityLabel,
  ...boxProps
}) => {
  const [open, setOpen] = useState(false);
  // Internal search state — used when parent does NOT control searchValue
  const [internalSearch, setInternalSearch] = useState("");
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue ?? (multiple ? [] : ""),
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Resolve controlled vs uncontrolled
  const current = value ?? internalValue;
  const search =
    controlledSearch !== undefined ? controlledSearch : internalSearch;

  const height = SIZE_H[size] ?? 42;
  const fontSize = FONT[size] ?? 14;
  const hasError = !!errorMessage;

  const selectedValues = Array.isArray(current)
    ? current
    : current
    ? [current]
    : [];
  const selectedLabels = selectedValues
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean);

  // Filter options — only when parent does NOT own search (no onSearchChange)
  // When parent owns search, they're responsible for filtering options themselves.
  const filteredOptions =
    searchable && search && !onSearchChange
      ? options.filter((o) => {
          const s = typeof o.label === "string" ? o.label : String(o.label);
          return s.toLowerCase().includes(search.toLowerCase());
        })
      : options;

  const groups = Array.from(new Set(filteredOptions.map((o) => o.group ?? "")));

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSelect = useCallback(
    (optValue: string) => {
      let next: string | string[];
      if (multiple) {
        const arr = Array.isArray(current) ? current : [];
        next = arr.includes(optValue)
          ? arr.filter((v) => v !== optValue)
          : [...arr, optValue];
      } else {
        next = optValue;
        setOpen(false);
      }
      setInternalValue(next);
      onChange?.(next);
      if (!multiple) {
        setInternalSearch("");
        onSearchChange?.("");
      }
    },
    [current, multiple, onChange, onSearchChange],
  );

  const handleSearchChange = useCallback(
    (text: string) => {
      // Always update internal state so the input stays responsive
      setInternalSearch(text);
      // Notify parent — they can use this to fire an API call
      onSearchChange?.(text);
    },
    [onSearchChange],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    setInternalSearch("");
    onSearchChange?.("");
  }, [onSearchChange]);

  // ── Close on outside click ─────────────────────────────────────────────────

  useEffect(() => {
    if (!isWeb) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [handleClose]);

  // ── Auto-focus search ──────────────────────────────────────────────────────

  useEffect(() => {
    if (open && searchable && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open, searchable]);

  // ── Scroll-based onEndReached (web) ────────────────────────────────────────

  useEffect(() => {
    if (!isWeb || !onEndReached) return;
    const el = listRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      const threshold = scrollHeight * onEndReachedThreshold;
      if (distanceFromBottom <= threshold) {
        onEndReached();
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [open, onEndReached, onEndReachedThreshold]);

  // ── Web render ─────────────────────────────────────────────────────────────

  if (isWeb) {
    injectDropdownKf();

    const borderColor = hasError
      ? colors.crimsonRed[500].value
      : open
      ? colors.celurenBlue[400].value
      : colors.beauBlue[300].value;

    const focusRing =
      open && !hasError
        ? `0 0 0 3px ${colors.celurenBlue[25].value}`
        : hasError
        ? `0 0 0 3px ${colors.crimsonRed[50].value}`
        : "none";

    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={5}
        style={{ fontFamily: "Inter,system-ui,sans-serif" }}
        {...(testID !== undefined ? { "data-testid": testID } : {})}
        {...boxProps}
      >
        {/* Label */}
        {label && (
          <label
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: colors.raisinBlack[800].value,
              letterSpacing: "0.01em",
            }}
          >
            {label}
            {isRequired && (
              <span
                style={{ color: colors.crimsonRed[500].value, marginLeft: 3 }}
              >
                *
              </span>
            )}
          </label>
        )}

        {/* Trigger + panel */}
        <div ref={containerRef} style={{ position: "relative" }}>
          {/* Trigger button */}
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            {...(accessibilityLabel ?? label
              ? { "aria-label": accessibilityLabel ?? label }
              : {})}
            aria-invalid={hasError}
            disabled={disabled}
            onClick={() => !disabled && setOpen((v) => !v)}
            style={{
              width: "100%",
              height,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: `0 ${size === "sm" ? 10 : 14}px`,
              border: `1.5px solid ${borderColor}`,
              borderRadius: 8,
              backgroundColor: disabled ? colors.beauBlue[50].value : "#ffffff",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.65 : 1,
              fontSize,
              color: selectedLabels.length
                ? colors.raisinBlack[800].value
                : colors.beauBlue[600].value,
              transition: "border-color 0.18s ease, box-shadow 0.18s ease",
              boxShadow: focusRing,
              boxSizing: "border-box",
              gap: 8,
              textAlign: "left",
              fontFamily: "Inter,system-ui,sans-serif",
            }}
          >
            <span
              style={{
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {selectedLabels.length
                ? multiple
                  ? `${selectedLabels.length} selected`
                  : selectedLabels[0]
                : placeholder}
            </span>
            {/* Chevron */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              style={{
                flexShrink: 0,
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
                color: colors.beauBlue[600].value,
              }}
            >
              <path
                d="M3 5L7 9L11 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Floating panel */}
          {open && (
            <div
              role="listbox"
              aria-multiselectable={multiple}
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                right: 0,
                zIndex: 200,
                backgroundColor: "#ffffff",
                border: `1.5px solid ${colors.beauBlue[200].value}`,
                borderRadius: 10,
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
                overflow: "hidden",
                animation: "szr-dropdown-in 0.18s ease",
                maxHeight: 300,
                display: "flex",
                flexDirection: "column",
                ...dropdownStyle,
              }}
            >
              {/* Search input */}
              {searchable && (
                <div
                  style={{
                    padding: "8px 10px",
                    borderBottom: `1px solid ${colors.beauBlue[100].value}`,
                    flexShrink: 0,
                  }}
                >
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    style={{
                      width: "100%",
                      border: `1px solid ${colors.beauBlue[200].value}`,
                      borderRadius: 6,
                      padding: "6px 10px",
                      fontSize: 13,
                      outline: "none",
                      fontFamily: "Inter,system-ui,sans-serif",
                      color: colors.raisinBlack[800].value,
                      boxSizing: "border-box",
                      transition: "border-color 0.15s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        colors.celurenBlue[400].value;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        colors.beauBlue[200].value;
                    }}
                  />
                </div>
              )}

              {/* Scrollable list */}
              <div
                ref={listRef}
                style={{
                  overflowY: "auto",
                  flex: 1,
                  ...listStyle,
                }}
              >
                <div style={{ ...contentContainerStyle }}>
                  {/* Empty state */}
                  {filteredOptions.length === 0 &&
                    !loading &&
                    (renderEmpty ?? (
                      <div
                        style={{
                          padding: "14px",
                          fontSize: 13,
                          color: colors.beauBlue[600].value,
                          textAlign: "center",
                        }}
                      >
                        No options found
                      </div>
                    ))}

                  {/* Option groups */}
                  {groups.map((group) => {
                    const groupOpts = filteredOptions.filter(
                      (o) => (o.group ?? "") === group,
                    );
                    return (
                      <div key={group}>
                        {group && (
                          <div
                            style={{
                              padding: "8px 14px 4px",
                              fontSize: 11,
                              fontWeight: "700",
                              color: colors.beauBlue[600].value,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                            }}
                          >
                            {group}
                          </div>
                        )}
                        {groupOpts.map((opt) => {
                          const isSelected = selectedValues.includes(opt.value);
                          return (
                            <div
                              key={opt.value}
                              role="option"
                              aria-selected={isSelected}
                              aria-disabled={opt.disabled}
                              onClick={() =>
                                !opt.disabled && handleSelect(opt.value)
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "9px 14px",
                                cursor: opt.disabled
                                  ? "not-allowed"
                                  : "pointer",
                                opacity: opt.disabled ? 0.45 : 1,
                                backgroundColor: isSelected
                                  ? colors.celurenBlue[25].value
                                  : "transparent",
                                color: isSelected
                                  ? colors.celurenBlue[600].value
                                  : colors.raisinBlack[800].value,
                                fontSize,
                                fontWeight: isSelected ? "600" : "400",
                                transition: "background 0.1s ease",
                                fontFamily: "Inter,system-ui,sans-serif",
                              }}
                              onMouseEnter={(e) => {
                                if (!opt.disabled && !isSelected)
                                  (
                                    e.currentTarget as HTMLDivElement
                                  ).style.backgroundColor =
                                    colors.beauBlue[50].value;
                              }}
                              onMouseLeave={(e) => {
                                if (!isSelected)
                                  (
                                    e.currentTarget as HTMLDivElement
                                  ).style.backgroundColor = "transparent";
                              }}
                            >
                              {opt.icon && (
                                <span style={{ flexShrink: 0 }}>
                                  {opt.icon}
                                </span>
                              )}
                              <span style={{ flex: 1 }}>{opt.label}</span>
                              {isSelected && (
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M2 7L5.5 10.5L12 3.5"
                                    stroke={colors.celurenBlue[500].value}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}

                  {/* Loading spinner (pagination) */}
                  {loading && <ListSpinner />}

                  {/* Custom footer */}
                  {renderFooter}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {hasError && (
          <span
            style={{
              fontSize: 12,
              color: colors.crimsonRed[500].value,
              fontWeight: "500",
            }}
          >
            {errorMessage}
          </span>
        )}
      </Box>
    );
  }

  // ── React Native render ────────────────────────────────────────────────────

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const {
    View,
    TouchableOpacity,
    Text: RNText,
    TextInput: RNTextInput,
    Modal: RNModal,
    FlatList,
    ActivityIndicator,
  } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
    TouchableOpacity: React.ComponentType<Record<string, unknown>>;
    Text: React.ComponentType<Record<string, unknown>>;
    TextInput: React.ComponentType<Record<string, unknown>>;
    Modal: React.ComponentType<Record<string, unknown>>;
    FlatList: React.ComponentType<Record<string, unknown>>;
    ActivityIndicator: React.ComponentType<Record<string, unknown>>;
  };

  const selectedLabel = options.find(
    (o) => o.value === (Array.isArray(current) ? current[0] : current),
  )?.label;

  return (
    <Box testID={testID} gap={5} {...boxProps}>
      {/* Label */}
      {label && (
        <RNText
          style={{
            fontSize: 13,
            fontWeight: "600",
            color: colors.raisinBlack[800].value,
          }}
          allowFontScaling={false}
        >
          {label}
          {isRequired && (
            <RNText style={{ color: colors.crimsonRed[500].value }}>
              {" *"}
            </RNText>
          )}
        </RNText>
      )}

      {/* Trigger */}
      <TouchableOpacity
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: open, disabled }}
        style={{
          height,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 14,
          borderWidth: 1.5,
          borderColor: hasError
            ? colors.crimsonRed[500].value
            : colors.beauBlue[300].value,
          borderRadius: 8,
          backgroundColor: disabled ? colors.beauBlue[50].value : "#ffffff",
          opacity: disabled ? 0.65 : 1,
        }}
      >
        <RNText
          style={{
            fontSize,
            color: selectedLabel
              ? colors.raisinBlack[800].value
              : colors.beauBlue[600].value,
            flex: 1,
          }}
          allowFontScaling={false}
          numberOfLines={1}
        >
          {selectedLabel ?? placeholder}
        </RNText>
        <RNText
          style={{ fontSize: 10, color: colors.beauBlue[600].value }}
          allowFontScaling={false}
        >
          ▼
        </RNText>
      </TouchableOpacity>

      {/* Bottom sheet modal */}
      <RNModal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
          activeOpacity={1}
          onPress={handleClose}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "70%",
              paddingBottom: 24,
            }}
          >
            {/* Handle bar */}
            <View
              style={{ alignItems: "center", paddingTop: 10, paddingBottom: 4 }}
            >
              <View
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: colors.beauBlue[300].value,
                }}
              />
            </View>

            {/* Header */}
            <View
              style={{
                paddingHorizontal: 16,
                paddingBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.beauBlue[200].value,
              }}
            >
              <RNText
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: colors.raisinBlack[800].value,
                  textAlign: "center",
                }}
                allowFontScaling={false}
              >
                {label ?? "Select"}
              </RNText>
            </View>

            {/* Search input */}
            {searchable && (
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.beauBlue[100].value,
                }}
              >
                <RNTextInput
                  value={search}
                  onChangeText={handleSearchChange}
                  placeholder={searchPlaceholder}
                  placeholderTextColor={colors.beauBlue[600].value}
                  style={{
                    height: 38,
                    borderWidth: 1,
                    borderColor: colors.beauBlue[200].value,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    fontSize: 14,
                    color: colors.raisinBlack[800].value,
                  }}
                  allowFontScaling={false}
                  autoFocus
                />
              </View>
            )}

            {/* List */}
            <FlatList
              data={filteredOptions}
              keyExtractor={(item: DropdownOption) => item.value}
              style={listStyle}
              contentContainerStyle={contentContainerStyle}
              onEndReached={onEndReached}
              onEndReachedThreshold={onEndReachedThreshold}
              ListEmptyComponent={
                !loading
                  ? (renderEmpty as React.ReactElement) ?? (
                      <View style={{ padding: 20, alignItems: "center" }}>
                        <RNText
                          style={{
                            fontSize: 13,
                            color: colors.beauBlue[600].value,
                          }}
                          allowFontScaling={false}
                        >
                          No options found
                        </RNText>
                      </View>
                    )
                  : null
              }
              ListFooterComponent={
                <>
                  {loading && (
                    <View style={{ paddingVertical: 12, alignItems: "center" }}>
                      <ActivityIndicator
                        size="small"
                        color={colors.celurenBlue[400].value}
                      />
                    </View>
                  )}
                  {renderFooter}
                </>
              }
              renderItem={({ item }: { item: DropdownOption }) => {
                const isSelected = selectedValues.includes(item.value);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleSelect(item.value);
                      if (!multiple) handleClose();
                    }}
                    disabled={item.disabled}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 16,
                      paddingVertical: 13,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.beauBlue[100].value,
                      opacity: item.disabled ? 0.45 : 1,
                      backgroundColor: isSelected
                        ? colors.celurenBlue[25].value
                        : "transparent",
                    }}
                  >
                    {item.icon && (
                      <View style={{ marginRight: 10 }}>
                        {item.icon as React.ReactNode}
                      </View>
                    )}
                    <RNText
                      style={{
                        flex: 1,
                        fontSize,
                        color: isSelected
                          ? colors.celurenBlue[600].value
                          : colors.raisinBlack[800].value,
                        fontWeight: isSelected ? "600" : "400",
                      }}
                      allowFontScaling={false}
                    >
                      {item.label}
                    </RNText>
                    {isSelected && (
                      <RNText
                        style={{
                          color: colors.celurenBlue[500].value,
                          fontSize: 16,
                        }}
                        allowFontScaling={false}
                      >
                        ✓
                      </RNText>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </RNModal>

      {/* Error */}
      {hasError && (
        <RNText
          style={{
            fontSize: 12,
            color: colors.crimsonRed[500].value,
            fontWeight: "500",
          }}
          allowFontScaling={false}
        >
          {errorMessage}
        </RNText>
      )}
    </Box>
  );
};

Dropdown.displayName = "Dropdown";
export default Dropdown;
