/**
 * Typography tokens for Stareezy UI.
 * Ported from rekosistem-components/src/styles/typography.ts.
 *
 * Covers fontFamily (8 entries), fontSize (6 entries), and fontWeight (4 entries).
 * Objects are declared `as const` so TypeScript infers literal types.
 */

import { token } from "./token";

export const typography = {
  fontFamily: {
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
    nunitoBold: token("Nunito-Bold", "fontFamily-nunitoBold"),
    nunitoSemiBold: token("Nunito-SemiBold", "fontFamily-nunitoSemiBold"),
    nunitoMedium: token("Nunito-Medium", "fontFamily-nunitoMedium"),
    nunitoRegular: token("Nunito-Regular", "fontFamily-nunitoRegular"),
  },
  fontSize: {
    xs: token(12, "fontSize-xs"),
    sm: token(14, "fontSize-sm"),
    md: token(16, "fontSize-md"),
    lg: token(20, "fontSize-lg"),
    xl: token(24, "fontSize-xl"),
    xxl: token(32, "fontSize-xxl"),
  },
  fontWeight: {
    regular: token("400", "fontWeight-regular"),
    medium: token("500", "fontWeight-medium"),
    semiBold: token("600", "fontWeight-semiBold"),
    bold: token("700", "fontWeight-bold"),
  },
} as const;
