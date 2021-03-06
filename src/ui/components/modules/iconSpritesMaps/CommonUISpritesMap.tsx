import React from 'react';

export const CommonUISpritesMap = () => (
  <svg id="ui-icons" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
    <defs />
    <symbol id="add" viewBox="0 0 24 24">
      <path
        className="i-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75Z"
      />
    </symbol>
    <symbol id="arrow-clockwise" viewBox="0 0 24 24">
      <path
        d="M12 4.75a7.25 7.25 0 1 0 7.201 6.406c-.068-.588.358-1.156.95-1.156.515 0 .968.358 1.03.87a9.25 9.25 0 1 1-3.432-6.116V4.25a1 1 0 1 1 2.001 0v2.698l.034.052h-.034v.25a1 1 0 0 1-1 1h-3a1 1 0 1 1 0-2h.666A7.219 7.219 0 0 0 12 4.75Z"
        className="i-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="arrows-rotate" viewBox="0 0 512 512">
      <path
        d="M458.344 282.094C437.312 274.969 414.719 286.281 407.641 307.219C385.688 372.281 324.734 416 256 416C205.246 416 158.068 391.906 128.07 352H146.703L146.695 351.992H192.008C209.676 351.992 224 337.668 224 320C224 302.328 209.676 288 192.004 288H47.996C39.156 288 31.156 291.578 25.367 297.367S16 311.156 16 319.996V464.004C16 481.672 30.324 496 47.996 496C65.664 496 79.992 481.676 79.992 464.008V418.695C124.869 467.207 188.227 496 256 496C359.094 496 450.5 430.406 483.453 332.781C490.516 311.875 479.266 289.156 458.344 282.094Z"
        className="i-secondary"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
      />
      <path
        d="M495.556 47.996V192.004C495.556 200.844 491.978 208.844 486.189 214.633S472.4 224 463.56 224H319.552C301.88 224 287.556 209.672 287.556 192C287.556 174.332 301.88 160.008 319.548 160.008H364.861L364.853 160H383.486C353.488 120.094 306.31 96 255.556 96C186.822 96 125.884 139.719 103.9 204.812C98.275 221.5 82.697 232 66.009 232C61.775 232 57.447 231.344 53.212 229.906C32.275 222.812 21.041 200.125 28.119 179.188C61.087 81.594 152.478 16 255.556 16C323.33 16 386.687 44.793 431.564 93.305V47.992C431.564 30.324 445.892 16 463.56 16C481.232 16 495.556 30.328 495.556 47.996Z"
        className="i-primary"
        fill="var(--primary)"
        fillOpacity="var(--primary-opacity)"
      />
    </symbol>
    <symbol id="circle-check" viewBox="0 0 24 24">
      <rect
        y="0"
        width="24"
        height="24"
        rx="12"
        fill="var(--secondary)"
        fillOpacity="var(--secondary-opacity)"
        className="i-secondary"
      />
      <path
        className="i-primary"
        stroke="var(--primary)"
        opacity="var(--primary-opacity)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 8.5L9.75 16.5L6 12.8636"
      />
    </symbol>
  </svg>
);
