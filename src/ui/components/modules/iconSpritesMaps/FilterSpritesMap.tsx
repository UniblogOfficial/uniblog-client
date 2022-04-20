import React from 'react';

// Filter icons
export const FilterSpritesMap = () => (
  <svg id="filter-icons" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
    <defs />
    <symbol id="filter" viewBox="0 0 512 512">
      <path
        d="M504.625 84.186L320 306.822V455.984C320 475.5 298.031 486.688 282.25 475.641L202.25 419.656C195.813 415.172 192 407.828 192 400V306.822L7.375 84.186C-9.965 63.275 5.213 32 32.701 32H479.299C506.787 32 521.965 63.275 504.625 84.186Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d=""
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
  </svg>
);
