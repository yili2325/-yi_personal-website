"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Activity = {
  id: number;
  type: string;
  title: string;
  quote: string;
  imageUrl: string;
  description: string;
};

type MotionGalleryProps = {
  activities: Activity[];
};

// Use the specific 8 images from the vital-orbit directory
const vitalOrbitImages = [
  // Actual images from the directory
  { src: "/vital-orbit/paddle.png", alt: "Paddle", emoji: "🧗‍♀️" },
  { src: "/vital-orbit/hero-vib.png", alt: "Fitness Journey", emoji: "🏋️" },
  { src: "/vital-orbit/clinbing.jpg", alt: "Mountain Climbing", emoji: "🧗‍♀️" },
  { src: "/vital-orbit/golf.png", alt: "Golf", emoji: "⛳" },
  { src: "/vital-orbit/weight.png", alt: "Weight Training", emoji: "🏋️" },
  { src: "/vital-orbit/golf2.png", alt: "Outdoor Activity", emoji: "🏃" },
  { src: "/vital-orbit/me.png", alt: "Sports", emoji: "🏆" },
  { src: "/vital-orbit/surfing.png", alt: "Active Lifestyle", emoji: "🏄" },
];

// Fallback emojis if images aren't available
const activityEmojis: Record<string, string> = {
  climbing: "🧗‍♀️",
  lifting: "🏋️",
  golf: "⛳",
  running: "🏃",
  swimming: "🏊",
  cycling: "🚴",
  hiking: "🥾",
  yoga: "🧘",
  dancing: "💃",
  surfing: "🏄",
  skiing: "⛷️",
  basketball: "🏀",
  tennis: "🎾",
  default: "🏃"
};

type CollageImageProps = {
  src: string;
  alt: string;
  emoji: string;
  style: {
    top: string;
    left: string;
    transform: string;
    zIndex: number;
    width: string;
    height: string;
  };
  delay: number;
};

const CollageImage = ({ src, alt, emoji, style, delay }: CollageImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Create alternating zoom animations based on index
  // Even indexes zoom in, odd indexes zoom out
  const isEven = parseInt(style.zIndex.toString()) % 2 === 0;
  const zoomAnimation = isEven ? 
    { scale: [1, 1.05, 1] } : 
    { scale: [1, 0.95, 1] };
  
  return (
    <motion.div
      className="absolute rounded-lg overflow-hidden shadow-xl"
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.15, zIndex: 20, rotate: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      // Continuous zoom animation
      animate={zoomAnimation}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 4 + Math.random() * 3, // Random duration between 4-7 seconds for more fluid motion
        ease: "easeInOut",
        // Apply delay only to initial animation
        delay: isHovered ? 0 : delay
      }}
    >
      <div className="relative w-full h-full bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-white/50">
        {/* Show image if available, otherwise show emoji */}
        {!imageError && src ? (
          <Image 
            src={src} 
            alt={alt} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
            priority={true}
            className="object-cover hover:object-contain transition-all duration-500" 
            onError={() => setImageError(true)}
          />
        ) : (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-7xl opacity-60 text-emerald-700"
            // Add subtle rotation to emojis
            animate={{ rotate: [0, isEven ? 8 : -8, 0], scale: [1, 1.1, 1] }}
            transition={{ 
              repeat: Infinity, 
              duration: 4 + Math.random() * 3, // Random duration between 4-7 seconds
              ease: "easeInOut"
            }}
          >
            {emoji || activityEmojis.default}
          </motion.div>
        )}
        
        {/* No text labels as requested */}
        
        {/* Simple overlay effect on hover - no text or blur */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-emerald-800/20 flex items-center justify-center border border-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

        )}
      </div>
    </motion.div>
  );
};

