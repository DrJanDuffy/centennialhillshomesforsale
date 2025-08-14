'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Mic, MicOff, Send, User, X } from 'lucide-react';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'typing' | 'suggestion';
}

interface AIAssistantProps {
  className?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I&apos;m your AI real estate assistant. I can help you find properties, answer questions about neighborhoods, and guide you through the home buying process. What would you like to know?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickSuggestions = [
    'Show me homes in Centennial Hills',
    'What&apos;s the average price in Providence?',
    'Tell me about Skye Canyon',
    'How do I get pre-approved?',
    'What are closing costs?',
    'Show me luxury homes',
  ];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(
      () => {
        const aiResponses = [
          "I'd be happy to help you with that! Let me search for properties that match your criteria.",
          'Great question! Based on current market data, I can provide you with detailed insights.',
          'I found several properties that might interest you. Would you like me to show you the details?',
          'That&apos;s a common concern. Let me explain the process and what you can expect.',
          'I can help you with that! Here&apos;s what you need to know about the local market.',
          'Perfect! I have some great options for you. Let me share the details.',
        ];

        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'ai',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      },
      1500 + Math.random() * 1000
    );
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would implement actual voice recognition
    if (!isListening) {
      // Start listening
      setTimeout(() => {
        setInputValue('Show me homes in Centennial Hills under $800,000');
        setIsListening(false);
      }, 2000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 w-16 h-16 bg-gradient-to-r from-accent-color to-secondary-color text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 ${className}`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: 0 }}
              animate={{ rotate: 180 }}
              exit={{ rotate: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="ai"
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 180 }}
            >
              <Bot className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 bg-accent-color rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-24 left-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-accent-color to-secondary-color text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Bot className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold">AI Assistant</h3>
                      <p className="text-sm opacity-90">Powered by AI</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[350px] overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-start gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === 'user'
                              ? 'bg-primary-color text-white'
                              : 'bg-gradient-to-r from-accent-color to-secondary-color text-white'
                          }`}
                        >
                          {message.sender === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            message.sender === 'user'
                              ? 'bg-primary-color text-white'
                              : 'bg-tertiary text-primary'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-white/70' : 'text-secondary'
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-color to-secondary-color text-white flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-tertiary rounded-2xl px-4 py-2">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-secondary rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-secondary rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-secondary rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Quick Suggestions */}
                {messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <p className="text-xs text-secondary text-center">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                        <motion.button
                          key={suggestion}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="bg-accent-color/10 text-accent-color px-3 py-1 rounded-full text-xs hover:bg-accent-color/20 transition-colors"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-tertiary">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleListening}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isListening
                        ? 'bg-red-500 text-white'
                        : 'bg-tertiary text-secondary hover:bg-secondary-color/20'
                    }`}
                    aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                    title={isListening ? 'Stop listening' : 'Start voice input'}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </motion.button>

                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about real estate..."
                      className="w-full px-4 py-2 pr-12 bg-tertiary rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent-color/50"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-accent-color text-white flex items-center justify-center hover:bg-secondary-color transition-colors"
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
