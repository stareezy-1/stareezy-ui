/**
 * injectFocusStyles — injects a shared CSS rule for [data-szr-close]:focus-visible
 * so all close/dismiss buttons across Modal and Drawer show a keyboard focus ring
 * without requiring per-component JS focus state.
 *
 * Safe to call multiple times — the rule is injected only once.
 *
 * Requirements: 14.3
 */

let focusStylesInjected = false;

export function injectFocusStyles(): void {
  if (focusStylesInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.setAttribute("data-szr-kf", "focus");
  el.textContent = `
[data-szr-close]:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
`.trim();
  document.head.appendChild(el);
  focusStylesInjected = true;
}
