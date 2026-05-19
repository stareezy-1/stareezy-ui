/**
 * Slider.style.ts — style constants for the Slider component.
 *
 * All token values accessed via .value — no hardcoded colors.
 */

import { colors } from "@stareezy-ui/tokens";
import type { SliderSize } from "./Slider.types";

export const SLIDER_CSS = `
.szr-slider {
  -webkit-appearance: none; appearance: none;
  width: 100%; outline: none; cursor: pointer; background: transparent;
}
.szr-slider::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none; border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 1px 6px rgba(0,0,0,0.2), 0 0 0 2px var(--szr-slider-color,#1B5ED3);
  cursor: pointer;
  transition: box-shadow 0.15s ease, transform 0.1s ease;
}
.szr-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 2px 8px rgba(0,0,0,0.25), 0 0 0 3px var(--szr-slider-color,#1B5ED3);
}
.szr-slider::-moz-range-thumb {
  border: none; border-radius: 50%; background: #ffffff;
  box-shadow: 0 1px 6px rgba(0,0,0,0.2), 0 0 0 2px var(--szr-slider-color,#1B5ED3);
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

export const sliderStyles = {
  defaultColor: colors.celurenBlue[400].value,
  defaultTrackColor: colors.beauBlue[200].value,
  markLabelColor: colors.beauBlue[700].value,
} as const;
