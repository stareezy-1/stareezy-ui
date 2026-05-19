/**
 * Tabs.types.ts — enums and types for the Tabs component.
 */

export type TabsVariant = "underline" | "pills" | "card";

export interface TabItem {
  key: string;
  label: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
}
