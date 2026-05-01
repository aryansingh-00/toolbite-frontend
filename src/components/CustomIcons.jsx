
import React from 'react';

/**
 * CustomerCareIcon - A clean, premium SVG tracing of the provided headset image.
 */
export const CustomerCareIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    {...props}
  >
    {/* Body / Suit - Bold Silhouette */}
    <path 
      d="M4 20.5C4 17.4624 6.46243 15 9.5 15H14.5C17.5376 15 20 17.4624 20 20.5V22H4V20.5Z" 
      fill="currentColor" 
    />
    {/* Shirt V-neck */}
    <path 
      d="M12 15L9.5 19H14.5L12 15Z" 
      fill="white" 
      fillOpacity="0.15"
    />
    {/* Tie */}
    <path 
      d="M12 16.5L11.2 22H12.8L12 16.5Z" 
      fill="white" 
      fillOpacity="0.25"
    />
    {/* Head */}
    <circle cx="12" cy="9" r="5" fill="currentColor" />
    {/* Headset Band - Bold */}
    <path 
      d="M7 10C7 7.23858 9.23858 5 12 5C14.7614 5 17 7.23858 17 10" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
    />
    {/* Ear Pads - Prominent */}
    <rect x="5.5" y="9" width="2.5" height="4.5" rx="1.2" fill="currentColor" />
    <rect x="16" y="9" width="2.5" height="4.5" rx="1.2" fill="currentColor" />
    {/* Microphone Arm - Solid */}
    <path 
      d="M17 12.5C17 15 15 16 13 16" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    {/* Mic Tip */}
    <rect x="11.5" y="15" width="2" height="2" rx="1" fill="currentColor" />
  </svg>
);

/**
 * AIWhatsAppIcon - A modern, high-end version of the WhatsApp logo with an AI spark motif.
 */
export const AIWhatsAppIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    {...props}
  >
    {/* Main WhatsApp Bubble */}
    <path 
      d="M12 2C6.477 2 2 6.477 2 12C2 13.82 2.49 15.53 3.35 17L2 22L7.14 20.65C8.56 21.51 10.22 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" 
      fill="#25D366" 
    />
    {/* Phone Icon */}
    <path 
      d="M15.89 13.78C15.65 13.66 14.48 13.08 14.26 13C14.04 12.92 13.88 12.88 13.72 13.12C13.56 13.36 13.11 13.89 12.97 14.05C12.83 14.21 12.69 14.23 12.45 14.11C12.21 13.99 11.44 13.74 10.53 12.92C9.82 12.29 9.34 11.51 9.2 11.27C9.06 11.03 9.19 10.9 9.31 10.78C9.42 10.67 9.56 10.49 9.68 10.35C9.8 10.21 9.84 10.11 9.92 9.97C10 9.83 9.96 9.71 9.9 9.59C9.84 9.47 9.38 8.35 9.19 7.89C9 7.44 8.81 7.5 8.67 7.5H8.35C8.13 7.5 7.77 7.58 7.48 7.9C7.19 8.22 6.37 8.98 6.37 10.53C6.37 12.08 7.5 13.58 7.65 13.79C7.8 14 9.86 17.17 13.02 18.53C13.77 18.85 14.35 19.04 14.81 19.19C15.56 19.43 16.24 19.4 16.78 19.32C17.38 19.23 18.62 18.57 18.88 17.85C19.14 17.13 19.14 16.51 19.06 16.39C18.98 16.27 18.78 16.2 18.54 16.08C18.3 15.96 17.13 15.38 16.91 15.3C16.69 15.22 16.53 15.18 16.37 15.42C16.21 15.66 16.13 15.9 15.89 13.78Z" 
      fill="white" 
    />
    {/* AI Sparkles */}
    <g className="animate-pulse">
      <path 
        d="M19 3L18.5 4.5L17 5L18.5 5.5L19 7L19.5 5.5L21 5L19.5 4.5L19 3Z" 
        fill="white" 
      />
      <path 
        d="M21 8L20.6 9.2L19.4 9.6L20.6 10L21 11.2L21.4 10L22.6 9.6L21.4 9.2L21 8Z" 
        fill="white" 
        opacity="0.8"
      />
    </g>
  </svg>
);

/**
 * AIStrategistIcon - A premium, brain-themed AI icon for the Strategist role.
 */
export const AIStrategistIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    {...props}
  >
    <path 
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
      fill="currentColor" 
      fillOpacity="0.1" 
    />
    <path 
      d="M12 6C9.79086 6 8 7.79086 8 10V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H8V14C8 16.2091 9.79086 18 12 18C14.2091 18 16 16.2091 16 14V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H16V10C16 7.79086 14.2091 6 12 6Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
    <circle cx="12" cy="11.5" r="1.5" fill="currentColor" />
    <path 
      d="M10 9L11 10L13 8" 
      stroke="currentColor" 
      strokeWidth="1.2" 
      strokeLinecap="round" 
      strokeJoin="round" 
    />
    <path 
      d="M12 14V16M14 13L16 15M10 13L8 15" 
      stroke="currentColor" 
      strokeWidth="1" 
      strokeLinecap="round" 
    />
  </svg>
);
