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
    <symbol id="chevron" viewBox="0 0 40 40">
      <path
        d="M15 30L25 20L15 10"
        fill="none"
        className="i-primary"
        stroke="var(--primary)"
        strokeOpacity="var(--primary-opacity)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </symbol>
  </svg>
);
