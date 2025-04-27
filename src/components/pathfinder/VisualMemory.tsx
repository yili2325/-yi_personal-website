"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

type Memory = {
  id: number;
  image: string;
  caption: string;
  description: string;
  tags: string[];
};

type VisualMemoryProps = {
  memories: Memory[];
};

export default function VisualMemory({ memories }: VisualMemoryProps) {
  const [expandedMemory, setExpandedMemory] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);
  
  // Function to handle memory click
  const handleMemoryClick = (id: number) => {
    setExpandedMemory(expandedMemory === id ? null : id);
  };
  
  return (
    <motion.section 
      ref={containerRef}
      className="py-16"
      style={{ opacity, y }}
    >
      <motion.h2 
        className="text-3xl font-serif font-bold mb-4 text-center text-blue-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Visual Memory Wall
      </motion.h2>
      
      <motion.p
        className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Moments that shaped my professional journey
      </motion.p>
      
      {/* Memory grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {memories.map((memory) => (
          <motion.div
            key={memory.id}
            className={`relative overflow-hidden rounded-xl shadow-md cursor-pointer transition-all duration-300 ${expandedMemory === memory.id ? 'ring-2 ring-blue-500 shadow-xl' : ''}`}
            onClick={() => handleMemoryClick(memory.id)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: memory.id * 0.1 }}
            whileHover={{ 
              scale: expandedMemory === memory.id ? 1 : 1.03,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            style={{ aspectRatio: '4/3' }}
          >
            {/* Image */}
            <div className="absolute inset-0">
              <Image
                src={memory.image}
                alt={memory.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={memory.id <= 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="font-medium text-sm">{memory.caption}</p>
            </div>
            
            {/* Expanded content */}
            {expandedMemory === memory.id && (
              <motion.div
                className="absolute inset-0 bg-blue-900/90 flex flex-col items-center justify-center p-6 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-4 text-center">{memory.caption}</h3>
                <p className="text-sm text-blue-100 text-center">
                  {memory.description}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {memory.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-800/50 text-blue-100 px-2 py-1 rounded-full text-xs">{tag}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Instructions */}
      <div className="text-center text-gray-500 text-sm mt-8">
        Click on a memory to see details
      </div>
    </motion.section>
  );
}
