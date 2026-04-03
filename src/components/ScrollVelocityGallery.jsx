/* eslint-disable */
import React, { useRef } from 'react';
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform,
  useScroll, useVelocity,
} from 'framer-motion';

// ─── Gallery data ──────────────────────────────────────────────────────────────
// Replace `image` URLs with your own whenever you're ready.
export const galleryData = [
  { id: 1, title: 'Nexus Finance',    category: 'Fintech',     image: '/images/projects/nexus-finance.png', color: '#0f4c75' },
  { id: 2, title: 'Aura Streetwear', category: 'E-Commerce',  image: '/images/projects/aura-streetwear.png', color: '#1a1a2e' },
  { id: 3, title: 'Quantix AI',      category: 'SaaS / B2B',  image: '/images/projects/quantix-ai.png', color: '#16213e' },
  { id: 4, title: 'Monarch Estate',  category: 'Real Estate',  image: '/images/projects/monarch-realestate.png', color: '#2d1b69' },
  { id: 5, title: 'Vitality Health', category: 'Healthcare',   image: '/images/projects/vitality-health.png', color: '#0d3b36' },
  { id: 6, title: 'Visionary Studio',category: 'Creative',     image: '/images/projects/visionary-studio.png', color: '#3d0c11' },
  { id: 7, title: 'Orbit Analytics', category: 'Data / Web',   image: '/images/projects/nexus-finance.png', color: '#0a3d62' },
  { id: 8, title: 'Lume Agency',     category: 'Marketing',    image: '/images/projects/aura-streetwear.png', color: '#1b2838' },
  
  // 10 new additional data items using the same 6 template screenshots:
  { id: 9, title: 'Apex Robotics',   category: 'Technology',   image: '/images/projects/quantix-ai.png', color: '#314455' },
  { id: 10, title: 'Elysium Spa',    category: 'Wellness',     image: '/images/projects/vitality-health.png', color: '#8e7cc3' },
  { id: 11, title: 'Zenith Logistics',category: 'Transport',   image: '/images/projects/visionary-studio.png', color: '#2b580c' },
  { id: 12, title: 'Pinnacle Capital',category: 'Investment',  image: '/images/projects/monarch-realestate.png', color: '#1a365d' },
  { id: 13, title: 'Horizon Travel', category: 'Tourism',      image: '/images/projects/aura-streetwear.png', color: '#d97706' },
  { id: 14, title: 'Nova Media',     category: 'Entertainment',image: '/images/projects/quantix-ai.png', color: '#be123c' },
  { id: 15, title: 'Echo Acoustics', category: 'Audio / Tech', image: '/images/projects/visionary-studio.png', color: '#4338ca' },
  { id: 16, title: 'Flora Boutique', category: 'Lifestyle',    image: '/images/projects/vitality-health.png', color: '#059669' },
  { id: 17, title: 'Cosmic Aero',    category: 'Aerospace',    image: '/images/projects/nexus-finance.png', color: '#1e3a8a' },
  { id: 18, title: 'Lumina Energy',  category: 'Green Tech',   image: '/images/projects/monarch-realestate.png', color: '#0f766e' },
];

// No static LAYOUT needed anymore since it's fully mathematically driven

