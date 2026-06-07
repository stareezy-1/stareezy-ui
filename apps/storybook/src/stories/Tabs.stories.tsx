/**
 * Tabs stories — covers all variants, sizes, interaction states (disabled, badge).
 * Requirements: 11.8
 */

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "@stareezy-ui/components";
import type { TabItem } from "@stareezy-ui/components";

const content = (text: string) => (
  <p style={{ margin: 0, fontSize: 14 }}>{text}</p>
);

const ITEMS: TabItem[] = [
  {
    key: "overview",
    label: "Overview",
    content: content("Overview content goes here."),
  },
  {
    key: "specs",
    label: "Specs",
    content: content("Technical specifications."),
  },
  {
    key: "reviews",
    label: "Reviews",
    badge: "12",
    content: content("User reviews."),
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
  name: "Full width",
  args: {
    items: ITEMS,
    variant: "underline",
    fullWidth: true,
    defaultActiveKey: "overview",
  },
};

export const WithBadge: Story = {
  name: "With badge count",
  args: { items: ITEMS, variant: "pills", defaultActiveKey: "reviews" },
};

export const DisabledTab: Story = {
  name: "With disabled tab",
  args: { items: ITEMS, variant: "underline", defaultActiveKey: "overview" },
};

export const WithIcons: Story = {
  name: "With icons",
  args: {
    items: [
      {
        key: "home",
        label: "Home",
        icon: "⌂",
        content: content("Home content"),
      },
      {
        key: "search",
        label: "Search",
        icon: "⌕",
        content: content("Search content"),
      },
      {
        key: "profile",
        label: "Profile",
        icon: "◉",
        content: content("Profile content"),
      },
    ],
    variant: "pills",
    defaultActiveKey: "home",
  },
};

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {(["underline", "pills", "card"] as const).map((v) => (
        <div key={v}>
          <p
            style={{
              fontSize: 12,
              marginBottom: 8,
              textTransform: "capitalize",
            }}
          >
            {v}
          </p>
          <Tabs items={ITEMS} variant={v} defaultActiveKey="overview" />
        </div>
      ))}
    </div>
  ),
};
