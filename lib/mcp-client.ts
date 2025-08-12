interface MCPResponse {
  success: boolean;
  data?: {
    content: string;
    suggestions?: string[];
  };
  error?: string;
}

interface MCPClient {
  sendMessage: (message: string) => Promise<MCPResponse>;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

class MCPClientImpl implements MCPClient {
  public connected = false;
  public loading = false;
  public error: string | null = null;

  async sendMessage(message: string): Promise<MCPResponse> {
    try {
      this.loading = true;
      this.error = null;

      // Mock implementation - replace with actual MCP client
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
      return data;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Unknown error occurred';
      return {
        success: false,
        error: this.error,
      };
    } finally {
      this.loading = false;
    }
  }

  get isConnected(): boolean {
    return this.connected;
  }

  get isLoading(): boolean {
    return this.loading;
  }

  get errorValue(): string | null {
    return this.error;
  }
}

// Create and export a singleton instance
const mcpClient = new MCPClientImpl();
export default mcpClient;
