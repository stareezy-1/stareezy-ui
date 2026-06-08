import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "MCP Server",
  description:
    "Connect Stareezy UI to any MCP-compatible AI assistant. Query tokens, scaffold components, and validate configs through a standard tool interface.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/mcp-server" },
};

const sectionHeader: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: "2.5rem 0 0.75rem",
  color: "var(--color-text)",
};

const codeBlock: React.CSSProperties = {
  background: "var(--color-code-bg)",
  borderRadius: 12,
  padding: "1.5rem",
  overflowX: "auto" as const,
  margin: "1.5rem 0",
  border: "1px solid var(--brand-100)",
  boxShadow: "var(--shadow-md)",
};

const codeBlockInner: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.875rem",
  color: "var(--color-text)",
  lineHeight: 1.7,
  whiteSpace: "pre" as const,
};

const toolGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "0.85rem",
  margin: "1.5rem 0",
};

const toolCard: React.CSSProperties = {
  background: "var(--color-surface-2)",
  border: "1px solid var(--brand-100)",
  borderRadius: 14,
  padding: "1.25rem",
  boxShadow: "var(--shadow-sm)",
};

const TOOLS = [
  {
    name: "get_tokens",
    desc: "List all design tokens by category. Accepts an optional category filter (colors, spacing, radius, typography, shadows).",
    icon: "◉",
    color: "var(--brand-primary)",
  },
  {
    name: "get_token",
    desc: "Get the value and metadata for a single token by its dot-path, e.g. colors.celurenBlue.500.",
    icon: "⊛",
    color: "var(--brand-primary)",
  },
  {
    name: "list_components",
    desc: "Return a summary of all 31+ components with their prop signatures and import paths.",
    icon: "⬡",
    color: "var(--brand-accent)",
  },
  {
    name: "get_component",
    desc: "Get full props, usage examples, and platform notes for a specific component by name.",
    icon: "◈",
    color: "var(--brand-accent)",
  },
  {
    name: "list_themes",
    desc: "List all built-in themes (quasar, aurora, steins-gate, dark, light) with their brand color values.",
    icon: "◑",
    color: "var(--brand-primary)",
  },
  {
    name: "validate_config",
    desc: "Validate a stareezy.config.ts contents — check that themes, breakpoints, and shorthands are well-formed.",
    icon: "✓",
    color: "var(--brand-primary)",
  },
  {
    name: "scaffold_component",
    desc: "Generate a production-ready component scaffold using the correct token accessor pattern for a given component type.",
    icon: "▶",
    color: "var(--brand-accent)",
  },
  {
    name: "search_docs",
    desc: "Full-text search across all Stareezy UI documentation pages. Returns ranked results with relevant excerpts.",
    icon: "⊞",
    color: "var(--brand-primary)",
  },
];

