"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTAFooter() {
  return (
    <motion.section 
      className="py-16 mt-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl overflow-hidden shadow-lg">
        <div className="p-8 md:p-12">
          <motion.h2 
            className="text-3xl font-serif font-bold mb-6 text-emerald-800 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            🌀 My energy fuels my build.
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-medium text-emerald-800 mb-4">Follow my journey</h3>
              <p className="text-gray-600 mb-4">
                I share my physical activities, volunteer experiences, and how they influence my creative process.
              </p>
              <div className="flex gap-3">
                <Link 
                  href="#"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                  <span>Instagram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </Link>
                <Link 
                  href="#"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                  <span>WeChat</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.718 4.753a7.1 7.1 0 0 0-3.473-.92c-3.857 0-7 2.598-7 5.805 0 1.066.408 2.086 1.153 2.966L1.5 15.5l2.495-1.361a7.118 7.118 0 0 0 2.638.514l.076-.001-.042-.944.064.944c3.858 0 7-2.597 7-5.804 0-1.562-.898-2.975-2.013-3.975zm-1.99 7.122h-.014a5.209 5.209 0 0 1-2.445-.641l-1.406.773.308-1.586c-.9-.83-1.41-1.894-1.41-3.026 0-2.495 2.375-4.52 5.3-4.52 2.924 0 5.3 2.025 5.3 4.52s-2.375 4.52-5.3 4.52l-.333-.04z"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-medium text-emerald-800 mb-4">Let's do something together</h3>
              <p className="text-gray-600 mb-4">
                Whether it's a hike, a climbing session, or a volunteer project, I'm always open to connecting through shared activities.
              </p>
              <div className="flex gap-3">
                <Link 
                  href="#"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                  <span>Let's Chat</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                  </svg>
                </Link>
                <Link 
                  href="#"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                  <span>Book a Climb</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="text-center text-emerald-700 text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>
              "Movement is my meditation, service is my connection, and both fuel my creative process."
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
