import React from 'react';

export default function NoiseOverlay() {
  return (
    <svg 
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.035] mix-blend-overlay noise-overlay" 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noiseFilter">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.75" 
          numOctaves="3" 
          stitchTiles="stitch" 
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}
