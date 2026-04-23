import React from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  priority = false, 
  width, 
  height,
  ...props 
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      className={`${className} transition-opacity duration-300`}
      onLoad={(e) => {
        e.target.classList.add('opacity-100');
        
        // Development Audit
        if (import.meta.env.MODE === 'development') {
          const isWebP = src.toLowerCase().endsWith('.webp') || src.toLowerCase().endsWith('.svg');
          if (!isWebP) {
            console.warn(`[Performance Audit] Image "${src}" is not in WebP/SVG format. Consider optimizing for faster load times.`);
          }
        }
      }}
      {...props}
    />
  );
};

export default OptimizedImage;
