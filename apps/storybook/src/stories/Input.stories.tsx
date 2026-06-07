/**
 * Input stories — covers all EInputType variants, sizes, disabled/error states,
 * and icon/prefix slots.
 *
 * Token props: border color uses semantic tokens (borderDefault, borderDanger,
 * borderSecondary). Background uses bgDisabled / surface tokens.
 * Resolved token values are shown in argTypes descriptions.
 *
 * Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Input, EInputType, EInputSize } from "@quasify-ui/components";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: Object.values(EInputType),
      description:
        "Input variant. Controls keyboard type and formatting. " +
        "All variants share the same token-based border/background styling.",
      table: {
        type: { summary: "EInputType" },
        defaultValue: { summary: EInputType.TextField },
      },
    },
    size: {
      control: "select",
      options: Object.values(EInputSize),
      description:
        "Input size. Sm uses spacing-8 (8px) vertical padding; Md uses spacing-12 (12px).",
      table: {
        type: { summary: "EInputSize" },
        defaultValue: { summary: EInputSize.Md },
      },
    },
    label: {
      control: "text",
      description: "Label text rendered above the input.",
    },
    placeholder: {
      control: "text",
      description:
        "Placeholder text. Color uses token beauBlue-600 (#A6B3BD) via textPlaceholder.",
    },
    value: {
      control: "text",
      description: "Controlled input value.",
    },
    isDisabled: {
      control: "boolean",
      description:
        "Disabled state. Token: beauBlue-50 (#FAFBFF) background, beauBlue-400 (#D9E6F0) border. Sets aria-disabled=true.",
    },
    isRequired: {
      control: "boolean",
      description: "Marks the field as required — appends a red asterisk to the label.",
    },
    errorMessage: {
      control: "text",
      description:
        "Error message shown below the input. Triggers danger border token: crimsonRed-500 (#F2021F).",
    },
    leftPrefix: {
      control: "text",
      description: "Text prefix rendered inside the input on the left.",
    },
    rightPrefix: {
      control: "text",
      description: "Text prefix rendered inside the input on the right.",
    },
    multiline: {
      control: "boolean",
      description: "Render as a textarea (TextArea mode).",
    },
    maxLength: {
      control: "number",
      description: "Maximum character count.",
    },
    accessibilityLabel: {
      control: "text",
      description: "Accessible label (aria-label on web).",
    },
    testID: {
      control: "text",
      description: "Test identifier.",
    },
    onChangeText: { action: "changed" },
    onFocus: { action: "focused" },
    onBlur: { action: "blurred" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your name",
    type: EInputType.TextField,
  },
};

export const TextField: Story = {
  name: "Type / TextField",
  args: {
    label: "Text Field",
    placeholder: "Enter text",
    type: EInputType.TextField,
  },
};

export const TextArea: Story = {
  name: "Type / TextArea",
  args: {
    label: "Text Area",
    placeholder: "Enter multi-line text",
    type: EInputType.TextArea,
    multiline: true,
    numberOfLines: 4,
  },
};

export const SearchBar: Story = {
  name: "Type / SearchBar",
  args: {
    label: "Search",
    placeholder: "Search...",
    type: EInputType.SearchBar,
  },
};

export const PhoneNumber: Story = {
  name: "Type / PhoneNumber",
  args: {
    label: "Phone Number",
    placeholder: "08xx-xxxx-xxxx",
    type: EInputType.PhoneNumber,
    leftPrefix: "+62",
  },
};

export const MoneyAmount: Story = {
  name: "Type / MoneyAmount",
  args: {
    label: "Amount",
    placeholder: "0",
    type: EInputType.MoneyAmount,
    leftPrefix: "Rp",
  },
};

export const NumberInput: Story = {
  name: "Type / Number",
  args: {
    label: "Quantity",
    placeholder: "0",
    type: EInputType.Number,
  },
};

export const Percentage: Story = {
  name: "Type / Percentage",
  args: {
    label: "Percentage",
    placeholder: "0",
    type: EInputType.Percentage,
    rightPrefix: "%",
  },
};

export const Tonase: Story = {
  name: "Type / Tonase",
  args: {
    label: "Tonase",
    placeholder: "0",
    type: EInputType.Tonase,
    rightPrefix: "ton",
  },
};

export const SizeSm: Story = {
  name: "Size / Sm",
  args: {
    label: "Small Input",
    placeholder: "Small size",
    type: EInputType.TextField,
    size: EInputSize.Sm,
  },
};

export const SizeMd: Story = {
  name: "Size / Md",
  args: {
    label: "Medium Input",
    placeholder: "Medium size",
    type: EInputType.TextField,
    size: EInputSize.Md,
  },
};

export const WithValue: Story = {
  name: "State / With Value",
  args: {
    label: "Email",
    value: "user@example.com",
    type: EInputType.TextField,
  },
};

export const Required: Story = {
  name: "State / Required",
  args: {
    label: "Required Field",
    placeholder: "This field is required",
    type: EInputType.TextField,
    isRequired: true,
  },
};

export const Disabled: Story = {
  name: "State / Disabled",
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit",
    type: EInputType.TextField,
    isDisabled: true,
    value: "Read-only value",
  },
};

export const WithError: Story = {
  name: "State / Error",
  args: {
    label: "Email",
    placeholder: "Enter email",
    type: EInputType.TextField,
    value: "invalid-email",
    errorMessage: "Please enter a valid email address.",
  },
};

export const WithLeftIcon: Story = {
  name: "With Left Icon",
  args: {
    label: "Search",
    placeholder: "Search...",
    type: EInputType.SearchBar,
    leftIcon: "🔍",
  },
};

export const WithRightIcon: Story = {
  name: "With Right Icon",
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: EInputType.TextField,
    secureTextEntry: true,
    rightIcon: "👁",
  },
};
