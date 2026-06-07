/**
 * Box.presets.ts — preset style maps for EBoxType values.
 *
 * All values are sourced from @stareezy-ui/tokens. No hardcoded literals
 * are used where a token exists.
 */

import { colors, radius, spacing, shadow } from "@stareezy-ui/tokens";
import { EBoxType } from "./Box.types";

export const BOX_PRESETS: Record<EBoxType, Record<string, unknown>> = {
  [EBoxType.Card]: {
    backgroundColor: colors.raisinBlack[500].value,
    borderRadius: radius["2xl"].value,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: shadow.medium.value.color,
    shadowOffset: shadow.medium.value.offset,
    shadowRadius: shadow.medium.value.radius,
    shadowOpacity: shadow.medium.value.opacity,
  },
  [EBoxType.Surface]: {
    backgroundColor: colors.raisinBlack[600].value,
  },
  [EBoxType.Row]: {
    flexDirection: "row",
    alignItems: "center",
  },
  [EBoxType.Column]: {
    flexDirection: "column",
  },
  [EBoxType.Overlay]: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  [EBoxType.Section]: {
    paddingHorizontal: spacing[24].value,
    width: "100%",
  },
};
