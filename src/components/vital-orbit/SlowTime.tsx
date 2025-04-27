"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SlowTime() {
  const [isPlaying, setIsPlaying] = useState(true);
  const gifRef = useRef<HTMLDivElement>(null);
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    // This is a placeholder for actual GIF control
    // In a real implementation, you would use a library to control GIF playback
    // or use a video element instead of a GIF for better control
    if (gifRef.current) {
      const gif = gifRef.current.querySelector('img');
      if (gif) {
        if (isPlaying) {
          // Pause effect by hiding the original and showing a still frame
          gif.style.opacity = '0';
          gifRef.current.style.backgroundImage = `url('/vital-orbit/readtime.png')`;
          gifRef.current.style.backgroundSize = 'cover';
          gifRef.current.style.backgroundPosition = 'center';
        } else {
          // Resume playing
          gif.style.opacity = '1';
          gifRef.current.style.backgroundImage = 'none';
        }
      }
    }
  };
  
  return (
    <motion.section 
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image display */}
          <motion.div 
            ref={gifRef}
            className="relative w-full md:w-2/5 h-[250px] md:h-[300px] rounded-xl overflow-hidden shadow-md"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Display the readtime image */}
            <div className="absolute inset-0 bg-emerald-50">
              <Image 
                src="/vital-orbit/readtime.png"
                alt="Reading time - slowing down with books"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center"
                priority
              />
            </div>
            
            {/* Radial blur overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-radial-blur pointer-events-none"></div>
            
          </motion.div>
          
          {/* Text content */}
          <motion.div 
            className="w-full md:w-3/5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-serif font-bold mb-6 text-emerald-800">
              Slow Time
            </h2>
            
            <p className="text-xl italic text-emerald-700 mb-6">
              "This is how I slow down."
            </p>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              In a world of constant digital stimulation, I find peace in the tactile experience of turning pages. 
              Whether it's a book, journal, or sketchpad, the physical act of flipping through paper connects me to a slower rhythm.
            </p>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              These moments of intentional slowness are as vital to my creative process as any burst of productivity. 
              They create space for ideas to breathe and connections to form.
            </p>
            
            <div className="flex gap-4">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">Daily practice</span>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">Mental reset</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
