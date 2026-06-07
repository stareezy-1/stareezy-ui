import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "@quasify-ui/components";
import type { AccordionItem } from "@quasify-ui/components";

const ITEMS: AccordionItem[] = [
  {
    key: "1",
    title: "What is Quasify UI?",
    content:
      "Quasify UI is a fully typed, cross-platform design token system and component library for React Native and web.",
  },
  {
    key: "2",
    title: "How do tokens work?",
    content:
      "Every color, spacing, and radius value is a typed Token<T> object. The runtime resolves tokens in O(1) via a Map lookup.",
  },
  {
    key: "3",
    title: "Is it cross-platform?",
    content:
      "Yes — the same component API works on web (renders HTML) and React Native (renders native views). One source of truth.",
    icon: "✦",
  },
  {
    key: "4",
    title: "Disabled item",
    content: "This item cannot be opened.",
    disabled: true,
  },
];

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "separated"],
      description: "Visual style variant.",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple items open simultaneously.",
    },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: { items: ITEMS, variant: "default" },
};

export const Bordered: Story = {
  args: { items: ITEMS, variant: "bordered" },
};

export const Separated: Story = {
  args: { items: ITEMS, variant: "separated" },
};

export const Multiple: Story = {
  args: { items: ITEMS, multiple: true, defaultOpen: ["1", "2"] },
};

export const DefaultOpen: Story = {
  name: "Default Open",
  args: { items: ITEMS, defaultOpen: ["1"] },
};

export const WithBoxProps: Story = {
  name: "With BoxProps (p, rounded, bg)",
  args: {
    items: ITEMS.slice(0, 2),
    variant: "separated",
    p: 16,
    rounded: 16,
  },
};
