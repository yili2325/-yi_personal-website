"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Log = {
  id: number;
  date: string;
  content: string;
  tags: string[];
};

type BuildingLogsProps = {
  logs: Log[];
};

export default function BuildingLogs({ logs }: BuildingLogsProps) {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  
  const currentLog = logs[currentLogIndex];
  
  const goToNextLog = () => {
    setCurrentLogIndex((prev) => (prev + 1) % logs.length);
  };
  
  const goToPrevLog = () => {
    setCurrentLogIndex((prev) => (prev - 1 + logs.length) % logs.length);
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
        Building Logs
      </motion.h2>
      
      <motion.p
        className="text-center text-gray-700 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Daily reflections and insights from my Notion journal
      </motion.p>
      
      {/* Notion-style log viewer */}
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Header with navigation */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <span className="font-medium text-gray-700">Notion Journal</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={goToPrevLog}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Previous log"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </button>
              
              <span className="text-sm text-gray-500">{currentLogIndex + 1} / {logs.length}</span>
              
              <button 
                onClick={goToNextLog}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Next log"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Log content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLog.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{currentLog.date}</h3>
                <div className="flex flex-wrap gap-2">
                  {currentLog.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="prose prose-purple max-w-none">
                <p className="text-gray-700 text-lg italic leading-relaxed">
                  &quot;{currentLog.content}&quot;
                </p>
              </div>
              
              {/* Notion-style decorative elements */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center text-gray-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                <span>Last edited on {currentLog.date.split('.').join('-')}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Visual decorative element */}
        <motion.div 
          className="h-1 bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300 rounded-full mt-4 mx-auto"
          style={{ width: '60%' }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </div>
    </motion.section>
  );
}
