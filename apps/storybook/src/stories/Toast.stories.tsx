import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Toast } from "@stareezy-ui/components";
import type { ToastVariant } from "@stareezy-ui/components";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "error", "warning", "info"],
    },
    message: { control: "text" },
    duration: { control: "number" },
  },
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    variant: "success",
    message: "Operation completed successfully!",
    onDismiss: () => {},
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    message: "Something went wrong. Please try again.",
    onDismiss: () => {},
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    message: "This action cannot be undone.",
    onDismiss: () => {},
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    message: "A new version is available.",
    onDismiss: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 24,
        background: "#050505",
      }}
    >
      {(["success", "error", "warning", "info"] as ToastVariant[]).map((v) => (
        <Toast
          key={v}
          variant={v}
          message={`This is a ${v} notification`}
          onDismiss={() => {}}
          duration={0}
        />
      ))}
    </div>
  ),
};
