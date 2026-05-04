import React from 'react';

/**
 * EtherFlow — Cinematic silk-smoke animated background.
 * Matches the exact mockup: large flowing lavender/pink/blue organic shapes on near-black.
 */
const EtherFlow = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#08080f',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          {/* Main silk gradients */}
          <radialGradient id="ef-lavender" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9b7fd4" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#7c5cbf" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4a2a8f" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ef-pink" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4a0c8" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#c084b8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8b4a8f" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ef-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60aede" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3d8fc4" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1a4a6f" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ef-deep" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5b2d8e" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#3d1d6b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1a0a38" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ef-teal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4fb8c4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#4fb8c4" stopOpacity="0" />
          </radialGradient>

          {/* Silk path gradients */}
          <linearGradient id="ef-silk1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9b7fd4" stopOpacity="0" />
            <stop offset="25%" stopColor="#c084b8" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#9b7fd4" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#60aede" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#60aede" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="ef-silk2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c084b8" stopOpacity="0" />
            <stop offset="30%" stopColor="#9b7fd4" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#5b2d8e" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#c084b8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="ef-silk3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60aede" stopOpacity="0" />
            <stop offset="35%" stopColor="#4fb8c4" stopOpacity="0.6" />
            <stop offset="65%" stopColor="#60aede" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9b7fd4" stopOpacity="0" />
          </linearGradient>

          {/* Blur filter for soft glow */}
          <filter id="ef-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="35" result="blur" />
          </filter>
          <filter id="ef-glow-light" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" result="blur" />
          </filter>
          <filter id="ef-silk-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* === DEEP BACKGROUND BLOBS === */}
        {/* Deep purple base - bottom left */}
        <ellipse cx="180" cy="820" rx="520" ry="320" fill="url(#ef-deep)" filter="url(#ef-glow)">
          <animateTransform attributeName="transform" type="translate"
            values="0,0; 60,-40; -30,20; 0,0" dur="22s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
          <animate attributeName="rx" values="520;570;480;520" dur="22s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
        </ellipse>

        {/* Lavender - top right */}
        <ellipse cx="1280" cy="120" rx="500" ry="380" fill="url(#ef-lavender)" filter="url(#ef-glow)">
          <animateTransform attributeName="transform" type="translate"
            values="0,0; -70,50; 30,-25; 0,0" dur="19s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
          <animate attributeName="rx" values="500;540;460;500" dur="19s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
        </ellipse>

        {/* Pink - top left, rising */}
        <ellipse cx="120" cy="200" rx="420" ry="300" fill="url(#ef-pink)" filter="url(#ef-glow)">
          <animateTransform attributeName="transform" type="translate"
            values="0,0; 80,60; -40,-30; 0,0" dur="25s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
        </ellipse>

        {/* Blue - right center */}
        <ellipse cx="1350" cy="650" rx="460" ry="320" fill="url(#ef-blue)" filter="url(#ef-glow)">
          <animateTransform attributeName="transform" type="translate"
            values="0,0; -50,-60; 25,30; 0,0" dur="28s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
          <animate attributeName="ry" values="320;360;280;320" dur="28s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
        </ellipse>

        {/* Teal accent - center bottom */}
        <ellipse cx="720" cy="820" rx="350" ry="200" fill="url(#ef-teal)" filter="url(#ef-glow)">
          <animateTransform attributeName="transform" type="translate"
            values="0,0; -60,0; 40,0; 0,0" dur="32s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
        </ellipse>

        {/* Center lavender glow */}
        <ellipse cx="720" cy="450" rx="380" ry="260" fill="url(#ef-deep)" filter="url(#ef-glow)">
          <animateTransform attributeName="transform" type="translate"
            values="0,0; 40,-30; -20,40; 0,0" dur="35s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
        </ellipse>

        {/* === FLOWING SILK SHAPES === */}
        {/* Silk ribbon 1 - sweeps top-right to bottom-center */}
        <path
          d="M 1440 0 C 1100 80 900 200 700 350 C 500 500 300 580 0 620"
          stroke="url(#ef-silk1)" strokeWidth="180" fill="none" opacity="0.55"
          filter="url(#ef-silk-blur)"
        >
          <animate attributeName="d"
            values="
              M 1440 0 C 1100 80 900 200 700 350 C 500 500 300 580 0 620;
              M 1440 50 C 1050 100 850 250 650 380 C 450 510 280 610 0 650;
              M 1440 0 C 1100 80 900 200 700 350 C 500 500 300 580 0 620
            "
            dur="16s" repeatCount="indefinite" calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
        </path>

        {/* Silk ribbon 2 - sweeps left to right */}
        <path
          d="M 0 800 C 200 600 400 400 600 350 C 800 300 1000 200 1440 100"
          stroke="url(#ef-silk2)" strokeWidth="160" fill="none" opacity="0.5"
          filter="url(#ef-silk-blur)"
        >
          <animate attributeName="d"
            values="
              M 0 800 C 200 600 400 400 600 350 C 800 300 1000 200 1440 100;
              M 0 750 C 220 620 430 430 630 360 C 830 290 1020 180 1440 80;
              M 0 800 C 200 600 400 400 600 350 C 800 300 1000 200 1440 100
            "
            dur="20s" repeatCount="indefinite" calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
        </path>

        {/* Silk ribbon 3 - diagonal cross sweep  */}
        <path
          d="M 0 100 C 300 300 500 400 720 450 C 940 500 1200 650 1440 900"
          stroke="url(#ef-silk3)" strokeWidth="130" fill="none" opacity="0.45"
          filter="url(#ef-silk-blur)"
        >
          <animate attributeName="d"
            values="
              M 0 100 C 300 300 500 400 720 450 C 940 500 1200 650 1440 900;
              M 0 150 C 320 320 520 380 720 430 C 920 480 1180 680 1440 900;
              M 0 100 C 300 300 500 400 720 450 C 940 500 1200 650 1440 900
            "
            dur="24s" repeatCount="indefinite" calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
        </path>

        {/* Thin bright silk highlight 1 */}
        <path
          d="M 1440 80 C 1100 200 850 300 600 400 C 400 480 180 550 -20 700"
          stroke="#c0a0e0" strokeWidth="30" fill="none" opacity="0.3"
          filter="url(#ef-glow-light)"
        >
          <animate attributeName="d"
            values="
              M 1440 80 C 1100 200 850 300 600 400 C 400 480 180 550 -20 700;
              M 1440 40 C 1080 180 830 320 580 420 C 380 500 160 580 -20 720;
              M 1440 80 C 1100 200 850 300 600 400 C 400 480 180 550 -20 700
            "
            dur="13s" repeatCount="indefinite" calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
        </path>

        {/* Thin bright silk highlight 2 - bottom */}
        <path
          d="M 0 850 C 250 700 480 620 720 580 C 960 540 1200 480 1450 300"
          stroke="#88c8e8" strokeWidth="24" fill="none" opacity="0.28"
          filter="url(#ef-glow-light)"
        >
          <animate attributeName="d"
            values="
              M 0 850 C 250 700 480 620 720 580 C 960 540 1200 480 1450 300;
              M 0 820 C 270 680 500 600 720 570 C 940 540 1180 460 1450 280;
              M 0 850 C 250 700 480 620 720 580 C 960 540 1200 480 1450 300
            "
            dur="18s" repeatCount="indefinite" calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
        </path>

        {/* Particle dots scattered */}
        {[
          { cx: 250, cy: 180, r: 1.5, dur: '4s', c: '#c0a0e0' },
          { cx: 820, cy: 120, r: 1,   dur: '5s', c: '#88c8e8' },
          { cx: 1200, cy: 350, r: 2,  dur: '6s', c: '#d4a0c8' },
          { cx: 480, cy: 680, r: 1.5, dur: '4.5s', c: '#9b7fd4' },
          { cx: 1050, cy: 750, r: 1,  dur: '7s', c: '#60aede' },
          { cx: 650, cy: 280, r: 1.2, dur: '5.5s', c: '#c0a0e0' },
          { cx: 1300, cy: 520, r: 1.8, dur: '3.5s', c: '#d4a0c8' },
          { cx: 380, cy: 430, r: 1,   dur: '8s', c: '#88c8e8' },
        ].map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.c} opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.1;0.8" dur={p.dur}
              repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      {/* Vignette - darker edges to make center text pop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(4,4,12,0.55) 100%)',
      }} />

      {/* Bottom fade into page */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
        background: 'linear-gradient(to bottom, transparent, #08080f)',
      }} />

      {/* Top fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '20%',
        background: 'linear-gradient(to top, transparent, rgba(8,8,15,0.4))',
      }} />
    </div>
  );
};

export default EtherFlow;
