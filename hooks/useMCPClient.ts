import { useState, useEffect, useCallback } from 'react';

interface MCPClientResponse {
  success: boolean;
  data?: any;
  error?: string;
}

interface MCPClientHook {
  connected: boolean;
  loading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<MCPClientResponse>;
  disconnect: () => void;
}

export function useMCPClient(): MCPClientHook {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string): Promise<MCPClientResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/mcp-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setError(null);
  }, []);

  useEffect(() => {
    // Initialize connection
    setConnected(true);
  }, []);

  return {
    connected,
    loading,
    error,
    sendMessage,
    disconnect,
  };
}

export default useMCPClient;