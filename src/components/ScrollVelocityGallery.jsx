import React from 'react';
import { 
  motion, 
  useTransform, 
  useAnimationFrame,
  useMotionValue
} from 'framer-motion';
import staticTemplates from '../data/templates';

// Extract all images from the application's actual templates database
const allImages = staticTemplates.map(t => t.imageUrl);

// Local wrap helper to avoid extra dependencies
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

import OptimizedImage from './OptimizedImage';

function ParallaxColumn({ images, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-col gap-4 overflow-hidden h-[3000px]">
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
              priority={i < 5} // Load first few images with priority
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
  return (
    <div className="grid grid-cols-3 gap-6 h-full w-full">
      {/* Feed completely unique, large sets of images to each column so they never overlap */}
      <ParallaxColumn images={allImages.slice(0, 15)} baseVelocity={-0.8} />
      <ParallaxColumn images={allImages.slice(15, 30)} baseVelocity={1.2} />
      <ParallaxColumn images={allImages.slice(30, 45)} baseVelocity={-0.6} />
    </div>
  );
};

export default ScrollVelocityGallery;
