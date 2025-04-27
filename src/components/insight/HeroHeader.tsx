"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroHeader() {
  const [typedText, setTypedText] = useState('');
  const fullText = "I don't just write — I structure thoughts into systems.";
  
  // Typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50 + Math.random() * 50); // Random typing speed for realism
      
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);
  
  // Identity tags
  const identityTags = ["Creator", "Thinker", "Builder"];
  
  return (
    <motion.section 
      className="min-h-[80vh] flex flex-col items-center justify-center py-20 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background aura */}
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-200/20 via-indigo-200/20 to-transparent"
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          rotate: { 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          },
          scale: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
      />
      
      {/* Star particles */}
      {[...Array(20)].map((_, i) => (
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
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-12">
        {/* Left side: Text content */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-serif font-bold mb-8 bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Insight Architect
          </motion.h1>
          
          {/* Animated quote */}
          <motion.div
            className="text-xl md:text-2xl italic mb-12 font-serif h-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="font-light">"{typedText}<span className="animate-pulse">|</span>"</p>
          </motion.div>
        </motion.div>
        
        {/* Right side: Profile image and identity tags */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Profile image */}
          <div className="relative w-64 h-64 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center shadow-lg">
            {/* Replace with your actual profile image */}
            <div className="relative w-56 h-56 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                🌙
              </div>
            </div>
            
            {/* Orbiting elements */}
            <motion.div 
              className="absolute inset-0 rounded-full border border-purple-300"
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </div>
          
          {/* Identity tags */}
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 space-y-3">
            {identityTags.map((tag, index) => (
              <motion.div
                key={tag}
                className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-purple-100 text-sm font-medium"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.8 + index * 0.2 
                }}
                whileHover={{
                  backgroundColor: "rgba(233, 213, 255, 0.8)",
                  x: -5
                }}
              >
                {tag}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatType: "loop",
          ease: "easeInOut" 
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
        </svg>
      </motion.div>
    </motion.section>
  );
}
