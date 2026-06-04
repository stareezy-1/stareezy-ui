import type { Metadata } from "next";
import { DocPage, Callout, PropRow } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "Stylesheet",
  description:
    "Atomic CSS sheet management with responsive breakpoint support for Stareezy UI.",
};

export default function StylesheetPage() {
  return (
    <DocPage
      title="Stylesheet"
      description="Atomic CSS sheet management with responsive / media-query injection that mirrors Box's breakpoints system."
      badge="Package"
      badgeColor="var(--brand-primary)"
      icon="⊛"
    >
      <Callout type="info">
        <code>@stareezy-ui/stylesheet</code> is used internally by{" "}
        <code>@stareezy-ui/runtime</code>. You only need it directly when
        building a custom runtime adapter or injecting styles outside of{" "}
        <code>Box</code>.
      </Callout>

      <h2>Install</h2>
      <pre>
        <code>pnpm add @stareezy-ui/stylesheet</code>
      </pre>

      <h2>Overview</h2>
      <p>
        The stylesheet package manages three DOM <code>&lt;style&gt;</code>{" "}
        tags:
      </p>
      <ul>
        <li>
          <code>#sz-atomic</code> — one atomic rule per token ID using{" "}
          <code>var(--tokenId)</code>, deduplicated.
        </li>
        <li>
          <code>#sz-root-vars</code> — the <code>:root</code> CSS variable
          block, replaced atomically on theme change.
        </li>
        <li>
          <code>#sz-responsive</code> — media-query rules generated from
          responsive prop values, matching Box&apos;s breakpoint system.
        </li>
      </ul>

      <h2>AtomicStyleSheet</h2>
      <p>
        The main class. Lazy-creates style tags on first use and deduplicates
        every rule.
      </p>

      <pre>
        <code>{`import { AtomicStyleSheet } from "@stareezy-ui/stylesheet";

const sheet = new AtomicStyleSheet();

// Inject a token-based atomic rule
sheet.inject("primary-500", "background-color", "#024CCE");
// → .sz-primary-500 { background-color: var(--primary-500); }

// Write / replace the :root block (call again to switch themes)
sheet.injectRootVariables([
  { id: "primary-500", value: "#024CCE" },
  { id: "spacing-4",   value: 4 },
]);
// → :root { --primary-500: #024CCE; --spacing-4: 4; }`}</code>
      </pre>

      <h3>Responsive injection</h3>
      <p>
        <code>injectResponsive</code> accepts a plain value or a responsive
        object like <code>{"{ base: '8px', md: '16px' }"}</code> — the same
        syntax Box accepts. Breakpoints are read from the shared global channel
        synced by <code>createUi({"{ media }"}))</code>.
      </p>

      <pre>
        <code>{`// Plain value
sheet.injectResponsive("szr-card", "8px", ["padding"]);
// → .szr-card { padding: 8px }

// Responsive object — emits base + media queries
sheet.injectResponsive(
  "szr-card",
  { base: "8px", md: "16px", lg: "24px" },
  ["padding"]
);
// → .szr-card { padding: 8px }
// → @media(min-width:768px){ .szr-card { padding: 16px } }
// → @media(min-width:1024px){ .szr-card { padding: 24px } }`}</code>
      </pre>

      <h3>Component-level injection</h3>
      <p>
        <code>injectComponentStyle</code> injects multiple props for one class
        in a single call:
      </p>

      <pre>
        <code>{`sheet.injectComponentStyle("szr-hero", [
  { cssProperties: ["padding"],          value: { base: "16px", md: "32px" } },
  { cssProperties: ["background-color"], value: "var(--surface)" },
  { cssProperties: ["border-radius"],    value: "12px" },
]);`}</code>
      </pre>

      <h2>Standalone helpers</h2>

      <table>
        <thead>
          <tr>
            <th>Helper</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>tokenIdToClassName(id)</code>
            </td>
            <td>
              Returns <code>sz-{"{id}"}</code>. Used by the runtime adapter.
            </td>
          </tr>
          <tr>
            <td>
              <code>buildScopeClass(uid)</code>
            </td>
            <td>
              Returns <code>szr-{"{uid}"}</code> for component-scoped responsive
              styles.
            </td>
          </tr>
          <tr>
            <td>
              <code>buildResponsiveCss(selector, value, cssProps)</code>
            </td>
            <td>
              Builds the CSS string for one responsive prop without touching the
              DOM.
            </td>
          </tr>
          <tr>
            <td>
              <code>buildComponentCss(className, propEntries)</code>
            </td>
            <td>
              Builds a full responsive CSS block for multiple props at once.
            </td>
          </tr>
          <tr>
            <td>
              <code>buildBreakpointEntries(value)</code>
            </td>
            <td>
              Converts a responsive map to sorted{" "}
              <code>{"{ minWidth, value }"}</code> entries.
            </td>
          </tr>
          <tr>
            <td>
              <code>resolveResponsive(value, windowWidth)</code>
            </td>
            <td>
              React Native helper — resolves a responsive value for a given
              window width.
            </td>
          </tr>
          <tr>
            <td>
              <code>isResponsiveValue(value)</code>
            </td>
            <td>Type guard — returns true if the value is a breakpoint map.</td>
          </tr>
          <tr>
            <td>
              <code>getBreakpoints()</code>
            </td>
            <td>
              Returns the current breakpoint map, synced from{" "}
              <code>createUi({"{ media }"})</code>.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>AtomicStyleSheet API</h2>

      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Signature</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>getClassName</code>
            </td>
            <td>
              <code>(tokenId: string) → string</code>
            </td>
            <td>
              Returns <code>sz-{"{tokenId}"}</code>.
            </td>
          </tr>
          <tr>
            <td>
              <code>inject</code>
            </td>
            <td>
              <code>(tokenId, cssProperty, value) → void</code>
            </td>
            <td>Injects one atomic rule. No-op if tokenId already injected.</td>
          </tr>
          <tr>
            <td>
              <code>injectRootVariables</code>
            </td>
            <td>
              <code>(tokens: {"Array<{ id, value }>"}") → void</code>
            </td>
            <td>
              Replaces the entire <code>:root</code> block.
            </td>
          </tr>
          <tr>
            <td>
              <code>injectResponsive</code>
            </td>
            <td>
              <code>(className, value, cssProperties) → void</code>
            </td>
            <td>Injects responsive styles for a scoped class. Deduplicated.</td>
          </tr>
          <tr>
            <td>
              <code>injectComponentStyle</code>
            </td>
            <td>
              <code>(className, propEntries) → void</code>
            </td>
            <td>
              Batch version of <code>injectResponsive</code>.
            </td>
          </tr>
          <tr>
            <td>
              <code>injectRaw</code>
            </td>
            <td>
              <code>(css: string) → void</code>
            </td>
            <td>Injects a pre-built CSS string. Deduplicated by content.</td>
          </tr>
          <tr>
            <td>
              <code>reset</code>
            </td>
            <td>
              <code>() → void</code>
            </td>
            <td>
              Removes all style tags and clears dedup state. Useful in tests.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Breakpoints</h2>
      <p>
        Breakpoints are read from the same global channel written by{" "}
        <code>createUi({"{ media }"})</code>, so your stylesheet rules always
        match Box&apos;s responsive props. Default values:
      </p>
      <pre>
        <code>{`{ sm: 480, md: 768, lg: 1024, xl: 1280, "2xl": 1536 }`}</code>
      </pre>
      <p>
        Override them in your <code>stareezy.config.ts</code>:
      </p>
      <pre>
        <code>{`import { createUi } from "@stareezy-ui/tokens";

const ui = createUi({
  media: { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 },
});
export default ui;`}</code>
      </pre>

      <Callout type="tip">
        The stylesheet package has zero runtime dependencies — it only touches{" "}
        <code>document.head</code> and the{" "}
        <code>globalThis.__stareezy_breakpoints__</code> channel. Safe to use in
        any web bundler environment.
      </Callout>
    </DocPage>
  );
}
