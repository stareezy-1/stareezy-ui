/**
 * Button stories — covers all EButtonType variants, EButtonSize values,
 * loading/disabled states, and icon-only mode.
 *
 * Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Button, EButtonType, EButtonSize } from "@stareezy-ui/components";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: Object.values(EButtonType),
      description:
        "Button variant. Primary uses token celurenBlue-500 (#024CCE) as background and neutral-0 (#ffffff) as text.",
      table: {
        type: { summary: "EButtonType" },
        defaultValue: { summary: EButtonType.Primary },
      },
    },
    size: {
      control: "select",
      options: Object.values(EButtonSize),
      description: "Button size — controls padding via spacing tokens.",
      table: { type: { summary: "EButtonSize" } },
    },
    text: {
      control: "text",
      description: "Button label text.",
    },
    loading: {
      control: "boolean",
      description:
        "When true, renders an ActivityIndicator. Sets aria-busy=true. Token: raisinBlack-300 for spinner color.",
    },
    disabled: {
      control: "boolean",
      description:
        "When true, applies disabled styling. Token: beauBlue-50 (#FAFBFF) background, beauBlue-400 (#D9E6F0) text. Sets aria-disabled=true.",
    },
    fullWidth: {
      control: "boolean",
      description: "Stretch button to 100% width.",
    },
    accessibilityLabel: {
      control: "text",
      description: "Accessible label (aria-label on web).",
    },
    testID: {
      control: "text",
      description: "Test identifier — also used as aria-label fallback.",
    },
    onPress: { action: "pressed" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: "Click me",
    type: EButtonType.Primary,
  },
};

export const Primary: Story = {
  args: { text: "Primary", type: EButtonType.Primary },
};

export const Secondary: Story = {
  args: { text: "Secondary", type: EButtonType.Secondary },
};

export const Tertiary: Story = {
  args: { text: "Tertiary", type: EButtonType.Tertiary },
};

export const Link: Story = {
  args: { text: "Link", type: EButtonType.Link },
};

export const Transparent: Story = {
  args: { text: "Transparent", type: EButtonType.Transparent },
};

export const WithBorder: Story = {
  args: { text: "With Border", type: EButtonType.WithBorder },
};

export const SizeSM: Story = {
  name: "Size / SM",
  args: {
    text: "Small",
    type: EButtonType.Primary,
    size: EButtonSize.SM,
    fullWidth: false,
  },
};

export const SizeMD: Story = {
  name: "Size / MD",
  args: {
    text: "Medium",
    type: EButtonType.Primary,
    size: EButtonSize.MD,
    fullWidth: false,
  },
};

export const SizeLG: Story = {
  name: "Size / LG",
  args: {
    text: "Large",
    type: EButtonType.Primary,
    size: EButtonSize.LG,
    fullWidth: false,
  },
};

export const SizeXL: Story = {
  name: "Size / XL",
  args: {
    text: "Extra Large",
    type: EButtonType.Primary,
    size: EButtonSize.XL,
    fullWidth: true,
  },
};

export const SizeXXL: Story = {
  name: "Size / XXL",
  args: {
    text: "Double XL",
    type: EButtonType.Primary,
    size: EButtonSize.XXL,
    fullWidth: false,
  },
};

export const LoadingState: Story = {
  name: "Loading",
  args: { text: "Loading", type: EButtonType.Primary, loading: true },
};

export const Disabled: Story = {
  args: { text: "Disabled", type: EButtonType.Primary, disabled: true },
};

export const DisabledSecondary: Story = {
  name: "Disabled / Secondary",
  args: {
    text: "Disabled Secondary",
    type: EButtonType.Secondary,
    disabled: true,
  },
};

export const IconOnly: Story = {
  name: "Icon Only",
  args: {
    icon: "★",
    type: EButtonType.Primary,
    accessibilityLabel: "Favourite",
  },
};
