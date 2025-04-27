"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

type VolunteerActivity = {
  id: number;
  name: string;
  duration: string;
  impact: string;
  imageUrl: string;
  reflection: string;
  year?: number;
};

type VolunteerSpiritProps = {
  activities: VolunteerActivity[];
};

export default function VolunteerSpirit({ activities }: VolunteerSpiritProps) {
  return (
    <motion.section 
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="text-3xl font-serif font-bold mb-4 text-center text-emerald-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Volunteer Spirit
      </motion.h2>
      
      <motion.p
        className="text-center text-gray-600 mb-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Giving structure to someone else's chaos is also design.
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-3xl mx-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Activity image */}
            <div className="h-48 bg-emerald-100 relative overflow-hidden">
              {activity.imageUrl ? (
                <Image 
                  src={activity.imageUrl}
                  alt={activity.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-6xl text-emerald-300">
                  🤝
                </div>
              )}
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-emerald-800">
                  {activity.name}
                </h3>
                
                <div className="flex gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">
                    {activity.duration}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">
                    {activity.impact}
                  </span>
                </div>
              </div>
              
              <div className="bg-emerald-50 p-3 rounded-lg mb-4 italic text-sm text-emerald-700">
                "{activity.reflection}"
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {activity.year || new Date().getFullYear()}
                </span>
                
                <motion.button
                  className="text-emerald-600 text-sm flex items-center gap-1 hover:text-emerald-800"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Future plans */}
      <motion.div
        className="mt-12 bg-emerald-50 p-6 rounded-lg border border-emerald-100 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-emerald-800 font-medium mb-2">Future Plans</h3>
        <p className="text-gray-600 text-sm">
          I'm planning to join a mentorship program for underprivileged youth interested in technology and design.
          My goal is to help them build the structural thinking skills that have been so valuable in my own journey.
        </p>
        
        <div className="mt-4 flex gap-2">
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs">Starting Fall 2025</span>
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs">10+ hours monthly</span>
        </div>
      </motion.div>
    </motion.section>
  );
}
