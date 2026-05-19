/**
 * Input.types.ts — enums and types for the Input component.
 *
 * Kept separate so Input.style.ts can import enums without creating
 * a circular dependency with Input.tsx.
 */

export enum EInputType {
  TextField = "TextField",
  TextArea = "TextArea",
  SearchBar = "SearchBar",
  PhoneNumber = "PhoneNumber",
  Tonase = "Tonase",
  MoneyAmount = "MoneyAmount",
  Ton = "Ton",
  Percentage = "Percentage",
  Number = "Number",
  Participant = "Participant",
}

export enum EInputSize {
  Sm = "sm",
  Md = "Md",
  Lg = "Lg",
}
