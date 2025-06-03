import { useState, useEffect, useCallback } from 'react';
import { mcpClient, MCPResponse } from '../lib/mcp-client';

interface MCPClient {
  connect(): Promise<void>;
  disconnect(): void;
  sendMessage(message: any): Promise<any>;
}

interface MCPClientHook {
  mcpClient: MCPClient | null;
  isConnected: boolean;
  isLoading: boolean;
  error: Error | null;
}

export const useMCPClient = (): MCPClientHook => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsConnected(mcpClient.connected);
  }, []);

  const wrappedClient: MCPClient = {
    connect: async () => {
      setIsLoading(true);
      setError(null);

      try {
        const success = await mcpClient.connect();
        setIsConnected(success);
        if (!success) {
          setError(new Error('Failed to connect to MCP server'));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    },

    disconnect: () => {
      mcpClient.disconnect();
      setIsConnected(false);
      setError(null);
    },

    sendMessage: async (message: any) => {
      try {
        const response = await mcpClient.sendMessage(message);
        return { content: response.data?.message || 'Response from AI assistant' };
      } catch (err) {
        return { content: 'Sorry, I encountered an error processing your request.' };
      }
    }
  };

  return {
    mcpClient: isConnected ? wrappedClient : null,
    isConnected,
    isLoading,
    error
  };
};