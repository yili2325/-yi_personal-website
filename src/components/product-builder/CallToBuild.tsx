import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CallToBuild: React.FC = () => {
  return (
    <section className="mb-24">
      <motion.div
        className="bg-gradient-to-r from-amber-100 to-purple-100 rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="p-8 md:p-12 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
            <motion.div
              className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-amber-400"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-purple-400"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 4
              }}
            />
            
            {/* Code-like patterns */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 bg-amber-500/30 rounded"
                style={{
                  width: Math.random() * 100 + 50,
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 80}%`,
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i + 5}
                className="absolute w-1 bg-purple-500/30 rounded"
                style={{
                  height: Math.random() * 100 + 50,
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 80}%`,
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              🚀
            </motion.div>
            
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              I'm always building the next thing.
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-700 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Whether you're looking to collaborate on a project, need help bringing your idea to life, 
              or just want to connect with a fellow builder—I'd love to hear from you.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link href="mailto:contact@example.com">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    Collaborate with me
                  </motion.button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href="https://www.linkedin.com/in/yili2325" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                    Connect with me
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToBuild;
