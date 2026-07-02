import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useTransform, 
  useAnimationFrame,
  useMotionValue
} from 'framer-motion';
import staticTemplates from '../data/templates';

// Extract unique images from the application's actual templates database
const allImages = Array.from(new Set(staticTemplates.map(t => t.imageUrl)));

// Local wrap helper to avoid extra dependencies
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

import OptimizedImage from './OptimizedImage';

function ParallaxColumn({ images, baseVelocity = 100, isVisible = true }) {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  useAnimationFrame((t, delta) => {
    // Pause animation when the gallery is not in viewport — saves CPU/GPU
    if (!isVisible) return;
    let moveBy = baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-col gap-4 overflow-hidden h-[800px]">
      <motion.div className="flex flex-col gap-4" style={{ y: x }}>
        {/* We repeat the large image array to ensure infinite smooth scrolling */}
        {[...images, ...images].map((src, i) => (
          <div 
            key={i} 
            className="w-full aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-200/50 relative group flex-shrink-0 lg:aspect-[4/5]"
          >
            <OptimizedImage 
              src={src} 
              alt="Website Template Interface" 
              priority={i < 2} // Load first few images with priority
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const ScrollVelocityGallery = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        // Start animating slightly before it comes into view
        rootMargin: '100px 0px',
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-6 h-full w-full">
      {/* Feed completely unique sets of images to each column so they never overlap */}
      <ParallaxColumn images={allImages.slice(0, 5)} baseVelocity={-0.8} isVisible={isVisible} />
      <ParallaxColumn images={allImages.slice(5, 10)} baseVelocity={1.2} isVisible={isVisible} />
      <ParallaxColumn images={allImages.slice(10, 15)} baseVelocity={-0.6} isVisible={isVisible} />
    </div>
  );
};

export default ScrollVelocityGallery;
