/**
 * Color tokens for Stareezy UI.
 * Ported from rekosistem-components/src/styles/palette.ts and color.ts.
 *
 * All values are wrapped with the `token()` factory so every color carries
 * a stable `id` and a typed `value`.  The objects are declared `as const`
 * so TypeScript infers the narrowest possible literal types.
 */

import { token } from "./token";
import type { Token } from "./token";

// ---------------------------------------------------------------------------
// Palette — from rekosistem-components/src/styles/palette.ts
// ---------------------------------------------------------------------------

export const palette = {
  black: token("#1d1d1d", "palette-black"),
  white: token("#FFFFFF", "palette-white"),
  offWhite: token("#e6e6e6", "palette-offWhite"),
  orange: token("#FBA928", "palette-orange"),
  orangeDarker: token("#EB9918", "palette-orangeDarker"),
  lightGrey: token("#939AA4", "palette-lightGrey"),
  lighterGrey: token("#C4C4C4", "palette-lighterGrey"),
  angry: token("#dd3333", "palette-angry"),
  deepPurple: token("#5D2555", "palette-deepPurple"),
  blue: token("#567BB9", "palette-blue"),
  blueDarker: token("#2B3E5D", "palette-blueDarker"),
} as const;

// ---------------------------------------------------------------------------
// Colors — from rekosistem-components/src/styles/color.ts
// ---------------------------------------------------------------------------

