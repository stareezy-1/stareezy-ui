/**
 * Ratings — star rating component.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.7, 17.1, 17.3
 */

import React, { useState } from "react";
import { colors, spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";
import { TouchableOpacity } from "../primitives/TouchableOpacity";

export interface RatingsProps {
  testID?: string;
  defaultRating?: number;
  value?: number;
  reviews?: string[];
  count?: number;
  selectedColor?: string;
  unSelectedColor?: string;
  reviewColor?: string;
  size?: number;
  reviewSize?: number;
  showRating?: boolean;
  isDisabled?: boolean;
  onFinishRating?: (value: number) => void;
  starContainerStyle?: React.CSSProperties | Record<string, unknown>;
  ratingContainerStyle?: React.CSSProperties | Record<string, unknown>;
  starImage?: { active?: unknown; inactive?: unknown };
  readonly?: boolean;
  gapRatings?: number;
  onRatingPress?: (value: number) => void;
}

export const Ratings: React.FC<RatingsProps> = ({
  testID,
  defaultRating = 0,
  value,
  reviews,
  count = 5,
  selectedColor,
  unSelectedColor,
  reviewColor,
  size = 24,
  reviewSize,
  showRating,
  isDisabled,
  onFinishRating,
  starContainerStyle,
  ratingContainerStyle,
  readonly,
  gapRatings,
  onRatingPress,
}) => {
  const themed = useThemedColors();
  const [internalRating, setInternalRating] = useState(defaultRating);

  const currentRating = value ?? internalRating;
  const starGap = gapRatings ?? spacing[4].value;

  const resolvedSelectedColor = selectedColor ?? colors.caution.main.value;
  const resolvedUnselectedColor = unSelectedColor ?? themed.borderDefault;
  const resolvedReviewColor = reviewColor ?? themed.textSecondary;

  const isInteractive = !readonly && !isDisabled;

  const handlePress = (starIndex: number) => {
    if (!isInteractive) return;
    const newRating = starIndex + 1;
    setInternalRating(newRating);
    onRatingPress?.(newRating);
    onFinishRating?.(newRating);
  };

  const reviewText = reviews && currentRating > 0 ? reviews[Math.round(currentRating) - 1] : undefined;

  if (isWeb) {
    return (
      <div
        data-testid={testID}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing[4].value, ...(ratingContainerStyle as React.CSSProperties) }}
      >
        <div
          style={{ display: "flex", flexDirection: "row", gap: starGap, ...(starContainerStyle as React.CSSProperties) }}
          role="group"
          aria-label={`Rating: ${currentRating} out of ${count}`}
        >
          {Array.from({ length: count }).map((_, i) => {
            const filled = i < currentRating;
            return (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1} star${i !== 0 ? "s" : ""}`}
                aria-pressed={filled}
                aria-disabled={!isInteractive}
                disabled={!isInteractive}
                onClick={() => handlePress(i)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: isInteractive ? "pointer" : "default",
                  outline: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  fill={filled ? resolvedSelectedColor : "none"}
                  stroke={filled ? resolvedSelectedColor : resolvedUnselectedColor}
                  strokeWidth="1.5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            );
          })}
        </div>
        {showRating && (
          <span style={{ fontSize: reviewSize ?? spacing[14].value, color: resolvedReviewColor }}>
            {reviewText ?? currentRating.toFixed(1)}
          </span>
        )}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports

  const { Text: RNText } = require("react-native") as {

    Text: React.ComponentType<Record<string, unknown>>;

  };

  return (
    <View style={{ alignItems: "center", gap: spacing[4].value, ...(ratingContainerStyle as Record<string, unknown>) }}>
      <View
        style={{ flexDirection: "row", gap: starGap, ...(starContainerStyle as Record<string, unknown>) }}
        accessibilityRole="adjustable"
        accessibilityLabel={`Rating: ${currentRating} out of ${count}`}
        testID={testID}
      >
        {Array.from({ length: count }).map((_, i) => {
          const filled = i < currentRating;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => handlePress(i)}
              disabled={!isInteractive}
              accessibilityRole="button"
              accessibilityLabel={`${i + 1} star${i !== 0 ? "s" : ""}`}
              accessibilityState={{ selected: filled, disabled: !isInteractive }}
              aria-disabled={!isInteractive}
            >
              <RNText style={{ fontSize: size, color: filled ? resolvedSelectedColor : resolvedUnselectedColor }} allowFontScaling={false}>
                ★
              </RNText>
            </TouchableOpacity>
          );
        })}
      </View>
      {showRating && (
        <RNText style={{ fontSize: reviewSize ?? spacing[14].value, color: resolvedReviewColor }} allowFontScaling={false}>
          {reviewText ?? currentRating.toFixed(1)}
        </RNText>
      )}
    </View>
  );
};

Ratings.displayName = "Ratings";
export default Ratings;
