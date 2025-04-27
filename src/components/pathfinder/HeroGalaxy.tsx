"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Career path nodes for the galaxy map
const careerNodes = [
  { id: 1, label: "Finance Bachelor", x: 15, y: 45, size: 10 },
  { id: 2, label: "IPO Analyst", x: 30, y: 40, size: 12 },
  { id: 3, label: "Management Master", x: 45, y: 20, size: 14 },
  { id: 4, label: "IT Master", x: 60, y: 35, size: 12 },
  { id: 5, label: "iOS Developer", x: 75, y: 50, size: 14 },
  { id: 6, label: "AI Entrepreneur", x: 85, y: 65, size: 16 }
];

// Keywords that will float around the galaxy
const floatingKeywords = [
  { id: 1, word: "Structure", size: "text-sm" },
  { id: 2, word: "Resilience", size: "text-base" },
  { id: 3, word: "Output Drive", size: "text-sm" },
  { id: 4, word: "Systems Thinking", size: "text-lg" },
  { id: 5, word: "Connection Points", size: "text-xs" },
  { id: 6, word: "Continuous Iteration", size: "text-sm" },
  { id: 7, word: "Cross-domain Integration", size: "text-base" },
  { id: 8, word: "Curiosity", size: "text-sm" }
];

export default function HeroGalaxy() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!galaxyRef.current) return;
      
      const rect = galaxyRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };
    
    const galaxyElement = galaxyRef.current;
    if (galaxyElement) {
      galaxyElement.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (galaxyElement) {
        galaxyElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  return (
    <motion.section 
      className="py-16 md:py-24 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >

      {/* Galaxy map with career nodes */}
      <div 
        ref={galaxyRef}
        className="relative h-[550px] md:h-[650px] w-full overflow-hidden bg-gradient-to-b from-blue-50/50 to-transparent rounded-3xl mb-8"
      >
        {/* Center avatar */}
        <div className="absolute left-1/2 top-1/2 z-30" style={{transform: 'translate(-50%, -50%)'}}>
          <Image
            src="/IMG_5025.JPG"
            alt="Avatar"
            width={90}
            height={90}
            className="rounded-full shadow-lg object-cover border-4 border-white"
            priority
          />
        </div>
        {/* Star field background */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-200 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
        
        {/* Career path - flowing connecting lines */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
            </linearGradient>
          </defs>
          <motion.path
            d={`M ${careerNodes.map(node => `${node.x}% ${node.y}%`).join(' L ')}`}
            stroke="url(#pathGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Career nodes */}
        {careerNodes.map((node, index) => (
          <motion.div
            key={node.id}
            className={`absolute cursor-pointer ${hoveredNode === node.id ? 'z-20' : 'z-10'}`}
            style={{
              top: `${node.y}%`,
              left: `${node.x}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Node circle */}
            <motion.div 
              className="relative"
              animate={{
                boxShadow: hoveredNode === node.id 
                  ? '0 0 15px 5px rgba(59, 130, 246, 0.6)' 
                  : '0 0 5px 2px rgba(59, 130, 246, 0.3)'
              }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={`rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white overflow-hidden
                  ${node.size === 10 ? 'w-10 h-10' : node.size === 12 ? 'w-12 h-12' : node.size === 14 ? 'w-14 h-14' : 'w-16 h-16'}`}
              >
                {/* Avatar for first node, emoji for others */}
                {index === 0 ? (
                  <Image
                    src="/FInanceBachelor.JPG"
                    alt="Finance Bachelor"
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-full h-full"
                    priority
                  />
                ) : index === 2 ? (
                  <Image
                    src="/IMG_5490.JPG"
                    alt="Management Master"
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-full h-full"
                    priority
                  />
                ) : index === 4 ? (
                  <Image
                    src="/IOS.png"
                    alt="iOS Developer"
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-full h-full"
                    priority
                  />
                ) : (
                  <span className="text-sm">
                    {index === 1 ? '📊' : 
                     index === 3 ? '💻' : 
                     index === 5 ? '🚀' :
                     ''}
                  </span>
                )}
              </div>
              
              {/* Orbit rings */}
              {hoveredNode === node.id && (
                <>
                  {[1, 2, 3].map((ring) => (
                    <motion.div
                      key={ring}
                      className="absolute rounded-full border border-blue-300"
                      style={{
                        top: '50%',
                        left: '50%',
                        width: `${node.size * 2 + ring * 15}px`,
                        height: `${node.size * 2 + ring * 15}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: [0.2, 0.5, 0.2], 
                        scale: [0.95, 1, 0.95],
                        rotate: ring % 2 === 0 ? [0, 360] : [360, 0]
                      }}
                      transition={{ 
                        duration: 3 + ring, 
                        repeat: Infinity,
                        ease: "linear" 
                      }}
                    />
                  ))}
                  
                  {/* Particles around the node */}
                  {[...Array(5)].map((_, i) => {
                    const angle = (i / 5) * Math.PI * 2;
                    const radius = node.size * 1.8;
                    return (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
                        style={{
                          top: '50%',
                          left: '50%',
                        }}
                        initial={{ 
                          x: Math.cos(angle) * radius,
                          y: Math.sin(angle) * radius,
                          opacity: 0 
                        }}
                        animate={{ 
                          x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI) * radius, Math.cos(angle) * radius],
                          y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI) * radius, Math.sin(angle) * radius],
                          opacity: [0.2, 0.8, 0.2],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{ 
                          duration: 4 + i,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    );
                  })}
                </>
              )}
            </motion.div>
            
            {/* Node label - positioned based on node location */}
            <motion.div
              className="absolute whitespace-nowrap bg-gradient-to-r from-blue-50 to-blue-100 backdrop-blur-sm px-4 py-1.5 rounded-full text-blue-800 text-sm font-medium border border-blue-200 shadow-sm"
              style={{
                top: node.id === 3 ? 'auto' : '100%', // Special case for Management Master
                bottom: node.id === 3 ? '100%' : 'auto', // Position above for Management Master
                left: '50%',
                transform: 'translate(-50%, 0)'
              }}
              initial={{ opacity: 0, y: node.id === 3 ? 10 : -10 }}
              animate={{ 
                opacity: hoveredNode === node.id ? 1 : 0.8,
                y: hoveredNode === node.id ? (node.id === 3 ? -5 : 5) : 0,
                scale: hoveredNode === node.id ? 1.05 : 1
              }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            >
              {node.label}
            </motion.div>
          </motion.div>
        ))}
        
        {/* Floating keywords */}
        {floatingKeywords.map((keyword, index) => (
          <motion.div
            key={keyword.id}
            className={`absolute ${keyword.size} text-blue-600/70 font-medium pointer-events-none`}
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${15 + Math.random() * 70}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              x: [0, (Math.random() - 0.5) * 30, 0],
              y: [0, (Math.random() - 0.5) * 30, 0],
              rotate: [(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity,
              delay: index * 0.5
            }}
          >
            <span className="px-2 py-0.5 rounded-lg bg-blue-50/40 backdrop-blur-sm">{keyword.word}</span>
          </motion.div>
        ))}
        

      </div>
      
      {/* Title and tagline */}
      <div className="text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-800 mb-4 font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Pathfinder
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-blue-700 mb-8 font-light italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          "I'm not defined by roles — I'm shaped by the routes I've walked."
        </motion.p>
      </div>
    </motion.section>
  );
}
