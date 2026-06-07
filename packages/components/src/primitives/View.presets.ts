/**
 * View.presets.ts — preset style maps for EViewType values.
 *
 * All values are sourced from @quasify-ui/tokens. No hardcoded literals
 * are used where a token exists.
 */

import { colors } from "@quasify-ui/tokens";
import { EViewType } from "./View.types";

export const VIEW_PRESETS: Record<EViewType, Record<string, unknown>> = {
  [EViewType.Screen]: {
    flex: 1,
    backgroundColor: colors.raisinBlack[600].value,
  },
  [EViewType.Container]: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  [EViewType.Row]: {
    flexDirection: "row",
    alignItems: "center",
  },
  [EViewType.Column]: {
    flexDirection: "column",
  },
};
