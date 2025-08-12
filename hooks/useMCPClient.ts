import { useCallback, useEffect, useState } from 'react';

interface MCPClientResponse {
  success: boolean;
  data?: any;
  error?: string;
}

interface MCPClientHook {
  sendMessage: (message: string) => Promise<MCPClientResponse>;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export function useMCPClient(): MCPClientHook {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string): Promise<MCPClientResponse> => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  }, []);

  const connect = useCallback(async () => {
    if (!isConnected) {
      setIsConnected(true);
      setError(null);
    }
  }, [isConnected]);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setError(null);
  }, []);

  useEffect(() => {
    // Initialize connection
    setIsConnected(true);
  }, []);

  return {
    sendMessage,
    isConnected,
    isLoading,
    error,
    connect,
    disconnect,
  };
}

export default useMCPClient;
