/**
 * Version — renders "V {version}" text.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.7
 */

import React from "react";
import { spacing } from "@stareezy-ui/tokens";
import { useThemedColors } from "../shared/useThemedColors";

import { isWeb } from "../shared/platform";

export interface VersionProps {
  version: string;
}

export const Version: React.FC<VersionProps> = ({ version }) => {
  const themed = useThemedColors();

  if (isWeb) {
    return (
      <span
        style={{
          fontSize: spacing[12].value,
          color: themed.textTertiary,
        }}
      >
        {`V ${version}`}
      </span>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text: RNText } = require("react-native") as {
    Text: React.ComponentType<Record<string, unknown>>;
  };

  return (
    <RNText
      allowFontScaling={false}
      style={{
        fontSize: spacing[12].value,
        color: themed.textTertiary,
      }}
    >
      {`V ${version}`}
    </RNText>
  );
};

Version.displayName = "Version";
export default Version;
