import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  Modal,
  Button,
  EButtonType,
  EButtonSize,
} from "@stareezy-ui/components";
import type { ModalProps } from "@stareezy-ui/components";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "full"],
    },
    closeOnBackdrop: { control: "boolean" },
    showCloseButton: { control: "boolean" },
    title: { control: "text" },
    onClose: { action: "closed" },
  },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Modal>;

type ModalDemoProps = Omit<ModalProps, "open" | "onClose">;

function ModalDemo({
  size = "md",
  title = "Modal Title",
  ...props
}: ModalDemoProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        text="Open Modal"
        type={EButtonType.Primary}
        size={EButtonSize.MD}
        onPress={() => setOpen(true)}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        title={title}
        {...props}
      >
        <p
          style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#515253" }}
        >
          This is the modal body content. You can put anything here — forms,
          images, lists, or any other React nodes.
        </p>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo title="Default Modal" />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <ModalDemo key={s} size={s} title={`${s.toUpperCase()} Modal`} />
      ))}
    </div>
  ),
};

export const WithFooter: Story = {
  name: "With Footer",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button
          text="Open with Footer"
          type={EButtonType.Primary}
          size={EButtonSize.MD}
          onPress={() => setOpen(true)}
        />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          footer={
            <div
              style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
              <Button
                text="Cancel"
                type={EButtonType.Secondary}
                size={EButtonSize.SM}
                onPress={() => setOpen(false)}
              />
              <Button
                text="Confirm"
                type={EButtonType.Primary}
                size={EButtonSize.SM}
                onPress={() => setOpen(false)}
              />
            </div>
          }
        >
          <p style={{ margin: 0, fontSize: 14, color: "#515253" }}>
            Are you sure you want to proceed?
          </p>
        </Modal>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  name: "No Close Button",
  render: () => <ModalDemo title="No Close Button" showCloseButton={false} />,
};
