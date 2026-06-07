import type { Meta, StoryObj } from "@storybook/react";
import { CircularProgress } from "@quasify-ui/components";

const meta: Meta<typeof CircularProgress> = {
  title: "Components/CircularProgress",
  component: CircularProgress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    max: { control: "number" },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    color: { control: "color" },
    trackColor: { control: "color" },
    showValue: { control: "boolean" },
    animated: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
  args: { value: 65, showValue: true },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <CircularProgress key={s} value={70} size={s} showValue />
      ))}
    </div>
  ),
};

export const CustomColor: Story = {
  name: "Custom Color",
  args: {
    value: 80,
    color: "#8b5cf6",
    trackColor: "#ede9fe",
    showValue: true,
    size: "lg",
  },
};

export const WithChildren: Story = {
  name: "With Children",
  render: () => (
    <CircularProgress value={42} size="xl" color="#f43f5e" trackColor="#ffe4e6">
      <span style={{ fontSize: 22, fontWeight: 800, color: "#f43f5e" }}>
        42%
      </span>
      <span style={{ fontSize: 10, color: "#94a3b8" }}>done</span>
    </CircularProgress>
  ),
};

export const Zero: Story = {
  args: { value: 0, showValue: true, size: "md" },
};

export const Complete: Story = {
  args: { value: 100, showValue: true, size: "md", color: "#10b981" },
};

export const WithBoxProps: Story = {
  name: "With BoxProps (m)",
  args: { value: 55, showValue: true, m: 16 },
};
