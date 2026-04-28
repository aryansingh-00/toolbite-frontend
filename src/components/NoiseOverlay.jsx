import React from 'react';

const NoiseOverlay = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03] mix-blend-difference dark:opacity-[0.05] dark:mix-blend-screen">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          filter="url(#noiseFilter)"
        />
      </svg>
    </div>
  );
};

export default NoiseOverlay;
