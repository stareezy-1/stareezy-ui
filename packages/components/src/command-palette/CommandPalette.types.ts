import type React from "react";

export interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onSelect: () => void;
}
