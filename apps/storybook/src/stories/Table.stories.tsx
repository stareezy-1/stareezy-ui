/**
 * Table stories — covers column definitions, row data, and caption.
 * Requirements: 11.8
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "@quasify-ui/components";
import type { TableColumn, TableRow } from "@quasify-ui/components";

const COLUMNS: TableColumn[] = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
  { key: "status", header: "Status", align: "center" },
  { key: "joined", header: "Joined", align: "right" },
];

const ROWS: TableRow[] = [
  { name: "Alice Chen", role: "Engineer", status: "Active", joined: "2022-03" },
  { name: "Bob Smith", role: "Designer", status: "Active", joined: "2021-11" },
  { name: "Carol Wu", role: "PM", status: "On leave", joined: "2023-01" },
  {
    name: "David Lee",
    role: "Engineer",
    status: "Inactive",
    joined: "2020-08",
  },
];

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    caption: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: { columns: COLUMNS, rows: ROWS },
};

export const WithCaption: Story = {
  name: "With caption",
  args: { columns: COLUMNS, rows: ROWS, caption: "Team Members" },
};

export const EmptyTable: Story = {
  name: "Empty rows",
  args: { columns: COLUMNS, rows: [], caption: "No results" },
};

export const FewColumns: Story = {
  name: "Two columns",
  args: {
    columns: [
      { key: "key", header: "Key" },
      { key: "value", header: "Value" },
    ],
    rows: [
      { key: "version", value: "1.0.0" },
      { key: "author", value: "Quasify-ui" },
      { key: "license", value: "MIT" },
    ],
    caption: "Package info",
  },
};

export const RightAligned: Story = {
  name: "Right-aligned numbers",
  args: {
    columns: [
      { key: "metric", header: "Metric" },
      { key: "value", header: "Value", align: "right" },
      { key: "delta", header: "Δ 30d", align: "right" },
    ],
    rows: [
      { metric: "Downloads", value: "48,210", delta: "+12%" },
      { metric: "Stars", value: "2,834", delta: "+5%" },
      { metric: "Issues", value: "17", delta: "-3" },
    ],
    caption: "Repository stats",
  },
};
