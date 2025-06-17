
import type { NextApiRequest, NextApiResponse } from 'next';

interface ChatResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    // Simulate AI response for real estate queries
    const response = generateRealEstateResponse(message);

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error('MCP Chat API error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}

function generateRealEstateResponse(message: string) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('search') || lowerMessage.includes('property') || lowerMessage.includes('home')) {
    return {
      type: 'property_search',
      message: 'I found several properties matching your criteria in Centennial Hills. Would you like to see listings in Providence, Skye Canyon, or other areas?',
      suggestions: [
        'Show me homes under $800k',
        'Properties with 4+ bedrooms',
        'New construction homes',
        'Golf course properties'
      ]
    };
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('value') || lowerMessage.includes('market')) {
    return {
      type: 'market_info',
      message: 'Current market conditions in Centennial Hills show strong appreciation. The median home price is around $650k with properties typically selling within 15-30 days.',
      data: {
        medianPrice: '$650,000',
        averageDays: '15-30 days',
        appreciation: '8.5% YoY'
      }
    };
  }
  
  return {
    type: 'general',
    message: 'I\'d be happy to help you with your real estate needs in Centennial Hills, Providence, or Skye Canyon. What specific information are you looking for?',
    suggestions: [
      'Search for properties',
      'Get market analysis',
      'Schedule a showing',
      'Contact Dr. Jan Duffy'
    ]
  };
}