export default function McpServerPage() {
  return (
    <DocPage
      title="MCP Server"
      description="Connect any MCP-compatible AI assistant to Stareezy UI — query tokens, scaffold components, validate configs, and search docs through a standard tool interface."
      badge="Integration"
      badgeColor="var(--brand-primary)"
      icon="⚡"
    >
      <Callout type="tip">
        The Stareezy UI MCP server works with <strong>Claude Desktop</strong>,{" "}
        <strong>Claude Code</strong>, <strong>Cursor</strong>,{" "}
        <strong>Windsurf</strong>, and any other editor or assistant that
        supports the Model Context Protocol.
      </Callout>

      {/* ── What it does ─────────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>
        What it does
      </h2>
      <p>
        The MCP server exposes Stareezy UI as a set of structured tools that AI
        assistants can call directly. Instead of relying on training data or
        skill files, the assistant queries live token values, component APIs,
        and your project config — giving it accurate, always-up-to-date
        knowledge of the design system.
      </p>

      {/* ── Available tools ──────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>
        Available tools
      </h2>

      <div style={toolGrid}>
        {TOOLS.map((tool) => (
          <div key={tool.name} style={toolCard}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "0.6rem",
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "var(--brand-50)",
                  border: "1px solid var(--brand-100)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  color: "var(--brand-primary)",
                  flexShrink: 0,
                }}
              >
                {tool.icon}
              </span>
              <code
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--brand-primary)",
                }}
              >
                {tool.name}
              </code>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.82rem",
                color: "var(--color-text-2)",
                lineHeight: 1.6,
              }}
            >
              {tool.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── Installation ─────────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>
        Installation
      </h2>

      <Step n={1} title="Install the MCP server">
        <p style={{ marginBottom: "0.75rem" }}>
          The server ships as a standalone npm package and runs via{" "}
          <code>npx</code> — no global install needed.
        </p>
        <div style={codeBlock}>
          <code style={codeBlockInner}>{`# Run directly (recommended)
npx @stareezy-ui/mcp-server

# Or install globally
npm install -g @stareezy-ui/mcp-server
stareezy-mcp`}</code>
        </div>
      </Step>

      <Step n={2} title="Add to your editor config">
        <p style={{ marginBottom: "0.75rem" }}>
          <strong>Claude Desktop</strong> — add to{" "}
          <code>
            ~/Library/Application Support/Claude/claude_desktop_config.json
          </code>
          :
        </p>
        <div style={codeBlock}>
          <code style={codeBlockInner}>{`{
  "mcpServers": {
    "stareezy-ui": {
      "command": "npx",
      "args": ["@stareezy-ui/mcp-server@latest"],
      "env": {}
    }
  }
}`}</code>
        </div>

        <p style={{ margin: "1rem 0 0.75rem" }}>
          <strong>Kiro / Cursor / Windsurf</strong> — add to{" "}
          <code>.kiro/settings/mcp.json</code> or your editor&apos;s equivalent
          MCP config:
        </p>
        <div style={codeBlock}>
          <code style={codeBlockInner}>{`{
  "mcpServers": {
    "stareezy-ui": {
      "command": "npx",
      "args": ["@stareezy-ui/mcp-server@latest"],
      "disabled": false,
      "autoApprove": ["get_tokens", "list_components", "list_themes", "search_docs"]
    }
  }
}`}</code>
        </div>

        <Callout type="tip">
          Add <code>get_tokens</code>, <code>list_components</code>, and{" "}
          <code>search_docs</code> to <code>autoApprove</code> — they are
          read-only and safe to run without confirmation prompts.
        </Callout>
      </Step>

      <Step n={3} title="Verify the connection">
        <p style={{ marginBottom: "0.5rem" }}>
          Once configured, ask your assistant to use the server:
        </p>
        <div style={codeBlock}>
          <code
            style={codeBlockInner}
          >{`"Use the Stareezy UI MCP server to list all spacing tokens"

"Get the full props for the Button component from Stareezy UI"

"Scaffold a hero section using Stareezy UI tokens"`}</code>
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-2)",
            marginTop: "0.5rem",
          }}
        >
          The assistant will call the appropriate tools and return live,
          accurate results from the design system.
        </p>
      </Step>

      {/* ── Usage examples ───────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>
        Usage examples
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          margin: "1.5rem 0",
        }}
      >
        {[
          {
            tool: "get_tokens",
            prompt: '"What spacing tokens are available in Stareezy UI?"',
            result:
              "Returns all spacing.[n] values with their pixel equivalents",
          },
          {
            tool: "scaffold_component",
            prompt: '"Scaffold a dashboard card component using Stareezy UI"',
            result:
              "Generates Card.tsx, Card.style.ts, Card.types.ts with correct token imports",
          },
          {
            tool: "get_component",
            prompt: '"Show me the full API for the Drawer component"',
            result:
              "Returns all props, types, platform notes, and a usage example",
          },
          {
            tool: "validate_config",
            prompt: '"Is my stareezy.config.ts valid?"',
            result:
              "Checks themes, breakpoints, shorthands and returns any issues",
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "var(--brand-50)",
              border: "1px solid var(--brand-100)",
              borderRadius: 12,
              padding: "1rem 1.25rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <code
                style={{
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  color: "var(--brand-primary)",
                  background: "var(--brand-100)",
                  padding: "2px 7px",
                  borderRadius: 5,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {item.tool}
              </code>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {item.prompt}
                </div>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-text-2)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  → {item.result}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Configuration options ─────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>
        Configuration options
      </h2>
      <p>
        Pass environment variables or CLI flags to customize server behavior:
      </p>

      <div style={codeBlock}>
        <code
          style={codeBlockInner}
        >{`# Point at a custom stareezy.config.ts location
STAREEZY_CONFIG=./config/stareezy.config.ts npx @stareezy-ui/mcp-server

# Enable verbose tool call logging
STAREEZY_MCP_LOG=verbose npx @stareezy-ui/mcp-server

# Pin to a specific package version for reproducibility
npx @stareezy-ui/mcp-server@1.0.0`}</code>
      </div>

      <div style={{ overflowX: "auto", margin: "1rem 0 2rem" }}>
        <table>
          <thead>
            <tr>
              <th>Variable</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "STAREEZY_CONFIG",
                "./stareezy.config.ts",
                "Path to your project config file",
              ],
              [
                "STAREEZY_MCP_LOG",
                "error",
                "Log level: error | info | verbose",
              ],
              [
                "STAREEZY_MCP_PORT",
                "stdio",
                "Transport: stdio (default) or http:<port>",
              ],
            ].map(([variable, def, desc]) => (
              <tr key={variable}>
                <td>
                  <code style={{ color: "var(--brand-primary)" }}>
                    {variable}
                  </code>
                </td>
                <td>
                  <code
                    style={{ color: "var(--color-text-2)", fontSize: "0.82em" }}
                  >
                    {def}
                  </code>
                </td>
                <td
                  style={{ color: "var(--color-text-2)", fontSize: "0.875rem" }}
                >
                  {desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="info">
        The MCP server is open source. Source code and issue tracker are at{" "}
        <a href="https://github.com/stareezy-1/stareezy-ui/tree/main/packages/mcp-server">
          github.com/stareezy-1/stareezy-ui
        </a>
        . For Claude skill files (no server required), see{" "}
        <a href="/docs/claude-skills">Skills for Claude</a>.
      </Callout>
    </DocPage>
  );
}
