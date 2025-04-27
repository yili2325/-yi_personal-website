"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

type KeywordFrequency = {
  word: string;
  count: number;
};

type TimeSeriesData = {
  date: string;
  value: number;
};

type AIInsightProps = {
  insights: {
    keywordFrequency: KeywordFrequency[];
    emotionalStates: TimeSeriesData[];
    thinkingClarity: TimeSeriesData[];
  };
};

export default function AIInsight({ insights }: AIInsightProps) {
  const [activeTab, setActiveTab] = useState<'keywords' | 'emotions' | 'clarity'>('keywords');
  const [chatOpen, setChatOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai'; content: string}[]>([
    {
      role: 'ai',
      content: 'Hi there! I\'m Yi\'s AI Insight assistant. I analyze writing patterns, themes, and emotional tones in Yi\'s work. Ask me about trends in Yi\'s writing, creative processes, or how to gain deeper insights into thought patterns. How can I help you today?'
    }
  ]);
  
  // Get max value for normalization
  const maxKeywordCount = Math.max(...insights.keywordFrequency.map(k => k.count));
  
  // Function to call Anthropic API
  const callAnthropicAPI = async (userMessage: string) => {
    setIsLoading(true);
    try {
      // Use the insight-specific API route
      const response = await axios.post('/api/chat/insight', {
        message: userMessage,
        // Send context about the user's insights for better responses
        context: {
          topKeywords: insights.keywordFrequency.slice(0, 5).map(k => k.word),
          emotionalTrends: insights.emotionalStates.slice(-3).map(e => e.value),
          clarityTrends: insights.thinkingClarity.slice(-3).map(c => c.value)
        }
      });
      
      // Add AI response to chat
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        content: response.data.response
      }]);
      
      // Scroll to the bottom of the chat
      setTimeout(() => {
        const chatContainer = document.getElementById('chat-messages');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    } catch (error) {
      console.error('Error calling AI API:', error);
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        content: 'Sorry, I encountered an error. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle chat submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    
    // Add user message
    const message = userInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', content: message }]);
    
    // Clear input
    setUserInput('');
    
    // Call Anthropic API
    callAnthropicAPI(message);
  };
  
  return (
    <motion.section 
      className="py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="text-3xl font-serif font-bold mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        AI Insight
      </motion.h2>
      
      <motion.p
        className="text-center text-gray-700 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        AI-powered analysis of my writing patterns and emotional states
      </motion.p>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-purple-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button 
              className={`flex-1 py-4 text-center font-medium text-sm transition-colors duration-300 ${
                activeTab === 'keywords' 
                  ? 'text-purple-600 border-b-2 border-purple-500' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('keywords')}
            >
              Keyword Frequency
            </button>
            <button 
              className={`flex-1 py-4 text-center font-medium text-sm transition-colors duration-300 ${
                activeTab === 'emotions' 
                  ? 'text-purple-600 border-b-2 border-purple-500' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('emotions')}
            >
              Emotional States
            </button>
            <button 
              className={`flex-1 py-4 text-center font-medium text-sm transition-colors duration-300 ${
                activeTab === 'clarity' 
                  ? 'text-purple-600 border-b-2 border-purple-500' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('clarity')}
            >
              Thinking Clarity
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Keywords Tab */}
            {activeTab === 'keywords' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Most Frequent Topics (Last 30 Days)</h3>
                <div className="space-y-3">
                  {insights.keywordFrequency.map((keyword, index) => (
                    <motion.div 
                      key={keyword.word}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="w-24 text-sm font-medium text-gray-700">{keyword.word}</div>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full"
                          style={{ width: '0%' }}
                          animate={{ width: `${(keyword.count / maxKeywordCount) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
                        />
                      </div>
                      <div className="w-10 text-right text-sm text-gray-500 ml-2">{keyword.count}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Emotions Tab */}
            {activeTab === 'emotions' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Emotional State Flow</h3>
                <div className="h-64 relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                    <div>Energized</div>
                    <div>Neutral</div>
                    <div>Calm</div>
                  </div>
                  
                  {/* Graph area */}
                  <div className="ml-16 h-full relative">
                    {/* Horizontal grid lines */}
                    {[0.2, 0.4, 0.6, 0.8].map((level) => (
                      <div 
                        key={level}
                        className="absolute w-full h-px bg-gray-200"
                        style={{ top: `${(1 - level) * 100}%` }}
                      />
                    ))}
                    
                    {/* Data points and line */}
                    <svg className="absolute inset-0 w-full h-full">
                      {/* Line connecting points */}
                      <motion.path
                        d={`M ${insights.emotionalStates.map((point, i) => {
                          const x = (i / (insights.emotionalStates.length - 1)) * 100;
                          const y = (1 - point.value) * 100;
                          return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                        }).join(' ')}`}
                        fill="none"
                        stroke="url(#emotion-gradient)"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                      />
                      
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="emotion-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                      
                      {/* Data points */}
                      {insights.emotionalStates.map((point, i) => {
                        const x = (i / (insights.emotionalStates.length - 1)) * 100;
                        const y = (1 - point.value) * 100;
                        
                        return (
                          <motion.circle
                            key={i}
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r="4"
                            fill="white"
                            stroke="#8b5cf6"
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                          />
                        );
                      })}
                    </svg>
                    
                    {/* X-axis dates */}
                    <div className="absolute bottom-0 translate-y-full pt-2 w-full flex justify-between text-xs text-gray-500">
                      {insights.emotionalStates.map((point, i) => (
                        <div key={i} className="text-center" style={{ width: `${100 / insights.emotionalStates.length}%` }}>
                          {point.date.split('-')[2]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Clarity Tab */}
            {activeTab === 'clarity' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Thinking Clarity Progression</h3>
                <div className="h-64 relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                    <div>Precise</div>
                    <div>Developing</div>
                    <div>Fuzzy</div>
                  </div>
                  
                  {/* Graph area */}
                  <div className="ml-16 h-full relative">
                    {/* Horizontal grid lines */}
                    {[0.2, 0.4, 0.6, 0.8].map((level) => (
                      <div 
                        key={level}
                        className="absolute w-full h-px bg-gray-200"
                        style={{ top: `${(1 - level) * 100}%` }}
                      />
                    ))}
                    
                    {/* Area chart */}
                    <svg className="absolute inset-0 w-full h-full">
                      {/* Area fill */}
                      <motion.path
                        d={`
                          M 0 ${(1 - insights.thinkingClarity[0].value) * 100}
                          ${insights.thinkingClarity.map((point, i) => {
                            const x = (i / (insights.thinkingClarity.length - 1)) * 100;
                            const y = (1 - point.value) * 100;
                            return `L ${x} ${y}`;
                          }).join(' ')}
                          L 100 100
                          L 0 100
                          Z
                        `}
                        fill="url(#clarity-gradient)"
                        opacity="0.3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                      
                      {/* Line */}
                      <motion.path
                        d={`
                          M 0 ${(1 - insights.thinkingClarity[0].value) * 100}
                          ${insights.thinkingClarity.map((point, i) => {
                            const x = (i / (insights.thinkingClarity.length - 1)) * 100;
                            const y = (1 - point.value) * 100;
                            return `L ${x} ${y}`;
                          }).join(' ')}
                        `}
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                      />
                      
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="clarity-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* X-axis dates */}
                    <div className="absolute bottom-0 translate-y-full pt-2 w-full flex justify-between text-xs text-gray-500">
                      {insights.thinkingClarity.map((point, i) => (
                        <div key={i} className="text-center" style={{ width: `${100 / insights.thinkingClarity.length}%` }}>
                          {point.date.split('-')[2]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* AI Chat Assistant */}
        <div className="mt-8 relative">
          <motion.button
            className="mx-auto flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-full shadow-md"
            onClick={() => setChatOpen(!chatOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Chat with my AI Thinking Assistant
          </motion.button>
          
          {/* Chat interface */}
          {chatOpen && (
            <motion.div 
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white rounded-lg shadow-xl border border-purple-100 overflow-hidden z-10 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Chat header */}
              <div className="bg-purple-600 text-white p-3 flex justify-between items-center">
                <h3 className="font-medium">Yi's AI Thinking Assistant</h3>
                <button 
                  className="text-white hover:bg-purple-700 rounded-full p-1"
                  onClick={() => setChatOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Chat messages */}
              <div className="flex-grow overflow-y-auto p-3 space-y-3" id="chat-messages">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`${msg.role === 'user' ? 'ml-auto bg-purple-500 text-white' : 'mr-auto bg-purple-100 text-gray-800'} rounded-lg p-3 max-w-[85%] shadow-sm`}
                  >
                    {msg.content}
                  </div>
                ))}
                {isLoading && (
                  <div className="mr-auto bg-purple-100 text-gray-800 rounded-lg p-3 max-w-[85%] shadow-sm flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-sm text-gray-500">Claude is thinking...</span>
                  </div>
                )}
              </div>
              
              {/* Chat input */}
              <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-200 flex">
                <input
                  type="text"
                  className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ask about your thinking patterns..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className={`${isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} text-white px-4 py-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
