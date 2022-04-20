import React from 'react';

// Layout toggle icons
export const LayoutSpritesMap = () => (
  <svg id="layout-icons" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
    <defs />
    <symbol id="grid-2" viewBox="0 0 24 24">
      <path
        fill="none"
        stroke="var(--primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="i-primary"
        opacity="var(--primary-opacity)"
        d="M10 3H3v7h7V3Zm11 0h-7v7h7V3Zm0 11h-7v7h7v-7Zm-11 0H3v7h7v-7Z"
      />
    </symbol>
    <symbol id="grid-mosaic" viewBox="0 0 24 24">
      <path
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
        className="i-primary"
        d="M19 5v2h-4V5h4ZM9 5v6H5V5h4Zm10 8v6h-4v-6h4ZM9 17v2H5v-2h4ZM21 3h-8v6h8V3ZM11 3H3v10h8V3Zm10 8h-8v10h8V11Zm-10 4H3v6h8v-6Z"
      />
    </symbol>
  </svg>
);
