/**
 * Button.types.ts — enums and interfaces for the Button component.
 *
 * Kept separate so Button.style.ts can import enums without creating
 * a circular dependency with Button.tsx.
 */

export enum EButtonType {
  Primary = "Primary",
  Secondary = "Secondary",
  Tertiary = "Tertiary",
  Link = "link",
  WithBorder = "with-border",
  AbsoluteBottom = "absolute-bottom",
  AbsoluteBottomWithBorder = "absolute-bottom-with-border",
  Transparent = "transparent",
}

export enum EButtonSize {
  SM = "SM",
  MD = "MD",
  LG = "LG",
  XL = "XL",
  XXL = "XXL",
}
