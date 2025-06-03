
import { MCPClient } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

export class CentennialHillsMCPClient {
  private client: MCPClient;
  private isConnected: boolean = false;

  constructor() {
    this.client = new MCPClient({
      name: 'centennial-hills-client',
      version: '1.0.0'
    });
  }

  async connect() {
    if (this.isConnected) return;
    
    try {
      const transport = new StdioClientTransport({
        command: 'node',
        args: ['lib/mcp-server.ts']
      });
      
      await this.client.connect(transport);
      this.isConnected = true;
      console.log('MCP Client connected');
    } catch (error) {
      console.error('Failed to connect MCP client:', error);
    }
  }

  async callTool(name: string, args: any) {
    if (!this.isConnected) await this.connect();
    
    try {
      const response = await this.client.callTool({
        name,
        arguments: args
      });
      return response;
    } catch (error) {
      console.error(`Tool ${name} failed:`, error);
      throw error;
    }
  }

  async readResource(uri: string) {
    if (!this.isConnected) await this.connect();
    
    try {
      const response = await this.client.readResource({ uri });
      return response;
    } catch (error) {
      console.error(`Resource ${uri} failed:`, error);
      throw error;
    }
  }

  async searchPropertiesAI(query: string, filters: any = {}) {
    return await this.callTool('search_properties_ai', { query, filters });
  }

  async getInstantValuation(address: string, propertyDetails: any = {}) {
    return await this.callTool('instant_valuation', { address, propertyDetails });
  }

  async getMarketForecast(neighborhood: string, timeframe: string = '1year') {
    return await this.callTool('market_forecast', { neighborhood, timeframe });
  }

  async findLifestyleMatches(lifestyle: any) {
    return await this.callTool('lifestyle_match', { lifestyle });
  }

  async analyzeInvestment(propertyId: string, goals: any) {
    return await this.callTool('investment_analyzer', { propertyId, investmentGoals: goals });
  }
}

export const mcpClient = new CentennialHillsMCPClient();
