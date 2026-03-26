import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// MCP server instance

const server = new McpServer({
    name: "Weather Data Fetcher",
    version: "1.0.0",
});

// Define a tool

server.tool(
    'trackPackage',
    'Track delivery status using tracking number',
    {
        trackingNumber: z.string().describe('Package tracking number')
    },
    async (params) => {
        return {
            content: [
                {
                    type: "text",
                    text: `Checking delivery status for: ${params.trackingNumber}`
                }
            ]
        }
    }
);

// Helper a function to simulate fecthing weather data from the API

async function getWeatherByCity (city: string) {
    if (city.toLowerCase() === 'maceio') {
        return {
            temp: '32°C', forecast: 'sunny'
        }
    }
    if (city.toLowerCase() === 'rio de janeiro') {
        return {
            temp: '22°C', forecast: 'cloudy'
        }
    }

    return { temp: null, error: 'Weather data not available for this city' }
}

server.tool(
  'getWeatherByCityName',
  'Get weather data for New York or London',
  {
    city: z.string().describe('Name of the city to get weather for')
  },
  async ({city})=> {
    const weatherData = await getWeatherByCity(city);
     return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(weatherData)
        }
      ]
    };
  }

)