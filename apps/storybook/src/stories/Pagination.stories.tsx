/**
 * Pagination stories — covers page variants, sizes, and disabled states.
 * Requirements: 11.8
 */

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "@stareezy-ui/components";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    totalPages: { control: { type: "number", min: 1 } },
    showPrevNext: { control: "boolean" },
    siblingCount: { control: { type: "number", min: 1, max: 9 } },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// Controlled wrapper so controls actually work
const Controlled = (args: React.ComponentProps<typeof Pagination>) => {
  const [page, setPage] = useState(args.page ?? 1);
  return <Pagination {...args} page={page} onPageChange={setPage} />;
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: { page: 1, totalPages: 10 },
};

export const MiddlePage: Story = {
  name: "Middle page",
  render: (args) => <Controlled {...args} />,
  args: { page: 5, totalPages: 10 },
};

export const LastPage: Story = {
  name: "Last page",
  render: (args) => <Controlled {...args} />,
  args: { page: 10, totalPages: 10 },
};

export const FewPages: Story = {
  name: "Few pages (≤ sibling count)",
  render: (args) => <Controlled {...args} />,
  args: { page: 2, totalPages: 4 },
};

export const ManyPages: Story = {
  name: "Many pages (ellipsis)",
  render: (args) => <Controlled {...args} />,
  args: { page: 15, totalPages: 50 },
};

export const NoPrevNext: Story = {
  name: "Without prev/next buttons",
  render: (args) => <Controlled {...args} />,
  args: { page: 3, totalPages: 8, showPrevNext: false },
};

export const SinglePage: Story = {
  name: "Single page (both nav disabled)",
  render: (args) => <Controlled {...args} />,
  args: { page: 1, totalPages: 1 },
};