export default function MotionGallery({ activities }: MotionGalleryProps) {
  // Generate random positions for the collage images
  const [collageImages, setCollageImages] = useState<Array<CollageImageProps>>([]); 
  
  useEffect(() => {
    // Use only the specific vital orbit images - ensure all 8 are displayed
    const selectedImages = vitalOrbitImages;
    
    // Make sure we're using exactly the 8 images from vital-orbit directory
    
    // Create a grid system with 3 columns and 3 rows (for 10 images with larger sizes)
    const gridCols = 3;
    const gridRows = 3;
    
    // Calculate cell dimensions
    const cellWidth = 100 / gridCols;
    const cellHeight = 100 / gridRows;
    
    // Generate positions using a strict grid-based approach
    const generatedImages = selectedImages.map((img, index) => {
      // Determine exact grid position
      const gridRow = Math.floor(index / gridCols);
      const gridCol = index % gridCols;
      
      // Calculate center position of each cell
      // Add small jitter (10%) for visual interest without causing overlap
      const jitterX = (Math.random() * 0.2 - 0.1) * cellWidth; // 10% jitter
      const jitterY = (Math.random() * 0.2 - 0.1) * cellHeight; // 10% jitter
      
      // Calculate position with minimal jitter
      // Use cell center as base position, allowing some overlap for visual interest
      const cellCenterX = gridCol * cellWidth + (cellWidth / 2);
      const cellCenterY = gridRow * cellHeight + (cellHeight / 2);
      // Adjust position to create more centered layout
      const left = `${cellCenterX + jitterX - 10}%`; // Shift left by 10%
      const top = `${cellCenterY + jitterY - 5}%`; // Shift up by 5%
      
      // Random rotation between -15 and 15 degrees
      const rotation = Math.random() * 30 - 15;
      
      // Size variation that fits within grid cells with some intentional overlap
      // Calculate maximum size based on cell dimensions (130% of cell size for more dramatic impact)
      const maxCellDimension = Math.min(cellWidth, cellHeight) * 1.3;
      
      // Create distinct size difference between large and small images
      // First 5 images (index 0-4) will be large, last 5 (index 5-9) will be small
      const isLargeImage = index < 5;
      
      // Base reference sizes for large and small images - further increased for maximum impact
      const largeReferenceSize = 1400; // Even larger base size for big images
      const smallReferenceSize = 800; // Larger base size for small images
      
      // Select the appropriate reference size based on whether this is a large or small image
      const referenceSize = isLargeImage ? largeReferenceSize : smallReferenceSize;
      const scaledSize = referenceSize * (maxCellDimension / 100);
      
      // Add slight variation within each size group - with higher minimum sizes
      const variationFactor = isLargeImage ? 
        (0.98 + (Math.random() * 0.02)) : // 98-100% for large images
        (0.95 + (Math.random() * 0.05)); // 95-100% for small images
      
      const size = scaledSize * variationFactor;
      const width = `${size}px`;
      const height = `${size}px`;
      
      // Random z-index for layering effect, but ensure some variation
      const zIndex = 1 + Math.floor(Math.random() * 3);
      
      // Random delay for animation
      const delay = index * 0.1;
      
      return {
        src: img.src,
        alt: img.alt,
        emoji: img.emoji || activityEmojis.default,
        style: {
          top,
          left,
          transform: `rotate(${rotation}deg)`,
          zIndex,
          width,
          height
        },
        delay
      };
    });
    
    setCollageImages(generatedImages);
  }, [activities]);
  
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
        Motion Gallery
      </motion.h2>
      
      <motion.p
        className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Movement is my meditation. These activities shape not just my body, but my approach to challenges.
      </motion.p>
      
      {/* Collage container - enhanced for larger, more impactful images */}
      <div className="relative w-full h-[1000px] mb-12 bg-emerald-50/50 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
        {collageImages.map((img, index) => (
          <CollageImage
            key={index}
            src={img.src}
            alt={img.alt}
            emoji={img.emoji}
            style={img.style}
            delay={img.delay}
          />
        ))}
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute bottom-4 right-4 text-emerald-800/20 text-6xl"
          initial={{ opacity: 0, rotate: -10 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          🏃
        </motion.div>
        
        <motion.div 
          className="absolute top-4 left-4 text-emerald-800/20 text-6xl"
          initial={{ opacity: 0, rotate: 10 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          🧗‍♀️
        </motion.div>
      </div>
      
      {/* Interactive note */}
      <motion.div
        className="mt-4 bg-emerald-50 p-6 rounded-lg border border-emerald-100 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-emerald-800 font-medium mb-2">My Movement Philosophy</h3>
        <p className="text-gray-600 text-sm">
          I&apos;ve found that physical structure creates mental clarity. Each activity offers a different lesson: 
          climbing teaches focus, lifting builds resilience, and golf cultivates patience. 
          These aren&apos;t just hobbies—they&apos;re laboratories for personal growth.
        </p>
      </motion.div>
    </motion.section>
  );
}
