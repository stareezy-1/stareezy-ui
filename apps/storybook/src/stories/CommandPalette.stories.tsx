import type { Meta, StoryObj } from "@storybook/react";
import { CommandPalette } from "@stareezy-ui/components";
import type { CommandItem } from "@stareezy-ui/components";

const SAMPLE_ITEMS: CommandItem[] = [
  { id: "1", label: "Go to Installation", onSelect: () => {} },
  { id: "2", label: "Go to Components", onSelect: () => {} },
  { id: "3", label: "Open Token Explorer", onSelect: () => {} },
  { id: "4", label: "View Storybook", onSelect: () => {} },
  { id: "5", label: "Read Migration Guide", onSelect: () => {} },
];

const meta: Meta<typeof CommandPalette> = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof CommandPalette>;

export const Open: Story = {
  args: {
    items: SAMPLE_ITEMS,
    onClose: () => {},
    placeholder: "Search commands...",
  },
  parameters: {
    layout: "fullscreen",
  },
};
