
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  MicrophoneIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useMCPClient } from '@/hooks/useMCPClient';
import { useVoiceSearch } from '@/hooks/useVoiceSearch';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mcpClient, isConnected } = useMCPClient();
  const { isListening, startListening, hasPermission, error } = useVoiceSearch(setInputValue, {
    onError: (error) => console.warn('Voice search error:', error),
    continuous: false,
    interimResults: true
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setMessages([{
        id: '1',
        type: 'assistant',
        content: 'Hi! I\'m your AI real estate assistant. I can help you find homes, get property valuations, analyze market trends, and answer any questions about Centennial Hills. What can I help you with today?',
        timestamp: new Date(),
        suggestions: [
          'Find homes with pools under $700k',
          'What\'s my home worth?',
          'Best schools in Centennial Hills',
          'Market trends for 2024'
        ]
      }]);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !isConnected) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Determine the type of query and route to appropriate MCP tool
      let response;
      const query = inputValue.toLowerCase();

      if (query.includes('find') || query.includes('search') || query.includes('home') || query.includes('house')) {
        // Property search
        response = await mcpClient.searchPropertiesAI(inputValue, {});
      } else if (query.includes('worth') || query.includes('value') || query.includes('price')) {
        // Property valuation
        response = await mcpClient.getInstantValuation(inputValue, {});
      } else if (query.includes('market') || query.includes('trend')) {
        // Market analysis
        response = await mcpClient.getMarketForecast('Centennial Hills', '1year');
      } else {
        // General real estate knowledge
        response = {
          content: [{
            type: 'text',
            text: JSON.stringify({
              answer: 'I can help you with property searches, home valuations, market trends, and neighborhood information. Could you be more specific about what you\'re looking for?',
              suggestions: [
                'Search for 3-bedroom homes',
                'Get a home valuation',
                'Show market trends',
                'Find homes near good schools'
              ]
            })
          }]
        };
      }

      const data = JSON.parse(response.content[0].text);
      
      let assistantContent = '';
      let suggestions: string[] = [];

      if (data.properties) {
        assistantContent = `I found ${data.totalResults} properties matching your search. Here are some highlights:\n\n`;
        data.properties.slice(0, 3).forEach((prop: any, index: number) => {
          assistantContent += `${index + 1}. ${prop.address} - $${prop.price.toLocaleString()}\n   ${prop.bedrooms} bed, ${prop.bathrooms} bath, ${prop.sqft} sq ft\n\n`;
        });
        if (data.aiInsights) {
          assistantContent += `💡 AI Insight: ${data.aiInsights}`;
        }
        suggestions = ['Refine search', 'Show more properties', 'Get property details', 'Schedule showing'];
      } else if (data.valuation) {
        assistantContent = `Based on my analysis, your property is estimated to be worth:\n\n💰 **$${data.valuation.estimate.toLocaleString()}**\n\nRange: $${data.valuation.range.low.toLocaleString()} - $${data.valuation.range.high.toLocaleString()}\nConfidence: ${data.valuation.confidence}%\n\nThis estimate is based on recent comparable sales in your area.`;
        suggestions = ['Get detailed report', 'Compare with neighbors', 'Market my home', 'Schedule consultation'];
      } else if (data.forecast) {
        assistantContent = `Here's the market forecast for Centennial Hills:\n\n📈 **Market Outlook**: ${data.forecast.outlook}\n📊 **Price Trend**: ${data.forecast.priceTrend}\n🏠 **Inventory**: ${data.forecast.inventory}\n\n${data.forecast.summary}`;
        suggestions = ['Neighborhood comparison', 'Investment analysis', 'Best time to buy/sell', 'Market alerts'];
      } else {
        assistantContent = data.answer || 'I\'m here to help with all your real estate needs in Centennial Hills!';
        suggestions = data.suggestions || ['Property search', 'Home valuation', 'Market trends', 'Contact agent'];
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
        suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Assistant error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again or contact Dr. Jan Duffy directly for assistance.',
        timestamp: new Date(),
        suggestions: ['Try again', 'Contact agent', 'Browse properties', 'Market insights']
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  if (!isConnected) {
    return null; // Don't show if MCP client isn't connected
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: isOpen ? 45 : 0,
          scale: isOpen ? 0.9 : 1
        }}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Real Estate Assistant</h3>
                  <p className="text-sm text-blue-100">Powered by Centennial Hills MCP</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.suggestions && (
                      <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left px-2 py-1 text-sm bg-white/10 hover:bg-white/20 rounded transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about homes, valuations, or market trends..."
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={startListening}
                    disabled={!hasPermission}
                    title={error || 'Click to speak'}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded ${
                      isListening ? 'text-red-500 animate-pulse' : 
                      !hasPermission ? 'text-gray-300 cursor-not-allowed' :
                      'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <MicrophoneIcon className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
