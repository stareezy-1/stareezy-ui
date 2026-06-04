/**
 * Tag.types.ts — enums and types for the Tag component.
 *
 * Kept separate so Tag.style.ts can import types without creating
 * a circular dependency with Tag.tsx.
 */

export enum ETagVariant {
  Solid = "solid",
  Outline = "outline",
  Subtle = "subtle",
}
