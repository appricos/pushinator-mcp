# Pushinator MCP

[![smithery badge](https://smithery.ai/badge/@appricos/pushinator-mcp)](https://smithery.ai/server/@appricos/pushinator-mcp)

### Installing via Smithery

To install Pushinator for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@appricos/pushinator-mcp):

```bash
npx -y @smithery/cli install @appricos/pushinator-mcp --client claude
```

### Manual Installation
To install dependencies:

```bash
bun install
```

To build:

```bash
bun run build
```

After that, add the Pushinator MCP to your MCP client (the API token can be retrieved in your [Pushinator API tokens page](https://console.pushinator.com/tokens])):

```json
{
    "mcpServers": {
        "pushinator": {
            "command": "node",
            "args": ["path-to-repo/build/index.js"],
            "env": {
                "PUSHINATOR_API_KEY": "YOUR_PUSHINATOR_API_KEY"
            }
        }
    }
}
```
