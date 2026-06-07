/**
 * Drawer stories — covers all anchor positions, open/close states, and title.
 * Requirements: 11.8
 */

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer, Button, EButtonType } from "@quasify-ui/components";
import type { DrawerAnchor } from "@quasify-ui/components";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    anchor: {
      control: "select",
      options: ["left", "right", "bottom"] satisfies DrawerAnchor[],
    },
    title: { control: "text" },
    open: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Controlled wrapper
const DrawerDemo = (
  args: Omit<React.ComponentProps<typeof Drawer>, "open" | "onClose"> & {
    anchor?: DrawerAnchor;
    title?: string;
    buttonLabel?: string;
  },
) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        text={args.buttonLabel ?? `Open ${args.anchor ?? "right"} drawer`}
        type={EButtonType.Primary}
        onPress={() => setOpen(true)}
      />
      <Drawer
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        title={args.title ?? "Drawer title"}
      >
        <p style={{ margin: 0 }}>Drawer content goes here.</p>
        <p>Use Tab to cycle focus within this panel.</p>
        <Button
          text="Close"
          type={EButtonType.Secondary}
          onPress={() => setOpen(false)}
        />
      </Drawer>
    </>
  );
};

export const RightDefault: Story = {
  name: "Right (default)",
  render: () => <DrawerDemo anchor="right" />,
};

export const Left: Story = {
  render: () => <DrawerDemo anchor="left" title="Left drawer" />,
};

export const Bottom: Story = {
  render: () => <DrawerDemo anchor="bottom" title="Bottom sheet" />,
};

export const NoTitle: Story = {
  name: "Without title",
  render: () => (
    <DrawerDemo
      anchor="right"
      title={undefined}
      buttonLabel="Open (no title)"
    />
  ),
};

export const WithLongContent: Story = {
  name: "Long scrollable content",
  render: () => {
    const DrawerLong = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button
            text="Open drawer with long content"
            type={EButtonType.Primary}
            onPress={() => setOpen(true)}
          />
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            title="Scrollable content"
            anchor="right"
          >
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} style={{ margin: "8px 0" }}>
                Content row {i + 1} — scroll to see more.
              </p>
            ))}
          </Drawer>
        </>
      );
    };
    return <DrawerLong />;
  },
};
