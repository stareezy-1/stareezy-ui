/**
 * Slider — range input with beautiful custom styling.
 * Root wrapper accepts BoxProps. Value/mark labels rendered via <Text>.
 */

import React from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Box } from "../primitives/Box";
import type { BoxProps, StyleProp } from "../primitives/Box";
import { Text, ETextType } from "../primitives/Text";
import { SLIDER_CSS_TEMPLATE, TRACK_H, THUMB_SIZE } from "./Slider.style";
import type { SliderSize, SliderMark } from "./Slider.types";
import type { SxProp } from "../shared/sx";
import { useSx, SxStyleTag } from "../shared/useSx";
import type { SzrFC } from '../shared/types';

export type { SliderSize, SliderMark };

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
  sx?: SxProp;
}

let sliderCssInjected = false;
let sliderCssInjectedColor = "";
function injectSliderCss(color: string) {
  if (sliderCssInjected && sliderCssInjectedColor === color) return;
  if (typeof document === "undefined") return;
  let el = document.querySelector(
    "[data-szr-kf='slider']",
  ) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.setAttribute("data-szr-kf", "slider");
    document.head.appendChild(el);
  }
  el.textContent = SLIDER_CSS_TEMPLATE(color);
  sliderCssInjected = true;
  sliderCssInjectedColor = color;
}

export const Slider: SzrFC<SliderProps> = ({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  color,
  trackColor,
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
  sx,
  ...boxProps
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const { sxStyle, sxClassName, sxCss } = useSx(sx);
  const themed = useThemedColors();
  const resolvedColor = color ?? themed.borderPrimaryBrand;
  const resolvedTrackColor = trackColor ?? themed.borderSecondary;

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
    injectSliderCss(resolvedColor);

    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={8}
        data-testid={testID}
        {...boxProps}
        style={sxStyle as React.CSSProperties}
        className={sxClassName || undefined}
      >
        {sxCss && isWeb && <SxStyleTag css={sxCss} scopeClass={sxClassName} />}
        {showValue && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Text
              type={valueTextType}
              text={String(current)}
              color={resolvedColor}
              style={{
                background: `${resolvedColor}18`,
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
                background: `linear-gradient(to right,${resolvedColor} ${pct}%,${resolvedTrackColor} ${pct}%)`,
                "--szr-slider-color": resolvedColor,
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
                        mark.value <= current
                          ? resolvedColor
                          : resolvedTrackColor,
                    }}
                  />
                  {mark.label && (
                    <Text
                      type={markTextType}
                      text={mark.label}
                      color={themed.textSecondary}
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

  // React Native — requires @react-native-community/slider as an optional peer dep.
  // Falls back to a plain View with a warning if the package is not installed.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  let RNSlider: React.ComponentType<Record<string, unknown>> | null = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const rnSliderPkg = require("@react-native-community/slider") as {
      Slider: React.ComponentType<Record<string, unknown>>;
    };
    RNSlider = rnSliderPkg.Slider;
  } catch {
    // package not installed — render nothing and warn once
    if (__DEV__) {
      console.warn(
        "[stareezy-ui] Slider: install @react-native-community/slider to use the Slider component on React Native.",
      );
    }
  }

  if (!RNSlider) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { View } = require("react-native") as {
      View: React.ComponentType<Record<string, unknown>>;
    };
    return (
      <Box testID={testID} {...boxProps}>
        <View />
      </Box>
    );
  }

  return (
    <Box testID={testID} {...boxProps}
        style={sxStyle as Record<string, unknown>}
        className={sxClassName || undefined}
      >
        {sxCss && isWeb && <SxStyleTag css={sxCss} scopeClass={sxClassName} />}
      <RNSlider
        value={current}
        minimumValue={min}
        maximumValue={max}
        step={step}
        disabled={disabled}
        minimumTrackTintColor={resolvedColor}
        maximumTrackTintColor={resolvedTrackColor}
        thumbTintColor={resolvedColor}
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
