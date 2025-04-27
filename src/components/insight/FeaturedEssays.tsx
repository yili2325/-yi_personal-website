"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Essay = {
  id: number;
  title: string;
  excerpt: string;
  source: string;
  sourceUrl: string;
  imageUrl: string;
  aiSummary: string;
};

type FeaturedEssaysProps = {
  essays: Essay[];
};

export default function FeaturedEssays({ essays }: FeaturedEssaysProps) {
  const [activeEssay, setActiveEssay] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const scrollToNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollToPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -320,
        behavior: 'smooth'
      });
    }
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
        Featured Essays
      </motion.h2>
      
      <motion.p
        className="text-center text-gray-700 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Explorations in structured thinking and knowledge architecture
      </motion.p>
      
      {/* Essays carousel */}
      <div className="relative">
        {/* Navigation buttons */}
        <button 
          onClick={scrollToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md -ml-5 text-purple-600"
          aria-label="Previous essay"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </button>
        
        <button 
          onClick={scrollToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md -mr-5 text-purple-600"
          aria-label="Next essay"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        
        {/* Essays container */}
        <div 
          ref={containerRef}
          className="flex overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {essays.map((essay, index) => (
            <motion.div
              key={essay.id}
              className="min-w-[300px] md:min-w-[400px] snap-center mx-4 first:ml-0 last:mr-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1
              }}
              onHoverStart={() => setActiveEssay(essay.id)}
              onHoverEnd={() => setActiveEssay(null)}
            >
              {/* Essay card */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-purple-100 h-full flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* Essay image */}
                <div className="relative h-48 bg-purple-50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gradient-to-br from-purple-100 to-indigo-50">
                    {/* Placeholder for actual images */}
                    {essay.source === "Substack" ? "📝" : 
                     essay.source === "Notion" ? "🌱" : "✍️"}
                  </div>
                </div>
                
                {/* Essay content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium">{essay.title}</h3>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                      {essay.source}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {essay.excerpt}
                  </p>
                  
                  {/* AI Summary */}
                  {activeEssay === essay.id && (
                    <motion.div
                      className="bg-purple-50 p-3 rounded-md mb-4 border-l-2 border-purple-300"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-xs text-gray-700 italic">
                        <span className="font-medium text-purple-700">AI Summary:</span> {essay.aiSummary}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Pagination indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {essays.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-purple-500' : 'bg-purple-200'}`}
            aria-label={`Go to essay ${index + 1}`}
          />
        ))}
      </div>
    </motion.section>
  );
}
