/**
 * Dropdown stories — covers all variants including async search and pagination.
 */

import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { Dropdown } from "@quasify-ui/components";
import type { DropdownOption } from "@quasify-ui/components";

// ── Fixtures ──────────────────────────────────────────────────────────────────

const FRAMEWORKS: DropdownOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "qwik", label: "Qwik" },
];

const GROUPED: DropdownOption[] = [
  { value: "js", label: "JavaScript", group: "Web" },
  { value: "ts", label: "TypeScript", group: "Web" },
  { value: "py", label: "Python", group: "Backend" },
  { value: "go", label: "Go", group: "Backend" },
  { value: "rust", label: "Rust", group: "Systems" },
  { value: "zig", label: "Zig", group: "Systems" },
];

// Simulate a large paginated dataset
const ALL_USERS: DropdownOption[] = Array.from({ length: 80 }, (_, i) => ({
  value: `user-${i + 1}`,
  label: `User ${i + 1}`,
  icon: <span style={{ fontSize: 14 }}>👤</span>,
}));

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    searchable: { control: "boolean" },
    multiple: { control: "boolean" },
    loading: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    errorMessage: { control: "text" },
    isRequired: { control: "boolean" },
    searchPlaceholder: { control: "text" },
    onEndReachedThreshold: {
      control: { type: "range", min: 0, max: 1, step: 0.05 },
    },
    onChange: { action: "changed" },
    onSearchChange: { action: "searchChanged" },
    onEndReached: { action: "endReached" },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// ── Basic ─────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    options: FRAMEWORKS,
    label: "Framework",
    placeholder: "Select a framework",
  },
};

export const Searchable: Story = {
  args: {
    options: FRAMEWORKS,
    label: "Search",
    searchable: true,
    placeholder: "Select a framework",
    searchPlaceholder: "Type to filter...",
  },
};

export const Multiple: Story = {
  args: {
    options: FRAMEWORKS,
    label: "Frameworks",
    multiple: true,
    placeholder: "Select multiple",
  },
};

export const Grouped: Story = {
  args: {
    options: GROUPED,
    label: "Language",
    placeholder: "Select language",
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}
    >
      <Dropdown
        options={FRAMEWORKS}
        size="sm"
        label="Small"
        placeholder="Small"
      />
      <Dropdown
        options={FRAMEWORKS}
        size="md"
        label="Medium"
        placeholder="Medium"
      />
      <Dropdown
        options={FRAMEWORKS}
        size="lg"
        label="Large"
        placeholder="Large"
      />
    </div>
  ),
};

export const WithError: Story = {
  name: "With Error",
  args: {
    options: FRAMEWORKS,
    label: "Required field",
    errorMessage: "Please select an option.",
    isRequired: true,
  },
};

export const Disabled: Story = {
  args: {
    options: FRAMEWORKS,
    label: "Disabled",
    disabled: true,
    defaultValue: "react",
  },
};

// ── Async search (controlled) ─────────────────────────────────────────────────

/**
 * Demonstrates controlled search — parent owns the search state and can
 * debounce + fire an API call. The dropdown never filters internally.
 */
