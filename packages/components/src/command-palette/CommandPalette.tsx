"use client";
import React, { useState, useEffect } from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Text, ETextType } from "../primitives/Text";
import { Box } from "../primitives/Box";
import {
  makeCommandPaletteOverlayStyle,
  makeCommandPaletteContainerStyle,
  makeCommandPaletteInputStyle,
  commandPaletteListGeometry,
  commandPaletteItemGeometry,
} from "./CommandPalette.style";
import type { CommandItem } from "./CommandPalette.types";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import type { SzrFC } from '../shared/types';

export type { CommandItem } from "./CommandPalette.types";

export interface CommandPaletteProps extends BoxLayoutProps {
  items: CommandItem[];
  onClose: () => void;
  placeholder?: string;
}

export const CommandPalette: SzrFC<CommandPaletteProps> = (props) => {
  const { layout, sxProps, rest } = extractBoxLayoutProps(props);
  const hasLayoutProps =
    Object.keys(layout).length > 0 || Object.keys(sxProps).length > 0;
  const {
    items,
    onClose,
    placeholder = "Search commands...",
  } = rest as CommandPaletteProps;
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const themed = useThemedColors();

  const filtered = query.trim()
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
      )
    : items;

  useEffect(() => {
    if (!isWeb) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isWeb) return null;

  const overlayStyle = makeCommandPaletteOverlayStyle(themed);
  const containerStyle = makeCommandPaletteContainerStyle(themed);
  const inputStyle = makeCommandPaletteInputStyle(themed);

  const paletteEl = (
    <div
      style={overlayStyle}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={containerStyle}>
        <input
          autoFocus
          style={inputStyle}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search commands"
        />
        <div style={commandPaletteListGeometry} role="listbox">
          {filtered.map((item) => (
            <div
              key={item.id}
              role="option"
              aria-selected={false}
              style={{
                ...commandPaletteItemGeometry,
                backgroundColor:
                  hoveredId === item.id ? themed.bgHover : "transparent",
              }}
              onClick={() => {
                item.onSelect();
                onClose();
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {item.icon && (
                <span style={{ flexShrink: 0, color: themed.textMuted }}>
                  {item.icon}
                </span>
              )}
              <Text
                type={ETextType.AuroraNavLabel}
                text={item.label}
                color={themed.textPrimary}
              />
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "16px 12px", textAlign: "center" }}>
              <Text
                type={ETextType.SParagraphRegular}
                text="No results found"
                color={themed.textMuted}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (hasLayoutProps)
    return (
      <Box {...layout} {...sxProps}>
        {paletteEl}
      </Box>
    );
  return paletteEl;
};

CommandPalette.displayName = "CommandPalette";
export default CommandPalette;
