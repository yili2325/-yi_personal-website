"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ThoughtWallProps = {
  thoughts: string[];
};

export default function ThoughtWall({ thoughts }: ThoughtWallProps) {
  const [visibleThoughts, setVisibleThoughts] = useState<{ id: number; text: string; position: { x: number; y: number } }[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Generate random positions for thoughts
  useEffect(() => {
    const generateRandomThoughts = () => {
      const newThoughts = [];
      const numThoughts = Math.min(thoughts.length, 8); // Show up to 8 thoughts at a time
      
      const usedIndices = new Set<number>();
      
      for (let i = 0; i < numThoughts; i++) {
        // Select a random thought that hasn't been used yet
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * thoughts.length);
        } while (usedIndices.has(randomIndex));
        
        usedIndices.add(randomIndex);
        
        // Generate random position
        const x = 10 + Math.random() * 80; // 10% to 90% of container width
        const y = 10 + Math.random() * 80; // 10% to 90% of container height
        
        newThoughts.push({
          id: i,
          text: thoughts[randomIndex],
          position: { x, y }
        });
      }
      
      setVisibleThoughts(newThoughts);
    };
    
    generateRandomThoughts();
    
    // Refresh thoughts every 15 seconds
    const interval = setInterval(() => {
      setRefreshTrigger(prev => prev + 1);
    }, 15000);
    
    return () => clearInterval(interval);
  }, [thoughts, refreshTrigger]);
  
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
        Thought Wall
      </motion.h2>
      
      <motion.p
        className="text-center text-gray-700 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Fragments of insight and reflection from my digital garden
      </motion.p>
      
      {/* Thought space */}
      <div className="max-w-4xl mx-auto h-[500px] relative bg-gradient-to-br from-purple-50/50 to-indigo-50/50 rounded-lg overflow-hidden border border-purple-100 shadow-inner">
        {/* Star-like particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-300 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              repeatDelay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Floating thoughts */}
        <AnimatePresence>
          {visibleThoughts.map((thought) => (
            <motion.div
              key={thought.id}
              className="absolute max-w-xs bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-purple-100"
              style={{
                top: `${thought.position.y}%`,
                left: `${thought.position.x}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, Math.random() * 10 - 5, 0]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                scale: { duration: 0.5 },
                opacity: { duration: 0.5 },
                y: { 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)"
              }}
            >
              <p className="text-gray-800 font-serif italic text-sm">"{thought.text}"</p>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Refresh button */}
        <motion.button
          className="absolute bottom-4 right-4 bg-white/80 hover:bg-white text-purple-600 p-2 rounded-full shadow-md backdrop-blur-sm"
          onClick={() => setRefreshTrigger(prev => prev + 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Refresh thoughts"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
          </svg>
        </motion.button>
      </div>
    </motion.section>
  );
}
