import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="mb-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2">
          {/* Product Builder icon with orbiting ring */}
          <div className="relative w-32 h-32 mx-auto md:mx-0 mb-8">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 opacity-30"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-amber-400 rounded-full"
              style={{ borderRadius: "50%" }}
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-5xl">
              🛠️
            </div>
          </div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-purple-500 to-amber-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Product Builder
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-8 text-center md:text-left text-gray-700 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            "I write in code and compose in function.<br />
            Every tool I make is a reflection of how I think."
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-2 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {["Next.js", "OpenAI API", "Claude", "Tailwind", "ResumeTool", "MelodyWeaver"].map((skill, index) => (
              <motion.span
                key={skill}
                className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-amber-100 to-purple-100 text-gray-800"
                whileHover={{ scale: 1.05, backgroundColor: "#f9a8d4" }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: index * 0.2
                  }
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2 relative">
          <motion.div
            className="relative w-full h-64 md:h-80"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300/20 to-purple-500/20 rounded-2xl overflow-hidden">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' stroke='rgba(217, 119, 6, 0.1)' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                  backgroundSize: "60px 60px"
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-40 h-40">
                  {/* Code fragments flying in to form product icon */}
                  {[...Array(8)].map((_, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-10 h-4 bg-gradient-to-r from-amber-400/40 to-purple-500/40 rounded"
                      initial={{
                        x: (Math.random() - 0.5) * 300,
                        y: (Math.random() - 0.5) * 300,
                        opacity: 0,
                        rotate: Math.random() * 360
                      }}
                      animate={{
                        x: 0,
                        y: 0,
                        opacity: [0, 0.8, 0],
                        rotate: 0,
                        scale: [0.5, 1, 0.8]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                        repeatDelay: 5,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-6xl"
                    animate={{
                      scale: [0.8, 1, 0.8],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    🛠️
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
