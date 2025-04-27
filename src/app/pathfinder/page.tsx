"use client";

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// Components
import HeroGalaxy from '@/components/pathfinder/HeroGalaxy';
import RoleTimeline from '@/components/pathfinder/RoleTimeline';
import TechEvolution from '@/components/pathfinder/TechEvolution';
import VisualMemory from '@/components/pathfinder/VisualMemory';

// Career roles data
const careerRoles = [
  {
    id: 1,
    period: "2020",
    role: "Data Analyst (CITIC IPO)",
    insight: "First time understanding systems, speed, and structure",
    description: "Analyzed IPO data and market trends for investment decisions",
    skills: ["Data Analysis", "Financial Modeling", "Market Research"]
  },
  {
    id: 2,
    period: "2022",
    role: "Project Management (USYD)",
    insight: "The core of management is using structure to handle chaos",
    description: "Led cross-functional teams to deliver academic projects",
    skills: ["Project Planning", "Team Leadership", "Stakeholder Management"]
  },
  {
    id: 3,
    period: "2023",
    role: "Research Assistant (UNSW)",
    insight: "I entered the intersection of AI and public health",
    description: "Conducted research on AI applications in healthcare",
    skills: ["Research Methods", "Data Collection", "Academic Writing"]
  },
  {
    id: 4,
    period: "2023",
    role: "IT Master's Degree",
    insight: "Technology is not just a tool, but a transformation of thinking",
    description: "Specialized in software development and AI applications",
    skills: ["Programming", "System Design", "AI/ML"]
  },
  {
    id: 5,
    period: "2024",
    role: "AI Product Builder/Marketer",
    insight: "Products are my most honest form of expression",
    description: "Created AI-powered tools and solutions for real-world problems",
    skills: ["Product Development", "AI Integration", "UX/UI Design"]
  }
];

// Technical evolution data
const techEvolution = {
  tools: [
    {
      id: 1,
      category: "AI / LLM",
      items: [
        { name: "OpenAI API", usage: "Core of several projects" },
        { name: "Claude API", usage: "Advanced reasoning tasks" },
        { name: "Prompt Engineering", usage: "Multiple project implementation" },
        {name: "Langchain", usage: "Orchestration of LLMs"}
      ]
    },
    {
      id: 2,
      category: "Fullstack Tools",
      items: [
        { name: "Next.js + Tailwind CSS", usage: "Frontend development" },
        { name: "Firebase / Supabase", usage: "Backend services" },
        {name: "Node.js", usage: "Backend services"}
      ]
    },
    {
      id: 3,
      category: "DevOps & Infra",
      items: [
        { name: "GitHub Actions", usage: "Auto-deployed daily AI test environments" },
        { name: "Render CI/CD", usage: "Continuous deployment" },
        { name: "PostHog, Sentry", usage: "Analytics and error tracking" },
        {name: "MongoDB", usage: "Database"}
      ]
    },
    {
      id: 4,
      category: "Product Tools",
      items: [
        { name: "Figma", usage: "UI/UX design" },
        { name: "Notion", usage: "Documentation and planning" },
        { name: "ChatGPT", usage: "Brainstorming partner" }
      ]
    }
  ],
  cognitiveShifts: [
    {
      id: 1,
      stage: "Learner",
      icon: "📘",
      description: "Absorbing frameworks, chasing best practice"
    },
    {
      id: 2,
      stage: "Builder",
      icon: "📐",
      description: "First time coding → delivery → feedback → iteration loop"
    },
    {
      id: 3,
      stage: "Creator",
      icon: "🎯",
      description: "Started own product journey (MelodyWeaver / Resume Tool)"
    },
    {
      id: 4,
      stage: "Thinker",
      icon: "🪐",
      description: "Built tools not just for results, but for clarity and reflection"
    }
  ],
  personalityTags: [
    {
      id: 1,
      tag: "Structure",
      icon: "🧭",
      description: "You like to first map out logic diagrams, paths, and goals in any project"
    },
    {
      id: 2,
      tag: "Playfulness",
      icon: "🎨",
      description: "You enjoy technology with a sense of 'play' that can evoke emotions in people"
    },
    {
      id: 3,
      tag: "Self-awareness",
      icon: "🪞",
      description: "You're good at adjusting your rhythm and direction through writing and analysis"
    },
    {
      id: 4,
      tag: "Precision",
      icon: "🎯",
      description: "You have a high-precision pursuit of interaction, copy, and prompt words"
    },
    {
      id: 5,
      tag: "Make-it-happen",
      icon: "🛠️",
      description: "Ideas don't get stuck for too long; you directly create the first version"
    },
    {
      id: 6,
      tag: "Lifelong learner",
      icon: "🌱",
      description: "You're always changing, willing to reset to zero, switch, and relearn"
    }
  ]
};

