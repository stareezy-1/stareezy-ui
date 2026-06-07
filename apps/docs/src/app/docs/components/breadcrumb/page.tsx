import type { Metadata } from "next";
import { DocPage, Callout, PropRow } from "../../../../components/DocPage";
import { BreadcrumbPreview } from "../ComponentPreview";

export const metadata: Metadata = {
  title: "Breadcrumb",
  description:
    "Cross-platform Breadcrumb navigation component with separator customization, overflow handling, and full accessibility support.",
  alternates: {
    canonical: "https://ui.quasify.app/docs/components/breadcrumb",
  },
};

export default function BreadcrumbPage() {
  return (
    <DocPage
      title="Breadcrumb"
      description="Hierarchical navigation trail with customizable separators and full ARIA support."
      badge="Component"
      icon="◂"
      badgeColor="#ff6a1a"
    >
      <h2 className="gradient-text">Import</h2>
      <pre
        style={{
          border: "1px solid var(--color-border)",
        }}
      >
        <code>{`import { Breadcrumb } from '@quasify-ui/components'`}</code>
      </pre>

      <h2 className="gradient-text">Basic usage</h2>
      <BreadcrumbPreview />
      <pre
        style={{
          border: "1px solid var(--color-border)",
        }}
      >
        <code>{`<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Shoes' },  // current page — no href
  ]}
/>`}</code>
      </pre>

      <h2 className="gradient-text">Custom separator</h2>
      <pre
        style={{
          border: "1px solid var(--color-border)",
        }}
      >
        <code>{`<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Components' },
  ]}
  separator="/"        // string
  // separator={<ChevronIcon />}  // or a React element
/>`}</code>
      </pre>

      <h2 className="gradient-text">With icons</h2>
      <pre
        style={{
          border: "1px solid var(--color-border)",
        }}
      >
        <code>{`<Breadcrumb
  items={[
    { label: 'Home', href: '/', icon: <HomeIcon /> },
    { label: 'Settings', href: '/settings', icon: <SettingsIcon /> },
    { label: 'Profile' },
  ]}
/>`}</code>
      </pre>

      <h2 className="gradient-text">With BoxLayoutProps</h2>
      <pre
        style={{
          border: "1px solid var(--color-border)",
        }}
      >
        <code>{`<Breadcrumb
  items={items}
  mb={16}
  px={{ base: 12, md: 0 }}
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
            name="items"
            type="BreadcrumbItem[]"
            desc="Array of breadcrumb items. The last item is treated as the current page."
            required
          />
          <PropRow
            name="separator"
            type="string | ReactNode"
            desc='Separator between items. Defaults to "›".'
          />
          <PropRow
            name="maxItems"
            type="number"
            desc="Collapse items in the middle when the count exceeds this value."
          />
        </tbody>
      </table>

      <h2 className="gradient-text">BreadcrumbItem type</h2>
      <pre
        style={{
          border: "1px solid var(--color-border)",
        }}
      >
        <code>{`interface BreadcrumbItem {
  label: string
  href?: string       // if omitted, renders as current-page text (no link)
  icon?: ReactNode    // optional icon before the label
}`}</code>
      </pre>

      <h2 className="gradient-text">Accessibility</h2>
      <Callout type="info">
        Breadcrumb renders a <code>&lt;nav&gt;</code> element with{" "}
        <code>aria-label=&quot;Breadcrumb&quot;</code> and an ordered list. The
        current page item has <code>aria-current=&quot;page&quot;</code>.
        Separator elements are hidden from assistive technologies with{" "}
        <code>aria-hidden=&quot;true&quot;</code>.
      </Callout>
      <pre
        style={{
          border: "1px solid var(--color-border)",
        }}
      >
        <code>{`<!-- Rendered HTML -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li aria-hidden="true">›</li>
    <li><a href="/docs">Docs</a></li>
    <li aria-hidden="true">›</li>
    <li aria-current="page">Components</li>
  </ol>
</nav>`}</code>
      </pre>

      <h2 className="gradient-text">Themes</h2>
      <p>
        Breadcrumb is Theme_Reactive — all colors (link color, separator color,
        current-page color) are resolved through <code>useThemedColors()</code>{" "}
        at render time. It renders correctly in all five built-in themes: quasar,
        light, dark, aurora, and steins-gate.
      </p>
    </DocPage>
  );
}
