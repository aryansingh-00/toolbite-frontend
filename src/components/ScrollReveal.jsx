import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children, delay = 0, className = "", direction = "up" }) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
      x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
      filter: "blur(10px)",
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 1.2,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Custom "premium" cubic-bezier
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
