import type { Metadata } from "next";
import { DocPage, Callout, PropRow } from "../../../../components/DocPage";
import { PaginationPreview } from "../ComponentPreview";

export const metadata: Metadata = {
  title: "Pagination",
  description:
    "Cross-platform Pagination component with page range display, ellipsis, size variants, and keyboard navigation.",
  alternates: {
    canonical: "https://ui.quasify.app/docs/components/pagination",
  },
};

export default function PaginationPage() {
  return (
    <DocPage
      title="Pagination"
      description="Page navigation with smart range display, ellipsis, prev/next controls, and full keyboard support."
      badge="Component"
      icon="◁▷"
      badgeColor="#22c55e"
    >
      <h2 className="gradient-text">Import</h2>
      <pre>
        <code>{`import { Pagination } from '@quasify-ui/components'`}</code>
      </pre>

      <h2 className="gradient-text">Basic usage</h2>
      <PaginationPreview />
      <pre>
        <code>{`const [page, setPage] = useState(1)

<Pagination
  page={page}
  totalPages={10}
  onPageChange={setPage}
/>`}</code>
      </pre>

      <h2 className="gradient-text">Size variants</h2>
      <pre>
        <code>{`<Pagination page={1} totalPages={10} onPageChange={setPage} size="sm" />
<Pagination page={1} totalPages={10} onPageChange={setPage} size="md" />  // default
<Pagination page={1} totalPages={10} onPageChange={setPage} size="lg" />`}</code>
      </pre>

      <h2 className="gradient-text">Show first and last buttons</h2>
      <pre>
        <code>{`<Pagination
  page={page}
  totalPages={20}
  onPageChange={setPage}
  showFirstLast  // renders ⟨ and ⟩ buttons to jump to first/last page
/>`}</code>
      </pre>

      <h2 className="gradient-text">Sibling page count</h2>
      <pre>
        <code>{`// How many pages to show on each side of the current page
<Pagination
  page={5}
  totalPages={20}
  onPageChange={setPage}
  siblingCount={2}  // default is 1
/>`}</code>
      </pre>

      <h2 className="gradient-text">With BoxLayoutProps</h2>
      <pre>
        <code>{`<Pagination
  page={page}
  totalPages={10}
  onPageChange={setPage}
  mt={24}
  alignSelf="center"
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
            name="page"
            type="number"
            desc="Current active page (1-indexed)."
            required
          />
          <PropRow
            name="totalPages"
            type="number"
            desc="Total number of pages."
            required
          />
          <PropRow
            name="onPageChange"
            type="(page: number) => void"
            desc="Called when the user selects a new page."
            required
          />
          <PropRow
            name="size"
            type='"sm" | "md" | "lg"'
            desc='Button size. Defaults to "md".'
          />
          <PropRow
            name="siblingCount"
            type="number"
            desc="Pages to show on each side of the current page. Defaults to 1."
          />
          <PropRow
            name="showFirstLast"
            type="boolean"
            desc="Show jump-to-first and jump-to-last buttons."
          />
          <PropRow
            name="disabled"
            type="boolean"
            desc="Disable all pagination controls."
          />
        </tbody>
      </table>

      <h2 className="gradient-text">Accessibility</h2>
      <Callout type="info">
        Pagination renders a <code>&lt;nav&gt;</code> with{" "}
        <code>aria-label=&quot;Pagination&quot;</code>. Each page button has an{" "}
        <code>aria-label</code> like <code>&quot;Go to page 3&quot;</code>. The
        active page button has <code>aria-current=&quot;page&quot;</code>.
        Prev/next buttons have descriptive <code>aria-label</code> attributes.
        The component is fully keyboard-navigable with Tab and Enter/Space.
      </Callout>

      <h2 className="gradient-text">Themes</h2>
      <p>
        Pagination is Theme_Reactive — active page, hover, focus, and disabled
        colors are all resolved from the Active_Theme at render time. Works
        correctly in all five built-in themes: quasar, light, dark, aurora, and
        steins-gate.
      </p>
    </DocPage>
  );
}
