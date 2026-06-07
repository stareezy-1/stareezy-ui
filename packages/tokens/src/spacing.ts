/**
 * Spacing tokens for Quasify UI.
 *
 * All values are raw pixel numbers (no convertSpacing — that is a React Native
 * utility in packages/core; the token store holds the raw values).
 * Objects are declared `as const` so TypeScript infers literal numeric types.
 */

import { token } from "./token";

// ---------------------------------------------------------------------------
// spacing — named aliases + numeric keys
// ---------------------------------------------------------------------------

export const spacing = {
  // Named aliases
  zero: token(0, "spacing-zero"),
  pixel: token(1, "spacing-pixel"),
  nano: token(2, "spacing-nano"),
  tiny: token(4, "spacing-tiny"),
  regular: token(6, "spacing-regular"),
  small: token(8, "spacing-small"),
  medium: token(12, "spacing-medium"),
  extraMedium: token(16, "spacing-extraMedium"),
  large: token(24, "spacing-large"),
  extraLarge: token(28, "spacing-extraLarge"),
  extraLarge2: token(36, "spacing-extraLarge2"),
  extraLarge3: token(42, "spacing-extraLarge3"),
  huge: token(64, "spacing-huge"),

  // Numeric keys
  1: token(1, "spacing-1"),
  2: token(2, "spacing-2"),
  3: token(3, "spacing-3"),
  4: token(4, "spacing-4"),
  5: token(5, "spacing-5"),
  6: token(6, "spacing-6"),
  8: token(8, "spacing-8"),
  10: token(10, "spacing-10"),
  12: token(12, "spacing-12"),
  14: token(14, "spacing-14"),
  16: token(16, "spacing-16"),
  18: token(18, "spacing-18"),
  20: token(20, "spacing-20"),
  22: token(22, "spacing-22"),
  24: token(24, "spacing-24"),
  28: token(28, "spacing-28"),
  32: token(32, "spacing-32"),
  36: token(36, "spacing-36"),
  42: token(42, "spacing-42"),
  48: token(48, "spacing-48"),
  54: token(54, "spacing-54"),
  60: token(60, "spacing-60"),
  64: token(64, "spacing-64"),
  67: token(67, "spacing-67"),
  72: token(72, "spacing-72"),
  84: token(84, "spacing-84"),
  96: token(96, "spacing-96"),
  112: token(112, "spacing-112"),
  128: token(128, "spacing-128"),
  144: token(144, "spacing-144"),
  160: token(160, "spacing-160"),
  256: token(256, "spacing-256"),
  320: token(320, "spacing-320"),
  480: token(480, "spacing-480"),
} as const;

// ---------------------------------------------------------------------------
// sp — scalePrimitive (keys 0–480)
// ---------------------------------------------------------------------------

export const sp = {
  0: token(0, "sp-0"),
  "0,5": token(2, "sp-0,5"),
  1: token(4, "sp-1"),
  2: token(6, "sp-2"),
  3: token(8, "sp-3"),
  4: token(12, "sp-4"),
  5: token(16, "sp-5"),
  6: token(20, "sp-6"),
  8: token(24, "sp-8"),
  10: token(32, "sp-10"),
  12: token(40, "sp-12"),
  16: token(48, "sp-16"),
  20: token(64, "sp-20"),
  24: token(80, "sp-24"),
  28: token(96, "sp-28"),
  32: token(128, "sp-32"),
  40: token(160, "sp-40"),
  48: token(192, "sp-48"),
  56: token(224, "sp-56"),
  64: token(256, "sp-64"),
  80: token(320, "sp-80"),
  96: token(384, "sp-96"),
  120: token(480, "sp-120"),
  140: token(560, "sp-140"),
  160: token(640, "sp-160"),
  180: token(720, "sp-180"),
  192: token(768, "sp-192"),
  256: token(1024, "sp-256"),
  320: token(1280, "sp-320"),
  360: token(1440, "sp-360"),
  400: token(1600, "sp-400"),
  480: token(1920, "sp-480"),
} as const;

// ---------------------------------------------------------------------------
// ss — spacingScale (none, 2xS–11xL)
// ---------------------------------------------------------------------------

export const ss = {
  none: token(0, "ss-none"),
  "2xS": token(2, "ss-2xS"),
  xS: token(4, "ss-xS"),
  sM: token(6, "ss-sM"),
  mD: token(8, "ss-mD"),
  lG: token(12, "ss-lG"),
  xL: token(16, "ss-xL"),
  "2xL": token(20, "ss-2xL"),
  "3xL": token(24, "ss-3xL"),
  "4xL": token(32, "ss-4xL"),
  "5xL": token(40, "ss-5xL"),
  "6xL": token(48, "ss-6xL"),
  "7xL": token(64, "ss-7xL"),
  "8xL": token(80, "ss-8xL"),
  "9xL": token(96, "ss-9xL"),
  "10xL": token(128, "ss-10xL"),
  "11xL": token(160, "ss-11xL"),
} as const;

// ---------------------------------------------------------------------------
// w — widths (2xS–6xL)
// ---------------------------------------------------------------------------

export const w = {
  "2xS": token(320, "w-2xS"),
  xS: token(384, "w-xS"),
  sM: token(480, "w-sM"),
  mD: token(560, "w-mD"),
  lg: token(640, "w-lg"),
  "2xL": token(768, "w-2xL"),
  "3xL": token(1024, "w-3xL"),
  "4xL": token(1440, "w-4xL"),
  "5xL": token(1600, "w-5xL"),
  "6xL": token(1920, "w-6xL"),
} as const;
