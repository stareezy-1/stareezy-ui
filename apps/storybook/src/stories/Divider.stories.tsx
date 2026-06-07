import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "@stareezy-ui/components";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    variant: { control: "select", options: ["solid", "dashed", "dotted"] },
    color: { control: "color" },
    thickness: { control: "number" },
    labelPosition: { control: "select", options: ["left", "center", "right"] },
    label: { control: "text" },
    spacing: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  name: "With Label",
  args: { label: "OR" },
};

export const LabelLeft: Story = {
  name: "Label Left",
  args: { label: "Section", labelPosition: "left" },
};

export const LabelRight: Story = {
  name: "Label Right",
  args: { label: "End", labelPosition: "right" },
};

export const Dashed: Story = {
  args: { variant: "dashed" },
};

export const Dotted: Story = {
  args: { variant: "dotted" },
};

export const Thick: Story = {
  args: { thickness: 3, color: "#024CCE" },
};

export const Vertical: Story = {
  render: () => (
    <div
      style={{ display: "flex", alignItems: "stretch", height: 60, gap: 16 }}
    >
      <span style={{ fontSize: 14 }}>Left</span>
      <Divider orientation="vertical" />
      <span style={{ fontSize: 14 }}>Right</span>
    </div>
  ),
};

export const WithBoxProps: Story = {
  name: "With BoxProps (my)",
  args: { label: "Spaced", my: 24 },
};
