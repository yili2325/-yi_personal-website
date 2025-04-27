import React from 'react';
import { motion } from 'framer-motion';

const BuildProcess: React.FC = () => {
  const steps = [
    {
      icon: '🧠',
      title: 'Spark',
      description: 'Collecting real-world problems or personal pain points as the foundation for product ideas.',
      example: 'Finding no high-quality practice resources for the Australian citizenship test.'
    },
    {
      icon: '🛠️',
      title: 'Build',
      description: 'Rapidly developing a technical prototype to validate core functionality.',
      example: 'Creating a Claude prompt + PDF.js demo to extract and organize test content.'
    },
    {
      icon: '🎯',
      title: 'Refine',
      description: 'Gathering feedback through user interviews and personal testing to improve the product.',
      example: 'Redesigning interactions and core features based on initial user experiences.'
    }
  ];

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
            Build Process
          </span>
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          How I transform ideas into reality—my journey from concept to finished product.
        </p>
        
        <div className="relative">
          {/* Process connection line */}
          <div className="absolute left-8 top-10 bottom-10 w-1 bg-gradient-to-b from-amber-300 to-purple-400 hidden md:block"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="flex flex-col md:flex-row gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="flex-shrink-0 relative">
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-purple-500 flex items-center justify-center text-white text-2xl shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                
                <div className="flex-grow">
                  <div className="bg-white rounded-xl shadow-md p-6 h-full">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="mr-2">{index + 1}.</span>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-purple-500">
                        {step.title}
                      </span>
                    </h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="bg-gradient-to-r from-amber-50 to-purple-50 p-4 rounded-lg">
                      <p className="text-gray-700 text-sm italic">
                        <span className="font-medium">Example:</span> {step.example}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BuildProcess;
