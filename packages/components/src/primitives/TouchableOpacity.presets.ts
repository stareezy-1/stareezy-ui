/**
 * TouchableOpacity.presets.ts — preset style maps for ETouchableType values.
 *
 * All values are sourced from @quasify-ui/tokens. No hardcoded literals
 * are used where a token exists.
 *
 * ETouchableType.Card shares the exact same object reference as
 * BOX_PRESETS[EBoxType.Card] to guarantee visual consistency (Requirement 4.4).
 */

import { radius, spacing } from "@quasify-ui/tokens";
import { ETouchableType } from "./TouchableOpacity.types";
import { BOX_PRESETS } from "./Box.presets";
import { EBoxType } from "./Box.types";

export const TOUCHABLE_PRESETS: Record<
  ETouchableType,
  Record<string, unknown>
> = {
  // Card shares the exact same preset object as EBoxType.Card (direct reference, not a copy)
  [ETouchableType.Card]: BOX_PRESETS[EBoxType.Card],
  [ETouchableType.NavItem]: {
    paddingHorizontal: spacing[14].value,
    paddingVertical: spacing[8].value,
    borderRadius: radius.md.value,
  },
  [ETouchableType.IconButton]: {
    padding: spacing[10].value,
    borderRadius: radius.full.value,
  },
};
