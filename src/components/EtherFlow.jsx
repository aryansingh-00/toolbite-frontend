import React from 'react';

/**
 * EtherFlow - A pure CSS/SVG cinematic animated background.
 * Replicates the "Ether Flow" vision with Lavender, Pink, and Blue palette.
 * No external dependencies, no network requests, no errors.
 */
const EtherFlow = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* === Base gradient canvas === */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0f0a1e] to-[#0a0f1e]" />

      {/* === SVG Ether Flow Orbs === */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
        style={{ opacity: 0.85 }}
      >
        <defs>
          {/* Lavender Orb */}
          <radialGradient id="eg-orb1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B19CD9" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#B19CD9" stopOpacity="0" />
          </radialGradient>
          {/* Pink Orb */}
          <radialGradient id="eg-orb2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB6C1" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FFB6C1" stopOpacity="0" />
          </radialGradient>
          {/* Sky Blue Orb */}
          <radialGradient id="eg-orb3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#87CEEB" stopOpacity="0" />
          </radialGradient>
          {/* Deep violet accent */}
          <radialGradient id="eg-orb4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7B3FE4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7B3FE4" stopOpacity="0" />
          </radialGradient>
          {/* Soft pink accent */}
          <radialGradient id="eg-orb5" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E879F9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E879F9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Orb 1 - Lavender, top-right, slow drift */}
        <ellipse cx="1100" cy="150" rx="520" ry="420" fill="url(#eg-orb1)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -60,40; 30,-30; 0,0"
            dur="18s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
          />
          <animate
            attributeName="rx"
            values="520;560;480;520"
            dur="18s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
          />
        </ellipse>

        {/* Orb 2 - Pink, mid-left, medium drift */}
        <ellipse cx="200" cy="500" rx="480" ry="380" fill="url(#eg-orb2)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 80,-50; -40,30; 0,0"
            dur="22s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
          />
          <animate
            attributeName="ry"
            values="380;420;340;380"
            dur="22s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
          />
        </ellipse>

        {/* Orb 3 - Sky Blue, bottom-center, slow pulse */}
        <ellipse cx="720" cy="800" rx="600" ry="260" fill="url(#eg-orb3)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -50,-30; 60,20; 0,0"
            dur="26s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
          />
          <animate
            attributeName="rx"
            values="600;640;560;600"
            dur="26s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
          />
        </ellipse>

        {/* Orb 4 - Deep Violet, center, subtle */}
        <ellipse cx="720" cy="380" rx="380" ry="300" fill="url(#eg-orb4)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 40,60; -30,-40; 0,0"
            dur="30s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
          />
        </ellipse>

        {/* Orb 5 - Pink accent, top-left */}
        <ellipse cx="100" cy="100" rx="320" ry="260" fill="url(#eg-orb5)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 70,50; -20,30; 0,0"
            dur="20s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
          />
        </ellipse>
      </svg>

      {/* === Flowing silk strands (CSS-animated paths) === */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
        style={{ opacity: 0.18 }}
      >
        <defs>
          <linearGradient id="eg-strand1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B19CD9" stopOpacity="0" />
            <stop offset="40%" stopColor="#B19CD9" stopOpacity="1" />
            <stop offset="60%" stopColor="#FFB6C1" stopOpacity="1" />
            <stop offset="100%" stopColor="#87CEEB" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="eg-strand2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" stopOpacity="0" />
            <stop offset="40%" stopColor="#87CEEB" stopOpacity="1" />
            <stop offset="60%" stopColor="#B19CD9" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFB6C1" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Strand 1 */}
        <path
          d="M -100 300 Q 360 100 720 450 Q 1080 800 1540 250"
          stroke="url(#eg-strand1)"
          strokeWidth="2.5"
          fill="none"
        >
          <animate
            attributeName="d"
            values="
              M -100 300 Q 360 100 720 450 Q 1080 800 1540 250;
              M -100 400 Q 360 200 720 350 Q 1080 600 1540 350;
              M -100 300 Q 360 100 720 450 Q 1080 800 1540 250
            "
            dur="15s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
          />
        </path>
        {/* Strand 2 */}
        <path
          d="M -100 600 Q 360 800 720 450 Q 1080 100 1540 600"
          stroke="url(#eg-strand2)"
          strokeWidth="2"
          fill="none"
        >
          <animate
            attributeName="d"
            values="
              M -100 600 Q 360 800 720 450 Q 1080 100 1540 600;
              M -100 500 Q 360 700 720 550 Q 1080 300 1540 500;
              M -100 600 Q 360 800 720 450 Q 1080 100 1540 600
            "
            dur="19s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
          />
        </path>
        {/* Strand 3 */}
        <path
          d="M 200 -50 Q 500 400 720 250 Q 940 100 1100 900"
          stroke="url(#eg-strand1)"
          strokeWidth="1.5"
          fill="none"
          style={{ opacity: 0.6 }}
        >
          <animate
            attributeName="d"
            values="
              M 200 -50 Q 500 400 720 250 Q 940 100 1100 900;
              M 250 -50 Q 450 350 720 350 Q 990 200 1050 900;
              M 200 -50 Q 500 400 720 250 Q 940 100 1100 900
            "
            dur="23s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
          />
        </path>
      </svg>

      {/* === Bottom fade to blend with page content === */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950 pointer-events-none" />

      {/* === Subtle grain noise overlay for premium texture === */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
};

export default EtherFlow;
