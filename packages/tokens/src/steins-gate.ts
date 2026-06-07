/**
 * Steins;Gate token group for Stareezy UI.
 *
 * Palette drawn from the Steins;Gate visual novel:
 * - Midnight navy backgrounds — Akihabara at night, the lab at 3am
 * - Electric blue (#4a9eff) — IBN 5100 screen glow, D-mail interface
 * - Warm ivory (#e8dcc8) — VN text box, dialogue text
 * - Crimson red (#e63030) — divergence meter, Reading Steiner flash
 * - Muted teal (#2a9d8f) — secondary UI accents
 * - Steel blue-gray (#8a9ab5) — secondary text, timestamps
 *
 * "El Psy Kongroo."
 */

import { token } from "./token";
import type { TokenVariant } from "./variants";

// ---------------------------------------------------------------------------
// Steins;Gate dark (base) tokens
// ---------------------------------------------------------------------------

export const steinsGate = {
  /** Deepest background — midnight Akihabara */
  labNight: token("#080c18", "sg-labNight"),
  /** Primary surface — deep navy */
  midnightNavy: token("#0d1224", "sg-midnightNavy"),
  /** Secondary surface — slightly lifted navy */
  surfaceNavy: token("#131929", "sg-surfaceNavy"),
  /** Electric blue — IBN 5100 / D-mail glow */
  ibmBlue: token("#4a9eff", "sg-ibmBlue"),
  /** Dim electric blue — secondary accents */
  ibmBlueDim: token("#2d6db5", "sg-ibmBlueDim"),
  /** Divergence red — meter, critical states */
  divergenceRed: token("#e63030", "sg-divergenceRed"),
  /** Bright red — Reading Steiner flash */
  steinerRed: token("#ff4444", "sg-steinerRed"),
  /** Muted teal — secondary accent */
  labTeal: token("#2a9d8f", "sg-labTeal"),
  /** Warm ivory — VN text box, primary text */
  ivoryText: token("#e8dcc8", "sg-ivoryText"),
  /** Dim ivory — secondary text */
  ivoryDim: token("#a89880", "sg-ivoryDim"),
  /** Subtle border — barely visible navy line */
  borderNavy: token("#1e2a42", "sg-borderNavy"),
  /** Muted text — placeholder / disabled */
  textMuted: token("#5a6a85", "sg-textMuted"),
} as const;

// ---------------------------------------------------------------------------
// SteinsGateTokens type
// ---------------------------------------------------------------------------

export type SteinsGateTokens = typeof steinsGate;

// ---------------------------------------------------------------------------
// Steins;Gate variants
// ---------------------------------------------------------------------------

export const steinsGateVariants: TokenVariant<SteinsGateTokens> = {
  dark: steinsGate,
  /** Light variant — daytime lab, warm paper tones */
  light: {
    labNight: token("#f5f0e8", "sg-light-labNight"),
    midnightNavy: token("#ede8dc", "sg-light-midnightNavy"),
    surfaceNavy: token("#e4ddd0", "sg-light-surfaceNavy"),
    ibmBlue: token("#1a5fb4", "sg-light-ibmBlue"),
    ibmBlueDim: token("#2d6db5", "sg-light-ibmBlueDim"),
    divergenceRed: token("#c0392b", "sg-light-divergenceRed"),
    steinerRed: token("#e74c3c", "sg-light-steinerRed"),
    labTeal: token("#1a7a6e", "sg-light-labTeal"),
    ivoryText: token("#1a1410", "sg-light-ivoryText"),
    ivoryDim: token("#4a3c2c", "sg-light-ivoryDim"),
    borderNavy: token("#c8bfb0", "sg-light-borderNavy"),
    textMuted: token("#7a6a58", "sg-light-textMuted"),
  },
};
