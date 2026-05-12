/**
 * ContentLength — displays a character/content length counter with optional description.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";
import { View } from "../primitives/Box";

export interface IContentLengthProps {
  length?: number;
  desc?: string;
  lengthStyle?: React.CSSProperties | Record<string, unknown>;
  descStyle?: React.CSSProperties | Record<string, unknown>;
  containerStyle?: React.CSSProperties | Record<string, unknown>;
}

export const ContentLength: React.FC<IContentLengthProps> = ({
  length,
  desc,
  lengthStyle,
  descStyle,
  containerStyle,
}) => {
  const themed = useThemedColors();

  if (isWeb) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          ...(containerStyle as React.CSSProperties),
        }}
      >
        {desc !== undefined && (
          <span
            style={{
              fontSize: spacing[12].value,
              color: themed.textSecondary,
              ...(descStyle as React.CSSProperties),
            }}
          >
            {desc}
          </span>
        )}
        {length !== undefined && (
          <span
            style={{
              fontSize: spacing[12].value,
              color: themed.textTertiary,
              ...(lengthStyle as React.CSSProperties),
            }}
          >
            {length}
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
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...(containerStyle as Record<string, unknown>),
      }}
    >
      {desc !== undefined && (
        <RNText
          allowFontScaling={false}
          style={{
            fontSize: spacing[12].value,
            color: themed.textSecondary,
            ...(descStyle as Record<string, unknown>),
          }}
        >
          {desc}
        </RNText>
      )}
      {length !== undefined && (
        <RNText
          allowFontScaling={false}
          style={{
            fontSize: spacing[12].value,
            color: themed.textTertiary,
            ...(lengthStyle as Record<string, unknown>),
          }}
        >
          {length}
        </RNText>
      )}
    </View>
  );
};

ContentLength.displayName = "ContentLength";
export default ContentLength;
