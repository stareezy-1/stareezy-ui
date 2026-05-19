/**
 * Dropdown.types.ts — enums and types for the Dropdown component.
 */

export type DropdownSize = "sm" | "md" | "lg";

export interface DropdownOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  group?: string;
  icon?: React.ReactNode;
}
