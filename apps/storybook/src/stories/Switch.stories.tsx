import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@quasify-ui/components";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    value: { control: "boolean" },
    disabled: { control: "boolean" },
    activeColor: { control: "color" },
    inactiveColor: { control: "color" },
    label: { control: "text" },
    labelPosition: { control: "select", options: ["left", "right"] },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { value: false },
};

export const On: Story = {
  args: { value: true },
};

export const WithLabel: Story = {
  name: "With Label",
  args: { value: true, label: "Enable notifications" },
};

export const LabelLeft: Story = {
  name: "Label Left",
  args: { value: true, label: "Dark mode", labelPosition: "left" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Switch size="sm" value label="Small" />
      <Switch size="md" value label="Medium" />
      <Switch size="lg" value label="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled off" },
};

export const DisabledOn: Story = {
  name: "Disabled On",
  args: { disabled: true, value: true, label: "Disabled on" },
};

export const CustomColor: Story = {
  name: "Custom Color",
  args: { value: true, activeColor: "#8b5cf6", label: "Custom violet" },
};

export const WithBoxProps: Story = {
  name: "With BoxProps (p, bg, rounded)",
  args: {
    value: true,
    label: "Padded switch",
    p: 12,
    bg: "#f5f3ff",
    rounded: 10,
  },
};
