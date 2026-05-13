/**
 * Badges stories — covers all EBadgesType, EBadgesState, and EBadgesStyle variants.
 *
 * Token props: background/border/text colors are derived from colors.success,
 * colors.danger, colors.caution, colors.celurenBlue, and colors.neutral tokens.
 * Resolved token values are shown in argTypes descriptions.
 *
 * Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6
 */

import type { Meta, StoryObj } from "@storybook/react";
import {
  Badges,
  EBadgesType,
  EBadgesState,
  EBadgesStyle,
} from "@stareezy-ui/components";
import React from "react";

const meta: Meta<typeof Badges> = {
  title: "Components/Badges",
  component: Badges,
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "select",
      options: Object.values(EBadgesState),
      description:
        "Badge state. Drives background/border/text color tokens:" +
        "- success: lawnGreen surface/border/main tokens" +
        "- danger: crimsonRed surface/border/main tokens" +
        "- warning: brightYellowCrayola surface/border/main tokens" +
        "- info: celurenBlue-25/100/500 tokens" +
        "- default: neutral-20/40/70 tokens",
      table: {
        type: { summary: "EBadgesState" },
        defaultValue: { summary: EBadgesState.default },
      },
    },
    type: {
      control: "select",
      options: Object.values(EBadgesType),
      description:
        "Badge shape. pill/round/pillOnly use radius-full (9999px); icon uses radius-md (8px); badge uses radius-sm (6px).",
      table: {
        type: { summary: "EBadgesType" },
        defaultValue: { summary: EBadgesType.badge },
      },
    },
    style: {
      control: "select",
      options: Object.values(EBadgesStyle),
      description:
        "Badge visual style. solid fills with state main color; outline shows border only; text shows text only.",
      table: {
        type: { summary: "EBadgesStyle" },
        defaultValue: { summary: EBadgesStyle.default },
      },
    },
    text: {
      control: "text",
      description: "Badge label text.",
    },
    color: {
      control: "color",
      description: "Override text/border color for outline and text styles.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badges>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    state: EBadgesState.default,
    text: "Default",
  },
};

// ── All states ────────────────────────────────────────────────────────────────

export const Success: Story = {
  args: {
    state: EBadgesState.success,
    text: "Success",
  },
};

export const Danger: Story = {
  args: {
    state: EBadgesState.danger,
    text: "Danger",
  },
};

export const Warning: Story = {
  args: {
    state: EBadgesState.warning,
    text: "Warning",
  },
};

export const Info: Story = {
  args: {
    state: EBadgesState.info,
    text: "Info",
  },
};

// ── All types ─────────────────────────────────────────────────────────────────

export const BadgeType: Story = {
  name: "Type / Badge",
  args: {
    state: EBadgesState.success,
    type: EBadgesType.badge,
    text: "Badge",
  },
};

export const PillType: Story = {
  name: "Type / Pill",
  args: {
    state: EBadgesState.info,
    type: EBadgesType.pill,
    text: "Pill",
  },
};

export const PillOnlyType: Story = {
  name: "Type / PillOnly",
  args: {
    state: EBadgesState.warning,
    type: EBadgesType.pillOnly,
    text: "Pill Only",
  },
};

export const RoundType: Story = {
  name: "Type / Round",
  args: {
    state: EBadgesState.danger,
    type: EBadgesType.round,
    text: "Round",
  },
};

export const RoundOpacityType: Story = {
  name: "Type / RoundOpacity",
  args: {
    state: EBadgesState.success,
    type: EBadgesType.roundOpacity,
    text: "Round Opacity",
  },
};

export const IconType: Story = {
  name: "Type / Icon",
  args: {
    state: EBadgesState.info,
    type: EBadgesType.icon,
    icon: "★",
  },
};

// ── All styles ────────────────────────────────────────────────────────────────

export const DefaultStyle: Story = {
  name: "Style / Default",
  args: {
    state: EBadgesState.success,
    style: EBadgesStyle.default,
    text: "Default Style",
  },
};

export const SolidStyle: Story = {
  name: "Style / Solid",
  args: {
    state: EBadgesState.success,
    style: EBadgesStyle.solid,
    text: "Solid",
  },
};

export const SolidHalfStyle: Story = {
  name: "Style / SolidHalf",
  args: {
    state: EBadgesState.info,
    style: EBadgesStyle.solidHalf,
    text: "Solid Half",
  },
};

export const OutlineStyle: Story = {
  name: "Style / Outline",
  args: {
    state: EBadgesState.danger,
    style: EBadgesStyle.outline,
    text: "Outline",
  },
};

export const TextStyle: Story = {
  name: "Style / Text",
  args: {
    state: EBadgesState.warning,
    style: EBadgesStyle.text,
    text: "Text Only",
  },
};

// ── With icons ────────────────────────────────────────────────────────────────

export const WithLeftIcon: Story = {
  name: "With Left Icon",
  args: {
    state: EBadgesState.success,
    text: "Active",
    leftIcon: "✓",
  },
};

export const WithRightIcon: Story = {
  name: "With Right Icon",
  args: {
    state: EBadgesState.danger,
    text: "Error",
    rightIcon: "✕",
  },
};

// ── All states grid ───────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All States",
  render: () => {
    return React.createElement(
      "div",
      { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
      Object.values(EBadgesState).map((state) =>
        React.createElement(Badges, { key: state, state, text: state }),
      ),
    );
  },
};
