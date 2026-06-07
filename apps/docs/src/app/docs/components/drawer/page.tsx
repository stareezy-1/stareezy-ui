import type { Metadata } from "next";
import { DocPage, Callout, PropRow } from "../../../../components/DocPage";
import { DrawerPreview } from "../ComponentPreview";

export const metadata: Metadata = {
  title: "Drawer",
  description:
    "Cross-platform side-panel Drawer with placement options, focus trapping, backdrop, smooth animation, and full accessibility.",
  alternates: { canonical: "https://ui.quasify.app/docs/components/drawer" },
};

export default function DrawerPage() {
  return (
    <DocPage
      title="Drawer"
      description="Side-panel overlay with placement variants, smooth slide animation, focus trap, and backdrop dismiss."
      badge="Component"
      icon="⬜"
      badgeColor="#dc143c"
    >
      <h2 className="gradient-text">Import</h2>
      <pre>
        <code>{`import { Drawer } from '@quasify-ui/components'`}</code>
      </pre>

      <h2 className="gradient-text">Basic usage</h2>
      <DrawerPreview />
      <pre>
        <code>{`const [open, setOpen] = useState(false)

<Button onPress={() => setOpen(true)}>Open drawer</Button>

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Settings"
>
  <Text>Drawer content goes here</Text>
</Drawer>`}</code>
      </pre>

      <h2 className="gradient-text">Placement</h2>
      <pre>
        <code>{`// Slide in from the left (default)
<Drawer placement="left" open={open} onClose={onClose} title="Menu">
  ...
</Drawer>

// Slide in from the right
<Drawer placement="right" open={open} onClose={onClose} title="Cart">
  ...
</Drawer>

// Slide up from the bottom
<Drawer placement="bottom" open={open} onClose={onClose} title="Options">
  ...
</Drawer>

// Slide down from the top
<Drawer placement="top" open={open} onClose={onClose} title="Notification">
  ...
</Drawer>`}</code>
      </pre>

      <h2 className="gradient-text">Size variants</h2>
      <pre>
        <code>{`<Drawer size="sm" ...>...</Drawer>   // 280px
<Drawer size="md" ...>...</Drawer>   // 360px (default)
<Drawer size="lg" ...>...</Drawer>   // 480px
<Drawer size="full" ...>...</Drawer> // 100% width/height`}</code>
      </pre>

      <h2 className="gradient-text">Without backdrop</h2>
      <pre>
        <code>{`<Drawer
  open={open}
  onClose={onClose}
  title="Side panel"
  backdrop={false}
>
  ...
</Drawer>`}</code>
      </pre>

      <h2 className="gradient-text">Footer actions</h2>
      <pre>
        <code>{`<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm action"
  footer={
    <>
      <Button variant="ghost" onPress={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onPress={handleConfirm}>Confirm</Button>
    </>
  }
>
  <Text>Are you sure you want to proceed?</Text>
</Drawer>`}</code>
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
            name="open"
            type="boolean"
            desc="Controls whether the drawer is visible."
            required
          />
          <PropRow
            name="onClose"
            type="() => void"
            desc="Called when the drawer should close (backdrop press, Escape key, or close button)."
            required
          />
          <PropRow
            name="title"
            type="string"
            desc="Drawer header title. Used as the accessible dialog label."
          />
          <PropRow
            name="placement"
            type='"left" | "right" | "bottom" | "top"'
            desc='Side the drawer slides in from. Defaults to "right".'
          />
          <PropRow
            name="size"
            type='"sm" | "md" | "lg" | "full"'
            desc='Panel size (width for left/right, height for top/bottom). Defaults to "md".'
          />
          <PropRow
            name="backdrop"
            type="boolean"
            desc="Show a dimming backdrop behind the drawer. Defaults to true."
          />
          <PropRow
            name="closeOnBackdropPress"
            type="boolean"
            desc="Close when the backdrop is pressed. Defaults to true."
          />
          <PropRow
            name="footer"
            type="ReactNode"
            desc="Content rendered in the sticky footer area of the drawer."
          />
          <PropRow
            name="children"
            type="ReactNode"
            desc="Drawer body content."
          />
        </tbody>
      </table>

      <h2 className="gradient-text">Accessibility</h2>
      <Callout type="info">
        Drawer renders with <code>role=&quot;dialog&quot;</code> and{" "}
        <code>aria-modal=&quot;true&quot;</code>. When the drawer opens, focus
        is moved to the first focusable element inside the panel. Focus is
        trapped within the drawer while it is open — Tab and Shift+Tab cycle
        through drawer controls only. Pressing Escape closes the drawer and
        returns focus to the trigger element.
      </Callout>

      <h2 className="gradient-text">Themes</h2>
      <p>
        Drawer is Theme_Reactive — panel background, header, border, backdrop
        opacity, and close button colors are all resolved from the Active_Theme
        at render time. Works across all five built-in themes: quasar, light,
        dark, aurora, and steins-gate.
      </p>
    </DocPage>
  );
}
