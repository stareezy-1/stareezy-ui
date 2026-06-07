import type { Metadata } from "next";
import { DocPage, Callout, PropRow } from "../../../../components/DocPage";
import { TablePreview } from "../ComponentPreview";

export const metadata: Metadata = {
  title: "Table",
  description:
    "Cross-platform Table component with sorting, striped rows, sticky headers, and full accessibility support.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/components/table" },
};

export default function TablePage() {
  return (
    <DocPage
      title="Table"
      description="Data table with sortable columns, striped rows, sticky headers, and ARIA table roles."
      badge="Component"
      icon="⊞"
      badgeColor="#f5a623"
    >
      <h2 className="gradient-text">Import</h2>
      <pre>
        <code>{`import { Table } from '@stareezy-ui/components'`}</code>
      </pre>

      <h2 className="gradient-text">Basic usage</h2>
      <TablePreview />
      <pre>
        <code>{`const columns = [
  { key: 'name',  header: 'Name',   width: 200 },
  { key: 'role',  header: 'Role',   width: 160 },
  { key: 'email', header: 'Email' },
]

const data = [
  { name: 'Alice',   role: 'Engineer', email: 'alice@example.com' },
  { name: 'Bob',     role: 'Designer', email: 'bob@example.com' },
  { name: 'Charlie', role: 'PM',       email: 'charlie@example.com' },
]

<Table columns={columns} data={data} />`}</code>
      </pre>

      <h2 className="gradient-text">Sortable columns</h2>
      <pre>
        <code>{`const [sortKey, setSortKey] = useState<string | null>(null)
const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

<Table
  columns={columns.map(c => ({ ...c, sortable: true }))}
  data={data}
  sortKey={sortKey}
  sortDirection={sortDir}
  onSort={(key, dir) => {
    setSortKey(key)
    setSortDir(dir)
  }}
/>`}</code>
      </pre>

      <h2 className="gradient-text">Striped rows and sticky header</h2>
      <pre>
        <code>{`<Table
  columns={columns}
  data={data}
  striped       // alternating row background
  stickyHeader  // header stays in place while scrolling
  maxHeight={400}
/>`}</code>
      </pre>

      <h2 className="gradient-text">Custom cell rendering</h2>
      <pre>
        <code>{`const columns = [
  { key: 'name', header: 'Name' },
  {
    key: 'status',
    header: 'Status',
    render: (value: string) => (
      <Badge variant={value === 'active' ? 'success' : 'neutral'}>
        {value}
      </Badge>
    ),
  },
]`}</code>
      </pre>

      <h2 className="gradient-text">With BoxLayoutProps</h2>
      <pre>
        <code>{`<Table
  columns={columns}
  data={data}
  mb={24}
  borderRadius={12}
/>`}</code>
      </pre>

      <h2 className="gradient-text">Props</h2>
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <PropRow
            name="columns"
            type="TableColumn[]"
            desc="Column definitions — key, header, width, sortable, render."
            required
          />
          <PropRow
            name="data"
            type="Record<string, unknown>[]"
            desc="Row data. Each item should have keys matching column.key values."
            required
          />
          <PropRow
            name="striped"
            type="boolean"
            desc="Apply alternating background to even rows."
          />
          <PropRow
            name="stickyHeader"
            type="boolean"
            desc="Fix the header row while the body scrolls (web only)."
          />
          <PropRow
            name="maxHeight"
            type="number | string"
            desc="Max height for the scrollable table body."
          />
          <PropRow
            name="sortKey"
            type="string | null"
            desc="Currently sorted column key (controlled)."
          />
          <PropRow
            name="sortDirection"
            type='"asc" | "desc"'
            desc="Current sort direction (controlled)."
          />
          <PropRow
            name="onSort"
            type="(key: string, dir: 'asc' | 'desc') => void"
            desc="Called when a sortable column header is pressed."
          />
          <PropRow
            name="emptyText"
            type="string"
            desc='Text shown when data is empty. Defaults to "No data".'
          />
        </tbody>
      </table>

      <h2 className="gradient-text">Accessibility</h2>
      <Callout type="info">
        Table renders with <code>role=&quot;table&quot;</code>,{" "}
        <code>role=&quot;rowgroup&quot;</code>,{" "}
        <code>role=&quot;row&quot;</code>,{" "}
        <code>role=&quot;columnheader&quot;</code>, and{" "}
        <code>role=&quot;cell&quot;</code> ARIA roles. Sortable column headers
        have <code>aria-sort=&quot;ascending&quot;</code> /{" "}
        <code>aria-sort=&quot;descending&quot;</code> /{" "}
        <code>aria-sort=&quot;none&quot;</code>. Sort buttons are
        keyboard-activatable with Enter and Space.
      </Callout>

      <h2 className="gradient-text">Themes</h2>
      <p>
        Table is Theme_Reactive — header background, row hover, stripe color,
        border color, and sort indicator color are all resolved from the
        Active_Theme at render time. Works across all five built-in themes:
        quasar, light, dark, aurora, and steins-gate.
      </p>
    </DocPage>
  );
}