export const colors = {
  // ── base ──────────────────────────────────────────────────────────────────
  base: {
    white: token("#ffffff", "base-white"),
    black: token("#040404", "base-black"),
  },

  // ── celurenBlue (25–900) ──────────────────────────────────────────────────
  celurenBlue: {
    25: token("#E6EDFA", "celurenBlue-25"),
    50: token("#CCDBF5", "celurenBlue-50"),
    100: token("#B3C9F0", "celurenBlue-100"),
    200: token("#81A6E7", "celurenBlue-200"),
    300: token("#4E82DD", "celurenBlue-300"),
    400: token("#1B5ED3", "celurenBlue-400"),
    500: token("#024CCE", "celurenBlue-500"),
    600: token("#0146C5", "celurenBlue-600"),
    700: token("#023DA5", "celurenBlue-700"),
    800: token("#012E7C", "celurenBlue-800"),
    900: token("#011E52", "celurenBlue-900"),
  },

  // ── beauBlue (50–800) ─────────────────────────────────────────────────────
  beauBlue: {
    50: token("#FAFBFF", "beauBlue-50"),
    100: token("#ECF3F7", "beauBlue-100"),
    200: token("#E3ECF4", "beauBlue-200"),
    300: token("#D9E6F0", "beauBlue-300"),
    400: token("#D5E3EE", "beauBlue-400"),
    500: token("#D0E0EC", "beauBlue-500"),
    600: token("#A6B3BD", "beauBlue-600"),
    700: token("#7D868E", "beauBlue-700"),
    800: token("#535A5E", "beauBlue-800"),
  },

  // ── raisinBlack (25–900) ──────────────────────────────────────────────────
  raisinBlack: {
    25: token("#E9E9EA", "raisinBlack-25"),
    50: token("#D4D4D4", "raisinBlack-50"),
    100: token("#A8A9A9", "raisinBlack-100"),
    200: token("#7D7D7E", "raisinBlack-200"),
    300: token("#515253", "raisinBlack-300"),
    400: token("#33373A", "raisinBlack-400"),
    500: token("#262728", "raisinBlack-500"),
    600: token("#171718", "raisinBlack-600"),
    700: token("#131414", "raisinBlack-700"),
    800: token("#0F1010", "raisinBlack-800"),
    900: token("#070707", "raisinBlack-900"),
  },

  // ── turquiseBlue (50–800) ─────────────────────────────────────────────────
  turquiseBlue: {
    50: token("#E7FDFA", "turquiseBlue-50"),
    100: token("#D0FCF7", "turquiseBlue-100"),
    200: token("#A1F9EF", "turquiseBlue-200"),
    300: token("#72F7E8", "turquiseBlue-300"),
    400: token("#43F4E0", "turquiseBlue-400"),
    500: token("#14F1D8", "turquiseBlue-500"),
    600: token("#10C1AD", "turquiseBlue-600"),
    700: token("#0C9182", "turquiseBlue-700"),
    800: token("#086056", "turquiseBlue-800"),
  },

  // ── brightYellowCrayola (50–800) ──────────────────────────────────────────
  brightYellowCrayola: {
    50: token("#FEF4E2", "brightYellowCrayola-50"),
    100: token("#FEEFD5", "brightYellowCrayola-100"),
    200: token("#FDDFAB", "brightYellowCrayola-200"),
    300: token("#FDCE82", "brightYellowCrayola-300"),
    400: token("#FCBE58", "brightYellowCrayola-400"),
    500: token("#FBAE2E", "brightYellowCrayola-500"),
    600: token("#C98B25", "brightYellowCrayola-600"),
    700: token("#97681C", "brightYellowCrayola-700"),
    800: token("#644612", "brightYellowCrayola-800"),
  },

  // ── lawnGreen (50–800) ────────────────────────────────────────────────────
  lawnGreen: {
    50: token("#F3FFE3", "lawnGreen-50"),
    100: token("#E6FBCC", "lawnGreen-100"),
    200: token("#CDF79A", "lawnGreen-200"),
    300: token("#B3F367", "lawnGreen-300"),
    400: token("#9AEF35", "lawnGreen-400"),
    500: token("#81EB02", "lawnGreen-500"),
    600: token("#67BC02", "lawnGreen-600"),
    700: token("#4D8D01", "lawnGreen-700"),
    800: token("#345E01", "lawnGreen-800"),
  },

  // ── lemonYellow (50–800) ──────────────────────────────────────────────────
  lemonYellow: {
    50: token("#FFFFE8", "lemonYellow-50"),
    100: token("#FEFED6", "lemonYellow-100"),
    200: token("#FDFDAD", "lemonYellow-200"),
    300: token("#FCFC85", "lemonYellow-300"),
    400: token("#FBFB5C", "lemonYellow-400"),
    500: token("#FAFA33", "lemonYellow-500"),
    600: token("#C8C829", "lemonYellow-600"),
    700: token("#96961F", "lemonYellow-700"),
    800: token("#646414", "lemonYellow-800"),
  },

  // ── crimsonRed (50–800) ───────────────────────────────────────────────────
  crimsonRed: {
    50: token("#FFE9EC", "crimsonRed-50"),
    100: token("#FCCCD2", "crimsonRed-100"),
    200: token("#FA9AA5", "crimsonRed-200"),
    300: token("#F76779", "crimsonRed-300"),
    400: token("#F5354C", "crimsonRed-400"),
    500: token("#F2021F", "crimsonRed-500"),
    600: token("#C20219", "crimsonRed-600"),
    700: token("#910113", "crimsonRed-700"),
    800: token("#61010C", "crimsonRed-800"),
  },

  // ── primary — legacy scale (80–900) ──────────────────────────────────────
  primary: {
    80: token("#DDE5F1", "primary-80"),
    90: token("#C7D3E8", "primary-90"),
    100: token("#AABDDC", "primary-100"),
    200: token("#8EA7D0", "primary-200"),
    300: token("#7291C5", "primary-300"),
    400: token("#567BB9", "primary-400"),
    500: token("#48679A", "primary-500"),
    600: token("#39527B", "primary-600"),
    700: token("#2B3E5D", "primary-700"),
    800: token("#1D293E", "primary-800"),
    900: token("#111925", "primary-900"),
  },

  // ── secondary — legacy scale (80–900) ────────────────────────────────────
  secondary: {
    80: token("#F9DEDE", "secondary-80"),
    90: token("#F6C8C8", "secondary-90"),
    100: token("#F1ADAD", "secondary-100"),
    200: token("#EC9292", "secondary-200"),
    300: token("#E87676", "secondary-300"),
    400: token("#E35B5B", "secondary-400"),
    500: token("#BD4C4C", "secondary-500"),
    600: token("#973D3D", "secondary-600"),
    700: token("#722E2E", "secondary-700"),
    800: token("#4C1E1E", "secondary-800"),
    900: token("#2D1212", "secondary-900"),
  },

  // ── neptune — legacy scale (80–900) ──────────────────────────────────────
  neptune: {
    80: token("#E1F1EF", "neptune-80"),
    90: token("#CDE8E4", "neptune-90"),
    100: token("#B4DCD6", "neptune-100"),
    200: token("#9CD1C9", "neptune-200"),
    300: token("#83C5BB", "neptune-300"),
    400: token("#6ABAAE", "neptune-400"),
    500: token("#589B91", "neptune-500"),
    600: token("#477C74", "neptune-600"),
    700: token("#355D57", "neptune-700"),
    800: token("#233E3A", "neptune-800"),
    900: token("#152523", "neptune-900"),
  },

  // ── yellow — legacy scale (80–900) ───────────────────────────────────────
  yellow: {
    80: token("#FFF1CC", "yellow-80"),
    90: token("#FFE8AB", "yellow-90"),
    100: token("#FFDD80", "yellow-100"),
    200: token("#FFD256", "yellow-200"),
    300: token("#FFC62C", "yellow-300"),
    400: token("#FFBB02", "yellow-400"),
    500: token("#D49C02", "yellow-500"),
    600: token("#AA7D01", "yellow-600"),
    700: token("#805E01", "yellow-700"),
    800: token("#553E01", "yellow-800"),
    900: token("#332500", "yellow-900"),
  },

  // ── dark — legacy scale (100–900) ────────────────────────────────────────
  dark: {
    100: token("#F8F8F8", "dark-100"),
    200: token("#F1F1F2", "dark-200"),
    300: token("#E3E4E6", "dark-300"),
    400: token("#D9DBDD", "dark-400"),
    500: token("#CCCFD1", "dark-500"),
    600: token("#BBBFC1", "dark-600"),
    700: token("#A4A9AC", "dark-700"),
    800: token("#5C666A", "dark-800"),
    900: token("#253238", "dark-900"),
  },

  // ── green — sparse scale (100, 300, 500) ──────────────────────────────────
  green: {
    100: token("#EEF8EF", "green-100"),
    300: token("#9CD7A8", "green-300"),
    500: token("#23A33F", "green-500"),
  },

  // ── body — scale (100–300) ────────────────────────────────────────────────
  body: {
    100: token("#FFFFFF", "body-100"),
    200: token("#F8F8F8", "body-200"),
    300: token("#F5F5F5", "body-300"),
  },

  // ── neutral — scale (10–100) ──────────────────────────────────────────────
  neutral: {
    10: token("#FFFFFF", "neutral-10"),
    20: token("#F5F5F5", "neutral-20"),
    30: token("#EDEDED", "neutral-30"),
    40: token("#E0E0E0", "neutral-40"),
    50: token("#C2C2C2", "neutral-50"),
    60: token("#9E9E9E", "neutral-60"),
    70: token("#757575", "neutral-70"),
    80: token("#616161", "neutral-80"),
    90: token("#313131", "neutral-90"),
    100: token("#000000", "neutral-100"),
  },

  // ── success ───────────────────────────────────────────────────────────────
  success: {
    main: token("#6ABAAE", "success-main"),
    surface: token("#E1F1EF", "success-surface"),
    border: token("#CDE8E4", "success-border"),
    hover: token("#589B91", "success-hover"),
    pressed: token("#355D57", "success-pressed"),
    focus: token("#6ABAAE33", "success-focus"),
  },

  // ── caution ───────────────────────────────────────────────────────────────
  caution: {
    main: token("#FFBB02", "caution-main"),
    surface: token("#FFF1CC", "caution-surface"),
    border: token("#FFE8AB", "caution-border"),
    hover: token("#D59C02", "caution-hover"),
    pressed: token("#805E01", "caution-pressed"),
    focus: token("#FFBB0233", "caution-focus"),
  },

  // ── danger ────────────────────────────────────────────────────────────────
  danger: {
    main: token("#E35B5B", "danger-main"),
    surface: token("#F9DEDE", "danger-surface"),
    border: token("#F6C8C8", "danger-border"),
    hover: token("#BD4C4C", "danger-hover"),
    pressed: token("#712E2E", "danger-pressed"),
    focus: token("#E35B5B33", "danger-focus"),
  },

  // ── misc ──────────────────────────────────────────────────────────────────
  transparent: token("rgba(0, 0, 0, 0)", "transparent"),
  semiBlack: token("#29221F", "semiBlack"),
  transparentLight: token("rgba(255,255,255,0.84)", "transparentLight"),
  transparentDark: token("rgba(0,0,0,0.84)", "transparentDark"),
  surface: token("#FFF1CC", "surface"),
} as const;
