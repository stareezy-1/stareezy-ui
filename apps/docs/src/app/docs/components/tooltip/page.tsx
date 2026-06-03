import type { Metadata } from "next";
import { DocPage, Callout, PropRow } from "../../../../components/DocPage";

export const metadata: Metadata = {
  title: "Tooltip",
  description:
    "Cross-platform Tooltip component with placement options, delay control, focus trapping, and full keyboard accessibility.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/components/tooltip" },
};

export default function TooltipPage() {
  return (
    <DocPage
      title="Tooltip"
      description="Contextual hint overlay with flexible placement, show/hide delays, and keyboard + screen reader support."
      badge="Component"
      icon="⬦"
      badgeColor="#C20219"
    >
      <h2>Import</h2>
      <pre>
        <code>{`import { Tooltip } from '@stareezy-ui/components'`}</code>
      </pre>

      <h2>Basic usage</h2>
      <pre>
        <code>{`<Tooltip content="Save your changes">
  <Button>Save</Button>
</Tooltip>`}</code>
      </pre>

      <h2>Placement</h2>
      <pre>
        <code>{`<Tooltip content="Above" placement="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Below" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="To the right" placement="right">
  <Button>Right</Button>
</Tooltip>

<Tooltip content="To the left" placement="left">
  <Button>Left</Button>
</Tooltip>`}</code>
      </pre>

      <h2>Delay</h2>
      <pre>
        <code>{`// Show after 500ms, hide after 200ms
<Tooltip content="Delayed tooltip" showDelay={500} hideDelay={200}>
  <Button>Hover me</Button>
</Tooltip>`}</code>
      </pre>

      <h2>Rich content</h2>
      <pre>
        <code>{`<Tooltip
  content={
    <Box p={8}>
      <Text style={{ fontWeight: 700 }}>Keyboard shortcut</Text>
      <Text>⌘ + S</Text>
    </Box>
  }
>
  <Button>Save</Button>
</Tooltip>`}</code>
      </pre>

      <h2>Controlled</h2>
      <pre>
        <code>{`const [open, setOpen] = useState(false)

<Tooltip
  content="Controlled tooltip"
  open={open}
  onOpenChange={setOpen}
>
  <Button onPress={() => setOpen(o => !o)}>Toggle</Button>
</Tooltip>`}</code>
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
            name="content"
            type="ReactNode"
            desc="Tooltip content — string or any React element."
            required
          />
          <PropRow
            name="children"
            type="ReactElement"
            desc="The trigger element. Must be a single React element that accepts ref."
            required
          />
          <PropRow
            name="placement"
            type='"top" | "bottom" | "left" | "right"'
            desc='Where to show the tooltip relative to the trigger. Defaults to "top".'
          />
          <PropRow
            name="showDelay"
            type="number"
            desc="Milliseconds to wait before showing. Defaults to 300."
          />
          <PropRow
            name="hideDelay"
            type="number"
            desc="Milliseconds to wait before hiding. Defaults to 100."
          />
          <PropRow name="open" type="boolean" desc="Controlled open state." />
          <PropRow
            name="onOpenChange"
            type="(open: boolean) => void"
            desc="Called when the tooltip open state changes."
          />
          <PropRow
            name="disabled"
            type="boolean"
            desc="Prevent the tooltip from showing."
          />
          <PropRow
            name="maxWidth"
            type="number | string"
            desc="Maximum width of the tooltip surface."
          />
        </tbody>
      </table>

      <h2>Accessibility</h2>
      <Callout type="info">
        Tooltip renders with <code>role=&quot;tooltip&quot;</code> and is linked
        to its trigger via <code>aria-describedby</code>. The tooltip is shown
        on focus as well as hover, ensuring keyboard users see the content.
        While the tooltip is open, focus remains on the trigger element —
        tooltips are non-modal and do not trap focus.
      </Callout>

      <Callout type="warning">
        On mobile / React Native, tooltips are shown on long-press since hover
        is not available.
      </Callout>

      <h2>Themes</h2>
      <p>
        Tooltip is Theme_Reactive — background, text color, and shadow are
        resolved from the Active_Theme at render time. Works across all five
        built-in themes.
      </p>
    </DocPage>
  );
}
