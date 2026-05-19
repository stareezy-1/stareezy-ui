/**
 * Aurora token group for Stareezy UI.
 *
 * Inspired by the aurora-pdf design language: deep-space backgrounds,
 * aurora green (#00ff88) as the primary brand color, and nebula purple
 * (#7c3aed) as the accent.
 *
 * Requirements: 3.1, 9.1, 9.6
 */

import { token } from "./token";
import type { TokenVariant } from "./variants";

// ---------------------------------------------------------------------------
// Aurora dark (base) tokens
// ---------------------------------------------------------------------------

export const aurora = {
  deepSpace: token("#050505", "aurora-deepSpace"),
  auroraGreen: token("#00ff88", "aurora-auroraGreen"),
  starWhite: token("#ffffff", "aurora-starWhite"),
  nebulaPurple: token("#7c3aed", "aurora-nebulaPurple"),
  cosmicGray: token("#1a1a2e", "aurora-cosmicGray"),
  surfaceDark: token("#0a0a1a", "aurora-surfaceDark"),
  borderSubtle: token("#2a2a3e", "aurora-borderSubtle"),
  textMuted: token("#888888", "aurora-textMuted"),
  textSecondary: token("#aaaaaa", "aurora-textSecondary"),
  errorRed: token("#ff4444", "aurora-errorRed"),
  warningAmber: token("#f59e0b", "aurora-warningAmber"),
} as const;

// ---------------------------------------------------------------------------
// AuroraTokens type
// ---------------------------------------------------------------------------

export type AuroraTokens = typeof aurora;

// ---------------------------------------------------------------------------
// Aurora variants (dark + light)
// ---------------------------------------------------------------------------

/**
 * Dark/light variants for the aurora token group.
 * The `dark` variant is the base aurora palette (dark-first by design).
 * The `light` variant provides accessible light-mode equivalents.
 */
export const auroraVariants: TokenVariant<AuroraTokens> = {
  dark: aurora,
  light: {
    deepSpace: token("#f4f4f8", "aurora-light-deepSpace"),
    auroraGreen: token("#00cc6a", "aurora-light-auroraGreen"),
    starWhite: token("#0f0f1a", "aurora-light-starWhite"),
    nebulaPurple: token("#6d28d9", "aurora-light-nebulaPurple"),
    cosmicGray: token("#e8e8f0", "aurora-light-cosmicGray"),
    surfaceDark: token("#ffffff", "aurora-light-surfaceDark"),
    borderSubtle: token("#d0d0e0", "aurora-light-borderSubtle"),
    textMuted: token("#666666", "aurora-light-textMuted"),
    textSecondary: token("#444444", "aurora-light-textSecondary"),
    errorRed: token("#cc2222", "aurora-light-errorRed"),
    warningAmber: token("#d97706", "aurora-light-warningAmber"),
  },
};
