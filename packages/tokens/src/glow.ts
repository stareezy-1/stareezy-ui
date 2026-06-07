/**
 * Glow shadow tokens for Stareezy UI.
 *
 * Aurora-inspired glow effects using aurora green and nebula purple.
 * Use as `box-shadow` values on web.
 *
 * Requirements: 3.3
 */

import { token } from "./token";

export const glow = {
  /** Subtle green glow — for default aurora-themed elements */
  green: token("0 0 20px rgba(0,255,136,0.25)", "glow-green"),
  /** Subtle purple glow — for accent elements */
  purple: token("0 0 20px rgba(124,58,237,0.3)", "glow-purple"),
  /** Strong green glow — for focused/active aurora elements */
  greenStrong: token("0 0 40px rgba(0,255,136,0.5)", "glow-greenStrong"),
  /** Strong purple glow — for focused/active accent elements */
  purpleStrong: token("0 0 40px rgba(124,58,237,0.5)", "glow-purpleStrong"),
} as const;
