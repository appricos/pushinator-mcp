# Pushinator MCP

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

<a href="https://glama.ai/mcp/servers/@appricos/pushinator-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@appricos/pushinator-mcp/badge" alt="mcp-pushinator MCP server" />
</a>