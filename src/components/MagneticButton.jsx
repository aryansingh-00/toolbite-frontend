import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, className = "", strength = 0.3 }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Calculate distance from center for magnetic pull
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    
    setPosition({ x, y });

    // Spotlight effect calculations
    const hoverX = ((clientX - left) / width) * 100;
    const hoverY = ((clientY - top) / height) * 100;
    setHoverPosition({ x: hoverX, y: hoverY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block relative overflow-hidden ${className}`}
    >
      {/* Spotlight overlay */}
      {isHovered && (
        <div 
          className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-overlay transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 60px at ${hoverPosition.x}% ${hoverPosition.y}%, rgba(255,255,255,0.8), transparent 100%)`
          }}
        />
      )}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
};

export default MagneticButton;
