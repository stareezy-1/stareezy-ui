import type { Preview, Decorator } from "@storybook/react";
import React from "react";
import { QuasifyTheme } from "./Quasify-theme";

// Import ThemeProvider using relative path to avoid module resolution issues
// ThemeProvider is a client component (has "use client") so it's safe here
import { ThemeProvider } from "../../../packages/tokens/src/ThemeProvider";

/**
 * Global decorator — wraps every story in ThemeProvider (light theme).
 * This ensures all components receive the correct semantic color tokens.
 * Requirements: 25.6
 */
const withThemeProvider: Decorator = (Story, context) => {
  const theme = (context.globals["theme"] as "light" | "dark") ?? "light";
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          padding: "1.5rem",
          background: theme === "dark" ? "#0F1010" : "#FAFBFF",
          fontFamily: '"Inter", system-ui, sans-serif',
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withThemeProvider],

  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    docs: {
      theme: QuasifyTheme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "812px" } },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1280px", height: "800px" },
        },
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#FAFBFF" },
        { name: "dark", value: "#0F1010" },
        { name: "white", value: "#FFFFFF" },
      ],
    },
  },
};

export default preview;
