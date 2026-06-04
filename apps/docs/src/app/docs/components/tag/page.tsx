import type { Metadata } from "next";
import { DocPage, Callout, PropRow } from "../../../../components/DocPage";

export const metadata: Metadata = {
  title: "Tag",
  description:
    "Compact Tag / chip component with removable support, color variants, size options, and icon slots.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/components/tag" },
};

export default function TagPage() {
  return (
    <DocPage
      title="Tag"
      description="Compact label chip with variants, removable support, icon slots, and theme-reactive colors."
      badge="Component"
      icon="◈"
      badgeColor="#8b5cf6"
    >
      <h2>Import</h2>
      <pre>
        <code>{`import { Tag } from '@stareezy-ui/components'`}</code>
      </pre>

      <h2>Basic usage</h2>
      <pre>
        <code>{`<Tag>React</Tag>
<Tag>TypeScript</Tag>
<Tag>Design System</Tag>`}</code>
      </pre>

      <h2>Variants</h2>
      <pre>
        <code>{`<Tag variant="neutral">Neutral</Tag>  // default
<Tag variant="primary">Primary</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="danger">Danger</Tag>
<Tag variant="outline">Outline</Tag>`}</code>
      </pre>

      <h2>Sizes</h2>
      <pre>
        <code>{`<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>  // default
<Tag size="lg">Large</Tag>`}</code>
      </pre>

      <h2>Removable</h2>
      <pre>
        <code>{`const [tags, setTags] = useState(['React', 'TypeScript', 'Design'])

{tags.map((tag) => (
  <Tag
    key={tag}
    removable
    onRemove={() => setTags(tags.filter(t => t !== tag))}
  >
    {tag}
  </Tag>
))}`}</code>
      </pre>

      <h2>With icon</h2>
      <pre>
        <code>{`<Tag icon={<StarIcon />}>Featured</Tag>
<Tag icon={<CheckIcon />} variant="success">Verified</Tag>`}</code>
      </pre>

      <h2>With BoxLayoutProps</h2>
      <pre>
        <code>{`<Tag mr={4} mb={4}>React</Tag>
<Tag px={{ base: 8, md: 12 }}>TypeScript</Tag>`}</code>
      </pre>

      <h2>Props</h2>
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
            name="children"
            type="ReactNode"
            desc="Tag label content."
            required
          />
          <PropRow
            name="variant"
            type='"neutral" | "primary" | "success" | "warning" | "danger" | "outline"'
            desc='Color variant. Defaults to "neutral".'
          />
          <PropRow
            name="size"
            type='"sm" | "md" | "lg"'
            desc='Size preset. Defaults to "md".'
          />
          <PropRow
            name="removable"
            type="boolean"
            desc="Show a remove button (×) at the end of the tag."
          />
          <PropRow
            name="onRemove"
            type="() => void"
            desc="Called when the remove button is pressed."
          />
          <PropRow
            name="icon"
            type="ReactNode"
            desc="Icon shown before the label."
          />
          <PropRow
            name="onPress"
            type="() => void"
            desc="Makes the tag pressable. Adds appropriate ARIA role."
          />
        </tbody>
      </table>

      <h2>Accessibility</h2>
      <Callout type="info">
        When <code>onPress</code> is provided, Tag renders with{" "}
        <code>role=&quot;button&quot;</code> and is keyboard-focusable. When{" "}
        <code>removable</code> is true, the remove button has{" "}
        <code>aria-label=&quot;Remove {"{label}"}&quot;</code>. Inactive tags
        render with <code>role=&quot;status&quot;</code> by default.
      </Callout>

      <h2>Themes</h2>
      <p>
        Tag is Theme_Reactive — background, text color, and border colors are
        all derived from the Active_Theme at render time. Each variant maps to
        semantic color slots that adapt across light, dark, aurora, steins-gate,
        and quasar themes.
      </p>
    </DocPage>
  );
}
