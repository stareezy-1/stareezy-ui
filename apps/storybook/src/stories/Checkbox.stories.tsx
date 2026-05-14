import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@stareezy-ui/components";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    labelPosition: { control: "select", options: ["left", "right"] },
    color: { control: "color" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: "Accept terms and conditions" },
};

export const Checked: Story = {
  args: { checked: true, label: "Checked" },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: "Indeterminate" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled" },
};

export const DisabledChecked: Story = {
  name: "Disabled + Checked",
  args: { disabled: true, checked: true, label: "Disabled checked" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox size="sm" label="Small" checked />
      <Checkbox size="md" label="Medium" checked />
      <Checkbox size="lg" label="Large" checked />
    </div>
  ),
};

export const LabelLeft: Story = {
  name: "Label Left",
  args: { label: "Label on left", labelPosition: "left", checked: true },
};

export const CustomColor: Story = {
  name: "Custom Color",
  args: { label: "Custom violet", checked: true, color: "#8b5cf6" },
};

export const WithBoxProps: Story = {
  name: "With BoxProps (p, bg)",
  args: {
    label: "With padding",
    checked: true,
    p: 12,
    bg: "#f5f3ff",
    rounded: 8,
  },
};
