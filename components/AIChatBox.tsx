import { MessageCircle, Send, X } from 'lucide-react';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  text: string;
  from: 'user' | 'assistant';
  timestamp: Date;
}

interface PropertyBehaviour {
  add: (feature: string) => void;
  remove: (feature: string) => void;
  has: (feature: string) => boolean;
}

interface WindowWithPropertyBehaviour extends Window {
  propertyBehaviour?: PropertyBehaviour;
}

const AIChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I&apos;m Dr. Jan Duffy&apos;s AI assistant. How can I help you with Centennial Hills real estate today?',
      from: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const addMessage = useCallback((text: string, from: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      from,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const question = inputValue.trim();
      if (!question || isLoading) return;

      // Add user message
      addMessage(question, 'user');
      setInputValue('');
      setIsLoading(true);

      try {
        // Call Perplexity API endpoint
        const response = await fetch('/api/perplexity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: question }),
        });

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        addMessage(
          data.reply || 'I apologize, but I couldn&apos;t generate a response at this time.',
          'assistant'
        );

        // Capture interests for recommendations
        if (typeof window !== 'undefined' && (window as WindowWithPropertyBehaviour).propertyBehaviour) {
          const propertyBehaviour = (window as WindowWithPropertyBehaviour).propertyBehaviour;
          if (/school|college|elementary/i.test(question)) {
            propertyBehaviour.add('feature:school');
          }
          if (/pool|spa/i.test(question)) {
            propertyBehaviour.add('feature:pool');
          }
          if (/price|budget|cost/i.test(question)) {
            propertyBehaviour.add('feature:price');
          }
          if (/neighborhood|area|community/i.test(question)) {
            propertyBehaviour.add('feature:neighborhood');
          }
          if (/park|trail|outdoor/i.test(question)) {
            propertyBehaviour.add('feature:outdoor');
          }
        }
      } catch (error) {
        console.error('Chat error:', error);
        addMessage('Sorry, something went wrong – please try again later.', 'assistant');
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [inputValue, isLoading, addMessage]
  );

  const toggleChat = useCallback(() => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleQuickQuestion = useCallback((question: string) => {
    setInputValue(question);
  }, []);

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        type="button"
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Dr. Jan Duffy&apos;s AI Assistant</h3>
                <p className="text-sm text-blue-100">Ask me about Centennial Hills real estate!</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.from === 'assistant'
                      ? 'bg-white shadow-sm border border-gray-200'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.from === 'assistant' ? 'text-gray-500' : 'text-blue-100'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white shadow-sm border border-gray-200 max-w-xs p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Centennial Hills real estate..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <Send size={16} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>

            {/* Quick Questions */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                'What&apos;s the average home price?',
                'Tell me about schools',
                'Show me neighborhoods',
              ].map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatBox;
