import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const PUSHINATOR_API_BASE = "https://api.pushinator.com/api/v2";
const USER_AGENT = "pushinator-mcp/1.0";

interface PushinatorResponse {
    message: string;
    success: boolean;
}

const server = new McpServer({
    name: "pushinator-mcp",
    description: "A Model Context Protocol server for sending notifications via Pushinator",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});


server.resource("get-channels", "pushinator://channels", {}, async (uri) => {
    const channelsUrl = `${PUSHINATOR_API_BASE}/channels/`;
    const response = await fetch(channelsUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "User-Agent": USER_AGENT,
            "Authorization": `Bearer ${process.env.PUSHINATOR_API_KEY}`,
        },
    });
    const channelsData = await response.json();
    const channels = channelsData.data.map((channel: any) => ({
        id: channel.id,
        name: channel.name,
        description: channel.description || "No description available",
    }));
    return {
        contents: [
            {
                uri: uri.href,
                text: JSON.stringify(channels, null, 2),
                mimeType: "application/json",
            },
        ],
    };
});

server.tool(
    "send-notification",
    "Send a notification via the Pushinator API",
    {
        channel_id: z.string().describe("UUID of the channel to send the notification to"),
        content: z.string().describe("String content of the notification"),
    },
    async ({ channel_id, content }) => {
        const notificationUrl = `${PUSHINATOR_API_BASE}/notifications/send/`;

        const response = await fetch(notificationUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": USER_AGENT,
                "Authorization": `Bearer ${process.env.PUSHINATOR_API_KEY}`,
            },
            body: JSON.stringify({
                channel_id,
                content,
            }),
        });


        const responseData: PushinatorResponse = await response.json();

        return {
            content: [
                {
                    type: "text",
                    text: responseData.message,
                },
            ],
        };
    },
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Pushinator MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});