export const AsyncSearch: Story = {
  name: "Async Search (controlled)",
  render: () => {
    const [searchValue, setSearchValue] = useState("");
    const [options, setOptions] = useState<DropdownOption[]>(FRAMEWORKS);
    const [loading, setLoading] = useState(false);

    // Simulate an API call whenever searchValue changes
    useEffect(() => {
      if (!searchValue) {
        setOptions(FRAMEWORKS);
        return;
      }
      setLoading(true);
      const timer = setTimeout(() => {
        // Simulate filtered API response
        setOptions(
          FRAMEWORKS.filter((f) =>
            String(f.label).toLowerCase().includes(searchValue.toLowerCase()),
          ),
        );
        setLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }, [searchValue]);

    return (
      <div style={{ width: 320 }}>
        <Dropdown
          options={options}
          label="Framework (async)"
          searchable
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          loading={loading}
          placeholder="Type to search..."
          searchPlaceholder="Search frameworks..."
        />
        <p
          style={{
            marginTop: 8,
            fontSize: 12,
            color: "#7D868E",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Search value: <code>{searchValue || "—"}</code>
        </p>
      </div>
    );
  },
};

// ── Paginated (onEndReached) ──────────────────────────────────────────────────

/**
 * Demonstrates pagination — onEndReached fires when the user scrolls near
 * the bottom. The parent appends more items to the options array.
 */
export const Paginated: Story = {
  name: "Paginated (onEndReached)",
  render: () => {
    const PAGE_SIZE = 15;
    const [page, setPage] = useState(1);
    const [options, setOptions] = useState<DropdownOption[]>(
      ALL_USERS.slice(0, PAGE_SIZE),
    );
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = () => {
      if (loading || !hasMore) return;
      setLoading(true);
      // Simulate network delay
      setTimeout(() => {
        const nextPage = page + 1;
        const nextItems = ALL_USERS.slice(0, nextPage * PAGE_SIZE);
        setOptions(nextItems);
        setPage(nextPage);
        setHasMore(nextPage * PAGE_SIZE < ALL_USERS.length);
        setLoading(false);
      }, 800);
    };

    return (
      <div style={{ width: 320 }}>
        <Dropdown
          options={options}
          label={`Users (${options.length} / ${ALL_USERS.length})`}
          placeholder="Select a user"
          searchable
          loading={loading}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          dropdownStyle={{ maxHeight: 240 }}
        />
        <p
          style={{
            marginTop: 8,
            fontSize: 12,
            color: "#7D868E",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Loaded {options.length} of {ALL_USERS.length} users.
          {!hasMore && " All loaded."}
        </p>
      </div>
    );
  },
};

// ── Async search + pagination ─────────────────────────────────────────────────

export const AsyncSearchWithPagination: Story = {
  name: "Async Search + Pagination",
  render: () => {
    const [searchValue, setSearchValue] = useState("");
    const [options, setOptions] = useState<DropdownOption[]>(
      ALL_USERS.slice(0, 15),
    );
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    // Reset on search change
    useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        const filtered = searchValue
          ? ALL_USERS.filter((u) =>
              String(u.label).toLowerCase().includes(searchValue.toLowerCase()),
            )
          : ALL_USERS;
        setOptions(filtered.slice(0, 15));
        setPage(1);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }, [searchValue]);

    const loadMore = () => {
      if (loading) return;
      setLoading(true);
      setTimeout(() => {
        const filtered = searchValue
          ? ALL_USERS.filter((u) =>
              String(u.label).toLowerCase().includes(searchValue.toLowerCase()),
            )
          : ALL_USERS;
        const nextPage = page + 1;
        setOptions(filtered.slice(0, nextPage * 15));
        setPage(nextPage);
        setLoading(false);
      }, 600);
    };

    return (
      <div style={{ width: 320 }}>
        <Dropdown
          options={options}
          label="Users"
          searchable
          searchValue={searchValue}
          onSearchChange={(v) => setSearchValue(v)}
          loading={loading}
          onEndReached={loadMore}
          onEndReachedThreshold={0.25}
          placeholder="Search users..."
          searchPlaceholder="Type a name..."
          dropdownStyle={{ maxHeight: 260 }}
        />
      </div>
    );
  },
};

// ── Style overrides ───────────────────────────────────────────────────────────

export const StyleOverrides: Story = {
  name: "Style Overrides",
  render: () => (
    <div style={{ width: 320 }}>
      <Dropdown
        options={FRAMEWORKS}
        label="Custom styled"
        placeholder="Pick one"
        dropdownStyle={{
          borderRadius: 16,
          boxShadow: "0 16px 48px rgba(2,76,206,0.18)",
          border: "1.5px solid #B3C9F0",
        }}
        listStyle={{ maxHeight: 200 }}
        contentContainerStyle={{ padding: "4px 0" }}
      />
    </div>
  ),
};

// ── Custom empty + footer ─────────────────────────────────────────────────────

export const CustomSlots: Story = {
  name: "Custom Empty + Footer",
  render: () => (
    <div style={{ width: 320 }}>
      <Dropdown
        options={[]}
        label="Custom slots"
        searchable
        placeholder="Search..."
        renderEmpty={
          <div style={{ padding: "20px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>🔍</div>
            <div
              style={{
                fontSize: 13,
                color: "#7D868E",
                fontFamily: "Inter, sans-serif",
              }}
            >
              No results. Try a different search.
            </div>
          </div>
        }
        renderFooter={
          <div
            style={{
              padding: "8px 14px",
              borderTop: "1px solid #E3ECF4",
              fontSize: 12,
              color: "#A6B3BD",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Showing results from API
          </div>
        }
      />
    </div>
  ),
};

// ── With BoxProps ─────────────────────────────────────────────────────────────

export const WithBoxProps: Story = {
  name: "With BoxProps (maxWidth, p, bg)",
  args: {
    options: FRAMEWORKS,
    label: "Constrained",
    style: { maxWidth: 280 },
    p: 12,
    bg: "#f0f9ff",
    rounded: 12,
  },
};
