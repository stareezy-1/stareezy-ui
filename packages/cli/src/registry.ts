/**
 * Component registry — maps each component name to the files it ships,
 * its component-level dependencies, and the @stareezy-ui/* packages it requires.
 */

export interface ComponentRegistryEntry {
  /** Component identifier (lowercase slug). */
  name: string;
  /** Source files to copy into the target project (relative to the component folder). */
  files: string[];
  /** Other components this component depends on (by name). */
  componentDeps: string[];
  /** Required @stareezy-ui/* packages (full package names). */
  packageDeps: string[];
}

/** All components depend on components + tokens at minimum. */
const BASE_PACKAGES = ["@stareezy-ui/components", "@stareezy-ui/tokens"];

const REGISTRY: ComponentRegistryEntry[] = [
  {
    name: "button",
    files: [
      "Button/Button.tsx",
      "Button/Button.style.ts",
      "Button/Button.types.ts",
      "Button/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "input",
    files: [
      "Input/Input.tsx",
      "Input/Input.style.ts",
      "Input/Input.types.ts",
      "Input/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "card",
    files: [
      "Card/Card.tsx",
      "Card/Card.style.ts",
      "Card/Card.types.ts",
      "Card/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "badge",
    files: [
      "Badge/Badge.tsx",
      "Badge/Badge.style.ts",
      "Badge/Badge.types.ts",
      "Badge/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "toast",
    files: [
      "Toast/Toast.tsx",
      "Toast/Toast.style.ts",
      "Toast/Toast.types.ts",
      "Toast/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "accordion",
    files: [
      "Accordion/Accordion.tsx",
      "Accordion/Accordion.style.ts",
      "Accordion/Accordion.types.ts",
      "Accordion/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "tabs",
    files: [
      "Tabs/Tabs.tsx",
      "Tabs/Tabs.style.ts",
      "Tabs/Tabs.types.ts",
      "Tabs/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "switch",
    files: [
      "Switch/Switch.tsx",
      "Switch/Switch.style.ts",
      "Switch/Switch.types.ts",
      "Switch/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "modal",
    files: [
      "Modal/Modal.tsx",
      "Modal/Modal.style.ts",
      "Modal/Modal.types.ts",
      "Modal/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "dropdown",
    files: [
      "Dropdown/Dropdown.tsx",
      "Dropdown/Dropdown.style.ts",
      "Dropdown/Dropdown.types.ts",
      "Dropdown/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "spinner",
    files: [
      "Spinner/Spinner.tsx",
      "Spinner/Spinner.style.ts",
      "Spinner/Spinner.types.ts",
      "Spinner/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "avatar",
    files: [
      "Avatar/Avatar.tsx",
      "Avatar/Avatar.style.ts",
      "Avatar/Avatar.types.ts",
      "Avatar/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "checkbox",
    files: [
      "Checkbox/Checkbox.tsx",
      "Checkbox/Checkbox.style.ts",
      "Checkbox/Checkbox.types.ts",
      "Checkbox/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "divider",
    files: [
      "Divider/Divider.tsx",
      "Divider/Divider.style.ts",
      "Divider/Divider.types.ts",
      "Divider/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "breadcrumb",
    files: [
      "Breadcrumb/Breadcrumb.tsx",
      "Breadcrumb/Breadcrumb.style.ts",
      "Breadcrumb/Breadcrumb.types.ts",
      "Breadcrumb/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "pagination",
    files: [
      "Pagination/Pagination.tsx",
      "Pagination/Pagination.style.ts",
      "Pagination/Pagination.types.ts",
      "Pagination/index.ts",
    ],
    componentDeps: ["button"],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "table",
    files: [
      "Table/Table.tsx",
      "Table/Table.style.ts",
      "Table/Table.types.ts",
      "Table/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "tag",
    files: [
      "Tag/Tag.tsx",
      "Tag/Tag.style.ts",
      "Tag/Tag.types.ts",
      "Tag/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "tooltip",
    files: [
      "Tooltip/Tooltip.tsx",
      "Tooltip/Tooltip.style.ts",
      "Tooltip/Tooltip.types.ts",
      "Tooltip/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
  {
    name: "drawer",
    files: [
      "Drawer/Drawer.tsx",
      "Drawer/Drawer.style.ts",
      "Drawer/Drawer.types.ts",
      "Drawer/index.ts",
    ],
    componentDeps: [],
    packageDeps: BASE_PACKAGES,
  },
];

/** Lookup map from component name to its registry entry. */
const REGISTRY_MAP = new Map<string, ComponentRegistryEntry>(
  REGISTRY.map((entry) => [entry.name, entry]),
);

/**
 * Look up a single component by name.
 * Returns undefined if not found.
 */
export function getComponent(name: string): ComponentRegistryEntry | undefined {
  return REGISTRY_MAP.get(name.toLowerCase());
}

/**
 * Resolve the full transitive closure of component dependencies for the given
 * list of component names.  The result is a deduplicated, topologically-ordered
 * list that includes every requested component and every component they depend on
 * (directly or transitively).
 *
 * Throws if any requested name is unknown.
 */
export function resolveComponentClosure(
  names: string[],
): ComponentRegistryEntry[] {
  const unknown = names.filter((n) => !REGISTRY_MAP.has(n.toLowerCase()));
  if (unknown.length > 0) {
    const available = REGISTRY.map((e) => e.name).join(", ");
    throw new Error(
      `Unknown component(s): ${unknown.join(
        ", ",
      )}.\nAvailable components: ${available}`,
    );
  }

  const visited = new Set<string>();
  const result: ComponentRegistryEntry[] = [];

  function visit(name: string): void {
    const key = name.toLowerCase();
    if (visited.has(key)) return;
    visited.add(key);

    const entry = REGISTRY_MAP.get(key)!;
    // Visit deps first (topological order)
    for (const dep of entry.componentDeps) {
      visit(dep);
    }
    result.push(entry);
  }

  for (const name of names) {
    visit(name.toLowerCase());
  }

  return result;
}

/**
 * Collect all unique @stareezy-ui/* package deps from a resolved component list.
 */
export function collectPackageDeps(
  components: ComponentRegistryEntry[],
): string[] {
  const seen = new Set<string>();
  for (const comp of components) {
    for (const pkg of comp.packageDeps) {
      seen.add(pkg);
    }
  }
  return Array.from(seen).sort();
}

/** Return the full registry (for listing available components). */
export function getAllComponents(): ComponentRegistryEntry[] {
  return REGISTRY;
}
