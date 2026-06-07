import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@quasify-ui/components";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    max: { control: "number" },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "gradient", "striped"] },
    color: { control: "color" },
    trackColor: { control: "color" },
    showLabel: { control: "boolean" },
    showPercentage: { control: "boolean" },
    label: { control: "text" },
    animated: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 65 },
};

export const WithLabel: Story = {
  name: "With Label + Percentage",
  args: { value: 72, label: "Upload progress", showPercentage: true },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}
    >
      <Progress value={60} size="xs" label="xs" showPercentage />
      <Progress value={60} size="sm" label="sm" showPercentage />
      <Progress value={60} size="md" label="md" showPercentage />
      <Progress value={60} size="lg" label="lg" showPercentage />
    </div>
  ),
};

export const Gradient: Story = {
  args: {
    value: 78,
    variant: "gradient",
    showPercentage: true,
    label: "Gradient",
  },
};

export const Striped: Story = {
  args: {
    value: 55,
    variant: "striped",
    showPercentage: true,
    label: "Striped",
  },
};

export const CustomColor: Story = {
  name: "Custom Color",
  args: {
    value: 88,
    color: "#10b981",
    trackColor: "#d1fae5",
    showPercentage: true,
    label: "Success",
  },
};

export const Zero: Story = {
  args: { value: 0, showPercentage: true, label: "Not started" },
};

export const Complete: Story = {
  args: {
    value: 100,
    showPercentage: true,
    label: "Complete",
    color: "#10b981",
  },
};

export const WithBoxProps: Story = {
  name: "With BoxProps (p, bg, rounded)",
  args: {
    value: 60,
    showPercentage: true,
    label: "Padded",
    p: 16,
    bg: "#f0f9ff",
    rounded: 12,
  },
};
