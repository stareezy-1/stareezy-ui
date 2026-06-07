/**
 * Quasar token group for Quasify UI.
 *
 * Palette drawn from the Quasar theme in the quasar app — inspired by the
 * astronomical phenomenon: a supermassive black hole with a blazing accretion
 * disk emitting plasma jets across deep space.
 *
 * - Deep space near-black backgrounds (#020205)
 * - Plasma-jet orange (#ff6a1a) as the primary brand color
 * - Accretion-disk crimson (#dc143c) as the accent / danger
 * - Star-white warm text (#f8f0e8)
 * - Nebula dark surfaces (#0d0508, #160a0e)
 *
 * Reference: quasar/src/app/globals.css — data-palette="quasar"
 */

import { token } from "./token";
import type { TokenVariant } from "./variants";

// ---------------------------------------------------------------------------
// Quasar dark (base) tokens
// ---------------------------------------------------------------------------

export const quasar = {
  /** Deepest background — void of deep space */
  voidBlack: token("#020205", "quasar-voidBlack"),
  /** Primary surface — nebula dark */
  nebulaDark: token("#0d0508", "quasar-nebulaDark"),
  /** Elevated surface — accretion glow lifted */
  accretionSurface: token("#160a0e", "quasar-accretionSurface"),
  /** Plasma jet orange — primary brand */
  plasmaOrange: token("#ff6a1a", "quasar-plasmaOrange"),
  /** Dim plasma — secondary accent / hover */
  plasmaDim: token("#c94a00", "quasar-plasmaDim"),
  /** Accretion disk crimson — danger / accent */
  accretionCrimson: token("#dc143c", "quasar-accretionCrimson"),
  /** Bright crimson — error / critical states */
  flareRed: token("#ff3355", "quasar-flareRed"),
  /** Stellar teal — success accent */
  stellarTeal: token("#22c55e", "quasar-stellarTeal"),
  /** Star warm-white — primary text */
  starWhite: token("#f8f0e8", "quasar-starWhite"),
  /** Dim star — secondary text */
  starDim: token("#b09080", "quasar-starDim"),
  /** Nebula border — barely visible plasma edge */
  nebulaBorder: token("#2a100a", "quasar-nebulaBorder"),
  /** Void muted — placeholder / disabled text */
  voidMuted: token("#6a5048", "quasar-voidMuted"),
  /** Warning amber — caution states */
  warningAmber: token("#f5a623", "quasar-warningAmber"),
} as const;

// ---------------------------------------------------------------------------
// QuasarTokens type
// ---------------------------------------------------------------------------

export type QuasarTokens = typeof quasar;

// ---------------------------------------------------------------------------
// Quasar variants (dark + light)
// ---------------------------------------------------------------------------

export const quasarVariants: TokenVariant<QuasarTokens> = {
  dark: quasar,
  /** Light variant — ember glow on warm ivory paper */
  light: {
    voidBlack: token("#fdf6f0", "quasar-light-voidBlack"),
    nebulaDark: token("#f5ebe0", "quasar-light-nebulaDark"),
    accretionSurface: token("#ffffff", "quasar-light-accretionSurface"),
    plasmaOrange: token("#c94a00", "quasar-light-plasmaOrange"),
    plasmaDim: token("#a03a00", "quasar-light-plasmaDim"),
    accretionCrimson: token("#a8001e", "quasar-light-accretionCrimson"),
    flareRed: token("#c0002a", "quasar-light-flareRed"),
    stellarTeal: token("#16a34a", "quasar-light-stellarTeal"),
    starWhite: token("#1a0c08", "quasar-light-starWhite"),
    starDim: token("#5a3020", "quasar-light-starDim"),
    nebulaBorder: token("#e0c8b8", "quasar-light-nebulaBorder"),
    voidMuted: token("#8a6050", "quasar-light-voidMuted"),
    warningAmber: token("#c97000", "quasar-light-warningAmber"),
  },
};
