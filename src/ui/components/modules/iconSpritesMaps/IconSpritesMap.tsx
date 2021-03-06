import React from 'react';

// Almost all what you need for beautiful life
// Don't push it all, be wise and keep it low
// UX is more important than your wet phantasies
const ids = [
  'analytics',
  'arrow',
  'arrow-clockwise',
  'arrows-rotate',
  'calendar',
  'calendar-add',
  'cart',
  'circle-add',
  'circle-check',
  'chat',
  'chevron',
  'dollar-sign',
  'draft',
  'euro-sign',
  'exclamation',
  'eye',
  'eye-slash',
  'filter',
  'globe',
  'grid-2',
  'grid-mosaic',
  'home',
  'image',
  'language',
  'language-duo',
  'lightning',
  'list',
  'question',
  'rotate',
  'rotate-forward',
  'star',
  'star-solid',
  'text-align-center',
  'text-align-justify',
  'text-align-left',
  'text-align-right',
  'text-bolt',
  'text-italic',
  'trash-can',
  'trash-can-arrow-up',
  'trash-can-clock',
  'trash-can-list',
  'trash-can-slash',
  'trash-can-undo',
  'user',
  'window',
  'xmark',
] as const;
type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  // eslint-disable-next-line @typescript-eslint/no-shadow
  infer ElementType
>
  ? ElementType
  : never;

export type TIconName = ElementType<typeof ids>; // this is correctly inferred as literal "A" | "B"

export const IconSpritesMap = () => (
  <svg id="main-sprite" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
    <defs />
    {/*          */}
  </svg>
);
