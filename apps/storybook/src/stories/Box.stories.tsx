/**
 * Box stories — covers token props, plain value fallbacks, responsive props,
 * and flex layout variants.
 *
 * Token props: bg, color, p, px, py, rounded, borderColor, borderWidth.
 * Resolved token values are shown in argTypes descriptions.
 *
 * Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6
 */

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@quasify-ui/components";
import { colors, spacing, radius } from "@quasify-ui/tokens";

const meta: Meta<typeof Box> = {
  title: "Components/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    bg: {
      control: "text",
      description:
        "Background color. Accepts a Token<string> or plain CSS color. " +
        "Example token: colors.celurenBlue[500] — id: celurenBlue-500, value: #024CCE.",
    },
    color: {
      control: "text",
      description:
        "Foreground/text color. Example token: colors.raisinBlack[800] — id: raisinBlack-800, value: #0F1010.",
    },
    p: {
      control: "text",
      description:
        "Padding (all sides). Example token: spacing[16] — id: spacing-16, value: 16.",
    },
    px: {
      control: "text",
      description: "Horizontal padding. Token or plain number.",
    },
    py: {
      control: "text",
      description: "Vertical padding. Token or plain number.",
    },
    rounded: {
      control: "text",
      description:
        "Border radius. Example token: radius.md — id: radius-md, value: 8.",
    },
    borderWidth: {
      control: "number",
      description: "Border width. Token or plain number.",
    },
    borderColor: {
      control: "text",
      description: "Border color. Token or plain CSS color.",
    },
    width: {
      control: "text",
      description: "Width. Token or plain number/string.",
    },
    height: {
      control: "text",
      description: "Height. Token or plain number/string.",
    },
    flexDirection: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
      description: "Flex direction.",
    },
    alignItems: {
      control: "select",
      options: ["flex-start", "flex-end", "center", "stretch", "baseline"],
      description: "Align items.",
    },
    justifyContent: {
      control: "select",
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
      ],
      description: "Justify content.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    p: spacing[16],
    bg: colors.celurenBlue[25],
    children: "Box with token props",
  },
};

// ── Token props ───────────────────────────────────────────────────────────────

export const WithTokenBackground: Story = {
  name: "Token / Background",
  args: {
    bg: colors.celurenBlue[500],
    p: spacing[24],
    rounded: radius.md,
    children: "Token background: celurenBlue-500 (#024CCE)",
  },
};

export const WithTokenPadding: Story = {
  name: "Token / Padding",
  args: {
    bg: colors.beauBlue[50],
    p: spacing[32],
    children: "Token padding: spacing-32 (32px)",
  },
};

export const WithTokenRadius: Story = {
  name: "Token / Border Radius",
  args: {
    bg: colors.lawnGreen[100],
    p: spacing[16],
    rounded: radius.xl,
    children: "Token radius: radius-xl (12px)",
  },
};

export const WithTokenBorder: Story = {
  name: "Token / Border",
  args: {
    bg: colors.base.white,
    p: spacing[16],
    rounded: radius.md,
    borderWidth: 1,
    borderColor: colors.celurenBlue[500],
    children: "Token border: celurenBlue-500",
  },
};

// ── Plain value fallbacks ─────────────────────────────────────────────────────

export const PlainValues: Story = {
  name: "Plain Value Fallbacks",
  args: {
    bg: "#f0f4ff",
    p: 20,
    rounded: 12,
    children: "Plain CSS values (no tokens)",
  },
};

// ── Flex layout ───────────────────────────────────────────────────────────────

export const FlexRow: Story = {
  name: "Flex / Row",
  render: () => (
    <Box
      flexDirection="row"
      gap={spacing[8]}
      p={spacing[16]}
      bg={colors.beauBlue[50]}
    >
      <Box bg={colors.celurenBlue[100]} p={spacing[8]} rounded={radius.sm}>
        Item 1
      </Box>
      <Box bg={colors.celurenBlue[200]} p={spacing[8]} rounded={radius.sm}>
        Item 2
      </Box>
      <Box bg={colors.celurenBlue[300]} p={spacing[8]} rounded={radius.sm}>
        Item 3
      </Box>
    </Box>
  ),
};

export const FlexColumn: Story = {
  name: "Flex / Column",
  render: () => (
    <Box
      flexDirection="column"
      gap={spacing[8]}
      p={spacing[16]}
      bg={colors.beauBlue[50]}
    >
      <Box bg={colors.celurenBlue[100]} p={spacing[8]} rounded={radius.sm}>
        Row 1
      </Box>
      <Box bg={colors.celurenBlue[200]} p={spacing[8]} rounded={radius.sm}>
        Row 2
      </Box>
      <Box bg={colors.celurenBlue[300]} p={spacing[8]} rounded={radius.sm}>
        Row 3
      </Box>
    </Box>
  ),
};

// ── Responsive props ──────────────────────────────────────────────────────────

export const ResponsiveBackground: Story = {
  name: "Responsive / Background",
  render: () => (
    <Box
      bg={{
        base: colors.beauBlue[50],
        md: colors.celurenBlue[100],
        lg: colors.celurenBlue[200],
      }}
      p={spacing[24]}
      rounded={radius.md}
    >
      Background changes at md (768px) and lg (1024px) breakpoints
    </Box>
  ),
};

export const ResponsivePadding: Story = {
  name: "Responsive / Padding",
  render: () => (
    <Box
      bg={colors.beauBlue[50]}
      p={{ base: spacing[8], md: spacing[16], lg: spacing[32] }}
      rounded={radius.md}
    >
      Padding changes at breakpoints: 8px → 16px → 32px
    </Box>
  ),
};
