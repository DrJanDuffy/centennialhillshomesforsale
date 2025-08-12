import type { NextApiRequest, NextApiResponse } from 'next';

interface ChatRequest {
  message: string;
  context?: string;
}

interface ChatResponse {
  success: boolean;
  data?: {
    content: string;
    suggestions?: string[];
  };
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ChatResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { message, context }: ChatRequest = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    // Mock response for now - replace with actual MCP client integration
    const response: ChatResponse = {
      success: true,
      data: {
        content: `I received your message: "${message}". This is a mock response. In production, this would connect to the MCP client.`,
        suggestions: ['Find homes', 'Get market analysis', 'Contact agent'],
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('MCP Chat API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
