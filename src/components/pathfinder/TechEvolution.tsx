"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';


type ToolItem = {
  name: string;
  usage: string;
};

type ToolCategory = {
  id: number;
  category: string;
  items: ToolItem[];
};

type CognitiveShift = {
  id: number;
  stage: string;
  icon: string;
  description: string;
};

type PersonalityTag = {
  id: number;
  tag: string;
  icon: string;
  description: string;
};

type TechEvolutionProps = {
  tools: ToolCategory[];
  cognitiveShifts: CognitiveShift[];
  personalityTags: PersonalityTag[];
};

export default function TechEvolution({
  tools, 
  cognitiveShifts,
  personalityTags 
}: TechEvolutionProps) {
  const [activeTab, setActiveTab] = useState<string>('tools');
  const [selectedTag, setSelectedTag] = useState<number | null>(null);
  
  const tabVariants = {
    inactive: { opacity: 0.7, y: 5 },
    active: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.section 
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="text-3xl font-serif font-bold mb-4 text-center text-blue-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        What I Became
      </motion.h2>
      
      <motion.p
        className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        The tools I've mastered and the cognitive shifts I've experienced
      </motion.p>
      
      {/* Tab navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-blue-50 rounded-full p-1 inline-flex">
          {['tools', 'cognitive', 'personality'].map((tab) => (
            <motion.button
              key={tab}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === tab ? 'bg-blue-500 text-white' : 'text-blue-600'}`}
              onClick={() => setActiveTab(tab)}
              variants={tabVariants}
              animate={activeTab === tab ? 'active' : 'inactive'}
              transition={{ duration: 0.3 }}
            >
              {tab === 'tools' && 'Toolbox'}
              {tab === 'cognitive' && 'Cognitive Shifts'}
              {tab === 'personality' && 'Personality'}
            </motion.button>
          ))}
        </div>
      </div>

      
      {/* Tools tab content */}
      {activeTab === 'tools' && (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((category) => (
              <motion.div
                key={category.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: category.id * 0.1 }}
              >
                <div className="bg-blue-100 px-6 py-3">
                  <h3 className="text-lg font-bold text-blue-800">{category.category}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                          <span className="font-medium text-gray-800">{item.name}</span>
                          <p className="text-sm text-gray-600">{item.usage}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* Cognitive Shifts tab content */}
      {activeTab === 'cognitive' && (
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform -translate-x-1/2 z-0"></div>
            
            {/* Cognitive shift stages */}
            <div className="relative z-10 space-y-12">
              {cognitiveShifts.map((shift, index) => (
                <motion.div
                  key={shift.id}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <h3 className="text-xl font-bold text-blue-800 mb-2">{shift.stage}</h3>
                    <p className="text-gray-600">{shift.description}</p>
                  </div>
                  
                  {/* Center node */}
                  <div className="w-2/12 flex justify-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                      {shift.icon}
                    </div>
                  </div>
                  
                  {/* Empty space for alignment */}
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Personality Tags tab content */}
      {activeTab === 'personality' && (
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {personalityTags.map((tag) => (
              <motion.div
                key={tag.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 w-[calc(33%-1rem)] min-w-[250px] ${selectedTag === tag.id ? 'ring-2 ring-blue-500 shadow-xl' : ''}`}
                onClick={() => setSelectedTag(selectedTag === tag.id ? null : tag.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: tag.id * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{tag.icon}</span>
                    <h3 className="text-lg font-bold text-blue-800">{tag.tag}</h3>
                  </div>
                  
                  {selectedTag === tag.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-gray-600 text-sm"
                    >
                      <p>{tag.description}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}
