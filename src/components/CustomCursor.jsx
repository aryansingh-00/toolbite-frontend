import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('input') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-teal-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          left: -16,
          top: -16,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? "rgba(20, 184, 166, 0.1)" : "rgba(20, 184, 166, 0)",
        }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-teal-500 rounded-full pointer-events-none z-[10000] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          left: -3,
          top: -3,
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
