"use client";

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// Components
import {
  HeroHeader,
  FeaturedEssays,
  MindSystems,
  BuildingLogs,
  ThoughtWall,
  AIInsight,
} from '@/components/insight';

// Sample essays data
const essays = [
  {
    id: 1,
    title: "The Architecture of Thought: Building Mental Models",
    excerpt: "Mental models are frameworks for thinking. They simplify complexity and help us understand the world. But how do we build them intentionally?",
    source: "Substack",
    sourceUrl: "#",
    imageUrl: "/images/essays/mental-models.jpg",
    aiSummary: "Mental models serve as cognitive frameworks that simplify complex systems. This essay explores how intentional model-building enhances decision-making and creative problem-solving."
  },
  {
    id: 2,
    title: "Digital Gardens: Cultivating Ideas in Public",
    excerpt: "Unlike traditional blogs, digital gardens are living collections of ideas that grow over time. They represent thinking in progress rather than finished products.",
    source: "Notion",
    sourceUrl: "#",
    imageUrl: "/images/essays/digital-garden.jpg",
    aiSummary: "Digital gardens represent a paradigm shift in online content creation, emphasizing continuous growth and interconnection of ideas rather than chronological publishing."
  },
  {
    id: 3,
    title: "The Feedback Loop: From Consumption to Creation",
    excerpt: "How do we transform what we consume into what we create? This essay explores the feedback loop between input and output in the creative process.",
    source: "Xiaohongshu",
    sourceUrl: "#",
    imageUrl: "/images/essays/feedback-loop.jpg",
    aiSummary: "This piece examines the cyclical relationship between consumption and creation, offering a framework for transforming passive input into active output."
  }
];

// Mind systems data
const mindSystems = [
  {
    id: 1,
    name: "Thought Chain Method",
    description: "Recording how an idea originates, develops, and transforms into action",
    nodes: [
      { id: "origin", label: "Origin", description: "Where the thought came from" },
      { id: "context", label: "Context", description: "Surrounding circumstances" },
      { id: "connections", label: "Connections", description: "Links to existing ideas" },
      { id: "evolution", label: "Evolution", description: "How it developed" },
      { id: "action", label: "Action", description: "Resulting behaviors or outputs" }
    ]
  },
  {
    id: 2,
    name: "Self-Iteration Three Questions",
    description: "A daily reflection framework to ensure continuous improvement",
    nodes: [
      { id: "yesterday", label: "Yesterday vs Today", description: "What improved?" },
      { id: "avoidance", label: "What am I avoiding?", description: "Identifying resistance" },
      { id: "next", label: "What's next?", description: "Immediate action steps" }
    ]
  },
  {
    id: 3,
    name: "Content Output Mirror Structure",
    description: "A framework for transforming thoughts into shareable content",
    nodes: [
      { id: "writing", label: "Writing", description: "Initial expression" },
      { id: "output", label: "Output", description: "Sharing with others" },
      { id: "feedback", label: "Feedback", description: "External perspectives" },
      { id: "restructure", label: "Restructure", description: "Refining into concise form" }
    ]
  }
];

// Building logs data
const buildingLogs = [
  {
    id: 1,
    date: "2025.03.12",
    content: "I realized: writing isn't about recording answers, but a way to coexist with chaos.",
    tags: ["writing", "process", "insight"]
  },
  {
    id: 2,
    date: "2025.03.10",
    content: "Started mapping my content creation process. Noticed I need more structure between ideation and execution.",
    tags: ["process", "systems", "creation"]
  },
  {
    id: 3,
    date: "2025.03.07",
    content: "Reading 'Thinking in Systems' by Donella Meadows. Her feedback loop concept perfectly explains why my writing sometimes stalls.",
    tags: ["reading", "systems", "feedback"]
  }
];

// Thought fragments
const thoughtFragments = [
  "Design isn't decoration, it's an invitation.",
  "Unfinished tasks ≠ incompetence, but mismatched mechanisms.",
  "I use words to prevent the past from repeating itself.",
  "Clarity comes not from more information, but better questions.",
  "The gap between knowing and doing is bridged by systems, not willpower.",
  "Writing is the conversation between who I am and who I could be.",
  "The best insights emerge at the intersection of disciplines.",
  "Complexity should be organized, not reduced.",
  "My notes are not a record of what I know, but a map of what I'm learning.",
  "Thinking in public forces clarity that thinking in private permits you to avoid.",
  "The quality of your questions determines the quality of your understanding.",
  "Systems reveal what intuition conceals."
];

// AI insights data
const aiInsights = {
  keywordFrequency: [
    { word: "systems", count: 42 },
    { word: "thinking", count: 38 },
    { word: "writing", count: 35 },
    { word: "process", count: 29 },
    { word: "structure", count: 27 },
    { word: "clarity", count: 24 },
    { word: "questions", count: 21 },
    { word: "insights", count: 19 },
    { word: "connections", count: 17 },
    { word: "reflection", count: 15 }
  ],
  emotionalStates: [
    { date: "2025-03-01", value: 0.2 }, // Calm
    { date: "2025-03-05", value: 0.5 }, // Neutral
    { date: "2025-03-10", value: 0.8 }, // Energized
    { date: "2025-03-15", value: 0.3 }, // Reflective
    { date: "2025-03-20", value: 0.6 }, // Focused
    { date: "2025-03-25", value: 0.4 }, // Balanced
    { date: "2025-03-30", value: 0.7 }  // Inspired
  ],
  thinkingClarity: [
    { date: "2025-03-01", value: 0.3 }, // Fuzzy
    { date: "2025-03-05", value: 0.4 },
    { date: "2025-03-10", value: 0.6 },
    { date: "2025-03-15", value: 0.7 },
    { date: "2025-03-20", value: 0.5 },
    { date: "2025-03-25", value: 0.8 },
    { date: "2025-03-30", value: 0.9 }  // Precise
  ]
};

export default function InsightPage() {
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
      className="min-h-screen w-full bg-gradient-to-b from-[#e6e1f9] via-[#f0f0f4] to-[#ffffff] text-[#1c1c1c] font-['Inter',sans-serif] overflow-auto font-serif"
    >
      {/* Background pattern effect */}
      <motion.div 
        className="fixed inset-0 opacity-10 pointer-events-none overflow-hidden"
        style={{ opacity: backgroundOpacity, scale: backgroundScale }}
      >
        <div className="absolute inset-0 bg-insight-pattern"></div>
      </motion.div>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        {/* Hero Header */}
        <HeroHeader />
        
        {/* Featured Essays */}
        <FeaturedEssays essays={essays} />
        
        {/* Mind Systems */}
        <MindSystems systems={mindSystems} />
        
        {/* Building Logs */}
        <BuildingLogs logs={buildingLogs} />
        
        {/* Thought Wall */}
        <ThoughtWall thoughts={thoughtFragments} />
        
        {/* AI Insight */}
        <AIInsight insights={aiInsights} />
      </div>
      
      {/* Back to Universe button */}
      <Link href="/" className="fixed bottom-8 left-8 bg-purple-400/80 hover:bg-purple-400 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 backdrop-blur-sm">
        <span>← Back to Universe</span>
      </Link>
    </div>
  );
}