// ─── Per-plane component (holds its own hooks — Rules of Hooks safe) ──────────
const GalleryPlane = ({ item, index, totalItems, smoothTilt, waveY, scrollY, onHover, onLeave }) => {
  const cardRef = useRef(null);

  // Mouse-tracking tilt (per card)
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 28 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 28 });
  const sc = useSpring(useMotionValue(1), { stiffness: 280, damping: 24 });

  // Pseudo-random wave scale and rotation based on index for variety
  const waveScale = 1.0 + (index % 3) * 0.2;
  const baseRotateZ = -5 + (index % 3) * 3;

  // Smooth the raw scroll to eliminate mouse wheel chop
  const smoothScrollY = useSpring(scrollY, { stiffness: 60, damping: 25, mass: 0.5 });

  // Mathematically loop progress from 0 to 100 based on scroll
  const p = useTransform(() => {
    const baseP = (index / totalItems) * 100;
    // Use smoothed scroll instead of raw for buttery movement
    let currentP = baseP + (smoothScrollY.get() * 0.04);
    
    // Wrap between 0 and 100 for infinite loop
    let loopedP = currentP % 100;
    if (loopedP < 0) loopedP += 100;
    return loopedP;
  });

  // Map 0-100 logic to physical diagonal coordinates
  // Very high multiplier (8.0) to force massive distinct gaps between 280x380 cards
  const x = useTransform(p, (v) => `${-250 + (v * 6.0)}%`);
  const y = useTransform(p, (v) => `${350 - (v * 8.0)}%`);
  
  // Depth (translateZ): steeper depth scale to match the huge gap
  const depth = useTransform(p, (v) => 300 - (v * 12.0));
  
  // Smooth opacity fading at the extreme edges of the loop
  const opacity = useTransform(p, [0, 5, 90, 100], [0, 1, 1, 0]);

  // Velocity-driven scrubbing
  const velocityY = useTransform(() => waveY.get() * waveScale);
  const velocityX = useTransform(() => -waveY.get() * waveScale * 1.5);

  // Rotation combining base slant and scroll velocity
  const dynamicRotateZ = useTransform(smoothTilt, (v) => v * waveScale * 0.35 + baseRotateZ);
  const dynamicRotateY = useTransform(smoothTilt, (v) => v * waveScale * 1.5 - 20);

  const onMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    rx.set(-(((e.clientY - top)  / height) - 0.5) * 16);
    ry.set( (((e.clientX - left) / width)  - 0.5) * 16);
  };
  const onEnter = () => {
    sc.set(1.07);
    if (onHover) onHover(item);
  };
  const onLeaveHover = () => {
    rx.set(0);
    ry.set(0);
    sc.set(1);
    if (onLeave) onLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute cursor-pointer z-10"
      style={{
        left: x,
        top: y,
        opacity,
        width: 280,
        height: 380,
        rotateX: rx,
        rotateY: dynamicRotateY, 
        scale: sc,
        x: velocityX,
        y: velocityY,
        rotateZ: dynamicRotateZ,
        translateZ: depth,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeaveHover}
      onPointerDown={onEnter}
    >
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] group w-full h-full"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          loading="lazy"
        />

        {/* Overlay on hover */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to top, ${item.color}f0 0%, transparent 55%)` }}
        >
          <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest">
            {item.category}
          </p>
          <h3 className="text-white font-bold text-xs leading-snug">{item.title}</h3>
        </div>

        {/* Hover glow ring */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-teal-400/50 transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

// ─── Root gallery component ───────────────────────────────────────────────────
const ScrollVelocityGallery = () => {
  const containerRef = useRef(null);

  // Track scroll EXCLUSIVELY inside this specific gallery container
  const { scrollY } = useScroll({ container: containerRef });
  const rawVelocity = useVelocity(scrollY);

  // Dampened velocity tilt and wave
  const smoothTilt = useSpring(
    useTransform(rawVelocity, [-2500, 2500], [-8, 8]),
    { stiffness: 70, damping: 28 }
  );
  const waveY = useSpring(
    useTransform(rawVelocity, [-2500, 2500], [30, -30]),
    { stiffness: 70, damping: 28 }
  );

  const [hoveredItem, setHoveredItem] = React.useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for follow effect
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handlePointerMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div
      className="relative w-full h-full select-none"
      style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
    >
      {/* 
        The scrollable viewport bounds for the gallery! 
        Invisible scrollbar but accepts wheel/touch gestures.
      */}
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto no-scrollbar pointer-events-auto z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onPointerMove={handlePointerMove}
      >
        {/* Fake giant height to enable deep scrolling inside the box */}
        <div className="w-full h-[350vh]" />
      </div>

      {/* The isolated un-clipped gallery layer where elements physically live */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {galleryData.map((item, idx) => (
          <GalleryPlane
            key={item.id}
            item={item}
            index={idx}
            totalItems={galleryData.length}
            smoothTilt={smoothTilt}
            waveY={waveY}
            scrollY={scrollY}
            onHover={setHoveredItem}
            onLeave={() => setHoveredItem(null)}
          />
        ))}
      </div>

      {/* Floating Category Label */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              position: 'fixed',
              left: springX,
              top: springY,
              x: '-50%',
              y: '-140%', // Offset above the cursor
              pointerEvents: 'none',
              zIndex: 100,
            }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="px-4 py-2 bg-slate-900/40 backdrop-blur-md border border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-tighter opacity-70">
                  {hoveredItem.id.toString().padStart(2, '0')}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-[11px] font-bold text-white uppercase tracking-widest">
                  {hoveredItem.category}
                </span>
              </div>
            </div>
            
            {/* Title sub-label with more subtle look */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="px-3 py-1 bg-white/5 backdrop-blur-sm border border-white/5 rounded-lg"
            >
              <h4 className="text-[10px] text-white/60 font-medium tracking-wide">
                {hoveredItem.title}
              </h4>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "Scroll to explore" hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-slate-500 text-[10px] font-semibold tracking-widest uppercase pointer-events-none z-20"
      >
        <div className="w-px h-5 bg-gradient-to-b from-transparent to-teal-500/50" />
        Scroll to explore
        <div className="w-px h-5 bg-gradient-to-b from-teal-500/50 to-transparent" />
      </motion.div>
    </div>
  );
};

export default ScrollVelocityGallery;
