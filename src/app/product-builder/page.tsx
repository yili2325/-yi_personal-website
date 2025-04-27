"use client";

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// Components
import HeroSection from '@/components/product-builder/HeroSection';
import BuilderStack from '@/components/product-builder/BuilderStack';
import BuildProcess from '@/components/product-builder/BuildProcess';
import FeaturedProducts from '@/components/product-builder/FeaturedProducts';
import CallToBuild from '@/components/product-builder/CallToBuild';

// Sample projects data
const featuredProducts = [
  {
    id: 1,
    name: "SiteMe ",
    icon: "📄",
    description: "AI resume coach and personal website builder. Upload your resume for automatic structure extraction and personalized optimization suggestions. Provides actionable feedback to improve your job applications.",
    technologies: ["Next.js", "Claude API", "Tailwind CSS", "PDF Processing"],
    insight: "Combining AI analysis with human editing creates the perfect resume workflow.",
    demoUrl: "https://youtu.be/SeQ5_IAPx-M",
  },
  {
    id: 2,
    name: "AI-Powered Citizenship Quiz",
    icon: "🇦🇺",
    description: "Parses official PDF documents to generate authentic test questions and practice systems for Australian citizenship preparation. Includes AI-powered explanations.",
    technologies: ["PDF.js", "Claude", "MongoDB", "Next.js"],
    insight: "Making official information accessible empowers people to achieve their goals.",
    demoUrl: "https://www.australiancitizenship-test.com",
  },
  {
    id: 3,
    name: "AI-Based Digital Wardrobe",
    icon: "👕",
    description: "iOS app that helps users organize their clothing collection and receive AI-powered outfit recommendations based on weather, occasion, and style preferences.",
    technologies: ["Swift", "Core ML", "Firebase", "Vision API"],
    insight: "Save time and make outfit planning more enjoyable, the most important is avoid waste of clothes.",
    demoUrl: "https://docs.google.com/presentation/d/1pdE1YJ0_iRSC4bvDb1LQXmkIMgjBaomBGSIr2NLiLSY/edit?usp=sharing",
  },
];

// Builder stack data
const builderStack = {
  categories: [
    {
      title: "Frontend",
      items: [
        { name: "React", description: "Used for building interactive UIs in MelodyWeaver and Resume Coach AI." },
        { name: "Next.js App Router", description: "Powers all my web applications with server components and routing." },
        { name: "Framer Motion", description: "Creates fluid animations and transitions across my projects." },
        { name: "Tailwind CSS", description: "My go-to for rapid styling and consistent design systems." },
        { name: "Figma", description: "For designing interfaces before implementation." }
      ]
    },
    {
      title: "Backend/API",
      items: [
        { name: "Next.js API Routes", description: "Serverless functions for handling API requests in my web apps." },
        { name: "Node.js", description: "For server-side logic and API development." },
        { name: "tRPC", description: "Type-safe API layer for the Citizenship Quiz application." },
      ]
    },
    {
      title: "Infrastructure",
      items: [
        { name: "Render", description: "Hosting platform for my web applications with CI/CD integration." },
        { name: "Mondo DB", description: "Authentication and real-time database for projects." },
      ]
    },
    {
      title: "AI Tools",
      items: [
        { name: "OpenAI API", description: "Powers creative generation in Citizenship Test Wedsite and other projects." },
        { name: "Claude", description: "Used for nuanced text understanding in Resume Coach AI." },
        { name: "LangChain", description: "Orchestrates AI workflows in more complex applications." }
      ]
    },
    {
      title: "Build & Deploy",
      items: [
        { name: "GitHub Actions", description: "Automated testing and deployment workflows for all projects." },
        { name: "Render CI", description: "Preview deployments and production pipelines for web apps." },
        { name: "PostHog", description: "Analytics and feature flags to understand user behavior." }
      ]
    },
    {
      title: "Design & Inspiration",
      items: [
        { name: "Notion", description: "Where I organize all my product ideas and development notes." },
        { name: "Figma", description: "For designing interfaces before implementation." },
        { name: "ChatGPT", description: "Brainstorming partner for exploring product concepts." }
      ]
    }
  ]
};

export default function ProductBuilderPage() {
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
      className="min-h-screen w-full bg-gradient-to-b from-[#fff8e6] via-[#fdf2ff] to-[#f9f9ff] text-[#1c1c1c] font-['Inter',sans-serif] overflow-auto"
    >
      {/* Background pattern effect */}
      <motion.div 
        className="fixed inset-0 opacity-10 pointer-events-none overflow-hidden"
        style={{ opacity: backgroundOpacity, scale: backgroundScale }}
      >
        <div className="absolute inset-0 bg-product-builder-pattern"></div>
      </motion.div>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Featured Products */}
        <FeaturedProducts projects={featuredProducts} />
        
        {/* Builder Stack */}
        <BuilderStack stack={builderStack} />
        
        {/* Build Process */}
        <BuildProcess />
        
        {/* Call to Build */}
        <CallToBuild />
      </div>
      
      {/* Back to Universe button */}
      <Link 
        href="/"
        className="fixed bottom-8 left-8 bg-gradient-to-r from-amber-400/80 to-purple-400/80 hover:from-amber-400 hover:to-purple-400 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 backdrop-blur-sm"
      >
        <span>← Back to Universe</span>
      </Link>
    </div>
  );
}
