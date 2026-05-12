/**
 * Text stories — covers all major ETextType variants, EFontStyle modifiers,
 * emptyState fallback, and color override.
 *
 * Token props: `type` drives fontFamily/fontSize/fontWeight tokens.
 * Resolved token values are shown in argTypes descriptions.
 *
 * Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Text, ETextType, EFontStyle } from "@stareezy-ui/components";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: Object.values(ETextType),
      description:
        "Text variant. Each variant maps to typography tokens: fontFamily (e.g. fontFamily-montserratBold), fontSize (e.g. fontSize-md = 16), fontWeight.",
      table: {
        type: { summary: "ETextType" },
        defaultValue: { summary: ETextType.MParagraphRegular },
      },
    },
    text: {
      control: "text",
      description: "Text content. When empty string, renders emptyState instead.",
    },
    emptyState: {
      control: "text",
      description: "Fallback rendered when text is an empty string.",
    },
    color: {
      control: "color",
      description:
        "Override text color. Default uses token raisinBlack-800 (#0F1010) via themed colors.",
    },
    fontStyle: {
      control: "select",
      options: [undefined, ...Object.values(EFontStyle)],
      description: "Font style modifier: italic, underline, or italic-underline.",
      table: { type: { summary: "EFontStyle" } },
    },
    numberOfLines: {
      control: "number",
      description: "Clamp text to N lines (RN: numberOfLines, web: line-clamp).",
    },
    accessibilityLabel: {
      control: "text",
      description: "Accessible label (aria-label on web).",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    text: "The quick brown fox jumps over the lazy dog.",
    type: ETextType.MParagraphRegular,
  },
};

// ── Display variants ──────────────────────────────────────────────────────────

export const LargeDisplay: Story = {
  name: "Display / L",
  args: {
    text: "Large Display",
    type: ETextType.LDisplay,
  },
};

export const MediumDisplay: Story = {
  name: "Display / M",
  args: {
    text: "Medium Display",
    type: ETextType.MDisplay,
  },
};

export const SmallDisplay: Story = {
  name: "Display / S",
  args: {
    text: "Small Display",
    type: ETextType.SDisplay,
  },
};

// ── Heading variants ──────────────────────────────────────────────────────────

export const XLHeadingBold: Story = {
  name: "Heading / XL Bold",
  args: {
    text: "XL Heading Bold",
    type: ETextType.XLHeadingBold,
  },
};

export const LHeadingSemiBold: Story = {
  name: "Heading / L SemiBold",
  args: {
    text: "L Heading SemiBold",
    type: ETextType.LHeadingSemiBold,
  },
};

export const MHeadingBold: Story = {
  name: "Heading / M Bold",
  args: {
    text: "M Heading Bold",
    type: ETextType.MHeadingBold,
  },
};

export const SHeadingSemiBold: Story = {
  name: "Heading / S SemiBold",
  args: {
    text: "S Heading SemiBold",
    type: ETextType.SHeadingSemiBold,
  },
};

// ── Paragraph variants ────────────────────────────────────────────────────────

export const LParagraphRegular: Story = {
  name: "Paragraph / L Regular",
  args: {
    text: "Large paragraph regular text. Token: fontFamily-nunitoRegular, fontSize 18px.",
    type: ETextType.LParagraphRegular,
  },
};

export const MParagraphMedium: Story = {
  name: "Paragraph / M Medium",
  args: {
    text: "Medium paragraph medium weight. Token: fontFamily-nunitoMedium, fontSize 16px.",
    type: ETextType.MParagraphMedium,
  },
};

export const SParagraphBold: Story = {
  name: "Paragraph / S Bold",
  args: {
    text: "Small paragraph bold. Token: fontFamily-nunitoBold, fontSize 14px.",
    type: ETextType.SParagraphBold,
  },
};

export const XSParagraphRegular: Story = {
  name: "Paragraph / XS Regular",
  args: {
    text: "Extra small paragraph. Token: fontFamily-nunitoRegular, fontSize 12px.",
    type: ETextType.XSParagraphRegular,
  },
};

// ── Label variants ────────────────────────────────────────────────────────────

export const XLLabel: Story = {
  name: "Label / XL",
  args: {
    text: "XL Label",
    type: ETextType.XLLabel,
  },
};

export const MLabel: Story = {
  name: "Label / M",
  args: {
    text: "M Label",
    type: ETextType.MLabel,
  },
};

export const XSLabel: Story = {
  name: "Label / XS",
  args: {
    text: "XS Label",
    type: ETextType.XSLabel,
  },
};

// ── Font style modifiers ──────────────────────────────────────────────────────

export const Italic: Story = {
  args: {
    text: "Italic text",
    type: ETextType.MParagraphRegular,
    fontStyle: EFontStyle.ITALIC,
  },
};

export const Underline: Story = {
  args: {
    text: "Underlined text",
    type: ETextType.MParagraphRegular,
    fontStyle: EFontStyle.UNDERLINE,
  },
};

export const ItalicUnderline: Story = {
  name: "Italic + Underline",
  args: {
    text: "Italic and underlined",
    type: ETextType.MParagraphRegular,
    fontStyle: EFontStyle.ITALIC_UNDERLINE,
  },
};

// ── Color override ────────────────────────────────────────────────────────────

export const ColorOverride: Story = {
  name: "Color Override",
  args: {
    text: "Custom color text",
    type: ETextType.MParagraphRegular,
    color: "#024CCE",
  },
};

// ── Empty state ───────────────────────────────────────────────────────────────

export const EmptyStateFallback: Story = {
  name: "Empty State Fallback",
  args: {
    text: "",
    emptyState: "No content available",
    type: ETextType.MParagraphRegular,
  },
};

// ── Button label ──────────────────────────────────────────────────────────────

export const ButtonLabel: Story = {
  name: "Button Label",
  args: {
    text: "Button Label",
    type: ETextType.button,
  },
};
