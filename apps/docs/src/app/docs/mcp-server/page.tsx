import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "MCP Server",
  description:
    "Quasify UI MCP Server — connect Claude, Cursor, and other AI tools to your design tokens and components via the Model Context Protocol.",
  alternates: { canonical: "https://ui.quasify.app/docs/mcp-server" },
};

const sectionHeader: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: "2.5rem 0 0.75rem",
  color: "var(--color-text)",
};

const codeBlock: React.CSSProperties = {
  background: "#010103",
  borderRadius: 12,
  padding: "1.5rem",
  overflowX: "auto" as const,
  margin: "1.5rem 0",
  border: "1px solid rgba(255,106,26,0.1)",
  boxShadow: "0 0 40px rgba(255,106,26,0.05)",
};

const codeBlockInner: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.875rem",
  color: "#e2e8f0",
  lineHeight: 1.7,
  whiteSpace: "pre" as const,
};

export default function McpServerPage() {
  return (
    <DocPage
      title="MCP Server"
      description="Connect Claude, Cursor, and other AI tools to your Quasify UI design tokens and components through the Model Context Protocol."
      badge="Integration"
      badgeColor="#ff6a1a"
      icon="⚡"
    >
      {/* ── Overview ───────────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>Overview</h2>
      <p>
        The Model Context Protocol (MCP) is an open standard that lets AI
        assistants securely access tools and data in your development
        environment. The <strong>Quasify UI MCP Server</strong> bridges this
        protocol with your design system, enabling AI tools to read your design
        tokens, inspect component APIs, and generate production-ready code that
        respects your theme — all without leaving the chat.
      </p>

      <Callout type="info">
        MCP replaces brittle copy-paste workflows with structured, context-aware
        AI interactions. Your design tokens stay the source of truth — the AI
        reads them directly from your project.
      </Callout>

      {/* ── Quick Start ──────────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>Quick Start</h2>
      <p>Get up and running in three steps:</p>

      <Step n={1} title="Install the MCP server package">
        <p>Run the server package directly with npx — no global install needed:</p>
        <div style={codeBlock}>
          <code style={codeBlockInner}>{`npx @quasify-ui/mcp`}</code>
        </div>
        <p>
          This starts the MCP server on <code>stdio</code>, ready to accept
          connections from any MCP-compatible AI tool.
        </p>
      </Step>

      <Step n={2} title="Configure your AI tool">
        <p>
          Point your AI assistant to the MCP server. Each tool has its own
          configuration format — see the{" "}
          <strong>Configuration</strong> section below for Claude Desktop,
          Cursor, and others.
        </p>
      </Step>

      <Step n={3} title="Start prompting about your design tokens">
        <p>
          Once connected, ask your AI assistant anything about your design
          system — from token values to component usage:
        </p>
        <div style={codeBlock}>
          <code style={codeBlockInner}>{`"What are my primary brand colors?"
"Generate a Button component using my theme tokens"
"Analyze my current theme for accessibility issues"
"Create a card component with the correct spacing and radius tokens"`}</code>
        </div>
      </Step>

      <Callout type="tip">
        The MCP server respects your <code>quasify.config.ts</code> — any
        custom tokens, media queries, or shorthands you&apos;ve defined are
        immediately available to the AI.
      </Callout>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>Features</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
          margin: "1.5rem 0",
        }}
      >
        {[
          {
            title: "Token Discovery",
            desc: "Browse all design tokens — colors, spacing, typography, breakpoints, shadows, and more — directly from your AI assistant.",
            icon: "◉",
          },
          {
            title: "Component Generation",
            desc: "Generate components that automatically use the correct tokens from your theme. No more hardcoded values.",
            icon: "✦",
          },
          {
            title: "Theme Analysis",
            desc: "Analyze and compare themes. Check contrast ratios, validate token coverage, and identify inconsistencies across themes.",
            icon: "⊛",
          },
          {
            title: "Code Generation",
            desc: "Generate production-ready Quasify UI code that respects your design system. Copy, paste, and ship.",
            icon: "⚙",
          },
        ].map((feature) => (
          <div key={feature.title} className="glass-card" style={{ padding: "1.5rem", borderRadius: "var(--radius-md)" }}>
            <div
              style={{
                fontSize: "1.5rem",
                marginBottom: "0.75rem",
              }}
            >
              {feature.icon}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--color-text)",
                marginBottom: "0.5rem",
              }}
            >
              {feature.title}
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-2)",
                lineHeight: 1.6,
              }}
            >
              {feature.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ── Configuration ────────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>Configuration</h2>
      <p>
        The MCP server is configured through your AI tool&apos;s MCP settings.
        Below is the standard configuration format that works across most
        clients:
      </p>

      <div style={codeBlock}>
        <code style={codeBlockInner}>{`{
  "mcpServers": {
    "quasify-ui": {
      "command": "npx",
      "args": ["-y", "@quasify-ui/mcp"],
      "env": {
        "QUASIFY_PROJECT_PATH": "/path/to/your/project"
      }
    }
  }
}`}</code>
      </div>

      <p>
        Set <code>QUASIFY_PROJECT_PATH</code> to the root of your Quasify UI
        project. If omitted, the server uses the current working directory.
      </p>

      <Callout type="warning">
        The <code>QUASIFY_PROJECT_PATH</code> should point to a directory
        containing a <code>quasify.config.ts</code> file. The server reads your
        theme configuration from this file.
      </Callout>

      {/* ── Claude Desktop Setup ─────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>Claude Desktop Setup</h2>
      <p>
        Claude Desktop natively supports MCP servers. Add the Quasify UI MCP
        server to your Claude Desktop configuration file:
      </p>

      <div style={codeBlock}>
        <code style={codeBlockInner}>{`# macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
# Windows: %APPDATA%\\Claude\\claude_desktop_config.json</code></code>
      </div>

      <div style={codeBlock}>
        <code style={codeBlockInner}>{`{
  "mcpServers": {
    "quasify-ui": {
      "command": "npx",
      "args": ["-y", "@quasify-ui/mcp"],
      "env": {
        "QUASIFY_PROJECT_PATH": "/Users/you/projects/my-app"
      }
    }
  }
}`}</code>
      </div>

      <p>
        After saving the file, restart Claude Desktop. You&apos;ll see a hammer
        icon in the input area — click it to see the available Quasify UI
        tools, or just start asking questions about your design system.
      </p>

      <Callout type="tip">
        You can configure multiple MCP servers in Claude Desktop. The Quasify
        UI server works alongside other MCP tools like file system access or
        database querying.
      </Callout>

      {/* ── Cursor Setup ──────────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>Cursor Setup</h2>
      <p>
        Cursor supports MCP servers through its <code>.cursor/mcp.json</code>{" "}
        configuration file. Place this file in your project root:
      </p>

      <div style={codeBlock}>
        <code style={codeBlockInner}>{`{
  "mcpServers": {
    "quasify-ui": {
      "command": "npx",
      "args": ["-y", "@quasify-ui/mcp"],
      "env": {
        "QUASIFY_PROJECT_PATH": "."
      }
    }
  }
}`}</code>
      </div>

      <p>
        Cursor automatically detects and connects to MCP servers listed in
        your project&apos;s <code>.cursor/mcp.json</code>. No restart
        required — just start prompting in Composer or Chat.
      </p>

      {/* ── Available Tools ──────────────────────────────────────────────── */}
      <h2 className="gradient-text" style={sectionHeader}>Available Tools</h2>
      <p>
        Once connected, the MCP server exposes the following tools to your AI
        assistant:
      </p>

      <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
        <table>
          <thead>
            <tr>
              <th>Tool</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["get_tokens", "Retrieve all design tokens from your theme"],
              ["get_token", "Retrieve a specific token by path"],
              ["get_components", "List all available Quasify UI components"],
              ["get_component", "Get API and usage for a specific component"],
              ["generate_code", "Generate component code using theme tokens"],
              ["analyze_theme", "Analyze a theme for contrast and coverage"],
            ].map(([tool, desc]) => (
              <tr key={tool}>
                <td>
                  <code style={{ color: "var(--brand-primary)" }}>{tool}</code>
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
        Tools are automatically discovered by the AI — you don&apos;t need to
        memorize names. Just describe what you want and the AI will call the
        right tool.
      </Callout>
    </DocPage>
  );
}
