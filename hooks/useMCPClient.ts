
import { useState, useEffect, useCallback } from 'react';
import MCPClient, { MCPTool } from '../lib/mcp-client';

interface UseMCPClientReturn {
  client: MCPClient | null;
  isConnected: boolean;
  tools: MCPTool[];
  callTool: (name: string, params: any) => Promise<any>;
  error: string | null;
  loading: boolean;
}

export function useMCPClient(): UseMCPClientReturn {
  const [client, setClient] = useState<MCPClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [tools, setTools] = useState<MCPTool[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initClient = async () => {
      try {
        setLoading(true);
        const mcpClient = new MCPClient();
        await mcpClient.connect();
        
        setClient(mcpClient);
        setIsConnected(true);
        setTools(mcpClient.getTools());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize MCP client');
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    initClient();

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  const callTool = useCallback(async (name: string, params: any) => {
    if (!client) {
      throw new Error('MCP client not initialized');
    }

    try {
      setLoading(true);
      const result = await client.callTool(name, params);
      setError(null);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Tool call failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [client]);

  return {
    client,
    isConnected,
    tools,
    callTool,
    error,
    loading
  };
}
