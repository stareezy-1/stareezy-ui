import { addons } from "@storybook/manager-api";
import { StareezyTheme } from "./stareezy-theme";

/**
 * Apply the Stareezy UI theme to the Storybook manager (sidebar, toolbar, etc.)
 * Requirements: 25.5
 */
addons.setConfig({
  theme: StareezyTheme,
});
