import React from 'react';
import { motion } from 'framer-motion';

const VideoShowcase = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-24 my-12">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source 
            src="/showcase-video.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40 z-10"></div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white leading-tight mb-8">
            Engineering that <span className="text-[#c4f82a]">scales</span> with your ambition.
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
            We don't just write code; we build the foundational systems that drive modern businesses forward.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;