// Visual memories data
const visualMemories = [
  {
    id: 1,
    image: "/pathfinder/PM team.jpg",
    caption: "First time as a PM leading a 6-person team to deliver a project on time",
    description: "This moment represents a significant milestone in my professional journey. It taught me valuable lessons about collaboration, resilience, and the power of focused effort.",
    tags: ["Leadership", "Milestone", "Teamwork"]
  },
  {
    id: 2,
    image: "/pathfinder/Lucymentoring.jpg",
    caption: "Finished the Women in IT - Lucy Mentoring program",
    description: "Participating in this program connected me with industry mentors and helped shape my understanding of tech career paths for women. The networking and guidance were invaluable.",
    tags: ["Mentorship", "Networking", "Growth"]
  },
  {
    id: 3,
    image: "/pathfinder/pitch.jpg",
    caption: "Completed pitch in Apple Foundation Program",
    description: "Presenting our app idea to industry professionals was nerve-wracking but incredibly rewarding. I learned how to communicate complex ideas clearly and handle tough questions.",
    tags: ["Presentation", "Innovation", "Communication"]
  },
  {
    id: 4,
    image: "/pathfinder/IMG_9561.jpg",
    caption: "Finished Apple Foundation Program",
    description: "This intensive program taught me app development from concept to deployment. Working with a diverse team on a real product was a transformative experience in my tech journey.",
    tags: ["Development", "Collaboration", "Achievement"]
  },
  {
    id: 5,
    image: "/pathfinder/learning code.png",
    caption: "Learning to code during late night sessions",
    description: "Those long nights of debugging and learning new languages were challenging but formative. Each error message and successful compile built my technical foundation and resilience.",
    tags: ["Technical Skills", "Persistence", "Learning"]
  },
  {
    id: 6,
    image: "/pathfinder/product.JPG",
    caption: "Celebrating the launch of our first product",
    description: "The culmination of months of work, this launch celebration marked our transition from students to creators. Seeing users interact with our product was an unforgettable moment.",
    tags: ["Product Launch", "Success", "Celebration"]
  }
];

export default function PathfinderPage() {
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
      className="min-h-screen w-full bg-gradient-to-b from-[#e6f0ff] via-[#f0f4ff] to-[#ffffff] text-[#1c1c1c] font-['Inter',sans-serif] overflow-auto"
    >
      {/* Back to Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors duration-200">
          ← Back to Home
        </Link>
      </div>
      {/* Background pattern effect */}
      <motion.div 
        className="fixed inset-0 opacity-10 pointer-events-none overflow-hidden"
        style={{ opacity: backgroundOpacity, scale: backgroundScale }}
      >
        <div className="absolute inset-0 bg-pathfinder-pattern"></div>
      </motion.div>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        {/* Hero Galaxy */}
        <HeroGalaxy />
        
        {/* Role Timeline */}
        <RoleTimeline roles={careerRoles} />
        
        {/* Tech Evolution */}
        <TechEvolution
          tools={techEvolution.tools}
          cognitiveShifts={techEvolution.cognitiveShifts}
          personalityTags={techEvolution.personalityTags}
        />
        
        {/* Visual Memory Wall */}
        <VisualMemory memories={visualMemories} />
        
        {/* Footer CTA */}
        <motion.section 
          className="py-16 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden shadow-lg">
            <div className="p-8 md:p-12">
              <motion.h2 
                className="text-2xl md:text-3xl font-serif font-bold mb-6 text-blue-800 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Every planet I&apos;ve walked through left a trace in me.
              </motion.h2>
              
              <div className="text-center mb-8">
                <p className="text-blue-700 mb-2">→ I&apos;m not just here. I&apos;ve been places.</p>
                <p className="text-blue-700">→ Let&apos;s go somewhere new.</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="#"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                  <span>Explore my next product</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                  </svg>
                </Link>
                <Link 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                  <span>Connect on LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </Link>
                <Link 
                  href="#"
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                  <span>View resume PDF</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
