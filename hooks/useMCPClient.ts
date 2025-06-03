import { useState, useEffect, useCallback } from 'react';
import { mcpClient, MCPResponse, MCPClient } from '../lib/mcp-client';

interface MCPClientHook {
  mcpClient: {
    sendMessage: (message: any) => Promise<{ content: string }>;
  };
  isConnected: boolean;
  isLoading: boolean;
  error: Error | null;
  connected: boolean;
  loading: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  sendMessage: (message: any) => Promise<MCPResponse>;
}

export const useMCPClient = (): MCPClientHook => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setConnected(mcpClient.connected);
  }, []);

  const connect = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const success = await mcpClient.connect();
      setConnected(success);
      if (!success) {
        setError(new Error('Failed to connect to MCP server'));
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    mcpClient.disconnect();
    setConnected(false);
    setError(null);
  }, []);

  const sendMessage = useCallback(async (message: any): Promise<MCPResponse> => {
    try {
      return await mcpClient.sendMessage(message);
    } catch (err) {
      return { success: false, error: String(err) };
    }
  }, []);

  const result = {
    mcpClient: {
      sendMessage: async (message: any) => {
        try {
          const response = await mcpClient.sendMessage(message);
          return { content: response.data?.message || 'Response from AI assistant' };
        } catch (err) {
          return { content: 'Sorry, I encountered an error processing your request.' };
        }
      }
    },
    isConnected: connected,
    isLoading: loading,
    error,
    connected,
    loading,
    connect,
    disconnect,
    sendMessage
  };
  
  return result;
};