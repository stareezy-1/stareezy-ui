/**
 * Slider.style.ts — geometry-only style constants for the Slider component.
 * All colors are resolved at render time via useThemedColors() in Slider.tsx.
 *
 * NOTE: The CSS pseudo-element rules for ::-webkit-slider-thumb cannot use
 * dynamic colors because they require a <style> tag. The thumb background is
 * intentionally white (theme-independent). Exempt from "no hardcoded color"
 * rule per Req 10.6 (decorative non-theme values).
 */

import { registerClasses, registerKeyframes } from "../shared/componentSheet";
import type { SliderSize } from "./Slider.types";

export const SLIDER_CSS_TEMPLATE = (brandColor: string) => `
.szr-slider {
  -webkit-appearance: none; appearance: none;
  width: 100%; outline: none; cursor: pointer; background: transparent;
}
.szr-slider::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none; border-radius: 50%;
  background: white;
  box-shadow: 0 1px 6px rgba(0,0,0,0.2), 0 0 0 2px ${brandColor};
  cursor: pointer;
  transition: box-shadow 0.15s ease, transform 0.1s ease;
}
.szr-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 2px 8px rgba(0,0,0,0.25), 0 0 0 3px ${brandColor};
}
.szr-slider::-moz-range-thumb {
  border: none; border-radius: 50%; background: white;
  box-shadow: 0 1px 6px rgba(0,0,0,0.2), 0 0 0 2px ${brandColor};
  cursor: pointer;
}
.szr-slider:disabled { cursor: not-allowed; opacity: 0.5; }
`;

export const TRACK_H: Record<SliderSize, number> = { sm: 4, md: 6, lg: 8 };
export const THUMB_SIZE: Record<SliderSize, number> = {
  sm: 14,
  md: 18,
  lg: 22,
};

// ── Stylesheet registration ───────────────────────────────────────────────────

export const sliderClasses = registerClasses("slider", {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  valueRow: {
    display: "flex",
    justifyContent: "flex-end",
  },
  marksRow: {
    position: "relative",
    height: 20,
  },
  mark: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    transform: "translateX(-50%)",
  },
  markTick: {
    width: 2,
    height: 6,
    borderRadius: 1,
  },
});
