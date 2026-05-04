import React, { useRef, useEffect } from 'react';

const BackgroundVideo = ({ 
  src = "https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-purple-and-blue-light-streams-32860-large.mp4",
  opacity = 0.25,
  blur = 0,
  className = ""
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6; // Slightly slower for a more ethereal feel
    }
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{ opacity }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: blur > 0 ? `blur(${blur}px)` : 'none' }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Subtle overlay to ensure contrast and blend with theme */}
      <div className="absolute inset-0 bg-slate-950/20 dark:bg-slate-950/40 mix-blend-multiply z-[1]" />
      
      {/* Gradient mask to fade out at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-slate-950 z-[2]" />
    </div>
  );
};

export default BackgroundVideo;
