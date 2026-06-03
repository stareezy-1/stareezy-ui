/**
 * Avatar.gradients.ts — decorative gradient constants for Avatar fallback backgrounds.
 *
 * These gradient values are theme-independent by design (Req 10.6).
 * They are used as visually distinct avatar backgrounds when no image is provided,
 * and are derived deterministically from the user's name. Each gradient is a
 * visually pleasant blend that works on both light and dark themes.
 *
 * Do NOT resolve these through the theme — they are intentionally decorative
 * and remain constant across theme changes.
 */

export const AVATAR_GRADIENTS: readonly string[] = [
  "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
  "linear-gradient(135deg,#f093fb 0%,#f5576c 100%)",
  "linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)",
  "linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)",
  "linear-gradient(135deg,#fa709a 0%,#fee140 100%)",
  "linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)",
  "linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)",
  "linear-gradient(135deg,#a1c4fd 0%,#c2e9fb 100%)",
] as const;

/**
 * Returns a stable gradient for a given name string.
 * Uses a simple hash so the same name always gets the same gradient.
 */
export function getAvatarGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (
    AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length] ??
    AVATAR_GRADIENTS[0] ??
    "linear-gradient(135deg,#667eea 0%,#764ba2 100%)"
  );
}
