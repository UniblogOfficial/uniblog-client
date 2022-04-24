import React from 'react';

// Navigation arrows
export const ArrowNavSpritesMap = () => (
  <svg id="nav-arrows" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
    <defs />
    <symbol id="arrow" viewBox="0 0 16 16">
      <path
        className="i-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
        d="M2.66634 7.33268H10.7797L7.05301 3.60602L7.99967 2.66602L13.333 7.99935L7.99967 13.3327L7.05967 12.3927L10.7797 8.66602H2.66634V7.33268Z"
      />
    </symbol>
    <symbol id="chevron" viewBox="0 0 320 512">
      <path
        d="M308.902 228.343L132.904 44.342C117.638 28.373 92.295 27.842 76.342 43.092C60.389 58.373 59.826 83.686 75.092 99.654L224.637 255.999L75.092 412.343C59.826 428.312 60.389 453.625 76.342 468.906C84.092 476.312 94.045 480 103.998 480C114.529 480 125.045 475.875 132.904 467.656L308.902 283.655C323.699 268.186 323.699 243.811 308.902 228.343Z"
        className="i-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path d="" className="i-primary" fill="var(--primary)" fillOpacity="var(--primary-opacity)" />
    </symbol>
  </svg>
);
