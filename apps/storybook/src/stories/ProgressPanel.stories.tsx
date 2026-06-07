import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ProgressPanel } from "@quasify-ui/components";
import type { ProgressStep } from "@quasify-ui/components";

const STEPS_0: ProgressStep[] = [
  { id: "1", label: "Upload file", status: "pending" },
  { id: "2", label: "Process document", status: "pending" },
  { id: "3", label: "Generate output", status: "pending" },
  { id: "4", label: "Download ready", status: "pending" },
];

const STEPS_50: ProgressStep[] = [
  { id: "1", label: "Upload file", status: "complete" },
  { id: "2", label: "Process document", status: "active" },
  { id: "3", label: "Generate output", status: "pending" },
  { id: "4", label: "Download ready", status: "pending" },
];

const STEPS_100: ProgressStep[] = [
  { id: "1", label: "Upload file", status: "complete" },
  { id: "2", label: "Process document", status: "complete" },
  { id: "3", label: "Generate output", status: "complete" },
  { id: "4", label: "Download ready", status: "complete" },
];

const meta: Meta<typeof ProgressPanel> = {
  title: "Components/ProgressPanel",
  component: ProgressPanel,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ProgressPanel>;

export const ZeroPercent: Story = {
  name: "0% — Not started",
  args: { steps: STEPS_0, currentStep: 0 },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: "#050505", maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const FiftyPercent: Story = {
  name: "50% — In progress",
  args: { steps: STEPS_50, currentStep: 1 },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: "#050505", maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const HundredPercent: Story = {
  name: "100% — Complete",
  args: { steps: STEPS_100, currentStep: 3 },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: "#050505", maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};
