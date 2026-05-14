/**
 * Slider — range input with beautiful custom styling.
 * Root wrapper accepts BoxProps. Value/mark labels rendered via <Text>.
 */

import React from "react";
import { colors } from "@stareezy-ui/tokens";
import { isWeb } from "../shared/platform";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";

export type SliderSize = "sm" | "md" | "lg";

export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps extends Omit<BoxProps, "onChange" | "children"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: SliderSize;
  color?: string;
  trackColor?: string;
  disabled?: boolean;
  showValue?: boolean;
  marks?: SliderMark[];
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  /** ETextType for the current value badge */
  valueTextType?: ETextType;
  /** Style override for the value badge text */
  valueTextStyle?: StyleProp;
  /** ETextType for mark labels */
  markTextType?: ETextType;
  /** Style override for mark label text */
  markTextStyle?: StyleProp;
}

const TRACK_H: Record<SliderSize, number> = { sm: 4, md: 6, lg: 8 };
const THUMB_SIZE: Record<SliderSize, number> = { sm: 14, md: 18, lg: 22 };

const SLIDER_CSS = `
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

let sliderCssInjected = false;
function injectSliderCss() {
  if (sliderCssInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = SLIDER_CSS;
  document.head.appendChild(el);
  sliderCssInjected = true;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  color = colors.celurenBlue[400].value,
  trackColor = colors.beauBlue[200].value,
  disabled = false,
  showValue = false,
  marks,
  onChange,
  onChangeEnd,
  valueTextType = ETextType.XSLabel,
  valueTextStyle,
  markTextType = ETextType.XSParagraphRegular,
  markTextStyle,
  testID,
  accessibilityLabel,
  ...boxProps
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const current = value ?? internalValue;
  const pct = ((current - min) / (max - min)) * 100;
  const trackH = TRACK_H[size];
  const thumbSize = THUMB_SIZE[size];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setInternalValue(v);
    onChange?.(v);
  };

  if (isWeb) {
    injectSliderCss();

    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={8}
        data-testid={testID}
        {...boxProps}
      >
        {showValue && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Text
              type={valueTextType}
              text={String(current)}
              color={color}
              style={{
                background: `${color}18`,
                padding: "2px 8px",
                borderRadius: 20,
                ...(valueTextStyle as React.CSSProperties),
              }}
            />
          </div>
        )}
        <div style={{ position: "relative" }}>
          <style>{`.szr-slider::-webkit-slider-thumb{width:${thumbSize}px;height:${thumbSize}px}`}</style>
          <input
            type="range"
            className="szr-slider"
            min={min}
            max={max}
            step={step}
            value={current}
            disabled={disabled}
            onChange={handleChange}
            onMouseUp={() => onChangeEnd?.(current)}
            onTouchEnd={() => onChangeEnd?.(current)}
            aria-label={accessibilityLabel}
            aria-valuenow={current}
            aria-valuemin={min}
            aria-valuemax={max}
            style={
              {
                height: trackH,
                borderRadius: trackH / 2,
                background: `linear-gradient(to right,${color} ${pct}%,${trackColor} ${pct}%)`,
                "--szr-slider-color": color,
                WebkitAppearance: "none",
                appearance: "none",
                width: "100%",
                outline: "none",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1,
              } as React.CSSProperties
            }
          />
        </div>
        {marks && marks.length > 0 && (
          <div style={{ position: "relative", height: 20 }}>
            {marks.map((mark) => {
              const markPct = ((mark.value - min) / (max - min)) * 100;
              return (
                <div
                  key={mark.value}
                  style={{
                    position: "absolute",
                    left: `${markPct}%`,
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <div
                    style={{
                      width: 2,
                      height: 6,
                      borderRadius: 1,
                      backgroundColor:
                        mark.value <= current ? color : trackColor,
                    }}
                  />
                  {mark.label && (
                    <Text
                      type={markTextType}
                      text={mark.label}
                      color={colors.beauBlue[700].value}
                      style={{
                        whiteSpace: "nowrap",
                        ...(markTextStyle as React.CSSProperties),
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Box>
    );
  }

  // React Native — requires @react-native-community/slider
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const rnSliderPkg = "@react-native-community/slider";
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Slider: RNSlider } = require(rnSliderPkg) as {
    Slider: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <Box testID={testID} {...boxProps}>
      <RNSlider
        value={current}
        minimumValue={min}
        maximumValue={max}
        step={step}
        disabled={disabled}
        minimumTrackTintColor={color}
        maximumTrackTintColor={trackColor}
        thumbTintColor={color}
        onValueChange={(v: number) => {
          setInternalValue(v);
          onChange?.(v);
        }}
        onSlidingComplete={onChangeEnd}
        accessibilityLabel={accessibilityLabel}
      />
    </Box>
  );
};

Slider.displayName = "Slider";
export default Slider;
