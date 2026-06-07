import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@stareezy-ui/components";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    variant: { control: "select", options: ["ring", "dots", "pulse"] },
    color: { control: "color" },
    trackColor: { control: "color" },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { size: "md" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <Spinner key={s} size={s} />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Spinner variant="ring" size="lg" />
        <span style={{ fontSize: 12, color: "#7D868E" }}>ring</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Spinner variant="dots" size="lg" />
        <span style={{ fontSize: 12, color: "#7D868E" }}>dots</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Spinner variant="pulse" size="lg" />
        <span style={{ fontSize: 12, color: "#7D868E" }}>pulse</span>
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  name: "Custom Color",
  args: { size: "lg", color: "#8b5cf6", trackColor: "#ede9fe" },
};

export const WithBoxProps: Story = {
  name: "With BoxProps (p, bg, rounded)",
  args: { size: "md", p: 16, bg: "#f0f9ff", rounded: 12 },
};
