import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Badge } from "@quasify-ui/components";
import type { BadgeVariant } from "@quasify-ui/components";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["green", "amber", "red", "purple", "default"],
    },
    label: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { label: "Badge", variant: "default" } };

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        padding: 16,
        background: "#050505",
      }}
    >
      {(["green", "amber", "red", "purple", "default"] as BadgeVariant[]).map(
        (v) => (
          <Badge key={v} label={v} variant={v} />
        ),
      )}
    </div>
  ),
};

export const Green: Story = { args: { label: "Success", variant: "green" } };
export const Amber: Story = { args: { label: "Warning", variant: "amber" } };
export const Red: Story = { args: { label: "Error", variant: "red" } };
export const Purple: Story = { args: { label: "Info", variant: "purple" } };
