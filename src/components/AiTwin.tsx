"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
};

export default function AiTwin() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add welcome message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: Date.now().toString(),
        text: "Hi there! I'm Yi's AI Twin. I think, build, and reflect just like Yi does. Ask me about systems thinking, product building, or how I balance structure with emotion in my creative process. What's on your mind today?",
        sender: "ai"
      }]);
    }
  }, [isOpen, messages.length]);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Function to call the API
  const callAnthropicAPI = async (userMessage: string) => {
    setIsLoading(true);
    try {
      console.log('Sending message to API...');
      // Call the twin-specific API route
      const response = await axios.post('/api/chat/twin', {
        message: userMessage
      });
      
      console.log('Response received:', response.data);
      
      // Check if there's an error in the response
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      
      // Add AI response to chat
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.response || "I couldn't generate a response at this time.",
        sender: "ai",
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: unknown) {
      console.error('Error calling AI API:', error);
      
      // Get detailed error message if available
      let errorText = "Sorry, I encountered an error. Please try again later.";
      
      if (typeof error === 'object' && error !== null) {
        const err = error as { response?: { data?: { error?: string, details?: string } }, message?: string };
        if (err.response?.data?.error) {
          errorText = `Error: ${err.response.data.error}`;
          if (err.response.data.details) {
            errorText += ` (${err.response.data.details})`;
          }
        } else if (err.message) {
          errorText = `Error: ${err.message}`;
        }
      }
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: "ai",
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "" || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Call the API
    callAnthropicAPI(inputValue.trim());
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#7B9FFF] text-white shadow-lg hover:bg-[#6A8AE6] transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <span className="text-xl">🤖</span>
        <span className="text-sm font-medium">Talk to my AI twin</span>
      </motion.button>

      {/* Chat modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="glass relative w-full max-w-md h-[500px] rounded-2xl overflow-hidden flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C8B6FF] flex items-center justify-center">
                    <span>🤖</span>
                  </div>
                  <h3 className="font-semibold text-white">AI Twin</h3>
                </div>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-white">✕</span>
                </button>
              </div>

              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-white/70">
                    <div className="text-4xl mb-4">👋</div>
                    <p className="max-w-xs">
                      Ask me anything like &quot;What are you thinking about right now?&quot; or &quot;When was your last moment of self-doubt?&quot;
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            message.sender === "user"
                              ? "bg-[#7B9FFF] text-white rounded-tr-none"
                              : "bg-white/10 text-white rounded-tl-none"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input area */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#7B9FFF]/50"
                    placeholder="Ask me anything..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isLoading) {
                        handleSendMessage();
                      }
                    }}
                    disabled={isLoading}
                  />
                  <button
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#7B9FFF] hover:bg-[#6A8AE6]'}`}
                    onClick={handleSendMessage}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="animate-pulse">•••</span>
                    ) : (
                      <span>↑</span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
