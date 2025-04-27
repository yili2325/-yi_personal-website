"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import AiTwin from "@/components/AiTwin";

// Define planet types
type PlanetType = {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
};

export default function Home() {
  const universeRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [universeOffset, setUniverseOffset] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Define planets
  const planets: PlanetType[] = [
    {
      id: "product-builder",
      name: "Product Builder",
      icon: "🛠️",
      description: "I write in code and compose in function.",
      color: "product-builder",
      size: 125,
      orbitRadius: 260,
      orbitSpeed: 0.00009,
      orbitOffset: Math.PI * 0.3,
    },
    {
      id: "insight",
      name: "Insight Architect",
      icon: "✨",
      description: "I structure thoughts into systems of meaning.",
      color: "insight",
      size: 110,
      orbitRadius: 250,
      orbitSpeed: 0.00009,
      orbitOffset: Math.PI,
    },
    {
      id: "vital-orbit",
      name: "Vital Orbit",
      icon: "🪐",
      description: "Where I move, give, and return to myself.",
      color: "vital-orbit",
      size: 115,
      orbitRadius: 310,
      orbitSpeed: 0.00007,
      orbitOffset: Math.PI * 1.5,
    },
    {
      id: "pathfinder",
      name: "Pathfinder",
      icon: "🧭",
      description: "I'm not defined by roles — I'm shaped by the routes I've walked.",
      color: "pathfinder",
      size: 105,
      orbitRadius: 340,
      orbitSpeed: 0.00006,
      orbitOffset: Math.PI * 0.5,
    },
  ];

  // Handle mouse movement to control universe with parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartPos.x;
        const deltaY = e.clientY - dragStartPos.y;
        
        setUniverseOffset(prev => ({
          x: prev.x + deltaX * 0.05,
          y: prev.y + deltaY * 0.05
        }));
        
        setDragStartPos({ x: e.clientX, y: e.clientY });
      } else {
        // Add subtle parallax effect when mouse moves without dragging
        // Calculate mouse position relative to center of screen
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = (e.clientX - centerX) / centerX * 15; // Max 15px movement
        const offsetY = (e.clientY - centerY) / centerY * 10; // Max 10px movement
        
        // Apply subtle parallax effect to universe
        if (universeRef.current) {
          universeRef.current.style.backgroundPosition = `calc(50% + ${offsetX}px) calc(50% + ${offsetY}px)`;
        }
      }
      
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setDragStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, isDragging, dragStartPos]);

  // Generate stars for background with enhanced animation
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
      const size = Math.random() * 2;
      const opacity = Math.random() * 0.8 + 0.2;
      // Create different animation durations and delays for varied movement
      const driftDuration = Math.random() * 60 + 30; // 30-90s drift cycle
      const pulseDuration = Math.random() * 3 + 2; // 2-5s pulse cycle
      const delay = Math.random() * 10; // Random delay up to 10s
      
      stars.push(
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity,
          }}
          animate={{
            x: [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10],
            y: [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10],
            opacity: [opacity, opacity * 0.6, opacity],
            scale: [1, size > 1 ? 1.5 : 1.2, 1],
          }}
          transition={{
            duration: driftDuration,
            times: [0, 0.5, 1],
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
          }}
        />
      );
    }
    return stars;
  };

  // Calculate planet positions based on orbit
  const calculatePlanetPosition = (planet: PlanetType) => {
    const now = Date.now();
    const angle = now * planet.orbitSpeed + planet.orbitOffset;
    
    // Use default values during server-side rendering
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    const centerX = windowWidth / 2 + universeOffset.x;
    const centerY = windowHeight / 2 + universeOffset.y;
    
    // Calculate position
    const x = centerX + Math.cos(angle) * planet.orbitRadius;
    const y = centerY + Math.sin(angle) * planet.orbitRadius;
    
    return { x, y };
  };

  return (
    <div 
      className="universe" 
      ref={universeRef}
    >
      {/* Stars background */}
      <div className="stars">{isClient && generateStars()}</div>
      
      {/* Center avatar */}
      <motion.div 
        className="center-avatar"
        animate={{
          scale: 1.025
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <Image
          src="/avatar-placeholder.svg"
          alt="Personal Avatar"
          width={150}
          height={150}
          className="rounded-full bloom"
          priority
        />
      </motion.div>
      
      {/* Orbiting planets */}
      {planets.map((planet) => {
        const position = calculatePlanetPosition(planet);
        
        // Define custom animations based on planet type
        let customAnimation = {};
        let customHoverAnimation = {};
        let customTransition = {};
        
        // Creator - Slow rotation
        if (planet.id === "creator") {
          customAnimation = {
            rotate: 360
          };
          customTransition = {
            rotate: {
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }
          };
          customHoverAnimation = {
            scale: 1.1,
            boxShadow: `inset 0 0 30px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.3)`,
          };
        }
        
        // Developer - Micro-vibration on hover
        else if (planet.id === "developer") {
          customHoverAnimation = {
            scale: 1.1,
            x: [0, -3, 3, -2, 2, 0],
            boxShadow: `inset 0 0 30px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.3)`,
          };
        }
        
        // Insight Architect - Combines writing and reflection elements
        else if (planet.id === "insight") {
          customAnimation = {
            boxShadow: [
              `0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.2)`,
              `0 0 30px rgba(139, 92, 246, 0.5), inset 0 0 30px rgba(139, 92, 246, 0.3)`,
              `0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.2)`
            ],
            rotate: 360
          };
          customTransition = {
            boxShadow: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            rotate: {
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }
          };
          customHoverAnimation = {
            scale: 1.1,
            boxShadow: `0 0 40px rgba(139, 92, 246, 0.6), inset 0 0 30px rgba(139, 92, 246, 0.4)`,
          };
        }
        
        // Vital Orbit - Rhythmic pulsing with movement effect
        else if (planet.id === "vital-orbit") {
          customAnimation = {
            boxShadow: [
              `0 0 20px rgba(52, 211, 153, 0.3), inset 0 0 20px rgba(52, 211, 153, 0.2)`,
              `0 0 30px rgba(52, 211, 153, 0.5), inset 0 0 30px rgba(52, 211, 153, 0.3)`,
              `0 0 20px rgba(52, 211, 153, 0.3), inset 0 0 20px rgba(52, 211, 153, 0.2)`
            ],
            scale: [1, 1.03, 1],
            y: [0, -3, 0, 3, 0]
          };
          customTransition = {
            boxShadow: {
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          };
          customHoverAnimation = {
            scale: 1.1,
            boxShadow: `0 0 40px rgba(52, 211, 153, 0.6), inset 0 0 30px rgba(52, 211, 153, 0.4)`,
          };
        }
        
        // Pathfinder - Cosmic navigation with map-like effects
        else if (planet.id === "pathfinder") {
          customAnimation = {
            boxShadow: [
              `0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.2)`,
              `0 0 30px rgba(59, 130, 246, 0.5), inset 0 0 30px rgba(59, 130, 246, 0.3)`,
              `0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.2)`
            ],
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.02, 1]
          };
          customTransition = {
            boxShadow: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            rotate: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          };
          customHoverAnimation = {
            scale: 1.1,
            boxShadow: `0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(59, 130, 246, 0.4)`,
          };
        }
        
        // Product Builder - Combines creativity and technical implementation
        else if (planet.id === "product-builder") {
          customAnimation = {
            boxShadow: [
              `0 0 20px rgba(245, 158, 11, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.2)`,
              `0 0 30px rgba(245, 158, 11, 0.5), inset 0 0 30px rgba(168, 85, 247, 0.3)`,
              `0 0 20px rgba(245, 158, 11, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.2)`
            ],
            rotate: 360,
            scale: [1, 1.03, 1]
          };
          customTransition = {
            boxShadow: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            rotate: {
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          };
          customHoverAnimation = {
            scale: 1.1,
            boxShadow: `0 0 40px rgba(245, 158, 11, 0.6), inset 0 0 30px rgba(168, 85, 247, 0.4)`,
          };
        }
        
        return (
          <motion.div
            key={planet.id}
            className={`planet ${planet.color}`}
            style={{
              width: planet.size,
              height: planet.size,
              left: position.x - planet.size / 2,
              top: position.y - planet.size / 2,
            }}
            animate={customAnimation}
            transition={customTransition}
            whileHover={customHoverAnimation} 
            onHoverStart={() => setHoveredPlanet(planet.id)}
            onHoverEnd={() => setHoveredPlanet(null)}
            onClick={() => window.location.href = `/${planet.id}`}
            role="button"
            tabIndex={0}
            aria-label={`Navigate to ${planet.name}`}
          >
              <span className="text-2xl">{planet.icon}</span>
              
              {/* Insight Architect planet sparkles */}
              {planet.id === "insight" && (
                <>
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-300 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        filter: ["blur(2px)", "blur(0px)", "blur(2px)"],
                      }}
                      transition={{
                        duration: 1.5 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        repeatDelay: Math.random() * 2,
                      }}
                    />
                  ))}
                </>
              )}
              
              {/* Vital Orbit planet energy waves */}
              {planet.id === "vital-orbit" && (
                <>
                  {/* Energy waves */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border border-emerald-300 opacity-0"
                      style={{
                        width: '100%',
                        height: '100%',
                        top: '0',
                        left: '0',
                      }}
                      animate={{
                        opacity: [0, 0.5, 0],
                        scale: [0.8, 1.5, 1.8],
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.7,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                  
                  {/* Motion dots */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={`dot-${i}`}
                      className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        y: [0, (Math.random() - 0.5) * 20],
                        x: [0, (Math.random() - 0.5) * 20],
                      }}
                      transition={{
                        duration: 1 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </>
              )}
              
              {/* Pathfinder planet map-like effects */}
              {planet.id === "pathfinder" && (
                <>
                  {/* Map grid lines */}
                  <motion.div
                    className="absolute w-full h-full rounded-full overflow-hidden opacity-30"
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 60,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                      {[...Array(36)].map((_, i) => (
                        <div key={i} className="border-[0.5px] border-blue-300/20" />
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Compass points */}
                  {[
                    { label: "N", top: "5%", left: "50%" },
                    { label: "E", top: "50%", left: "95%" },
                    { label: "S", top: "95%", left: "50%" },
                    { label: "W", top: "50%", left: "5%" }
                  ].map((point, i) => (
                    <motion.div
                      key={`point-${i}`}
                      className="absolute text-[8px] font-bold text-blue-400 opacity-60"
                      style={{
                        top: point.top,
                        left: point.left,
                        transform: "translate(-50%, -50%)"
                      }}
                      animate={{
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {point.label}
                    </motion.div>
                  ))}
                  
                  {/* Route dots */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`route-${i}`}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 3,
                      }}
                    />
                  ))}
                </>
              )}
              
              {/* Planet tooltip */}
              {hoveredPlanet === planet.id && (
                <motion.div
                  className="absolute glass p-3 rounded-lg z-20"
                  style={{
                    top: "110%",
                    width: "max-content",
                    maxWidth: "200px",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-bold text-lg mb-1">{planet.name}</h3>
                  <p className="text-sm opacity-80">{planet.description}</p>
                </motion.div>
              )}
            </motion.div>
        );
      })}
      
      {/* Tagline at bottom */}
      <div className="tagline">
        Exploring the edges of identity as a creator, coder, thinker, and human.
      </div>
      
      {/* AI Twin Easter Egg */}
      <AiTwin />
    </div>
  );
}
