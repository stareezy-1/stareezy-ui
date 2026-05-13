/**
 * View.types.ts — enums for the View component.
 *
 * Kept separate so View.presets.ts can import enums without creating
 * a circular dependency with View.tsx.
 */

export enum EViewType {
  Screen = "screen",
  Container = "container",
  Row = "row",
  Column = "column",
}
