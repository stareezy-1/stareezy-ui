"use client";
import React, { useState, useEffect } from "react";
import { isWeb } from "../shared/platform";
import { Text, ETextType } from "../primitives/Text";
import {
  commandPaletteOverlayStyle,
  commandPaletteContainerStyle,
  commandPaletteInputStyle,
  commandPaletteListStyle,
  commandPaletteItemStyle,
} from "./CommandPalette.style";
import type { CommandItem } from "./CommandPalette.types";
import { aurora } from "@stareezy-ui/tokens";

export type { CommandItem } from "./CommandPalette.types";

export interface CommandPaletteProps {
  items: CommandItem[];
  onClose: () => void;
  placeholder?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  items,
  onClose,
  placeholder = "Search commands...",
}) => {
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

  return (
    <div
      style={commandPaletteOverlayStyle}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={commandPaletteContainerStyle}>
        <input
          autoFocus
          style={commandPaletteInputStyle}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search commands"
        />
        <div style={commandPaletteListStyle} role="listbox">
          {filtered.map((item) => (
            <div
              key={item.id}
              role="option"
              aria-selected={false}
              style={{
                ...commandPaletteItemStyle,
                backgroundColor:
                  hoveredId === item.id
                    ? aurora.borderSubtle.value
                    : "transparent",
              }}
              onClick={() => {
                item.onSelect();
                onClose();
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {item.icon && (
                <span style={{ flexShrink: 0, color: aurora.textMuted.value }}>
                  {item.icon}
                </span>
              )}
              <Text
                type={ETextType.AuroraNavLabel}
                text={item.label}
                color={aurora.starWhite.value}
              />
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "16px 12px", textAlign: "center" }}>
              <Text
                type={ETextType.SParagraphRegular}
                text="No results found"
                color={aurora.textMuted.value}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CommandPalette.displayName = "CommandPalette";
export default CommandPalette;
