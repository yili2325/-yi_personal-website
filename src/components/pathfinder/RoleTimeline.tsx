"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Role = {
  id: number;
  period: string;
  role: string;
  insight: string;
  description: string;
  skills: string[];
};

type RoleTimelineProps = {
  roles: Role[];
};

export default function RoleTimeline({ roles }: RoleTimelineProps) {
  const [activeRole, setActiveRole] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);
  
  // Handle mouse events for horizontal dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // Add event listeners for mouse up outside the component
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);
  
  return (
    <motion.section 
      className="py-16"
      style={{ opacity, y }}
    >
      <motion.h2 
        className="text-3xl font-serif font-bold mb-4 text-center text-blue-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Role Timeline
      </motion.h2>
      
      <motion.p
        className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        My journey through different roles has shaped who I am today.
      </motion.p>
      
      {/* Horizontal scrollable timeline */}
      <div 
        ref={timelineRef}
        className="relative overflow-x-auto pb-12 hide-scrollbar cursor-grab"
        style={{ scrollbarWidth: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {/* Timeline track */}
        <div className="absolute h-1 bg-blue-200 top-[100px] left-0 right-0 min-w-full w-[150%]"></div>
        
        {/* Timeline nodes and cards */}
        <div className="flex items-start space-x-24 pl-8 pr-32 min-w-max">
          {roles.map((role, index) => (
            <div key={role.id} className="relative pt-[120px] w-[300px]">
              {/* Timeline node */}
              <motion.div 
                className="absolute top-[100px] left-0 w-6 h-6 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveRole(activeRole === role.id ? null : role.id)}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Year label */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-blue-800 font-bold">
                  {role.period}
                </div>
                
                {/* Connecting line to card */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 w-[2px] h-[40px] bg-blue-400 origin-top"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                ></motion.div>
              </motion.div>
              
              {/* Role card */}
              <motion.div
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${activeRole === role.id ? 'ring-2 ring-blue-500 shadow-xl' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-800 mb-2">{role.role}</h3>
                  
                  <div className="bg-blue-50 p-3 rounded-lg mb-4 italic text-sm text-blue-700">
                    "{role.insight}"
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {role.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Expanded content when active */}
                {activeRole === role.id && (
                  <motion.div
                    className="bg-blue-50 p-4 border-t border-blue-100"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <h4 className="font-medium text-blue-800 mb-2">Key Learnings</h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Applied structured thinking to complex problems</li>
                      <li>Developed cross-functional collaboration skills</li>
                      <li>Gained deep domain expertise in this field</li>
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Drag instruction */}
      <div className="text-center text-gray-500 text-sm mt-4 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
        </svg>
        Drag to explore timeline
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
        </svg>
      </div>
    </motion.section>
  );
}
