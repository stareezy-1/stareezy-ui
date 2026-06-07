/**
 * Tag stories — covers all variants, dismissible state, and color overrides.
 * Requirements: 11.8
 */

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag, ETagVariant } from "@quasify-ui/components";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.values(ETagVariant),
    },
    label: { control: "text" },
    color: { control: "color" },
    onDismiss: { action: "dismissed" },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Solid: Story = {
  args: { label: "Solid", variant: ETagVariant.Solid },
};

export const Outline: Story = {
  args: { label: "Outline", variant: ETagVariant.Outline },
};

export const Subtle: Story = {
  args: { label: "Subtle", variant: ETagVariant.Subtle },
};

export const Dismissible: Story = {
  name: "Dismissible",
  args: { label: "Remove me", variant: ETagVariant.Solid, onDismiss: () => {} },
};

export const DismissibleOutline: Story = {
  name: "Dismissible / Outline",
  args: {
    label: "Remove me",
    variant: ETagVariant.Outline,
    onDismiss: () => {},
  },
};

export const CustomColor: Story = {
  name: "Custom accent color",
  args: { label: "Custom", variant: ETagVariant.Solid, color: "#7c3aed" },
};

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tag label="Solid" variant={ETagVariant.Solid} />
      <Tag label="Outline" variant={ETagVariant.Outline} />
      <Tag label="Subtle" variant={ETagVariant.Subtle} />
      <Tag
        label="Dismissible"
        variant={ETagVariant.Solid}
        onDismiss={() => {}}
      />
    </div>
  ),
};
