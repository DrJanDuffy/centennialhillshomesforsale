
import { useEffect, useState } from 'react';
import { mcpClient } from '@/lib/mcp-client';

export function useMCPClient() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeMCP = async () => {
      try {
        await mcpClient.connect();
        setIsConnected(true);
      } catch (error) {
        console.error('MCP initialization failed:', error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeMCP();
  }, []);

  return {
    mcpClient,
    isConnected,
    isLoading,
    searchProperties: mcpClient.searchPropertiesAI.bind(mcpClient),
    getValuation: mcpClient.getInstantValuation.bind(mcpClient),
    getMarketForecast: mcpClient.getMarketForecast.bind(mcpClient),
    findLifestyleMatches: mcpClient.findLifestyleMatches.bind(mcpClient),
    analyzeInvestment: mcpClient.analyzeInvestment.bind(mcpClient)
  };
}
