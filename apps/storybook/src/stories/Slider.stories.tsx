import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@quasify-ui/components";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: { control: "color" },
    trackColor: { control: "color" },
    disabled: { control: "boolean" },
    showValue: { control: "boolean" },
    onChange: { action: "changed" },
    onChangeEnd: { action: "changeEnd" },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: 40, showValue: true },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 24, width: 320 }}
    >
      <Slider size="sm" defaultValue={30} showValue />
      <Slider size="md" defaultValue={50} showValue />
      <Slider size="lg" defaultValue={70} showValue />
    </div>
  ),
};

export const WithMarks: Story = {
  name: "With Marks",
  args: {
    defaultValue: 50,
    showValue: true,
    marks: [
      { value: 0, label: "0" },
      { value: 25, label: "25" },
      { value: 50, label: "50" },
      { value: 75, label: "75" },
      { value: 100, label: "100" },
    ],
  },
};

export const CustomColor: Story = {
  name: "Custom Color",
  args: {
    defaultValue: 65,
    color: "#8b5cf6",
    trackColor: "#ede9fe",
    showValue: true,
  },
};

export const Disabled: Story = {
  args: { defaultValue: 40, disabled: true, showValue: true },
};

export const StepFive: Story = {
  name: "Step 5",
  args: { defaultValue: 50, step: 5, showValue: true },
};

export const WithBoxProps: Story = {
  name: "With BoxProps (p, bg, rounded)",
  args: {
    defaultValue: 60,
    showValue: true,
    p: 16,
    bg: "#f5f3ff",
    rounded: 12,
  },
};
