import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@stareezy-ui/components";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    shape: {
      control: "select",
      options: ["circle", "rounded", "square"],
    },
    status: {
      control: "select",
      options: [undefined, "online", "offline", "away", "busy"],
    },
    name: { control: "text" },
    src: { control: "text" },
    alt: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithInitials: Story = {
  args: { name: "Bintang Rekosistem", size: "md" },
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "User avatar",
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
        <Avatar key={s} name="Bintang R" size={s} />
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Avatar name="Circle" shape="circle" size="lg" />
      <Avatar name="Rounded" shape="rounded" size="lg" />
      <Avatar name="Square" shape="square" size="lg" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Avatar name="Online" size="lg" status="online" />
      <Avatar name="Offline" size="lg" status="offline" />
      <Avatar name="Away" size="lg" status="away" />
      <Avatar name="Busy" size="lg" status="busy" />
    </div>
  ),
};

export const BrokenImage: Story = {
  name: "Broken Image (fallback)",
  args: {
    src: "https://broken.url/img.png",
    name: "Fallback User",
    size: "lg",
  },
};

export const WithBoxProps: Story = {
  name: "With BoxProps (m, opacity)",
  args: { name: "Box Props", size: "lg", style: { opacity: 0.7 } },
};
