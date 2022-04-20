import React from 'react';

// Data manipulations icons
export const CRUDSpritesMap = () => (
  <svg id="crud-icons" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
    <defs />
    <symbol id="trash-can" viewBox="0 0 448 512">
      <path
        d="M32 96V464C32 490.5 53.5 512 80 512H368C394.5 512 416 490.5 416 464V96H32ZM144 416C144 424.875 136.875 432 128 432S112 424.875 112 416V192C112 183.125 119.125 176 128 176S144 183.125 144 192V416ZM240 416C240 424.875 232.875 432 224 432S208 424.875 208 416V192C208 183.125 215.125 176 224 176S240 183.125 240 192V416ZM336 416C336 424.875 328.875 432 320 432S304 424.875 304 416V192C304 183.125 311.125 176 320 176S336 183.125 336 192V416Z"
        className="fa-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M432 32.001H320L308.422 8.844C305.713 3.424 300.172 0.001 294.111 0.001H153.889C147.828 0.001 142.289 3.424 139.578 8.844L128 32.001H16C7.164 32.001 0 39.163 0 48.001V80.001C0 88.837 7.164 96.001 16 96.001H432C440.838 96.001 448 88.837 448 80.001V48.001C448 39.163 440.838 32.001 432 32.001Z"
        className="fa-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
  </svg>
);
