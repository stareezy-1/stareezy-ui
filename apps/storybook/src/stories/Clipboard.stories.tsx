import type { Meta, StoryObj } from "@storybook/react";
import { Clipboard } from "@stareezy-ui/components";

const meta: Meta<typeof Clipboard> = {
  title: "Components/Clipboard",
  component: Clipboard,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    displayValue: { control: "text" },
    showValue: { control: "boolean" },
    successDuration: { control: "number" },
    onCopy: { action: "copied" },
  },
};

export default meta;
type Story = StoryObj<typeof Clipboard>;

export const Default: Story = {
  args: { value: "npm install @stareezy-ui/components" },
};

export const LongValue: Story = {
  name: "Long Value",
  args: {
    value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0",
  },
};

export const CustomDisplay: Story = {
  name: "Custom Display Value",
  args: {
    value: "secret-api-key-12345",
    displayValue: "sk-••••••••••••12345",
  },
};

export const HideValue: Story = {
  name: "Hide Value (icon only)",
  args: { value: "hidden-value", showValue: false },
};

export const WithBoxProps: Story = {
  name: "With BoxProps (p, rounded, bg)",
  args: {
    value: "pnpm add @stareezy-ui/tokens",
    p: 12,
    rounded: 12,
    bg: "#f0f9ff",
  },
};
