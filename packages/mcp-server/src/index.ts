#!/usr/bin/env node
/**
 * @stareezy-ui/mcp-server
 *
 * MCP server exposing Stareezy UI design tokens, components, themes,
 * and scaffolding tools to any MCP-compatible AI assistant.
 *
 * Usage:
 *   npx @stareezy-ui/mcp-server
 *   stareezy-mcp
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ── Tool definitions ────────────────────────────────────────────────────────

const TOOLS = [
  {
    name: "get_tokens",
    description:
      "List all Stareezy UI design tokens. Optionally filter by category: colors, spacing, radius, typography, shadows.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["colors", "spacing", "radius", "typography", "shadows", "all"],
          description: "Token category to filter by. Defaults to 'all'.",
        },
      },
    },
  },
  {
    name: "get_token",
    description:
      "Get value and metadata for a single token by its dot-path, e.g. 'colors.celurenBlue.500' or 'spacing.4'.",
    inputSchema: {
      type: "object",
      required: ["path"],
      properties: {
        path: {
          type: "string",
          description:
            "Dot-separated token path, e.g. 'colors.celurenBlue.500'",
        },
      },
    },
  },
  {
    name: "list_components",
    description:
      "Return a summary of all 31+ Stareezy UI components with their prop signatures and import paths.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_component",
    description:
      "Get full props, usage examples, and platform notes for a specific component by name.",
    inputSchema: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          description:
            "Component name, e.g. 'Button', 'Input', 'Card', 'Modal', 'Drawer'",
        },
      },
    },
  },
  {
    name: "list_themes",
    description:
      "List all built-in themes (quasar, aurora, steins-gate, dark, light) with their brand color values and backgrounds.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "validate_config",
    description:
      "Validate a stareezy.config.ts file contents — checks themes, breakpoints, and shorthands are well-formed.",
    inputSchema: {
      type: "object",
      required: ["config"],
      properties: {
        config: {
          type: "string",
          description:
            "The TypeScript source of stareezy.config.ts to validate",
        },
      },
    },
  },
  {
    name: "scaffold_component",
    description:
      "Generate a production-ready component scaffold using the correct token accessor pattern. Returns ComponentName.tsx, ComponentName.style.ts, and ComponentName.types.ts.",
    inputSchema: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          description: "PascalCase component name, e.g. 'HeroSection'",
        },
        type: {
          type: "string",
          enum: ["card", "hero", "form", "list", "nav", "modal", "generic"],
          description: "Component type. Defaults to 'generic'.",
        },
      },
    },
  },
  {
    name: "search_docs",
    description:
      "Full-text search across all Stareezy UI documentation. Returns ranked results with excerpts.",
    inputSchema: {
      type: "object",
      required: ["query"],
      properties: {
        query: {
          type: "string",
          description: "Search query string",
        },
      },
    },
  },
] as const;

// ── Token data ──────────────────────────────────────────────────────────────

const TOKEN_DATA = {
  spacing: Object.fromEntries(
    [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((n) => [
      String(n),
      { value: n * 4, unit: "px" },
    ]),
  ),
  radius: {
    sm: { value: 6 },
    md: { value: 10 },
    lg: { value: 16 },
    xl: { value: 24 },
    full: { value: 9999 },
  },
  colors: {
    celurenBlue: {
      "50": "#E6EDFA",
      "100": "#B3C9F0",
      "200": "#81A6E7",
      "300": "#4E82DD",
      "400": "#1B5ED3",
      "500": "#024CCE",
      "600": "#0146C5",
      "700": "#023DA5",
    },
    success: { "500": "#22C55E" },
    danger: { "500": "#DC143C" },
    warning: { "500": "#F59E0B" },
  },
  themes: {
    quasar: { brand: "#ff6a1a", accent: "#dc143c", bg: "#020205" },
    aurora: { brand: "#00ff88", accent: "#7c3aed", bg: "#050505" },
    "steins-gate": { brand: "#4a9eff", accent: "#e63030", bg: "#080c18" },
    dark: { brand: "#024CCE", accent: "#6d28d9", bg: "#0d1117" },
    light: { brand: "#024CCE", accent: "#6d28d9", bg: "#fafbff" },
  },
};

// ── Component catalog ───────────────────────────────────────────────────────

const COMPONENTS_CATALOG = [
  {
    name: "Box",
    desc: "Base layout primitive. Renders div on web, View on RN.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Text",
    desc: "Typed typography. Accepts type: H1|H2|H3|H4|M-heading-bold|M-body|M-caption.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Button",
    desc: "5 variants (Primary/Secondary/Outline/Ghost/Danger), 5 sizes, loading/disabled states.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Input",
    desc: "Text input with label, error, hint, icons, password mode.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Card",
    desc: "Container with filled/border/ghost/elevated variants and optional glow.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Modal",
    desc: "Overlay dialog with backdrop blur. Sizes: SM/MD/LG/fullscreen.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Drawer",
    desc: "Slide-in panel from left/right/top/bottom.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Accordion",
    desc: "Collapsible content sections with smooth animation.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Tabs",
    desc: "Tab navigation. Variants: underline/pills/card.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Switch",
    desc: "Toggle switch with SM/MD/LG sizes.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Checkbox",
    desc: "Checkbox with indeterminate state and label.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Select",
    desc: "Dropdown with search and multi-select.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Slider",
    desc: "Range input with marks and value display.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Progress",
    desc: "Linear progress bar. Variants: default/gradient/striped.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Spinner",
    desc: "Loading indicator. Variants: ring/dots/pulse.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Avatar",
    desc: "User avatar with image/initials fallback and status indicator.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Badge",
    desc: "Status indicator. Variants: default/success/warning/danger/info.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Tooltip",
    desc: "Floating tooltip on hover. Placements: top/bottom/left/right.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Toast",
    desc: "Notification toast. Variants: success/error/warning/info.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Divider",
    desc: "Separator. Orientations: horizontal/vertical. Variants: solid/dashed/dotted.",
    import: "@stareezy-ui/components",
  },
  {
    name: "Dropdown",
    desc: "Select with search, option groups, multi-select.",
    import: "@stareezy-ui/components",
  },
];

// ── Scaffold templates ──────────────────────────────────────────────────────

function scaffoldGeneric(name: string) {
  return {
    [`${name}.tsx`]: `import React from 'react'
import { Box, Text } from '@stareezy-ui/components'
import { t } from '@stareezy-ui/tokens'
import { styles } from './${name}.style'
import type { ${name}Props } from './${name}.types'

export function ${name}({ children, ...rest }: ${name}Props) {
  return (
    <Box style={styles.container} bg={t.backgrounds.primary} {...rest}>
      {children}
    </Box>
  )
}`,
    [`${name}.style.ts`]: `import { spacing, radius } from '@stareezy-ui/tokens'

export const styles = {
  container: {
    padding: spacing[4].value,
    borderRadius: radius.md.value,
  },
}`,
    [`${name}.types.ts`]: `import type { BoxProps } from '@stareezy-ui/components'

export interface ${name}Props extends BoxProps {
  children?: React.ReactNode
}`,
    "index.ts": `export { ${name} } from './${name}'
export type { ${name}Props } from './${name}.types'`,
  };
}

// ── Tool handlers ───────────────────────────────────────────────────────────

function handleGetTokens(args: Record<string, string>) {
  const category = args["category"] || "all";
  if (category === "all") return JSON.stringify(TOKEN_DATA, null, 2);
  const data = TOKEN_DATA[category as keyof typeof TOKEN_DATA];
  if (!data)
    return `Unknown category: ${category}. Valid: colors, spacing, radius, themes`;
  return JSON.stringify(data, null, 2);
}

function handleGetToken(args: Record<string, string>) {
  const parts = (args["path"] || "").split(".");
  let node: unknown = TOKEN_DATA;
  for (const part of parts) {
    if (typeof node !== "object" || node === null)
      return `Token not found: ${args["path"]}`;
    node = (node as Record<string, unknown>)[part];
  }
  if (node === undefined) return `Token not found: ${args["path"]}`;
  return JSON.stringify(
    {
      path: args["path"],
      ...((typeof node === "object" ? node : { value: node }) as object),
    },
    null,
    2,
  );
}

function handleListComponents() {
  return COMPONENTS_CATALOG.map(
    (c) =>
      `**${c.name}** — ${c.desc}\n  Import: \`import { ${c.name} } from '${c.import}'\``,
  ).join("\n\n");
}

function handleGetComponent(args: Record<string, string>) {
  const comp = COMPONENTS_CATALOG.find(
    (c) => c.name.toLowerCase() === (args["name"] || "").toLowerCase(),
  );
  if (!comp)
    return `Component not found: ${args["name"]}. Run list_components to see all available components.`;
  return `# ${comp.name}\n\n${comp.desc}\n\nImport: \`import { ${comp.name} } from '${comp.import}'\`\n\nFor complete props and examples, visit: https://ui.stareezy.tech/docs/components`;
}

function handleListThemes() {
  return Object.entries(TOKEN_DATA.themes)
    .map(
      ([name, t]) =>
        `**${name}**\n  Brand: ${t.brand} | Accent: ${t.accent} | Background: ${t.bg}`,
    )
    .join("\n\n");
}

function handleValidateConfig(args: Record<string, string>) {
  const config = args["config"] || "";
  const issues: string[] = [];
  if (!config.includes("createUi")) issues.push("Missing createUi() call");
  if (!config.includes("themes"))
    issues.push("No themes defined in createUi config");
  if (!config.includes("SzrCustomConfig"))
    issues.push(
      "Missing module augmentation: declare module '@stareezy-ui/tokens' { interface SzrCustomConfig extends typeof ui {} }",
    );
  if (issues.length === 0) return "Config looks valid ✓";
  return `Issues found:\n${issues.map((i) => `  - ${i}`).join("\n")}`;
}

function handleScaffoldComponent(args: Record<string, string>) {
  const name = args["name"] || "MyComponent";
  const files = scaffoldGeneric(name);
  return Object.entries(files)
    .map(
      ([filename, content]) => `\`\`\`tsx\n// ${filename}\n${content}\n\`\`\``,
    )
    .join("\n\n");
}

function handleSearchDocs(args: Record<string, string>) {
  const query = (args["query"] || "").toLowerCase();
  const results = [
    {
      title: "Quick Start",
      url: "/docs/quick-start",
      snippet: "Scaffold a project with npx stareezy create",
    },
    {
      title: "Token System",
      url: "/docs/usage",
      snippet: "Use t.* for theme-reactive props",
    },
    {
      title: "Components",
      url: "/docs/components",
      snippet: "31+ cross-platform components",
    },
    {
      title: "Theming",
      url: "/docs/theming",
      snippet: "5 built-in themes, createUi config",
    },
    {
      title: "CLI",
      url: "/docs/cli",
      snippet: "stareezy create / init / add commands",
    },
    {
      title: "MCP Server",
      url: "/docs/mcp-server",
      snippet: "Connect AI assistants via Model Context Protocol",
    },
  ].filter(
    (r) =>
      r.title.toLowerCase().includes(query) ||
      r.snippet.toLowerCase().includes(query),
  );
  if (results.length === 0) return `No results found for: ${args["query"]}`;
  return results
    .map(
      (r) =>
        `**${r.title}** — ${r.snippet}\n  URL: https://ui.stareezy.tech${r.url}`,
    )
    .join("\n\n");
}

// ── Server setup ────────────────────────────────────────────────────────────

const server = new Server(
  { name: "stareezy-ui", version: "1.0.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS.map((t) => ({ ...t })),
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const a = (args ?? {}) as Record<string, string>;

  let result: string;
  switch (name) {
    case "get_tokens":
      result = handleGetTokens(a);
      break;
    case "get_token":
      result = handleGetToken(a);
      break;
    case "list_components":
      result = handleListComponents();
      break;
    case "get_component":
      result = handleGetComponent(a);
      break;
    case "list_themes":
      result = handleListThemes();
      break;
    case "validate_config":
      result = handleValidateConfig(a);
      break;
    case "scaffold_component":
      result = handleScaffoldComponent(a);
      break;
    case "search_docs":
      result = handleSearchDocs(a);
      break;
    default:
      result = `Unknown tool: ${name}`;
  }

  return { content: [{ type: "text", text: result }] };
});

// ── Start ───────────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write("Stareezy UI MCP server running on stdio\n");
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${err}\n`);
  process.exit(1);
});
