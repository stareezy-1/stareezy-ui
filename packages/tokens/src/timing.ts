/**
 * Timing tokens for Stareezy UI.
 *
 * flash — ultra-short feedback (100 ms)
 * quick — standard transition (300 ms)
 *
 * Object is declared `as const` so TypeScript infers literal numeric types.
 */

import { token } from "./token";

export const timing = {
  flash: token(100, "timing-flash"),
  quick: token(300, "timing-quick"),
} as const;
