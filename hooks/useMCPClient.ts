import { useState, useEffect, useCallback } from 'react';
import { mcpClient, MCPResponse } from '../lib/mcp-client';

interface MCPClientHook {
  connected: boolean;
  loading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  sendMessage: (message: any) => Promise<MCPResponse>;
}

export const useMCPClient = (): MCPClientHook => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        setError('Failed to connect to MCP server');
      }
    } catch (err) {
      setError(String(err));
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

  return {
    connected,
    loading,
    error,
    connect,
    disconnect,
    sendMessage
  };
};