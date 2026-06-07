import type { Meta, StoryObj } from "@storybook/react";
import { Resizer } from "@quasify-ui/components";

const meta: Meta<typeof Resizer> = {
  title: "Components/Resizer",
  component: Resizer,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["horizontal", "vertical", "both"],
    },
    defaultWidth: { control: "number" },
    defaultHeight: { control: "number" },
    minWidth: { control: "number" },
    maxWidth: { control: "number" },
    onResize: { action: "resized" },
  },
};

export default meta;
type Story = StoryObj<typeof Resizer>;

const Content = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, #E6EDFA, #CCDBF5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
      color: "#024CCE",
      fontWeight: 600,
      fontFamily: "Inter, system-ui, sans-serif",
      borderRadius: 8,
    }}
  >
    Drag the handle to resize
  </div>
);

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    defaultWidth: 300,
    defaultHeight: 120,
    children: <Content />,
    style: {
      border: "1px solid #D9E6F0",
      borderRadius: 10,
      overflow: "hidden",
    },
  },
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
    defaultWidth: 400,
    defaultHeight: 150,
    children: <Content />,
    style: {
      border: "1px solid #D9E6F0",
      borderRadius: 10,
      overflow: "hidden",
    },
  },
};

export const Both: Story = {
  args: {
    direction: "both",
    defaultWidth: 300,
    defaultHeight: 180,
    children: <Content />,
    style: {
      border: "1px solid #D9E6F0",
      borderRadius: 10,
      overflow: "hidden",
    },
  },
};

export const WithBoxProps: Story = {
  name: "With BoxProps (p, bg)",
  args: {
    direction: "horizontal",
    defaultWidth: 280,
    defaultHeight: 100,
    p: 8,
    bg: "#f8fafc",
    rounded: 12,
    children: <Content />,
  },
};
