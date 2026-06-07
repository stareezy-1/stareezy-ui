import { addons } from "@storybook/manager-api";
import { QuasifyTheme } from "./Quasify-theme";

/**
 * Apply the Quasify UI theme to the Storybook manager (sidebar, toolbar, etc.)
 * Requirements: 25.5
 */
addons.setConfig({
  theme: QuasifyTheme,
});
