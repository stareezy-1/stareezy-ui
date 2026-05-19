import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Card } from "@stareezy-ui/components";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["border", "shadow", "glow"] },
    glowColor: { control: "select", options: ["green", "purple"] },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Border: Story = {
  args: {
    variant: "border",
    title: "Border Card",
    description: "A card with a subtle border.",
  },
};

export const Shadow: Story = {
  args: {
    variant: "shadow",
    title: "Shadow Card",
    description: "A card with a drop shadow.",
  },
};

export const GlowGreen: Story = {
  name: "Glow / Green",
  args: {
    variant: "glow",
    glowColor: "green",
    title: "Aurora Card",
    description: "A card with aurora green glow.",
  },
};

export const GlowPurple: Story = {
  name: "Glow / Purple",
  args: {
    variant: "glow",
    glowColor: "purple",
    title: "Nebula Card",
    description: "A card with nebula purple glow.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        padding: 24,
        background: "#050505",
      }}
    >
      <Card
        variant="border"
        title="Border"
        description="Subtle border variant"
      />
      <Card variant="shadow" title="Shadow" description="Drop shadow variant" />
      <Card
        variant="glow"
        glowColor="green"
        title="Glow Green"
        description="Aurora green glow"
      />
      <Card
        variant="glow"
        glowColor="purple"
        title="Glow Purple"
        description="Nebula purple glow"
      />
    </div>
  ),
};
