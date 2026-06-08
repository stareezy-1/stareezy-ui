import type { Metadata } from "next";
import { DocPage, Callout, Step } from "../../../components/DocPage";

export const metadata: Metadata = {
  title: "MCP Server",
  description: "Stareezy UI MCP Server — connect Claude, Cursor, and other AI tools to your design tokens and components via the Model Context Protocol.",
  alternates: { canonical: "https://ui.stareezy.tech/docs/mcp-server" },
};

export default function McpServerPage() {
  return (
    <DocPage
      title="MCP Server"
      description="Connect Claude, Cursor, and other AI tools to your Stareezy UI design tokens and components through the Model Context Protocol."
      badge="Integration"
      badgeColor="#ff6a1a"
      icon="⚡"
    >
      <h2>Overview</h2>
      <p>
        The Model Context Protocol (MCP) is an open standard that lets AI
        assistants securely access tools and data in your development
        environment. The Stareezy UI MCP Server bridges this protocol with your
        design system, enabling AI tools to read your design tokens, inspect
        component APIs, and generate production-ready code that respects your
        theme.
      </p>

      <Callout type="info">
        MCP replaces brittle copy-paste workflows with structured, context-aware
        AI interactions. Your design tokens stay the source of truth.
      </Callout>

      <h2>Quick Start</h2>
      <p>Get up and running in three steps:</p>

      <Step n={1} title="Install the MCP server package">
        <p>Run the server package directly with npx:</p>
        <pre><code>npx @stareezy-ui/mcp</code></pre>
      </Step>

      <Step n={2} title="Configure your AI tool">
        <p>
          Point your AI assistant to the MCP server. Each tool has its own
          configuration format.
        </p>
      </Step>

      <Step n={3} title="Start prompting about your design tokens">
        <p>
          Ask your AI assistant anything about your design system:
        </p>
        <pre><code>{`"What are my primary brand colors?"
"Generate a Button component using my theme tokens"
"Create a card component with the correct spacing and radius tokens"`}</code></pre>
      </Step>

      <h2>Configuration</h2>
      <p>
        The MCP server is configured through your AI tool&apos;s MCP settings:
      </p>
      <pre><code>{`{
  "mcpServers": {
    "stareezy-ui": {
      "command": "npx",
      "args": ["-y", "@stareezy-ui/mcp"],
      "env": {
        "STAREEZY_PROJECT_PATH": "/path/to/your/project"
      }
    }
  }
}`}</code></pre>

      <Callout type="tip">
        The MCP server respects your <code>stareezy.config.ts</code> — any
        custom tokens, media queries, or shorthands you&apos;ve defined are
        immediately available to the AI.
      </Callout>

      <h2>Claude Desktop Setup</h2>
      <p>
        Add the Stareezy UI MCP server to your Claude Desktop configuration:
      </p>
      <pre><code>{`{
  "mcpServers": {
    "stareezy-ui": {
      "command": "npx",
      "args": ["-y", "@stareezy-ui/mcp"],
      "env": {
        "STAREEZY_PROJECT_PATH": "/Users/you/projects/my-app"
      }
    }
  }
}`}</code></pre>

      <h2>Cursor Setup</h2>
      <p>
        Add to <code>.cursor/mcp.json</code> in your project root:
      </p>
      <pre><code>{`{
  "mcpServers": {
    "stareezy-ui": {
      "command": "npx",
      "args": ["-y", "@stareezy-ui/mcp"],
      "env": {
        "STAREEZY_PROJECT_PATH": "."
      }
    }
  }
}`}</code></pre>
    </DocPage>
  );
}
