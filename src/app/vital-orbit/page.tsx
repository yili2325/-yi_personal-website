"use client";

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Components
import HeroHeader from '@/components/vital-orbit/HeroHeader';
import MotionGallery from '@/components/vital-orbit/MotionGallery';
import VolunteerSpirit from '@/components/vital-orbit/VolunteerSpirit';
import SlowTime from '@/components/vital-orbit/SlowTime';

// Sample activity data
const activities = [
  {
    id: 1,
    type: "climbing",
    title: "Climbing",
    quote: "Grip = Focus",
    imageUrl: "/images/vital-orbit/climbing.jpg",
    description: "Finding structure in vertical challenges"
  },
  {
    id: 2,
    type: "lifting",
    title: "Lifting",
    quote: "Push = Reset",
    imageUrl: "/images/vital-orbit/lifting.jpg",
    description: "I enjoy the structured challenge"
  },
  {
    id: 3,
    type: "golf",
    title: "Golf",
    quote: "Distance = Calm",
    imageUrl: "/images/vital-orbit/golf.jpg",
    description: "Finding peace in precision"
  }
];

// Volunteer activities data
const volunteerActivities = [
  {
    id: 1,
    name: "UTS Peer Network",
    duration: "2 Weeks",
    impact: "Helped International Students",
    imageUrl: "/vital-orbit/volunteer1.png?v=" + Date.now(),
    reflection: "Helping international students navigate their new environment during orientation",
    year: 2024
  },
  {
    id: 2,
    name: "Sydney Film Festival",
    duration: "2 Weeks",
    impact: "Movie Event Support",
    imageUrl: "/vital-orbit/volunteer2.png",
    reflection: "Contributing to Sydney's movie event through film festival volunteering",
    year: 2023
  }
];

export default function VitalOrbitPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end start"]
  });
  
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  
  // Add an effect to enable scrolling on this page
  useEffect(() => {
    // Save the original overflow style
    const originalStyle = document.body.style.overflow;
    
    // Enable scrolling
    document.body.style.overflow = 'auto';
    
    // Restore original style on unmount
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full bg-gradient-to-b from-[#e6f7f0] via-[#f0f7f4] to-[#ffffff] text-[#1c1c1c] font-['Inter',sans-serif] overflow-auto"
    >
      {/* Background pattern effect */}
      <motion.div 
        className="fixed inset-0 opacity-10 pointer-events-none overflow-hidden"
        style={{ opacity: backgroundOpacity, scale: backgroundScale }}
      >
        <div className="absolute inset-0 bg-vital-orbit-pattern"></div>
      </motion.div>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        {/* Hero Header */}
        <HeroHeader />
        
        {/* Motion Gallery */}
        <MotionGallery activities={activities} />
        
        {/* Volunteer Spirit */}
        <VolunteerSpirit activities={volunteerActivities} />
        
        {/* Slow Time */}
        <SlowTime />
        
        {/* Back to Universal Button */}
        <div className="mt-16 ml-4">
          <Link href="/">
            <motion.button 
              className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg shadow-sm transition-all duration-300 font-medium"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Universal
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
