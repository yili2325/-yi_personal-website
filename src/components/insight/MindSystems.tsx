"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Node = {
  id: string;
  label: string;
  description: string;
};

type System = {
  id: number;
  name: string;
  description: string;
  nodes: Node[];
};

type MindSystemsProps = {
  systems: System[];
};

export default function MindSystems({ systems }: MindSystemsProps) {
  const [activeSystem, setActiveSystem] = useState<number>(1);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  
  const currentSystem = systems.find(system => system.id === activeSystem) || systems[0];
  
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
        Mind Systems
      </motion.h2>
      
      <motion.p
        className="text-center text-gray-700 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Frameworks I've developed to structure thinking and knowledge
      </motion.p>
      
      {/* System selector tabs */}
      <div className="flex justify-center mb-12 flex-wrap gap-2">
        {systems.map((system) => (
          <motion.button
            key={system.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeSystem === system.id 
                ? 'bg-purple-500 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-purple-100'
            }`}
            onClick={() => {
              setActiveSystem(system.id);
              setActiveNode(null);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {system.name}
          </motion.button>
        ))}
      </div>
      
      {/* Current system visualization */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSystem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-purple-100"
          >
            <h3 className="text-xl font-medium mb-2">{currentSystem.name}</h3>
            <p className="text-gray-600 mb-8">{currentSystem.description}</p>
            
            {/* Mind map visualization */}
            <div className="relative h-[300px] mb-8">
              {/* Center node */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-center p-2 shadow-md cursor-pointer z-10"
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveNode(null)}
              >
                <span className="text-sm font-medium text-purple-800">{currentSystem.name}</span>
              </motion.div>
              
              {/* Connected nodes */}
              {currentSystem.nodes.map((node, index) => {
                // Calculate position in a circle around the center
                const angle = (index / currentSystem.nodes.length) * Math.PI * 2;
                const radius = 120; // Distance from center
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={node.id}
                    className={`absolute w-20 h-20 rounded-full flex items-center justify-center text-center p-2 shadow-md cursor-pointer transition-all duration-300 ${
                      activeNode === node.id 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-white text-gray-800 hover:bg-purple-100'
                    }`}
                    style={{
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setActiveNode(node.id === activeNode ? null : node.id)}
                  >
                    <span className="text-xs font-medium">{node.label}</span>
                    
                    {/* Connection line */}
                    <div 
                      className="absolute top-1/2 left-1/2 h-0.5 bg-purple-200 origin-left z-[-1]"
                      style={{
                        width: radius,
                        transform: `rotate(${angle}rad)`,
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
            
            {/* Node detail card */}
            <AnimatePresence>
              {activeNode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400"
                >
                  <h4 className="font-medium mb-2">
                    {currentSystem.nodes.find(n => n.id === activeNode)?.label}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {currentSystem.nodes.find(n => n.id === activeNode)?.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
