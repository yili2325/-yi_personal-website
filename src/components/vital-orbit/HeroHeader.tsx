"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroHeader() {
  const heartbeatRef = useRef<SVGSVGElement>(null);
  
  // Create heartbeat animation
  useEffect(() => {
    if (!heartbeatRef.current) return;
    
    const path = heartbeatRef.current.querySelector('path');
    if (!path) return;
    
    const length = path.getTotalLength();
    
    // Set up the starting position
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = `${length}`;
    
    // Trigger the animation
    path.style.animation = 'heartbeat-draw 3s ease-in-out forwards';
    
    // Define the animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes heartbeat-draw {
        0% {
          stroke-dashoffset: ${length};
        }
        100% {
          stroke-dashoffset: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <motion.section 
      className="flex flex-col md:flex-row items-center justify-between gap-8 py-16 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Left side with silhouette and orbit lines */}
      <motion.div 
        className="relative w-full md:w-1/2 h-[400px] md:h-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="relative w-full h-full">
          {/* User's image */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[350px] overflow-hidden rounded-2xl shadow-lg">
            <div 
              className="w-full h-full bg-cover bg-center rounded-2xl"
              style={{
                backgroundImage: `url('/vital-orbit/hero-vib.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
          
          {/* Orbit lines */}
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              className="absolute left-1/2 top-1/2 border border-emerald-300/30 rounded-full"
              style={{
                width: `${150 + i * 50}px`,
                height: `${150 + i * 50}px`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Small planet on orbit */}
              <motion.div
                className="absolute w-4 h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-300/30"
                style={{
                  top: '0%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Right side with text */}
      <motion.div 
        className="w-full md:w-1/2 text-center md:text-left"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-800 mb-4 font-serif">
          Vital Orbit
        </h1>
        
        <p className="text-xl md:text-2xl text-emerald-700 mb-8 font-light italic">
          &quot;I build my mind through my body, and return to myself in motion.&quot;
        </p>
        
        <div className="h-[60px] mb-8 relative overflow-hidden">
          <svg 
            ref={heartbeatRef}
            width="100%" 
            height="60" 
            viewBox="0 0 400 60" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
          >
            <path 
              d="M0,30 L50,30 L70,10 L90,50 L110,10 L130,50 L150,30 L400,30" 
              stroke="#10b981" 
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Where I move, give, and return to myself. Physical activity is not just about fitness—it&apos;s where I find clarity, purpose, and a deeper connection to my own potential.
        </p>
        
        {/* Button removed as requested */}
      </motion.div>
    </motion.section>
  );
}
