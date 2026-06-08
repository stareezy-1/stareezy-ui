# @stareezy-ui/mcp-server

MCP server for Stareezy UI. Exposes design tokens, component APIs, themes, scaffolding, and docs search as structured tools for any MCP-compatible AI assistant.

## Usage

```bash
# Run directly — no global install needed
npx @stareezy-ui/mcp-server

# Install globally
npm install -g @stareezy-ui/mcp-server
stareezy-mcp
```

## Editor config

### Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "stareezy-ui": {
      "command": "npx",
      "args": ["@stareezy-ui/mcp-server@latest"]
    }
  }
}
```

### Kiro / Cursor / Windsurf

`.kiro/settings/mcp.json` or equivalent:

```json
{
  "mcpServers": {
    "stareezy-ui": {
      "command": "npx",
      "args": ["@stareezy-ui/mcp-server@latest"],
      "disabled": false,
      "autoApprove": [
        "get_tokens",
        "list_components",
        "list_themes",
        "search_docs"
      ]
    }
  }
}
```

## Available tools

| Tool                 | Description                             |
| -------------------- | --------------------------------------- |
| `get_tokens`         | List all tokens by category             |
| `get_token`          | Get a single token by dot-path          |
| `list_components`    | Summary of all 31+ components           |
| `get_component`      | Full props + examples for one component |
| `list_themes`        | All 5 built-in themes with brand colors |
| `validate_config`    | Validate a stareezy.config.ts           |
| `scaffold_component` | Generate component file scaffold        |
| `search_docs`        | Search documentation                    |

## Environment variables

| Variable           | Default                | Description                         |
| ------------------ | ---------------------- | ----------------------------------- |
| `STAREEZY_CONFIG`  | `./stareezy.config.ts` | Path to project config              |
| `STAREEZY_MCP_LOG` | `error`                | Log level: error \| info \| verbose |

## Build

```bash
pnpm --filter @stareezy-ui/mcp-server build
```
