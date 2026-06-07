import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FileDropZone } from "@quasify-ui/components";

const meta: Meta<typeof FileDropZone> = {
  title: "Components/FileDropZone",
  component: FileDropZone,
  tags: ["autodocs"],
  argTypes: {
    multiple: { control: "boolean" },
    accept: { control: "text" },
    label: { control: "text" },
    hint: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof FileDropZone>;

export const Default: Story = {
  args: {
    onFiles: (files) => console.log("Files:", files),
    label: "Drop files here or click to browse",
    hint: "Supports PDF, PNG, JPG up to 10MB",
    multiple: false,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: "#050505" }}>
        <Story />
      </div>
    ),
  ],
};

export const MultipleFiles: Story = {
  name: "Multiple Files",
  args: {
    onFiles: (files) => console.log("Files:", files),
    label: "Drop multiple files here",
    hint: "Select up to 10 files",
    multiple: true,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: "#050505" }}>
        <Story />
      </div>
    ),
  ],
};

export const PDFOnly: Story = {
  name: "PDF Only",
  args: {
    onFiles: (files) => console.log("Files:", files),
    label: "Drop PDF files here",
    hint: "Only PDF files accepted",
    accept: ".pdf",
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: "#050505" }}>
        <Story />
      </div>
    ),
  ],
};
