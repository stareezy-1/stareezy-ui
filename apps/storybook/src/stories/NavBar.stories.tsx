import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { NavBar } from "@quasify-ui/components";

const meta: Meta<typeof NavBar> = {
  title: "Components/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  argTypes: {
    scrolled: { control: "boolean" },
  },
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  args: {
    scrolled: false,
    logo: <span style={{ fontWeight: 800, color: "#00ff88" }}>◉ Quasify</span>,
    links: (
      <div style={{ display: "flex", gap: 4 }}>
        {["Docs", "Components", "Tokens"].map((l) => (
          <a
            key={l}
            href="#"
            style={{
              padding: "6px 12px",
              color: "#a0a0b8",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            {l}
          </a>
        ))}
      </div>
    ),
    actions: (
      <button
        style={{
          padding: "6px 14px",
          background: "#00ff88",
          color: "#050505",
          border: "none",
          borderRadius: 6,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Get Started
      </button>
    ),
  },
};

export const Scrolled: Story = {
  args: {
    ...Default.args,
    scrolled: true,
  },
};
