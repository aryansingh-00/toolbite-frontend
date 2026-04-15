import React from 'react';
import { 
  motion, 
  useTransform, 
  useAnimationFrame,
  useMotionValue
} from 'framer-motion';

// Local wrap helper to avoid extra dependencies
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const images = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1454165205744-3b78555e5572?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=400&auto=format&fit=crop",
];

function ParallaxColumn({ images, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-col gap-4 overflow-hidden h-[2000px]">
      <motion.div className="flex flex-col gap-4" style={{ y: x }}>
        {[...images, ...images, ...images].map((src, i) => (
          <div 
            key={i} 
            className="w-full aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-200/50 relative group"
          >
            <img 
              src={src} 
              alt="Work" 
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
    <div className="grid grid-cols-3 gap-8 h-full w-full">
      <ParallaxColumn images={images.slice(0, 3)} baseVelocity={-2} />
      <ParallaxColumn images={images.slice(3, 6)} baseVelocity={3} />
      <ParallaxColumn images={images.slice(0, 4)} baseVelocity={-1.5} />
    </div>
  );
};

export default ScrollVelocityGallery;
