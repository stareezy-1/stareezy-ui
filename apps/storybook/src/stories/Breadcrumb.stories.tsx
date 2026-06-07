/**
 * Breadcrumb stories — covers navigation crumbs, separators, and link/static variants.
 * Requirements: 11.8
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "@quasify-ui/components";
import type { BreadcrumbItem } from "@quasify-ui/components";

const ITEMS: BreadcrumbItem[] = [
  { label: "Home", href: "#" },
  { label: "Components", href: "#" },
  { label: "Breadcrumb" },
];

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {
    separator: {
      control: "text",
      description: "Custom separator between crumbs",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: { items: ITEMS },
};

export const CustomSeparator: Story = {
  name: "Custom separator (›)",
  args: { items: ITEMS, separator: "›" },
};

export const ArrowSeparator: Story = {
  name: "Custom separator (→)",
  args: { items: ITEMS, separator: "→" },
};

export const TwoLevels: Story = {
  name: "Two levels",
  args: {
    items: [{ label: "Home", href: "#" }, { label: "Current page" }],
  },
};

export const SingleLevel: Story = {
  name: "Single level (root only)",
  args: { items: [{ label: "Home" }] },
};

export const LongPath: Story = {
  name: "Long path",
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Products", href: "#" },
      { label: "Electronics", href: "#" },
      { label: "Phones", href: "#" },
      { label: "iPhone 16 Pro" },
    ],
  },
};

export const WithButtonCrumbs: Story = {
  name: "With onClick handlers",
  args: {
    items: [
      { label: "Home", onClick: () => alert("Home clicked") },
      { label: "Section", onClick: () => alert("Section clicked") },
      { label: "Current page" },
    ],
  },
};
