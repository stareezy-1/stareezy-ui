/**
 * Dropdown — select with search, groups, multi-select, async/paginated support.
 * All text rendered via <Text> component. Accepts textType/textStyle props.
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";
import { DROPDOWN_KF, SIZE_H, FONT } from "./Dropdown.style";
import type { DropdownSize, DropdownOption } from "./Dropdown.types";
import type { SxProp } from "../shared/sx";
import { useSx, SxStyleTag } from "../shared/useSx";
import type { SzrFC } from '../shared/types';

export type { DropdownSize, DropdownOption };

export interface DropdownProps extends Omit<BoxProps, "onChange" | "children"> {
  options: DropdownOption[];
  value?: string | string[];
  defaultValue?: string;
  onChange?: (value: string | string[]) => void;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  loading?: boolean;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  size?: DropdownSize;
  label?: string;
  errorMessage?: string;
  isRequired?: boolean;
  dropdownStyle?: React.CSSProperties;
  listStyle?: React.CSSProperties;
  contentContainerStyle?: React.CSSProperties;
  renderEmpty?: React.ReactNode;
  renderFooter?: React.ReactNode;
  labelTextType?: ETextType;
  labelTextStyle?: StyleProp;
  triggerTextType?: ETextType;
  triggerTextStyle?: StyleProp;
  optionTextType?: ETextType;
  optionTextStyle?: StyleProp;
  groupTextType?: ETextType;
  errorTextType?: ETextType;
  errorTextStyle?: StyleProp;
  sx?: SxProp;
}

// ---------------------------------------------------------------------------
// Internal spinner
// ---------------------------------------------------------------------------

function ListSpinner({
  color,
  trackColor,
}: {
  color: string;
  trackColor: string;
}) {
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
          border: `2px solid ${trackColor}`,
          borderTopColor: color,
          animation: "szr-spin 0.65s linear infinite",
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dropdown component
// ---------------------------------------------------------------------------

let dropdownKfInjected = false;
function injectDropdownKf() {
  if (dropdownKfInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.setAttribute("data-szr-kf", "dropdown");
  el.textContent = DROPDOWN_KF;
  document.head.appendChild(el);
  dropdownKfInjected = true;
}

export const Dropdown: SzrFC<DropdownProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  searchValue: controlledSearch,
  onSearchChange,
  searchable = false,
  searchPlaceholder = "Search...",
  onEndReached,
  onEndReachedThreshold = 0.2,
  loading = false,
  placeholder = "Select an option",
  multiple = false,
  disabled = false,
  size = "md",
  label,
  errorMessage,
  isRequired,
  dropdownStyle,
  listStyle,
  contentContainerStyle,
  renderEmpty,
  renderFooter,
  labelTextType = ETextType.XSLabel,
  labelTextStyle,
  triggerTextType = ETextType.SParagraphRegular,
  triggerTextStyle,
  optionTextType = ETextType.SParagraphRegular,
  optionTextStyle,
  groupTextType = ETextType.XSLabel,
  errorTextType = ETextType.XSParagraphMedium,
  errorTextStyle,
  testID,
  accessibilityLabel,
  sx,
  ...boxProps
}) => {
  const [open, setOpen] = useState(false);
  const [internalSearch, setInternalSearch] = useState("");
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue ?? (multiple ? [] : ""),
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { sxStyle, sxClassName, sxCss } = useSx(sx);
  const themed = useThemedColors();

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

  const filteredOptions =
    searchable && search && !onSearchChange
      ? options.filter((o) => {
          const s = typeof o.label === "string" ? o.label : String(o.label);
          return s.toLowerCase().includes(search.toLowerCase());
        })
      : options;

  const groups = Array.from(new Set(filteredOptions.map((o) => o.group ?? "")));

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
      setInternalSearch(text);
      onSearchChange?.(text);
    },
    [onSearchChange],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    setInternalSearch("");
    onSearchChange?.("");
  }, [onSearchChange]);

  useEffect(() => {
    if (!isWeb) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        handleClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [handleClose]);

  useEffect(() => {
    if (open && searchable && searchRef.current)
      setTimeout(() => searchRef.current?.focus(), 50);
  }, [open, searchable]);

  useEffect(() => {
    if (!isWeb || !onEndReached) return;
    const el = listRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (
        scrollHeight - scrollTop - clientHeight <=
        scrollHeight * onEndReachedThreshold
      )
        onEndReached();
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [open, onEndReached, onEndReachedThreshold]);

  if (isWeb) {
    injectDropdownKf();

    const borderColor = hasError
      ? themed.colorDanger
      : open
      ? themed.borderPrimaryBrand
      : themed.borderDefault;

    const focusRing =
      open && !hasError
        ? themed.focusRing
        : hasError
        ? themed.focusRingError
        : "none";

    const triggerLabel = selectedLabels.length
      ? multiple
        ? `${selectedLabels.length} selected`
        : selectedLabels[0]
      : placeholder;

    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={5}
        {...(testID !== undefined ? { "data-testid": testID } : {})}
        {...boxProps}
        style={sxStyle as React.CSSProperties}
        className={sxClassName || undefined}
      >
        {sxCss && isWeb && <SxStyleTag css={sxCss} scopeClass={sxClassName} />}
        {label && (
          <label style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Text
              type={labelTextType}
              text={label}
              color={themed.textPrimary}
              style={{
                letterSpacing: "0.01em",
                ...(labelTextStyle as React.CSSProperties),
              }}
            />
            {isRequired && (
              <Text
                type={ETextType.XSLabel}
                text="*"
                color={themed.colorDanger}
              />
            )}
          </label>
        )}

        <div ref={containerRef} style={{ position: "relative" }}>
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
              backgroundColor: disabled ? themed.bgDisabled : themed.surface,
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.65 : 1,
              transition: "border-color 0.18s ease, box-shadow 0.18s ease",
              boxShadow: focusRing,
              boxSizing: "border-box",
              gap: 8,
              textAlign: "left",
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
              {typeof triggerLabel === "string" ? (
                <Text
                  type={triggerTextType}
                  text={triggerLabel}
                  color={
                    selectedLabels.length
                      ? themed.textPrimary
                      : themed.textSecondary
                  }
                  style={{
                    fontSize,
                    ...(triggerTextStyle as React.CSSProperties),
                  }}
                />
              ) : (
                triggerLabel
              )}
            </span>
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
                color: themed.textSecondary,
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
                backgroundColor: themed.surface,
                border: `1.5px solid ${themed.borderDefault}`,
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
              {searchable && (
                <div
                  style={{
                    padding: "8px 10px",
                    borderBottom: `1px solid ${themed.borderSecondary}`,
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
                      border: `1px solid ${themed.borderDefault}`,
                      borderRadius: 6,
                      padding: "6px 10px",
                      fontSize: 13,
                      outline: "none",
                      fontFamily: "Inter,system-ui,sans-serif",
                      color: themed.textPrimary,
                      boxSizing: "border-box",
                      transition: "border-color 0.15s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        themed.borderPrimaryBrand;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = themed.borderDefault;
                    }}
                  />
                </div>
              )}

              <div
                ref={listRef}
                style={{ overflowY: "auto", flex: 1, ...listStyle }}
              >
                <div style={{ ...contentContainerStyle }}>
                  {filteredOptions.length === 0 &&
                    !loading &&
                    (renderEmpty ?? (
                      <div style={{ padding: "14px", textAlign: "center" }}>
                        <Text
                          type={ETextType.XSParagraphRegular}
                          text="No options found"
                          color={themed.textSecondary}
                        />
                      </div>
                    ))}

                  {groups.map((group) => {
                    const groupOpts = filteredOptions.filter(
                      (o) => (o.group ?? "") === group,
                    );
                    return (
                      <div key={group}>
                        {group && (
                          <div style={{ padding: "8px 14px 4px" }}>
                            <Text
                              type={groupTextType}
                              text={group}
                              color={themed.textSecondary}
                              style={{
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                              }}
                            />
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
                                  ? themed.bgSelected
                                  : "transparent",
                                transition: "background 0.1s ease",
                              }}
                              onMouseEnter={(e) => {
                                if (!opt.disabled && !isSelected)
                                  (
                                    e.currentTarget as HTMLDivElement
                                  ).style.backgroundColor = themed.bgHover;
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
                              <span style={{ flex: 1 }}>
                                {typeof opt.label === "string" ? (
                                  <Text
                                    type={optionTextType}
                                    text={opt.label}
                                    color={
                                      isSelected
                                        ? themed.bgSelectedText
                                        : themed.textPrimary
                                    }
                                    style={{
                                      fontSize,
                                      fontWeight: isSelected ? "600" : "400",
                                      ...(optionTextStyle as React.CSSProperties),
                                    }}
                                  />
                                ) : (
                                  opt.label
                                )}
                              </span>
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
                                    stroke={themed.bgSelectedText}
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

                  {loading && (
                    <ListSpinner
                      color={themed.borderPrimaryBrand}
                      trackColor={themed.borderSecondary}
                    />
                  )}
                  {renderFooter}
                </div>
              </div>
            </div>
          )}
        </div>

        {hasError && (
          <Text
            type={errorTextType}
            text={errorMessage!}
            color={themed.colorDanger}
            style={{
              fontWeight: "500",
              ...(errorTextStyle as React.CSSProperties),
            }}
          />
        )}
      </Box>
    );
  }

  // ── React Native ──────────────────────────────────────────────────────────

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const {
    View,
    TouchableOpacity,
    TextInput: RNTextInput,
    Modal: RNModal,
    FlatList,
    ActivityIndicator,
  } = require("react-native") as {
    View: React.ComponentType<Record<string, unknown>>;
    TouchableOpacity: React.ComponentType<Record<string, unknown>>;
    TextInput: React.ComponentType<Record<string, unknown>>;
    Modal: React.ComponentType<Record<string, unknown>>;
    FlatList: React.ComponentType<Record<string, unknown>>;
    ActivityIndicator: React.ComponentType<Record<string, unknown>>;
  };

  const selectedLabel = options.find(
    (o) => o.value === (Array.isArray(current) ? current[0] : current),
  )?.label;

  return (
    <Box testID={testID} gap={5} {...boxProps}
        style={sxStyle as Record<string, unknown>}
        className={sxClassName || undefined}
      >
        {sxCss && isWeb && <SxStyleTag css={sxCss} scopeClass={sxClassName} />}
      {label && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
          <Text
            type={labelTextType}
            text={label}
            color={themed.textPrimary}
            style={labelTextStyle as Record<string, unknown>}
          />
          {isRequired && (
            <Text
              type={ETextType.XSLabel}
              text=" *"
              color={themed.colorDanger}
            />
          )}
        </View>
      )}

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
          borderColor: hasError ? themed.colorDanger : themed.borderDefault,
          borderRadius: 8,
          backgroundColor: disabled ? themed.bgDisabled : themed.surface,
          opacity: disabled ? 0.65 : 1,
        }}
      >
        {typeof selectedLabel === "string" ? (
          <Text
            type={triggerTextType}
            text={selectedLabel ?? placeholder}
            color={selectedLabel ? themed.textPrimary : themed.textSecondary}
            style={{
              flex: 1,
              fontSize,
              ...(triggerTextStyle as Record<string, unknown>),
            }}
            numberOfLines={1}
          />
        ) : (
          selectedLabel ?? (
            <Text
              type={triggerTextType}
              text={placeholder}
              color={themed.textSecondary}
              style={{
                flex: 1,
                fontSize,
                ...(triggerTextStyle as Record<string, unknown>),
              }}
              numberOfLines={1}
            />
          )
        )}
        <Text
          type={ETextType.XSParagraphRegular}
          text="▼"
          color={themed.textSecondary}
        />
      </TouchableOpacity>

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
              backgroundColor: themed.surface,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "70%",
              paddingBottom: 24,
            }}
          >
            <View
              style={{ alignItems: "center", paddingTop: 10, paddingBottom: 4 }}
            >
              <View
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: themed.borderDefault,
                }}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                paddingBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: themed.borderDefault,
              }}
            >
              <Text
                type={ETextType.XSHeadingBold}
                text={label ?? "Select"}
                color={themed.textPrimary}
                style={{ textAlign: "center" }}
              />
            </View>

            {searchable && (
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: themed.borderSecondary,
                }}
              >
                <RNTextInput
                  value={search}
                  onChangeText={handleSearchChange}
                  placeholder={searchPlaceholder}
                  placeholderTextColor={themed.textSecondary}
                  style={{
                    height: 38,
                    borderWidth: 1,
                    borderColor: themed.borderDefault,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    fontSize: 14,
                    color: themed.textPrimary,
                  }}
                  allowFontScaling={false}
                  autoFocus
                />
              </View>
            )}

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
                        <Text
                          type={ETextType.XSParagraphRegular}
                          text="No options found"
                          color={themed.textSecondary}
                        />
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
                        color={themed.borderPrimaryBrand}
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
                      borderBottomColor: themed.borderSecondary,
                      opacity: item.disabled ? 0.45 : 1,
                      backgroundColor: isSelected
                        ? themed.bgSelected
                        : "transparent",
                    }}
                  >
                    {item.icon && (
                      <View style={{ marginRight: 10 }}>
                        {item.icon as React.ReactNode}
                      </View>
                    )}
                    {typeof item.label === "string" ? (
                      <Text
                        type={optionTextType}
                        text={item.label}
                        color={
                          isSelected
                            ? themed.bgSelectedText
                            : themed.textPrimary
                        }
                        style={{
                          flex: 1,
                          fontSize,
                          fontWeight: isSelected ? "600" : "400",
                          ...(optionTextStyle as Record<string, unknown>),
                        }}
                      />
                    ) : (
                      <View style={{ flex: 1 }}>
                        {item.label as React.ReactNode}
                      </View>
                    )}
                    {isSelected && (
                      <Text
                        type={ETextType.MParagraphRegular}
                        text="✓"
                        color={themed.bgSelectedText}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </RNModal>

      {hasError && (
        <Text
          type={errorTextType}
          text={errorMessage!}
          color={themed.colorDanger}
          style={{
            fontWeight: "500",
            ...(errorTextStyle as Record<string, unknown>),
          }}
        />
      )}
    </Box>
  );
};

Dropdown.displayName = "Dropdown";
export default Dropdown;
