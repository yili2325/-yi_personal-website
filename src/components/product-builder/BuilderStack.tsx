import React, { useState } from 'react';
import { motion } from 'framer-motion';

type StackCategory = {
  title: string;
  items: {
    name: string;
    description: string;
  }[];
};

type BuilderStackProps = {
  stack: {
    categories: StackCategory[];
  };
};

const BuilderStack: React.FC<BuilderStackProps> = ({ stack }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-purple-500">
            Builder Stack
          </span>
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          The tools and technologies I use to bring ideas to life—combining technical expertise with creative problem-solving.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stack.categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-purple-50">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{category.title}</h3>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-3">
                  {category.items.map((item) => (
                    <motion.div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="px-3 py-2 inline-block bg-gradient-to-r from-amber-100 to-purple-100 text-gray-800 rounded-lg cursor-pointer">
                        {item.name}
                      </span>
                      
                      {hoveredItem === item.name && (
                        <motion.div
                          className="absolute bottom-full left-0 mb-2 p-3 bg-white shadow-lg rounded-lg z-10 w-48"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-sm text-gray-700">{item.description}</p>
                          <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default BuilderStack;
