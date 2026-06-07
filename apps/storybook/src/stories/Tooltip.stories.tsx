/**
 * Tooltip stories — covers all placements and trigger types.
 * Requirements: 11.8
 */

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "@stareezy-ui/components";
import type { TooltipPlacement } from "@stareezy-ui/components";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    content: { control: "text" },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"] satisfies TooltipPlacement[],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const TriggerButton = ({ label = "Hover me" }) => (
  <button
    type="button"
    style={{
      padding: "8px 16px",
      borderRadius: 8,
      border: "1px solid #ccc",
      cursor: "pointer",
      background: "none",
      font: "inherit",
    }}
  >
    {label}
  </button>
);

export const Top: Story = {
  args: { content: "Tooltip on top", placement: "top" },
  render: (args) => (
    <Tooltip {...args}>
      <TriggerButton />
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: { content: "Tooltip on bottom", placement: "bottom" },
  render: (args) => (
    <Tooltip {...args}>
      <TriggerButton />
    </Tooltip>
  ),
};

export const Left: Story = {
  args: { content: "Tooltip on left", placement: "left" },
  render: (args) => (
    <Tooltip {...args}>
      <TriggerButton />
    </Tooltip>
  ),
};

export const Right: Story = {
  args: { content: "Tooltip on right", placement: "right" },
  render: (args) => (
    <Tooltip {...args}>
      <TriggerButton />
    </Tooltip>
  ),
};

export const LongContent: Story = {
  name: "Long content",
  args: {
    content:
      "This is a longer tooltip message that may wrap across multiple lines depending on the available width.",
    placement: "top",
  },
  render: (args) => (
    <Tooltip {...args}>
      <TriggerButton label="Hover for long tooltip" />
    </Tooltip>
  ),
};

export const OnLink: Story = {
  name: "On a link element",
  args: { content: "Navigate to docs", placement: "bottom" },
  render: (args) => (
    <Tooltip {...args}>
      <a href="#" style={{ textDecoration: "underline", cursor: "pointer" }}>
        Documentation
      </a>
    </Tooltip>
  ),
};
