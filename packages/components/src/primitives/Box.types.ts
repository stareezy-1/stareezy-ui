/**
 * Box.types.ts — enums for the Box component.
 *
 * Kept separate so Box.presets.ts can import enums without creating
 * a circular dependency with Box.tsx.
 */

export enum EBoxType {
  Card = "card",
  Surface = "surface",
  Row = "row",
  Column = "column",
  Overlay = "overlay",
  Section = "section",
}
