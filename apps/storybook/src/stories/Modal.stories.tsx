/**
 * Modal stories — covers all sizes, footer, interaction states (focus, close).
 * Requirements: 11.8
 */

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
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

type ModalDemoProps = Omit<ModalProps, "open" | "onClose"> & {
  buttonLabel?: string;
};

function ModalDemo({
  size = "md",
  title = "Modal Title",
  buttonLabel,
  ...props
}: ModalDemoProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        text={buttonLabel ?? "Open Modal"}
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
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
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

export const SizeXS: Story = {
  name: "Size / XS",
  render: () => <ModalDemo size="xs" title="XS Modal" buttonLabel="Open XS" />,
};
export const SizeSM: Story = {
  name: "Size / SM",
  render: () => <ModalDemo size="sm" title="SM Modal" buttonLabel="Open SM" />,
};
export const SizeMD: Story = {
  name: "Size / MD",
  render: () => <ModalDemo size="md" title="MD Modal" buttonLabel="Open MD" />,
};
export const SizeLG: Story = {
  name: "Size / LG",
  render: () => <ModalDemo size="lg" title="LG Modal" buttonLabel="Open LG" />,
};
export const SizeXL: Story = {
  name: "Size / XL",
  render: () => <ModalDemo size="xl" title="XL Modal" buttonLabel="Open XL" />,
};
export const FullScreen: Story = {
  name: "Size / Full",
  render: () => (
    <ModalDemo size="full" title="Full Screen" buttonLabel="Open Full" />
  ),
};

export const WithFooter: Story = {
  name: "With footer actions",
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
          <p style={{ margin: 0, fontSize: 14 }}>
            Are you sure you want to proceed?
          </p>
        </Modal>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  name: "No close button",
  render: () => (
    <ModalDemo
      title="No Close Button"
      showCloseButton={false}
      buttonLabel="Open (no ✕)"
    />
  ),
};

export const NoBackdropClose: Story = {
  name: "Backdrop click disabled",
  render: () => (
    <ModalDemo
      title="Persistent Modal"
      closeOnBackdrop={false}
      buttonLabel="Open (persistent)"
    />
  ),
};
