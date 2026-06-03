/**
 * Table.types.ts — enums and types for the Table component.
 *
 * Kept separate so Table.style.ts can import types without creating
 * a circular dependency with Table.tsx.
 */

export interface TableColumn {
  key: string;
  header: string;
  /** Optional alignment for column content */
  align?: "left" | "center" | "right";
}

export type TableRow = Record<string, React.ReactNode>;
