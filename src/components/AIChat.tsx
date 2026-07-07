import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BarChart3, MapPin, Users, AlertTriangle } from 'lucide-react';
import { aiChatResponses } from '../data/mockData';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  hasChart?: boolean;
}

const suggestedQueries = [
  'Why is school expansion the top priority?',
  'Show budget allocation recommendation',
  'Explain invisible citizens analysis',
  'How does cross-lingual clustering work?',
];

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (query: string): string => {
    const queryLower = query.toLowerCase();
    if (queryLower.includes('school') || queryLower.includes('education')) {
      return aiChatResponses.school;
    }
    if (queryLower.includes('budget') || queryLower.includes('allocation')) {
      return aiChatResponses.budget;
    }
    if (queryLower.includes('invisible')) {
      return aiChatResponses.invisible;
    }
    if (queryLower.includes('cluster') || queryLower.includes('language')) {
      return aiChatResponses.cluster;
    }
    return aiChatResponses.school;
  };

  const handleSend = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setActiveQuery(messageText);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(messageText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden"
    >
      <div className="p-4 border-b border-surface-100 bg-gradient-to-r from-surface-50 to-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-soft">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-surface-900">Policy Analyst AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary-400 animate-pulse" />
              <span className="text-xs text-surface-500">Ready to analyze</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-4"
            >
              <Sparkles className="w-8 h-8 text-primary-600" />
            </motion.div>
            <h4 className="text-sm font-semibold text-surface-900 mb-2">Ask about any decision</h4>
            <p className="text-xs text-surface-500 mb-6 max-w-xs">
              Get evidence-backed analysis for infrastructure priorities, budget optimization, and citizen voices.
            </p>
            <div className="space-y-2 w-full max-w-xs">
              {suggestedQueries.map((query, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => handleSend(query)}
                  className="w-full text-left px-4 py-2.5 rounded-xl bg-surface-50 hover:bg-surface-100 text-xs text-surface-700 transition-colors border border-surface-200"
                >
                  {query}
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                      message.type === 'user'
                        ? 'bg-primary-100'
                        : 'bg-gradient-to-br from-primary-50 to-primary-100'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-primary-600" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary-600" />
                    )}
                  </div>
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className={`flex-1 p-3 rounded-xl ${
                      message.type === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-surface-50 border border-surface-200'
                    }`}
                  >
                    <div
                      className={`text-xs whitespace-pre-line ${
                        message.type === 'user' ? 'text-white' : 'text-surface-700'
                      }`}
                    >
                      {message.content.split('\n').map((line, i) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return (
                            <p key={i} className="font-semibold text-sm mb-1">
                              {line.replace(/\*\*/g, '')}
                            </p>
                          );
                        }
                        if (line.startsWith('- ')) {
                          return (
                            <p key={i} className="flex items-start gap-2 my-1">
                              <span className="w-1 h-1 rounded-full bg-current mt-1.5 flex-shrink-0" />
                              <span>{line.substring(2)}</span>
                            </p>
                          );
                        }
                        return <p key={i}>{line}</p>;
                      })}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-600" />
                </div>
                <div className="flex-1 p-3 rounded-xl bg-surface-50 border border-surface-200">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-2 h-2 rounded-full bg-primary-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-surface-200 bg-surface-50">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about priorities, budget, or citizen data..."
            className="flex-1 px-4 py-2.5 text-sm bg-white border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className="p-2.5 rounded-xl bg-primary-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
