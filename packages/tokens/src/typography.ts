/**
 * Typography tokens for Quasify UI.
 *
 * Extended with Inter and Plus Jakarta Sans — modern, beautiful system fonts
 * that render crisply on both web and native.
 *
 * Objects are declared `as const` so TypeScript infers literal types.
 */

import { token } from "./token";

export const typography = {
  fontFamily: {
    // ── Legacy Montserrat ──────────────────────────────────────────────────
    montserratBold: token("Montserrat-Bold", "fontFamily-montserratBold"),
    montserratSemiBold: token(
      "Montserrat-SemiBold",
      "fontFamily-montserratSemiBold",
    ),
    montserratMedium: token("Montserrat-Medium", "fontFamily-montserratMedium"),
    montserratRegular: token(
      "Montserrat-Regular",
      "fontFamily-montserratRegular",
    ),
    // ── Legacy Nunito ──────────────────────────────────────────────────────
    nunitoBold: token("Nunito-Bold", "fontFamily-nunitoBold"),
    nunitoSemiBold: token("Nunito-SemiBold", "fontFamily-nunitoSemiBold"),
    nunitoMedium: token("Nunito-Medium", "fontFamily-nunitoMedium"),
    nunitoRegular: token("Nunito-Regular", "fontFamily-nunitoRegular"),
    // ── Inter — clean, highly legible UI font ──────────────────────────────
    interBlack: token(
      "Inter-Black, Inter, system-ui, sans-serif",
      "fontFamily-interBlack",
    ),
    interBold: token(
      "Inter-Bold, Inter, system-ui, sans-serif",
      "fontFamily-interBold",
    ),
    interSemiBold: token(
      "Inter-SemiBold, Inter, system-ui, sans-serif",
      "fontFamily-interSemiBold",
    ),
    interMedium: token(
      "Inter-Medium, Inter, system-ui, sans-serif",
      "fontFamily-interMedium",
    ),
    interRegular: token(
      "Inter, system-ui, sans-serif",
      "fontFamily-interRegular",
    ),
    interLight: token(
      "Inter-Light, Inter, system-ui, sans-serif",
      "fontFamily-interLight",
    ),
    // ── Plus Jakarta Sans — expressive, modern display font ───────────────
    jakartaBlack: token(
      "PlusJakartaSans-ExtraBold, 'Plus Jakarta Sans', system-ui, sans-serif",
      "fontFamily-jakartaBlack",
    ),
    jakartaBold: token(
      "PlusJakartaSans-Bold, 'Plus Jakarta Sans', system-ui, sans-serif",
      "fontFamily-jakartaBold",
    ),
    jakartaSemiBold: token(
      "PlusJakartaSans-SemiBold, 'Plus Jakarta Sans', system-ui, sans-serif",
      "fontFamily-jakartaSemiBold",
    ),
    jakartaMedium: token(
      "PlusJakartaSans-Medium, 'Plus Jakarta Sans', system-ui, sans-serif",
      "fontFamily-jakartaMedium",
    ),
    jakartaRegular: token(
      "'Plus Jakarta Sans', system-ui, sans-serif",
      "fontFamily-jakartaRegular",
    ),
    // ── JetBrains Mono — monospace font for code blocks ───────────────────
    jetbrainsMonoRegular: token(
      '"JetBrains Mono", monospace',
      "fontFamily-jetbrainsMonoRegular",
    ),
    jetbrainsMonoMedium: token(
      '"JetBrains Mono Medium", monospace',
      "fontFamily-jetbrainsMonoMedium",
    ),
    jetbrainsMonoBold: token(
      '"JetBrains Mono Bold", monospace',
      "fontFamily-jetbrainsMonoBold",
    ),
  },
  fontSize: {
    "2xs": token(10, "fontSize-2xs"),
    xs: token(12, "fontSize-xs"),
    sm: token(14, "fontSize-sm"),
    md: token(16, "fontSize-md"),
    lg: token(18, "fontSize-lg"),
    xl: token(20, "fontSize-xl"),
    "2xl": token(24, "fontSize-2xl"),
    "3xl": token(30, "fontSize-3xl"),
    "4xl": token(36, "fontSize-4xl"),
    "5xl": token(48, "fontSize-5xl"),
    "6xl": token(60, "fontSize-6xl"),
    "7xl": token(72, "fontSize-7xl"),
  },
  lineHeight: {
    none: token(1, "lineHeight-none"),
    tight: token(1.25, "lineHeight-tight"),
    snug: token(1.375, "lineHeight-snug"),
    normal: token(1.5, "lineHeight-normal"),
    relaxed: token(1.625, "lineHeight-relaxed"),
    loose: token(2, "lineHeight-loose"),
  },
  letterSpacing: {
    tighter: token(-0.05, "letterSpacing-tighter"),
    tight: token(-0.025, "letterSpacing-tight"),
    normal: token(0, "letterSpacing-normal"),
    wide: token(0.025, "letterSpacing-wide"),
    wider: token(0.05, "letterSpacing-wider"),
    widest: token(0.1, "letterSpacing-widest"),
  },
  fontWeight: {
    light: token("300", "fontWeight-light"),
    regular: token("400", "fontWeight-regular"),
    medium: token("500", "fontWeight-medium"),
    semiBold: token("600", "fontWeight-semiBold"),
    bold: token("700", "fontWeight-bold"),
    extraBold: token("800", "fontWeight-extraBold"),
    black: token("900", "fontWeight-black"),
  },
} as const;
