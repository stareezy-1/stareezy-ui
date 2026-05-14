import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "@stareezy-ui/components";
import type { TabItem } from "@stareezy-ui/components";

const ITEMS: TabItem[] = [
  {
    key: "overview",
    label: "Overview",
    content: (
      <p style={{ margin: 0, fontSize: 14, color: "#515253" }}>
        Overview content goes here.
      </p>
    ),
  },
  {
    key: "specs",
    label: "Specs",
    content: (
      <p style={{ margin: 0, fontSize: 14, color: "#515253" }}>
        Technical specifications.
      </p>
    ),
  },
  {
    key: "reviews",
    label: "Reviews",
    badge: "12",
    content: (
      <p style={{ margin: 0, fontSize: 14, color: "#515253" }}>User reviews.</p>
    ),
  },
  { key: "disabled", label: "Disabled", disabled: true, content: null },
];

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["underline", "pills", "card"] },
    fullWidth: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Underline: Story = {
  args: { items: ITEMS, variant: "underline", defaultActiveKey: "overview" },
};

export const Pills: Story = {
  args: { items: ITEMS, variant: "pills", defaultActiveKey: "overview" },
};

export const Card: Story = {
  args: { items: ITEMS, variant: "card", defaultActiveKey: "overview" },
};

export const FullWidth: Story = {
  name: "Full Width",
  args: {
    items: ITEMS,
    variant: "underline",
    fullWidth: true,
    defaultActiveKey: "overview",
  },
};

export const WithIcons: Story = {
  name: "With Icons",
  args: {
    items: [
      {
        key: "home",
        label: "Home",
        icon: "⌂",
        content: <p style={{ margin: 0, fontSize: 14 }}>Home content</p>,
      },
      {
        key: "search",
        label: "Search",
        icon: "⌕",
        content: <p style={{ margin: 0, fontSize: 14 }}>Search content</p>,
      },
      {
        key: "profile",
        label: "Profile",
        icon: "◉",
        content: <p style={{ margin: 0, fontSize: 14 }}>Profile content</p>,
      },
    ],
    variant: "pills",
    defaultActiveKey: "home",
  },
};

export const WithBoxProps: Story = {
  name: "With BoxProps (p, bg, rounded)",
  args: {
    items: ITEMS,
    variant: "underline",
    defaultActiveKey: "overview",
    p: 16,
    bg: "#f8fafc",
    rounded: 12,
  },
};
