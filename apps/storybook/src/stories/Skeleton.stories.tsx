import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@stareezy-ui/components";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["rectangular", "text", "circular", "rounded"],
    },
    animated: { control: "boolean" },
    lines: { control: "number" },
    baseColor: { control: "color" },
    highlightColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: { variant: "rectangular", style: { width: 320, height: 20 } },
};

export const Text: Story = {
  args: { variant: "text", lines: 3, style: { width: 320 } },
};

export const Circular: Story = {
  args: { variant: "circular", style: { width: 48, height: 48 } },
};

export const Rounded: Story = {
  args: { variant: "rounded", style: { width: 320, height: 80 } },
};

export const CardSkeleton: Story = {
  name: "Card Skeleton",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: 320,
        padding: 16,
        border: "1px solid #E3ECF4",
        borderRadius: 12,
      }}
    >
      <Skeleton variant="rounded" style={{ width: "100%", height: 160 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Skeleton variant="circular" style={{ width: 36, height: 36 }} />
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}
        >
          <Skeleton variant="text" style={{ width: "70%", height: "1em" }} />
          <Skeleton variant="text" style={{ width: "50%", height: "0.8em" }} />
        </div>
      </div>
      <Skeleton variant="text" lines={3} style={{ width: "100%" }} />
    </div>
  ),
};

export const NotAnimated: Story = {
  name: "Not Animated",
  args: {
    variant: "rectangular",
    animated: false,
    style: { width: 320, height: 20 },
  },
};

export const WithBoxProps: Story = {
  name: "With BoxProps (m, rounded)",
  args: {
    variant: "rectangular",
    m: 16,
    rounded: 12,
    style: { width: 280, height: 24 },
  },
};
